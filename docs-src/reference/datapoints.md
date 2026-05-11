---
title: 'Datapoints'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate. -->

# Datapoints {#datapoints}

Manage individual records inside datasets, including batch creation and mapping to source events.

## Schema introspection {#schema-introspection}

Every command below with arguments supports two read-only flags for tooling and AI agents:

- `--show-file-schema` — print the JSON Schema for the full request object (the format `--filename` accepts).
- `--show-argument-schema <flag-name>` — print the JSON Schema for one argument's value. Pass the kebab flag name **without** the leading `--` (e.g. `datapoint-ids`, not `--datapoint-ids`).

Both write pure JSON to stdout and never call the API. They cannot be combined with any other command-specific flag.

## `list` {#list}

Retrieve a list of datapoints

Retrieve datapoints, optionally filtered by a list of datapoint IDs or dataset name.

### Usage

```sh
honeyhive datapoints list [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--datapoint-ids` | json | no | List of datapoint ids to fetch |
| `--dataset-name` | string | no | Name of the dataset to get datapoints from |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `create` {#create}

Create a new datapoint

Create a single datapoint with inputs, history, ground truth, and metadata.

### Usage

```sh
honeyhive datapoints create [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--ground-truth` | json | no | ground_truth |
| `--history` | json | no | history |
| `--inputs` | json | no | inputs |
| `--linked-datasets` | json | no | linked_datasets |
| `--linked-event` | string | no | linked_event |
| `--metadata` | json | no | metadata |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `create-batch` {#create-batch}

Create multiple datapoints in batch

Create multiple datapoints from events using field mappings and optional filters.

### Usage

```sh
honeyhive datapoints create-batch [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--check-state` | json | no | checkState |
| `--dataset-id` | string | no | dataset_id |
| `--date-range` | json | no | dateRange |
| `--events` | json | no | events |
| `--filters` | json | no | filters |
| `--mapping` | json | no | mapping |
| `--select-all` / `--no-select-all` | boolean | no | selectAll |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `get` {#get}

Retrieve a specific datapoint

Get a single datapoint by its unique identifier.

### Usage

```sh
honeyhive datapoints get [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--datapoint-id` | string | yes | Datapoint ID like `65c13dbbd65fb876b7886cdb` |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `update` {#update}

Update a specific datapoint

Update fields on an existing datapoint. Only the provided fields are modified.

### Usage

```sh
honeyhive datapoints update [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--datapoint-id` | string | yes | ID of datapoint to update |
| `--ground-truth` | json | no | ground_truth |
| `--history` | json | no | history |
| `--inputs` | json | no | inputs |
| `--linked-datasets` | json | no | linked_datasets |
| `--linked-event` | string | no | linked_event |
| `--metadata` | json | no | metadata |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `delete` {#delete}

Delete a specific datapoint

Permanently delete a datapoint by its unique identifier.

### Usage

```sh
honeyhive datapoints delete [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--datapoint-id` | string | yes | Datapoint ID like `65c13dbbd65fb876b7886cdb` |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).
