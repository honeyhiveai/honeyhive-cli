---
title: 'Events'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate. -->

# Events {#events}

Read and write trace events — the spans that capture every step of an AI application's execution.

## `create` {#create}

Create a new event

Create a new event (span) within a session trace. The request body is a
bare event object (no `event` wrapper).


**Required properties:**

- `event_type` (string) — Must be one of: `chain`, `model`, `tool`, `session`.
- `inputs` (object) — Input data for the event.

**Auto-generated properties** (provided by the server when omitted):

- `event_id` (string, UUID) — Unique identifier for the event.
- `session_id` (string, UUID) — Session/trace identifier.
- `parent_id` (string, UUID) — Parent event ID. Defaults to `session_id`.

**Optional properties with defaults:**

- `event_name` (string) — Name of the event. Defaults to `"unknown"`.
- `source` (string) — Source of the event (e.g. `sdk-python`). Defaults to `"unknown"`.

**Optional properties:**

- `config` (object) — Configuration data (e.g. model parameters, prompt templates).
- `outputs` (object) — Output data from the event.
- `error` (string or null) — Error message if the event failed.
- `children_ids` (array of strings) — IDs of child events.
- `duration` (number) — Duration of the event in milliseconds.
- `start_time` (number) — Unix timestamp in milliseconds for event start.
- `end_time` (number) — Unix timestamp in milliseconds for event end.
- `metadata` (object) — Additional metadata (e.g. token counts, cost).
- `metrics` (object) — Custom metrics.
- `feedback` (object) — Feedback data (e.g. ratings, ground truth).
- `user_properties` (object) — User properties associated with the event.

### Usage

```sh
honeyhive events create [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--event-type` | string | yes | Type of event (model, tool, chain, or session) Allowed: `model`, `tool`, `chain`, `session`. |
| `--inputs` | json | yes | Input data for the event |
| `--children-ids` | json | no | Child event IDs in the trace hierarchy |
| `--config` | json | no | Configuration used for this event |
| `--duration` | number | no | Event duration in milliseconds |
| `--end-time` | number | no | Event end time as Unix milliseconds |
| `--error` | string | no | Error message if the event failed |
| `--event-id` | string | no | Unique event identifier |
| `--event-name` | string | no | Name of the event |
| `--feedback` | json | no | Feedback data associated with the event |
| `--metadata` | json | no | Arbitrary metadata for the event |
| `--metrics` | json | no | Metric values computed for the event |
| `--outputs` | json | no | Output data from the event |
| `--parent-id` | string | no | Parent event ID in the trace hierarchy |
| `--project-id` | string | no | Project ID |
| `--session-id` | string | no | Session this event belongs to |
| `--source` | string | no | Source of the event (e.g., sdk-python) |
| `--start-time` | number | no | Event start time as Unix milliseconds |
| `--user-properties` | json | no | User properties associated with the event |

### Example response

```json
{
  "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
  "success": true
}
```

## `update` {#update}

Update an event

Update fields on an existing event. Only the provided fields are
modified; omitted fields are left unchanged. Extra fields not listed
below are accepted by the server but silently ignored.

### Usage

```sh
honeyhive events update [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--event-id` | string | yes | The unique identifier of the event to update |
| `--children-ids` | json | no | IDs of child events to set (must be non-empty; an empty array is ignored) |
| `--config` | json | no | Configuration fields to merge into the event |
| `--duration` | number | no | Event duration in milliseconds |
| `--end-time` | number | no | Unix timestamp in milliseconds for event end |
| `--feedback` | json | no | Feedback fields to merge into the event |
| `--metadata` | json | no | Metadata fields to merge into the event |
| `--metrics` | json | no | Metric values to merge into the event |
| `--outputs` | json | no | Output data to replace on the event (accepts objects, strings, arrays, or scalars) |
| `--user-properties` | json | no | User properties to merge into the event |

### Example request

```json
{
  "metadata": {
    "cost": 0.00008,
    "completion_tokens": 23,
    "prompt_tokens": 35,
    "total_tokens": 58
  },
  "feedback": {
    "rating": 5
  },
  "metrics": {
    "num_words": 2
  },
  "outputs": {
    "role": "assistant",
    "content": "Hello world"
  },
  "config": {
    "template": [
      {
        "role": "system",
        "content": "Hello, {{ name }}!"
      }
    ]
  },
  "user_properties": {
    "user_id": "691b1f94-d38c-4e92-b051-5e03fee9ff86"
  },
  "duration": 42
}
```

## `search` {#search}

Retrieve events based on filters

Search events via POST with filtering and pagination. This is the primary method for retrieving events from HoneyHive.

### Usage

```sh
honeyhive events search [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--date-range` | json | no | dateRange |
| `--evaluation-id` | string | no | Filter by evaluation/experiment run ID |
| `--filters` | json | no | filters |
| `--ignore-order` / `--no-ignore-order` | boolean | no | Deprecated: accepted for SDK back-compat but treated as a no-op. Pagination requires a stable ORDER BY to produce consistent pages, and with the 1000-row cap skipping the sort is not worth the inconsistency. The route always orders by start_time DESC. |
| `--limit` | number | no | Limit number of results (default 1000, max 1000) |
| `--page` | number | no | Page number of results (default 1) |

## `create-batch` {#create-batch}

Create a batch of events

Create multiple events in a single request. When `single_session` is
true, all events share the same session created from `session_properties`.


**Required properties:**

- `events` (array of event objects) — Each event must include
  `event_type` (one of `chain`, `model`, `tool`, `session`) and `inputs`.

**Optional properties:**

- `single_session` (boolean) — If true, all events share a single session
  created from `session_properties`. Defaults to false.
- `session_properties` (object) — Session metadata used when
  `single_session` is true. May include `session_name`, `start_time`,
  `metadata`.

Unknown top-level fields and per-event fields are rejected at the SDK
boundary; the legacy aliases `is_single_session`, `session`, and
per-event `project` are no longer accepted.

### Usage

```sh
honeyhive events create-batch [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--events` | json | yes | Array of events to create |
| `--session-properties` | json | no | Session properties for batch event creation |
| `--single-session` / `--no-single-session` | boolean | no | If true, all events share the same session |

### Example response

```json
{
  "event_ids": [
    "7f22137a-6911-4ed3-bc36-110f1dde6b66",
    "7f22137a-6911-4ed3-bc36-110f1dde6b67"
  ],
  "session_id": "caf77ace-3417-4da4-944d-f4a0688f3c23",
  "success": true
}
```
