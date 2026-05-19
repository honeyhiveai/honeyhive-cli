// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.

import { Command } from 'commander';

import {
  assertNoOtherFlags,
  assertRequiredFields,
  createClient,
  handleSchemaIntrospection,
  parseJson,
  parseNumber,
  readRequestFile,
} from '../../utils.js';

export function sessionsCommand(): Command {
  const cmd = new Command('sessions').description('Sessions commands');

  cmd
    .command('create')
    .description('Start a new session')
    .option('--session-id <value>', 'Client-provided session ID (server generates one if omitted)')
    .option('--session-name <value>', 'Display name for the session')
    .option('--event-name <value>', 'Fallback name if session_name is not provided')
    .option('--source <value>', 'Source of the session (e.g., sdk-python)')
    .option('--start-time <value>', 'Session start time as Unix milliseconds')
    .option('--end-time <value>', 'Session end time as Unix milliseconds')
    .option('--duration <value>', 'Session duration in milliseconds')
    .option('--config <json>', 'Configuration associated with the session')
    .option('--inputs <json>', 'Input data for the session')
    .option('--outputs <json>', 'Output data from the session')
    .option('--metadata <json>', 'Arbitrary metadata for the session')
    .option('--user-properties <json>', 'User properties associated with the session')
    .option('--children-ids <json>', 'IDs of child events in this session')
    .option(
      '--show-file-schema',
      'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.',
    )
    .option(
      '--show-argument-schema <flag-name>',
      'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.',
    )
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const FIELD_FLAG_PAIRS = [
          ['--session-id', 'sessionId'],
          ['--session-name', 'sessionName'],
          ['--event-name', 'eventName'],
          ['--source', 'source'],
          ['--start-time', 'startTime'],
          ['--end-time', 'endTime'],
          ['--duration', 'duration'],
          ['--config', 'config'],
          ['--inputs', 'inputs'],
          ['--outputs', 'outputs'],
          ['--metadata', 'metadata'],
          ['--user-properties', 'userProperties'],
          ['--children-ids', 'childrenIds'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "session_id": {
      "type": "string",
      "description": "Client-provided session ID (server generates one if omitted)"
    },
    "session_name": {
      "type": "string",
      "description": "Display name for the session"
    },
    "event_name": {
      "type": "string",
      "description": "Fallback name if session_name is not provided"
    },
    "source": {
      "type": "string",
      "description": "Source of the session (e.g., sdk-python)"
    },
    "start_time": {
      "type": "number",
      "description": "Session start time as Unix milliseconds"
    },
    "end_time": {
      "type": "number",
      "description": "Session end time as Unix milliseconds"
    },
    "duration": {
      "type": "number",
      "description": "Session duration in milliseconds"
    },
    "config": {
      "type": "object",
      "additionalProperties": {},
      "description": "Configuration associated with the session"
    },
    "inputs": {
      "type": "object",
      "additionalProperties": {},
      "description": "Input data for the session"
    },
    "outputs": {
      "type": "object",
      "additionalProperties": {},
      "description": "Output data from the session"
    },
    "metadata": {
      "type": "object",
      "additionalProperties": {},
      "description": "Arbitrary metadata for the session"
    },
    "user_properties": {
      "type": "object",
      "additionalProperties": {},
      "description": "User properties associated with the session"
    },
    "children_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "IDs of child events in this session"
    }
  },
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'session-id': 'session_id',
          'session-name': 'session_name',
          'event-name': 'event_name',
          source: 'source',
          'start-time': 'start_time',
          'end-time': 'end_time',
          duration: 'duration',
          config: 'config',
          inputs: 'inputs',
          outputs: 'outputs',
          metadata: 'metadata',
          'user-properties': 'user_properties',
          'children-ids': 'children_ids',
        } as const;
        if (
          handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
          ])
        ) {
          return;
        }
        const client = createClient(command);
        let request: Parameters<typeof client.sessions.create>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<typeof client.sessions.create>[0];
        } else {
          request = {
            ...(opts.sessionId !== undefined && { session_id: opts.sessionId }),
            ...(opts.sessionName !== undefined && { session_name: opts.sessionName }),
            ...(opts.eventName !== undefined && { event_name: opts.eventName }),
            ...(opts.source !== undefined && { source: opts.source }),
            ...(opts.startTime !== undefined && { start_time: parseNumber(opts.startTime) }),
            ...(opts.endTime !== undefined && { end_time: parseNumber(opts.endTime) }),
            ...(opts.duration !== undefined && { duration: parseNumber(opts.duration) }),
            ...(opts.config !== undefined && { config: parseJson(opts.config) }),
            ...(opts.inputs !== undefined && { inputs: parseJson(opts.inputs) }),
            ...(opts.outputs !== undefined && { outputs: parseJson(opts.outputs) }),
            ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
            ...(opts.userProperties !== undefined && {
              user_properties: parseJson(opts.userProperties),
            }),
            ...(opts.childrenIds !== undefined && { children_ids: parseJson(opts.childrenIds) }),
          } as Parameters<typeof client.sessions.create>[0];
        }
        const result = await client.sessions.create(request);
        if (result !== undefined) {
          process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(message);
        process.exit(1);
      }
    });

  cmd
    .command('create-event-batch')
    .description('Add a batch of events to a session')
    .option('--session-id <value>', 'Session ID to add events to (required)')
    .option('--events <json>', 'Events to add to the session (required)')
    .option(
      '--show-file-schema',
      'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.',
    )
    .option(
      '--show-argument-schema <flag-name>',
      'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.',
    )
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const FIELD_FLAG_PAIRS = [
          ['--session-id', 'sessionId'],
          ['--events', 'events'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "session_id": {
      "type": "string",
      "description": "Session ID to add events to"
    },
    "events": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "project_id": {
            "type": "string",
            "description": "Project ID"
          },
          "source": {
            "type": "string",
            "description": "Source of the event (e.g., sdk-python)"
          },
          "event_name": {
            "type": "string",
            "description": "Name of the event"
          },
          "event_type": {
            "type": "string",
            "enum": [
              "model",
              "tool",
              "chain",
              "session"
            ],
            "description": "Type of event (model, tool, chain, or session)"
          },
          "event_id": {
            "type": "string",
            "description": "Unique event identifier"
          },
          "session_id": {
            "type": "string",
            "description": "Session this event belongs to"
          },
          "parent_id": {
            "type": "string",
            "description": "Parent event ID in the trace hierarchy"
          },
          "children_ids": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Child event IDs in the trace hierarchy"
          },
          "config": {
            "type": "object",
            "additionalProperties": {},
            "description": "Configuration used for this event"
          },
          "inputs": {
            "type": "object",
            "additionalProperties": {},
            "description": "Input data for the event"
          },
          "outputs": {
            "type": "object",
            "additionalProperties": {},
            "description": "Output data from the event"
          },
          "error": {
            "type": [
              "string",
              "null"
            ],
            "description": "Error message if the event failed"
          },
          "start_time": {
            "type": "number",
            "description": "Event start time as Unix milliseconds"
          },
          "end_time": {
            "type": "number",
            "description": "Event end time as Unix milliseconds"
          },
          "duration": {
            "type": "number",
            "description": "Event duration in milliseconds"
          },
          "metadata": {
            "type": "object",
            "additionalProperties": {},
            "description": "Arbitrary metadata for the event"
          },
          "feedback": {
            "type": "object",
            "additionalProperties": {},
            "description": "Feedback data associated with the event"
          },
          "metrics": {
            "type": "object",
            "additionalProperties": {},
            "description": "Metric values computed for the event"
          },
          "user_properties": {
            "type": "object",
            "additionalProperties": {},
            "description": "User properties associated with the event"
          }
        },
        "required": [
          "event_type",
          "inputs"
        ],
        "additionalProperties": false,
        "description": "Request body for POST /v1/events (bare event object)"
      },
      "description": "Events to add to the session"
    }
  },
  "required": [
    "session_id",
    "events"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'session-id': 'session_id',
          events: 'events',
        } as const;
        if (
          handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
          ])
        ) {
          return;
        }
        const client = createClient(command);
        let request: Parameters<typeof client.sessions.createEventBatch>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<
            typeof client.sessions.createEventBatch
          >[0];
        } else {
          assertRequiredFields(opts, [
            ['--session-id', 'sessionId'],
            ['--events', 'events'],
          ]);
          request = {
            session_id: opts.sessionId,
            events: parseJson(opts.events),
          } as Parameters<typeof client.sessions.createEventBatch>[0];
        }
        const result = await client.sessions.createEventBatch(request);
        if (result !== undefined) {
          process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(message);
        process.exit(1);
      }
    })
    .addHelpText(
      'after',
      `
Examples:

  Response:
    {
      "success": true
    }
`,
    );

  cmd.action(() => {
    if (!process.argv.includes('--help') && !process.argv.includes('-h')) {
      console.error('Error: subcommand is required\n');
    }
    cmd.help();
  });

  return cmd;
}
