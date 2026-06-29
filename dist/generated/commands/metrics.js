// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.
import { Command, Option } from 'commander';
import { assertNoOtherFlags, assertRequiredFields, createDataPlaneClient, handleSchemaIntrospection, parseJson, parseNumber, readRequestFile, } from '../../utils.js';
export function metricsCommand() {
    const cmd = new Command('metrics').description('Metrics commands');
    cmd
        .command('list')
        .description('List all metrics')
        .option('--type <value>', 'Filter by metric type')
        .option('--id <value>', 'Filter by specific metric ID')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--type', 'type'],
                ['--id', 'id'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "description": "Filter by metric type"
    },
    "id": {
      "type": "string",
      "description": "Filter by specific metric ID"
    }
  },
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                type: 'type',
                id: 'id',
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
                    ...(opts.type !== undefined && { type: opts.type }),
                    ...(opts.id !== undefined && { id: opts.id }),
                };
            }
            const result = await client.metrics.list(request);
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
        .description('Create a new metric')
        .option('--name <value>', 'name (required)')
        .addOption(new Option('--type <value>', 'type (required)').choices([
        'PYTHON',
        'LLM',
        'HUMAN',
        'COMPOSITE',
    ]))
        .option('--criteria <value>', 'criteria (required)')
        .option('--description <value>', 'description')
        .addOption(new Option('--return-type <value>', 'return_type').choices([
        'float',
        'boolean',
        'string',
        'categorical',
    ]))
        .option('--enabled-in-prod', 'enabled_in_prod')
        .option('--no-enabled-in-prod', 'enabled_in_prod')
        .option('--needs-ground-truth', 'needs_ground_truth')
        .option('--no-needs-ground-truth', 'needs_ground_truth')
        .option('--sampling-percentage <value>', 'sampling_percentage')
        .option('--model-provider <value>', 'model_provider')
        .option('--model-name <value>', 'model_name')
        .option('--scale <value>', 'scale')
        .option('--threshold <json>', 'threshold')
        .option('--categories <json>', 'categories')
        .option('--child-metrics <json>', 'child_metrics')
        .option('--filters <json>', 'filters')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--name', 'name'],
                ['--type', 'type'],
                ['--criteria', 'criteria'],
                ['--description', 'description'],
                ['--return-type', 'returnType'],
                ['--enabled-in-prod', 'enabledInProd'],
                ['--no-enabled-in-prod', 'enabledInProd'],
                ['--needs-ground-truth', 'needsGroundTruth'],
                ['--no-needs-ground-truth', 'needsGroundTruth'],
                ['--sampling-percentage', 'samplingPercentage'],
                ['--model-provider', 'modelProvider'],
                ['--model-name', 'modelName'],
                ['--scale', 'scale'],
                ['--threshold', 'threshold'],
                ['--categories', 'categories'],
                ['--child-metrics', 'childMetrics'],
                ['--filters', 'filters'],
            ];
            const FILE_SCHEMA_JSON = `{
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
      "default": "float"
    },
    "enabled_in_prod": {
      "type": "boolean",
      "default": false
    },
    "needs_ground_truth": {
      "type": "boolean",
      "default": false
    },
    "sampling_percentage": {
      "type": "number",
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
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                name: 'name',
                type: 'type',
                criteria: 'criteria',
                description: 'description',
                'return-type': 'return_type',
                'enabled-in-prod': 'enabled_in_prod',
                'needs-ground-truth': 'needs_ground_truth',
                'sampling-percentage': 'sampling_percentage',
                'model-provider': 'model_provider',
                'model-name': 'model_name',
                scale: 'scale',
                threshold: 'threshold',
                categories: 'categories',
                'child-metrics': 'child_metrics',
                filters: 'filters',
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
                    ['--type', 'type'],
                    ['--criteria', 'criteria'],
                ]);
                request = {
                    name: opts.name,
                    type: opts.type,
                    criteria: opts.criteria,
                    ...(opts.description !== undefined && { description: opts.description }),
                    ...(opts.returnType !== undefined && { return_type: opts.returnType }),
                    ...(opts.enabledInProd !== undefined && { enabled_in_prod: opts.enabledInProd }),
                    ...(opts.needsGroundTruth !== undefined && {
                        needs_ground_truth: opts.needsGroundTruth,
                    }),
                    ...(opts.samplingPercentage !== undefined && {
                        sampling_percentage: parseNumber(opts.samplingPercentage),
                    }),
                    ...(opts.modelProvider !== undefined && { model_provider: opts.modelProvider }),
                    ...(opts.modelName !== undefined && { model_name: opts.modelName }),
                    ...(opts.scale !== undefined && { scale: parseNumber(opts.scale) }),
                    ...(opts.threshold !== undefined && { threshold: parseJson(opts.threshold) }),
                    ...(opts.categories !== undefined && { categories: parseJson(opts.categories) }),
                    ...(opts.childMetrics !== undefined && { child_metrics: parseJson(opts.childMetrics) }),
                    ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
                };
            }
            const result = await client.metrics.create(request);
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
        .description('Update an existing metric')
        .option('--metric-id <value>', 'The unique identifier of the metric to update (required)')
        .option('--name <value>', 'name')
        .addOption(new Option('--type <value>', 'type').choices(['PYTHON', 'LLM', 'HUMAN', 'COMPOSITE']))
        .option('--criteria <value>', 'criteria')
        .option('--description <value>', 'description')
        .addOption(new Option('--return-type <value>', 'return_type').choices([
        'float',
        'boolean',
        'string',
        'categorical',
    ]))
        .option('--enabled-in-prod', 'enabled_in_prod')
        .option('--no-enabled-in-prod', 'enabled_in_prod')
        .option('--needs-ground-truth', 'needs_ground_truth')
        .option('--no-needs-ground-truth', 'needs_ground_truth')
        .option('--sampling-percentage <value>', 'sampling_percentage')
        .option('--model-provider <value>', 'model_provider')
        .option('--model-name <value>', 'model_name')
        .option('--scale <value>', 'scale')
        .option('--threshold <json>', 'threshold')
        .option('--categories <json>', 'categories')
        .option('--child-metrics <json>', 'child_metrics')
        .option('--filters <json>', 'filters')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--metric-id', 'metricId'],
                ['--name', 'name'],
                ['--type', 'type'],
                ['--criteria', 'criteria'],
                ['--description', 'description'],
                ['--return-type', 'returnType'],
                ['--enabled-in-prod', 'enabledInProd'],
                ['--no-enabled-in-prod', 'enabledInProd'],
                ['--needs-ground-truth', 'needsGroundTruth'],
                ['--no-needs-ground-truth', 'needsGroundTruth'],
                ['--sampling-percentage', 'samplingPercentage'],
                ['--model-provider', 'modelProvider'],
                ['--model-name', 'modelName'],
                ['--scale', 'scale'],
                ['--threshold', 'threshold'],
                ['--categories', 'categories'],
                ['--child-metrics', 'childMetrics'],
                ['--filters', 'filters'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "metric_id": {
      "type": "string",
      "description": "The unique identifier of the metric to update"
    },
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
      "type": [
        "string",
        "null"
      ]
    },
    "return_type": {
      "type": "string",
      "enum": [
        "float",
        "boolean",
        "string",
        "categorical"
      ]
    },
    "enabled_in_prod": {
      "type": "boolean"
    },
    "needs_ground_truth": {
      "type": "boolean"
    },
    "sampling_percentage": {
      "type": "number"
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
    "categories": {
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
    "child_metrics": {
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
      "additionalProperties": false
    }
  },
  "required": [
    "metric_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'metric-id': 'metric_id',
                name: 'name',
                type: 'type',
                criteria: 'criteria',
                description: 'description',
                'return-type': 'return_type',
                'enabled-in-prod': 'enabled_in_prod',
                'needs-ground-truth': 'needs_ground_truth',
                'sampling-percentage': 'sampling_percentage',
                'model-provider': 'model_provider',
                'model-name': 'model_name',
                scale: 'scale',
                threshold: 'threshold',
                categories: 'categories',
                'child-metrics': 'child_metrics',
                filters: 'filters',
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
                assertRequiredFields(opts, [['--metric-id', 'metricId']]);
                request = {
                    metric_id: opts.metricId,
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.type !== undefined && { type: opts.type }),
                    ...(opts.criteria !== undefined && { criteria: opts.criteria }),
                    ...(opts.description !== undefined && { description: opts.description }),
                    ...(opts.returnType !== undefined && { return_type: opts.returnType }),
                    ...(opts.enabledInProd !== undefined && { enabled_in_prod: opts.enabledInProd }),
                    ...(opts.needsGroundTruth !== undefined && {
                        needs_ground_truth: opts.needsGroundTruth,
                    }),
                    ...(opts.samplingPercentage !== undefined && {
                        sampling_percentage: parseNumber(opts.samplingPercentage),
                    }),
                    ...(opts.modelProvider !== undefined && { model_provider: opts.modelProvider }),
                    ...(opts.modelName !== undefined && { model_name: opts.modelName }),
                    ...(opts.scale !== undefined && { scale: parseNumber(opts.scale) }),
                    ...(opts.threshold !== undefined && { threshold: parseJson(opts.threshold) }),
                    ...(opts.categories !== undefined && { categories: parseJson(opts.categories) }),
                    ...(opts.childMetrics !== undefined && { child_metrics: parseJson(opts.childMetrics) }),
                    ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
                };
            }
            const result = await client.metrics.update(request);
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
        .description('Delete a metric')
        .option('--metric-id <value>', 'The unique identifier of the metric to delete (required)')
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
      "description": "The unique identifier of the metric to delete"
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
            const client = createDataPlaneClient(command);
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
            const result = await client.metrics.delete(request);
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
        .command('run')
        .description('Run a metric evaluation')
        .option('--metric <json>', 'metric (required)')
        .option('--event <json>', 'event (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--metric', 'metric'],
                ['--event', 'event'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "metric": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "type": {
          "type": "string",
          "enum": [
            "LLM",
            "PYTHON"
          ]
        },
        "criteria": {
          "type": "string"
        },
        "description": {
          "type": "string",
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
          "default": "float"
        },
        "enabled_in_prod": {
          "type": "boolean",
          "default": false
        },
        "needs_ground_truth": {
          "type": "boolean",
          "default": false
        },
        "sampling_percentage": {
          "type": "number",
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
      "additionalProperties": false
    },
    "event": {
      "type": "object",
      "properties": {
        "event_type": {
          "type": "string"
        },
        "event_name": {
          "type": "string"
        },
        "inputs": {
          "type": "object",
          "additionalProperties": {}
        },
        "outputs": {
          "type": "object",
          "additionalProperties": {}
        },
        "workspace_id": {
          "type": "string"
        },
        "feedback": {
          "type": "object",
          "properties": {
            "ground_truth": {}
          }
        }
      }
    }
  },
  "required": [
    "metric",
    "event"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                metric: 'metric',
                event: 'event',
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
                    ['--metric', 'metric'],
                    ['--event', 'event'],
                ]);
                request = {
                    metric: parseJson(opts.metric),
                    event: parseJson(opts.event),
                };
            }
            const result = await client.metrics.run(request);
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
//# sourceMappingURL=metrics.js.map