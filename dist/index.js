#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { program } from 'commander';
import { registerCommands } from './generated/commands/index.js';
const { version } = JSON.parse(readFileSync(resolve(import.meta.dirname, '../package.json'), 'utf-8'));
program
    .name('honeyhive')
    .description('HoneyHive CLI')
    .version(version)
    .option('--api-key <key>', 'API key (overrides HH_API_KEY env var)')
    .option('--base-url <url>', 'Base URL (overrides HH_API_URL env var)');
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