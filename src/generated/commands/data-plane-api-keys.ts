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

export function dataPlaneApiKeysCommand(): Command {
  const cmd = new Command('data-plane-api-keys').description('Data Plane Api Keys commands');

  cmd
    .command('create')
    .description('Create a data plane API key')
    .option(
      '--project-id <value>',
      'The unique identifier of the project the key is rooted at (required)',
    )
    .option('--name <value>', 'A name for the key, shown in the key list. (required)')
    .option(
      '--permissions <json>',
      "The permissions the key carries, such as `project.chart.get`. Each must be one the key's root scope can carry and one the organization's data plane key policy allows; the key creation screen under the project's Settings → API Keys lists them. (required)",
    )
    .option(
      '--expires-at <value>',
      'When the key expires, as an ISO 8601 timestamp. It must be in the future and within the maximum key lifetime; a later value is refused with the limit named. (required)',
    )
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
        ['--permissions', 'permissions'],
        ['--expires-at', 'expiresAt'],
      ] as const;
      const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project the key is rooted at"
    },
    "name": {
      "type": "string",
      "description": "A name for the key, shown in the key list."
    },
    "description": {
      "type": "string",
      "description": "What the key is for."
    },
    "permissions": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The permissions the key carries, such as \`project.chart.get\`. Each must be one the key's root scope can carry and one the organization's data plane key policy allows; the key creation screen under the project's Settings → API Keys lists them."
    },
    "expires_at": {
      "type": "string",
      "description": "When the key expires, as an ISO 8601 timestamp. It must be in the future and within the maximum key lifetime; a later value is refused with the limit named."
    }
  },
  "required": [
    "project_id",
    "name",
    "permissions",
    "expires_at"
  ],
  "additionalProperties": false
}`;
      const KEBAB_TO_SPEC = {
        'project-id': 'project_id',
        name: 'name',
        description: 'description',
        permissions: 'permissions',
        'expires-at': 'expires_at',
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
      let request: Parameters<typeof client.dataPlaneApiKeys.create>[0];
      if (opts.filename !== undefined) {
        assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
        request = readRequestFile(opts.filename) as Parameters<
          typeof client.dataPlaneApiKeys.create
        >[0];
      } else {
        assertRequiredFields(opts, [
          ['--project-id', 'projectId'],
          ['--name', 'name'],
          ['--permissions', 'permissions'],
          ['--expires-at', 'expiresAt'],
        ]);
        request = {
          project_id: opts.projectId,
          name: opts.name,
          ...(opts.description !== undefined && { description: opts.description }),
          permissions: parseJson(opts.permissions),
          expires_at: opts.expiresAt,
        } as Parameters<typeof client.dataPlaneApiKeys.create>[0];
      }
      const result = await client.dataPlaneApiKeys.create(request);
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
