// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.

import { Client } from '@honeyhive/api-client';
import { type Command } from 'commander';

import { CLI_VERSION } from '../version.js';

export function createClient(command: Command): Client {
  const globalOpts = command.optsWithGlobals<{
    apiKey?: string;
    baseUrl?: string;
    verbose?: boolean;
  }>();
  const apiKey = globalOpts.apiKey ?? process.env.HH_API_KEY;
  if (!apiKey) {
    console.error('Missing API key: provide --api-key or set the HH_API_KEY environment variable');
    process.exit(1);
  }

  return new Client({
    apiKey,
    ...(globalOpts.baseUrl !== undefined && { serverUrl: globalOpts.baseUrl }),
    ...(globalOpts.verbose !== undefined && { verbose: globalOpts.verbose }),
    _internal_provenance: {
      package: '@honeyhive/cli',
      version: CLI_VERSION,
    },
  });
}

export function parseJson(value: unknown): unknown {
  if (typeof value !== 'string') {
    console.error(`Expected a JSON string, got ${typeof value}`);
    process.exit(1);
  }
  try {
    return JSON.parse(value) as unknown;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Invalid JSON: ${message}`);
    process.exit(1);
  }
}

export function parseNumber(value: unknown): number {
  const n = Number(value);
  if (Number.isNaN(n)) {
    console.error(`Expected a number, got '${String(value)}'`);
    process.exit(1);
  }
  return n;
}
