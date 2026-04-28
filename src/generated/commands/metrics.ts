// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.

import { Command, Option } from 'commander';

import { createClient, parseBoolean, parseJson, parseNumber } from './utils.js';

export function metricsCommand(): Command {
  const cmd = new Command('metrics').description('Metrics commands');

  cmd
    .command('list')
    .description('Get all metrics')
    .option('--type <value>', 'Filter by metric type')
    .option('--id <value>', 'Filter by specific metric ID')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.metrics.list({
          query: {
            ...(opts.type !== undefined && { type: opts.type }),
            ...(opts.id !== undefined && { id: opts.id }),
          },
        } as Parameters<typeof client.metrics.list>[0]);
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
    .description('Create a new metric')
    .requiredOption('--name <value>', 'name (required)')
    .addOption(
      new Option('--type <value>', 'type (required)')
        .choices(['PYTHON', 'LLM', 'HUMAN', 'COMPOSITE'])
        .makeOptionMandatory(),
    )
    .requiredOption('--criteria <value>', 'criteria (required)')
    .option('--description <value>', 'description')
    .addOption(
      new Option('--return_type <value>', 'return_type').choices([
        'float',
        'boolean',
        'string',
        'categorical',
      ]),
    )
    .option('--enabled_in_prod <value>', 'enabled_in_prod')
    .option('--needs_ground_truth <value>', 'needs_ground_truth')
    .option('--sampling_percentage <value>', 'sampling_percentage')
    .option('--model_provider <value>', 'model_provider')
    .option('--model_name <value>', 'model_name')
    .option('--scale <value>', 'scale')
    .option('--threshold <json>', 'threshold')
    .option('--categories <json>', 'categories')
    .option('--child_metrics <json>', 'child_metrics')
    .option('--filters <json>', 'filters')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.metrics.create({
          body: {
            name: opts.name,
            type: opts.type,
            criteria: opts.criteria,
            ...(opts.description !== undefined && { description: opts.description }),
            ...(opts.return_type !== undefined && { return_type: opts.return_type }),
            ...(opts.enabled_in_prod !== undefined && {
              enabled_in_prod: parseBoolean(opts.enabled_in_prod),
            }),
            ...(opts.needs_ground_truth !== undefined && {
              needs_ground_truth: parseBoolean(opts.needs_ground_truth),
            }),
            ...(opts.sampling_percentage !== undefined && {
              sampling_percentage: parseNumber(opts.sampling_percentage),
            }),
            ...(opts.model_provider !== undefined && { model_provider: opts.model_provider }),
            ...(opts.model_name !== undefined && { model_name: opts.model_name }),
            ...(opts.scale !== undefined && { scale: parseNumber(opts.scale) }),
            ...(opts.threshold !== undefined && { threshold: parseJson(opts.threshold) }),
            ...(opts.categories !== undefined && { categories: parseJson(opts.categories) }),
            ...(opts.child_metrics !== undefined && {
              child_metrics: parseJson(opts.child_metrics),
            }),
            ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
          },
        } as Parameters<typeof client.metrics.create>[0]);
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
    .description('Update an existing metric')
    .requiredOption('--id <value>', 'id (required)')
    .option('--name <value>', 'name')
    .addOption(
      new Option('--type <value>', 'type').choices(['PYTHON', 'LLM', 'HUMAN', 'COMPOSITE']),
    )
    .option('--criteria <value>', 'criteria')
    .option('--description <value>', 'description')
    .addOption(
      new Option('--return_type <value>', 'return_type').choices([
        'float',
        'boolean',
        'string',
        'categorical',
      ]),
    )
    .option('--enabled_in_prod <value>', 'enabled_in_prod')
    .option('--needs_ground_truth <value>', 'needs_ground_truth')
    .option('--sampling_percentage <value>', 'sampling_percentage')
    .option('--model_provider <value>', 'model_provider')
    .option('--model_name <value>', 'model_name')
    .option('--scale <value>', 'scale')
    .option('--threshold <json>', 'threshold')
    .option('--categories <json>', 'categories')
    .option('--child_metrics <json>', 'child_metrics')
    .option('--filters <json>', 'filters')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.metrics.update({
          body: {
            ...(opts.name !== undefined && { name: opts.name }),
            ...(opts.type !== undefined && { type: opts.type }),
            ...(opts.criteria !== undefined && { criteria: opts.criteria }),
            ...(opts.description !== undefined && { description: opts.description }),
            ...(opts.return_type !== undefined && { return_type: opts.return_type }),
            ...(opts.enabled_in_prod !== undefined && {
              enabled_in_prod: parseBoolean(opts.enabled_in_prod),
            }),
            ...(opts.needs_ground_truth !== undefined && {
              needs_ground_truth: parseBoolean(opts.needs_ground_truth),
            }),
            ...(opts.sampling_percentage !== undefined && {
              sampling_percentage: parseNumber(opts.sampling_percentage),
            }),
            ...(opts.model_provider !== undefined && { model_provider: opts.model_provider }),
            ...(opts.model_name !== undefined && { model_name: opts.model_name }),
            ...(opts.scale !== undefined && { scale: parseNumber(opts.scale) }),
            ...(opts.threshold !== undefined && { threshold: parseJson(opts.threshold) }),
            ...(opts.categories !== undefined && { categories: parseJson(opts.categories) }),
            ...(opts.child_metrics !== undefined && {
              child_metrics: parseJson(opts.child_metrics),
            }),
            ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
            id: opts.id,
          },
        } as Parameters<typeof client.metrics.update>[0]);
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
    .description('Delete a metric')
    .requiredOption('--metric_id <value>', 'metric_id (required)')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.metrics.delete({
          query: {
            metric_id: opts.metric_id,
          },
        } as Parameters<typeof client.metrics.delete>[0]);
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
    .command('run')
    .description('Run a metric evaluation')
    .requiredOption('--metric <json>', 'metric (required)')
    .requiredOption('--event <json>', 'event (required)')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.metrics.run({
          body: {
            metric: parseJson(opts.metric),
            event: parseJson(opts.event),
          },
        } as Parameters<typeof client.metrics.run>[0]);
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
