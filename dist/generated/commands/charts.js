// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.
import { Command, Option } from 'commander';
import { assertNoOtherFlags, assertRequiredFields, createDataPlaneClient, handleSchemaIntrospection, parseJson, readRequestFile, } from '../../utils.js';
export function chartsCommand() {
    const cmd = new Command('charts').description('Charts commands');
    cmd
        .command('list')
        .description('List charts')
        .option('--project-id <value>', 'The unique identifier of the project whose charts are listed. Omitting it is deprecated, and it becomes required in the next major version. Pass it with a data plane API key.')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [['--project-id', 'projectId']];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project whose charts are listed. Omitting it is deprecated, and it becomes required in the next major version. Pass it with a data plane API key."
    }
  },
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'project-id': 'project_id',
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
            request = {
                ...(opts.projectId !== undefined && { project_id: opts.projectId }),
            };
        }
        const result = await client.charts.list(request, {});
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('create')
        .description('Create a new chart')
        .option('--name <value>', 'Display name for the chart (required)')
        .option('--metric <value>', 'Name of the metric to visualize (required)')
        .option('--project-id <value>', 'The unique identifier of the project the chart is created in. Omitting it is deprecated, and it becomes required in the next major version. Pass it with a data plane API key.')
        .option('--description <value>', 'Description of what the chart shows')
        .option('--func <value>', 'Aggregation function to apply (e.g. sum, avg, median, min, max)')
        .option('--group-by <value>', 'Field to group results by')
        .addOption(new Option('--bucketing <value>', 'Time bucket granularity for aggregation').choices([
        'minute',
        'five_minute',
        'hour',
        'day',
        'week',
        'month',
        'auto',
    ]))
        .option('--date-range <json>', 'Time range to query')
        .option('--query <json>', 'Filters to apply to the chart data')
        .option('--owner-id <value>', 'ID of the user who owns this chart')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
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
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project the chart is created in. Omitting it is deprecated, and it becomes required in the next major version. Pass it with a data plane API key."
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
        "five_minute",
        "hour",
        "day",
        "week",
        "month",
        "auto"
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
            'project-id': 'project_id',
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
                ...(opts.projectId !== undefined && { project_id: opts.projectId }),
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
        const result = await client.charts.create(request, {});
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('get')
        .description('Get a chart')
        .option('--chart-id <value>', 'The unique identifier of the chart to retrieve (required)')
        .option('--project-id <value>', 'The unique identifier of the project that owns the chart. Omitting it is deprecated, and it becomes required in the next major version. Pass it with a data plane API key.')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
            ['--chart-id', 'chartId'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project that owns the chart. Omitting it is deprecated, and it becomes required in the next major version. Pass it with a data plane API key."
    },
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
            'project-id': 'project_id',
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
                ...(opts.projectId !== undefined && { project_id: opts.projectId }),
                chart_id: opts.chartId,
            };
        }
        const result = await client.charts.get(request, {});
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('update')
        .description('Update a chart')
        .option('--chart-id <value>', 'The unique identifier of the chart to update (required)')
        .option('--project-id <value>', 'The unique identifier of the project that owns the chart. Omitting it is deprecated, and it becomes required in the next major version. Pass it with a data plane API key.')
        .option('--name <value>', 'Display name for the chart')
        .option('--description <value>', 'Description of what the chart shows')
        .option('--metric <value>', 'Name of the metric to visualize')
        .option('--func <value>', 'Aggregation function to apply (e.g. sum, avg, median, min, max)')
        .option('--group-by <value>', 'Field to group results by')
        .addOption(new Option('--bucketing <value>', 'Time bucket granularity for aggregation').choices([
        'minute',
        'five_minute',
        'hour',
        'day',
        'week',
        'month',
        'auto',
    ]))
        .option('--date-range <json>', 'Time range to query')
        .option('--query <json>', 'Filters to apply to the chart data')
        .option('--owner-id <value>', 'ID of the user who owns this chart')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
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
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project that owns the chart. Omitting it is deprecated, and it becomes required in the next major version. Pass it with a data plane API key."
    },
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
        "five_minute",
        "hour",
        "day",
        "week",
        "month",
        "auto"
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
            'project-id': 'project_id',
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
                ...(opts.projectId !== undefined && { project_id: opts.projectId }),
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
        const result = await client.charts.update(request, {});
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('delete')
        .description('Delete a chart')
        .option('--chart-id <value>', 'The unique identifier of the chart to delete (required)')
        .option('--project-id <value>', 'The unique identifier of the project that owns the chart. Omitting it is deprecated, and it becomes required in the next major version. Pass it with a data plane API key.')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
            ['--chart-id', 'chartId'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project that owns the chart. Omitting it is deprecated, and it becomes required in the next major version. Pass it with a data plane API key."
    },
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
            'project-id': 'project_id',
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
                ...(opts.projectId !== undefined && { project_id: opts.projectId }),
                chart_id: opts.chartId,
            };
        }
        const result = await client.charts.delete(request, {});
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('query')
        .description('Run a chart query')
        .option('--project-id <value>', 'The unique identifier of the project whose events are queried (required)')
        .option('--date-range <json>', 'date_range (required)')
        .option('--query <json>', 'query (required)')
        .option('--filters <json>', 'Implicit AND; default none')
        .option('--product-filters <json>', 'product_filters')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
            ['--date-range', 'dateRange'],
            ['--filters', 'filters'],
            ['--product-filters', 'productFilters'],
            ['--query', 'query'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project whose events are queried"
    },
    "date_range": {
      "type": "object",
      "properties": {
        "start_time": {
          "type": "string",
          "description": "RFC 3339 start of the range (inclusive); Z or explicit offset"
        },
        "end_time": {
          "type": "string",
          "description": "RFC 3339 end of the range (exclusive); Z or explicit offset"
        },
        "timezone": {
          "type": "string",
          "description": "IANA timezone name; defaults to UTC. Affects bucket alignment only."
        }
      },
      "required": [
        "start_time",
        "end_time"
      ],
      "additionalProperties": false
    },
    "filters": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string"
          },
          "operator": {
            "type": "string",
            "enum": [
              "exists",
              "not exists",
              "is",
              "is not",
              "contains",
              "not contains",
              "greater than",
              "less than",
              "after",
              "before"
            ]
          },
          "value": {
            "type": [
              "string",
              "number",
              "boolean",
              "null"
            ]
          },
          "type": {
            "type": "string",
            "enum": [
              "string",
              "number",
              "boolean",
              "datetime"
            ]
          }
        },
        "required": [
          "field",
          "operator",
          "value"
        ],
        "additionalProperties": false
      },
      "description": "Implicit AND; default none"
    },
    "product_filters": {
      "type": "object",
      "properties": {
        "experiment_run_id": {
          "type": "string",
          "description": "Restrict to one experiment run"
        },
        "only_experiments": {
          "type": "boolean",
          "description": "Restrict to events belonging to any experiment run"
        }
      },
      "additionalProperties": false
    },
    "query": {
      "anyOf": [
        {
          "type": "object",
          "properties": {
            "kind": {
              "type": "string",
              "const": "time_series",
              "description": "discriminator enum property added by openapi-typescript"
            },
            "bucket": {
              "type": "object",
              "properties": {
                "interval": {
                  "type": "string",
                  "enum": [
                    "auto",
                    "1m",
                    "5m",
                    "1h",
                    "1d",
                    "1w",
                    "1M"
                  ],
                  "description": "Bucket width; default auto"
                },
                "max_points": {
                  "type": "number",
                  "description": "Ceiling on bucket count when interval is auto; widens the resolved interval, never narrows it. Default 200, max 1000"
                }
              },
              "additionalProperties": false
            },
            "split_by": {
              "type": "string",
              "description": "Groupable field; one series per value"
            },
            "measures": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "Response handle for this measure; defaults to the metric name"
                  },
                  "metric": {
                    "type": "string",
                    "description": "Field name or intrinsic metric id"
                  },
                  "aggregation": {
                    "type": "string",
                    "enum": [
                      "count",
                      "avg",
                      "sum",
                      "min",
                      "max",
                      "median",
                      "p50",
                      "p75",
                      "p90",
                      "p95",
                      "p99",
                      "percentage_true",
                      "percentage_false",
                      "percentage_null"
                    ],
                    "description": "Omit for a registry default; must be omitted for intrinsic metrics"
                  }
                },
                "required": [
                  "metric"
                ],
                "additionalProperties": false
              },
              "description": "Display-ordered measures, same unit; exactly one when split_by is set"
            },
            "split_ranking": {
              "type": "object",
              "properties": {
                "limit": {
                  "type": "number",
                  "description": "Cap on ranked items; default 10, at most 50"
                },
                "direction": {
                  "type": "string",
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "description": "Rank order; default desc"
                },
                "include_other": {
                  "type": "boolean",
                  "description": "Roll everything below the cap into an \\"Other\\" item; additive measures only"
                }
              },
              "additionalProperties": false,
              "description": "Caps the split_by dimension"
            }
          },
          "required": [
            "kind",
            "measures"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "kind": {
              "type": "string",
              "const": "categorical",
              "description": "discriminator enum property added by openapi-typescript"
            },
            "group_by": {
              "type": "string",
              "description": "Groupable field forming the axis"
            },
            "split_by": {
              "type": "string",
              "description": "Groupable field forming stacks/groups"
            },
            "measures": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "Response handle for this measure; defaults to the metric name"
                  },
                  "metric": {
                    "type": "string",
                    "description": "Field name or intrinsic metric id"
                  },
                  "aggregation": {
                    "type": "string",
                    "enum": [
                      "count",
                      "avg",
                      "sum",
                      "min",
                      "max",
                      "median",
                      "p50",
                      "p75",
                      "p90",
                      "p95",
                      "p99",
                      "percentage_true",
                      "percentage_false",
                      "percentage_null"
                    ],
                    "description": "Omit for a registry default; must be omitted for intrinsic metrics"
                  }
                },
                "required": [
                  "metric"
                ],
                "additionalProperties": false
              },
              "description": "Display-ordered measures, same unit; exactly one when split_by is set"
            },
            "ranking": {
              "type": "object",
              "properties": {
                "limit": {
                  "type": "number",
                  "description": "Cap on ranked items; default 10, at most 50"
                },
                "direction": {
                  "type": "string",
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "description": "Rank order; default desc"
                },
                "include_other": {
                  "type": "boolean",
                  "description": "Roll everything below the cap into an \\"Other\\" item; additive measures only"
                }
              },
              "additionalProperties": false,
              "description": "Caps the split_by dimension"
            },
            "split_ranking": {
              "type": "object",
              "properties": {
                "limit": {
                  "type": "number",
                  "description": "Cap on ranked items; default 10, at most 50"
                },
                "direction": {
                  "type": "string",
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "description": "Rank order; default desc"
                },
                "include_other": {
                  "type": "boolean",
                  "description": "Roll everything below the cap into an \\"Other\\" item; additive measures only"
                }
              },
              "additionalProperties": false,
              "description": "Caps the split_by dimension"
            }
          },
          "required": [
            "kind",
            "group_by",
            "measures"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "kind": {
              "type": "string",
              "const": "scalar",
              "description": "discriminator enum property added by openapi-typescript"
            },
            "measure": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Response handle for this measure; defaults to the metric name"
                },
                "metric": {
                  "type": "string",
                  "description": "Field name or intrinsic metric id"
                },
                "aggregation": {
                  "type": "string",
                  "enum": [
                    "count",
                    "avg",
                    "sum",
                    "min",
                    "max",
                    "median",
                    "p50",
                    "p75",
                    "p90",
                    "p95",
                    "p99",
                    "percentage_true",
                    "percentage_false",
                    "percentage_null"
                  ],
                  "description": "Omit for a registry default; must be omitted for intrinsic metrics"
                }
              },
              "required": [
                "metric"
              ],
              "additionalProperties": false
            },
            "comparison": {
              "type": "object",
              "properties": {
                "mode": {
                  "type": "string",
                  "enum": [
                    "previous_period",
                    "none"
                  ]
                }
              },
              "required": [
                "mode"
              ],
              "additionalProperties": false,
              "description": "Delta baseline; default none"
            },
            "sparkline": {
              "type": "object",
              "properties": {
                "interval": {
                  "type": "string",
                  "const": "auto"
                },
                "max_points": {
                  "type": "number",
                  "description": "Default 50; sparklines are small"
                }
              },
              "additionalProperties": false,
              "description": "Omit for no sparkline — it is a second query, so it is opt-in"
            }
          },
          "required": [
            "kind",
            "measure"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "kind": {
              "type": "string",
              "const": "histogram",
              "description": "discriminator enum property added by openapi-typescript"
            },
            "metric": {
              "type": "string",
              "description": "Numeric field name; no aggregation"
            },
            "bins": {
              "type": "object",
              "properties": {
                "mode": {
                  "type": "string",
                  "const": "count"
                },
                "count": {
                  "type": "number",
                  "description": "Default 20, at most 200"
                },
                "min": {
                  "type": "number",
                  "description": "Lower edge; discovered from the data when omitted"
                },
                "max": {
                  "type": "number",
                  "description": "Upper edge; the p99 of the data when omitted, so one outlier cannot flatten the chart"
                }
              },
              "required": [
                "mode"
              ],
              "additionalProperties": false
            },
            "markers": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "p50",
                  "p75",
                  "p90",
                  "p95",
                  "p99"
                ]
              },
              "description": "Percentile lines to compute on the same scan; default none"
            }
          },
          "required": [
            "kind",
            "metric"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "kind": {
              "type": "string",
              "const": "table",
              "description": "discriminator enum property added by openapi-typescript"
            },
            "group_by": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Groupable fields forming row identity"
            },
            "measures": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "Response handle for this measure; defaults to the metric name"
                  },
                  "metric": {
                    "type": "string",
                    "description": "Field name or intrinsic metric id"
                  },
                  "aggregation": {
                    "type": "string",
                    "enum": [
                      "count",
                      "avg",
                      "sum",
                      "min",
                      "max",
                      "median",
                      "p50",
                      "p75",
                      "p90",
                      "p95",
                      "p99",
                      "percentage_true",
                      "percentage_false",
                      "percentage_null"
                    ],
                    "description": "Omit for a registry default; must be omitted for intrinsic metrics"
                  }
                },
                "required": [
                  "metric"
                ],
                "additionalProperties": false
              },
              "description": "Columns, in display order; units may differ"
            },
            "order_by": {
              "type": "object",
              "properties": {
                "field": {
                  "type": "string",
                  "description": "A measure id or a group field; a measure wins if a name is both"
                },
                "direction": {
                  "type": "string",
                  "enum": [
                    "asc",
                    "desc"
                  ]
                }
              },
              "required": [
                "field"
              ],
              "additionalProperties": false,
              "description": "Default: first measure, descending"
            },
            "limit": {
              "type": "number",
              "description": "Default 50, at most 100"
            }
          },
          "required": [
            "kind",
            "group_by",
            "measures"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "kind": {
              "type": "string",
              "const": "scatter",
              "description": "discriminator enum property added by openapi-typescript"
            },
            "group_by": {
              "type": "string",
              "description": "One groupable field forming point identity"
            },
            "x": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Response handle for this measure; defaults to the metric name"
                },
                "metric": {
                  "type": "string",
                  "description": "Field name or intrinsic metric id"
                },
                "aggregation": {
                  "type": "string",
                  "enum": [
                    "count",
                    "avg",
                    "sum",
                    "min",
                    "max",
                    "median",
                    "p50",
                    "p75",
                    "p90",
                    "p95",
                    "p99",
                    "percentage_true",
                    "percentage_false",
                    "percentage_null"
                  ],
                  "description": "Omit for a registry default; must be omitted for intrinsic metrics"
                }
              },
              "required": [
                "metric"
              ],
              "additionalProperties": false
            },
            "y": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Response handle for this measure; defaults to the metric name"
                },
                "metric": {
                  "type": "string",
                  "description": "Field name or intrinsic metric id"
                },
                "aggregation": {
                  "type": "string",
                  "enum": [
                    "count",
                    "avg",
                    "sum",
                    "min",
                    "max",
                    "median",
                    "p50",
                    "p75",
                    "p90",
                    "p95",
                    "p99",
                    "percentage_true",
                    "percentage_false",
                    "percentage_null"
                  ],
                  "description": "Omit for a registry default; must be omitted for intrinsic metrics"
                }
              },
              "required": [
                "metric"
              ],
              "additionalProperties": false
            },
            "limit": {
              "type": "number",
              "description": "Default 100, clamped to 500"
            }
          },
          "required": [
            "kind",
            "group_by",
            "x",
            "y"
          ],
          "additionalProperties": false
        }
      ]
    }
  },
  "required": [
    "project_id",
    "date_range",
    "query"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'project-id': 'project_id',
            'date-range': 'date_range',
            filters: 'filters',
            'product-filters': 'product_filters',
            query: 'query',
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
                ['--project-id', 'projectId'],
                ['--date-range', 'dateRange'],
                ['--query', 'query'],
            ]);
            request = {
                project_id: opts.projectId,
                date_range: parseJson(opts.dateRange),
                ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
                ...(opts.productFilters !== undefined && {
                    product_filters: parseJson(opts.productFilters),
                }),
                query: parseJson(opts.query),
            };
        }
        const result = await client.charts.query(request);
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
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