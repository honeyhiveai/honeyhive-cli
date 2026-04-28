// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.
import { Command } from 'commander';
import { createClient, parseBoolean, parseJson, parseNumber } from './utils.js';
export function eventsCommand() {
    const cmd = new Command('events').description('Events commands');
    cmd
        .command('create')
        .description('Create a new event')
        .requiredOption('--event <json>', 'Full event object for legacy event creation endpoints (required)')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.events.create({
                body: {
                    event: parseJson(opts.event),
                },
            });
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
        .requiredOption('--event_id <value>', 'Event ID to update (required)')
        .option('--metadata <json>', 'Metadata fields to merge into the event')
        .option('--feedback <json>', 'Feedback fields to merge into the event')
        .option('--metrics <json>', 'Metric values to merge into the event')
        .option('--outputs <json>', 'Output data to replace on the event (accepts objects, strings, arrays, or scalars)')
        .option('--config <json>', 'Configuration fields to merge into the event')
        .option('--user_properties <json>', 'User properties to merge into the event')
        .option('--duration <value>', 'Event duration in milliseconds')
        .option('--end_time <value>', 'Unix timestamp in milliseconds for event end')
        .option('--children_ids <json>', 'IDs of child events to set (must be non-empty; an empty array is ignored)')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.events.update({
                body: {
                    event_id: opts.event_id,
                    ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
                    ...(opts.feedback !== undefined && { feedback: parseJson(opts.feedback) }),
                    ...(opts.metrics !== undefined && { metrics: parseJson(opts.metrics) }),
                    ...(opts.outputs !== undefined && { outputs: parseJson(opts.outputs) }),
                    ...(opts.config !== undefined && { config: parseJson(opts.config) }),
                    ...(opts.user_properties !== undefined && {
                        user_properties: parseJson(opts.user_properties),
                    }),
                    ...(opts.duration !== undefined && { duration: parseNumber(opts.duration) }),
                    ...(opts.end_time !== undefined && { end_time: parseNumber(opts.end_time) }),
                    ...(opts.children_ids !== undefined && { children_ids: parseJson(opts.children_ids) }),
                },
            });
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
      "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
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
        .option('--dateRange <json>', 'dateRange')
        .option('--limit <value>', 'Limit number of results (default 1000, max 7500)')
        .option('--page <value>', 'Page number of results (default 1)')
        .option('--ignore_order <value>', 'If true, skip result ordering for faster queries')
        .option('--evaluation_id <value>', 'Filter by evaluation/experiment run ID')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.events.search({
                body: {
                    ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
                    ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
                    ...(opts.limit !== undefined && { limit: parseNumber(opts.limit) }),
                    ...(opts.page !== undefined && { page: parseNumber(opts.page) }),
                    ...(opts.ignore_order !== undefined && {
                        ignore_order: parseBoolean(opts.ignore_order),
                    }),
                    ...(opts.evaluation_id !== undefined && { evaluation_id: opts.evaluation_id }),
                },
            });
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
        .command('create-model')
        .description('Create a new model event')
        .requiredOption('--model_event <json>', 'Model event object with model-specific fields and legacy aliases (required)')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.events.createModel({
                body: {
                    model_event: parseJson(opts.model_event),
                },
            });
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
        .command('create-batch')
        .description('Create a batch of events')
        .requiredOption('--events <json>', 'Array of events to create (required)')
        .option('--single_session <value>', 'If true, all events share the same session')
        .option('--is_single_session <value>', '(deprecated) Legacy field name for single_session (backward compatibility)')
        .option('--session <json>', '(deprecated) Session properties for batch event creation')
        .option('--session_properties <json>', 'Session properties for batch event creation')
        .action(async (opts, command) => {
        try {
            if (opts.is_single_session !== undefined) {
                console.warn('Warning: option "--is_single_session" is deprecated and will be removed in the next major version.');
            }
            if (opts.session !== undefined) {
                console.warn('Warning: option "--session" is deprecated and will be removed in the next major version.');
            }
            const client = createClient(command);
            const result = await client.events.createBatch({
                body: {
                    events: parseJson(opts.events),
                    ...(opts.single_session !== undefined && {
                        single_session: parseBoolean(opts.single_session),
                    }),
                    ...(opts.is_single_session !== undefined && {
                        is_single_session: parseBoolean(opts.is_single_session),
                    }),
                    ...(opts.session !== undefined && { session: parseJson(opts.session) }),
                    ...(opts.session_properties !== undefined && {
                        session_properties: parseJson(opts.session_properties),
                    }),
                },
            });
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
    cmd
        .command('create-model-batch')
        .description('Create a batch of model events')
        .requiredOption('--model_events <json>', 'Array of model events to create (required)')
        .option('--single_session <value>', 'If true, all events share the same session')
        .option('--is_single_session <value>', '(deprecated) Legacy field name for single_session (backward compatibility)')
        .option('--session <json>', '(deprecated) Session properties for batch event creation')
        .option('--session_properties <json>', 'Session properties for batch event creation')
        .action(async (opts, command) => {
        try {
            if (opts.is_single_session !== undefined) {
                console.warn('Warning: option "--is_single_session" is deprecated and will be removed in the next major version.');
            }
            if (opts.session !== undefined) {
                console.warn('Warning: option "--session" is deprecated and will be removed in the next major version.');
            }
            const client = createClient(command);
            const result = await client.events.createModelBatch({
                body: {
                    model_events: parseJson(opts.model_events),
                    ...(opts.single_session !== undefined && {
                        single_session: parseBoolean(opts.single_session),
                    }),
                    ...(opts.is_single_session !== undefined && {
                        is_single_session: parseBoolean(opts.is_single_session),
                    }),
                    ...(opts.session !== undefined && { session: parseJson(opts.session) }),
                    ...(opts.session_properties !== undefined && {
                        session_properties: parseJson(opts.session_properties),
                    }),
                },
            });
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
      "success": true
    }
`);
    cmd
        .command('get-events-schema')
        .description('Get events schema')
        .option('--dateRange <json>', 'Filter by date range')
        .option('--evaluation_id <value>', 'Filter by evaluation/run ID')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.events.getEventsSchema({
                query: {
                    ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
                    ...(opts.evaluation_id !== undefined && { evaluation_id: opts.evaluation_id }),
                },
            });
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
    cmd.action(() => {
        if (!process.argv.includes('--help') && !process.argv.includes('-h')) {
            console.error('Error: subcommand is required\n');
        }
        cmd.help();
    });
    return cmd;
}
//# sourceMappingURL=events.js.map