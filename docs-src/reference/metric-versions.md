---
title: 'Metric Versions'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate. -->

# Metric Versions {#metric-versions}

Snapshot, list, and deploy versions of a metric's definition so changes can be reviewed and rolled back without losing history.

## Schema introspection {#schema-introspection}

Every command below with arguments supports two read-only flags for tooling and AI agents:

- `--show-file-schema` — print the JSON Schema for the full request object (the format `--filename` accepts).
- `--show-argument-schema <flag-name>` — print the JSON Schema for one argument's value. Pass the kebab flag name **without** the leading `--` (e.g. `metric-id`, not `--metric-id`).

Both write pure JSON to stdout and never call the API. They cannot be combined with any other command-specific flag.

## `list` {#list}

List versions for a metric

Retrieve all snapshot versions of the metric's definition, ordered oldest-first. Returns the entire history unpaginated — a deliberate departure from AIP-158 because the per-metric version count is bounded in practice by how many times a user has clicked "Save" (typically single or double digits). If usage patterns change, swap to the repo-standard `page` / `limit` / `pagination` shape used by `/v1/runs`.

### Usage

```sh
honeyhive metric-versions list [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--metric-id` | string | yes | The unique identifier of the metric whose versions are being listed |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `create` {#create}

Create a new metric version

Snapshot the supplied metric definition as a new version. By default the version is created as a draft (`deployed: false`); set `deploy_immediately: true` to also make it the live version in the same transaction.

### Usage

```sh
honeyhive metric-versions create [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--content` | json | yes | Metric definition snapshot accepted by POST /v1/metrics/{metric_id}/versions. Six fields are optional and fall back to server-side defaults when omitted: - `description` → `""` - `return_type` → `"float"` - `enabled_in_prod` → `true` for HUMAN metrics, `false` otherwise - `needs_ground_truth` → `false` - `sampling_percentage` → `10` - `filters` → `{ "filterArray": [] }` |
| `--message` | string | yes | message |
| `--metric-id` | string | yes | The unique identifier of the metric to version |
| `--deploy-immediately` / `--no-deploy-immediately` | boolean | no | deploy_immediately |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).

## `deploy` {#deploy}

Deploy a specific metric version

Mark the named version as the live version for the metric, unmarking any previously deployed version.

### Usage

```sh
honeyhive metric-versions deploy [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--metric-id` | string | yes | The unique identifier of the metric |
| `--version-name` | string | yes | The name of the version to deploy |

Also supports `--show-file-schema`, `--show-argument-schema <flag-name>`, and `--filename` — see [Schema introspection](#schema-introspection).
