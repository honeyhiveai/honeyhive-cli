// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.

import { Command } from 'commander';

import {
  assertNoOtherFlags,
  assertRequiredFields,
  createClient,
  handleSchemaIntrospection,
  parseJson,
  readRequestFile,
} from '../../utils.js';

export function datasetsCommand(): Command {
  const cmd = new Command('datasets').description('Datasets commands');

  cmd
    .command('list')
    .description('Get datasets')
    .option('--dataset-id <value>', 'Unique dataset ID for filtering specific dataset')
    .option('--name <value>', 'Dataset name to filter by')
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
          ['--dataset-id', 'datasetId'],
          ['--name', 'name'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "dataset_id": {
      "type": "string",
      "description": "Unique dataset ID for filtering specific dataset"
    },
    "name": {
      "type": "string",
      "description": "Dataset name to filter by"
    }
  },
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'dataset-id': 'dataset_id',
          name: 'name',
        } as const;
        if (
          handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
          ])
        ) {
          return;
        }
        const client = createClient(command);
        let request: Parameters<typeof client.datasets.list>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<typeof client.datasets.list>[0];
        } else {
          request = {
            ...(opts.datasetId !== undefined && { dataset_id: opts.datasetId }),
            ...(opts.name !== undefined && { name: opts.name }),
          } as Parameters<typeof client.datasets.list>[0];
        }
        const result = await client.datasets.list(request);
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
          ['--name', 'name'],
          ['--description', 'description'],
          ['--datapoints', 'datapoints'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the dataset",
      "default": "Untitled Dataset"
    },
    "description": {
      "type": "string",
      "description": "Description of the dataset"
    },
    "datapoints": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Initial datapoint IDs to include",
      "default": []
    }
  },
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          name: 'name',
          description: 'description',
          datapoints: 'datapoints',
        } as const;
        if (
          handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
          ])
        ) {
          return;
        }
        const client = createClient(command);
        let request: Parameters<typeof client.datasets.create>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<typeof client.datasets.create>[0];
        } else {
          request = {
            ...(opts.name !== undefined && { name: opts.name }),
            ...(opts.description !== undefined && { description: opts.description }),
            ...(opts.datapoints !== undefined && { datapoints: parseJson(opts.datapoints) }),
          } as Parameters<typeof client.datasets.create>[0];
        }
        const result = await client.datasets.create(request);
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
    .option(
      '--dataset-id <value>',
      'The unique identifier of the dataset to update like `663876ec4611c47f4970f0c3` (required)',
    )
    .option('--name <value>', 'New dataset name')
    .option('--description <value>', 'New dataset description')
    .option('--datapoints <json>', 'Updated list of datapoint IDs')
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
          ['--dataset-id', 'datasetId'],
          ['--name', 'name'],
          ['--description', 'description'],
          ['--datapoints', 'datapoints'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "dataset_id": {
      "type": "string",
      "description": "The unique identifier of the dataset to update like \`663876ec4611c47f4970f0c3\`"
    },
    "name": {
      "type": "string",
      "description": "New dataset name"
    },
    "description": {
      "type": "string",
      "description": "New dataset description"
    },
    "datapoints": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Updated list of datapoint IDs"
    }
  },
  "required": [
    "dataset_id"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'dataset-id': 'dataset_id',
          name: 'name',
          description: 'description',
          datapoints: 'datapoints',
        } as const;
        if (
          handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
          ])
        ) {
          return;
        }
        const client = createClient(command);
        let request: Parameters<typeof client.datasets.update>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<typeof client.datasets.update>[0];
        } else {
          assertRequiredFields(opts, [['--dataset-id', 'datasetId']]);
          request = {
            dataset_id: opts.datasetId,
            ...(opts.name !== undefined && { name: opts.name }),
            ...(opts.description !== undefined && { description: opts.description }),
            ...(opts.datapoints !== undefined && { datapoints: parseJson(opts.datapoints) }),
          } as Parameters<typeof client.datasets.update>[0];
        }
        const result = await client.datasets.update(request);
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
    .option(
      '--dataset-id <value>',
      'The unique identifier of the dataset to be deleted like `663876ec4611c47f4970f0c3` (required)',
    )
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
        const FIELD_FLAG_PAIRS = [['--dataset-id', 'datasetId']] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "dataset_id": {
      "type": "string",
      "description": "The unique identifier of the dataset to be deleted like \`663876ec4611c47f4970f0c3\`"
    }
  },
  "required": [
    "dataset_id"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
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
        const client = createClient(command);
        let request: Parameters<typeof client.datasets.delete>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<typeof client.datasets.delete>[0];
        } else {
          assertRequiredFields(opts, [['--dataset-id', 'datasetId']]);
          request = {
            dataset_id: opts.datasetId,
          } as Parameters<typeof client.datasets.delete>[0];
        }
        const result = await client.datasets.delete(request);
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
    .option(
      '--dataset-id <value>',
      'The unique identifier of the dataset to add datapoints to like  `663876ec4611c47f4970f0c3` (required)',
    )
    .option('--data <json>', 'Array of datapoint data objects to add (required)')
    .option('--mapping <json>', 'mapping (required)')
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
          ['--dataset-id', 'datasetId'],
          ['--data', 'data'],
          ['--mapping', 'mapping'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "dataset_id": {
      "type": "string",
      "description": "The unique identifier of the dataset to add datapoints to like  \`663876ec4611c47f4970f0c3\`"
    },
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      },
      "description": "Array of datapoint data objects to add"
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
    }
  },
  "required": [
    "dataset_id",
    "data",
    "mapping"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'dataset-id': 'dataset_id',
          data: 'data',
          mapping: 'mapping',
        } as const;
        if (
          handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
          ])
        ) {
          return;
        }
        const client = createClient(command);
        let request: Parameters<typeof client.datasets.addDatapoints>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<
            typeof client.datasets.addDatapoints
          >[0];
        } else {
          assertRequiredFields(opts, [
            ['--dataset-id', 'datasetId'],
            ['--data', 'data'],
            ['--mapping', 'mapping'],
          ]);
          request = {
            dataset_id: opts.datasetId,
            data: parseJson(opts.data),
            mapping: parseJson(opts.mapping),
          } as Parameters<typeof client.datasets.addDatapoints>[0];
        }
        const result = await client.datasets.addDatapoints(request);
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
    .option('--dataset-id <value>', 'The unique identifier of the dataset (required)')
    .option('--datapoint-id <value>', 'The unique identifier of the datapoint to remove (required)')
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
          ['--dataset-id', 'datasetId'],
          ['--datapoint-id', 'datapointId'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "dataset_id": {
      "type": "string",
      "description": "The unique identifier of the dataset"
    },
    "datapoint_id": {
      "type": "string",
      "description": "The unique identifier of the datapoint to remove"
    }
  },
  "required": [
    "dataset_id",
    "datapoint_id"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'dataset-id': 'dataset_id',
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
        const client = createClient(command);
        let request: Parameters<typeof client.datasets.removeDatapoint>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<
            typeof client.datasets.removeDatapoint
          >[0];
        } else {
          assertRequiredFields(opts, [
            ['--dataset-id', 'datasetId'],
            ['--datapoint-id', 'datapointId'],
          ]);
          request = {
            dataset_id: opts.datasetId,
            datapoint_id: opts.datapointId,
          } as Parameters<typeof client.datasets.removeDatapoint>[0];
        }
        const result = await client.datasets.removeDatapoint(request);
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
