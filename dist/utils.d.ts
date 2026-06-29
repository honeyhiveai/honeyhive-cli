import { Client } from '@honeyhive/api-client';
import { type Command } from 'commander';
export declare function createDataPlaneClient(command: Command): Client;
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
export declare function assertNoOtherFlags(opts: Record<string, unknown>, otherFlags: readonly (readonly [flag: string, optsKey: string])[], context: string): void;
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
export declare function handleSchemaIntrospection(opts: Record<string, unknown>, fileSchemaJson: string, kebabToSpec: Readonly<Record<string, string>>, otherFlags: readonly (readonly [flag: string, optsKey: string])[]): boolean;
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