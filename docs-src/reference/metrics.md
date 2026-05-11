---
title: 'Metrics'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate. -->

# Metrics {#metrics}

Define and run evaluators — automated quality checks that score traces against criteria like accuracy, safety, or correctness.

## Schema introspection {#schema-introspection}

Every command below with arguments supports two read-only flags for tooling and AI agents:

- `--show-file-schema` — print the JSON Schema for the full request object (the format `--filename` accepts).
- `--show-argument-schema <flag-name>` — print the JSON Schema for one argument's value. Pass the kebab flag name **without** the leading `--` (e.g. `type`, not `--type`).

Both write pure JSON to stdout and never call the API. They cannot be combined with any other command-specific flag.

## `list` {#list}

Get all metrics

Retrieve a list of all metrics

### Usage

```sh
honeyhive metrics list [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--id` | string | no | Filter by specific metric ID |
| `--type` | string | no | Filter by metric type |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `create` {#create}

Create a new metric

Add a new metric

### Usage

```sh
honeyhive metrics create [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--criteria` | string | yes | criteria |
| `--name` | string | yes | name |
| `--type` | string | yes | type Allowed: `PYTHON`, `LLM`, `HUMAN`, `COMPOSITE`. |
| `--categories` | json | no | categories |
| `--child-metrics` | json | no | child_metrics |
| `--description` | string | no | description |
| `--enabled-in-prod` / `--no-enabled-in-prod` | boolean | no | enabled_in_prod |
| `--filters` | json | no | filters |
| `--model-name` | string | no | model_name |
| `--model-provider` | string | no | model_provider |
| `--needs-ground-truth` / `--no-needs-ground-truth` | boolean | no | needs_ground_truth |
| `--return-type` | string | no | return_type Allowed: `float`, `boolean`, `string`, `categorical`. |
| `--sampling-percentage` | number | no | sampling_percentage |
| `--scale` | number | no | scale |
| `--threshold` | json | no | threshold |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `update` {#update}

Update an existing metric

Update a metric's editable fields. Only fields included in the request body are modified.

### Usage

```sh
honeyhive metrics update [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--metric-id` | string | yes | The unique identifier of the metric to update |
| `--categories` | json | no | categories |
| `--child-metrics` | json | no | child_metrics |
| `--criteria` | string | no | criteria |
| `--description` | string | no | description |
| `--enabled-in-prod` / `--no-enabled-in-prod` | boolean | no | enabled_in_prod |
| `--filters` | json | no | filters |
| `--model-name` | string | no | model_name |
| `--model-provider` | string | no | model_provider |
| `--name` | string | no | name |
| `--needs-ground-truth` / `--no-needs-ground-truth` | boolean | no | needs_ground_truth |
| `--return-type` | string | no | return_type Allowed: `float`, `boolean`, `string`, `categorical`. |
| `--sampling-percentage` | number | no | sampling_percentage |
| `--scale` | number | no | scale |
| `--threshold` | json | no | threshold |
| `--type` | string | no | type Allowed: `PYTHON`, `LLM`, `HUMAN`, `COMPOSITE`. |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `delete` {#delete}

Delete a metric

Remove a metric by id.

### Usage

```sh
honeyhive metrics delete [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--metric-id` | string | yes | The unique identifier of the metric to delete |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `run` {#run}

Run a metric evaluation

Execute a metric on a specific event

### Usage

```sh
honeyhive metrics run [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--event` | json | yes | event |
| `--metric` | json | yes | metric |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).
