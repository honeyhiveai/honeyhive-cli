import { Client } from '@honeyhive/api-client';
import { type Command } from 'commander';
export declare function createClient(command: Command): Client;
export declare function parseJson(value: unknown): unknown;
export declare function parseNumber(value: unknown): number;
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
export declare function readRequestFile(value: unknown): unknown;
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
export declare function assertNoConflictingFlags(opts: Record<string, unknown>, fieldFlags: readonly (readonly [flag: string, optsKey: string])[]): void;
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
export declare function assertRequiredFields(opts: Record<string, unknown>, requiredFields: readonly (readonly [flag: string, optsKey: string])[]): void;
//# sourceMappingURL=utils.d.ts.map