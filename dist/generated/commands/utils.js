// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.
import { Client } from '@honeyhive/api-client';
import { CLI_VERSION } from '../version.js';
export function createClient(command) {
    const globalOpts = command.optsWithGlobals();
    const apiKey = globalOpts.apiKey ?? process.env.HH_API_KEY;
    if (!apiKey) {
        console.error('Missing API key: provide --api-key or set the HH_API_KEY environment variable');
        process.exit(1);
    }
    return new Client({
        apiKey,
        ...(globalOpts.baseUrl !== undefined && { serverUrl: globalOpts.baseUrl }),
        _internal_provenance: {
            package: '@honeyhive/cli',
            version: CLI_VERSION,
        },
    });
}
export function parseJson(value) {
    if (typeof value !== 'string') {
        console.error(`Expected a JSON string, got ${typeof value}`);
        process.exit(1);
    }
    try {
        return JSON.parse(value);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Invalid JSON: ${message}`);
        process.exit(1);
    }
}
export function parseNumber(value) {
    const n = Number(value);
    if (Number.isNaN(n)) {
        console.error(`Expected a number, got '${String(value)}'`);
        process.exit(1);
    }
    return n;
}
//# sourceMappingURL=utils.js.map