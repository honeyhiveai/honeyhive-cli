import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { Client as DataPlaneClient, MalformedApiKeyError as DataPlaneMalformedApiKeyError, MissingApiKeyError as DataPlaneMissingApiKeyError, } from '@honeyhive/api-client';
import { Client as ControlPlaneClient, MalformedApiKeyError as ControlPlaneMalformedApiKeyError, MissingApiKeyError as ControlPlaneMissingApiKeyError, } from '@honeyhive/control-plane-sdk';
import { parse as parseJsonc, printParseErrorCode } from 'jsonc-parser';
import { parse as parseYaml } from 'yaml';
import { CLI_VERSION } from './generated/version.js';
const CLI_PACKAGE_NAME = '@honeyhive/cli';
const SUPPORTED_FILE_EXTENSIONS = new Set(['.json', '.jsonc', '.yaml', '.yml']);
// ── Key errors ──────────────────────────────────────────────────────────────
//
// Each SDK decides whether a key is usable: it throws `MalformedApiKeyError`
// when a typed key is not a key of its kind, and `MissingApiKeyError` when a
// call has no key it can use. The CLI only rewords those errors in terms of its
// own flags; the decisions stay the SDK's.
/**
 * Where the CLI takes each kind of data plane key from, and where in the app a
 * missing or wrong key of that kind is created, when the kind has a sentence
 * worth adding.
 */
const DATA_PLANE_KEY_SOURCES = {
    project: { noun: 'project API key', flag: '--project-api-key', envVar: 'HH_PROJECT_API_KEY' },
    ingestion: {
        noun: 'ingestion API key',
        flag: '--ingestion-api-key',
        envVar: 'HH_INGESTION_API_KEY',
    },
    dataPlane: {
        noun: 'data plane API key',
        flag: '--data-plane-api-key',
        envVar: 'HH_DATA_PLANE_API_KEY',
        remedy: 'Create one in the HoneyHive app under project, workspace, or organization Settings → API keys, on the Data Plane tab.',
    },
};
const CONTROL_PLANE_KEY_FLAG = '--control-plane-api-key';
const CONTROL_PLANE_KEY_ENV_VAR = 'HH_CONTROL_PLANE_API_KEY';
// The scope matters and can't be dropped for brevity: the app has an "API keys"
// page at project, workspace, and organization scope, and only the last two
// mint control plane keys. Sending a reader to the unqualified path sends half
// of them to the project page, which has no control plane keys to offer.
const CONTROL_PLANE_KEY_REMEDY = 'Create one in the HoneyHive app under workspace or organization Settings → API keys.';
/**
 * The CLI's wording for an SDK's missing-key error, naming the flag and the
 * environment variable that supply the key, or `undefined` for any other error.
 */
export function describeMissingApiKey(error) {
    if (error instanceof DataPlaneMissingApiKeyError) {
        const { noun, flag, envVar, remedy } = DATA_PLANE_KEY_SOURCES[error.keyKind];
        // The sentence only takes a full stop when a remedy follows it, so a kind
        // with nothing more to add keeps the message it has always had.
        const remedySentence = remedy === undefined ? '' : `. ${remedy}`;
        return `Missing ${noun}: provide ${flag} or set the ${envVar} environment variable${remedySentence}`;
    }
    if (error instanceof ControlPlaneMissingApiKeyError) {
        return (`Missing control plane API key: provide ${CONTROL_PLANE_KEY_FLAG} or set the ` +
            `${CONTROL_PLANE_KEY_ENV_VAR} environment variable. ${CONTROL_PLANE_KEY_REMEDY}`);
    }
    return undefined;
}
/**
 * The CLI's wording for an SDK's malformed-key error, or `undefined` for any
 * other error. A value from an environment variable keeps the SDK's message,
 * which names the variable; a value from a flag reaches the SDK as an option,
 * so its message is reworded to name the flag instead.
 */
export function describeMalformedApiKey(error) {
    if (error instanceof DataPlaneMalformedApiKeyError) {
        const { flag, envVar, remedy } = DATA_PLANE_KEY_SOURCES[error.keyKind];
        const message = error.source === envVar ? error.message : error.messageFor(flag);
        return remedy === undefined ? message : `${message} ${remedy}`;
    }
    if (error instanceof ControlPlaneMalformedApiKeyError) {
        const message = error.source === CONTROL_PLANE_KEY_ENV_VAR
            ? error.message
            : error.messageFor(CONTROL_PLANE_KEY_FLAG);
        return `${message} ${CONTROL_PLANE_KEY_REMEDY}`;
    }
    return undefined;
}
/**
 * Builds the data plane client for a generated command. Only flag values are
 * passed in; the SDK reads the environment variables itself and decides, per
 * call, whether the command's operation has a key it can use.
 */
export function createDataPlaneClient(command) {
    const globalOpts = command.optsWithGlobals();
    // Warn on any deprecated flag the user actually passed, even if its
    // replacement also wins resolution — we want callers to drop the old flag
    // from their scripts. These warnings run before the client is built, so they
    // still fire when the command then fails for a missing key.
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
    const apiKeyFromFlags = globalOpts.projectApiKey ?? globalOpts.apiKey;
    const resolvedDataPlaneUrl = globalOpts.dataPlaneUrl ?? globalOpts.baseUrl;
    return new DataPlaneClient({
        ...(apiKeyFromFlags !== undefined && { projectApiKey: apiKeyFromFlags }),
        ...(globalOpts.ingestionApiKey !== undefined && {
            ingestionApiKey: globalOpts.ingestionApiKey,
        }),
        ...(globalOpts.dataPlaneApiKey !== undefined && {
            dataPlaneApiKey: globalOpts.dataPlaneApiKey,
        }),
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
 * environment variables, and a set of deprecated aliases that exists on one
 * side only.
 */
export function createControlPlaneClient(command) {
    const globalOpts = command.optsWithGlobals();
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