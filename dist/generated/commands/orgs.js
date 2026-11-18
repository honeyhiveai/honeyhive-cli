// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.
import { Command } from 'commander';
import { assertNoOtherFlags, assertRequiredFields, createControlPlaneClient, handleSchemaIntrospection, readRequestFile, } from '../../utils.js';
export function orgsCommand() {
    const cmd = new Command('orgs').description('Orgs commands');
    cmd
        .command('get')
        .description('Get an organization')
        .option('--org-id <value>', 'The unique identifier of the organization to retrieve (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [['--org-id', 'orgId']];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "org_id": {
      "type": "string",
      "description": "The unique identifier of the organization to retrieve"
    }
  },
  "required": [
    "org_id"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'org-id': 'org_id',
        };
        if (handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
        ])) {
            return;
        }
        const client = createControlPlaneClient(command);
        let request;
        if (opts.filename !== undefined) {
            assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
            request = readRequestFile(opts.filename);
        }
        else {
            assertRequiredFields(opts, [['--org-id', 'orgId']]);
            request = {
                org_id: opts.orgId,
            };
        }
        const result = await client.orgs.get(request);
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('update')
        .description('Update an organization')
        .option('--org-id <value>', 'The unique identifier of the organization to update (required)')
        .option('--name <value>', 'Organization display name. Allowed characters are the letters A-Z and a-z (no accented letters), digits, space, underscore, hyphen, apostrophe and ampersand, and the name must not start with a space.')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--org-id', 'orgId'],
            ['--name', 'name'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "org_id": {
      "type": "string",
      "description": "The unique identifier of the organization to update"
    },
    "name": {
      "type": "string",
      "description": "Organization display name. Allowed characters are the letters A-Z and a-z (no accented letters), digits, space, underscore, hyphen, apostrophe and ampersand, and the name must not start with a space."
    }
  },
  "required": [
    "org_id"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'org-id': 'org_id',
            name: 'name',
        };
        if (handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
            ['--filename', 'filename'],
            ...FIELD_FLAG_PAIRS,
        ])) {
            return;
        }
        const client = createControlPlaneClient(command);
        let request;
        if (opts.filename !== undefined) {
            assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
            request = readRequestFile(opts.filename);
        }
        else {
            assertRequiredFields(opts, [['--org-id', 'orgId']]);
            request = {
                org_id: opts.orgId,
                ...(opts.name !== undefined && { name: opts.name }),
            };
        }
        const result = await client.orgs.update(request);
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
//# sourceMappingURL=orgs.js.map