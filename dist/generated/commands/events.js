// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.
import { Command, Option } from 'commander';
import { assertNoConflictingFlags, assertRequiredFields, createClient, parseJson, parseNumber, readRequestFile, } from '../../utils.js';
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
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
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
                ]);
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
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
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
                ]);
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
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--filters', 'filters'],
                    ['--date-range', 'dateRange'],
                    ['--limit', 'limit'],
                    ['--page', 'page'],
                    ['--ignore-order', 'ignoreOrder'],
                    ['--no-ignore-order', 'ignoreOrder'],
                    ['--evaluation-id', 'evaluationId'],
                ]);
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
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--events', 'events'],
                    ['--single-session', 'singleSession'],
                    ['--no-single-session', 'singleSession'],
                    ['--session-properties', 'sessionProperties'],
                ]);
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