// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.

import { type Command } from 'commander';

import { datapointsCommand } from './datapoints.js';
import { datasetsCommand } from './datasets.js';
import { eventsCommand } from './events.js';
import { experimentsCommand } from './experiments.js';
import { metricsCommand } from './metrics.js';
import { queuesCommand } from './queues.js';
import { sessionsCommand } from './sessions.js';

export function registerCommands(program: Command): void {
  program.addCommand(sessionsCommand());
  program.addCommand(eventsCommand());
  program.addCommand(metricsCommand());
  program.addCommand(datapointsCommand());
  program.addCommand(datasetsCommand());
  program.addCommand(experimentsCommand());
  program.addCommand(queuesCommand());
}
