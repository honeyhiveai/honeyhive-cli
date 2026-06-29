// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.

import { Command } from 'commander';

import {
  assertNoOtherFlags,
  assertRequiredFields,
  createDataPlaneClient,
  handleSchemaIntrospection,
  parseJson,
  readRequestFile,
} from '../../utils.js';

export function datapointsCommand(): Command {
  const cmd = new Command('datapoints').description('Datapoints commands');

  cmd
    .command('list')
    .description('Retrieve a list of datapoints')
    .option('--datapoint-ids <json>', 'List of datapoint ids to fetch')
    .option('--dataset-name <value>', 'Name of the dataset to get datapoints from')
    .option(
      '--show-file-schema',
      'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.',
    )
    .option(
      '--show-argument-schema <flag-name>',
      'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.',
    )
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const FIELD_FLAG_PAIRS = [
          ['--datapoint-ids', 'datapointIds'],
          ['--dataset-name', 'datasetName'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "datapoint_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of datapoint ids to fetch"
    },
    "dataset_name": {
      "type": "string",
      "description": "Name of the dataset to get datapoints from"
    }
  },
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'datapoint-ids': 'datapoint_ids',
          'dataset-name': 'dataset_name',
        } as const;
        if (
          handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
          ])
        ) {
          return;
        }
        const client = createDataPlaneClient(command);
        let request: Parameters<typeof client.datapoints.list>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<typeof client.datapoints.list>[0];
        } else {
          request = {
            ...(opts.datapointIds !== undefined && { datapoint_ids: parseJson(opts.datapointIds) }),
            ...(opts.datasetName !== undefined && { dataset_name: opts.datasetName }),
          } as Parameters<typeof client.datapoints.list>[0];
        }
        const result = await client.datapoints.list(request);
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
    .option(
      '--show-file-schema',
      'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.',
    )
    .option(
      '--show-argument-schema <flag-name>',
      'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.',
    )
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const FIELD_FLAG_PAIRS = [
          ['--inputs', 'inputs'],
          ['--history', 'history'],
          ['--ground-truth', 'groundTruth'],
          ['--metadata', 'metadata'],
          ['--linked-event', 'linkedEvent'],
          ['--linked-datasets', 'linkedDatasets'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "inputs": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "history": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      },
      "default": []
    },
    "ground_truth": {
      "type": "object",
      "additionalProperties": {}
    },
    "metadata": {
      "type": "object",
      "additionalProperties": {}
    },
    "linked_event": {
      "type": "string"
    },
    "linked_datasets": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "default": []
    }
  },
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          inputs: 'inputs',
          history: 'history',
          'ground-truth': 'ground_truth',
          metadata: 'metadata',
          'linked-event': 'linked_event',
          'linked-datasets': 'linked_datasets',
        } as const;
        if (
          handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
          ])
        ) {
          return;
        }
        const client = createDataPlaneClient(command);
        let request: Parameters<typeof client.datapoints.create>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<
            typeof client.datapoints.create
          >[0];
        } else {
          request = {
            ...(opts.inputs !== undefined && { inputs: parseJson(opts.inputs) }),
            ...(opts.history !== undefined && { history: parseJson(opts.history) }),
            ...(opts.groundTruth !== undefined && { ground_truth: parseJson(opts.groundTruth) }),
            ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
            ...(opts.linkedEvent !== undefined && { linked_event: opts.linkedEvent }),
            ...(opts.linkedDatasets !== undefined && {
              linked_datasets: parseJson(opts.linkedDatasets),
            }),
          } as Parameters<typeof client.datapoints.create>[0];
        }
        const result = await client.datapoints.create(request);
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
    .option(
      '--show-file-schema',
      'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.',
    )
    .option(
      '--show-argument-schema <flag-name>',
      'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.',
    )
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const FIELD_FLAG_PAIRS = [
          ['--events', 'events'],
          ['--mapping', 'mapping'],
          ['--filters', 'filters'],
          ['--date-range', 'dateRange'],
          ['--check-state', 'checkState'],
          ['--select-all', 'selectAll'],
          ['--no-select-all', 'selectAll'],
          ['--dataset-id', 'datasetId'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "events": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "deprecated": true
    },
    "mapping": {
      "type": "object",
      "properties": {
        "inputs": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": []
        },
        "history": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": []
        },
        "ground_truth": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": []
        }
      },
      "additionalProperties": false
    },
    "filters": {
      "anyOf": [
        {
          "type": "object",
          "additionalProperties": {}
        },
        {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": {}
          }
        }
      ]
    },
    "dateRange": {
      "type": "object",
      "properties": {
        "$gte": {
          "type": "string"
        },
        "$lte": {
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    "checkState": {
      "type": "object",
      "additionalProperties": {
        "type": "boolean"
      }
    },
    "selectAll": {
      "type": "boolean"
    },
    "dataset_id": {
      "type": "string"
    }
  },
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          events: 'events',
          mapping: 'mapping',
          filters: 'filters',
          'date-range': 'dateRange',
          'check-state': 'checkState',
          'select-all': 'selectAll',
          'dataset-id': 'dataset_id',
        } as const;
        if (
          handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
          ])
        ) {
          return;
        }
        if (opts.filename === undefined) {
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
        }
        const client = createDataPlaneClient(command);
        let request: Parameters<typeof client.datapoints.createBatch>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<
            typeof client.datapoints.createBatch
          >[0];
        } else {
          request = {
            ...(opts.events !== undefined && { events: parseJson(opts.events) }),
            ...(opts.mapping !== undefined && { mapping: parseJson(opts.mapping) }),
            ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
            ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
            ...(opts.checkState !== undefined && { checkState: parseJson(opts.checkState) }),
            ...(opts.selectAll !== undefined && { selectAll: opts.selectAll }),
            ...(opts.datasetId !== undefined && { dataset_id: opts.datasetId }),
          } as Parameters<typeof client.datapoints.createBatch>[0];
        }
        const result = await client.datapoints.createBatch(request);
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
    .option('--datapoint-id <value>', 'Datapoint ID like `65c13dbbd65fb876b7886cdb` (required)')
    .option(
      '--show-file-schema',
      'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.',
    )
    .option(
      '--show-argument-schema <flag-name>',
      'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.',
    )
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const FIELD_FLAG_PAIRS = [['--datapoint-id', 'datapointId']] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "datapoint_id": {
      "type": "string",
      "description": "Datapoint ID like \`65c13dbbd65fb876b7886cdb\`"
    }
  },
  "required": [
    "datapoint_id"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'datapoint-id': 'datapoint_id',
        } as const;
        if (
          handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
          ])
        ) {
          return;
        }
        const client = createDataPlaneClient(command);
        let request: Parameters<typeof client.datapoints.get>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<typeof client.datapoints.get>[0];
        } else {
          assertRequiredFields(opts, [['--datapoint-id', 'datapointId']]);
          request = {
            datapoint_id: opts.datapointId,
          } as Parameters<typeof client.datapoints.get>[0];
        }
        const result = await client.datapoints.get(request);
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
    .option('--datapoint-id <value>', 'ID of datapoint to update (required)')
    .option('--inputs <json>', 'inputs')
    .option('--history <json>', 'history')
    .option('--ground-truth <json>', 'ground_truth')
    .option('--metadata <json>', 'metadata')
    .option('--linked-event <value>', 'linked_event')
    .option('--linked-datasets <json>', 'linked_datasets')
    .option(
      '--show-file-schema',
      'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.',
    )
    .option(
      '--show-argument-schema <flag-name>',
      'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.',
    )
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const FIELD_FLAG_PAIRS = [
          ['--datapoint-id', 'datapointId'],
          ['--inputs', 'inputs'],
          ['--history', 'history'],
          ['--ground-truth', 'groundTruth'],
          ['--metadata', 'metadata'],
          ['--linked-event', 'linkedEvent'],
          ['--linked-datasets', 'linkedDatasets'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "datapoint_id": {
      "type": "string",
      "description": "ID of datapoint to update"
    },
    "inputs": {
      "type": "object",
      "additionalProperties": {}
    },
    "history": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "ground_truth": {
      "type": "object",
      "additionalProperties": {}
    },
    "metadata": {
      "type": "object",
      "additionalProperties": {}
    },
    "linked_event": {
      "type": "string"
    },
    "linked_datasets": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "datapoint_id"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'datapoint-id': 'datapoint_id',
          inputs: 'inputs',
          history: 'history',
          'ground-truth': 'ground_truth',
          metadata: 'metadata',
          'linked-event': 'linked_event',
          'linked-datasets': 'linked_datasets',
        } as const;
        if (
          handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
          ])
        ) {
          return;
        }
        const client = createDataPlaneClient(command);
        let request: Parameters<typeof client.datapoints.update>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<
            typeof client.datapoints.update
          >[0];
        } else {
          assertRequiredFields(opts, [['--datapoint-id', 'datapointId']]);
          request = {
            datapoint_id: opts.datapointId,
            ...(opts.inputs !== undefined && { inputs: parseJson(opts.inputs) }),
            ...(opts.history !== undefined && { history: parseJson(opts.history) }),
            ...(opts.groundTruth !== undefined && { ground_truth: parseJson(opts.groundTruth) }),
            ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
            ...(opts.linkedEvent !== undefined && { linked_event: opts.linkedEvent }),
            ...(opts.linkedDatasets !== undefined && {
              linked_datasets: parseJson(opts.linkedDatasets),
            }),
          } as Parameters<typeof client.datapoints.update>[0];
        }
        const result = await client.datapoints.update(request);
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
    .option('--datapoint-id <value>', 'Datapoint ID like `65c13dbbd65fb876b7886cdb` (required)')
    .option(
      '--show-file-schema',
      'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.',
    )
    .option(
      '--show-argument-schema <flag-name>',
      'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.',
    )
    .option(
      '-f, --filename <path>',
      'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.',
    )
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const FIELD_FLAG_PAIRS = [['--datapoint-id', 'datapointId']] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "datapoint_id": {
      "type": "string",
      "description": "Datapoint ID like \`65c13dbbd65fb876b7886cdb\`"
    }
  },
  "required": [
    "datapoint_id"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'datapoint-id': 'datapoint_id',
        } as const;
        if (
          handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
          ])
        ) {
          return;
        }
        const client = createDataPlaneClient(command);
        let request: Parameters<typeof client.datapoints.delete>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<
            typeof client.datapoints.delete
          >[0];
        } else {
          assertRequiredFields(opts, [['--datapoint-id', 'datapointId']]);
          request = {
            datapoint_id: opts.datapointId,
          } as Parameters<typeof client.datapoints.delete>[0];
        }
        const result = await client.datapoints.delete(request);
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
