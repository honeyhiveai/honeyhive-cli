// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.

import { Command } from 'commander';

import { createClient, parseBoolean, parseJson } from './utils.js';

export function queuesCommand(): Command {
  const cmd = new Command('queues').description('Queues commands');

  cmd
    .command('list')
    .description('List annotation queues')
    .option('--enabled <value>', 'Filter by enabled status')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.queues.list({
          query: {
            ...(opts.enabled !== undefined && { enabled: parseBoolean(opts.enabled) }),
          },
        } as Parameters<typeof client.queues.list>[0]);
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
    .description('Create an annotation queue')
    .requiredOption('--name <value>', 'name (required)')
    .option('--description <value>', 'description')
    .option('--filters <json>', 'filters')
    .option('--enabled <value>', 'enabled')
    .option('--event_ids <json>', 'event_ids')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.queues.create({
          body: {
            name: opts.name,
            ...(opts.description !== undefined && { description: opts.description }),
            ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
            ...(opts.enabled !== undefined && { enabled: parseBoolean(opts.enabled) }),
            ...(opts.event_ids !== undefined && { event_ids: parseJson(opts.event_ids) }),
          },
        } as Parameters<typeof client.queues.create>[0]);
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
    .description('Get an annotation queue')
    .requiredOption('--queue_id <value>', 'Annotation queue ID (required)')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.queues.get({
          path: {
            queue_id: opts.queue_id,
          },
        } as Parameters<typeof client.queues.get>[0]);
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
    .description('Update an annotation queue')
    .requiredOption('--queue_id <value>', 'Annotation queue ID (required)')
    .requiredOption('--id <value>', 'id (required)')
    .option('--name <value>', 'name')
    .option('--description <value>', 'description')
    .option('--filters <json>', 'filters')
    .option('--enabled <value>', 'enabled')
    .option('--add_event_ids <json>', 'add_event_ids')
    .option('--remove_event_ids <json>', 'remove_event_ids')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.queues.update({
          path: {
            queue_id: opts.queue_id,
          },
          body: {
            ...(opts.name !== undefined && { name: opts.name }),
            ...(opts.description !== undefined && { description: opts.description }),
            ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
            ...(opts.enabled !== undefined && { enabled: parseBoolean(opts.enabled) }),
            id: opts.id,
            ...(opts.add_event_ids !== undefined && {
              add_event_ids: parseJson(opts.add_event_ids),
            }),
            ...(opts.remove_event_ids !== undefined && {
              remove_event_ids: parseJson(opts.remove_event_ids),
            }),
          },
        } as Parameters<typeof client.queues.update>[0]);
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
    .description('Delete an annotation queue')
    .requiredOption('--queue_id <value>', 'Annotation queue ID (required)')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.queues.delete({
          path: {
            queue_id: opts.queue_id,
          },
        } as Parameters<typeof client.queues.delete>[0]);
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
