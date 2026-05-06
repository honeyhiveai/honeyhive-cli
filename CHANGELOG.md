## [Unreleased]

## [1.0.0-rc.6] - 2026-05-06

### Added
- `--verbose` global flag (also enabled via `HH_VERBOSE=true`) that logs the resolved API URL, masked API key, and CLI version to stderr on startup. Useful for confirming which environment and credentials a command is using without interfering with JSON output on stdout.

## [1.0.0-rc.5] - 2026-05-05

### Added
- `sessions create` command for starting a new session against the migrated session start endpoint. All fields are optional; the server fills in defaults (e.g. generates a UUID `session_id`, falls back `event_name` to `session_name` then `"unknown"`). Posting twice with the same `--session-id` is idempotent and merges metadata into the existing session.

## [1.0.0-rc.4] - 2026-05-05

### Added
- `experiments get-run-schema` and `experiments get-runs-schema` commands for fetching run-scoped event schemas.

### Changed
- All command flags now use `--kebab-case` instead of `--camelCase` (e.g. `--projectId` → `--project-id`). Update any scripts that pass camelCase flags.
- Boolean flags now use the canonical `--flag` / `--no-flag` form instead of `--flag true` / `--flag false` (e.g. `--enabled` and `--no-enabled`).
- `events search`: maximum `--limit` reduced from 7500 to 1000, and `--ignore-order` is now a deprecated no-op (results are always ordered by `start_time` descending) to keep pagination consistent.
- `events create`, `events update`, `events create-batch`, `metrics create`, `metrics update`, `metrics delete`, `metrics run`, `experiments compare-runs`, and `experiments compare-run-events` now target the new canonical endpoints.

### Removed
- `sessions` and `configurations` top-level command groups.
- `events create-model`, `events create-model-batch`, `events get-events-schema`, and `experiments get-result` subcommands. Use `experiments get-run-schema` / `experiments get-runs-schema` in place of `events get-events-schema`.

## [1.0.0-rc.3] - 2026-05-02

### Added
- New curl-based shell install script for Linux CI runners, complementing the existing Homebrew install path for local development.

## [1.0.0-rc.2] - 2026-05-01

Internal improvements only.

## [1.0.0-rc.1] - 2026-04-30

### Added
- Initial release
