---
title: 'Datasets'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate. -->

# Datasets {#datasets}

Curate collections of datapoints used as test sets for evaluations and experiments.

## Schema introspection {#schema-introspection}

Every command below with arguments supports two read-only flags for tooling and AI agents:

- `--show-file-schema` — print the JSON Schema for the full request object (the format `--filename` accepts).
- `--show-argument-schema <flag-name>` — print the JSON Schema for one argument's value. Pass the kebab flag name **without** the leading `--` (e.g. `dataset-id`, not `--dataset-id`).

Both write pure JSON to stdout and never call the API. They cannot be combined with any other command-specific flag.

## `list` {#list}

Get datasets

Retrieve datasets, optionally filtered by dataset ID or name.

### Usage

```sh
honeyhive datasets list [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--dataset-id` | string | no | Unique dataset ID for filtering specific dataset |
| `--name` | string | no | Dataset name to filter by |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `create` {#create}

Create a dataset

Create a new dataset with an optional name, description, and initial set of datapoint IDs.

### Usage

```sh
honeyhive datasets create [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--datapoints` | json | no | Initial datapoint IDs to include |
| `--description` | string | no | Description of the dataset |
| `--name` | string | no | Name of the dataset |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `update` {#update}

Update a dataset

Update a dataset's name, description, or list of datapoint IDs.

### Usage

```sh
honeyhive datasets update [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--dataset-id` | string | yes | The unique identifier of the dataset to update like `663876ec4611c47f4970f0c3` |
| `--datapoints` | json | no | Updated list of datapoint IDs |
| `--description` | string | no | New dataset description |
| `--name` | string | no | New dataset name |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `delete` {#delete}

Delete a dataset

Permanently delete a dataset by its unique identifier.

### Usage

```sh
honeyhive datasets delete [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--dataset-id` | string | yes | The unique identifier of the dataset to be deleted like `663876ec4611c47f4970f0c3` |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `add-datapoints` {#add-datapoints}

Add datapoints to a dataset

Add new datapoints to an existing dataset. Provide raw data objects and a field mapping that specifies which fields map to inputs, ground truth, and history.

### Usage

```sh
honeyhive datasets add-datapoints [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--data` | json | yes | Array of datapoint data objects to add |
| `--dataset-id` | string | yes | The unique identifier of the dataset to add datapoints to like `663876ec4611c47f4970f0c3` |
| `--mapping` | json | yes | mapping |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `remove-datapoint` {#remove-datapoint}

Remove a datapoint from a dataset

Remove a specific datapoint from a dataset. The datapoint itself is not deleted, only dereferenced from the dataset.

### Usage

```sh
honeyhive datasets remove-datapoint [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--datapoint-id` | string | yes | The unique identifier of the datapoint to remove |
| `--dataset-id` | string | yes | The unique identifier of the dataset |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).
