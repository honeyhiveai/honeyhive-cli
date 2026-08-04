// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.
import { Command, Option } from 'commander';
import { assertNoOtherFlags, assertRequiredFields, createControlPlaneClient, handleSchemaIntrospection, parseJson, parseNumber, readRequestFile, } from '../../utils.js';
export function alertsCommand() {
    const cmd = new Command('alerts').description('Alerts commands');
    cmd
        .command('list')
        .description('List alerts')
        .option('--project-id <value>', 'The unique identifier of the project whose alerts are listed (required)')
        .option('--page <value>', '1-indexed page number')
        .option('--limit <value>', 'Number of alerts to return per page')
        .addOption(new Option('--status <value>', 'Only return alerts in this status').choices([
        'ACTIVE',
        'TRIGGERED',
        'PAUSED',
        'RESOLVED',
    ]))
        .addOption(new Option('--sort-by <value>', 'Field to sort results by').choices([
        'created_at',
        'updated_at',
        'name',
        'status',
        'frequency',
        'last_triggered',
    ]))
        .addOption(new Option('--sort-order <value>', 'Sort order').choices(['asc', 'desc']))
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--project-id', 'projectId'],
                ['--page', 'page'],
                ['--limit', 'limit'],
                ['--status', 'status'],
                ['--sort-by', 'sortBy'],
                ['--sort-order', 'sortOrder'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project whose alerts are listed"
    },
    "page": {
      "type": "number",
      "description": "1-indexed page number"
    },
    "limit": {
      "type": "number",
      "description": "Number of alerts to return per page"
    },
    "status": {
      "type": "string",
      "enum": [
        "ACTIVE",
        "TRIGGERED",
        "PAUSED",
        "RESOLVED"
      ],
      "description": "Only return alerts in this status"
    },
    "sort_by": {
      "type": "string",
      "enum": [
        "created_at",
        "updated_at",
        "name",
        "status",
        "frequency",
        "last_triggered"
      ],
      "description": "Field to sort results by"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "Sort order"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'project-id': 'project_id',
                page: 'page',
                limit: 'limit',
                status: 'status',
                'sort-by': 'sort_by',
                'sort-order': 'sort_order',
            };
            if (handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
                ['--filename', 'filename'],
                ...FIELD_FLAG_PAIRS,
            ])) {
                return;
            }
            const client = createControlPlaneClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [['--project-id', 'projectId']]);
                request = {
                    project_id: opts.projectId,
                    ...(opts.page !== undefined && { page: parseNumber(opts.page) }),
                    ...(opts.limit !== undefined && { limit: parseNumber(opts.limit) }),
                    ...(opts.status !== undefined && { status: opts.status }),
                    ...(opts.sortBy !== undefined && { sort_by: opts.sortBy }),
                    ...(opts.sortOrder !== undefined && { sort_order: opts.sortOrder }),
                };
            }
            const result = await client.alerts.list(request);
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
        .description('Create an alert')
        .option('--project-id <value>', 'The unique identifier of the project the alert is created in (required)')
        .option('--name <value>', 'name (required)')
        .addOption(new Option('--frequency <value>', 'frequency (required)').choices([
        'HOURLY',
        'DAILY',
        'WEEKLY',
        'MONTHLY',
    ]))
        .option('--thresholds <json>', 'thresholds (required)')
        .option('--filters <json>', 'filters (required)')
        .option('--projections <json>', 'projections (required)')
        .option('--notification-details <json>', 'notification_details (required)')
        .option('--description <value>', 'description')
        .option('--minimum-sample-size <value>', 'minimum_sample_size')
        .addOption(new Option('--alert-type <value>', 'alert_type').choices(['DRIFT', 'AGGREGATE', 'PER_EVENT']))
        .addOption(new Option('--aggregation <value>', 'aggregation').choices([
        'AVERAGE',
        'COUNT',
        'SUM',
        'MIN',
        'MAX',
        'P90',
        'P95',
        'P99',
        'MEDIAN',
    ]))
        .addOption(new Option('--status <value>', 'status').choices([
        'ACTIVE',
        'TRIGGERED',
        'PAUSED',
        'RESOLVED',
    ]))
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--project-id', 'projectId'],
                ['--name', 'name'],
                ['--description', 'description'],
                ['--frequency', 'frequency'],
                ['--minimum-sample-size', 'minimumSampleSize'],
                ['--alert-type', 'alertType'],
                ['--aggregation', 'aggregation'],
                ['--thresholds', 'thresholds'],
                ['--filters', 'filters'],
                ['--projections', 'projections'],
                ['--notification-details', 'notificationDetails'],
                ['--status', 'status'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project the alert is created in"
    },
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "frequency": {
      "type": "string",
      "enum": [
        "HOURLY",
        "DAILY",
        "WEEKLY",
        "MONTHLY"
      ]
    },
    "minimum_sample_size": {
      "type": "number",
      "default": 0
    },
    "alert_type": {
      "type": "string",
      "enum": [
        "DRIFT",
        "AGGREGATE",
        "PER_EVENT"
      ],
      "default": "AGGREGATE"
    },
    "aggregation": {
      "type": "string",
      "enum": [
        "AVERAGE",
        "COUNT",
        "SUM",
        "MIN",
        "MAX",
        "P90",
        "P95",
        "P99",
        "MEDIAN"
      ],
      "default": "AVERAGE"
    },
    "thresholds": {
      "type": "object",
      "properties": {
        "critical": {
          "type": "object",
          "properties": {
            "operator": {
              "type": "string",
              "enum": [
                "greater_than",
                "less_than",
                "equal_to"
              ]
            },
            "value": {
              "type": "number"
            }
          },
          "required": [
            "operator",
            "value"
          ],
          "additionalProperties": false
        },
        "resolved": {
          "type": "object",
          "properties": {
            "operator": {
              "type": "string",
              "enum": [
                "greater_than",
                "less_than",
                "equal_to"
              ]
            },
            "value": {
              "type": "number"
            }
          },
          "required": [
            "operator",
            "value"
          ],
          "additionalProperties": false
        }
      },
      "required": [
        "critical",
        "resolved"
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
          "value",
          "type"
        ],
        "additionalProperties": false
      }
    },
    "projections": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "notification_details": {
      "type": "object",
      "properties": {
        "critical": {
          "type": "object",
          "properties": {
            "channel": {
              "type": "string",
              "enum": [
                "EMAIL",
                "SLACK",
                "WEBHOOK"
              ]
            },
            "scope": {
              "type": "string",
              "enum": [
                "ALL_PROJECT_MEMBERS",
                "SPECIFIC_MEMBER"
              ]
            },
            "user_ids": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "metadata": {
              "type": "object",
              "additionalProperties": {}
            }
          },
          "required": [
            "channel",
            "scope",
            "metadata"
          ],
          "additionalProperties": false
        },
        "resolved": {
          "type": "object",
          "properties": {
            "channel": {
              "type": "string",
              "enum": [
                "EMAIL",
                "SLACK",
                "WEBHOOK"
              ]
            },
            "scope": {
              "type": "string",
              "enum": [
                "ALL_PROJECT_MEMBERS",
                "SPECIFIC_MEMBER"
              ]
            },
            "user_ids": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "metadata": {
              "type": "object",
              "additionalProperties": {}
            }
          },
          "required": [
            "channel",
            "scope",
            "metadata"
          ],
          "additionalProperties": false
        }
      },
      "required": [
        "critical",
        "resolved"
      ],
      "additionalProperties": false
    },
    "status": {
      "type": "string",
      "enum": [
        "ACTIVE",
        "TRIGGERED",
        "PAUSED",
        "RESOLVED"
      ]
    }
  },
  "required": [
    "project_id",
    "name",
    "frequency",
    "thresholds",
    "filters",
    "projections",
    "notification_details"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'project-id': 'project_id',
                name: 'name',
                description: 'description',
                frequency: 'frequency',
                'minimum-sample-size': 'minimum_sample_size',
                'alert-type': 'alert_type',
                aggregation: 'aggregation',
                thresholds: 'thresholds',
                filters: 'filters',
                projections: 'projections',
                'notification-details': 'notification_details',
                status: 'status',
            };
            if (handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
                ['--filename', 'filename'],
                ...FIELD_FLAG_PAIRS,
            ])) {
                return;
            }
            const client = createControlPlaneClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [
                    ['--project-id', 'projectId'],
                    ['--name', 'name'],
                    ['--frequency', 'frequency'],
                    ['--thresholds', 'thresholds'],
                    ['--filters', 'filters'],
                    ['--projections', 'projections'],
                    ['--notification-details', 'notificationDetails'],
                ]);
                request = {
                    project_id: opts.projectId,
                    name: opts.name,
                    ...(opts.description !== undefined && { description: opts.description }),
                    frequency: opts.frequency,
                    ...(opts.minimumSampleSize !== undefined && {
                        minimum_sample_size: parseNumber(opts.minimumSampleSize),
                    }),
                    ...(opts.alertType !== undefined && { alert_type: opts.alertType }),
                    ...(opts.aggregation !== undefined && { aggregation: opts.aggregation }),
                    thresholds: parseJson(opts.thresholds),
                    filters: parseJson(opts.filters),
                    projections: parseJson(opts.projections),
                    notification_details: parseJson(opts.notificationDetails),
                    ...(opts.status !== undefined && { status: opts.status }),
                };
            }
            const result = await client.alerts.create(request);
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
        .description('Get an alert')
        .option('--project-id <value>', 'The unique identifier of the project the alert belongs to (required)')
        .option('--alert-id <value>', 'The unique identifier of the alert to retrieve (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--project-id', 'projectId'],
                ['--alert-id', 'alertId'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "The unique identifier of the project the alert belongs to"
    },
    "alert_id": {
      "type": "string",
      "description": "The unique identifier of the alert to retrieve"
    }
  },
  "required": [
    "project_id",
    "alert_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'project-id': 'project_id',
                'alert-id': 'alert_id',
            };
            if (handleSchemaIntrospection(opts, FILE_SCHEMA_JSON, KEBAB_TO_SPEC, [
                ['--filename', 'filename'],
                ...FIELD_FLAG_PAIRS,
            ])) {
                return;
            }
            const client = createControlPlaneClient(command);
            let request;
            if (opts.filename !== undefined) {
                assertNoOtherFlags(opts, FIELD_FLAG_PAIRS, '--filename');
                request = readRequestFile(opts.filename);
            }
            else {
                assertRequiredFields(opts, [
                    ['--project-id', 'projectId'],
                    ['--alert-id', 'alertId'],
                ]);
                request = {
                    project_id: opts.projectId,
                    alert_id: opts.alertId,
                };
            }
            const result = await client.alerts.get(request);
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
//# sourceMappingURL=alerts.js.map