// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.
import { Command, Option } from 'commander';
import { assertNoConflictingFlags, assertRequiredFields, createClient, parseJson, parseNumber, readRequestFile, } from '../../utils.js';
export function experimentsCommand() {
    const cmd = new Command('experiments').description('Experiments commands');
    cmd
        .command('list-runs')
        .description('Get a list of evaluation runs')
        .option('--dataset-id <value>', 'Filter by dataset ID')
        .option('--page <value>', 'Page number for pagination')
        .option('--limit <value>', 'Number of results per page')
        .option('--run-ids <json>', 'List of specific run IDs to fetch')
        .option('--name <value>', 'Filter by run name')
        .addOption(new Option('--status <value>', 'Filter by run status').choices([
        'pending',
        'completed',
        'failed',
        'cancelled',
        'running',
    ]))
        .option('--date-range <json>', 'Filter by date range')
        .addOption(new Option('--sort-by <value>', 'Field to sort by').choices([
        'created_at',
        'updated_at',
        'name',
        'status',
    ]))
        .addOption(new Option('--sort-order <value>', 'Sort order').choices(['asc', 'desc']))
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--dataset-id', 'datasetId'],
                    ['--page', 'page'],
                    ['--limit', 'limit'],
                    ['--run-ids', 'runIds'],
                    ['--name', 'name'],
                    ['--status', 'status'],
                    ['--date-range', 'dateRange'],
                    ['--sort-by', 'sortBy'],
                    ['--sort-order', 'sortOrder'],
                ]);
                request = readRequestFile(opts.filename);
            }
            else {
                request = {
                    ...(opts.datasetId !== undefined && { dataset_id: opts.datasetId }),
                    ...(opts.page !== undefined && { page: parseNumber(opts.page) }),
                    ...(opts.limit !== undefined && { limit: parseNumber(opts.limit) }),
                    ...(opts.runIds !== undefined && { run_ids: parseJson(opts.runIds) }),
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.status !== undefined && { status: opts.status }),
                    ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
                    ...(opts.sortBy !== undefined && { sort_by: opts.sortBy }),
                    ...(opts.sortOrder !== undefined && { sort_order: opts.sortOrder }),
                };
            }
            const result = await client.experiments.listRuns(request);
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
        .option('--run-id <value>', 'run_id')
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
        .option('--dataset-id <value>', 'dataset_id')
        .option('--event-ids <json>', 'event_ids')
        .option('--configuration <json>', 'configuration')
        .option('--evaluators <json>', 'evaluators')
        .option('--session-ids <json>', 'session_ids')
        .option('--datapoint-ids <json>', 'datapoint_ids')
        .option('--passing-ranges <json>', 'passing_ranges')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--run-id', 'runId'],
                    ['--name', 'name'],
                    ['--description', 'description'],
                    ['--status', 'status'],
                    ['--metadata', 'metadata'],
                    ['--results', 'results'],
                    ['--dataset-id', 'datasetId'],
                    ['--event-ids', 'eventIds'],
                    ['--configuration', 'configuration'],
                    ['--evaluators', 'evaluators'],
                    ['--session-ids', 'sessionIds'],
                    ['--datapoint-ids', 'datapointIds'],
                    ['--passing-ranges', 'passingRanges'],
                ]);
                request = readRequestFile(opts.filename);
            }
            else {
                request = {
                    ...(opts.runId !== undefined && { run_id: opts.runId }),
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.description !== undefined && { description: opts.description }),
                    ...(opts.status !== undefined && { status: opts.status }),
                    ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
                    ...(opts.results !== undefined && { results: parseJson(opts.results) }),
                    ...(opts.datasetId !== undefined && { dataset_id: opts.datasetId }),
                    ...(opts.eventIds !== undefined && { event_ids: parseJson(opts.eventIds) }),
                    ...(opts.configuration !== undefined && {
                        configuration: parseJson(opts.configuration),
                    }),
                    ...(opts.evaluators !== undefined && { evaluators: parseJson(opts.evaluators) }),
                    ...(opts.sessionIds !== undefined && { session_ids: parseJson(opts.sessionIds) }),
                    ...(opts.datapointIds !== undefined && { datapoint_ids: parseJson(opts.datapointIds) }),
                    ...(opts.passingRanges !== undefined && {
                        passing_ranges: parseJson(opts.passingRanges),
                    }),
                };
            }
            const result = await client.experiments.createRun(request);
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
        .command('get-runs-schema')
        .description('Get events schema across all experiment runs in a project')
        .option('--date-range <json>', 'Filter by date range')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [['--date-range', 'dateRange']]);
                request = readRequestFile(opts.filename);
            }
            else {
                request = {
                    ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
                };
            }
            const result = await client.experiments.getRunsSchema(request);
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
        .option('--run-id <value>', 'run_id (required)')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [['--run-id', 'runId']]);
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [['--run-id', 'runId']]);
                request = {
                    run_id: opts.runId,
                };
            }
            const result = await client.experiments.getRun(request);
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
        .option('--run-id <value>', 'run_id (required)')
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
        .option('--event-ids <json>', 'event_ids')
        .option('--configuration <json>', 'configuration')
        .option('--evaluators <json>', 'evaluators')
        .option('--session-ids <json>', 'session_ids')
        .option('--datapoint-ids <json>', 'datapoint_ids')
        .option('--passing-ranges <json>', 'passing_ranges')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--run-id', 'runId'],
                    ['--name', 'name'],
                    ['--description', 'description'],
                    ['--status', 'status'],
                    ['--metadata', 'metadata'],
                    ['--results', 'results'],
                    ['--event-ids', 'eventIds'],
                    ['--configuration', 'configuration'],
                    ['--evaluators', 'evaluators'],
                    ['--session-ids', 'sessionIds'],
                    ['--datapoint-ids', 'datapointIds'],
                    ['--passing-ranges', 'passingRanges'],
                ]);
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [['--run-id', 'runId']]);
                request = {
                    run_id: opts.runId,
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.description !== undefined && { description: opts.description }),
                    ...(opts.status !== undefined && { status: opts.status }),
                    ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
                    ...(opts.results !== undefined && { results: parseJson(opts.results) }),
                    ...(opts.eventIds !== undefined && { event_ids: parseJson(opts.eventIds) }),
                    ...(opts.configuration !== undefined && {
                        configuration: parseJson(opts.configuration),
                    }),
                    ...(opts.evaluators !== undefined && { evaluators: parseJson(opts.evaluators) }),
                    ...(opts.sessionIds !== undefined && { session_ids: parseJson(opts.sessionIds) }),
                    ...(opts.datapointIds !== undefined && { datapoint_ids: parseJson(opts.datapointIds) }),
                    ...(opts.passingRanges !== undefined && {
                        passing_ranges: parseJson(opts.passingRanges),
                    }),
                };
            }
            const result = await client.experiments.updateRun(request);
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
        .option('--run-id <value>', 'run_id (required)')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [['--run-id', 'runId']]);
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [['--run-id', 'runId']]);
                request = {
                    run_id: opts.runId,
                };
            }
            const result = await client.experiments.deleteRun(request);
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
        .command('get-run-schema')
        .description('Get events schema for a single experiment run')
        .option('--run-id <value>', 'Experiment run ID (UUIDv4) (required)')
        .option('--date-range <json>', 'Filter by date range')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--run-id', 'runId'],
                    ['--date-range', 'dateRange'],
                ]);
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [['--run-id', 'runId']]);
                request = {
                    run_id: opts.runId,
                    ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
                };
            }
            const result = await client.experiments.getRunSchema(request);
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
        .option('--run-id <value>', 'Experiment run ID (UUIDv4) (required)')
        .option('--date-range <value>', 'Date range filter as JSON string')
        .option('--filters <json>', 'Optional filters to apply (JSON string or array of filter objects)')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--run-id', 'runId'],
                    ['--date-range', 'dateRange'],
                    ['--filters', 'filters'],
                ]);
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [['--run-id', 'runId']]);
                request = {
                    run_id: opts.runId,
                    ...(opts.dateRange !== undefined && { dateRange: opts.dateRange }),
                    ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
                };
            }
            const result = await client.experiments.getRunMetrics(request);
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
        .option('--new-run-id <value>', 'New experiment run ID to compare (UUIDv4) (required)')
        .option('--old-run-id <value>', 'Old experiment run ID to compare against (UUIDv4) (required)')
        .addOption(new Option('--aggregate-function <value>', 'Aggregation function to apply to metrics').choices(['average', 'min', 'max', 'median', 'p95', 'p99', 'p90', 'sum', 'count']))
        .option('--filters <json>', 'Optional filters to apply (JSON string or array of filter objects)')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--new-run-id', 'newRunId'],
                    ['--old-run-id', 'oldRunId'],
                    ['--aggregate-function', 'aggregateFunction'],
                    ['--filters', 'filters'],
                ]);
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [
                    ['--new-run-id', 'newRunId'],
                    ['--old-run-id', 'oldRunId'],
                ]);
                request = {
                    new_run_id: opts.newRunId,
                    old_run_id: opts.oldRunId,
                    ...(opts.aggregateFunction !== undefined && {
                        aggregate_function: opts.aggregateFunction,
                    }),
                    ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
                };
            }
            const result = await client.experiments.compareRuns(request);
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
        .option('--new-run-id <value>', 'New experiment run ID (UUIDv4) (required)')
        .option('--old-run-id <value>', 'Old experiment run ID to compare against (UUIDv4) (required)')
        .option('--event-name <value>', 'Filter by event name')
        .option('--event-type <value>', 'Filter by event type')
        .option('--filter <json>', 'Additional filter criteria (JSON string or object)')
        .option('--limit <value>', 'Maximum number of results')
        .option('--page <value>', 'Page number for pagination')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--new-run-id', 'newRunId'],
                    ['--old-run-id', 'oldRunId'],
                    ['--event-name', 'eventName'],
                    ['--event-type', 'eventType'],
                    ['--filter', 'filter'],
                    ['--limit', 'limit'],
                    ['--page', 'page'],
                ]);
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [
                    ['--new-run-id', 'newRunId'],
                    ['--old-run-id', 'oldRunId'],
                ]);
                request = {
                    new_run_id: opts.newRunId,
                    old_run_id: opts.oldRunId,
                    ...(opts.eventName !== undefined && { event_name: opts.eventName }),
                    ...(opts.eventType !== undefined && { event_type: opts.eventType }),
                    ...(opts.filter !== undefined && { filter: parseJson(opts.filter) }),
                    ...(opts.limit !== undefined && { limit: parseNumber(opts.limit) }),
                    ...(opts.page !== undefined && { page: parseNumber(opts.page) }),
                };
            }
            const result = await client.experiments.compareRunEvents(request);
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