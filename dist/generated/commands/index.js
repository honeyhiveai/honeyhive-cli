// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.
import { chartsCommand } from './charts.js';
import { datapointsCommand } from './datapoints.js';
import { datasetsCommand } from './datasets.js';
import { eventsCommand } from './events.js';
import { experimentsCommand } from './experiments.js';
import { metricVersionsCommand } from './metric-versions.js';
import { metricsCommand } from './metrics.js';
import { sessionsCommand } from './sessions.js';
export function registerCommands(program) {
    program.addCommand(sessionsCommand());
    program.addCommand(eventsCommand());
    program.addCommand(chartsCommand());
    program.addCommand(metricsCommand());
    program.addCommand(metricVersionsCommand());
    program.addCommand(datapointsCommand());
    program.addCommand(datasetsCommand());
    program.addCommand(experimentsCommand());
}
//# sourceMappingURL=index.js.map