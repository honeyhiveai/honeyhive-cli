---
title: 'Configurations'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate. -->

# Configurations {#configurations}

Manage prompt configurations — model parameters, message templates, and response settings — that can be versioned and deployed without code changes.

## `list` {#list}

Retrieve a list of configurations

List configurations with optional filtering by name, environment, and tags.

### Usage

```sh
honeyhive configurations list [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--env` | string | no | Environment - "dev", "staging" or "prod" |
| `--name` | string | no | The name of the configuration like `v0` |
| `--tags` | string | no | Tags to filter configurations |

## `create` {#create}

Create a new configuration

Create a new LLM or pipeline configuration with provider, parameters, and environment settings.

### Usage

```sh
honeyhive configurations create [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--name` | string | yes | name |
| `--parameters` | json | yes | parameters |
| `--provider` | string | yes | provider |
| `--env` | json | no | env |
| `--tags` | json | no | tags |
| `--type` | string | no | type Allowed: `LLM`, `pipeline`. |
| `--user_properties` | json | no | user_properties |

## `update` {#update}

Update an existing configuration

Update an existing configuration's name, provider, parameters, environment, or tags.

### Usage

```sh
honeyhive configurations update [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--configId` | string | yes | Configuration ID like `6638187d505c6812e4043f24` |
| `--name` | string | yes | name |
| `--env` | json | no | env |
| `--parameters` | json | no | parameters |
| `--provider` | string | no | provider |
| `--tags` | json | no | tags |
| `--type` | string | no | type Allowed: `LLM`, `pipeline`. |
| `--user_properties` | json | no | user_properties |

## `delete` {#delete}

Delete a configuration

Permanently delete a configuration by its unique identifier.

### Usage

```sh
honeyhive configurations delete [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--configId` | string | yes | Configuration ID like `6638187d505c6812e4043f24` |
