import { getNodeTypeDefinition } from './types';
import { Position } from './types';

let nodeIdCounter = 0;

export function createNode(type: string, position: Position): WorkflowNode {
  const def = getNodeTypeDefinition(type);
  if (!def) throw new Error(`Unknown node type: ${type}`);
  
  const parameters: Record<string, any> = {};
  for (const param of def.parameters) {
    parameters[param.key] = param.default;
  }
  
  return {
    id: `${type}-${nodeIdCounter++}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    name: def.name,
    position,
    status: 'idle',
    parameters,
    data: [],
  };
}