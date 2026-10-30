// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.

import { Command, Option } from 'commander';

import {
  assertNoOtherFlags,
  assertRequiredFields,
  createControlPlaneClient,
  handleSchemaIntrospection,
  readRequestFile,
} from '../../utils.js';

export function usageCommand(): Command {
  const cmd = new Command('usage').description('Usage commands');

  cmd
    .command('get')
    .description('Get usage for a date range')
    .option('--org-id <value>', 'The unique identifier of the organization (required)')
    .option(
      '--start-date <value>',
      'Inclusive start, `YYYY-MM-DD` (UTC), no later than today (required)',
    )
    .option(
      '--end-date <value>',
      'Exclusive end, `YYYY-MM-DD` (UTC), 1 to 92 days after `start_date` (required)',
    )
    .addOption(
      new Option(
        '--group-by <value>',
        'Split results by workspace, or by project (each project row also carries its workspace)',
      ).choices(['workspace_id', 'project_id']),
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
        ['--start-date', 'startDate'],
        ['--end-date', 'endDate'],
        ['--group-by', 'groupBy'],
      ] as const;
      const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "org_id": {
      "type": "string",
      "description": "The unique identifier of the organization"
    },
    "start_date": {
      "type": "string",
      "description": "Inclusive start, \`YYYY-MM-DD\` (UTC), no later than today"
    },
    "end_date": {
      "type": "string",
      "description": "Exclusive end, \`YYYY-MM-DD\` (UTC), 1 to 92 days after \`start_date\`"
    },
    "group_by": {
      "type": "string",
      "enum": [
        "workspace_id",
        "project_id"
      ],
      "description": "Split results by workspace, or by project (each project row also carries its workspace)"
    }
  },
  "required": [
    "org_id",
    "start_date",
    "end_date"
  ],
  "additionalProperties": false
}`;
      const KEBAB_TO_SPEC = {
        'org-id': 'org_id',
        'start-date': 'start_date',
        'end-date': 'end_date',
        'group-by': 'group_by',
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
      let request: Parameters<typeof client.usage.get>[0];
      if (opts.filename !== undefined) {
        assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
        request = readRequestFile(opts.filename) as Parameters<typeof client.usage.get>[0];
      } else {
        assertRequiredFields(opts, [
          ['--org-id', 'orgId'],
          ['--start-date', 'startDate'],
          ['--end-date', 'endDate'],
        ]);
        request = {
          org_id: opts.orgId,
          start_date: opts.startDate,
          end_date: opts.endDate,
          ...(opts.groupBy !== undefined && { group_by: opts.groupBy }),
        } as Parameters<typeof client.usage.get>[0];
      }
      const result = await client.usage.get(request);
      if (result !== undefined) {
        process.stdout.write(JSON.stringify(result, null, 2) + '\n');
      }
    });

  cmd
    .command('current')
    .description('Get current usage counts')
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
      let request: Parameters<typeof client.usage.getCurrent>[0];
      if (opts.filename !== undefined) {
        assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
        request = readRequestFile(opts.filename) as Parameters<typeof client.usage.getCurrent>[0];
      } else {
        assertRequiredFields(opts, [['--org-id', 'orgId']]);
        request = {
          org_id: opts.orgId,
        } as Parameters<typeof client.usage.getCurrent>[0];
      }
      const result = await client.usage.getCurrent(request);
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
