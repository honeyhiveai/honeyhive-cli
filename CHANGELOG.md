# CLI Changelog

## [1.4.0] - 2026-06-26

### What's New
- Added `events get --event-id <id>` to fetch a single event by its ID.
- Added the `--project-api-key` flag and `HH_PROJECT_API_KEY` environment variable as the primary way to authenticate the CLI. Verbose output now labels the key as `Project API key:` (previously `API Key:`).
- `experiments list-runs`, `experiments get-run`, and `experiments get-summary` output now includes the linked `dataset_name`, and `get-summary` now reports `dataset_id` for offline (`EXT-*`) datasets that previously returned `null`.

### Fixes & Improvements
- `events update --outputs` now requires an object or `null` (where `null` preserves the existing outputs); non-object values (strings, arrays, scalars) are rejected up front. These values were previously accepted but corrupted the stored event, which could break other consumers reading it back.

### Compatibility & Deprecations
- The `--api-key` flag and `HH_API_KEY` environment variable are now deprecated aliases for `--project-api-key` / `HH_PROJECT_API_KEY`. They still work but log a deprecation warning to stderr and will be removed in the next major version. Migrate to the new names.

## [1.3.0] - 2026-05-29

### What's New
- Added `metric-versions` subcommands for managing snapshot versions of a metric's definition: `metric-versions list`, `metric-versions create`, and `metric-versions deploy`. Use these to review history, create new draft or immediately-deployed versions, and roll between versions without losing history.

## [1.2.1] - 2026-05-22

Internal improvements only.

## [1.2.0] - 2026-05-21

### What's New
- Added `--data-plane-url` flag and `HH_DATA_PLANE_URL` environment variable for pointing the CLI at a specific HoneyHive data plane (e.g. self-hosted or staging deployments). Verbose output now labels this value as `Data plane URL:` instead of `API URL:`.

### Compatibility & Deprecations
- The `--base-url` flag and `HH_API_URL` environment variable are deprecated and will be removed in the next major version. They still work as aliases for the new names but now log a deprecation warning to stderr on each invocation. Migrate to `--data-plane-url` / `HH_DATA_PLANE_URL`.

## [1.1.1] - 2026-05-19

### Fixes & Improvements
- Error output for failed API requests now includes the server's error message. All CLI commands that hit the API previously printed only `API error <status>`; they now print `API error <status>: <message>` with the actionable detail from the server.

## [1.1.0] - 2026-05-15

### What's New
- Added `charts` subcommands for managing charts via the CLI: `charts list`, `charts create`, `charts get`, `charts update`, and `charts delete`.
- Added `sessions create-event-batch` for adding a batch of events to an existing session.
- Added `experiments get-summary` for retrieving an experiment run's evaluation summary, including pass/fail results and metric aggregations.

## [1.0.0] - 2026-05-11

Initial launch
