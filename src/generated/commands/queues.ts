// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.

import { Command } from 'commander';

import {
  assertNoConflictingFlags,
  assertRequiredFields,
  createClient,
  parseJson,
  readRequestFile,
} from '../../utils.js';

export function queuesCommand(): Command {
  const cmd = new Command('queues').description('Queues commands');

  cmd
    .command('list')
    .description('List annotation queues')
    .option('--enabled', 'Filter by enabled status')
    .option('--no-enabled', 'Filter by enabled status')
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        let request: Parameters<typeof client.queues.list>[0];
        if (opts.filename !== undefined) {
          assertNoConflictingFlags(opts, [
            ['--enabled', 'enabled'],
            ['--no-enabled', 'enabled'],
          ]);
          request = readRequestFile(opts.filename) as Parameters<typeof client.queues.list>[0];
        } else {
          request = {
            ...(opts.enabled !== undefined && { enabled: opts.enabled }),
          } as Parameters<typeof client.queues.list>[0];
        }
        const result = await client.queues.list(request);
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
    .option('--name <value>', 'name (required)')
    .option('--description <value>', 'description')
    .option('--filters <json>', 'filters')
    .option('--enabled', 'enabled')
    .option('--no-enabled', 'enabled')
    .option('--event-ids <json>', 'event_ids')
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        let request: Parameters<typeof client.queues.create>[0];
        if (opts.filename !== undefined) {
          assertNoConflictingFlags(opts, [
            ['--name', 'name'],
            ['--description', 'description'],
            ['--filters', 'filters'],
            ['--enabled', 'enabled'],
            ['--no-enabled', 'enabled'],
            ['--event-ids', 'eventIds'],
          ]);
          request = readRequestFile(opts.filename) as Parameters<typeof client.queues.create>[0];
        } else {
          assertRequiredFields(opts, [['--name', 'name']]);
          request = {
            name: opts.name,
            ...(opts.description !== undefined && { description: opts.description }),
            ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
            ...(opts.enabled !== undefined && { enabled: opts.enabled }),
            ...(opts.eventIds !== undefined && { event_ids: parseJson(opts.eventIds) }),
          } as Parameters<typeof client.queues.create>[0];
        }
        const result = await client.queues.create(request);
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
    .option('--queue-id <value>', 'Annotation queue ID (required)')
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        let request: Parameters<typeof client.queues.get>[0];
        if (opts.filename !== undefined) {
          assertNoConflictingFlags(opts, [['--queue-id', 'queueId']]);
          request = readRequestFile(opts.filename) as Parameters<typeof client.queues.get>[0];
        } else {
          assertRequiredFields(opts, [['--queue-id', 'queueId']]);
          request = {
            queue_id: opts.queueId,
          } as Parameters<typeof client.queues.get>[0];
        }
        const result = await client.queues.get(request);
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
    .option('--queue-id <value>', 'Annotation queue ID (required)')
    .option('--id <value>', 'id (required)')
    .option('--name <value>', 'name')
    .option('--description <value>', 'description')
    .option('--filters <json>', 'filters')
    .option('--enabled', 'enabled')
    .option('--no-enabled', 'enabled')
    .option('--add-event-ids <json>', 'add_event_ids')
    .option('--remove-event-ids <json>', 'remove_event_ids')
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        let request: Parameters<typeof client.queues.update>[0];
        if (opts.filename !== undefined) {
          assertNoConflictingFlags(opts, [
            ['--queue-id', 'queueId'],
            ['--name', 'name'],
            ['--description', 'description'],
            ['--filters', 'filters'],
            ['--enabled', 'enabled'],
            ['--no-enabled', 'enabled'],
            ['--id', 'id'],
            ['--add-event-ids', 'addEventIds'],
            ['--remove-event-ids', 'removeEventIds'],
          ]);
          request = readRequestFile(opts.filename) as Parameters<typeof client.queues.update>[0];
        } else {
          assertRequiredFields(opts, [
            ['--queue-id', 'queueId'],
            ['--id', 'id'],
          ]);
          request = {
            queue_id: opts.queueId,
            ...(opts.name !== undefined && { name: opts.name }),
            ...(opts.description !== undefined && { description: opts.description }),
            ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
            ...(opts.enabled !== undefined && { enabled: opts.enabled }),
            id: opts.id,
            ...(opts.addEventIds !== undefined && { add_event_ids: parseJson(opts.addEventIds) }),
            ...(opts.removeEventIds !== undefined && {
              remove_event_ids: parseJson(opts.removeEventIds),
            }),
          } as Parameters<typeof client.queues.update>[0];
        }
        const result = await client.queues.update(request);
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
    .option('--queue-id <value>', 'Annotation queue ID (required)')
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        let request: Parameters<typeof client.queues.delete>[0];
        if (opts.filename !== undefined) {
          assertNoConflictingFlags(opts, [['--queue-id', 'queueId']]);
          request = readRequestFile(opts.filename) as Parameters<typeof client.queues.delete>[0];
        } else {
          assertRequiredFields(opts, [['--queue-id', 'queueId']]);
          request = {
            queue_id: opts.queueId,
          } as Parameters<typeof client.queues.delete>[0];
        }
        const result = await client.queues.delete(request);
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
