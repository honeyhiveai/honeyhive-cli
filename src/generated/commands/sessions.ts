// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.

import { Command } from 'commander';

import { createClient, parseJson, parseNumber } from './utils.js';

export function sessionsCommand(): Command {
  const cmd = new Command('sessions').description('Sessions commands');

  cmd
    .command('create')
    .description('Start a new session')
    .option('--session-id <value>', 'Client-provided session ID (server generates one if omitted)')
    .option('--session-name <value>', 'Display name for the session')
    .option('--event-name <value>', 'Fallback name if session_name is not provided')
    .option('--source <value>', 'Source of the session (e.g., sdk-python)')
    .option('--start-time <value>', 'Session start time as Unix milliseconds')
    .option('--end-time <value>', 'Session end time as Unix milliseconds')
    .option('--duration <value>', 'Session duration in milliseconds')
    .option('--config <json>', 'Configuration associated with the session')
    .option('--inputs <json>', 'Input data for the session')
    .option('--outputs <json>', 'Output data from the session')
    .option('--metadata <json>', 'Arbitrary metadata for the session')
    .option('--user-properties <json>', 'User properties associated with the session')
    .option('--children-ids <json>', 'IDs of child events in this session')
    .action(async (opts: Record<string, unknown>, command: Command) => {
      try {
        const client = createClient(command);
        const result = await client.sessions.create({
          body: {
            ...(opts.sessionId !== undefined && { session_id: opts.sessionId }),
            ...(opts.sessionName !== undefined && { session_name: opts.sessionName }),
            ...(opts.eventName !== undefined && { event_name: opts.eventName }),
            ...(opts.source !== undefined && { source: opts.source }),
            ...(opts.startTime !== undefined && { start_time: parseNumber(opts.startTime) }),
            ...(opts.endTime !== undefined && { end_time: parseNumber(opts.endTime) }),
            ...(opts.duration !== undefined && { duration: parseNumber(opts.duration) }),
            ...(opts.config !== undefined && { config: parseJson(opts.config) }),
            ...(opts.inputs !== undefined && { inputs: parseJson(opts.inputs) }),
            ...(opts.outputs !== undefined && { outputs: parseJson(opts.outputs) }),
            ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
            ...(opts.userProperties !== undefined && {
              user_properties: parseJson(opts.userProperties),
            }),
            ...(opts.childrenIds !== undefined && { children_ids: parseJson(opts.childrenIds) }),
          },
        } as Parameters<typeof client.sessions.create>[0]);
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
