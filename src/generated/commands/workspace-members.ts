// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.

import { Command } from 'commander';

import {
  assertNoOtherFlags,
  assertRequiredFields,
  createControlPlaneClient,
  handleSchemaIntrospection,
  parseJson,
  parseNumber,
  readRequestFile,
} from '../../utils.js';

export function workspaceMembersCommand(): Command {
  const cmd = new Command('workspace-members').description('Workspace Members commands');

  cmd
    .command('list')
    .description("List a workspace's members")
    .option('--workspace-id <value>', 'The unique identifier of the workspace (required)')
    .option('--page <value>', '1-indexed page number')
    .option('--limit <value>', 'Number of members to return per page')
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
        ['--workspace-id', 'workspaceId'],
        ['--page', 'page'],
        ['--limit', 'limit'],
      ] as const;
      const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "workspace_id": {
      "type": "string",
      "description": "The unique identifier of the workspace"
    },
    "page": {
      "type": "number",
      "description": "1-indexed page number"
    },
    "limit": {
      "type": "number",
      "description": "Number of members to return per page"
    }
  },
  "required": [
    "workspace_id"
  ],
  "additionalProperties": false
}`;
      const KEBAB_TO_SPEC = {
        'workspace-id': 'workspace_id',
        page: 'page',
        limit: 'limit',
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
      let request: Parameters<typeof client.workspaceMembers.list>[0];
      if (opts.filename !== undefined) {
        assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
        request = readRequestFile(opts.filename) as Parameters<
          typeof client.workspaceMembers.list
        >[0];
      } else {
        assertRequiredFields(opts, [['--workspace-id', 'workspaceId']]);
        request = {
          workspace_id: opts.workspaceId,
          ...(opts.page !== undefined && { page: parseNumber(opts.page) }),
          ...(opts.limit !== undefined && { limit: parseNumber(opts.limit) }),
        } as Parameters<typeof client.workspaceMembers.list>[0];
      }
      const result = await client.workspaceMembers.list(request);
      if (result !== undefined) {
        process.stdout.write(JSON.stringify(result, null, 2) + '\n');
      }
    });

  cmd
    .command('create')
    .description('Invite someone to a workspace')
    .option('--workspace-id <value>', 'The unique identifier of the workspace (required)')
    .option(
      '--email <value>',
      'The address to invite. It is stored lowercased, because sign-in matches addresses that way (required)',
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
        ['--workspace-id', 'workspaceId'],
        ['--email', 'email'],
      ] as const;
      const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "workspace_id": {
      "type": "string",
      "description": "The unique identifier of the workspace"
    },
    "email": {
      "type": "string",
      "description": "The address to invite. It is stored lowercased, because sign-in matches addresses that way"
    }
  },
  "required": [
    "workspace_id",
    "email"
  ],
  "additionalProperties": false
}`;
      const KEBAB_TO_SPEC = {
        'workspace-id': 'workspace_id',
        email: 'email',
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
      let request: Parameters<typeof client.workspaceMembers.create>[0];
      if (opts.filename !== undefined) {
        assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
        request = readRequestFile(opts.filename) as Parameters<
          typeof client.workspaceMembers.create
        >[0];
      } else {
        assertRequiredFields(opts, [
          ['--workspace-id', 'workspaceId'],
          ['--email', 'email'],
        ]);
        request = {
          workspace_id: opts.workspaceId,
          email: opts.email,
        } as Parameters<typeof client.workspaceMembers.create>[0];
      }
      const result = await client.workspaceMembers.create(request);
      if (result !== undefined) {
        process.stdout.write(JSON.stringify(result, null, 2) + '\n');
      }
    });

  cmd
    .command('update')
    .description("Set a member's roles in a workspace")
    .option('--workspace-id <value>', 'The unique identifier of the workspace (required)')
    .option(
      '--user-id <value>',
      "The member's user id, as the member list returns it. One person has the same user id in every organization, workspace and project (required)",
    )
    .option(
      '--role-names <json>',
      "The member's new roles at this scope, replacing the old ones. Each must be a role the organization's roles manifest defines for this scope's type, which are the roles the HoneyHive app offers for a member here. Any other role is refused with 400, including one a manifest change removed, so writing back roles read before a manifest change can fail (required)",
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
        ['--workspace-id', 'workspaceId'],
        ['--user-id', 'userId'],
        ['--role-names', 'roleNames'],
      ] as const;
      const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "workspace_id": {
      "type": "string",
      "description": "The unique identifier of the workspace"
    },
    "user_id": {
      "type": "string",
      "description": "The member's user id, as the member list returns it. One person has the same user id in every organization, workspace and project"
    },
    "role_names": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The member's new roles at this scope, replacing the old ones. Each must be a role the organization's roles manifest defines for this scope's type, which are the roles the HoneyHive app offers for a member here. Any other role is refused with 400, including one a manifest change removed, so writing back roles read before a manifest change can fail"
    }
  },
  "required": [
    "workspace_id",
    "user_id",
    "role_names"
  ],
  "additionalProperties": false
}`;
      const KEBAB_TO_SPEC = {
        'workspace-id': 'workspace_id',
        'user-id': 'user_id',
        'role-names': 'role_names',
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
      let request: Parameters<typeof client.workspaceMembers.update>[0];
      if (opts.filename !== undefined) {
        assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
        request = readRequestFile(opts.filename) as Parameters<
          typeof client.workspaceMembers.update
        >[0];
      } else {
        assertRequiredFields(opts, [
          ['--workspace-id', 'workspaceId'],
          ['--user-id', 'userId'],
          ['--role-names', 'roleNames'],
        ]);
        request = {
          workspace_id: opts.workspaceId,
          user_id: opts.userId,
          role_names: parseJson(opts.roleNames),
        } as Parameters<typeof client.workspaceMembers.update>[0];
      }
      const result = await client.workspaceMembers.update(request);
      if (result !== undefined) {
        process.stdout.write(JSON.stringify(result, null, 2) + '\n');
      }
    });

  cmd
    .command('delete')
    .description('Remove someone from a workspace')
    .option('--workspace-id <value>', 'The unique identifier of the workspace (required)')
    .option(
      '--user-id <value>',
      "The member's user id, as the member list returns it. One person has the same user id in every organization, workspace and project (required)",
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
        ['--workspace-id', 'workspaceId'],
        ['--user-id', 'userId'],
      ] as const;
      const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "workspace_id": {
      "type": "string",
      "description": "The unique identifier of the workspace"
    },
    "user_id": {
      "type": "string",
      "description": "The member's user id, as the member list returns it. One person has the same user id in every organization, workspace and project"
    }
  },
  "required": [
    "workspace_id",
    "user_id"
  ],
  "additionalProperties": false
}`;
      const KEBAB_TO_SPEC = {
        'workspace-id': 'workspace_id',
        'user-id': 'user_id',
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
      let request: Parameters<typeof client.workspaceMembers.delete>[0];
      if (opts.filename !== undefined) {
        assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
        request = readRequestFile(opts.filename) as Parameters<
          typeof client.workspaceMembers.delete
        >[0];
      } else {
        assertRequiredFields(opts, [
          ['--workspace-id', 'workspaceId'],
          ['--user-id', 'userId'],
        ]);
        request = {
          workspace_id: opts.workspaceId,
          user_id: opts.userId,
        } as Parameters<typeof client.workspaceMembers.delete>[0];
      }
      const result = await client.workspaceMembers.delete(request);
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
