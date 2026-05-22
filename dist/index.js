#!/usr/bin/env node
import { program } from 'commander';
import { registerCommands } from './generated/commands/index.js';
import { CLI_VERSION } from './generated/version.js';
program
    .name('honeyhive')
    .description('HoneyHive CLI')
    .version(CLI_VERSION)
    .option('--api-key <key>', 'API key (overrides HH_API_KEY env var)')
    .option('--data-plane-url <url>', 'Data plane URL (overrides HH_DATA_PLANE_URL env var)')
    .option('--base-url <url>', '(Deprecated, use --data-plane-url) Data plane URL')
    .option('--verbose', 'Log the resolved data plane URL, masked API key, and CLI version on startup');
registerCommands(program);
program.action(() => {
    if (!process.argv.includes('--help') && !process.argv.includes('-h')) {
        console.error('Error: command is required\n');
    }
    program.help();
});
program.parseAsync(process.argv).catch((err) => {
    const message = err instanceof Error ? err.message : String(err);
    console.error(message);
    process.exit(1);
});
//# sourceMappingURL=index.js.map