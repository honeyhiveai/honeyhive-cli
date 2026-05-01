---
title: 'Sessions'
outline: deep
---

<!-- AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate. -->

# Sessions {#sessions}

Group related trace events into sessions, the top-level container for a multi-step or multi-service AI interaction.

## `start` {#start}

Start a new session

Start a new session. The request body wraps the session event object under the `session` key, matching the pattern used by POST /events.

### Usage

```sh
honeyhive sessions start [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--session` | json | yes | session |

## `add-traces` {#add-traces}

Add traces to a session

Add trace events to an existing session. The field is named `logs` for legacy compatibility with the Go ingestion handler.

### Usage

```sh
honeyhive sessions add-traces [options]
```

### Options

| Flag | Type | Required | Description |
|---|---|---|---|
| `--logs` | json | yes | logs |
| `--session_id` | string | yes | Session ID to add traces to |
