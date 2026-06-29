// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.
import { Command, Option } from 'commander';
import { assertNoOtherFlags, assertRequiredFields, createDataPlaneClient, handleSchemaIntrospection, parseJson, readRequestFile, } from '../../utils.js';
export function chartsCommand() {
    const cmd = new Command('charts').description('Charts commands');
    cmd
        .command('list')
        .description('List charts')
        .action(async (_opts, command) => {
        try {
            const client = createDataPlaneClient(command);
            const result = await client.charts.list();
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
        .command('create')
        .description('Create a new chart')
        .option('--name <value>', 'Display name for the chart (required)')
        .option('--metric <value>', 'Name of the metric to visualize (required)')
        .option('--description <value>', 'Description of what the chart shows')
        .option('--func <value>', 'Aggregation function to apply (e.g. sum, avg, median, min, max)')
        .option('--group-by <value>', 'Field to group results by')
        .addOption(new Option('--bucketing <value>', 'Time bucket granularity for aggregation').choices([
        'minute',
        'hour',
        'day',
        'week',
        'month',
    ]))
        .option('--date-range <json>', 'Time range to query')
        .option('--query <json>', 'Filters to apply to the chart data')
        .option('--owner-id <value>', 'ID of the user who owns this chart')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--name', 'name'],
                ['--description', 'description'],
                ['--metric', 'metric'],
                ['--func', 'func'],
                ['--group-by', 'groupBy'],
                ['--bucketing', 'bucketing'],
                ['--date-range', 'dateRange'],
                ['--query', 'query'],
                ['--owner-id', 'ownerId'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Display name for the chart"
    },
    "description": {
      "type": "string",
      "description": "Description of what the chart shows"
    },
    "metric": {
      "type": "string",
      "description": "Name of the metric to visualize"
    },
    "func": {
      "type": "string",
      "description": "Aggregation function to apply (e.g. sum, avg, median, min, max)"
    },
    "groupBy": {
      "type": [
        "string",
        "null"
      ],
      "description": "Field to group results by"
    },
    "bucketing": {
      "type": "string",
      "enum": [
        "minute",
        "hour",
        "day",
        "week",
        "month"
      ],
      "description": "Time bucket granularity for aggregation",
      "default": "day"
    },
    "dateRange": {
      "anyOf": [
        {
          "type": "object",
          "properties": {
            "relative": {
              "type": "string"
            }
          },
          "required": [
            "relative"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "$gte": {
              "type": [
                "string",
                "number"
              ]
            },
            "$lte": {
              "type": [
                "string",
                "number"
              ]
            }
          },
          "required": [
            "$gte",
            "$lte"
          ],
          "additionalProperties": false
        }
      ],
      "description": "Time range to query"
    },
    "query": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string",
            "description": "Name of the field to filter on"
          },
          "value": {
            "type": [
              "string",
              "null"
            ],
            "description": "Value to compare against"
          },
          "type": {
            "type": "string",
            "description": "Data type of the field (e.g. string, number)"
          },
          "operator": {
            "type": "string",
            "description": "Comparison operator (e.g. is, is not, contains, greater than, less than)"
          }
        },
        "required": [
          "field",
          "value",
          "type",
          "operator"
        ],
        "additionalProperties": false
      },
      "description": "Filters to apply to the chart data"
    },
    "owner_id": {
      "type": "string",
      "description": "ID of the user who owns this chart"
    }
  },
  "required": [
    "name",
    "metric"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                name: 'name',
                description: 'description',
                metric: 'metric',
                func: 'func',
                'group-by': 'groupBy',
                bucketing: 'bucketing',
                'date-range': 'dateRange',
                query: 'query',
                'owner-id': 'owner_id',
            };
            if (handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
                ['--filename', 'filename'],
                ...FIELD_FLAG_PAIRS,
            ])) {
                return;
            }
            const client = createDataPlaneClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [
                    ['--name', 'name'],
                    ['--metric', 'metric'],
                ]);
                request = {
                    name: opts.name,
                    ...(opts.description !== undefined && { description: opts.description }),
                    metric: opts.metric,
                    ...(opts.func !== undefined && { func: opts.func }),
                    ...(opts.groupBy !== undefined && { groupBy: opts.groupBy }),
                    ...(opts.bucketing !== undefined && { bucketing: opts.bucketing }),
                    ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
                    ...(opts.query !== undefined && { query: parseJson(opts.query) }),
                    ...(opts.ownerId !== undefined && { owner_id: opts.ownerId }),
                };
            }
            const result = await client.charts.create(request);
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
        .command('get')
        .description('Get a chart')
        .option('--chart-id <value>', 'The unique identifier of the chart to retrieve (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [['--chart-id', 'chartId']];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "chart_id": {
      "type": "string",
      "description": "The unique identifier of the chart to retrieve"
    }
  },
  "required": [
    "chart_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'chart-id': 'chart_id',
            };
            if (handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
                ['--filename', 'filename'],
                ...FIELD_FLAG_PAIRS,
            ])) {
                return;
            }
            const client = createDataPlaneClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [['--chart-id', 'chartId']]);
                request = {
                    chart_id: opts.chartId,
                };
            }
            const result = await client.charts.get(request);
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
        .command('update')
        .description('Update a chart')
        .option('--chart-id <value>', 'The unique identifier of the chart to update (required)')
        .option('--name <value>', 'Display name for the chart')
        .option('--description <value>', 'Description of what the chart shows')
        .option('--metric <value>', 'Name of the metric to visualize')
        .option('--func <value>', 'Aggregation function to apply (e.g. sum, avg, median, min, max)')
        .option('--group-by <value>', 'Field to group results by')
        .addOption(new Option('--bucketing <value>', 'Time bucket granularity for aggregation').choices([
        'minute',
        'hour',
        'day',
        'week',
        'month',
    ]))
        .option('--date-range <json>', 'Time range to query')
        .option('--query <json>', 'Filters to apply to the chart data')
        .option('--owner-id <value>', 'ID of the user who owns this chart')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--chart-id', 'chartId'],
                ['--name', 'name'],
                ['--description', 'description'],
                ['--metric', 'metric'],
                ['--func', 'func'],
                ['--group-by', 'groupBy'],
                ['--bucketing', 'bucketing'],
                ['--date-range', 'dateRange'],
                ['--query', 'query'],
                ['--owner-id', 'ownerId'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "chart_id": {
      "type": "string",
      "description": "The unique identifier of the chart to update"
    },
    "name": {
      "type": "string",
      "description": "Display name for the chart"
    },
    "description": {
      "type": "string",
      "description": "Description of what the chart shows"
    },
    "metric": {
      "type": "string",
      "description": "Name of the metric to visualize"
    },
    "func": {
      "type": "string",
      "description": "Aggregation function to apply (e.g. sum, avg, median, min, max)"
    },
    "groupBy": {
      "type": [
        "string",
        "null"
      ],
      "description": "Field to group results by"
    },
    "bucketing": {
      "type": "string",
      "enum": [
        "minute",
        "hour",
        "day",
        "week",
        "month"
      ],
      "description": "Time bucket granularity for aggregation"
    },
    "dateRange": {
      "anyOf": [
        {
          "type": "object",
          "properties": {
            "relative": {
              "type": "string"
            }
          },
          "required": [
            "relative"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "$gte": {
              "type": [
                "string",
                "number"
              ]
            },
            "$lte": {
              "type": [
                "string",
                "number"
              ]
            }
          },
          "required": [
            "$gte",
            "$lte"
          ],
          "additionalProperties": false
        }
      ],
      "description": "Time range to query"
    },
    "query": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string",
            "description": "Name of the field to filter on"
          },
          "value": {
            "type": [
              "string",
              "null"
            ],
            "description": "Value to compare against"
          },
          "type": {
            "type": "string",
            "description": "Data type of the field (e.g. string, number)"
          },
          "operator": {
            "type": "string",
            "description": "Comparison operator (e.g. is, is not, contains, greater than, less than)"
          }
        },
        "required": [
          "field",
          "value",
          "type",
          "operator"
        ],
        "additionalProperties": false
      },
      "description": "Filters to apply to the chart data"
    },
    "owner_id": {
      "type": "string",
      "description": "ID of the user who owns this chart"
    }
  },
  "required": [
    "chart_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'chart-id': 'chart_id',
                name: 'name',
                description: 'description',
                metric: 'metric',
                func: 'func',
                'group-by': 'groupBy',
                bucketing: 'bucketing',
                'date-range': 'dateRange',
                query: 'query',
                'owner-id': 'owner_id',
            };
            if (handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
                ['--filename', 'filename'],
                ...FIELD_FLAG_PAIRS,
            ])) {
                return;
            }
            const client = createDataPlaneClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [['--chart-id', 'chartId']]);
                request = {
                    chart_id: opts.chartId,
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.description !== undefined && { description: opts.description }),
                    ...(opts.metric !== undefined && { metric: opts.metric }),
                    ...(opts.func !== undefined && { func: opts.func }),
                    ...(opts.groupBy !== undefined && { groupBy: opts.groupBy }),
                    ...(opts.bucketing !== undefined && { bucketing: opts.bucketing }),
                    ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
                    ...(opts.query !== undefined && { query: parseJson(opts.query) }),
                    ...(opts.ownerId !== undefined && { owner_id: opts.ownerId }),
                };
            }
            const result = await client.charts.update(request);
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
        .command('delete')
        .description('Delete a chart')
        .option('--chart-id <value>', 'The unique identifier of the chart to delete (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [['--chart-id', 'chartId']];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "chart_id": {
      "type": "string",
      "description": "The unique identifier of the chart to delete"
    }
  },
  "required": [
    "chart_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'chart-id': 'chart_id',
            };
            if (handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
                ['--filename', 'filename'],
                ...FIELD_FLAG_PAIRS,
            ])) {
                return;
            }
            const client = createDataPlaneClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [['--chart-id', 'chartId']]);
                request = {
                    chart_id: opts.chartId,
                };
            }
            const result = await client.charts.delete(request);
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
//# sourceMappingURL=charts.js.map