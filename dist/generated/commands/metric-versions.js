// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.
import { Command } from 'commander';
import { assertNoOtherFlags, assertRequiredFields, createClient, handleSchemaIntrospection, parseJson, readRequestFile, } from '../../utils.js';
export function metricVersionsCommand() {
    const cmd = new Command('metric-versions').description('Metric Versions commands');
    cmd
        .command('list')
        .description('List versions for a metric')
        .option('--metric-id <value>', 'The unique identifier of the metric whose versions are being listed (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [['--metric-id', 'metricId']];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "metric_id": {
      "type": "string",
      "description": "The unique identifier of the metric whose versions are being listed"
    }
  },
  "required": [
    "metric_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'metric-id': 'metric_id',
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
                assertRequiredFields(opts, [['--metric-id', 'metricId']]);
                request = {
                    metric_id: opts.metricId,
                };
            }
            const result = await client.metricVersions.list(request);
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
        .description('Create a new metric version')
        .option('--metric-id <value>', 'The unique identifier of the metric to version (required)')
        .option('--message <value>', 'message (required)')
        .option('--content <json>', 'Metric definition snapshot accepted by POST /v1/metrics/{metric_id}/versions.\nSix fields are optional and fall back to server-side defaults when omitted:\n- `description` → `""`\n- `return_type` → `"float"`\n- `enabled_in_prod` → `true` for HUMAN metrics, `false` otherwise\n- `needs_ground_truth` → `false`\n- `sampling_percentage` → `10`\n- `filters` → `{ "filterArray": [] }` (required)')
        .option('--deploy-immediately', 'deploy_immediately')
        .option('--no-deploy-immediately', 'deploy_immediately')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--metric-id', 'metricId'],
                ['--message', 'message'],
                ['--content', 'content'],
                ['--deploy-immediately', 'deployImmediately'],
                ['--no-deploy-immediately', 'deployImmediately'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "metric_id": {
      "type": "string",
      "description": "The unique identifier of the metric to version"
    },
    "message": {
      "type": "string"
    },
    "content": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "type": {
          "type": "string",
          "enum": [
            "PYTHON",
            "LLM",
            "HUMAN",
            "COMPOSITE"
          ]
        },
        "criteria": {
          "type": "string"
        },
        "description": {
          "type": "string",
          "description": "Free-form description of the metric. Defaults to an empty string.",
          "default": true
        },
        "return_type": {
          "type": "string",
          "enum": [
            "float",
            "boolean",
            "string",
            "categorical"
          ],
          "description": "Return type of the metric. Defaults to \`float\`.",
          "default": "float"
        },
        "enabled_in_prod": {
          "type": "boolean",
          "description": "Whether this version should run against production traffic. Defaults to \`false\` for non-HUMAN metrics and \`true\` for HUMAN metrics.",
          "default": false
        },
        "needs_ground_truth": {
          "type": "boolean",
          "description": "Whether this metric requires ground-truth labels to evaluate. Defaults to \`false\`.",
          "default": false
        },
        "sampling_percentage": {
          "type": "number",
          "description": "Percentage of events the metric should run against, 0–100. Defaults to \`10\`.",
          "default": 10
        },
        "model_provider": {
          "type": [
            "string",
            "null"
          ]
        },
        "model_name": {
          "type": [
            "string",
            "null"
          ]
        },
        "scale": {
          "type": [
            "number",
            "null"
          ]
        },
        "threshold": {
          "anyOf": [
            {
              "type": "object",
              "properties": {
                "min": {
                  "type": "number"
                },
                "max": {
                  "type": "number"
                },
                "pass_when": {
                  "type": [
                    "boolean",
                    "number"
                  ]
                },
                "passing_categories": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              },
              "additionalProperties": false
            },
            {
              "type": "null"
            }
          ]
        },
        "categories": {
          "anyOf": [
            {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "category": {
                    "type": "string"
                  },
                  "score": {
                    "type": [
                      "number",
                      "null"
                    ]
                  }
                },
                "required": [
                  "category",
                  "score"
                ],
                "additionalProperties": false
              }
            },
            {
              "type": "null"
            }
          ]
        },
        "child_metrics": {
          "anyOf": [
            {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  },
                  "weight": {
                    "type": "number"
                  },
                  "scale": {
                    "type": [
                      "number",
                      "null"
                    ]
                  }
                },
                "required": [
                  "name",
                  "weight"
                ],
                "additionalProperties": false
              }
            },
            {
              "type": "null"
            }
          ]
        },
        "filters": {
          "type": "object",
          "properties": {
            "filterArray": {
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
            }
          },
          "required": [
            "filterArray"
          ],
          "additionalProperties": false,
          "description": "ETL filter narrowing which events this metric applies to. Defaults to \`{ filterArray: [] }\` (no filtering).",
          "default": {
            "filterArray": []
          }
        }
      },
      "required": [
        "name",
        "type",
        "criteria"
      ],
      "additionalProperties": false,
      "description": "Metric definition snapshot accepted by POST /v1/metrics/{metric_id}/versions.\\nSix fields are optional and fall back to server-side defaults when omitted:\\n- \`description\` → \`\\"\\"\`\\n- \`return_type\` → \`\\"float\\"\`\\n- \`enabled_in_prod\` → \`true\` for HUMAN metrics, \`false\` otherwise\\n- \`needs_ground_truth\` → \`false\`\\n- \`sampling_percentage\` → \`10\`\\n- \`filters\` → \`{ \\"filterArray\\": [] }\`"
    },
    "deploy_immediately": {
      "type": "boolean"
    }
  },
  "required": [
    "metric_id",
    "message",
    "content"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'metric-id': 'metric_id',
                message: 'message',
                content: 'content',
                'deploy-immediately': 'deploy_immediately',
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
                    ['--metric-id', 'metricId'],
                    ['--message', 'message'],
                    ['--content', 'content'],
                ]);
                request = {
                    metric_id: opts.metricId,
                    message: opts.message,
                    content: parseJson(opts.content),
                    ...(opts.deployImmediately !== undefined && {
                        deploy_immediately: opts.deployImmediately,
                    }),
                };
            }
            const result = await client.metricVersions.create(request);
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
        .command('deploy')
        .description('Deploy a specific metric version')
        .option('--metric-id <value>', 'The unique identifier of the metric (required)')
        .option('--version-name <value>', 'The name of the version to deploy (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--metric-id', 'metricId'],
                ['--version-name', 'versionName'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "metric_id": {
      "type": "string",
      "description": "The unique identifier of the metric"
    },
    "version_name": {
      "type": "string",
      "description": "The name of the version to deploy"
    }
  },
  "required": [
    "metric_id",
    "version_name"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'metric-id': 'metric_id',
                'version-name': 'version_name',
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
                    ['--metric-id', 'metricId'],
                    ['--version-name', 'versionName'],
                ]);
                request = {
                    metric_id: opts.metricId,
                    version_name: opts.versionName,
                };
            }
            const result = await client.metricVersions.deploy(request);
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
//# sourceMappingURL=metric-versions.js.map