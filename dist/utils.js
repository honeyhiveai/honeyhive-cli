import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { Client as DataPlaneClient } from '@honeyhive/api-client';
import { Client as ControlPlaneClient } from '@honeyhive/control-plane-sdk';
import { parse as parseJsonc, printParseErrorCode } from 'jsonc-parser';
import { parse as parseYaml } from 'yaml';
import { CLI_VERSION } from './generated/version.js';
const CLI_PACKAGE_NAME = '@honeyhive/cli';
const SUPPORTED_FILE_EXTENSIONS = new Set(['.json', '.jsonc', '.yaml', '.yml']);
// ── Credential pre-flight ───────────────────────────────────────────────────
//
// Both planes take an API key, but they take *different* API keys, and the two
// are easy to mix up because they share a prefix and arrive through
// similar-looking flags and environment variables. Handing an API the wrong
// kind of key gets a 401 that says nothing about which key was wrong, so the
// CLI checks the kind locally before it ever opens a connection.
//
// Nothing here runs until a command actually needs a client: both factories are
// called from inside a command's action body, so a data plane command never
// looks at control plane credentials and vice versa.
/**
 * Length of the secret that follows the prefix of a coarse-grained API key.
 *
 * Prefix plus this length is the API's entire recognition test for a
 * coarse-grained key, and the checks below reproduce exactly that test rather
 * than a stricter one, so the CLI can never reject a key the API would have
 * accepted. In particular there is no alphabet check on the secret, because the
 * API doesn't perform one either.
 */
const COARSE_KEY_SECRET_LENGTH = 32;
function coarseKeyKind(prefix, label) {
    return {
        prefix,
        label,
        isWellFormed: (value) => value.startsWith(prefix) && value.length === prefix.length + COARSE_KEY_SECRET_LENGTH,
    };
}
const PROJECT_KEY = coarseKeyKind('hh_', 'a project API key');
const READONLY_PROJECT_KEY = coarseKeyKind('hh_ro_', 'a read-only project API key');
const ORGANIZATION_KEY = coarseKeyKind('hh_org_', 'an organization API key');
const WORKSPACE_KEY = coarseKeyKind('hh_ws_', 'a workspace API key');
const COARSE_CONTROL_PLANE_KEY = coarseKeyKind('hh_cp_', 'a control plane API key');
/**
 * A fine-grained control plane key is `hh_fgcp_<key id>_<key secret>`, where the
 * id is exactly 24 characters with `_` and `-` excluded so it can never read as
 * two segments, and the secret is exactly 64 characters over an alphabet that
 * does include them. Both lengths are fixed properties of the format.
 */
const FINE_GRAINED_CONTROL_PLANE_KEY = {
    prefix: 'hh_fgcp_',
    label: 'a fine-grained control plane API key',
    isWellFormed: (value) => /^hh_fgcp_[A-Za-z0-9]{24}_[A-Za-z0-9_-]{64}$/.test(value),
};
/**
 * Every kind of key the CLI can recognize, longest prefix first so that
 * detection picks the most specific match. Kinds no plane below accepts are
 * listed anyway: recognizing them is what lets a rejection say "that looks like
 * an organization API key" instead of just "that isn't valid".
 *
 * The coarse-grained kinds are a closed set: fine-grained keys are replacing
 * them, so that list only ever shrinks. What will grow is the fine-grained
 * side, which is per-plane. A data plane flavor with its own prefix is the
 * expected next one, and when it arrives it needs an entry here *and* a place
 * in the data plane's `accepts`, or a holder of a perfectly good key is told
 * their key doesn't match any shape. Nothing links this list to the services
 * that mint these keys, so that has to be done by hand.
 */
const ALL_KEY_KINDS = [
    FINE_GRAINED_CONTROL_PLANE_KEY,
    ORGANIZATION_KEY,
    READONLY_PROJECT_KEY,
    WORKSPACE_KEY,
    COARSE_CONTROL_PLANE_KEY,
    PROJECT_KEY,
];
/**
 * Every HoneyHive key value starts with this, coarse and fine-grained alike.
 * It is the one part of the format that holds across every kind and every
 * plane, so its absence is the only thing the CLI can say for certain about a
 * value it doesn't otherwise recognize: whatever it is, no HoneyHive API will
 * take it.
 */
const HONEYHIVE_KEY_PREFIX = 'hh_';
/**
 * Resolves the key the SDK is about to use, along with the name of where it
 * came from so an error can point at it. Every flag beats every environment
 * variable, which is the order both SDKs resolve in.
 *
 * The empty-string-is-unset rule for environment variables mirrors the SDK's own
 * resolution, so this agrees with what the SDK will do: `HH_PROJECT_API_KEY=""`
 * is "no key" on both sides. A flag is treated as supplied whenever it is
 * present, empty or not, which likewise matches the SDK (an explicitly empty
 * flag reaches the SDK and fails its own missing-key check).
 */
function resolveApiKey(flags, envVars) {
    for (const flag of flags) {
        if (flag.value !== undefined) {
            return { value: flag.value, source: flag.name };
        }
    }
    for (const envVar of envVars) {
        const value = process.env[envVar];
        if (value !== undefined && value !== '') {
            return { value, source: envVar };
        }
    }
    return undefined;
}
/** `a project API key (hh_...) or a read-only project API key (hh_ro_...)`. */
function describeAccepted(accepts) {
    return accepts.map((kind) => `${kind.label} (${kind.prefix}...)`).join(' or ');
}
/**
 * Fails the command unless the plane has a key that could plausibly work.
 *
 * The rule is *reject what is known not to work*, never *accept only what is
 * known to work*, and the difference is the whole design. The CLI ships as a
 * pinned binary, and what the APIs accept is a moving target it can only mirror
 * by hand. An allowlist would mean that the day a new kind of key ships, every
 * installed copy refuses a perfectly good key and tells its holder to check for
 * a typo, with no fix but an upgrade. A denylist degrades the other way: the
 * worst an out-of-date copy does is skip a diagnostic and let the API answer.
 *
 * So there are three rejections, all exiting with code 1 (no return) to match
 * the rest of the helpers:
 *
 * - No key at all. The SDK would throw here too, but its message names the SDK
 *   option rather than the flag the user typed, so the CLI gets there first.
 * - A key of a kind this plane's API cannot accept. This is the case the whole
 *   pre-flight exists for: with two planes taking two kinds of key, they get
 *   mixed up, and the API's answer is a 401 that doesn't say which of the two
 *   was wrong.
 * - A value that isn't a HoneyHive key at all, which every API will refuse; see
 *   {@link HONEYHIVE_KEY_PREFIX}.
 *
 * What is deliberately *not* rejected is a value that carries the HoneyHive
 * prefix but matches no kind this build knows. That is either a mangled key or
 * a kind that shipped after this build did, and the CLI cannot tell which, so
 * it forwards the value and lets the API decide. Not even a warning: a warning
 * would fire on every command for the holder of a valid newer key, which is
 * noise printed against a credential that works.
 *
 * Note that this reads environment variables to *judge* a key, never to forward
 * one. The factories still pass only flag values to the SDK, so there is exactly
 * one resolver at runtime and no chance of the CLI and the SDK disagreeing about
 * which key is in play.
 */
function assertUsableApiKey(credential) {
    const { commandLabel, noun, flags, envVars, accepts, remedy } = credential;
    const suffix = remedy === undefined ? '' : ` ${remedy}`;
    const resolved = resolveApiKey(flags, envVars);
    if (resolved === undefined) {
        // Advertise the preferred names, never a deprecated alias: both lists put
        // the name they want callers to use at the head. The sentence only takes a
        // full stop when a remedy follows it, so a plane with nothing more to add
        // keeps the message it has always had.
        const remedySentence = remedy === undefined ? '' : `. ${remedy}`;
        console.error(`Missing ${noun}: provide ${flags[0].name} or set the ${envVars[0]} ` +
            `environment variable${remedySentence}`);
        process.exit(1);
    }
    const { value, source } = resolved;
    if (accepts.some((kind) => kind.isWellFormed(value))) {
        return;
    }
    const supplied = ALL_KEY_KINDS.find((kind) => kind.isWellFormed(value));
    if (supplied !== undefined) {
        console.error(`${commandLabel} require ${describeAccepted(accepts)}. The key supplied via ` +
            `${source} looks like ${supplied.label}.${suffix}`);
        process.exit(1);
    }
    if (!value.startsWith(HONEYHIVE_KEY_PREFIX)) {
        console.error(`${commandLabel} require ${describeAccepted(accepts)}. The key supplied via ` +
            `${source} is not a HoneyHive API key; every one of them starts with ` +
            `${HONEYHIVE_KEY_PREFIX}.${suffix}`);
        process.exit(1);
    }
}
export function createDataPlaneClient(command) {
    const globalOpts = command.optsWithGlobals();
    // Warn on any deprecated flag the user actually passed, even if its
    // replacement also wins resolution — we want callers to drop the old flag
    // from their scripts. These warnings run BEFORE the missing-key check below
    // so they still fire when the key is absent (e.g. `honeyhive --base-url X
    // ...` with no key).
    //
    // The chassis (`console.warn`, `Warning: option "--<flag>" is deprecated
    // and will be removed in the next major version.`) matches the wording the
    // generated commands use for their own deprecated options, so a deprecation
    // reads the same wherever it comes from. The hand-written warning here
    // appends `Use "--<replacement>" instead.` because we know the
    // replacement at this call site; generated warnings omit a Use clause
    // because the OpenAPI spec doesn't yet model replacements. Keep the two
    // wordings aligned; the Use clause only appears in hand-written warnings.
    if (globalOpts.apiKey !== undefined) {
        console.warn('Warning: option "--api-key" is deprecated and will be removed in the next major version. Use "--project-api-key" instead.');
    }
    if (globalOpts.baseUrl !== undefined) {
        console.warn('Warning: option "--base-url" is deprecated and will be removed in the next major version. Use "--data-plane-url" instead.');
    }
    // The key resolution order below mirrors the SDK's own, because the
    // pre-flight has to judge the same value the SDK will use. Resolution for
    // everything the CLI *forwards* still belongs to the SDK chassis: only flag
    // values are passed into the constructor, and the URL isn't read from the
    // environment here at all (the CLI passes --data-plane-url/--base-url and
    // lets the SDK read HH_DATA_PLANE_URL/HH_API_URL). The HH_API_KEY
    // deprecation warning likewise stays the SDK's to emit.
    assertUsableApiKey({
        commandLabel: 'Data plane commands',
        noun: 'project API key',
        flags: [
            { name: '--project-api-key', value: globalOpts.projectApiKey },
            { name: '--api-key', value: globalOpts.apiKey },
        ],
        envVars: ['HH_PROJECT_API_KEY', 'HH_API_KEY'],
        // Both project key kinds are accepted because the data plane accepts both.
        // Whether a given key is *permitted* to run a given command is a separate
        // question the CLI deliberately stays out of: a read-only key reaching a
        // write command is refused by the API's permission gate, the same way an
        // invalid id or a deleted resource is. Key *type* is a closed set the CLI
        // can check exhaustively; permissions are an open one (a fine-grained key
        // carries any combination of grants), and checking or documenting part of
        // an open set implies coverage that cannot exist. Don't special-case the
        // read-only kind here without a story for the rest of that set.
        //
        // The data plane also admits a workspace-scoped key, which is missing here
        // on purpose: no such key can be minted today, because both mint routes gate
        // on project scope. That makes this list agree with reality rather than with
        // the server's actor list, and it keeps a credential nobody can hold out of
        // the rejection message. If workspace-scoped minting ever opens, add the
        // kind here or the CLI will refuse a key the API would have taken.
        accepts: [PROJECT_KEY, READONLY_PROJECT_KEY],
    });
    const apiKeyFromFlags = globalOpts.projectApiKey ?? globalOpts.apiKey;
    const resolvedDataPlaneUrl = globalOpts.dataPlaneUrl ?? globalOpts.baseUrl;
    return new DataPlaneClient({
        ...(apiKeyFromFlags !== undefined && { projectApiKey: apiKeyFromFlags }),
        ...(resolvedDataPlaneUrl !== undefined && { dataPlaneUrl: resolvedDataPlaneUrl }),
        ...(globalOpts.verbose !== undefined && { verbose: globalOpts.verbose }),
        _internal_provenance: {
            package: CLI_PACKAGE_NAME,
            version: CLI_VERSION,
        },
    });
}
/**
 * The control plane counterpart of {@link createDataPlaneClient}. Kept as a
 * separate factory rather than one parameterized builder because the two planes
 * agree on almost nothing at this layer: different option names, different
 * environment variables, different accepted key kinds, and a set of deprecated
 * aliases that exists on one side only. The credential pre-flight is the part
 * they genuinely share, and that is shared.
 */
export function createControlPlaneClient(command) {
    const globalOpts = command.optsWithGlobals();
    assertUsableApiKey({
        commandLabel: 'Control plane commands',
        noun: 'control plane API key',
        flags: [{ name: '--control-plane-api-key', value: globalOpts.controlPlaneApiKey }],
        envVars: ['HH_CONTROL_PLANE_API_KEY'],
        accepts: [FINE_GRAINED_CONTROL_PLANE_KEY],
        // The scope matters and can't be dropped for brevity: the app has an "API
        // keys" page at project, workspace, and organization scope, and only the
        // last two mint fine-grained keys. Sending a reader to the unqualified path
        // sends half of them to the project page, which mints exactly the coarse
        // key they were just told not to use.
        remedy: 'Create one in the HoneyHive app under workspace or organization Settings → API keys.',
    });
    return new ControlPlaneClient({
        ...(globalOpts.controlPlaneApiKey !== undefined && { apiKey: globalOpts.controlPlaneApiKey }),
        ...(globalOpts.controlPlaneUrl !== undefined && {
            controlPlaneUrl: globalOpts.controlPlaneUrl,
        }),
        ...(globalOpts.verbose !== undefined && { verbose: globalOpts.verbose }),
        _internal_provenance: {
            package: CLI_PACKAGE_NAME,
            version: CLI_VERSION,
        },
    });
}
export function parseJson(value) {
    if (typeof value !== 'string') {
        console.error(`Expected a JSON string, got ${typeof value}`);
        process.exit(1);
    }
    try {
        return JSON.parse(value);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Invalid JSON: ${message}`);
        process.exit(1);
    }
}
export function parseNumber(value) {
    const n = Number(value);
    if (Number.isNaN(n)) {
        console.error(`Expected a number, got '${String(value)}'`);
        process.exit(1);
    }
    return n;
}
/**
 * Reads a `--filename` argument and returns the parsed value. Format is
 * picked from the file extension. CLI-side errors (unsupported extension,
 * missing file, parse failure) print to stderr and exit with code 1 — the
 * same shape as `parseJson` / `parseNumber`.
 *
 * The parsed value is passed straight through to the SDK call without any
 * field translation, defaulting, or shape validation. Payload-shape errors
 * (missing fields, wrong types) are surfaced by the backend's schema
 * validator, which can name the offending field; the CLI deliberately does
 * not pre-validate so future SDK methods with non-object request bodies work
 * without per-operation codegen overrides.
 */
export function readRequestFile(value) {
    if (typeof value !== 'string') {
        console.error(`--filename expected a file path, got ${typeof value}`);
        process.exit(1);
    }
    const ext = extname(value).toLowerCase();
    if (!SUPPORTED_FILE_EXTENSIONS.has(ext)) {
        const displayExt = ext === '' ? '(none)' : ext;
        console.error(`--filename: unsupported extension '${displayExt}'. Expected one of: ${[...SUPPORTED_FILE_EXTENSIONS].join(', ')}`);
        process.exit(1);
    }
    let contents;
    try {
        contents = readFileSync(value, 'utf-8');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`--filename: could not read '${value}': ${message}`);
        process.exit(1);
    }
    if (ext === '.yaml' || ext === '.yml') {
        try {
            return parseYaml(contents);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(`--filename: invalid YAML in '${value}': ${message}`);
            process.exit(1);
        }
    }
    // `.json` and `.jsonc` both route through `parseJsonc`. JSONC is a superset
    // of JSON, so this means a `.json` file containing comments or trailing
    // commas parses successfully rather than erroring. That's intentional —
    // the user picked the `.json` extension; we don't second-guess it. Don't
    // "tighten" `.json` to `JSON.parse`: it would fragment the parser surface
    // for a benefit that's not real (the backend's schema validator is the
    // authority on payload shape, not the file extension).
    const errors = [];
    const parsed = parseJsonc(contents, errors, { allowTrailingComma: true });
    if (errors.length > 0) {
        const summary = errors
            .map((e) => `${printParseErrorCode(e.error)} at offset ${e.offset}`)
            .join('; ');
        console.error(`--filename: invalid JSON-C in '${value}': ${summary}`);
        process.exit(1);
    }
    return parsed;
}
/**
 * Used by generated branches that take over a command and forbid any other
 * flag from being combined with them — currently `--filename`,
 * `--show-file-schema`, and `--show-argument-schema`. Each `[flag, optsKey]`
 * pair in `otherFlags` maps a user-facing kebab flag (e.g. `--ground-truth`)
 * to the camelCase opts key Commander writes under (e.g. `groundTruth`).
 * `context` is the human-readable label of the flag whose branch is running
 * (e.g. `'--filename'`, `'--show-argument-schema dataset-id'`) and is
 * inlined into the error message so the user knows which branch rejected the
 * combination.
 *
 * Exits with code 1 (no return) when any other flag is set, matching the
 * rest of the helpers' error UX.
 */
export function assertNoOtherFlags(opts, otherFlags, context) {
    // For booleans, both `--<flag>` and `--no-<flag>` resolve to the same opts
    // key, so the codegen passes both forms and we'd otherwise report the same
    // key under both forms. Deduplicate per opts key; for any key that's set,
    // prefer the form the user actually typed (visible in `process.argv`),
    // falling back to the first entry's form when neither was typed (which
    // shouldn't happen in practice — the key is set, so one of the forms must
    // have been typed — but defends against unusual env-var or default-value
    // shapes).
    //
    // The `--flag=value` form is not a concern here. Commander rejects equals
    // form on boolean flags entirely (`--no-foo=true` → "unknown option"), so
    // booleans only ever arrive as space-separated forms which `argv.has()`
    // catches. Non-boolean flags have exactly one entry in `otherFlags` per
    // opts key, so the `matches.find(...)` never has to disambiguate — the
    // single match is always returned regardless of whether the user wrote
    // `--name foo` or `--name=foo`.
    const argv = new Set(process.argv);
    const seen = new Set();
    const conflicting = [];
    for (const [flag, key] of otherFlags) {
        if (opts[key] === undefined || seen.has(key))
            continue;
        seen.add(key);
        const matches = otherFlags.filter(([, k]) => k === key);
        const typedForm = matches.find(([f]) => argv.has(f))?.[0] ?? flag;
        conflicting.push(typedForm);
    }
    if (conflicting.length > 0) {
        console.error(`${context} cannot be combined with other flags. Conflicting: ${conflicting.join(', ')}`);
        process.exit(1);
    }
}
/**
 * Used by generated action bodies to handle the `--show-file-schema` and
 * `--show-argument-schema` introspection flags. Both are mutually exclusive
 * with every other command-specific flag and produce pure JSON on stdout —
 * the contract every command shares, so the runtime logic lives here once
 * instead of being emitted into each generated action body.
 *
 * Inputs:
 *   - `opts` is Commander's parsed flag bag.
 *   - `fileSchemaJson` is the pre-serialized JSON Schema string for the
 *     command's full request object. The full-schema branch writes it
 *     verbatim; the argument-schema branch parses it to look up a property.
 *   - `kebabToSpec` maps each kebab CLI flag name (e.g. `'dataset-id'`) to
 *     its underlying spec property name (e.g. `'dataset_id'`) — needed
 *     because the user passes the former but the JSON Schema is keyed by
 *     the latter. The keys are also the only list shown in the unknown-arg
 *     error message.
 *   - `otherFlags` is the same `[flag, optsKey]` array that
 *     `assertNoOtherFlags` uses elsewhere: every per-field flag for this
 *     command plus `--filename`, with both `--<flag>` and `--no-<flag>`
 *     halves for booleans.
 *
 * Returns `true` if it handled the introspection request (and the caller
 * should stop further processing); `false` if neither schema flag was set
 * (caller continues to the regular `--filename` / per-field-flag branches).
 * Errors exit the process with code 1, matching the rest of the helpers.
 */
export function handleSchemaIntrospection(opts, fileSchemaJson, kebabToSpec, otherFlags) {
    const showFileSchema = opts.showFileSchema === true;
    const showArgumentSchema = typeof opts.showArgumentSchema === 'string' ? opts.showArgumentSchema : undefined;
    if (showFileSchema && showArgumentSchema !== undefined) {
        console.error('--show-file-schema and --show-argument-schema are mutually exclusive.');
        process.exit(1);
    }
    if (showFileSchema) {
        assertNoOtherFlags(opts, otherFlags, '--show-file-schema');
        process.stdout.write(fileSchemaJson + '\n');
        return true;
    }
    if (showArgumentSchema !== undefined) {
        assertNoOtherFlags(opts, otherFlags, `--show-argument-schema ${showArgumentSchema}`);
        const specName = kebabToSpec[showArgumentSchema];
        if (specName === undefined) {
            const valid = Object.keys(kebabToSpec).sort().join(', ');
            // The leading-dash hint helps when Commander has eagerly consumed
            // `--name` as the value (very common agent mistake); it's pure noise
            // when the user typed something else entirely (e.g. `dataset_id` with
            // an underscore — just as plausible since the file-schema keys are
            // snake_case). Gate on whether the input actually has leading dashes.
            const hint = showArgumentSchema.startsWith('-')
                ? ` Expected the kebab flag name WITHOUT the leading '--' (e.g. 'dataset-id', not '--dataset-id').`
                : '';
            console.error(`--show-argument-schema: unknown argument '${showArgumentSchema}'.${hint} Valid names: ${valid}`);
            process.exit(1);
        }
        const fileSchema = JSON.parse(fileSchemaJson);
        const sub = fileSchema.properties?.[specName];
        if (sub === undefined) {
            // Codegen invariant: every KEBAB_TO_SPEC value points at a property
            // of the file schema (see extractCliArgs's guard in cli.ts). A miss
            // here means a generator regression, not user error — throw rather
            // than silently writing the literal string "undefined\n" to stdout
            // and breaking the pure-JSON-stdout contract.
            throw new Error(`handleSchemaIntrospection: no subschema for spec property '${specName}' ` +
                `(kebab '${showArgumentSchema}'). KEBAB_TO_SPEC has the entry but the ` +
                `file schema's properties block does not — this is a codegen bug.`);
        }
        process.stdout.write(JSON.stringify(sub, null, 2) + '\n');
        return true;
    }
    return false;
}
/**
 * Used by the generated SDK-call branch to enforce that every required field
 * is supplied. Commander's `requiredOption` / `makeOptionMandatory()` would
 * enforce this at parse time, but that runs *before* the action handler — so
 * `command --filename foo.yaml` would exit with "required option not
 * specified" before the file is ever read, even when the file contains the
 * required field. Instead we emit plain `.option()` calls and run this check
 * in the action body's non-`--filename` branch.
 *
 * The error message lists every missing field using the user-facing kebab
 * flag form (e.g. `--datapoint-id`), not the camelCase opts key, so the user
 * can fix the command they typed.
 *
 * Exits with code 1 (no return) when any required field is missing, matching
 * the rest of the helpers' error UX.
 */
export function assertRequiredFields(opts, requiredFields) {
    const missing = requiredFields.filter(([, key]) => opts[key] === undefined).map(([flag]) => flag);
    if (missing.length > 0) {
        console.error(`Missing required field${missing.length === 1 ? '' : 's'}: ${missing.join(', ')}`);
        process.exit(1);
    }
}
//# sourceMappingURL=utils.js.map