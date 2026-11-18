// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.
import { Command } from 'commander';
import { assertNoOtherFlags, assertRequiredFields, createDataPlaneClient, handleSchemaIntrospection, parseJson, parseNumber, readRequestFile, } from '../../utils.js';
export function evaluatorsCommand() {
    const cmd = new Command('evaluators').description('Evaluators commands');
    cmd
        .command('list')
        .description('List evaluators')
        .option('--project-id <value>', 'Project that owns the evaluator; must be within the API key root scope. (required)')
        .option('--page <value>', 'One-based page number. (page - 1) × limit must not exceed 2147483647.')
        .option('--limit <value>', 'Maximum number of evaluators or versions per page.')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
            ['--page', 'page'],
            ['--limit', 'limit'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "Project that owns the evaluator; must be within the API key root scope."
    },
    "page": {
      "type": "number",
      "description": "One-based page number. (page - 1) × limit must not exceed 2147483647."
    },
    "limit": {
      "type": "number",
      "description": "Maximum number of evaluators or versions per page."
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
            assertRequiredFields(opts, [['--project-id', 'projectId']]);
            request = {
                project_id: opts.projectId,
                ...(opts.page !== undefined && { page: parseNumber(opts.page) }),
                ...(opts.limit !== undefined && { limit: parseNumber(opts.limit) }),
            };
        }
        const result = await client.evaluators.list(request);
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('create')
        .description('Create an evaluator')
        .option('--project-id <value>', 'Project that owns the evaluator; must be within the API key root scope. (required)')
        .option('--slug <value>', 'Immutable, case-sensitive project-unique slug containing 1–64 ASCII letters, digits, underscores or hyphens. Must not be a valid ULID, regardless of case. Cannot change after creation. (required)')
        .option('--definition <json>', 'Evaluator definition with type python, llm, or human and the matching configuration object under that key. (required)')
        .option('--message <value>', 'Message for the initial version; defaults to an empty string.')
        .option('--publish', 'Publish the saved version atomically. Requires project.evaluator.publish in addition to the operation permission.')
        .option('--no-publish', 'Publish the saved version atomically. Requires project.evaluator.publish in addition to the operation permission.')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
            ['--slug', 'slug'],
            ['--definition', 'definition'],
            ['--message', 'message'],
            ['--publish', 'publish'],
            ['--no-publish', 'publish'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "Project that owns the evaluator; must be within the API key root scope."
    },
    "slug": {
      "type": "string",
      "description": "Immutable, case-sensitive project-unique slug containing 1–64 ASCII letters, digits, underscores or hyphens. Must not be a valid ULID, regardless of case. Cannot change after creation."
    },
    "definition": {
      "anyOf": [
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "const": "python",
              "description": "discriminator enum property added by openapi-typescript"
            },
            "python": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Evaluator display name, independent of its immutable slug."
                },
                "metadata": {
                  "type": "object",
                  "properties": {
                    "description": {
                      "type": "string"
                    }
                  },
                  "additionalProperties": false
                },
                "sampling": {
                  "type": "object",
                  "properties": {
                    "sampling_percentage": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "sampling_percentage"
                  ],
                  "additionalProperties": false
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
                },
                "score_schema": {
                  "type": "object",
                  "additionalProperties": {},
                  "description": "A Draft 2020-12 schema document. Further safety restrictions will apply."
                },
                "test_criteria": {
                  "type": "object",
                  "properties": {
                    "field": {
                      "type": "string"
                    },
                    "criteria": {
                      "anyOf": [
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is greater than value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is greater than or equal to value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than or equal to value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number differs from value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is between min and max, including both endpoints."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than min or greater than max."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals one of values."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals none of values."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "boolean"
                            },
                            "operator": {
                              "type": "string",
                              "const": "is_true"
                            }
                          },
                          "required": [
                            "type",
                            "operator"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected boolean is true."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "boolean"
                            },
                            "operator": {
                              "type": "string",
                              "const": "is_false"
                            }
                          },
                          "required": [
                            "type",
                            "operator"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected boolean is false."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals value; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string differs from value; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "contains"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            },
                            "whole_word": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive",
                            "whole_word"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string contains the literal value; case_sensitive controls case matching and whole_word requires Unicode word boundaries."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals one of values; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals none of values; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is greater than value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is greater than or equal to value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is less than value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is less than or equal to value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category equals value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category does not equal value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is between min and max, inclusive. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is outside the inclusive min-to-max range. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_eq"
                            },
                            "value": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label equals value. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_neq"
                            },
                            "value": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label does not equal value. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label is in values. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label is not in values. The numeric mapping is not used."
                        }
                      ]
                    }
                  },
                  "required": [
                    "field",
                    "criteria"
                  ],
                  "additionalProperties": false
                },
                "code_execution": {
                  "type": "object",
                  "properties": {
                    "code_snippet": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "code_snippet"
                  ],
                  "additionalProperties": false
                }
              },
              "required": [
                "name",
                "metadata",
                "sampling",
                "filters",
                "score_schema",
                "code_execution"
              ],
              "additionalProperties": false
            }
          },
          "required": [
            "type",
            "python"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "const": "llm",
              "description": "discriminator enum property added by openapi-typescript"
            },
            "llm": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Evaluator display name, independent of its immutable slug."
                },
                "metadata": {
                  "type": "object",
                  "properties": {
                    "description": {
                      "type": "string"
                    }
                  },
                  "additionalProperties": false
                },
                "sampling": {
                  "type": "object",
                  "properties": {
                    "sampling_percentage": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "sampling_percentage"
                  ],
                  "additionalProperties": false
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
                },
                "score_schema": {
                  "type": "object",
                  "additionalProperties": {},
                  "description": "A Draft 2020-12 schema document. Further safety restrictions will apply."
                },
                "test_criteria": {
                  "type": "object",
                  "properties": {
                    "field": {
                      "type": "string"
                    },
                    "criteria": {
                      "anyOf": [
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is greater than value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is greater than or equal to value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than or equal to value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number differs from value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is between min and max, including both endpoints."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than min or greater than max."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals one of values."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals none of values."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "boolean"
                            },
                            "operator": {
                              "type": "string",
                              "const": "is_true"
                            }
                          },
                          "required": [
                            "type",
                            "operator"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected boolean is true."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "boolean"
                            },
                            "operator": {
                              "type": "string",
                              "const": "is_false"
                            }
                          },
                          "required": [
                            "type",
                            "operator"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected boolean is false."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals value; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string differs from value; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "contains"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            },
                            "whole_word": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive",
                            "whole_word"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string contains the literal value; case_sensitive controls case matching and whole_word requires Unicode word boundaries."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals one of values; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals none of values; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is greater than value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is greater than or equal to value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is less than value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is less than or equal to value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category equals value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category does not equal value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is between min and max, inclusive. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is outside the inclusive min-to-max range. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_eq"
                            },
                            "value": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label equals value. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_neq"
                            },
                            "value": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label does not equal value. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label is in values. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label is not in values. The numeric mapping is not used."
                        }
                      ]
                    }
                  },
                  "required": [
                    "field",
                    "criteria"
                  ],
                  "additionalProperties": false
                },
                "model": {
                  "type": "object",
                  "properties": {
                    "model_provider": {
                      "type": "string"
                    },
                    "model_name": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "model_provider",
                    "model_name"
                  ],
                  "additionalProperties": false
                },
                "llm_execution": {
                  "type": "object",
                  "properties": {
                    "system_prompt": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "system_prompt"
                  ],
                  "additionalProperties": false
                }
              },
              "required": [
                "name",
                "metadata",
                "sampling",
                "filters",
                "score_schema",
                "model",
                "llm_execution"
              ],
              "additionalProperties": false
            }
          },
          "required": [
            "type",
            "llm"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "const": "human",
              "description": "discriminator enum property added by openapi-typescript"
            },
            "human": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Evaluator display name, independent of its immutable slug."
                },
                "metadata": {
                  "type": "object",
                  "properties": {
                    "description": {
                      "type": "string"
                    }
                  },
                  "additionalProperties": false
                },
                "score_schema": {
                  "type": "object",
                  "additionalProperties": {},
                  "description": "A Draft 2020-12 schema document. Further safety restrictions will apply."
                },
                "test_criteria": {
                  "type": "object",
                  "properties": {
                    "field": {
                      "type": "string"
                    },
                    "criteria": {
                      "anyOf": [
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is greater than value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is greater than or equal to value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than or equal to value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number differs from value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is between min and max, including both endpoints."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than min or greater than max."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals one of values."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals none of values."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "boolean"
                            },
                            "operator": {
                              "type": "string",
                              "const": "is_true"
                            }
                          },
                          "required": [
                            "type",
                            "operator"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected boolean is true."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "boolean"
                            },
                            "operator": {
                              "type": "string",
                              "const": "is_false"
                            }
                          },
                          "required": [
                            "type",
                            "operator"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected boolean is false."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals value; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string differs from value; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "contains"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            },
                            "whole_word": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive",
                            "whole_word"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string contains the literal value; case_sensitive controls case matching and whole_word requires Unicode word boundaries."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals one of values; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals none of values; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is greater than value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is greater than or equal to value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is less than value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is less than or equal to value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category equals value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category does not equal value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is between min and max, inclusive. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is outside the inclusive min-to-max range. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_eq"
                            },
                            "value": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label equals value. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_neq"
                            },
                            "value": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label does not equal value. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label is in values. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label is not in values. The numeric mapping is not used."
                        }
                      ]
                    }
                  },
                  "required": [
                    "field",
                    "criteria"
                  ],
                  "additionalProperties": false
                }
              },
              "required": [
                "name",
                "metadata",
                "score_schema"
              ],
              "additionalProperties": false
            }
          },
          "required": [
            "type",
            "human"
          ],
          "additionalProperties": false
        }
      ],
      "description": "Evaluator definition with type python, llm, or human and the matching configuration object under that key."
    },
    "message": {
      "type": "string",
      "description": "Message for the initial version; defaults to an empty string.",
      "default": true
    },
    "publish": {
      "type": "boolean",
      "description": "Publish the saved version atomically. Requires project.evaluator.publish in addition to the operation permission.",
      "default": false
    }
  },
  "required": [
    "project_id",
    "slug",
    "definition"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'project-id': 'project_id',
            slug: 'slug',
            definition: 'definition',
            message: 'message',
            publish: 'publish',
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
                ['--slug', 'slug'],
                ['--definition', 'definition'],
            ]);
            request = {
                project_id: opts.projectId,
                slug: opts.slug,
                definition: parseJson(opts.definition),
                ...(opts.message !== undefined && { message: opts.message }),
                ...(opts.publish !== undefined && { publish: opts.publish }),
            };
        }
        const result = await client.evaluators.create(request);
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('get')
        .description('Get the latest evaluator version')
        .option('--project-id <value>', 'Project that owns the evaluator; must be within the API key root scope. (required)')
        .option('--evaluator-id-or-slug <value>', 'Evaluator ULID or its immutable, case-sensitive project-unique slug. (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
            ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "Project that owns the evaluator; must be within the API key root scope."
    },
    "evaluator_id_or_slug": {
      "type": "string",
      "description": "Evaluator ULID or its immutable, case-sensitive project-unique slug."
    }
  },
  "required": [
    "project_id",
    "evaluator_id_or_slug"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'project-id': 'project_id',
            'evaluator-id-or-slug': 'evaluator_id_or_slug',
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
                ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
            ]);
            request = {
                project_id: opts.projectId,
                evaluator_id_or_slug: opts.evaluatorIdOrSlug,
            };
        }
        const result = await client.evaluators.get(request);
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('replace')
        .description('Replace an evaluator definition')
        .option('--project-id <value>', 'Project that owns the evaluator; must be within the API key root scope. (required)')
        .option('--evaluator-id-or-slug <value>', 'Evaluator ULID or its immutable, case-sensitive project-unique slug. (required)')
        .option('--definition <json>', 'Evaluator definition with type python, llm, or human and the matching configuration object under that key. (required)')
        .option('--message <value>', 'Message for a new version; defaults to an empty string. An unchanged definition retains its existing message.')
        .option('--publish', 'Publish the saved version atomically. Requires project.evaluator.publish in addition to the operation permission.')
        .option('--no-publish', 'Publish the saved version atomically. Requires project.evaluator.publish in addition to the operation permission.')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
            ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
            ['--definition', 'definition'],
            ['--message', 'message'],
            ['--publish', 'publish'],
            ['--no-publish', 'publish'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "Project that owns the evaluator; must be within the API key root scope."
    },
    "evaluator_id_or_slug": {
      "type": "string",
      "description": "Evaluator ULID or its immutable, case-sensitive project-unique slug."
    },
    "definition": {
      "anyOf": [
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "const": "python",
              "description": "discriminator enum property added by openapi-typescript"
            },
            "python": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Evaluator display name, independent of its immutable slug."
                },
                "metadata": {
                  "type": "object",
                  "properties": {
                    "description": {
                      "type": "string"
                    }
                  },
                  "additionalProperties": false
                },
                "sampling": {
                  "type": "object",
                  "properties": {
                    "sampling_percentage": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "sampling_percentage"
                  ],
                  "additionalProperties": false
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
                },
                "score_schema": {
                  "type": "object",
                  "additionalProperties": {},
                  "description": "A Draft 2020-12 schema document. Further safety restrictions will apply."
                },
                "test_criteria": {
                  "type": "object",
                  "properties": {
                    "field": {
                      "type": "string"
                    },
                    "criteria": {
                      "anyOf": [
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is greater than value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is greater than or equal to value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than or equal to value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number differs from value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is between min and max, including both endpoints."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than min or greater than max."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals one of values."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals none of values."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "boolean"
                            },
                            "operator": {
                              "type": "string",
                              "const": "is_true"
                            }
                          },
                          "required": [
                            "type",
                            "operator"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected boolean is true."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "boolean"
                            },
                            "operator": {
                              "type": "string",
                              "const": "is_false"
                            }
                          },
                          "required": [
                            "type",
                            "operator"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected boolean is false."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals value; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string differs from value; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "contains"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            },
                            "whole_word": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive",
                            "whole_word"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string contains the literal value; case_sensitive controls case matching and whole_word requires Unicode word boundaries."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals one of values; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals none of values; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is greater than value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is greater than or equal to value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is less than value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is less than or equal to value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category equals value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category does not equal value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is between min and max, inclusive. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is outside the inclusive min-to-max range. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_eq"
                            },
                            "value": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label equals value. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_neq"
                            },
                            "value": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label does not equal value. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label is in values. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label is not in values. The numeric mapping is not used."
                        }
                      ]
                    }
                  },
                  "required": [
                    "field",
                    "criteria"
                  ],
                  "additionalProperties": false
                },
                "code_execution": {
                  "type": "object",
                  "properties": {
                    "code_snippet": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "code_snippet"
                  ],
                  "additionalProperties": false
                }
              },
              "required": [
                "name",
                "metadata",
                "sampling",
                "filters",
                "score_schema",
                "code_execution"
              ],
              "additionalProperties": false
            }
          },
          "required": [
            "type",
            "python"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "const": "llm",
              "description": "discriminator enum property added by openapi-typescript"
            },
            "llm": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Evaluator display name, independent of its immutable slug."
                },
                "metadata": {
                  "type": "object",
                  "properties": {
                    "description": {
                      "type": "string"
                    }
                  },
                  "additionalProperties": false
                },
                "sampling": {
                  "type": "object",
                  "properties": {
                    "sampling_percentage": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "sampling_percentage"
                  ],
                  "additionalProperties": false
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
                },
                "score_schema": {
                  "type": "object",
                  "additionalProperties": {},
                  "description": "A Draft 2020-12 schema document. Further safety restrictions will apply."
                },
                "test_criteria": {
                  "type": "object",
                  "properties": {
                    "field": {
                      "type": "string"
                    },
                    "criteria": {
                      "anyOf": [
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is greater than value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is greater than or equal to value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than or equal to value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number differs from value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is between min and max, including both endpoints."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than min or greater than max."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals one of values."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals none of values."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "boolean"
                            },
                            "operator": {
                              "type": "string",
                              "const": "is_true"
                            }
                          },
                          "required": [
                            "type",
                            "operator"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected boolean is true."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "boolean"
                            },
                            "operator": {
                              "type": "string",
                              "const": "is_false"
                            }
                          },
                          "required": [
                            "type",
                            "operator"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected boolean is false."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals value; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string differs from value; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "contains"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            },
                            "whole_word": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive",
                            "whole_word"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string contains the literal value; case_sensitive controls case matching and whole_word requires Unicode word boundaries."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals one of values; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals none of values; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is greater than value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is greater than or equal to value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is less than value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is less than or equal to value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category equals value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category does not equal value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is between min and max, inclusive. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is outside the inclusive min-to-max range. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_eq"
                            },
                            "value": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label equals value. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_neq"
                            },
                            "value": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label does not equal value. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label is in values. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label is not in values. The numeric mapping is not used."
                        }
                      ]
                    }
                  },
                  "required": [
                    "field",
                    "criteria"
                  ],
                  "additionalProperties": false
                },
                "model": {
                  "type": "object",
                  "properties": {
                    "model_provider": {
                      "type": "string"
                    },
                    "model_name": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "model_provider",
                    "model_name"
                  ],
                  "additionalProperties": false
                },
                "llm_execution": {
                  "type": "object",
                  "properties": {
                    "system_prompt": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "system_prompt"
                  ],
                  "additionalProperties": false
                }
              },
              "required": [
                "name",
                "metadata",
                "sampling",
                "filters",
                "score_schema",
                "model",
                "llm_execution"
              ],
              "additionalProperties": false
            }
          },
          "required": [
            "type",
            "llm"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "const": "human",
              "description": "discriminator enum property added by openapi-typescript"
            },
            "human": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Evaluator display name, independent of its immutable slug."
                },
                "metadata": {
                  "type": "object",
                  "properties": {
                    "description": {
                      "type": "string"
                    }
                  },
                  "additionalProperties": false
                },
                "score_schema": {
                  "type": "object",
                  "additionalProperties": {},
                  "description": "A Draft 2020-12 schema document. Further safety restrictions will apply."
                },
                "test_criteria": {
                  "type": "object",
                  "properties": {
                    "field": {
                      "type": "string"
                    },
                    "criteria": {
                      "anyOf": [
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is greater than value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is greater than or equal to value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than or equal to value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number differs from value."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is between min and max, including both endpoints."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number is less than min or greater than max."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals one of values."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "numeric"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected number equals none of values."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "boolean"
                            },
                            "operator": {
                              "type": "string",
                              "const": "is_true"
                            }
                          },
                          "required": [
                            "type",
                            "operator"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected boolean is true."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "boolean"
                            },
                            "operator": {
                              "type": "string",
                              "const": "is_false"
                            }
                          },
                          "required": [
                            "type",
                            "operator"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected boolean is false."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals value; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string differs from value; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "contains"
                            },
                            "value": {
                              "type": "string"
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            },
                            "whole_word": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value",
                            "case_sensitive",
                            "whole_word"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string contains the literal value; case_sensitive controls case matching and whole_word requires Unicode word boundaries."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals one of values; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "string"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "case_sensitive": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values",
                            "case_sensitive"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the selected string equals none of values; case_sensitive controls case matching."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is greater than value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "gte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is greater than or equal to value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lt"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is less than value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "lte"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is less than or equal to value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "eq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category equals value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "neq"
                            },
                            "value": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category does not equal value. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is between min and max, inclusive. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "not_between"
                            },
                            "min": {
                              "type": "number"
                            },
                            "max": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "min",
                            "max"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the numeric score mapped to the category is outside the inclusive min-to-max range. A null mapping always fails this rule."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_eq"
                            },
                            "value": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label equals value. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_neq"
                            },
                            "value": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "value"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label does not equal value. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label is in values. The numeric mapping is not used."
                        },
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "const": "categorical"
                            },
                            "operator": {
                              "type": "string",
                              "const": "category_not_one_of"
                            },
                            "values": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          },
                          "required": [
                            "type",
                            "operator",
                            "values"
                          ],
                          "additionalProperties": false,
                          "description": "Passes when the category label is not in values. The numeric mapping is not used."
                        }
                      ]
                    }
                  },
                  "required": [
                    "field",
                    "criteria"
                  ],
                  "additionalProperties": false
                }
              },
              "required": [
                "name",
                "metadata",
                "score_schema"
              ],
              "additionalProperties": false
            }
          },
          "required": [
            "type",
            "human"
          ],
          "additionalProperties": false
        }
      ],
      "description": "Evaluator definition with type python, llm, or human and the matching configuration object under that key."
    },
    "message": {
      "type": "string",
      "description": "Message for a new version; defaults to an empty string. An unchanged definition retains its existing message."
    },
    "publish": {
      "type": "boolean",
      "description": "Publish the saved version atomically. Requires project.evaluator.publish in addition to the operation permission.",
      "default": false
    }
  },
  "required": [
    "project_id",
    "evaluator_id_or_slug",
    "definition"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'project-id': 'project_id',
            'evaluator-id-or-slug': 'evaluator_id_or_slug',
            definition: 'definition',
            message: 'message',
            publish: 'publish',
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
                ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
                ['--definition', 'definition'],
            ]);
            request = {
                project_id: opts.projectId,
                evaluator_id_or_slug: opts.evaluatorIdOrSlug,
                definition: parseJson(opts.definition),
                ...(opts.message !== undefined && { message: opts.message }),
                ...(opts.publish !== undefined && { publish: opts.publish }),
            };
        }
        const result = await client.evaluators.replace(request);
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('archive')
        .description('Archive an evaluator')
        .option('--project-id <value>', 'Project that owns the evaluator; must be within the API key root scope. (required)')
        .option('--evaluator-id-or-slug <value>', 'Evaluator ULID or its immutable, case-sensitive project-unique slug. (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
            ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "Project that owns the evaluator; must be within the API key root scope."
    },
    "evaluator_id_or_slug": {
      "type": "string",
      "description": "Evaluator ULID or its immutable, case-sensitive project-unique slug."
    }
  },
  "required": [
    "project_id",
    "evaluator_id_or_slug"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'project-id': 'project_id',
            'evaluator-id-or-slug': 'evaluator_id_or_slug',
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
                ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
            ]);
            request = {
                project_id: opts.projectId,
                evaluator_id_or_slug: opts.evaluatorIdOrSlug,
            };
        }
        const result = await client.evaluators.archive(request);
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('list-versions')
        .description('List evaluator versions')
        .option('--project-id <value>', 'Project that owns the evaluator; must be within the API key root scope. (required)')
        .option('--evaluator-id-or-slug <value>', 'Evaluator ULID or its immutable, case-sensitive project-unique slug. (required)')
        .option('--page <value>', 'One-based page number. (page - 1) × limit must not exceed 2147483647.')
        .option('--limit <value>', 'Maximum number of evaluators or versions per page.')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
            ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
            ['--page', 'page'],
            ['--limit', 'limit'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "Project that owns the evaluator; must be within the API key root scope."
    },
    "evaluator_id_or_slug": {
      "type": "string",
      "description": "Evaluator ULID or its immutable, case-sensitive project-unique slug."
    },
    "page": {
      "type": "number",
      "description": "One-based page number. (page - 1) × limit must not exceed 2147483647."
    },
    "limit": {
      "type": "number",
      "description": "Maximum number of evaluators or versions per page."
    }
  },
  "required": [
    "project_id",
    "evaluator_id_or_slug"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'project-id': 'project_id',
            'evaluator-id-or-slug': 'evaluator_id_or_slug',
            page: 'page',
            limit: 'limit',
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
                ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
            ]);
            request = {
                project_id: opts.projectId,
                evaluator_id_or_slug: opts.evaluatorIdOrSlug,
                ...(opts.page !== undefined && { page: parseNumber(opts.page) }),
                ...(opts.limit !== undefined && { limit: parseNumber(opts.limit) }),
            };
        }
        const result = await client.evaluators.listVersions(request);
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('get-version')
        .description('Get a specific evaluator version')
        .option('--project-id <value>', 'Project that owns the evaluator; must be within the API key root scope. (required)')
        .option('--evaluator-id-or-slug <value>', 'Evaluator ULID or its immutable, case-sensitive project-unique slug. (required)')
        .option('--resource-version <value>', 'Server-assigned evaluator version. (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
            ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
            ['--resource-version', 'resourceVersion'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "Project that owns the evaluator; must be within the API key root scope."
    },
    "evaluator_id_or_slug": {
      "type": "string",
      "description": "Evaluator ULID or its immutable, case-sensitive project-unique slug."
    },
    "version": {
      "type": "number",
      "description": "Server-assigned evaluator version."
    }
  },
  "required": [
    "project_id",
    "evaluator_id_or_slug",
    "version"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'project-id': 'project_id',
            'evaluator-id-or-slug': 'evaluator_id_or_slug',
            'resource-version': 'version',
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
                ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
                ['--resource-version', 'resourceVersion'],
            ]);
            request = {
                project_id: opts.projectId,
                evaluator_id_or_slug: opts.evaluatorIdOrSlug,
                version: opts.resourceVersion,
            };
        }
        const result = await client.evaluators.getVersion(request);
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('publish')
        .description('Publish an evaluator version')
        .option('--project-id <value>', 'Project that owns the evaluator; must be within the API key root scope. (required)')
        .option('--evaluator-id-or-slug <value>', 'Evaluator ULID or its immutable, case-sensitive project-unique slug. (required)')
        .option('--resource-version <value>', 'Server-assigned evaluator version. (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
            ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
            ['--resource-version', 'resourceVersion'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "Project that owns the evaluator; must be within the API key root scope."
    },
    "evaluator_id_or_slug": {
      "type": "string",
      "description": "Evaluator ULID or its immutable, case-sensitive project-unique slug."
    },
    "version": {
      "type": "number",
      "description": "Server-assigned evaluator version."
    }
  },
  "required": [
    "project_id",
    "evaluator_id_or_slug",
    "version"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'project-id': 'project_id',
            'evaluator-id-or-slug': 'evaluator_id_or_slug',
            'resource-version': 'version',
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
                ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
                ['--resource-version', 'resourceVersion'],
            ]);
            request = {
                project_id: opts.projectId,
                evaluator_id_or_slug: opts.evaluatorIdOrSlug,
                version: opts.resourceVersion,
            };
        }
        const result = await client.evaluators.publish(request);
        if (result !== undefined) {
            process.stdout.write(JSON.stringify(result, null, 2) + '\n');
        }
    });
    cmd
        .command('unpublish')
        .description('Unpublish an evaluator')
        .option('--project-id <value>', 'Project that owns the evaluator; must be within the API key root scope. (required)')
        .option('--evaluator-id-or-slug <value>', 'Evaluator ULID or its immutable, case-sensitive project-unique slug. (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        const FIELD_FLAG_PAIRS = [
            ['--project-id', 'projectId'],
            ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
        ];
        const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "Project that owns the evaluator; must be within the API key root scope."
    },
    "evaluator_id_or_slug": {
      "type": "string",
      "description": "Evaluator ULID or its immutable, case-sensitive project-unique slug."
    }
  },
  "required": [
    "project_id",
    "evaluator_id_or_slug"
  ],
  "additionalProperties": false
}`;
        const KEBAB_TO_SPEC = {
            'project-id': 'project_id',
            'evaluator-id-or-slug': 'evaluator_id_or_slug',
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
                ['--evaluator-id-or-slug', 'evaluatorIdOrSlug'],
            ]);
            request = {
                project_id: opts.projectId,
                evaluator_id_or_slug: opts.evaluatorIdOrSlug,
            };
        }
        const result = await client.evaluators.unpublish(request);
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
//# sourceMappingURL=evaluators.js.map