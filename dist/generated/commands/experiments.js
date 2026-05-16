// AUTO-GENERATED — do not edit manually. Run `pnpm generate:cli` to regenerate.
import { Command, Option } from 'commander';
import { assertNoOtherFlags, assertRequiredFields, createClient, handleSchemaIntrospection, parseJson, parseNumber, readRequestFile, } from '../../utils.js';
export function experimentsCommand() {
    const cmd = new Command('experiments').description('Experiments commands');
    cmd
        .command('list-runs')
        .description('Get a list of evaluation runs')
        .option('--dataset-id <value>', 'Filter by dataset ID')
        .option('--page <value>', 'Page number for pagination')
        .option('--limit <value>', 'Number of results per page')
        .option('--run-ids <json>', 'List of specific run IDs to fetch')
        .option('--name <value>', 'Filter by run name')
        .addOption(new Option('--status <value>', 'Filter by run status').choices([
        'pending',
        'completed',
        'failed',
        'cancelled',
        'running',
    ]))
        .option('--date-range <json>', 'Filter by date range')
        .addOption(new Option('--sort-by <value>', 'Field to sort by').choices([
        'created_at',
        'updated_at',
        'name',
        'status',
    ]))
        .addOption(new Option('--sort-order <value>', 'Sort order').choices(['asc', 'desc']))
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--dataset-id', 'datasetId'],
                ['--page', 'page'],
                ['--limit', 'limit'],
                ['--run-ids', 'runIds'],
                ['--name', 'name'],
                ['--status', 'status'],
                ['--date-range', 'dateRange'],
                ['--sort-by', 'sortBy'],
                ['--sort-order', 'sortOrder'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "dataset_id": {
      "type": "string",
      "description": "Filter by dataset ID"
    },
    "page": {
      "type": "number",
      "description": "Page number for pagination"
    },
    "limit": {
      "type": "number",
      "description": "Number of results per page"
    },
    "run_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of specific run IDs to fetch"
    },
    "name": {
      "type": "string",
      "description": "Filter by run name"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "completed",
        "failed",
        "cancelled",
        "running"
      ],
      "description": "Filter by run status"
    },
    "dateRange": {
      "anyOf": [
        {
          "type": "string"
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
          "additionalProperties": false
        }
      ],
      "description": "Filter by date range"
    },
    "sort_by": {
      "type": "string",
      "enum": [
        "created_at",
        "updated_at",
        "name",
        "status"
      ],
      "description": "Field to sort by"
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
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'dataset-id': 'dataset_id',
                page: 'page',
                limit: 'limit',
                'run-ids': 'run_ids',
                name: 'name',
                status: 'status',
                'date-range': 'dateRange',
                'sort-by': 'sort_by',
                'sort-order': 'sort_order',
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
                request = {
                    ...(opts.datasetId !== undefined && { dataset_id: opts.datasetId }),
                    ...(opts.page !== undefined && { page: parseNumber(opts.page) }),
                    ...(opts.limit !== undefined && { limit: parseNumber(opts.limit) }),
                    ...(opts.runIds !== undefined && { run_ids: parseJson(opts.runIds) }),
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.status !== undefined && { status: opts.status }),
                    ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
                    ...(opts.sortBy !== undefined && { sort_by: opts.sortBy }),
                    ...(opts.sortOrder !== undefined && { sort_order: opts.sortOrder }),
                };
            }
            const result = await client.experiments.listRuns(request);
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
        .command('create-run')
        .description('Create a new evaluation run')
        .option('--run-id <value>', 'run_id')
        .option('--name <value>', 'name')
        .option('--description <value>', 'description')
        .addOption(new Option('--status <value>', 'status').choices([
        'pending',
        'completed',
        'failed',
        'cancelled',
        'running',
    ]))
        .option('--metadata <json>', 'metadata')
        .option('--results <json>', 'results')
        .option('--dataset-id <value>', 'dataset_id')
        .option('--event-ids <json>', 'event_ids')
        .option('--configuration <json>', 'configuration')
        .option('--evaluators <json>', 'evaluators')
        .option('--session-ids <json>', 'session_ids')
        .option('--datapoint-ids <json>', 'datapoint_ids')
        .option('--passing-ranges <json>', 'passing_ranges')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--run-id', 'runId'],
                ['--name', 'name'],
                ['--description', 'description'],
                ['--status', 'status'],
                ['--metadata', 'metadata'],
                ['--results', 'results'],
                ['--dataset-id', 'datasetId'],
                ['--event-ids', 'eventIds'],
                ['--configuration', 'configuration'],
                ['--evaluators', 'evaluators'],
                ['--session-ids', 'sessionIds'],
                ['--datapoint-ids', 'datapointIds'],
                ['--passing-ranges', 'passingRanges'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "run_id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "completed",
        "failed",
        "cancelled",
        "running"
      ],
      "default": "pending"
    },
    "metadata": {
      "type": "object",
      "additionalProperties": {}
    },
    "results": {
      "type": "object",
      "additionalProperties": {}
    },
    "dataset_id": {
      "type": [
        "string",
        "null"
      ]
    },
    "event_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "default": []
    },
    "configuration": {
      "type": "object",
      "additionalProperties": {}
    },
    "evaluators": {
      "type": "array",
      "items": {},
      "default": []
    },
    "session_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "default": []
    },
    "datapoint_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "default": []
    },
    "passing_ranges": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "min": {
            "type": "number"
          },
          "max": {
            "type": "number"
          }
        },
        "additionalProperties": false
      }
    }
  },
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'run-id': 'run_id',
                name: 'name',
                description: 'description',
                status: 'status',
                metadata: 'metadata',
                results: 'results',
                'dataset-id': 'dataset_id',
                'event-ids': 'event_ids',
                configuration: 'configuration',
                evaluators: 'evaluators',
                'session-ids': 'session_ids',
                'datapoint-ids': 'datapoint_ids',
                'passing-ranges': 'passing_ranges',
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
                request = {
                    ...(opts.runId !== undefined && { run_id: opts.runId }),
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.description !== undefined && { description: opts.description }),
                    ...(opts.status !== undefined && { status: opts.status }),
                    ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
                    ...(opts.results !== undefined && { results: parseJson(opts.results) }),
                    ...(opts.datasetId !== undefined && { dataset_id: opts.datasetId }),
                    ...(opts.eventIds !== undefined && { event_ids: parseJson(opts.eventIds) }),
                    ...(opts.configuration !== undefined && {
                        configuration: parseJson(opts.configuration),
                    }),
                    ...(opts.evaluators !== undefined && { evaluators: parseJson(opts.evaluators) }),
                    ...(opts.sessionIds !== undefined && { session_ids: parseJson(opts.sessionIds) }),
                    ...(opts.datapointIds !== undefined && { datapoint_ids: parseJson(opts.datapointIds) }),
                    ...(opts.passingRanges !== undefined && {
                        passing_ranges: parseJson(opts.passingRanges),
                    }),
                };
            }
            const result = await client.experiments.createRun(request);
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
        .command('get-runs-schema')
        .description('Get events schema across all experiment runs in a project')
        .option('--date-range <json>', 'Filter by date range')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [['--date-range', 'dateRange']];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "dateRange": {
      "anyOf": [
        {
          "type": "string"
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
          "additionalProperties": false
        }
      ],
      "description": "Filter by date range"
    }
  },
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'date-range': 'dateRange',
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
                request = {
                    ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
                };
            }
            const result = await client.experiments.getRunsSchema(request);
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
        .command('get-run')
        .description('Get details of an evaluation run')
        .option('--run-id <value>', 'run_id (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [['--run-id', 'runId']];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "run_id": {
      "type": "string"
    }
  },
  "required": [
    "run_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'run-id': 'run_id',
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
                assertRequiredFields(opts, [['--run-id', 'runId']]);
                request = {
                    run_id: opts.runId,
                };
            }
            const result = await client.experiments.getRun(request);
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
        .command('update-run')
        .description('Update an evaluation run')
        .option('--run-id <value>', 'run_id (required)')
        .option('--name <value>', 'name')
        .option('--description <value>', 'description')
        .addOption(new Option('--status <value>', 'status').choices([
        'pending',
        'completed',
        'failed',
        'cancelled',
        'running',
    ]))
        .option('--metadata <json>', 'metadata')
        .option('--results <json>', 'results')
        .option('--event-ids <json>', 'event_ids')
        .option('--configuration <json>', 'configuration')
        .option('--evaluators <json>', 'evaluators')
        .option('--session-ids <json>', 'session_ids')
        .option('--datapoint-ids <json>', 'datapoint_ids')
        .option('--passing-ranges <json>', 'passing_ranges')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--run-id', 'runId'],
                ['--name', 'name'],
                ['--description', 'description'],
                ['--status', 'status'],
                ['--metadata', 'metadata'],
                ['--results', 'results'],
                ['--event-ids', 'eventIds'],
                ['--configuration', 'configuration'],
                ['--evaluators', 'evaluators'],
                ['--session-ids', 'sessionIds'],
                ['--datapoint-ids', 'datapointIds'],
                ['--passing-ranges', 'passingRanges'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "run_id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "completed",
        "failed",
        "cancelled",
        "running"
      ]
    },
    "metadata": {
      "type": "object",
      "additionalProperties": {}
    },
    "results": {
      "type": "object",
      "additionalProperties": {}
    },
    "event_ids": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "configuration": {
      "type": "object",
      "additionalProperties": {}
    },
    "evaluators": {
      "type": "array",
      "items": {}
    },
    "session_ids": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "datapoint_ids": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "passing_ranges": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "min": {
            "type": "number"
          },
          "max": {
            "type": "number"
          }
        },
        "additionalProperties": false
      }
    }
  },
  "required": [
    "run_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'run-id': 'run_id',
                name: 'name',
                description: 'description',
                status: 'status',
                metadata: 'metadata',
                results: 'results',
                'event-ids': 'event_ids',
                configuration: 'configuration',
                evaluators: 'evaluators',
                'session-ids': 'session_ids',
                'datapoint-ids': 'datapoint_ids',
                'passing-ranges': 'passing_ranges',
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
                assertRequiredFields(opts, [['--run-id', 'runId']]);
                request = {
                    run_id: opts.runId,
                    ...(opts.name !== undefined && { name: opts.name }),
                    ...(opts.description !== undefined && { description: opts.description }),
                    ...(opts.status !== undefined && { status: opts.status }),
                    ...(opts.metadata !== undefined && { metadata: parseJson(opts.metadata) }),
                    ...(opts.results !== undefined && { results: parseJson(opts.results) }),
                    ...(opts.eventIds !== undefined && { event_ids: parseJson(opts.eventIds) }),
                    ...(opts.configuration !== undefined && {
                        configuration: parseJson(opts.configuration),
                    }),
                    ...(opts.evaluators !== undefined && { evaluators: parseJson(opts.evaluators) }),
                    ...(opts.sessionIds !== undefined && { session_ids: parseJson(opts.sessionIds) }),
                    ...(opts.datapointIds !== undefined && { datapoint_ids: parseJson(opts.datapointIds) }),
                    ...(opts.passingRanges !== undefined && {
                        passing_ranges: parseJson(opts.passingRanges),
                    }),
                };
            }
            const result = await client.experiments.updateRun(request);
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
        .command('delete-run')
        .description('Delete an evaluation run')
        .option('--run-id <value>', 'run_id (required)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [['--run-id', 'runId']];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "run_id": {
      "type": "string"
    }
  },
  "required": [
    "run_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'run-id': 'run_id',
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
                assertRequiredFields(opts, [['--run-id', 'runId']]);
                request = {
                    run_id: opts.runId,
                };
            }
            const result = await client.experiments.deleteRun(request);
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
        .command('get-run-schema')
        .description('Get events schema for a single experiment run')
        .option('--run-id <value>', 'Experiment run ID (UUIDv4) (required)')
        .option('--date-range <json>', 'Filter by date range')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--run-id', 'runId'],
                ['--date-range', 'dateRange'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "run_id": {
      "type": "string",
      "description": "Experiment run ID (UUIDv4)"
    },
    "dateRange": {
      "anyOf": [
        {
          "type": "string"
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
          "additionalProperties": false
        }
      ],
      "description": "Filter by date range"
    }
  },
  "required": [
    "run_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'run-id': 'run_id',
                'date-range': 'dateRange',
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
                assertRequiredFields(opts, [['--run-id', 'runId']]);
                request = {
                    run_id: opts.runId,
                    ...(opts.dateRange !== undefined && { dateRange: parseJson(opts.dateRange) }),
                };
            }
            const result = await client.experiments.getRunSchema(request);
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
        .command('get-run-metrics')
        .description('Get event metrics for an experiment run')
        .option('--run-id <value>', 'Experiment run ID (UUIDv4) (required)')
        .option('--date-range <value>', 'Date range filter as JSON string')
        .option('--filters <json>', 'Optional filters to apply (JSON string or array of filter objects)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--run-id', 'runId'],
                ['--date-range', 'dateRange'],
                ['--filters', 'filters'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "run_id": {
      "type": "string",
      "description": "Experiment run ID (UUIDv4)"
    },
    "dateRange": {
      "type": "string",
      "description": "Date range filter as JSON string"
    },
    "filters": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": {
              "not": {}
            }
          }
        }
      ],
      "description": "Optional filters to apply (JSON string or array of filter objects)"
    }
  },
  "required": [
    "run_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'run-id': 'run_id',
                'date-range': 'dateRange',
                filters: 'filters',
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
                assertRequiredFields(opts, [['--run-id', 'runId']]);
                request = {
                    run_id: opts.runId,
                    ...(opts.dateRange !== undefined && { dateRange: opts.dateRange }),
                    ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
                };
            }
            const result = await client.experiments.getRunMetrics(request);
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
        .command('get-summary')
        .description('Retrieve experiment summary')
        .option('--run-id <value>', 'Experiment run ID (UUIDv4) (required)')
        .addOption(new Option('--aggregate-function <value>', 'Aggregation function to apply to metrics').choices(['average', 'min', 'max', 'median', 'p95', 'p99', 'p90', 'sum', 'count']))
        .option('--filters <json>', 'Optional filters to apply (JSON string or array of filter objects)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--run-id', 'runId'],
                ['--aggregate-function', 'aggregateFunction'],
                ['--filters', 'filters'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "run_id": {
      "type": "string",
      "description": "Experiment run ID (UUIDv4)"
    },
    "aggregate_function": {
      "type": "string",
      "enum": [
        "average",
        "min",
        "max",
        "median",
        "p95",
        "p99",
        "p90",
        "sum",
        "count"
      ],
      "description": "Aggregation function to apply to metrics"
    },
    "filters": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": {
              "not": {}
            }
          }
        }
      ],
      "description": "Optional filters to apply (JSON string or array of filter objects)"
    }
  },
  "required": [
    "run_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'run-id': 'run_id',
                'aggregate-function': 'aggregate_function',
                filters: 'filters',
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
                assertRequiredFields(opts, [['--run-id', 'runId']]);
                request = {
                    run_id: opts.runId,
                    ...(opts.aggregateFunction !== undefined && {
                        aggregate_function: opts.aggregateFunction,
                    }),
                    ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
                };
            }
            const result = await client.experiments.getSummary(request);
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
        .command('compare-runs')
        .description('Retrieve experiment comparison')
        .option('--new-run-id <value>', 'New experiment run ID to compare (UUIDv4) (required)')
        .option('--old-run-id <value>', 'Old experiment run ID to compare against (UUIDv4) (required)')
        .addOption(new Option('--aggregate-function <value>', 'Aggregation function to apply to metrics').choices(['average', 'min', 'max', 'median', 'p95', 'p99', 'p90', 'sum', 'count']))
        .option('--filters <json>', 'Optional filters to apply (JSON string or array of filter objects)')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--new-run-id', 'newRunId'],
                ['--old-run-id', 'oldRunId'],
                ['--aggregate-function', 'aggregateFunction'],
                ['--filters', 'filters'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "new_run_id": {
      "type": "string",
      "description": "New experiment run ID to compare (UUIDv4)"
    },
    "old_run_id": {
      "type": "string",
      "description": "Old experiment run ID to compare against (UUIDv4)"
    },
    "aggregate_function": {
      "type": "string",
      "enum": [
        "average",
        "min",
        "max",
        "median",
        "p95",
        "p99",
        "p90",
        "sum",
        "count"
      ],
      "description": "Aggregation function to apply to metrics"
    },
    "filters": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": {
              "not": {}
            }
          }
        }
      ],
      "description": "Optional filters to apply (JSON string or array of filter objects)"
    }
  },
  "required": [
    "new_run_id",
    "old_run_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'new-run-id': 'new_run_id',
                'old-run-id': 'old_run_id',
                'aggregate-function': 'aggregate_function',
                filters: 'filters',
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
                    ['--new-run-id', 'newRunId'],
                    ['--old-run-id', 'oldRunId'],
                ]);
                request = {
                    new_run_id: opts.newRunId,
                    old_run_id: opts.oldRunId,
                    ...(opts.aggregateFunction !== undefined && {
                        aggregate_function: opts.aggregateFunction,
                    }),
                    ...(opts.filters !== undefined && { filters: parseJson(opts.filters) }),
                };
            }
            const result = await client.experiments.compareRuns(request);
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
        .command('compare-run-events')
        .description('Compare events between two experiment runs')
        .option('--new-run-id <value>', 'New experiment run ID (UUIDv4) (required)')
        .option('--old-run-id <value>', 'Old experiment run ID to compare against (UUIDv4) (required)')
        .option('--event-name <value>', 'Filter by event name')
        .option('--event-type <value>', 'Filter by event type')
        .option('--filter <json>', 'Additional filter criteria (JSON string or object)')
        .option('--limit <value>', 'Maximum number of results')
        .option('--page <value>', 'Page number for pagination')
        .option('--show-file-schema', 'Print the JSON Schema for the request body (the shape --filename accepts) and exit. Cannot be combined with other command-specific flags.')
        .option('--show-argument-schema <flag-name>', 'Print the JSON Schema for one argument. Pass the kebab flag name without the leading "--" (e.g. "dataset-id", not "--dataset-id"). Cannot be combined with other command-specific flags.')
        .option('-f, --filename <path>', 'Read all arguments from a JSON-C or YAML file (.json/.jsonc/.yaml/.yml). Cannot be combined with other command-specific flags.')
        .action(async (opts, command) => {
        try {
            const FIELD_FLAG_PAIRS = [
                ['--new-run-id', 'newRunId'],
                ['--old-run-id', 'oldRunId'],
                ['--event-name', 'eventName'],
                ['--event-type', 'eventType'],
                ['--filter', 'filter'],
                ['--limit', 'limit'],
                ['--page', 'page'],
            ];
            const FILE_SCHEMA_JSON = `{
  "type": "object",
  "properties": {
    "new_run_id": {
      "type": "string",
      "description": "New experiment run ID (UUIDv4)"
    },
    "old_run_id": {
      "type": "string",
      "description": "Old experiment run ID to compare against (UUIDv4)"
    },
    "event_name": {
      "type": "string",
      "description": "Filter by event name"
    },
    "event_type": {
      "type": "string",
      "description": "Filter by event type"
    },
    "filter": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "object",
          "additionalProperties": {
            "not": {}
          }
        }
      ],
      "description": "Additional filter criteria (JSON string or object)"
    },
    "limit": {
      "type": "number",
      "description": "Maximum number of results"
    },
    "page": {
      "type": "number",
      "description": "Page number for pagination"
    }
  },
  "required": [
    "new_run_id",
    "old_run_id"
  ],
  "additionalProperties": false
}`;
            const KEBAB_TO_SPEC = {
                'new-run-id': 'new_run_id',
                'old-run-id': 'old_run_id',
                'event-name': 'event_name',
                'event-type': 'event_type',
                filter: 'filter',
                limit: 'limit',
                page: 'page',
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
                    ['--new-run-id', 'newRunId'],
                    ['--old-run-id', 'oldRunId'],
                ]);
                request = {
                    new_run_id: opts.newRunId,
                    old_run_id: opts.oldRunId,
                    ...(opts.eventName !== undefined && { event_name: opts.eventName }),
                    ...(opts.eventType !== undefined && { event_type: opts.eventType }),
                    ...(opts.filter !== undefined && { filter: parseJson(opts.filter) }),
                    ...(opts.limit !== undefined && { limit: parseNumber(opts.limit) }),
                    ...(opts.page !== undefined && { page: parseNumber(opts.page) }),
                };
            }
            const result = await client.experiments.compareRunEvents(request);
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
//# sourceMappingURL=experiments.js.map