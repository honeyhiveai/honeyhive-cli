// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.
import { Command } from 'commander';
import { assertNoOtherFlags, assertRequiredFields, createControlPlaneClient, handleSchemaIntrospection, readRequestFile, } from '../../utils.js';
export function workspacesCommand() {
    const cmd = new Command('workspaces').description('Workspaces commands');
    cmd
        .command('create')
        .description('Create a workspace')
        .option('--virtual-dataplane-id <value>', 'The unique identifier of the virtual data plane the workspace is created in (required)')
        .option('--name <value>', 'Workspace display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space. (required)')
        .option('--description <value>', 'Workspace description')
        .option('--workspace-creator <value>', 'Email of the user to grant the workspace-creator membership to (API key actors only). A signed-in user does not see the new workspace until their session refreshes, which happens on their next request to the control plane.')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--virtual-dataplane-id', 'virtualDataplaneId'],
                ['--name', 'name'],
                ['--description', 'description'],
                ['--workspace-creator', 'workspaceCreator'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "virtual_dataplane_id": {
      "type": "string",
      "description": "The unique identifier of the virtual data plane the workspace is created in"
    },
    "name": {
      "type": "string",
      "description": "Workspace display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space."
    },
    "description": {
      "type": "string",
      "description": "Workspace description"
    },
    "workspace_creator": {
      "type": "string",
      "description": "Email of the user to grant the workspace-creator membership to (API key actors only). A signed-in user does not see the new workspace until their session refreshes, which happens on their next request to the control plane."
    }
  },
  "required": [
    "virtual_dataplane_id",
    "name"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'virtual-dataplane-id': 'virtual_dataplane_id',
                name: 'name',
                description: 'description',
                'workspace-creator': 'workspace_creator',
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
                    ['--virtual-dataplane-id', 'virtualDataplaneId'],
                    ['--name', 'name'],
                ]);
                request = {
                    virtual_dataplane_id: opts.virtualDataplaneId,
                    name: opts.name,
                    ...(opts.description !== undefined && { description: opts.description }),
                    ...(opts.workspaceCreator !== undefined && {
                        workspace_creator: opts.workspaceCreator,
                    }),
                };
            }
            const result = await client.workspaces.create(request);
            if (result !== undefined) {
                process.stdout.write(JSON.stringify(result, null, 2) + '\n');
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(message);
            process.exit(1);
        }
    });
    cmd
        .command('get')
        .description('Get a workspace')
        .option('--workspace-id <value>', 'The unique identifier of the workspace to retrieve (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [['--workspace-id', 'workspaceId']];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "workspace_id": {
      "type": "string",
      "description": "The unique identifier of the workspace to retrieve"
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
            const result = await client.workspaces.get(request);
            if (result !== undefined) {
                process.stdout.write(JSON.stringify(result, null, 2) + '\n');
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(message);
            process.exit(1);
        }
    });
    cmd
        .command('update')
        .description('Update a workspace')
        .option('--workspace-id <value>', 'The unique identifier of the workspace to update (required)')
        .option('--name <value>', 'Workspace display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space.')
        .option('--description <value>', 'Workspace description')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--workspace-id', 'workspaceId'],
                ['--name', 'name'],
                ['--description', 'description'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "workspace_id": {
      "type": "string",
      "description": "The unique identifier of the workspace to update"
    },
    "name": {
      "type": "string",
      "description": "Workspace display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space."
    },
    "description": {
      "type": "string",
      "description": "Workspace description"
    }
  },
  "required": [
    "workspace_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'workspace-id': 'workspace_id',
                name: 'name',
                description: 'description',
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
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.description !== undefined && { description: opts.description }),
                };
            }
            const result = await client.workspaces.update(request);
            if (result !== undefined) {
                process.stdout.write(JSON.stringify(result, null, 2) + '\n');
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(message);
            process.exit(1);
        }
    });
    cmd
        .command('delete')
        .description('Delete a workspace')
        .option('--workspace-id <value>', 'The unique identifier of the workspace to delete (required)')
        .option('--dangerously-delete-child-scopes', 'Archive the workspace even when it still has active projects, archiving those projects\ntoo. Without it, such a request fails with a 409 and no changes are made.')
        .option('--no-dangerously-delete-child-scopes', 'Archive the workspace even when it still has active projects, archiving those projects\ntoo. Without it, such a request fails with a 409 and no changes are made.')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--workspace-id', 'workspaceId'],
                ['--dangerously-delete-child-scopes', 'dangerouslyDeleteChildScopes'],
                ['--no-dangerously-delete-child-scopes', 'dangerouslyDeleteChildScopes'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "workspace_id": {
      "type": "string",
      "description": "The unique identifier of the workspace to delete"
    },
    "dangerously_delete_child_scopes": {
      "type": "boolean",
      "description": "Archive the workspace even when it still has active projects, archiving those projects\\ntoo. Without it, such a request fails with a 409 and no changes are made."
    }
  },
  "required": [
    "workspace_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'workspace-id': 'workspace_id',
                'dangerously-delete-child-scopes': 'dangerously_delete_child_scopes',
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
                    ...(opts.dangerouslyDeleteChildScopes !== undefined && {
                        dangerously_delete_child_scopes: opts.dangerouslyDeleteChildScopes,
                    }),
                };
            }
            const result = await client.workspaces.delete(request);
            if (result !== undefined) {
                process.stdout.write(JSON.stringify(result, null, 2) + '\n');
            }
        }
        catch (error) {
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
//# sourceMappingURL=workspaces.js.map