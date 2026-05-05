// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.

import { Command } from 'commander';

import { createClient, parseJson } from './utils.js';

export function datapointsCommand(): Command {
  const cmd = new Command('datapoints').description('Datapoints commands');

  cmd
    .command('list')
    .description('Retrieve a list of datapoints')
    .option('--datapoint-ids <json>', 'List of datapoint ids to fetch')
    .option('--dataset-name <value>', 'Name of the dataset to get datapoints from')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.datapoints.list({
          query: {
            ...(opts.datapointIds !== undefined && { datapoint_ids: parseJson(opts.datapointIds) }),
            ...(opts.datasetName !== undefined && { dataset_name: opts.datasetName }),
          },
        } as Parameters<typeof client.datapoints.list>[0]);
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
    .command('create')
    .description('Create a new datapoint')
    .option('--inputs <json>', 'inputs')
    .option('--history <json>', 'history')
    .option('--ground-truth <json>', 'ground_truth')
    .option('--metadata <json>', 'metadata')
    .option('--linked-event <value>', 'linked_event')
    .option('--linked-datasets <json>', 'linked_datasets')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.datapoints.create({
          body: {
            ...(opts.inputs !== undefined && { inputs: parseJson(opts.inputs) }),
            ...(opts.history !== undefined && { history: parseJson(opts.history) }),
            ...(opts.groundTruth !== undefined && { ground_truth: parseJson(opts.groundTruth) }),
            ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
            ...(opts.linkedEvent !== undefined && { linked_event: opts.linkedEvent }),
            ...(opts.linkedDatasets !== undefined && {
              linked_datasets: parseJson(opts.linkedDatasets),
            }),
          },
        } as Parameters<typeof client.datapoints.create>[0]);
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
    .command('create-batch')
    .description('Create multiple datapoints in batch')
    .option('--events <json>', '(deprecated) events')
    .option('--mapping <json>', '(deprecated) mapping')
    .option('--filters <json>', 'filters')
    .option('--date-range <json>', 'dateRange')
    .option('--check-state <json>', 'checkState')
    .option('--select-all', 'selectAll')
    .option('--no-select-all', 'selectAll')
    .option('--dataset-id <value>', 'dataset_id')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        if (opts.events !== undefined) {
          console.warn(
            'Warning: option "--events" is deprecated and will be removed in the next major version.',
          );
        }
        if (opts.mapping !== undefined) {
          console.warn(
            'Warning: option "--mapping" is deprecated and will be removed in the next major version.',
          );
        }
        const client = createClient(command);
        const result = await client.datapoints.createBatch({
          body: {
            ...(opts.events !== undefined && { events: parseJson(opts.events) }),
            ...(opts.mapping !== undefined && { mapping: parseJson(opts.mapping) }),
            ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
            ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
            ...(opts.checkState !== undefined && { checkState: parseJson(opts.checkState) }),
            ...(opts.selectAll !== undefined && { selectAll: opts.selectAll }),
            ...(opts.datasetId !== undefined && { dataset_id: opts.datasetId }),
          },
        } as Parameters<typeof client.datapoints.createBatch>[0]);
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
    .command('get')
    .description('Retrieve a specific datapoint')
    .requiredOption(
      '--datapoint-id <value>',
      'Datapoint ID like `65c13dbbd65fb876b7886cdb` (required)',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.datapoints.get({
          path: {
            datapoint_id: opts.datapointId,
          },
        } as Parameters<typeof client.datapoints.get>[0]);
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
    .command('update')
    .description('Update a specific datapoint')
    .requiredOption('--datapoint-id <value>', 'ID of datapoint to update (required)')
    .option('--inputs <json>', 'inputs')
    .option('--history <json>', 'history')
    .option('--ground-truth <json>', 'ground_truth')
    .option('--metadata <json>', 'metadata')
    .option('--linked-event <value>', 'linked_event')
    .option('--linked-datasets <json>', 'linked_datasets')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.datapoints.update({
          path: {
            datapoint_id: opts.datapointId,
          },
          body: {
            ...(opts.inputs !== undefined && { inputs: parseJson(opts.inputs) }),
            ...(opts.history !== undefined && { history: parseJson(opts.history) }),
            ...(opts.groundTruth !== undefined && { ground_truth: parseJson(opts.groundTruth) }),
            ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
            ...(opts.linkedEvent !== undefined && { linked_event: opts.linkedEvent }),
            ...(opts.linkedDatasets !== undefined && {
              linked_datasets: parseJson(opts.linkedDatasets),
            }),
          },
        } as Parameters<typeof client.datapoints.update>[0]);
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
    .command('delete')
    .description('Delete a specific datapoint')
    .requiredOption(
      '--datapoint-id <value>',
      'Datapoint ID like `65c13dbbd65fb876b7886cdb` (required)',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.datapoints.delete({
          path: {
            datapoint_id: opts.datapointId,
          },
        } as Parameters<typeof client.datapoints.delete>[0]);
        if (result !== undefined) {
          process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
      } catch (error: unknown) {
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
