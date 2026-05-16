---
title: 'Charts'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate. -->

# Charts {#charts}

Define and manage saved charts — visualizations that aggregate metrics over time with bucketing, filters, and groupings.

## Schema introspection {#schema-introspection}

Every command below with arguments supports two read-only flags for tooling and AI agents:

- `--show-file-schema` — print the JSON Schema for the full request object (the format `--filename` accepts).
- `--show-argument-schema <flag-name>` — print the JSON Schema for one argument's value. Pass the kebab flag name **without** the leading `--` (e.g. `name`, not `--name`).

Both write pure JSON to stdout and never call the API. They cannot be combined with any other command-specific flag.

## `list` {#list}

List charts

Retrieve all charts in the current scope.

### Usage

```sh
honeyhive charts list
```

## `create` {#create}

Create a new chart

Add a new chart

### Usage

```sh
honeyhive charts create [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--metric` | string | yes | metric |
| `--name` | string | yes | name |
| `--bucketing` | string | no | bucketing Allowed: `minute`, `hour`, `day`, `week`, `month`. |
| `--date-range` | json | no | dateRange |
| `--description` | string | no | description |
| `--func` | string | no | func |
| `--group-by` | string | no | groupBy |
| `--owner-id` | string | no | owner_id |
| `--query` | json | no | query |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `get` {#get}

Get a chart

Retrieve a single chart by id.

### Usage

```sh
honeyhive charts get [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--chart-id` | string | yes | The unique identifier of the chart to retrieve |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `update` {#update}

Update a chart

Update a chart's editable fields. Only fields included in the request body are modified.

### Usage

```sh
honeyhive charts update [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--chart-id` | string | yes | The unique identifier of the chart to update |
| `--bucketing` | string | no | bucketing Allowed: `minute`, `hour`, `day`, `week`, `month`. |
| `--date-range` | json | no | dateRange |
| `--description` | string | no | description |
| `--func` | string | no | func |
| `--group-by` | string | no | groupBy |
| `--metric` | string | no | metric |
| `--name` | string | no | name |
| `--owner-id` | string | no | owner_id |
| `--query` | json | no | query |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `delete` {#delete}

Delete a chart

Remove a chart by id.

### Usage

```sh
honeyhive charts delete [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--chart-id` | string | yes | The unique identifier of the chart to delete |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).
