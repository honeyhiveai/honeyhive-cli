// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.
import { Command } from 'commander';
import { assertNoOtherFlags, assertRequiredFields, createControlPlaneClient, handleSchemaIntrospection, readRequestFile, } from '../../utils.js';
export function projectsCommand() {
    const cmd = new Command('projects').description('Projects commands');
    cmd
        .command('create')
        .description('Create a project')
        .option('--workspace-id <value>', 'The unique identifier of the workspace the project is created in (required)')
        .option('--name <value>', 'Project display name (required)')
        .option('--description <value>', 'Project description')
        .option('--project-creator <value>', 'Email of the user to grant the project-creator membership to (API key actors only). A signed-in user does not see the new project until their session refreshes, which happens on their next request to the control plane.')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--workspace-id', 'workspaceId'],
                ['--name', 'name'],
                ['--description', 'description'],
                ['--project-creator', 'projectCreator'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "workspace_id": {
      "type": "string",
      "description": "The unique identifier of the workspace the project is created in"
    },
    "name": {
      "type": "string",
      "description": "Project display name"
    },
    "description": {
      "type": "string",
      "description": "Project description"
    },
    "project_creator": {
      "type": "string",
      "description": "Email of the user to grant the project-creator membership to (API key actors only). A signed-in user does not see the new project until their session refreshes, which happens on their next request to the control plane."
    }
  },
  "required": [
    "workspace_id",
    "name"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'workspace-id': 'workspace_id',
                name: 'name',
                description: 'description',
                'project-creator': 'project_creator',
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
                    ['--name', 'name'],
                ]);
                request = {
                    workspace_id: opts.workspaceId,
                    name: opts.name,
                    ...(opts.description !== undefined && { description: opts.description }),
                    ...(opts.projectCreator !== undefined && { project_creator: opts.projectCreator }),
                };
            }
            const result = await client.projects.create(request);
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
        .description('Get a project')
        .option('--project-id <value>', 'The unique identifier of the project to retrieve (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [['--project-id', 'projectId']];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project to retrieve"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'project-id': 'project_id',
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
                assertRequiredFields(opts, [['--project-id', 'projectId']]);
                request = {
                    project_id: opts.projectId,
                };
            }
            const result = await client.projects.get(request);
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
        .description('Update a project')
        .option('--project-id <value>', 'The unique identifier of the project to update (required)')
        .option('--name <value>', 'Project display name')
        .option('--description <value>', 'Project description')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--project-id', 'projectId'],
                ['--name', 'name'],
                ['--description', 'description'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project to update"
    },
    "name": {
      "type": "string",
      "description": "Project display name"
    },
    "description": {
      "type": "string",
      "description": "Project description"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'project-id': 'project_id',
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
                assertRequiredFields(opts, [['--project-id', 'projectId']]);
                request = {
                    project_id: opts.projectId,
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.description !== undefined && { description: opts.description }),
                };
            }
            const result = await client.projects.update(request);
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
        .description('Delete a project')
        .option('--project-id <value>', 'The unique identifier of the project to delete (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [['--project-id', 'projectId']];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project to delete"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'project-id': 'project_id',
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
                assertRequiredFields(opts, [['--project-id', 'projectId']]);
                request = {
                    project_id: opts.projectId,
                };
            }
            const result = await client.projects.delete(request);
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
//# sourceMappingURL=projects.js.map