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
