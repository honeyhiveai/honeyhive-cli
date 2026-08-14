// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.

import { Command } from 'commander';

import {
  assertNoOtherFlags,
  assertRequiredFields,
  createControlPlaneClient,
  handleSchemaIntrospection,
  readRequestFile,
} from '../../utils.js';

export function virtualDataplanesCommand(): Command {
  const cmd = new Command('virtual-dataplanes').description('Virtual Dataplanes commands');

  cmd
    .command('create')
    .description('Create a virtual data plane')
    .option(
      '--org-id <value>',
      'The unique identifier of the organization the virtual data plane is created in (required)',
    )
    .option(
      '--name <value>',
      'Virtual dataplane display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space. (required)',
    )
    .option(
      '--cluster-id <value>',
      'Physical cluster to host this virtual dataplane. Omit to place it alongside the existing virtual dataplanes in this org; required when the org has none yet, or when its virtual dataplanes span more than one cluster.',
    )
    .option(
      '--dataplane-creator <value>',
      'Email of the user to grant the dataplane-creator membership to (API key actors only). A signed-in user does not see the new dataplane until their session refreshes, which happens on their next request to the control plane.',
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
        const FIELD_FLAG_PAIRS = [
          ['--org-id', 'orgId'],
          ['--name', 'name'],
          ['--cluster-id', 'clusterId'],
          ['--dataplane-creator', 'dataplaneCreator'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "org_id": {
      "type": "string",
      "description": "The unique identifier of the organization the virtual data plane is created in"
    },
    "name": {
      "type": "string",
      "description": "Virtual dataplane display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space."
    },
    "cluster_id": {
      "type": "string",
      "description": "Physical cluster to host this virtual dataplane. Omit to place it alongside the existing virtual dataplanes in this org; required when the org has none yet, or when its virtual dataplanes span more than one cluster."
    },
    "dataplane_creator": {
      "type": "string",
      "description": "Email of the user to grant the dataplane-creator membership to (API key actors only). A signed-in user does not see the new dataplane until their session refreshes, which happens on their next request to the control plane."
    }
  },
  "required": [
    "org_id",
    "name"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'org-id': 'org_id',
          name: 'name',
          'cluster-id': 'cluster_id',
          'dataplane-creator': 'dataplane_creator',
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
        let request: Parameters<typeof client.virtualDataplanes.create>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<
            typeof client.virtualDataplanes.create
          >[0];
        } else {
          assertRequiredFields(opts, [
            ['--org-id', 'orgId'],
            ['--name', 'name'],
          ]);
          request = {
            org_id: opts.orgId,
            name: opts.name,
            ...(opts.clusterId !== undefined && { cluster_id: opts.clusterId }),
            ...(opts.dataplaneCreator !== undefined && {
              dataplane_creator: opts.dataplaneCreator,
            }),
          } as Parameters<typeof client.virtualDataplanes.create>[0];
        }
        const result = await client.virtualDataplanes.create(request);
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
    .description('Get a virtual data plane')
    .option(
      '--virtual-dataplane-id <value>',
      'The unique identifier of the virtual data plane to retrieve (required)',
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
        const FIELD_FLAG_PAIRS = [['--virtual-dataplane-id', 'virtualDataplaneId']] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "virtual_dataplane_id": {
      "type": "string",
      "description": "The unique identifier of the virtual data plane to retrieve"
    }
  },
  "required": [
    "virtual_dataplane_id"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'virtual-dataplane-id': 'virtual_dataplane_id',
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
        let request: Parameters<typeof client.virtualDataplanes.get>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<
            typeof client.virtualDataplanes.get
          >[0];
        } else {
          assertRequiredFields(opts, [['--virtual-dataplane-id', 'virtualDataplaneId']]);
          request = {
            virtual_dataplane_id: opts.virtualDataplaneId,
          } as Parameters<typeof client.virtualDataplanes.get>[0];
        }
        const result = await client.virtualDataplanes.get(request);
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
    .description('Update a virtual data plane')
    .option(
      '--virtual-dataplane-id <value>',
      'The unique identifier of the virtual data plane to update (required)',
    )
    .option(
      '--name <value>',
      'Virtual dataplane display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space.',
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
        const FIELD_FLAG_PAIRS = [
          ['--virtual-dataplane-id', 'virtualDataplaneId'],
          ['--name', 'name'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "virtual_dataplane_id": {
      "type": "string",
      "description": "The unique identifier of the virtual data plane to update"
    },
    "name": {
      "type": "string",
      "description": "Virtual dataplane display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space."
    }
  },
  "required": [
    "virtual_dataplane_id"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'virtual-dataplane-id': 'virtual_dataplane_id',
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
        const client = createControlPlaneClient(command);
        let request: Parameters<typeof client.virtualDataplanes.update>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<
            typeof client.virtualDataplanes.update
          >[0];
        } else {
          assertRequiredFields(opts, [['--virtual-dataplane-id', 'virtualDataplaneId']]);
          request = {
            virtual_dataplane_id: opts.virtualDataplaneId,
            ...(opts.name !== undefined && { name: opts.name }),
          } as Parameters<typeof client.virtualDataplanes.update>[0];
        }
        const result = await client.virtualDataplanes.update(request);
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
    .description('Delete a virtual data plane')
    .option(
      '--virtual-dataplane-id <value>',
      'The unique identifier of the virtual data plane to delete (required)',
    )
    .option(
      '--dangerously-delete-child-scopes',
      'Archive the virtual data plane even when it still has active workspaces, archiving\nthose workspaces and their projects too. Without it, such a request fails with a 409\nand no changes are made.',
    )
    .option(
      '--no-dangerously-delete-child-scopes',
      'Archive the virtual data plane even when it still has active workspaces, archiving\nthose workspaces and their projects too. Without it, such a request fails with a 409\nand no changes are made.',
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
        const FIELD_FLAG_PAIRS = [
          ['--virtual-dataplane-id', 'virtualDataplaneId'],
          ['--dangerously-delete-child-scopes', 'dangerouslyDeleteChildScopes'],
          ['--no-dangerously-delete-child-scopes', 'dangerouslyDeleteChildScopes'],
        ] as const;
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "virtual_dataplane_id": {
      "type": "string",
      "description": "The unique identifier of the virtual data plane to delete"
    },
    "dangerously_delete_child_scopes": {
      "type": "boolean",
      "description": "Archive the virtual data plane even when it still has active workspaces, archiving\\nthose workspaces and their projects too. Without it, such a request fails with a 409\\nand no changes are made."
    }
  },
  "required": [
    "virtual_dataplane_id"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
          'virtual-dataplane-id': 'virtual_dataplane_id',
          'dangerously-delete-child-scopes': 'dangerously_delete_child_scopes',
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
        let request: Parameters<typeof client.virtualDataplanes.delete>[0];
        if (opts.filename !== undefined) {
          assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
          request = readRequestFile(opts.filename) as Parameters<
            typeof client.virtualDataplanes.delete
          >[0];
        } else {
          assertRequiredFields(opts, [['--virtual-dataplane-id', 'virtualDataplaneId']]);
          request = {
            virtual_dataplane_id: opts.virtualDataplaneId,
            ...(opts.dangerouslyDeleteChildScopes !== undefined && {
              dangerously_delete_child_scopes: opts.dangerouslyDeleteChildScopes,
            }),
          } as Parameters<typeof client.virtualDataplanes.delete>[0];
        }
        const result = await client.virtualDataplanes.delete(request);
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
