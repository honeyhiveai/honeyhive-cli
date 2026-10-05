// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.

import { Command } from 'commander';

import {
  assertNoOtherFlags,
  assertRequiredFields,
  createDataPlaneClient,
  handleSchemaIntrospection,
  readRequestFile,
} from '../../utils.js';

export function ingestionApiKeysCommand(): Command {
  const cmd = new Command('ingestion-api-keys').description('Ingestion Api Keys commands');

  cmd
    .command('create')
    .description('Create an ingestion API key')
    .option(
      '--project-id <value>',
      'The unique identifier of the project the key belongs to (required)',
    )
    .option('--name <value>', 'A name for the key, shown in the key list. (required)')
    .option('--description <value>', 'What the key is for.')
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
      const FIELD_FLAG_PAIRS = [
        ['--project-id', 'projectId'],
        ['--name', 'name'],
        ['--description', 'description'],
      ] as const;
      const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project the key belongs to"
    },
    "name": {
      "type": "string",
      "description": "A name for the key, shown in the key list."
    },
    "description": {
      "type": "string",
      "description": "What the key is for."
    }
  },
  "required": [
    "project_id",
    "name"
  ],
  "additionalProperties": false
}`;
      const KEBAB_TO_SPEC = {
        'project-id': 'project_id',
        name: 'name',
        description: 'description',
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
      let request: Parameters<typeof client.ingestionApiKeys.create>[0];
      if (opts.filename !== undefined) {
        assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
        request = readRequestFile(opts.filename) as Parameters<
          typeof client.ingestionApiKeys.create
        >[0];
      } else {
        assertRequiredFields(opts, [
          ['--project-id', 'projectId'],
          ['--name', 'name'],
        ]);
        request = {
          project_id: opts.projectId,
          name: opts.name,
          ...(opts.description !== undefined && { description: opts.description }),
        } as Parameters<typeof client.ingestionApiKeys.create>[0];
      }
      const result = await client.ingestionApiKeys.create(request);
      if (result !== undefined) {
        process.stdout.write(JSON.stringify(result, null, 2) + '\n');
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
