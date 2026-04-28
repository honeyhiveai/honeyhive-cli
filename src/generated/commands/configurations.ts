// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.

import { Command, Option } from 'commander';

import { createClient, parseJson } from './utils.js';

export function configurationsCommand(): Command {
  const cmd = new Command('configurations').description('Configurations commands');

  cmd
    .command('list')
    .description('Retrieve a list of configurations')
    .option('--name <value>', 'The name of the configuration like `v0`')
    .option('--env <value>', 'Environment - "dev", "staging" or "prod"')
    .option('--tags <value>', 'Tags to filter configurations')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.configurations.list({
          query: {
            ...(opts.name !== undefined && { name: opts.name }),
            ...(opts.env !== undefined && { env: opts.env }),
            ...(opts.tags !== undefined && { tags: opts.tags }),
          },
        } as Parameters<typeof client.configurations.list>[0]);
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
    .description('Create a new configuration')
    .requiredOption('--name <value>', 'name (required)')
    .requiredOption('--provider <value>', 'provider (required)')
    .requiredOption('--parameters <json>', 'parameters (required)')
    .addOption(new Option('--type <value>', 'type').choices(['LLM', 'pipeline']))
    .option('--env <json>', 'env')
    .option('--tags <json>', 'tags')
    .option('--user_properties <json>', 'user_properties')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.configurations.create({
          body: {
            name: opts.name,
            ...(opts.type !== undefined && { type: opts.type }),
            provider: opts.provider,
            parameters: parseJson(opts.parameters),
            ...(opts.env !== undefined && { env: parseJson(opts.env) }),
            ...(opts.tags !== undefined && { tags: parseJson(opts.tags) }),
            ...(opts.user_properties !== undefined && {
              user_properties: parseJson(opts.user_properties),
            }),
          },
        } as Parameters<typeof client.configurations.create>[0]);
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
    .description('Update an existing configuration')
    .requiredOption(
      '--configId <value>',
      'Configuration ID like `6638187d505c6812e4043f24` (required)',
    )
    .requiredOption('--name <value>', 'name (required)')
    .addOption(new Option('--type <value>', 'type').choices(['LLM', 'pipeline']))
    .option('--provider <value>', 'provider')
    .option('--parameters <json>', 'parameters')
    .option('--env <json>', 'env')
    .option('--tags <json>', 'tags')
    .option('--user_properties <json>', 'user_properties')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.configurations.update({
          path: {
            configId: opts.configId,
          },
          body: {
            name: opts.name,
            ...(opts.type !== undefined && { type: opts.type }),
            ...(opts.provider !== undefined && { provider: opts.provider }),
            ...(opts.parameters !== undefined && { parameters: parseJson(opts.parameters) }),
            ...(opts.env !== undefined && { env: parseJson(opts.env) }),
            ...(opts.tags !== undefined && { tags: parseJson(opts.tags) }),
            ...(opts.user_properties !== undefined && {
              user_properties: parseJson(opts.user_properties),
            }),
          },
        } as Parameters<typeof client.configurations.update>[0]);
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
    .description('Delete a configuration')
    .requiredOption(
      '--configId <value>',
      'Configuration ID like `6638187d505c6812e4043f24` (required)',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.configurations.delete({
          path: {
            configId: opts.configId,
          },
        } as Parameters<typeof client.configurations.delete>[0]);
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
