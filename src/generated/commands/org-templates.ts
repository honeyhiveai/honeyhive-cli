// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.

import { Command } from 'commander';

import {
  assertNoOtherFlags,
  assertRequiredFields,
  createControlPlaneClient,
  handleSchemaIntrospection,
  readRequestFile,
} from '../../utils.js';

export function orgTemplatesCommand(): Command {
  const cmd = new Command('org-templates').description('Org Templates commands');

  cmd
    .command('get')
    .description("Get an organization's templates manifest")
    .option('--org-id <value>', 'The unique identifier of the organization (required)')
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
      const FIELD_FLAG_PAIRS = [['--org-id', 'orgId']] as const;
      const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "org_id": {
      "type": "string",
      "description": "The unique identifier of the organization"
    }
  },
  "required": [
    "org_id"
  ],
  "additionalProperties": false
}`;
      const KEBAB_TO_SPEC = {
        'org-id': 'org_id',
      } as const;
      if (
        handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
          ['--filename', 'filename'],
          ...FIELD_FLAG_PAIRS,
        ])
      ) {
        return;
      }
      const client = createControlPlaneClient(command);
      let request: Parameters<typeof client.orgTemplates.get>[0];
      if (opts.filename !== undefined) {
        assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
        request = readRequestFile(opts.filename) as Parameters<typeof client.orgTemplates.get>[0];
      } else {
        assertRequiredFields(opts, [['--org-id', 'orgId']]);
        request = {
          org_id: opts.orgId,
        } as Parameters<typeof client.orgTemplates.get>[0];
      }
      const result = await client.orgTemplates.get(request);
      if (result !== undefined) {
        process.stdout.write(JSON.stringify(result, null, 2) + '\n');
      }
    });

  cmd
    .command('update')
    .description("Replace an organization's templates manifest")
    .option('--org-id <value>', 'The unique identifier of the organization (required)')
    .option(
      '--yaml-content <value>',
      'The templates manifest, as YAML. It must parse and pass templates manifest validation for an organization. (required)',
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
      const FIELD_FLAG_PAIRS = [
        ['--org-id', 'orgId'],
        ['--yaml-content', 'yamlContent'],
      ] as const;
      const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "org_id": {
      "type": "string",
      "description": "The unique identifier of the organization"
    },
    "yaml_content": {
      "type": "string",
      "description": "The templates manifest, as YAML. It must parse and pass templates manifest validation for an organization."
    }
  },
  "required": [
    "org_id",
    "yaml_content"
  ],
  "additionalProperties": false
}`;
      const KEBAB_TO_SPEC = {
        'org-id': 'org_id',
        'yaml-content': 'yaml_content',
      } as const;
      if (
        handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
          ['--filename', 'filename'],
          ...FIELD_FLAG_PAIRS,
        ])
      ) {
        return;
      }
      const client = createControlPlaneClient(command);
      let request: Parameters<typeof client.orgTemplates.update>[0];
      if (opts.filename !== undefined) {
        assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
        request = readRequestFile(opts.filename) as Parameters<
          typeof client.orgTemplates.update
        >[0];
      } else {
        assertRequiredFields(opts, [
          ['--org-id', 'orgId'],
          ['--yaml-content', 'yamlContent'],
        ]);
        request = {
          org_id: opts.orgId,
          yaml_content: opts.yamlContent,
        } as Parameters<typeof client.orgTemplates.update>[0];
      }
      const result = await client.orgTemplates.update(request);
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
