import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

import { Client } from '@honeyhive/api-client';
import { type Command } from 'commander';
import { parse as parseJsonc, type ParseError, printParseErrorCode } from 'jsonc-parser';
import { parse as parseYaml } from 'yaml';

import { CLI_VERSION } from './generated/version.js';

const CLI_PACKAGE_NAME = '@honeyhive/cli';

const SUPPORTED_FILE_EXTENSIONS = new Set<string>(['.json', '.jsonc', '.yaml', '.yml']);

export function createClient(command: Command): Client {
  const globalOpts = command.optsWithGlobals<{
    apiKey?: string;
    baseUrl?: string;
    verbose?: boolean;
  }>();
  const apiKey = globalOpts.apiKey ?? process.env.HH_API_KEY;
  if (!apiKey) {
    console.error('Missing API key: provide --api-key or set the HH_API_KEY environment variable');
    process.exit(1);
  }

  return new Client({
    apiKey,
    ...(globalOpts.baseUrl !== undefined && { serverUrl: globalOpts.baseUrl }),
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
 * Used by the generated `--filename` branch to enforce mutual exclusion with
 * per-field flags. Each `[flag, optsKey]` pair maps the user-facing kebab
 * flag (e.g. `--ground-truth`) to the camelCase opts key Commander writes
 * under (e.g. `groundTruth`). The error message uses the kebab form so the
 * user can fix the command they typed.
 *
 * Exits with code 1 (no return) when any conflicting flag is set, matching
 * the rest of the helpers' error UX.
 */
export function assertNoConflictingFlags(
  opts: Record<string, unknown>,
  fieldFlags: readonly (readonly [flag: string, optsKey: string])[],
): void {
  // For booleans, both `--<flag>` and `--no-<flag>` resolve to the same opts
  // key, so the codegen passes both forms and we'd otherwise report the same
  // key under both forms. Deduplicate per opts key; for any key that's set,
  // prefer the form the user actually typed (visible in `process.argv`),
  // falling back to the first entry's form when neither was typed (which
  // shouldn't happen in practice — the key is set, so one of the forms must
  // have been typed — but defends against unusual env-var or default-value
  // shapes).
  const argv = new Set(process.argv);
  const seen = new Set<string>();
  const conflicting: string[] = [];
  for (const [flag, key] of fieldFlags) {
    if (opts[key] === undefined || seen.has(key)) continue;
    seen.add(key);
    const matches = fieldFlags.filter(([, k]) => k === key);
    const typedForm = matches.find(([f]) => argv.has(f))?.[0] ?? flag;
    conflicting.push(typedForm);
  }
  if (conflicting.length > 0) {
    console.error(
      `--filename cannot be combined with field flags. Conflicting: ${conflicting.join(', ')}`,
    );
    process.exit(1);
  }
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
