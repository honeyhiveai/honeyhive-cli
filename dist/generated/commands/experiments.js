// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.
import { Command, Option } from 'commander';
import { createClient, parseJson, parseNumber } from './utils.js';
export function experimentsCommand() {
    const cmd = new Command('experiments').description('Experiments commands');
    cmd
        .command('list-runs')
        .description('Get a list of evaluation runs')
        .option('--dataset_id <value>', 'Filter by dataset ID')
        .option('--page <value>', 'Page number for pagination')
        .option('--limit <value>', 'Number of results per page')
        .option('--run_ids <json>', 'List of specific run IDs to fetch')
        .option('--name <value>', 'Filter by run name')
        .addOption(new Option('--status <value>', 'Filter by run status').choices([
        'pending',
        'completed',
        'failed',
        'cancelled',
        'running',
    ]))
        .option('--dateRange <json>', 'Filter by date range')
        .addOption(new Option('--sort_by <value>', 'Field to sort by').choices([
        'created_at',
        'updated_at',
        'name',
        'status',
    ]))
        .addOption(new Option('--sort_order <value>', 'Sort order').choices(['asc', 'desc']))
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.experiments.listRuns({
                query: {
                    ...(opts.dataset_id !== undefined && { dataset_id: opts.dataset_id }),
                    ...(opts.page !== undefined && { page: parseNumber(opts.page) }),
                    ...(opts.limit !== undefined && { limit: parseNumber(opts.limit) }),
                    ...(opts.run_ids !== undefined && { run_ids: parseJson(opts.run_ids) }),
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.status !== undefined && { status: opts.status }),
                    ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
                    ...(opts.sort_by !== undefined && { sort_by: opts.sort_by }),
                    ...(opts.sort_order !== undefined && { sort_order: opts.sort_order }),
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
        .command('create-run')
        .description('Create a new evaluation run')
        .option('--run_id <value>', 'run_id')
        .option('--name <value>', 'name')
        .option('--description <value>', 'description')
        .addOption(new Option('--status <value>', 'status').choices([
        'pending',
        'completed',
        'failed',
        'cancelled',
        'running',
    ]))
        .option('--metadata <json>', 'metadata')
        .option('--results <json>', 'results')
        .option('--dataset_id <value>', 'dataset_id')
        .option('--event_ids <json>', 'event_ids')
        .option('--configuration <json>', 'configuration')
        .option('--evaluators <json>', 'evaluators')
        .option('--session_ids <json>', 'session_ids')
        .option('--datapoint_ids <json>', 'datapoint_ids')
        .option('--passing_ranges <json>', 'passing_ranges')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.experiments.createRun({
                body: {
                    ...(opts.run_id !== undefined && { run_id: opts.run_id }),
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.description !== undefined && { description: opts.description }),
                    ...(opts.status !== undefined && { status: opts.status }),
                    ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
                    ...(opts.results !== undefined && { results: parseJson(opts.results) }),
                    ...(opts.dataset_id !== undefined && { dataset_id: opts.dataset_id }),
                    ...(opts.event_ids !== undefined && { event_ids: parseJson(opts.event_ids) }),
                    ...(opts.configuration !== undefined && {
                        configuration: parseJson(opts.configuration),
                    }),
                    ...(opts.evaluators !== undefined && { evaluators: parseJson(opts.evaluators) }),
                    ...(opts.session_ids !== undefined && { session_ids: parseJson(opts.session_ids) }),
                    ...(opts.datapoint_ids !== undefined && {
                        datapoint_ids: parseJson(opts.datapoint_ids),
                    }),
                    ...(opts.passing_ranges !== undefined && {
                        passing_ranges: parseJson(opts.passing_ranges),
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
    });
    cmd
        .command('get-run')
        .description('Get details of an evaluation run')
        .requiredOption('--run_id <value>', 'run_id (required)')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.experiments.getRun({
                path: {
                    run_id: opts.run_id,
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
        .command('update-run')
        .description('Update an evaluation run')
        .requiredOption('--run_id <value>', 'run_id (required)')
        .option('--name <value>', 'name')
        .option('--description <value>', 'description')
        .addOption(new Option('--status <value>', 'status').choices([
        'pending',
        'completed',
        'failed',
        'cancelled',
        'running',
    ]))
        .option('--metadata <json>', 'metadata')
        .option('--results <json>', 'results')
        .option('--event_ids <json>', 'event_ids')
        .option('--configuration <json>', 'configuration')
        .option('--evaluators <json>', 'evaluators')
        .option('--session_ids <json>', 'session_ids')
        .option('--datapoint_ids <json>', 'datapoint_ids')
        .option('--passing_ranges <json>', 'passing_ranges')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.experiments.updateRun({
                path: {
                    run_id: opts.run_id,
                },
                body: {
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.description !== undefined && { description: opts.description }),
                    ...(opts.status !== undefined && { status: opts.status }),
                    ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
                    ...(opts.results !== undefined && { results: parseJson(opts.results) }),
                    ...(opts.event_ids !== undefined && { event_ids: parseJson(opts.event_ids) }),
                    ...(opts.configuration !== undefined && {
                        configuration: parseJson(opts.configuration),
                    }),
                    ...(opts.evaluators !== undefined && { evaluators: parseJson(opts.evaluators) }),
                    ...(opts.session_ids !== undefined && { session_ids: parseJson(opts.session_ids) }),
                    ...(opts.datapoint_ids !== undefined && {
                        datapoint_ids: parseJson(opts.datapoint_ids),
                    }),
                    ...(opts.passing_ranges !== undefined && {
                        passing_ranges: parseJson(opts.passing_ranges),
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
    });
    cmd
        .command('delete-run')
        .description('Delete an evaluation run')
        .requiredOption('--run_id <value>', 'run_id (required)')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.experiments.deleteRun({
                path: {
                    run_id: opts.run_id,
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
        .command('get-run-metrics')
        .description('Get event metrics for an experiment run')
        .requiredOption('--run_id <value>', 'Experiment run ID (UUIDv4) (required)')
        .option('--dateRange <value>', 'Date range filter as JSON string')
        .option('--filters <json>', 'Optional filters to apply (JSON string or array of filter objects)')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.experiments.getRunMetrics({
                path: {
                    run_id: opts.run_id,
                },
                query: {
                    ...(opts.dateRange !== undefined && { dateRange: opts.dateRange }),
                    ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
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
        .command('get-result')
        .description('Retrieve experiment result')
        .requiredOption('--run_id <value>', 'Experiment run ID (UUIDv4) (required)')
        .addOption(new Option('--aggregate_function <value>', 'Aggregation function to apply to metrics').choices(['average', 'min', 'max', 'median', 'p95', 'p99', 'p90', 'sum', 'count']))
        .option('--filters <json>', 'Optional filters to apply (JSON string or array of filter objects)')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.experiments.getResult({
                path: {
                    run_id: opts.run_id,
                },
                query: {
                    ...(opts.aggregate_function !== undefined && {
                        aggregate_function: opts.aggregate_function,
                    }),
                    ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
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
        .command('compare-runs')
        .description('Retrieve experiment comparison')
        .requiredOption('--new_run_id <value>', 'New experiment run ID to compare (UUIDv4) (required)')
        .requiredOption('--old_run_id <value>', 'Old experiment run ID to compare against (UUIDv4) (required)')
        .addOption(new Option('--aggregate_function <value>', 'Aggregation function to apply to metrics').choices(['average', 'min', 'max', 'median', 'p95', 'p99', 'p90', 'sum', 'count']))
        .option('--filters <json>', 'Optional filters to apply (JSON string or array of filter objects)')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.experiments.compareRuns({
                path: {
                    new_run_id: opts.new_run_id,
                    old_run_id: opts.old_run_id,
                },
                query: {
                    ...(opts.aggregate_function !== undefined && {
                        aggregate_function: opts.aggregate_function,
                    }),
                    ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
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
        .command('compare-run-events')
        .description('Compare events between two experiment runs')
        .requiredOption('--run_id_1 <value>', 'First experiment run ID (UUIDv4) (required)')
        .requiredOption('--run_id_2 <value>', 'Second experiment run ID (UUIDv4) (required)')
        .option('--event_name <value>', 'Filter by event name')
        .option('--event_type <value>', 'Filter by event type')
        .option('--filter <json>', 'Additional filter criteria (JSON string or object)')
        .option('--limit <value>', 'Maximum number of results')
        .option('--page <value>', 'Page number for pagination')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.experiments.compareRunEvents({
                query: {
                    run_id_1: opts.run_id_1,
                    run_id_2: opts.run_id_2,
                    ...(opts.event_name !== undefined && { event_name: opts.event_name }),
                    ...(opts.event_type !== undefined && { event_type: opts.event_type }),
                    ...(opts.filter !== undefined && { filter: parseJson(opts.filter) }),
                    ...(opts.limit !== undefined && { limit: parseNumber(opts.limit) }),
                    ...(opts.page !== undefined && { page: parseNumber(opts.page) }),
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
//# sourceMappingURL=experiments.js.map