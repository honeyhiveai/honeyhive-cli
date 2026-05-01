---
title: 'Metrics'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate. -->

# Metrics {#metrics}

Define and run evaluators — automated quality checks that score traces against criteria like accuracy, safety, or correctness.

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
| `--child_metrics` | json | no | child_metrics |
| `--description` | string | no | description |
| `--enabled_in_prod` | boolean | no | enabled_in_prod |
| `--filters` | json | no | filters |
| `--model_name` | string | no | model_name |
| `--model_provider` | string | no | model_provider |
| `--needs_ground_truth` | boolean | no | needs_ground_truth |
| `--return_type` | string | no | return_type Allowed: `float`, `boolean`, `string`, `categorical`. |
| `--sampling_percentage` | number | no | sampling_percentage |
| `--scale` | number | no | scale |
| `--threshold` | json | no | threshold |

## `update` {#update}

Update an existing metric

Edit a metric

### Usage

```sh
honeyhive metrics update [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--id` | string | yes | id |
| `--categories` | json | no | categories |
| `--child_metrics` | json | no | child_metrics |
| `--criteria` | string | no | criteria |
| `--description` | string | no | description |
| `--enabled_in_prod` | boolean | no | enabled_in_prod |
| `--filters` | json | no | filters |
| `--model_name` | string | no | model_name |
| `--model_provider` | string | no | model_provider |
| `--name` | string | no | name |
| `--needs_ground_truth` | boolean | no | needs_ground_truth |
| `--return_type` | string | no | return_type Allowed: `float`, `boolean`, `string`, `categorical`. |
| `--sampling_percentage` | number | no | sampling_percentage |
| `--scale` | number | no | scale |
| `--threshold` | json | no | threshold |
| `--type` | string | no | type Allowed: `PYTHON`, `LLM`, `HUMAN`, `COMPOSITE`. |

## `delete` {#delete}

Delete a metric

Remove a metric

### Usage

```sh
honeyhive metrics delete [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--metric_id` | string | yes | metric_id |

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
