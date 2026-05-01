---
title: 'Queues'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate. -->

# Queues {#queues}

Manage annotation queues for human review of traces, turning expert feedback into labeled datasets.

## `list` {#list}

List annotation queues

List annotation queues for the current project scope, optionally filtered by enabled status.

### Usage

```sh
honeyhive queues list [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--enabled` | boolean | no | Filter by enabled status |

## `create` {#create}

Create an annotation queue

Create a new annotation queue with a name, optional description, filters, and an initial set of event IDs to add.

### Usage

```sh
honeyhive queues create [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--name` | string | yes | name |
| `--description` | string | no | description |
| `--enabled` | boolean | no | enabled |
| `--event_ids` | json | no | event_ids |
| `--filters` | json | no | filters |

## `get` {#get}

Get an annotation queue

Retrieve a single annotation queue by its unique identifier.

### Usage

```sh
honeyhive queues get [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--queue_id` | string | yes | Annotation queue ID |

## `update` {#update}

Update an annotation queue

Update fields on an existing annotation queue. Supports updating name, description, filters, enabled status, and adding/removing events.

### Usage

```sh
honeyhive queues update [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--id` | string | yes | id |
| `--queue_id` | string | yes | Annotation queue ID |
| `--add_event_ids` | json | no | add_event_ids |
| `--description` | string | no | description |
| `--enabled` | boolean | no | enabled |
| `--filters` | json | no | filters |
| `--name` | string | no | name |
| `--remove_event_ids` | json | no | remove_event_ids |

## `delete` {#delete}

Delete an annotation queue

Soft-delete an annotation queue by its unique identifier.

### Usage

```sh
honeyhive queues delete [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--queue_id` | string | yes | Annotation queue ID |
