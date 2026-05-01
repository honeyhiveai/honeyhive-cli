---
title: 'Datapoints'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate. -->

# Datapoints {#datapoints}

Manage individual records inside datasets, including batch creation and mapping to source events.

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
| `--datapoint_ids` | json | no | List of datapoint ids to fetch |
| `--dataset_name` | string | no | Name of the dataset to get datapoints from |

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
| `--ground_truth` | json | no | ground_truth |
| `--history` | json | no | history |
| `--inputs` | json | no | inputs |
| `--linked_datasets` | json | no | linked_datasets |
| `--linked_event` | string | no | linked_event |
| `--metadata` | json | no | metadata |

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
| `--checkState` | json | no | checkState |
| `--dataset_id` | string | no | dataset_id |
| `--dateRange` | json | no | dateRange |
| `--events` | json | no | events |
| `--filters` | json | no | filters |
| `--mapping` | json | no | mapping |
| `--selectAll` | boolean | no | selectAll |

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
| `--datapoint_id` | string | yes | Datapoint ID like `65c13dbbd65fb876b7886cdb` |

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
| `--datapoint_id` | string | yes | ID of datapoint to update |
| `--ground_truth` | json | no | ground_truth |
| `--history` | json | no | history |
| `--inputs` | json | no | inputs |
| `--linked_datasets` | json | no | linked_datasets |
| `--linked_event` | string | no | linked_event |
| `--metadata` | json | no | metadata |

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
| `--datapoint_id` | string | yes | Datapoint ID like `65c13dbbd65fb876b7886cdb` |
