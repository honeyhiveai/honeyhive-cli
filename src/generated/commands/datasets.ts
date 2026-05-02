// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.

import { Command } from 'commander';

import { createClient, parseJson } from './utils.js';

export function datasetsCommand(): Command {
  const cmd = new Command('datasets').description('Datasets commands');

  cmd
    .command('list')
    .description('Get datasets')
    .option('--dataset_id <value>', 'Unique dataset ID for filtering specific dataset')
    .option('--name <value>', 'Dataset name to filter by')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.datasets.list({
          query: {
            ...(opts.dataset_id !== undefined && { dataset_id: opts.dataset_id }),
            ...(opts.name !== undefined && { name: opts.name }),
          },
        } as Parameters<typeof client.datasets.list>[0]);
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
    .description('Create a dataset')
    .option('--name <value>', 'Name of the dataset')
    .option('--description <value>', 'Description of the dataset')
    .option('--datapoints <json>', 'Initial datapoint IDs to include')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.datasets.create({
          body: {
            ...(opts.name !== undefined && { name: opts.name }),
            ...(opts.description !== undefined && { description: opts.description }),
            ...(opts.datapoints !== undefined && { datapoints: parseJson(opts.datapoints) }),
          },
        } as Parameters<typeof client.datasets.create>[0]);
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
    .description('Update a dataset')
    .requiredOption(
      '--dataset_id <value>',
      'The unique identifier of the dataset to update like `663876ec4611c47f4970f0c3` (required)',
    )
    .option('--name <value>', 'New dataset name')
    .option('--description <value>', 'New dataset description')
    .option('--datapoints <json>', 'Updated list of datapoint IDs')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.datasets.update({
          path: {
            dataset_id: opts.dataset_id,
          },
          body: {
            ...(opts.name !== undefined && { name: opts.name }),
            ...(opts.description !== undefined && { description: opts.description }),
            ...(opts.datapoints !== undefined && { datapoints: parseJson(opts.datapoints) }),
          },
        } as Parameters<typeof client.datasets.update>[0]);
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
    .description('Delete a dataset')
    .requiredOption(
      '--dataset_id <value>',
      'The unique identifier of the dataset to be deleted like `663876ec4611c47f4970f0c3` (required)',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.datasets.delete({
          path: {
            dataset_id: opts.dataset_id,
          },
        } as Parameters<typeof client.datasets.delete>[0]);
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
    .command('add-datapoints')
    .description('Add datapoints to a dataset')
    .requiredOption(
      '--dataset_id <value>',
      'The unique identifier of the dataset to add datapoints to like  `663876ec4611c47f4970f0c3` (required)',
    )
    .requiredOption('--data <json>', 'Array of datapoint data objects to add (required)')
    .requiredOption('--mapping <json>', 'mapping (required)')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.datasets.addDatapoints({
          path: {
            dataset_id: opts.dataset_id,
          },
          body: {
            data: parseJson(opts.data),
            mapping: parseJson(opts.mapping),
          },
        } as Parameters<typeof client.datasets.addDatapoints>[0]);
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
    .command('remove-datapoint')
    .description('Remove a datapoint from a dataset')
    .requiredOption('--dataset_id <value>', 'The unique identifier of the dataset (required)')
    .requiredOption(
      '--datapoint_id <value>',
      'The unique identifier of the datapoint to remove (required)',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.datasets.removeDatapoint({
          path: {
            dataset_id: opts.dataset_id,
            datapoint_id: opts.datapoint_id,
          },
        } as Parameters<typeof client.datasets.removeDatapoint>[0]);
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
