---
title: 'Events'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate. -->

# Events {#events}

Read and write trace events — the spans that capture every step of an AI application's execution.

## `create` {#create}

Create a new event

Create a new event (span) within a session trace. The request body wraps the event object under the `event` key.

**Required properties** within the event object:
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
| `--event` | json | yes | Full event object for legacy event creation endpoints |

### Example response

```json
{
  "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
  "success": true
}
```

## `update` {#update}

Update an event

Update fields on an existing event. Only the provided fields are modified; omitted fields are left unchanged. The event_id field is required to identify the event to update.

### Usage

```sh
honeyhive events update [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--event_id` | string | yes | Event ID to update |
| `--children_ids` | json | no | IDs of child events to set (must be non-empty; an empty array is ignored) |
| `--config` | json | no | Configuration fields to merge into the event |
| `--duration` | number | no | Event duration in milliseconds |
| `--end_time` | number | no | Unix timestamp in milliseconds for event end |
| `--feedback` | json | no | Feedback fields to merge into the event |
| `--metadata` | json | no | Metadata fields to merge into the event |
| `--metrics` | json | no | Metric values to merge into the event |
| `--outputs` | json | no | Output data to replace on the event (accepts objects, strings, arrays, or scalars) |
| `--user_properties` | json | no | User properties to merge into the event |

### Example request

```json
{
  "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
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
| `--dateRange` | json | no | dateRange |
| `--evaluation_id` | string | no | Filter by evaluation/experiment run ID |
| `--filters` | json | no | filters |
| `--ignore_order` | boolean | no | If true, skip result ordering for faster queries |
| `--limit` | number | no | Limit number of results (default 1000, max 7500) |
| `--page` | number | no | Page number of results (default 1) |

## `create-model` {#create-model}

Create a new model event

Create a model event. The event_type is automatically set to 'model'. Please refer to our instrumentation guide for detailed information.

### Usage

```sh
honeyhive events create-model [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--model_event` | json | yes | Model event object with model-specific fields and legacy aliases |

### Example response

```json
{
  "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
  "success": true
}
```

## `create-batch` {#create-batch}

Create a batch of events

Create multiple events in a single request. When single_session is true, all events share the same session. Please refer to our instrumentation guide for detailed information.

### Usage

```sh
honeyhive events create-batch [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--events` | json | yes | Array of events to create |
| `--is_single_session` | boolean | no | Legacy field name for single_session (backward compatibility) |
| `--session` | json | no | Session properties for batch event creation |
| `--session_properties` | json | no | Session properties for batch event creation |
| `--single_session` | boolean | no | If true, all events share the same session |

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

## `create-model-batch` {#create-model-batch}

Create a batch of model events

Create multiple model events in a single request. The event_type is automatically set to 'model' for all events. When single_session is true, all events share the same session. Please refer to our instrumentation guide for detailed information.

### Usage

```sh
honeyhive events create-model-batch [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--model_events` | json | yes | Array of model events to create |
| `--is_single_session` | boolean | no | Legacy field name for single_session (backward compatibility) |
| `--session` | json | no | Session properties for batch event creation |
| `--session_properties` | json | no | Session properties for batch event creation |
| `--single_session` | boolean | no | If true, all events share the same session |

### Example response

```json
{
  "event_ids": [
    "7f22137a-6911-4ed3-bc36-110f1dde6b66",
    "7f22137a-6911-4ed3-bc36-110f1dde6b67"
  ],
  "success": true
}
```

## `get-events-schema` {#get-events-schema}

Get events schema

Retrieve the schema and metadata for experiment events

### Usage

```sh
honeyhive events get-events-schema [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--dateRange` | json | no | Filter by date range |
| `--evaluation_id` | string | no | Filter by evaluation/run ID |
