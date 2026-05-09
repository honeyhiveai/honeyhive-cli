// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.
import { Command } from 'commander';
import { assertNoConflictingFlags, assertRequiredFields, createClient, parseJson, readRequestFile, } from '../../utils.js';
export function datasetsCommand() {
    const cmd = new Command('datasets').description('Datasets commands');
    cmd
        .command('list')
        .description('Get datasets')
        .option('--dataset-id <value>', 'Unique dataset ID for filtering specific dataset')
        .option('--name <value>', 'Dataset name to filter by')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--dataset-id', 'datasetId'],
                    ['--name', 'name'],
                ]);
                request = readRequestFile(opts.filename);
            }
            else {
                request = {
                    ...(opts.datasetId !== undefined && { dataset_id: opts.datasetId }),
                    ...(opts.name !== undefined && { name: opts.name }),
                };
            }
            const result = await client.datasets.list(request);
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
        .command('create')
        .description('Create a dataset')
        .option('--name <value>', 'Name of the dataset')
        .option('--description <value>', 'Description of the dataset')
        .option('--datapoints <json>', 'Initial datapoint IDs to include')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--name', 'name'],
                    ['--description', 'description'],
                    ['--datapoints', 'datapoints'],
                ]);
                request = readRequestFile(opts.filename);
            }
            else {
                request = {
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.description !== undefined && { description: opts.description }),
                    ...(opts.datapoints !== undefined && { datapoints: parseJson(opts.datapoints) }),
                };
            }
            const result = await client.datasets.create(request);
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
        .command('update')
        .description('Update a dataset')
        .option('--dataset-id <value>', 'The unique identifier of the dataset to update like `663876ec4611c47f4970f0c3` (required)')
        .option('--name <value>', 'New dataset name')
        .option('--description <value>', 'New dataset description')
        .option('--datapoints <json>', 'Updated list of datapoint IDs')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--dataset-id', 'datasetId'],
                    ['--name', 'name'],
                    ['--description', 'description'],
                    ['--datapoints', 'datapoints'],
                ]);
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [['--dataset-id', 'datasetId']]);
                request = {
                    dataset_id: opts.datasetId,
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.description !== undefined && { description: opts.description }),
                    ...(opts.datapoints !== undefined && { datapoints: parseJson(opts.datapoints) }),
                };
            }
            const result = await client.datasets.update(request);
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
        .command('delete')
        .description('Delete a dataset')
        .option('--dataset-id <value>', 'The unique identifier of the dataset to be deleted like `663876ec4611c47f4970f0c3` (required)')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [['--dataset-id', 'datasetId']]);
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [['--dataset-id', 'datasetId']]);
                request = {
                    dataset_id: opts.datasetId,
                };
            }
            const result = await client.datasets.delete(request);
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
        .command('add-datapoints')
        .description('Add datapoints to a dataset')
        .option('--dataset-id <value>', 'The unique identifier of the dataset to add datapoints to like  `663876ec4611c47f4970f0c3` (required)')
        .option('--data <json>', 'Array of datapoint data objects to add (required)')
        .option('--mapping <json>', 'mapping (required)')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--dataset-id', 'datasetId'],
                    ['--data', 'data'],
                    ['--mapping', 'mapping'],
                ]);
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [
                    ['--dataset-id', 'datasetId'],
                    ['--data', 'data'],
                    ['--mapping', 'mapping'],
                ]);
                request = {
                    dataset_id: opts.datasetId,
                    data: parseJson(opts.data),
                    mapping: parseJson(opts.mapping),
                };
            }
            const result = await client.datasets.addDatapoints(request);
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
        .command('remove-datapoint')
        .description('Remove a datapoint from a dataset')
        .option('--dataset-id <value>', 'The unique identifier of the dataset (required)')
        .option('--datapoint-id <value>', 'The unique identifier of the datapoint to remove (required)')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoConflictingFlags(opts, [
                    ['--dataset-id', 'datasetId'],
                    ['--datapoint-id', 'datapointId'],
                ]);
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [
                    ['--dataset-id', 'datasetId'],
                    ['--datapoint-id', 'datapointId'],
                ]);
                request = {
                    dataset_id: opts.datasetId,
                    datapoint_id: opts.datapointId,
                };
            }
            const result = await client.datasets.removeDatapoint(request);
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
//# sourceMappingURL=datasets.js.map