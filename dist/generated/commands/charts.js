// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.
import { Command, Option } from 'commander';
import { assertNoOtherFlags, assertRequiredFields, createClient, handleSchemaIntrospection, parseJson, readRequestFile, } from '../../utils.js';
export function chartsCommand() {
    const cmd = new Command('charts').description('Charts commands');
    cmd
        .command('list')
        .description('List charts')
        .action(async (_opts, command) => {
        try {
            const client = createClient(command);
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
        .option('--name <value>', 'name (required)')
        .option('--metric <value>', 'metric (required)')
        .option('--description <value>', 'description')
        .option('--func <value>', 'func')
        .option('--group-by <value>', 'groupBy')
        .addOption(new Option('--bucketing <value>', 'bucketing').choices([
        'minute',
        'hour',
        'day',
        'week',
        'month',
    ]))
        .option('--date-range <json>', 'dateRange')
        .option('--query <json>', 'query')
        .option('--owner-id <value>', 'owner_id')
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
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "metric": {
      "type": "string"
    },
    "func": {
      "type": "string"
    },
    "groupBy": {
      "type": [
        "string",
        "null"
      ]
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
      ]
    },
    "query": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string"
          },
          "value": {
            "type": [
              "string",
              "null"
            ]
          },
          "type": {
            "type": "string"
          },
          "operator": {
            "type": "string"
          }
        },
        "required": [
          "field",
          "value",
          "type",
          "operator"
        ],
        "additionalProperties": false
      }
    },
    "owner_id": {
      "type": "string"
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
            const client = createClient(command);
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
            const client = createClient(command);
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
        .option('--name <value>', 'name')
        .option('--description <value>', 'description')
        .option('--metric <value>', 'metric')
        .option('--func <value>', 'func')
        .option('--group-by <value>', 'groupBy')
        .addOption(new Option('--bucketing <value>', 'bucketing').choices([
        'minute',
        'hour',
        'day',
        'week',
        'month',
    ]))
        .option('--date-range <json>', 'dateRange')
        .option('--query <json>', 'query')
        .option('--owner-id <value>', 'owner_id')
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
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "metric": {
      "type": "string"
    },
    "func": {
      "type": "string"
    },
    "groupBy": {
      "type": [
        "string",
        "null"
      ]
    },
    "bucketing": {
      "type": "string",
      "enum": [
        "minute",
        "hour",
        "day",
        "week",
        "month"
      ]
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
      ]
    },
    "query": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string"
          },
          "value": {
            "type": [
              "string",
              "null"
            ]
          },
          "type": {
            "type": "string"
          },
          "operator": {
            "type": "string"
          }
        },
        "required": [
          "field",
          "value",
          "type",
          "operator"
        ],
        "additionalProperties": false
      }
    },
    "owner_id": {
      "type": "string"
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
            const client = createClient(command);
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
            const client = createClient(command);
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