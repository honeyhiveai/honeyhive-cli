// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.
import { Command, Option } from 'commander';
import { assertNoOtherFlags, assertRequiredFields, createClient, handleSchemaIntrospection, parseJson, parseNumber, readRequestFile, } from '../../utils.js';
export function eventsCommand() {
    const cmd = new Command('events').description('Events commands');
    cmd
        .command('create')
        .description('Create a new event')
        .addOption(new Option('--event-type <value>', 'Type of event (model, tool, chain, or session) (required)').choices(['model', 'tool', 'chain', 'session']))
        .option('--inputs <json>', 'Input data for the event (required)')
        .option('--project-id <value>', 'Project ID')
        .option('--source <value>', 'Source of the event (e.g., sdk-python)')
        .option('--event-name <value>', 'Name of the event')
        .option('--event-id <value>', 'Unique event identifier')
        .option('--session-id <value>', 'Session this event belongs to')
        .option('--parent-id <value>', 'Parent event ID in the trace hierarchy')
        .option('--children-ids <json>', 'Child event IDs in the trace hierarchy')
        .option('--config <json>', 'Configuration used for this event')
        .option('--outputs <json>', 'Output data from the event')
        .option('--error <value>', 'Error message if the event failed')
        .option('--start-time <value>', 'Event start time as Unix milliseconds')
        .option('--end-time <value>', 'Event end time as Unix milliseconds')
        .option('--duration <value>', 'Event duration in milliseconds')
        .option('--metadata <json>', 'Arbitrary metadata for the event')
        .option('--feedback <json>', 'Feedback data associated with the event')
        .option('--metrics <json>', 'Metric values computed for the event')
        .option('--user-properties <json>', 'User properties associated with the event')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--project-id', 'projectId'],
                ['--source', 'source'],
                ['--event-name', 'eventName'],
                ['--event-type', 'eventType'],
                ['--event-id', 'eventId'],
                ['--session-id', 'sessionId'],
                ['--parent-id', 'parentId'],
                ['--children-ids', 'childrenIds'],
                ['--config', 'config'],
                ['--inputs', 'inputs'],
                ['--outputs', 'outputs'],
                ['--error', 'error'],
                ['--start-time', 'startTime'],
                ['--end-time', 'endTime'],
                ['--duration', 'duration'],
                ['--metadata', 'metadata'],
                ['--feedback', 'feedback'],
                ['--metrics', 'metrics'],
                ['--user-properties', 'userProperties'],
            ];
            const FILE_SCHEMA_JSON = `{
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
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'project-id': 'project_id',
                source: 'source',
                'event-name': 'event_name',
                'event-type': 'event_type',
                'event-id': 'event_id',
                'session-id': 'session_id',
                'parent-id': 'parent_id',
                'children-ids': 'children_ids',
                config: 'config',
                inputs: 'inputs',
                outputs: 'outputs',
                error: 'error',
                'start-time': 'start_time',
                'end-time': 'end_time',
                duration: 'duration',
                metadata: 'metadata',
                feedback: 'feedback',
                metrics: 'metrics',
                'user-properties': 'user_properties',
            };
            if (handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
                ['--filename', 'filename'],
                ...FIELD_FLAG_PAIRS,
            ])) {
                return;
            }
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [
                    ['--event-type', 'eventType'],
                    ['--inputs', 'inputs'],
                ]);
                request = {
                    ...(opts.projectId !== undefined && { project_id: opts.projectId }),
                    ...(opts.source !== undefined && { source: opts.source }),
                    ...(opts.eventName !== undefined && { event_name: opts.eventName }),
                    event_type: opts.eventType,
                    ...(opts.eventId !== undefined && { event_id: opts.eventId }),
                    ...(opts.sessionId !== undefined && { session_id: opts.sessionId }),
                    ...(opts.parentId !== undefined && { parent_id: opts.parentId }),
                    ...(opts.childrenIds !== undefined && { children_ids: parseJson(opts.childrenIds) }),
                    ...(opts.config !== undefined && { config: parseJson(opts.config) }),
                    inputs: parseJson(opts.inputs),
                    ...(opts.outputs !== undefined && { outputs: parseJson(opts.outputs) }),
                    ...(opts.error !== undefined && { error: opts.error }),
                    ...(opts.startTime !== undefined && { start_time: parseNumber(opts.startTime) }),
                    ...(opts.endTime !== undefined && { end_time: parseNumber(opts.endTime) }),
                    ...(opts.duration !== undefined && { duration: parseNumber(opts.duration) }),
                    ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
                    ...(opts.feedback !== undefined && { feedback: parseJson(opts.feedback) }),
                    ...(opts.metrics !== undefined && { metrics: parseJson(opts.metrics) }),
                    ...(opts.userProperties !== undefined && {
                        user_properties: parseJson(opts.userProperties),
                    }),
                };
            }
            const result = await client.events.create(request);
            if (result !== undefined) {
                process.stdout.write(JSON.stringify(result, null, 2) + '\n');
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(message);
            process.exit(1);
        }
    })
        .addHelpText('after', `
Examples:

  Response:
    {
      "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
      "success": true
    }
`);
    cmd
        .command('update')
        .description('Update an event')
        .option('--event-id <value>', 'The unique identifier of the event to update (required)')
        .option('--metadata <json>', 'Metadata fields to merge into the event')
        .option('--feedback <json>', 'Feedback fields to merge into the event')
        .option('--metrics <json>', 'Metric values to merge into the event')
        .option('--outputs <json>', 'Output data to replace on the event (accepts objects, strings, arrays, or scalars)')
        .option('--config <json>', 'Configuration fields to merge into the event')
        .option('--user-properties <json>', 'User properties to merge into the event')
        .option('--duration <value>', 'Event duration in milliseconds')
        .option('--end-time <value>', 'Unix timestamp in milliseconds for event end')
        .option('--children-ids <json>', 'IDs of child events to set (must be non-empty; an empty array is ignored)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--event-id', 'eventId'],
                ['--metadata', 'metadata'],
                ['--feedback', 'feedback'],
                ['--metrics', 'metrics'],
                ['--outputs', 'outputs'],
                ['--config', 'config'],
                ['--user-properties', 'userProperties'],
                ['--duration', 'duration'],
                ['--end-time', 'endTime'],
                ['--children-ids', 'childrenIds'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "event_id": {
      "type": "string",
      "description": "The unique identifier of the event to update"
    },
    "metadata": {
      "type": "object",
      "additionalProperties": {},
      "description": "Metadata fields to merge into the event"
    },
    "feedback": {
      "type": "object",
      "additionalProperties": {},
      "description": "Feedback fields to merge into the event"
    },
    "metrics": {
      "type": "object",
      "additionalProperties": {},
      "description": "Metric values to merge into the event"
    },
    "outputs": {
      "description": "Output data to replace on the event (accepts objects, strings, arrays, or scalars)"
    },
    "config": {
      "type": "object",
      "additionalProperties": {},
      "description": "Configuration fields to merge into the event"
    },
    "user_properties": {
      "type": "object",
      "additionalProperties": {},
      "description": "User properties to merge into the event"
    },
    "duration": {
      "type": "number",
      "description": "Event duration in milliseconds"
    },
    "end_time": {
      "type": "number",
      "description": "Unix timestamp in milliseconds for event end"
    },
    "children_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "IDs of child events to set (must be non-empty; an empty array is ignored)"
    }
  },
  "required": [
    "event_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'event-id': 'event_id',
                metadata: 'metadata',
                feedback: 'feedback',
                metrics: 'metrics',
                outputs: 'outputs',
                config: 'config',
                'user-properties': 'user_properties',
                duration: 'duration',
                'end-time': 'end_time',
                'children-ids': 'children_ids',
            };
            if (handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
                ['--filename', 'filename'],
                ...FIELD_FLAG_PAIRS,
            ])) {
                return;
            }
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [['--event-id', 'eventId']]);
                request = {
                    event_id: opts.eventId,
                    ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
                    ...(opts.feedback !== undefined && { feedback: parseJson(opts.feedback) }),
                    ...(opts.metrics !== undefined && { metrics: parseJson(opts.metrics) }),
                    ...(opts.outputs !== undefined && { outputs: parseJson(opts.outputs) }),
                    ...(opts.config !== undefined && { config: parseJson(opts.config) }),
                    ...(opts.userProperties !== undefined && {
                        user_properties: parseJson(opts.userProperties),
                    }),
                    ...(opts.duration !== undefined && { duration: parseNumber(opts.duration) }),
                    ...(opts.endTime !== undefined && { end_time: parseNumber(opts.endTime) }),
                    ...(opts.childrenIds !== undefined && { children_ids: parseJson(opts.childrenIds) }),
                };
            }
            const result = await client.events.update(request);
            if (result !== undefined) {
                process.stdout.write(JSON.stringify(result, null, 2) + '\n');
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(message);
            process.exit(1);
        }
    })
        .addHelpText('after', `
Examples:

  Request body:
    {
      "metadata": {
        "cost": 0.00008,
        "completion_tokens": 23,
        "prompt_tokens": 35,
        "total_tokens": 58
      },
      "feedback": {
        "rating": 5
      },
      "metrics": {
        "num_words": 2
      },
      "outputs": {
        "role": "assistant",
        "content": "Hello world"
      },
      "config": {
        "template": [
          {
            "role": "system",
            "content": "Hello, {{ name }}!"
          }
        ]
      },
      "user_properties": {
        "user_id": "691b1f94-d38c-4e92-b051-5e03fee9ff86"
      },
      "duration": 42
    }
`);
    cmd
        .command('search')
        .description('Retrieve events based on filters')
        .option('--filters <json>', 'filters')
        .option('--date-range <json>', 'dateRange')
        .option('--limit <value>', 'Limit number of results (default 1000, max 1000)')
        .option('--page <value>', 'Page number of results (default 1)')
        .option('--ignore-order', 'Deprecated: accepted for SDK back-compat but treated as a no-op. Pagination requires a stable ORDER BY to produce consistent pages, and with the 1000-row cap skipping the sort is not worth the inconsistency. The route always orders by start_time DESC.')
        .option('--no-ignore-order', 'Deprecated: accepted for SDK back-compat but treated as a no-op. Pagination requires a stable ORDER BY to produce consistent pages, and with the 1000-row cap skipping the sort is not worth the inconsistency. The route always orders by start_time DESC.')
        .option('--evaluation-id <value>', 'Filter by evaluation/experiment run ID')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--filters', 'filters'],
                ['--date-range', 'dateRange'],
                ['--limit', 'limit'],
                ['--page', 'page'],
                ['--ignore-order', 'ignoreOrder'],
                ['--no-ignore-order', 'ignoreOrder'],
                ['--evaluation-id', 'evaluationId'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "filters": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string"
          },
          "operator": {
            "type": "string",
            "enum": [
              "exists",
              "not exists",
              "is",
              "is not",
              "contains",
              "not contains",
              "greater than",
              "less than",
              "after",
              "before"
            ]
          },
          "value": {
            "type": [
              "string",
              "number",
              "boolean",
              "null"
            ]
          },
          "type": {
            "type": "string",
            "enum": [
              "string",
              "number",
              "boolean",
              "datetime"
            ]
          }
        },
        "required": [
          "field",
          "operator",
          "value"
        ],
        "additionalProperties": false
      }
    },
    "dateRange": {
      "type": "object",
      "properties": {
        "start_time": {
          "type": "string",
          "description": "ISO 8601 timestamp for start of date range (inclusive)"
        },
        "end_time": {
          "type": "string",
          "description": "ISO 8601 timestamp for end of date range (inclusive)"
        }
      },
      "required": [
        "start_time",
        "end_time"
      ],
      "additionalProperties": false
    },
    "limit": {
      "type": "number",
      "description": "Limit number of results (default 1000, max 1000)"
    },
    "page": {
      "type": "number",
      "description": "Page number of results (default 1)"
    },
    "ignore_order": {
      "type": "boolean",
      "description": "Deprecated: accepted for SDK back-compat but treated as a no-op. Pagination requires a stable ORDER BY to produce consistent pages, and with the 1000-row cap skipping the sort is not worth the inconsistency. The route always orders by start_time DESC."
    },
    "evaluation_id": {
      "type": "string",
      "description": "Filter by evaluation/experiment run ID"
    }
  },
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                filters: 'filters',
                'date-range': 'dateRange',
                limit: 'limit',
                page: 'page',
                'ignore-order': 'ignore_order',
                'evaluation-id': 'evaluation_id',
            };
            if (handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
                ['--filename', 'filename'],
                ...FIELD_FLAG_PAIRS,
            ])) {
                return;
            }
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
                request = readRequestFile(opts.filename);
            }
            else {
                request = {
                    ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
                    ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
                    ...(opts.limit !== undefined && { limit: parseNumber(opts.limit) }),
                    ...(opts.page !== undefined && { page: parseNumber(opts.page) }),
                    ...(opts.ignoreOrder !== undefined && { ignore_order: opts.ignoreOrder }),
                    ...(opts.evaluationId !== undefined && { evaluation_id: opts.evaluationId }),
                };
            }
            const result = await client.events.search(request);
            if (result !== undefined) {
                process.stdout.write(JSON.stringify(result, null, 2) + '\n');
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(message);
            process.exit(1);
        }
    });
    cmd
        .command('create-batch')
        .description('Create a batch of events')
        .option('--events <json>', 'Array of events to create (required)')
        .option('--single-session', 'If true, all events share the same session')
        .option('--no-single-session', 'If true, all events share the same session')
        .option('--session-properties <json>', 'Session properties for batch event creation')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--events', 'events'],
                ['--single-session', 'singleSession'],
                ['--no-single-session', 'singleSession'],
                ['--session-properties', 'sessionProperties'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
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
      "description": "Array of events to create"
    },
    "single_session": {
      "type": "boolean",
      "description": "If true, all events share the same session"
    },
    "session_properties": {
      "type": "object",
      "properties": {
        "session_name": {
          "type": "string"
        },
        "start_time": {
          "type": "number",
          "description": "Session start time as Unix milliseconds"
        },
        "user_properties": {
          "type": "object",
          "additionalProperties": {}
        },
        "metadata": {
          "type": "object",
          "additionalProperties": {}
        }
      },
      "description": "Session properties for batch event creation"
    }
  },
  "required": [
    "events"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                events: 'events',
                'single-session': 'single_session',
                'session-properties': 'session_properties',
            };
            if (handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
                ['--filename', 'filename'],
                ...FIELD_FLAG_PAIRS,
            ])) {
                return;
            }
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [['--events', 'events']]);
                request = {
                    events: parseJson(opts.events),
                    ...(opts.singleSession !== undefined && { single_session: opts.singleSession }),
                    ...(opts.sessionProperties !== undefined && {
                        session_properties: parseJson(opts.sessionProperties),
                    }),
                };
            }
            const result = await client.events.createBatch(request);
            if (result !== undefined) {
                process.stdout.write(JSON.stringify(result, null, 2) + '\n');
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(message);
            process.exit(1);
        }
    })
        .addHelpText('after', `
Examples:

  Response:
    {
      "event_ids": [
        "7f22137a-6911-4ed3-bc36-110f1dde6b66",
        "7f22137a-6911-4ed3-bc36-110f1dde6b67"
      ],
      "session_id": "caf77ace-3417-4da4-944d-f4a0688f3c23",
      "success": true
    }
`);
    cmd.action(() => {
        if (!process.argv.includes('--help') && !process.argv.includes('-h')) {
            console.error('Error: subcommand is required\n');
        }
        cmd.help();
    });
    return cmd;
}
//# sourceMappingURL=events.js.map