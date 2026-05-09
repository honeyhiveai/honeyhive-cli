// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.

import { Command, Option } from 'commander';

import {
  assertNoConflictingFlags,
  assertRequiredFields,
  createClient,
  parseJson,
  parseNumber,
  readRequestFile,
} from '../../utils.js';

export function metricsCommand(): Command {
  const cmd = new Command('metrics').description('Metrics commands');

  cmd
    .command('list')
    .description('Get all metrics')
    .option('--type <value>', 'Filter by metric type')
    .option('--id <value>', 'Filter by specific metric ID')
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        let request: Parameters<typeof client.metrics.list>[0];
        if (opts.filename !== undefined) {
          assertNoConflictingFlags(opts, [
            ['--type', 'type'],
            ['--id', 'id'],
          ]);
          request = readRequestFile(opts.filename) as Parameters<typeof client.metrics.list>[0];
        } else {
          request = {
            ...(opts.type !== undefined && { type: opts.type }),
            ...(opts.id !== undefined && { id: opts.id }),
          } as Parameters<typeof client.metrics.list>[0];
        }
        const result = await client.metrics.list(request);
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
    .option('--name <value>', 'name (required)')
    .addOption(
      new Option('--type <value>', 'type (required)').choices([
        'PYTHON',
        'LLM',
        'HUMAN',
        'COMPOSITE',
      ]),
    )
    .option('--criteria <value>', 'criteria (required)')
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
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        let request: Parameters<typeof client.metrics.create>[0];
        if (opts.filename !== undefined) {
          assertNoConflictingFlags(opts, [
            ['--name', 'name'],
            ['--type', 'type'],
            ['--criteria', 'criteria'],
            ['--description', 'description'],
            ['--return-type', 'returnType'],
            ['--enabled-in-prod', 'enabledInProd'],
            ['--no-enabled-in-prod', 'enabledInProd'],
            ['--needs-ground-truth', 'needsGroundTruth'],
            ['--no-needs-ground-truth', 'needsGroundTruth'],
            ['--sampling-percentage', 'samplingPercentage'],
            ['--model-provider', 'modelProvider'],
            ['--model-name', 'modelName'],
            ['--scale', 'scale'],
            ['--threshold', 'threshold'],
            ['--categories', 'categories'],
            ['--child-metrics', 'childMetrics'],
            ['--filters', 'filters'],
          ]);
          request = readRequestFile(opts.filename) as Parameters<typeof client.metrics.create>[0];
        } else {
          assertRequiredFields(opts, [
            ['--name', 'name'],
            ['--type', 'type'],
            ['--criteria', 'criteria'],
          ]);
          request = {
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
          } as Parameters<typeof client.metrics.create>[0];
        }
        const result = await client.metrics.create(request);
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
    .option('--metric-id <value>', 'The unique identifier of the metric to update (required)')
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
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        let request: Parameters<typeof client.metrics.update>[0];
        if (opts.filename !== undefined) {
          assertNoConflictingFlags(opts, [
            ['--metric-id', 'metricId'],
            ['--name', 'name'],
            ['--type', 'type'],
            ['--criteria', 'criteria'],
            ['--description', 'description'],
            ['--return-type', 'returnType'],
            ['--enabled-in-prod', 'enabledInProd'],
            ['--no-enabled-in-prod', 'enabledInProd'],
            ['--needs-ground-truth', 'needsGroundTruth'],
            ['--no-needs-ground-truth', 'needsGroundTruth'],
            ['--sampling-percentage', 'samplingPercentage'],
            ['--model-provider', 'modelProvider'],
            ['--model-name', 'modelName'],
            ['--scale', 'scale'],
            ['--threshold', 'threshold'],
            ['--categories', 'categories'],
            ['--child-metrics', 'childMetrics'],
            ['--filters', 'filters'],
          ]);
          request = readRequestFile(opts.filename) as Parameters<typeof client.metrics.update>[0];
        } else {
          assertRequiredFields(opts, [['--metric-id', 'metricId']]);
          request = {
            metric_id: opts.metricId,
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
          } as Parameters<typeof client.metrics.update>[0];
        }
        const result = await client.metrics.update(request);
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
    .option('--metric-id <value>', 'The unique identifier of the metric to delete (required)')
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        let request: Parameters<typeof client.metrics.delete>[0];
        if (opts.filename !== undefined) {
          assertNoConflictingFlags(opts, [['--metric-id', 'metricId']]);
          request = readRequestFile(opts.filename) as Parameters<typeof client.metrics.delete>[0];
        } else {
          assertRequiredFields(opts, [['--metric-id', 'metricId']]);
          request = {
            metric_id: opts.metricId,
          } as Parameters<typeof client.metrics.delete>[0];
        }
        const result = await client.metrics.delete(request);
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
    .option('--metric <json>', 'metric (required)')
    .option('--event <json>', 'event (required)')
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Mutually exclusive with the per-field flags above.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        let request: Parameters<typeof client.metrics.run>[0];
        if (opts.filename !== undefined) {
          assertNoConflictingFlags(opts, [
            ['--metric', 'metric'],
            ['--event', 'event'],
          ]);
          request = readRequestFile(opts.filename) as Parameters<typeof client.metrics.run>[0];
        } else {
          assertRequiredFields(opts, [
            ['--metric', 'metric'],
            ['--event', 'event'],
          ]);
          request = {
            metric: parseJson(opts.metric),
            event: parseJson(opts.event),
          } as Parameters<typeof client.metrics.run>[0];
        }
        const result = await client.metrics.run(request);
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
