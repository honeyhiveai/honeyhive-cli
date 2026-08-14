// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.

import { type Command } from 'commander';

import { alertsCommand } from './alerts.js';
import { chartsCommand } from './charts.js';
import { datapointsCommand } from './datapoints.js';
import { datasetsCommand } from './datasets.js';
import { eventsCommand } from './events.js';
import { experimentsCommand } from './experiments.js';
import { metricVersionsCommand } from './metric-versions.js';
import { metricsCommand } from './metrics.js';
import { projectsCommand } from './projects.js';
import { sessionsCommand } from './sessions.js';
import { virtualDataplanesCommand } from './virtual-dataplanes.js';
import { workspacesCommand } from './workspaces.js';

export function registerCommands(program: Command): void {
  program.addCommand(sessionsCommand());
  program.addCommand(eventsCommand());
  program.addCommand(chartsCommand());
  program.addCommand(metricsCommand());
  program.addCommand(metricVersionsCommand());
  program.addCommand(datapointsCommand());
  program.addCommand(datasetsCommand());
  program.addCommand(experimentsCommand());
  program.addCommand(alertsCommand());
  program.addCommand(workspacesCommand());
  program.addCommand(projectsCommand());
  program.addCommand(virtualDataplanesCommand());
}
