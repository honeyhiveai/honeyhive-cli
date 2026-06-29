import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

import { Client } from '@honeyhive/api-client';
import { type Command } from 'commander';
import { parse as parseJsonc, type ParseError, printParseErrorCode } from 'jsonc-parser';
import { parse as parseYaml } from 'yaml';

import { CLI_VERSION } from './generated/version.js';

const CLI_PACKAGE_NAME = '@honeyhive/cli';

const SUPPORTED_FILE_EXTENSIONS = new Set<string>(['.json', '.jsonc', '.yaml', '.yml']);

export function createDataPlaneClient(command: Command): Client {
  const globalOpts = command.optsWithGlobals<{
    projectApiKey?: string;
    apiKey?: string;
    dataPlaneUrl?: string;
    baseUrl?: string;
    verbose?: boolean;
  }>();

  // Warn on any deprecated flag the user actually passed, even if its
  // replacement also wins resolution — we want callers to drop the old flag
  // from their scripts. These warnings run BEFORE the missing-key check below
  // so they still fire when the key is absent (e.g. `honeyhive --base-url X
  // ...` with no key).
  //
  // The chassis (`console.warn`, `Warning: option "--<flag>" is deprecated
  // and will be removed in the next major version.`) matches the CLI
  // generator's per-option deprecation warning in
  // `typescript/packages/server-client-generator/src/cli.ts` (search for
  // `is deprecated and will be removed`). The hand-written warning here
  // appends `Use "--<replacement>" instead.` because we know the
  // replacement at this call site; the generator currently omits a Use
  // clause because the OpenAPI spec doesn't yet model replacements. If
  // the generator's chassis changes, update this string too (and vice
  // versa); the Use clause only appears in hand-written warnings.
  if (globalOpts.apiKey !== undefined) {
    console.warn(
      'Warning: option "--api-key" is deprecated and will be removed in the next major version. Use "--project-api-key" instead.',
    );
  }
  if (globalOpts.baseUrl !== undefined) {
    console.warn(
      'Warning: option "--base-url" is deprecated and will be removed in the next major version. Use "--data-plane-url" instead.',
    );
  }

  // Resolve the API key from flags only. Environment-variable resolution
  // (HH_PROJECT_API_KEY ?? HH_API_KEY) and the HH_API_KEY deprecation
  // warning are owned by the SDK chassis, the single source of truth — so we
  // never read env into the option here (matching how the URL is handled:
  // the CLI passes only --data-plane-url/--base-url flags and lets the SDK
  // read HH_DATA_PLANE_URL/HH_API_URL). We still peek at the env vars purely
  // to decide whether to emit the CLI's friendly, flag-named missing-key
  // error before constructing the client.
  const apiKeyFromFlags = globalOpts.projectApiKey ?? globalOpts.apiKey;
  // The `!!` env checks intentionally mirror the SDK's `getEnv`
  // empty-string-as-unset rule (api-client `getEnv`), so this pre-flight
  // agrees with the SDK's own resolution: `HH_API_KEY=""` is "no key" on both
  // sides. If `getEnv` ever changes its normalization (e.g. trimming
  // whitespace), update this peek too so the two checks don't silently desync.
  const hasKey =
    apiKeyFromFlags !== undefined || !!process.env.HH_PROJECT_API_KEY || !!process.env.HH_API_KEY;
  if (!hasKey) {
    console.error(
      'Missing project API key: provide --project-api-key or set the HH_PROJECT_API_KEY environment variable',
    );
    process.exit(1);
  }

  const resolvedDataPlaneUrl = globalOpts.dataPlaneUrl ?? globalOpts.baseUrl;

  return new Client({
    ...(apiKeyFromFlags !== undefined && { projectApiKey: apiKeyFromFlags }),
    ...(resolvedDataPlaneUrl !== undefined && { dataPlaneUrl: resolvedDataPlaneUrl }),
    ...(globalOpts.verbose !== undefined && { verbose: globalOpts.verbose }),
    _internal_provenance: {
      package: CLI_PACKAGE_NAME,
      version: CLI_VERSION,
    },
  });
}

export function parseJson(value: unknown): unknown {
  if (typeof value !== 'string') {
    console.error(`Expected a JSON string, got ${typeof value}`);
    process.exit(1);
  }
  try {
    return JSON.parse(value) as unknown;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Invalid JSON: ${message}`);
    process.exit(1);
  }
}

export function parseNumber(value: unknown): number {
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
export function readRequestFile(value: unknown): unknown {
  if (typeof value !== 'string') {
    console.error(`--filename expected a file path, got ${typeof value}`);
    process.exit(1);
  }

  const ext = extname(value).toLowerCase();
  if (!SUPPORTED_FILE_EXTENSIONS.has(ext)) {
    const displayExt = ext === '' ? '(none)' : ext;
    console.error(
      `--filename: unsupported extension '${displayExt}'. Expected one of: ${[...SUPPORTED_FILE_EXTENSIONS].join(', ')}`,
    );
    process.exit(1);
  }

  let contents: string;
  try {
    contents = readFileSync(value, 'utf-8');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`--filename: could not read '${value}': ${message}`);
    process.exit(1);
  }

  if (ext === '.yaml' || ext === '.yml') {
    try {
      return parseYaml(contents) as unknown;
    } catch (error: unknown) {
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
  const errors: ParseError[] = [];
  const parsed = parseJsonc(contents, errors, { allowTrailingComma: true }) as unknown;
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
export function assertNoOtherFlags(
  opts: Record<string, unknown>,
  otherFlags: readonly (readonly [flag: string, optsKey: string])[],
  context: string,
): void {
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
  const seen = new Set<string>();
  const conflicting: string[] = [];
  for (const [flag, key] of otherFlags) {
    if (opts[key] === undefined || seen.has(key)) continue;
    seen.add(key);
    const matches = otherFlags.filter(([, k]) => k === key);
    const typedForm = matches.find(([f]) => argv.has(f))?.[0] ?? flag;
    conflicting.push(typedForm);
  }
  if (conflicting.length > 0) {
    console.error(
      `${context} cannot be combined with other flags. Conflicting: ${conflicting.join(', ')}`,
    );
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
export function handleSchemaIntrospection(
  opts: Record<string, unknown>,
  fileSchemaJson: string,
  kebabToSpec: Readonly<Record<string, string>>,
  otherFlags: readonly (readonly [flag: string, optsKey: string])[],
): boolean {
  const showFileSchema = opts.showFileSchema === true;
  const showArgumentSchema =
    typeof opts.showArgumentSchema === 'string' ? opts.showArgumentSchema : undefined;

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
      console.error(
        `--show-argument-schema: unknown argument '${showArgumentSchema}'.${hint} Valid names: ${valid}`,
      );
      process.exit(1);
    }
    const fileSchema = JSON.parse(fileSchemaJson) as { properties?: Record<string, unknown> };
    const sub = fileSchema.properties?.[specName];
    if (sub === undefined) {
      // Codegen invariant: every KEBAB_TO_SPEC value points at a property
      // of the file schema (see extractCliArgs's guard in cli.ts). A miss
      // here means a generator regression, not user error — throw rather
      // than silently writing the literal string "undefined\n" to stdout
      // and breaking the pure-JSON-stdout contract.
      throw new Error(
        `handleSchemaIntrospection: no subschema for spec property '${specName}' ` +
          `(kebab '${showArgumentSchema}'). KEBAB_TO_SPEC has the entry but the ` +
          `file schema's properties block does not — this is a codegen bug.`,
      );
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
export function assertRequiredFields(
  opts: Record<string, unknown>,
  requiredFields: readonly (readonly [flag: string, optsKey: string])[],
): void {
  const missing = requiredFields.filter(([, key]) => opts[key] === undefined).map(([flag]) => flag);
  if (missing.length > 0) {
    console.error(
      `Missing required field${missing.length === 1 ? '' : 's'}: ${missing.join(', ')}`,
    );
    process.exit(1);
  }
}
