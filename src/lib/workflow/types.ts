export type NodeCategory = 'trigger' | 'action' | 'logic' | 'transform' | 'output';
export type NodeStatus = 'idle' | 'pending' | 'running' | 'success' | 'warning' | 'error' | 'skipped';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Port {
  id: string;
  type: 'input' | 'output';
  label?: string;
  multiple?: boolean;
  required?: boolean;
}

export interface NodeParameter {
  key: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'code' | 'json' | 'password';
  default?: any;
  options?: { label: string; value: any }[];
  placeholder?: string;
  required?: boolean;
  description?: string;
}

export interface NodeTypeDefinition {
  type: string;
  category: NodeCategory;
  name: string;
  icon: string;
  color: string;
  description: string;
  inputs: number;
  outputs: number;
  parameters: NodeParameter[];
}

export interface WorkflowNode {
  id: string;
  type: string;
  name: string;
  position: Position;
  status: NodeStatus;
  parameters: Record<string, any>;
  data?: any[];
  error?: string;
  disabled?: boolean;
  notes?: string;
}

export interface Connection {
  id: string;
  sourceNodeId: string;
  sourceOutputIndex: number;
  targetNodeId: string;
  targetInputIndex: number;
  label?: string;
  disabled?: boolean;
}

export interface ExecutionLog {
  id: string;
  nodeId: string;
  timestamp: number;
  status: NodeStatus;
  input?: any;
  output?: any;
  error?: string;
  duration: number;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'idle' | 'running' | 'completed' | 'failed' | 'cancelled';
  startedAt: number;
  completedAt?: number;
  logs: ExecutionLog[];
  currentNodeId?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  connections: Connection[];
  variables: Record<string, any>;
  settings: WorkflowSettings;
  createdAt: number;
  updatedAt: number;
  version: number;
  tags?: string[];
}

export interface WorkflowSettings {
  errorWorkflow?: string;
  timezone: string;
  saveManualExecutions: boolean;
  saveExecutionProgress: boolean;
  saveDataErrorExecution: boolean;
  executionTimeout: number;
  retryOnFail: boolean;
  maxTries: number;
  waitBetweenTries: number;
}

export interface CanvasState {
  zoom: number;
  offset: Position;
  selectedNodeIds: Set<string>;
  selectedConnectionIds: Set<string>;
  isDragging: boolean;
  isConnecting: boolean;
  connectingFrom: { nodeId: string; outputIndex: number } | null;
  connectingTo: Position | null;
  selectionBox: { start: Position; end: Position } | null;
  readOnly: boolean;
}

export interface HistoryState {
  nodes: WorkflowNode[];
  connections: Connection[];
}

export interface WorkflowContext {
  workflow: Workflow;
  canvas: CanvasState;
  execution: WorkflowExecution | null;
  history: {
    past: HistoryState[];
    future: HistoryState[];
  };
  nodeTypes: Map<string, NodeTypeDefinition>;
}

export const DEFAULT_WORKFLOW_SETTINGS: WorkflowSettings = {
  timezone: 'UTC',
  saveManualExecutions: true,
  saveExecutionProgress: true,
  saveDataErrorExecution: false,
  executionTimeout: 300,
  retryOnFail: false,
  maxTries: 3,
  waitBetweenTries: 1000,
};

export const NODE_CATALOG: NodeTypeDefinition[] = [
  {
    type: 'webhook',
    category: 'trigger',
    name: 'Webhook',
    icon: 'mdi:webhook',
    color: '#f59e0b',
    description: 'Trigger workflow via HTTP webhook',
    inputs: 0,
    outputs: 1,
    parameters: [
      { key: 'path', label: 'Path', type: 'string', default: '/webhook', placeholder: '/webhook' },
      { key: 'method', label: 'Method', type: 'select', default: 'POST', options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'DELETE', value: 'DELETE' },
      ]},
      { key: 'authentication', label: 'Authentication', type: 'select', default: 'none', options: [
        { label: 'None', value: 'none' },
        { label: 'Basic Auth', value: 'basic' },
        { label: 'Header Auth', value: 'header' },
      ]},
    ],
  },
  {
    type: 'schedule',
    category: 'trigger',
    name: 'Schedule Trigger',
    icon: 'mdi:clock-outline',
    color: '#f59e0b',
    description: 'Trigger workflow on a schedule',
    inputs: 0,
    outputs: 1,
    parameters: [
      { key: 'mode', label: 'Trigger Mode', type: 'select', default: 'interval', options: [
        { label: 'Interval', value: 'interval' },
        { label: 'Cron', value: 'cron' },
      ]},
      { key: 'interval', label: 'Interval (minutes)', type: 'number', default: 5 },
      { key: 'cron', label: 'Cron Expression', type: 'string', default: '0 * * * *', placeholder: '0 * * * *' },
    ],
  },
  {
    type: 'manual',
    category: 'trigger',
    name: 'Manual Trigger',
    icon: 'mdi:gesture-tap',
    color: '#f59e0b',
    description: 'Manually trigger workflow',
    inputs: 0,
    outputs: 1,
    parameters: [],
  },
  {
    type: 'http',
    category: 'action',
    name: 'HTTP Request',
    icon: 'mdi:web',
    color: '#3b82f6',
    description: 'Make HTTP requests to any API',
    inputs: 1,
    outputs: 1,
    parameters: [
      { key: 'method', label: 'Method', type: 'select', default: 'GET', options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'PATCH', value: 'PATCH' },
        { label: 'DELETE', value: 'DELETE' },
      ]},
      { key: 'url', label: 'URL', type: 'string', default: '', placeholder: 'https://api.example.com', required: true },
      { key: 'headers', label: 'Headers (JSON)', type: 'json', default: '{}' },
      { key: 'body', label: 'Body', type: 'code', default: '' },
      { key: 'timeout', label: 'Timeout (ms)', type: 'number', default: 30000 },
    ],
  },
  {
    type: 'database',
    category: 'action',
    name: 'Database',
    icon: 'mdi:database',
    color: '#3b82f6',
    description: 'Execute database operations',
    inputs: 1,
    outputs: 1,
    parameters: [
      { key: 'operation', label: 'Operation', type: 'select', default: 'select', options: [
        { label: 'SELECT', value: 'select' },
        { label: 'INSERT', value: 'insert' },
        { label: 'UPDATE', value: 'update' },
        { label: 'DELETE', value: 'delete' },
      ]},
      { key: 'table', label: 'Table', type: 'string', default: '', required: true },
      { key: 'query', label: 'Query/Conditions', type: 'code', default: '' },
    ],
  },
  {
    type: 'email',
    category: 'action',
    name: 'Send Email',
    icon: 'mdi:email',
    color: '#3b82f6',
    description: 'Send emails via SMTP',
    inputs: 1,
    outputs: 1,
    parameters: [
      { key: 'to', label: 'To', type: 'string', default: '', required: true },
      { key: 'subject', label: 'Subject', type: 'string', default: '' },
      { key: 'body', label: 'Body', type: 'code', default: '' },
      { key: 'html', label: 'Is HTML', type: 'boolean', default: false },
    ],
  },
  {
    type: 'if',
    category: 'logic',
    name: 'IF',
    icon: 'mdi:source-branch',
    color: '#8b5cf6',
    description: 'Branch workflow based on condition',
    inputs: 1,
    outputs: 2,
    parameters: [
      { key: 'condition', label: 'Condition', type: 'code', default: 'true', description: 'JavaScript expression that returns true/false' },
    ],
  },
  {
    type: 'switch',
    category: 'logic',
    name: 'Switch',
    icon: 'mdi:call-split',
    color: '#8b5cf6',
    description: 'Route to multiple outputs based on conditions',
    inputs: 1,
    outputs: 4,
    parameters: [
      { key: 'rules', label: 'Rules (JSON)', type: 'json', default: '[]' },
    ],
  },
  {
    type: 'merge',
    category: 'logic',
    name: 'Merge',
    icon: 'mdi:call-merge',
    color: '#8b5cf6',
    description: 'Merge data from multiple inputs',
    inputs: 2,
    outputs: 1,
    parameters: [
      { key: 'mode', label: 'Mode', type: 'select', default: 'append', options: [
        { label: 'Append', value: 'append' },
        { label: 'Merge by Key', value: 'mergeByKey' },
        { label: 'Wait for All', value: 'waitForAll' },
      ]},
    ],
  },
  {
    type: 'loop',
    category: 'logic',
    name: 'Loop',
    icon: 'mdi:repeat',
    color: '#8b5cf6',
    description: 'Iterate over items',
    inputs: 1,
    outputs: 2,
    parameters: [
      { key: 'mode', label: 'Mode', type: 'select', default: 'each', options: [
        { label: 'Each Item', value: 'each' },
        { label: 'Batch', value: 'batch' },
      ]},
      { key: 'batchSize', label: 'Batch Size', type: 'number', default: 10 },
    ],
  },
  {
    type: 'code',
    category: 'transform',
    name: 'Code',
    icon: 'mdi:code-braces',
    color: '#10b981',
    description: 'Execute custom JavaScript code',
    inputs: 1,
    outputs: 1,
    parameters: [
      { key: 'language', label: 'Language', type: 'select', default: 'javascript', options: [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'Python', value: 'python' },
      ]},
      { key: 'code', label: 'Code', type: 'code', default: 'return items.map(item => item);' },
    ],
  },
  {
    type: 'set',
    category: 'transform',
    name: 'Set',
    icon: 'mdi:variable',
    color: '#10b981',
    description: 'Set or modify values',
    inputs: 1,
    outputs: 1,
    parameters: [
      { key: 'values', label: 'Values (JSON)', type: 'json', default: '{}' },
      { key: 'mode', label: 'Mode', type: 'select', default: 'set', options: [
        { label: 'Set', value: 'set' },
        { label: 'Add', value: 'add' },
        { label: 'Remove', value: 'remove' },
      ]},
    ],
  },
  {
    type: 'filter',
    category: 'transform',
    name: 'Filter',
    icon: 'mdi:filter',
    color: '#10b981',
    description: 'Filter items based on conditions',
    inputs: 1,
    outputs: 2,
    parameters: [
      { key: 'condition', label: 'Keep if', type: 'code', default: 'true' },
    ],
  },
  {
    type: 'slack',
    category: 'output',
    name: 'Slack',
    icon: 'mdi:slack',
    color: '#ef4444',
    description: 'Send messages to Slack',
    inputs: 1,
    outputs: 1,
    parameters: [
      { key: 'channel', label: 'Channel', type: 'string', default: '', placeholder: '#general' },
      { key: 'text', label: 'Message', type: 'string', default: '' },
      { key: 'blocks', label: 'Blocks (JSON)', type: 'json', default: '[]' },
    ],
  },
  {
    type: 'discord',
    category: 'output',
    name: 'Discord',
    icon: 'mdi:discord',
    color: '#ef4444',
    description: 'Send messages to Discord',
    inputs: 1,
    outputs: 1,
    parameters: [
      { key: 'webhook', label: 'Webhook URL', type: 'string', default: '' },
      { key: 'content', label: 'Content', type: 'string', default: '' },
      { key: 'embeds', label: 'Embeds (JSON)', type: 'json', default: '[]' },
    ],
  },
  {
    type: 'sheets',
    category: 'output',
    name: 'Google Sheets',
    icon: 'mdi:google-spreadsheet',
    color: '#ef4444',
    description: 'Read/write Google Sheets',
    inputs: 1,
    outputs: 1,
    parameters: [
      { key: 'spreadsheetId', label: 'Spreadsheet ID', type: 'string', default: '' },
      { key: 'range', label: 'Range', type: 'string', default: 'Sheet1!A1' },
      { key: 'operation', label: 'Operation', type: 'select', default: 'append', options: [
        { label: 'Append', value: 'append' },
        { label: 'Update', value: 'update' },
        { label: 'Read', value: 'read' },
      ]},
    ],
  },
  {
    type: 'webhook-response',
    category: 'output',
    name: 'Respond to Webhook',
    icon: 'mdi:reply',
    color: '#ef4444',
    description: 'Respond to webhook trigger',
    inputs: 1,
    outputs: 0,
    parameters: [
      { key: 'statusCode', label: 'Status Code', type: 'number', default: 200 },
      { key: 'headers', label: 'Headers (JSON)', type: 'json', default: '{}' },
      { key: 'body', label: 'Response Body', type: 'code', default: '{}' },
    ],
  },
  {
    type: 'noop',
    category: 'transform',
    name: 'No-op',
    icon: 'mdi:checkbox-blank-circle-outline',
    color: '#6b7280',
    description: 'Pass data through unchanged',
    inputs: 1,
    outputs: 1,
    parameters: [],
  },
];

export function getNodeTypeDefinition(type: string): NodeTypeDefinition | undefined {
  return NODE_CATALOG.find(n => n.type === type);
}

export function createNode(type: string, position: Position): WorkflowNode {
  const def = getNodeTypeDefinition(type);
  if (!def) throw new Error(`Unknown node type: ${type}`);
  
  const parameters: Record<string, any> = {};
  for (const param of def.parameters) {
    parameters[param.key] = param.default;
  }
  
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    name: def.name,
    position,
    status: 'idle',
    parameters,
    data: [],
  };
}

export function validateConnection(
  sourceNode: WorkflowNode,
  targetNode: WorkflowNode,
  sourceDef: NodeTypeDefinition,
  targetDef: NodeTypeDefinition,
  existingConnections: Connection[]
): { valid: boolean; error?: string } {
  if (sourceNode.id === targetNode.id) {
    return { valid: false, error: 'Cannot connect node to itself' };
  }
  
  const alreadyConnected = existingConnections.some(
    c => c.sourceNodeId === sourceNode.id && c.targetNodeId === targetNode.id
  );
  if (alreadyConnected) {
    return { valid: false, error: 'Nodes already connected' };
  }
  
  const sourceOutputCount = sourceDef.outputs;
  const targetInputCount = targetDef.inputs;
  
  if (sourceOutputCount === 0) {
    return { valid: false, error: 'Source node has no outputs' };
  }
  if (targetInputCount === 0) {
    return { valid: false, error: 'Target node has no inputs' };
  }
  
  return { valid: true };
}
