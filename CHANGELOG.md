# CLI Changelog

## [1.8.0] - 2026-10-05

### What's New
- Added `--data-plane-api-key` and `HH_DATA_PLANE_API_KEY` for fine-grained data plane API keys (`hh_fgdp_...`). Create one in the HoneyHive app under project, workspace, or organization **Settings → API keys**, on the **Data Plane** tab.
- Added `--project-id` to `charts list`, `charts create`, `charts get`, and `charts update`. With `--project-id`, the command calls the project-scoped route and authenticates with the data plane API key. Pass `--project-id` even when the key is rooted at that project. Without it, the command calls the legacy route with the project API key, even when a data plane key is configured. A project API key cannot stand in for a data plane key on the scoped route.
- Added `data-plane-api-keys create`, which creates a data plane API key. It takes `--project-id`, `--name`, `--permissions` (a JSON array such as `["project.chart.get"]`), `--expires-at` (ISO 8601), and an optional `--description`.
- Added `ingestion-api-keys create`, which creates an ingestion API key. It takes `--project-id`, `--name`, and an optional `--description`.
- `charts create` and `charts update` now accept `five_minute` and `auto` for `--bucketing`.

### Fixes & Improvements
- An error for a missing API key now names the key the command needs and the flag and environment variable that supply it. For data plane and control plane keys, the error also says where in the app to create one. An error for a malformed key names the flag or environment variable the bad value came from.
- `--verbose` on data plane commands now logs all three data plane keys (project, ingestion, and data plane), and prints `(none)` for any that are unset. A masked ingestion or fine-grained key shows its prefix and key id with the secret replaced by `******`, which matches the masked form in the HoneyHive app.

### Compatibility & Deprecations
- Calling `charts` commands without `--project-id` is deprecated. `--project-id` becomes required in the next major version. Pass it with a data plane API key.
- The CLI now checks every typed key you have configured (ingestion, data plane, control plane) when a command starts, including keys that command does not use. A key of the wrong type or an incomplete key in `HH_INGESTION_API_KEY`, `HH_DATA_PLANE_API_KEY`, or the matching flag now fails the command before it sends a request. The error names the flag or environment variable that holds the bad value. Fix or unset the stale value.
- The CLI no longer checks the format of the project API key (`--project-api-key` / `HH_PROJECT_API_KEY`) locally. It sends the value as given, and the server decides whether to accept it.

## [1.7.0] - 2026-09-22

### What's New
- Added `--ingestion-api-key` and `HH_INGESTION_API_KEY` for the commands that send traces and events: `sessions create`, `sessions create-event-batch`, `events create`, `events update`, and `events create-batch`. These take an ingestion API key (`hh_ingst_...`), created at project scope on the **API Keys** page under **Settings**. They still accept a project API key, so a shell that exports only `HH_PROJECT_API_KEY` keeps working. Give ingestion its own key in a new setup. Every other command is unchanged.
- Added `--slug` to `workspaces create` and `virtual-dataplanes create`. A slug takes letters, digits, and underscores only, and must be globally unique. Omit it and the server derives a slug from the name with a random suffix, exactly as before. Supply it when the identifier has to match a value maintained outside HoneyHive, such as an identity provider group that grants access to the scope. A slug already in use fails with a `409` naming the slug.

### Fixes & Improvements
- API keys are now trimmed before the CLI checks their shape. A key pasted with surrounding whitespace or a trailing newline is no longer rejected locally when the API would have accepted it.
- The pre-flight key check now judges the exact credential each command sends, rather than assuming one key per API. Its error names the key and the flag or environment variable that command needs.
- `metrics run` no longer fails with a `400` when the metric reads `ground_truth` and the event carries none. The command now exits 0 and prints `success: false` with `result: null` and the reason in `explanation`. A script that read the non-zero exit code as the signal must read `success` in the printed JSON instead.

### Compatibility & Deprecations
- Every command now gets a `404` where the API used to answer a permission failure with `403` or a rejected API key with `401`. A rejected key is one that is invalid, revoked, or expired. The response does not say which case applies, and the error no longer names the check that refused. A script that branched on `401` or `403` must read the not-found error as covering all three cases. These are server changes, so they apply to every CLI version.
- `--needs-ground-truth` and `--no-needs-ground-truth` on `metrics create` and `metrics update` are deprecated and ignored, and now log a deprecation warning to stderr. The server infers ground-truth use from the metric definition. A Python metric that reads `ground_truth` needs it, and so does an LLM metric whose template references it. The same field inside a `metric-versions create --content` payload, and inside any `--filename` payload, is likewise accepted and ignored. The flags will be removed in the next major version. Stop passing them.
- `workspace_id` inside the `--event` payload of `metrics run` is deprecated and ignored. The workspace whose provider credentials run the metric is derived from the authenticated key's scope, so naming a different workspace has no effect.
- The bundled YAML parser used for `--filename` input now bounds recursive merge aliases. A YAML file with deeply chained merge keys no longer expands unchecked.

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
