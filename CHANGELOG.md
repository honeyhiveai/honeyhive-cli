# CLI Changelog

## [1.6.0] - 2026-08-14

### What's New
- Added `workspaces` subcommands for managing workspaces: `workspaces create`, `workspaces get`, `workspaces update`, and `workspaces delete`. `workspaces create` takes `--virtual-dataplane-id` and `--name`, plus optional `--description` and `--workspace-creator` (the email of the user to grant workspace-creator membership to, for API key callers).
- Added `virtual-dataplanes` subcommands for managing virtual data planes: `virtual-dataplanes create`, `virtual-dataplanes get`, `virtual-dataplanes update`, and `virtual-dataplanes delete`. `virtual-dataplanes create` takes `--org-id` and `--name`, plus optional `--cluster-id` (required when the organization has no virtual data planes yet, or its virtual data planes span more than one cluster) and `--dataplane-creator`.
- `workspaces delete` and `virtual-dataplanes delete` accept `--dangerously-delete-child-scopes` to archive a scope that still has active children, archiving those children too. Without the flag, deleting a workspace with active projects — or a virtual data plane with active workspaces — fails with a `409` and changes nothing.
- Like `projects` and `alerts`, both new command groups talk to the HoneyHive control plane: they take a fine-grained control plane API key (`hh_fgcp_...`) via `--control-plane-api-key` / `HH_CONTROL_PLANE_API_KEY` and honor `--control-plane-url` / `HH_CONTROL_PLANE_URL`. Data plane commands are unchanged and still use `--project-api-key` / `HH_PROJECT_API_KEY`.

### Fixes & Improvements
- Security fixes

## [1.5.1] - 2026-08-04

### Fixes & Improvements
- Fixed the Homebrew formula published for each release so `brew install honeyhive` and `brew upgrade honeyhive` resolve the current CLI version. The formula no longer declares an explicit version that recent Homebrew versions reject as redundant during validation.

### Compatibility & Deprecations
- Installing a stable release via Homebrew now requires Homebrew 6.0.14 or newer, which reads the version from the release URL. An older client that installs without updating first — most commonly `HOMEBREW_NO_AUTO_UPDATE=1` in a Docker or CI image — records the wrong version and will not report the install as outdated afterwards. Run `brew update` before installing, or reinstall once Homebrew is current. `npm` and `npx` installs are unaffected.

## [1.5.0] - 2026-08-03

### What's New
- Added `projects` subcommands for managing projects: `projects create`, `projects get`, `projects update`, and `projects delete`.
- Added `alerts` subcommands: `alerts list`, `alerts create`, and `alerts get`.
- Added `--control-plane-api-key` / `HH_CONTROL_PLANE_API_KEY` and `--control-plane-url` / `HH_CONTROL_PLANE_URL`. The new `projects` and `alerts` commands talk to the HoneyHive control plane, which takes a fine-grained control plane API key (`hh_fgcp_...`) created at workspace or organization scope — not a project API key. Every other command is unchanged and still uses `--project-api-key` / `HH_PROJECT_API_KEY`; you only need the key for the commands you actually run.

### Fixes & Improvements
- The CLI now checks what kind of API key you supplied before sending a request. Passing a control plane key to a data plane command (or the reverse) fails immediately with a message naming the key kind the command needs and the flag or environment variable the wrong key came from, instead of an unexplained `401` from the server.
- `--verbose` now reports the URL and key for whichever API the command talks to (`Control plane URL:` for `projects` and `alerts`), and masks a fine-grained control plane key exactly as the HoneyHive app displays it, so you can match a log line to a key in your account.

### Compatibility & Deprecations
- Composite metrics are no longer supported. `metrics create` and `metrics update` now fail with a `400` when passed `--type COMPOSITE`, existing composite metrics and their versions have been deleted, and `--child-metrics` no longer has any effect on a metric's score.

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
