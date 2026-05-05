---
title: 'Experiments'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate. -->

# Experiments {#experiments}

Run, retrieve, and compare evaluation runs to measure how prompt or configuration changes affect agent performance.

## `list-runs` {#list-runs}

Get a list of evaluation runs

List experiment runs with optional filtering by dataset, status, name, date range, and specific run IDs. Results are paginated and sortable.

### Usage

```sh
honeyhive experiments list-runs [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--dataset-id` | string | no | Filter by dataset ID |
| `--date-range` | json | no | Filter by date range |
| `--limit` | number | no | Number of results per page |
| `--name` | string | no | Filter by run name |
| `--page` | number | no | Page number for pagination |
| `--run-ids` | json | no | List of specific run IDs to fetch |
| `--sort-by` | string | no | Field to sort by Allowed: `created_at`, `updated_at`, `name`, `status`. |
| `--sort-order` | string | no | Sort order Allowed: `asc`, `desc`. |
| `--status` | string | no | Filter by run status Allowed: `pending`, `completed`, `failed`, `cancelled`, `running`. |

## `create-run` {#create-run}

Create a new evaluation run

Create a new experiment run to track an evaluation against a dataset.

### Usage

```sh
honeyhive experiments create-run [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--configuration` | json | no | configuration |
| `--datapoint-ids` | json | no | datapoint_ids |
| `--dataset-id` | string | no | dataset_id |
| `--description` | string | no | description |
| `--evaluators` | json | no | evaluators |
| `--event-ids` | json | no | event_ids |
| `--metadata` | json | no | metadata |
| `--name` | string | no | name |
| `--passing-ranges` | json | no | passing_ranges |
| `--results` | json | no | results |
| `--run-id` | string | no | run_id |
| `--session-ids` | json | no | session_ids |
| `--status` | string | no | status Allowed: `pending`, `completed`, `failed`, `cancelled`, `running`. |

## `get-runs-schema` {#get-runs-schema}

Get events schema across all experiment runs in a project

Retrieve the aggregated events schema (fields, datasets, mappings) across all experiment runs in the project.

### Usage

```sh
honeyhive experiments get-runs-schema [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--date-range` | json | no | Filter by date range |

## `get-run` {#get-run}

Get details of an evaluation run

Retrieve the full details of a single experiment run by its run ID.

### Usage

```sh
honeyhive experiments get-run [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--run-id` | string | yes | run_id |

## `update-run` {#update-run}

Update an evaluation run

Update fields on an existing experiment run such as name, status, metadata, or results.

### Usage

```sh
honeyhive experiments update-run [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--run-id` | string | yes | run_id |
| `--configuration` | json | no | configuration |
| `--datapoint-ids` | json | no | datapoint_ids |
| `--description` | string | no | description |
| `--evaluators` | json | no | evaluators |
| `--event-ids` | json | no | event_ids |
| `--metadata` | json | no | metadata |
| `--name` | string | no | name |
| `--passing-ranges` | json | no | passing_ranges |
| `--results` | json | no | results |
| `--session-ids` | json | no | session_ids |
| `--status` | string | no | status Allowed: `pending`, `completed`, `failed`, `cancelled`, `running`. |

## `delete-run` {#delete-run}

Delete an evaluation run

Permanently delete an experiment run by its run ID.

### Usage

```sh
honeyhive experiments delete-run [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--run-id` | string | yes | run_id |

## `get-run-schema` {#get-run-schema}

Get events schema for a single experiment run

Retrieve the events schema (fields, datasets, mappings) for a single experiment run.

### Usage

```sh
honeyhive experiments get-run-schema [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--run-id` | string | yes | Experiment run ID (UUIDv4) |
| `--date-range` | json | no | Filter by date range |

## `get-run-metrics` {#get-run-metrics}

Get event metrics for an experiment run

Retrieve event metrics from ClickHouse for a specific experiment run

### Usage

```sh
honeyhive experiments get-run-metrics [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--run-id` | string | yes | Experiment run ID (UUIDv4) |
| `--date-range` | string | no | Date range filter as JSON string |
| `--filters` | json | no | Optional filters to apply (JSON string or array of filter objects) |

## `compare-runs` {#compare-runs}

Retrieve experiment comparison

Compare metrics and results between two experiment runs

### Usage

```sh
honeyhive experiments compare-runs [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--new-run-id` | string | yes | New experiment run ID to compare (UUIDv4) |
| `--old-run-id` | string | yes | Old experiment run ID to compare against (UUIDv4) |
| `--aggregate-function` | string | no | Aggregation function to apply to metrics Allowed: `average`, `min`, `max`, `median`, `p95`, `p99`, `p90`, `sum`, `count`. |
| `--filters` | json | no | Optional filters to apply (JSON string or array of filter objects) |

## `compare-run-events` {#compare-run-events}

Compare events between two experiment runs

Retrieve and compare events between two experiment runs for detailed analysis

### Usage

```sh
honeyhive experiments compare-run-events [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--new-run-id` | string | yes | New experiment run ID (UUIDv4) |
| `--old-run-id` | string | yes | Old experiment run ID to compare against (UUIDv4) |
| `--event-name` | string | no | Filter by event name |
| `--event-type` | string | no | Filter by event type |
| `--filter` | json | no | Additional filter criteria (JSON string or object) |
| `--limit` | number | no | Maximum number of results |
| `--page` | number | no | Page number for pagination |
