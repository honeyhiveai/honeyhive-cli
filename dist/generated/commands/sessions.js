// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.
import { Command } from 'commander';
import { createClient, parseJson } from './utils.js';
export function sessionsCommand() {
    const cmd = new Command('sessions').description('Sessions commands');
    cmd
        .command('start')
        .description('Start a new session')
        .requiredOption('--session <json>', 'session (required)')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.sessions.start({
                body: {
                    session: parseJson(opts.session),
                },
            });
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
        .command('add-traces')
        .description('Add traces to a session')
        .requiredOption('--session_id <value>', 'Session ID to add traces to (required)')
        .requiredOption('--logs <json>', 'logs (required)')
        .action(async (opts, command) => {
        try {
            const client = createClient(command);
            const result = await client.sessions.addTraces({
                path: {
                    session_id: opts.session_id,
                },
                body: {
                    logs: parseJson(opts.logs),
                },
            });
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
//# sourceMappingURL=sessions.js.map