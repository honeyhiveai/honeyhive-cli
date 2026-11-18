// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.
import { Command } from 'commander';
import { assertNoOtherFlags, assertRequiredFields, createControlPlaneClient, handleSchemaIntrospection, readRequestFile, } from '../../utils.js';
export function workspaceTemplatesCommand() {
    const cmd = new Command('workspace-templates').description('Workspace Templates commands');
    cmd
        .command('get')
        .description("Get a workspace's templates manifest")
        .option('--workspace-id <value>', 'The unique identifier of the workspace (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [['--workspace-id', 'workspaceId']];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "workspace_id": {
      "type": "string",
      "description": "The unique identifier of the workspace"
    }
  },
  "required": [
    "workspace_id"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'workspace-id': 'workspace_id',
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
            assertRequiredFields(opts, [['--workspace-id', 'workspaceId']]);
            request = {
                workspace_id: opts.workspaceId,
            };
        }
        const result = await client.workspaceTemplates.get(request);
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('update')
        .description("Replace a workspace's templates manifest")
        .option('--workspace-id <value>', 'The unique identifier of the workspace (required)')
        .option('--yaml-content <value>', 'The templates manifest, as YAML. It must parse and pass templates manifest validation for a workspace, which forbids `workspace_templates`. (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--workspace-id', 'workspaceId'],
            ['--yaml-content', 'yamlContent'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "workspace_id": {
      "type": "string",
      "description": "The unique identifier of the workspace"
    },
    "yaml_content": {
      "type": "string",
      "description": "The templates manifest, as YAML. It must parse and pass templates manifest validation for a workspace, which forbids \`workspace_templates\`."
    }
  },
  "required": [
    "workspace_id",
    "yaml_content"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'workspace-id': 'workspace_id',
            'yaml-content': 'yaml_content',
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
            assertRequiredFields(opts, [
                ['--workspace-id', 'workspaceId'],
                ['--yaml-content', 'yamlContent'],
            ]);
            request = {
                workspace_id: opts.workspaceId,
                yaml_content: opts.yamlContent,
            };
        }
        const result = await client.workspaceTemplates.update(request);
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
//# sourceMappingURL=workspace-templates.js.map