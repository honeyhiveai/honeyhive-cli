// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.

import { Command, Option } from 'commander';

import { createClient, parseJson, parseNumber } from './utils.js';

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
      new Option('--return-type <value>', 'return_type').choices([
        'float',
        'boolean',
        'string',
        'categorical',
      ]),
    )
    .option('--enabled-in-prod', 'enabled_in_prod')
    .option('--no-enabled-in-prod', 'enabled_in_prod')
    .option('--needs-ground-truth', 'needs_ground_truth')
    .option('--no-needs-ground-truth', 'needs_ground_truth')
    .option('--sampling-percentage <value>', 'sampling_percentage')
    .option('--model-provider <value>', 'model_provider')
    .option('--model-name <value>', 'model_name')
    .option('--scale <value>', 'scale')
    .option('--threshold <json>', 'threshold')
    .option('--categories <json>', 'categories')
    .option('--child-metrics <json>', 'child_metrics')
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
            ...(opts.returnType !== undefined && { return_type: opts.returnType }),
            ...(opts.enabledInProd !== undefined && { enabled_in_prod: opts.enabledInProd }),
            ...(opts.needsGroundTruth !== undefined && {
              needs_ground_truth: opts.needsGroundTruth,
            }),
            ...(opts.samplingPercentage !== undefined && {
              sampling_percentage: parseNumber(opts.samplingPercentage),
            }),
            ...(opts.modelProvider !== undefined && { model_provider: opts.modelProvider }),
            ...(opts.modelName !== undefined && { model_name: opts.modelName }),
            ...(opts.scale !== undefined && { scale: parseNumber(opts.scale) }),
            ...(opts.threshold !== undefined && { threshold: parseJson(opts.threshold) }),
            ...(opts.categories !== undefined && { categories: parseJson(opts.categories) }),
            ...(opts.childMetrics !== undefined && { child_metrics: parseJson(opts.childMetrics) }),
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
    .requiredOption(
      '--metric-id <value>',
      'The unique identifier of the metric to update (required)',
    )
    .option('--name <value>', 'name')
    .addOption(
      new Option('--type <value>', 'type').choices(['PYTHON', 'LLM', 'HUMAN', 'COMPOSITE']),
    )
    .option('--criteria <value>', 'criteria')
    .option('--description <value>', 'description')
    .addOption(
      new Option('--return-type <value>', 'return_type').choices([
        'float',
        'boolean',
        'string',
        'categorical',
      ]),
    )
    .option('--enabled-in-prod', 'enabled_in_prod')
    .option('--no-enabled-in-prod', 'enabled_in_prod')
    .option('--needs-ground-truth', 'needs_ground_truth')
    .option('--no-needs-ground-truth', 'needs_ground_truth')
    .option('--sampling-percentage <value>', 'sampling_percentage')
    .option('--model-provider <value>', 'model_provider')
    .option('--model-name <value>', 'model_name')
    .option('--scale <value>', 'scale')
    .option('--threshold <json>', 'threshold')
    .option('--categories <json>', 'categories')
    .option('--child-metrics <json>', 'child_metrics')
    .option('--filters <json>', 'filters')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.metrics.update({
          path: {
            metric_id: opts.metricId,
          },
          body: {
            ...(opts.name !== undefined && { name: opts.name }),
            ...(opts.type !== undefined && { type: opts.type }),
            ...(opts.criteria !== undefined && { criteria: opts.criteria }),
            ...(opts.description !== undefined && { description: opts.description }),
            ...(opts.returnType !== undefined && { return_type: opts.returnType }),
            ...(opts.enabledInProd !== undefined && { enabled_in_prod: opts.enabledInProd }),
            ...(opts.needsGroundTruth !== undefined && {
              needs_ground_truth: opts.needsGroundTruth,
            }),
            ...(opts.samplingPercentage !== undefined && {
              sampling_percentage: parseNumber(opts.samplingPercentage),
            }),
            ...(opts.modelProvider !== undefined && { model_provider: opts.modelProvider }),
            ...(opts.modelName !== undefined && { model_name: opts.modelName }),
            ...(opts.scale !== undefined && { scale: parseNumber(opts.scale) }),
            ...(opts.threshold !== undefined && { threshold: parseJson(opts.threshold) }),
            ...(opts.categories !== undefined && { categories: parseJson(opts.categories) }),
            ...(opts.childMetrics !== undefined && { child_metrics: parseJson(opts.childMetrics) }),
            ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
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
    .requiredOption(
      '--metric-id <value>',
      'The unique identifier of the metric to delete (required)',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.metrics.delete({
          path: {
            metric_id: opts.metricId,
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
