---
title: 'Sessions'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate. -->

# Sessions {#sessions}

Group related trace events into sessions, the top-level container for a multi-step or multi-service AI interaction.

## `create` {#create}

Start a new session

Start a new session. The request body is a bare session object (no
`session` wrapper). The server creates a session event and returns
it.

**No required properties** — every field has a server-side fallback.

**Auto-generated properties** (provided by the server when omitted):

- `session_id` (string, UUID) — Server generates a UUIDv4 if omitted
  or if the supplied value is not a valid UUID.

**Optional properties with defaults:**

- `event_name` (string) — Falls back to `session_name` when not
  provided; defaults to `"unknown"` if both are absent.
- `source` (string) — Defaults to `"unknown"`.

**Optional properties:**

- `session_name` (string) — Display name for the session.
- `start_time` (number) — Session start time as Unix milliseconds.
  The session normalizer uses `getInt64()` which only accepts numeric
  types; if a string is passed, the server silently falls back to the
  current time.
- `end_time` (number) — Session end time as Unix milliseconds (same
  numeric-only caveat as `start_time`).
- `duration` (number) — Session duration in milliseconds.
- `config` (object) — Configuration associated with the session.
- `inputs` (object) — Input data for the session.
- `outputs` (object) — Output data from the session.
- `metadata` (object) — Arbitrary metadata.
- `user_properties` (object) — User properties.
- `children_ids` (array of strings) — IDs of child events.

Idempotent on `session_id`: posting twice with the same `session_id`
merges metadata/user_properties into the existing session and returns
the existing event.

### Usage

```sh
honeyhive sessions create [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--children-ids` | json | no | IDs of child events in this session |
| `--config` | json | no | Configuration associated with the session |
| `--duration` | number | no | Session duration in milliseconds |
| `--end-time` | number | no | Session end time as Unix milliseconds |
| `--event-name` | string | no | Fallback name if session_name is not provided |
| `--inputs` | json | no | Input data for the session |
| `--metadata` | json | no | Arbitrary metadata for the session |
| `--outputs` | json | no | Output data from the session |
| `--session-id` | string | no | Client-provided session ID (server generates one if omitted) |
| `--session-name` | string | no | Display name for the session |
| `--source` | string | no | Source of the session (e.g., sdk-python) |
| `--start-time` | number | no | Session start time as Unix milliseconds |
| `--user-properties` | json | no | User properties associated with the session |
