import { createSignal, createRoot, createStore, produce, SetStoreFunction } from 'solid-js/store';
import { 
  Workflow, WorkflowNode, Connection, CanvasState, HistoryState,
  WorkflowExecution, ExecutionLog, DEFAULT_WORKFLOW_SETTINGS,
  createNode, getNodeTypeDefinition, validateConnection, NodeStatus
} from './types';

function createWorkflowStore() {
  const [workflow, setWorkflow] = createStore<Workflow>({
    id: `wf-${Date.now()}`,
    name: 'New Workflow',
    description: '',
    nodes: [],
    connections: [],
    variables: {},
    settings: DEFAULT_WORKFLOW_SETTINGS,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1,
  });

  const [canvas, setCanvas] = createStore<CanvasState>({
    zoom: 1,
    offset: { x: 400, y: 200 },
    selectedNodeIds: new Set<string>(),
    selectedConnectionIds: new Set<string>(),
    isDragging: false,
    isConnecting: false,
    connectingFrom: null,
    connectingTo: null,
    selectionBox: null,
    readOnly: false,
  });

  const [execution, setExecution] = createSignal<WorkflowExecution | null>(null);

  const [history, setHistory] = createStore<{
    past: HistoryState[];
    future: HistoryState[];
  }>({
    past: [],
    future: [],
  });

  const saveHistory = () => {
    setHistory(produce(h => {
      h.past.push({
        nodes: [...workflow.nodes],
        connections: [...workflow.connections],
      });
      if (h.past.length > 50) h.past.shift();
      h.future = [];
    }));
  };

  const undo = () => {
    if (history.past.length === 0) return;
    const previous = history.past[history.past.length - 1];
    setHistory(produce(h => {
      h.past.pop();
      h.future.unshift({
        nodes: [...workflow.nodes],
        connections: [...workflow.connections],
      });
    }));
    setWorkflow(produce(w => {
      w.nodes = previous.nodes;
      w.connections = previous.connections;
      w.updatedAt = Date.now();
    }));
  };

  const redo = () => {
    if (history.future.length === 0) return;
    const next = history.future[0];
    setHistory(produce(h => {
      h.future.shift();
      h.past.push({
        nodes: [...workflow.nodes],
        connections: [...workflow.connections],
      });
    }));
    setWorkflow(produce(w => {
      w.nodes = next.nodes;
      w.connections = next.connections;
      w.updatedAt = Date.now();
    }));
  };

  const addNode = (type: string, position: { x: number; y: number }) => {
    saveHistory();
    const node = createNode(type, position);
    setWorkflow(produce(w => {
      w.nodes.push(node);
      w.updatedAt = Date.now();
    }));
    return node;
  };

  const updateNode = (id: string, updates: Partial<WorkflowNode>) => {
    setWorkflow(produce(w => {
      const idx = w.nodes.findIndex(n => n.id === id);
      if (idx !== -1) {
        w.nodes[idx] = { ...w.nodes[idx], ...updates };
        w.updatedAt = Date.now();
      }
    }));
  };

  const updateNodePosition = (id: string, position: { x: number; y: number }) => {
    setWorkflow(produce(w => {
      const node = w.nodes.find(n => n.id === id);
      if (node) {
        node.position = position;
      }
    }));
  };

  const deleteNode = (id: string) => {
    saveHistory();
    setWorkflow(produce(w => {
      w.nodes = w.nodes.filter(n => n.id !== id);
      w.connections = w.connections.filter(c => c.sourceNodeId !== id && c.targetNodeId !== id);
      w.updatedAt = Date.now();
    }));
    setCanvas(produce(c => {
      c.selectedNodeIds.delete(id);
    }));
  };

  const deleteNodes = (ids: string[]) => {
    saveHistory();
    setWorkflow(produce(w => {
      w.nodes = w.nodes.filter(n => !ids.includes(n.id));
      w.connections = w.connections.filter(c => 
        !ids.includes(c.sourceNodeId) && !ids.includes(c.targetNodeId)
      );
      w.updatedAt = Date.now();
    }));
    setCanvas(produce(c => {
      ids.forEach(id => c.selectedNodeIds.delete(id));
    }));
  };

  const duplicateNode = (id: string) => {
    const node = workflow.nodes.find(n => n.id === id);
    if (!node) return null;
    saveHistory();
    const newNode: WorkflowNode = {
      ...node,
      id: `${node.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      position: { x: node.position.x + 50, y: node.position.y + 50 },
      status: 'idle',
      data: [],
    };
    setWorkflow(produce(w => {
      w.nodes.push(newNode);
      w.updatedAt = Date.now();
    }));
    return newNode;
  };

  const addConnection = (
    sourceNodeId: string,
    sourceOutputIndex: number,
    targetNodeId: string,
    targetInputIndex: number
  ): { success: boolean; error?: string; connection?: Connection } => {
    const sourceNode = workflow.nodes.find(n => n.id === sourceNodeId);
    const targetNode = workflow.nodes.find(n => n.id === targetNodeId);
    if (!sourceNode || !targetNode) {
      return { success: false, error: 'Node not found' };
    }

    const sourceDef = getNodeTypeDefinition(sourceNode.type);
    const targetDef = getNodeTypeDefinition(targetNode.type);
    if (!sourceDef || !targetDef) {
      return { success: false, error: 'Node type not found' };
    }

    const validation = validateConnection(sourceNode, targetNode, sourceDef, targetDef, workflow.connections);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    saveHistory();
    const connection: Connection = {
      id: `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sourceNodeId,
      sourceOutputIndex,
      targetNodeId,
      targetInputIndex,
    };
    setWorkflow(produce(w => {
      w.connections.push(connection);
      w.updatedAt = Date.now();
    }));
    return { success: true, connection };
  };

  const deleteConnection = (id: string) => {
    saveHistory();
    setWorkflow(produce(w => {
      w.connections = w.connections.filter(c => c.id !== id);
      w.updatedAt = Date.now();
    }));
    setCanvas(produce(c => {
      c.selectedConnectionIds.delete(id);
    }));
  };

  const selectNode = (id: string, additive = false) => {
    setCanvas(produce(c => {
      if (!additive) {
        c.selectedNodeIds = new Set([id]);
        c.selectedConnectionIds = new Set();
      } else {
        if (c.selectedNodeIds.has(id)) {
          c.selectedNodeIds.delete(id);
        } else {
          c.selectedNodeIds.add(id);
        }
      }
    }));
  };

  const selectNodes = (ids: string[]) => {
    setCanvas(produce(c => {
      c.selectedNodeIds = new Set(ids);
      c.selectedConnectionIds = new Set();
    }));
  };

  const clearSelection = () => {
    setCanvas(produce(c => {
      c.selectedNodeIds = new Set();
      c.selectedConnectionIds = new Set();
    }));
  };

  const selectAll = () => {
    setCanvas(produce(c => {
      c.selectedNodeIds = new Set(workflow.nodes.map(n => n.id));
    }));
  };

  const setZoom = (zoom: number) => {
    setCanvas(produce(c => {
      c.zoom = Math.max(0.1, Math.min(3, zoom));
    }));
  };

  const setOffset = (offset: { x: number; y: number }) => {
    setCanvas(produce(c => {
      c.offset = offset;
    }));
  };

  const resetView = () => {
    setCanvas(produce(c => {
      c.zoom = 1;
      c.offset = { x: 400, y: 200 };
    }));
  };

  const fitToScreen = (containerWidth: number, containerHeight: number, padding = 100) => {
    if (workflow.nodes.length === 0) {
      resetView();
      return;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const node of workflow.nodes) {
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + 100);
      maxY = Math.max(maxY, node.position.y + 100);
    }

    const contentWidth = maxX - minX + padding * 2;
    const contentHeight = maxY - minY + padding * 2;

    const zoom = Math.min(
      containerWidth / contentWidth,
      containerHeight / contentHeight,
      1.5
    );

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    setCanvas(produce(c => {
      c.zoom = zoom;
      c.offset = {
        x: containerWidth / 2 - centerX * zoom,
        y: containerHeight / 2 - centerY * zoom,
      };
    }));
  };

  const startConnecting = (nodeId: string, outputIndex: number) => {
    setCanvas(produce(c => {
      c.isConnecting = true;
      c.connectingFrom = { nodeId, outputIndex };
    }));
  };

  const updateConnectingPosition = (position: { x: number; y: number }) => {
    setCanvas(produce(c => {
      c.connectingTo = position;
    }));
  };

  const endConnecting = () => {
    setCanvas(produce(c => {
      c.isConnecting = false;
      c.connectingFrom = null;
      c.connectingTo = null;
    }));
  };

  const executeWorkflow = async () => {
    const execId = `exec-${Date.now()}`;
    const now = Date.now();
    
    setExecution({
      id: execId,
      workflowId: workflow.id,
      status: 'running',
      startedAt: now,
      logs: [],
    });

    setWorkflow(produce(w => {
      for (const node of w.nodes) {
        node.status = 'idle';
        node.data = [];
        node.error = undefined;
      }
    }));

    const triggers = workflow.nodes.filter(n => {
      const def = getNodeTypeDefinition(n.type);
      return def?.category === 'trigger';
    });

    for (const trigger of triggers) {
      await executeFromNode(trigger.id, []);
    }

    setExecution(prev => prev ? { ...prev, status: 'completed', completedAt: Date.now() } : null);
  };

  const executeFromNode = async (nodeId: string, input: any[]) => {
    const node = workflow.nodes.find(n => n.id === nodeId);
    if (!node || node.disabled) return;

    const def = getNodeTypeDefinition(node.type);
    if (!def) return;

    const startTime = Date.now();
    updateNode(nodeId, { status: 'running' });

    setExecution(prev => prev ? { ...prev, currentNodeId: nodeId } : null);

    await new Promise(r => setTimeout(r, 300 + Math.random() * 700));

    try {
      let output: any[] = [];
      
      switch (node.type) {
        case 'code':
          try {
            const fn = new Function('items', 'variables', node.parameters.code || 'return items;');
            output = fn(input, workflow.variables);
            if (!Array.isArray(output)) output = [output];
          } catch (e: any) {
            throw new Error(`Code execution failed: ${e.message}`);
          }
          break;
        case 'if':
          try {
            const fn = new Function('items', 'variables', `return ${node.parameters.condition || 'true'};`);
            const result = fn(input, workflow.variables);
            output = input.map(item => ({ ...item, conditionResult: result }));
          } catch (e: any) {
            throw new Error(`Condition evaluation failed: ${e.message}`);
          }
          break;
        case 'set':
          output = input.map(item => ({ ...item, ...node.parameters.values }));
          break;
        case 'filter':
          try {
            const fn = new Function('item', 'variables', `return ${node.parameters.condition || 'true'};`);
            output = input.filter(item => fn(item, workflow.variables));
          } catch (e: any) {
            throw new Error(`Filter evaluation failed: ${e.message}`);
          }
          break;
        case 'http':
          output = [{ json: { simulated: true, url: node.parameters.url, method: node.parameters.method } }];
          break;
        case 'database':
          output = [{ json: { simulated: true, table: node.parameters.table, operation: node.parameters.operation } }];
          break;
        default:
          output = [...input, { json: { processedBy: node.name, nodeId: node.id, timestamp: Date.now() } }];
      }

      updateNode(nodeId, { status: 'success', data: output });

      const log: ExecutionLog = {
        id: `log-${Date.now()}`,
        nodeId,
        timestamp: Date.now(),
        status: 'success',
        input,
        output,
        duration: Date.now() - startTime,
      };
      setExecution(prev => prev ? { ...prev, logs: [...prev.logs, log] } : null);

      const outgoingConnections = workflow.connections.filter(c => c.sourceNodeId === nodeId);
      
      for (const conn of outgoingConnections) {
        if (node.type === 'if' && conn.sourceOutputIndex === 1) {
          const shouldFollow = output.some(o => o.conditionResult === false);
          if (!shouldFollow) continue;
        } else if (node.type === 'if' && conn.sourceOutputIndex === 0) {
          const shouldFollow = output.some(o => o.conditionResult === true);
          if (!shouldFollow) continue;
        }
        
        const targetNode = workflow.nodes.find(n => n.id === conn.targetNodeId);
        if (targetNode) {
          await executeFromNode(targetNode.id, output);
        }
      }
    } catch (error: any) {
      updateNode(nodeId, { status: 'error', error: error.message });
      
      const log: ExecutionLog = {
        id: `log-${Date.now()}`,
        nodeId,
        timestamp: Date.now(),
        status: 'error',
        input,
        error: error.message,
        duration: Date.now() - startTime,
      };
      setExecution(prev => prev ? { ...prev, logs: [...prev.logs, log] } : null);
    }
  };

  const stopExecution = () => {
    setExecution(prev => prev ? { ...prev, status: 'cancelled', completedAt: Date.now() } : null);
    setWorkflow(produce(w => {
      for (const node of w.nodes) {
        if (node.status === 'running') {
          node.status = 'idle';
        }
      }
    }));
  };

  const loadWorkflow = (data: Workflow) => {
    setWorkflow(data);
    setHistory({ past: [], future: [] });
    setCanvas(produce(c => {
      c.selectedNodeIds = new Set();
      c.selectedConnectionIds = new Set();
    }));
    setExecution(null);
  };

  const updateWorkflowMeta = (updates: Partial<Pick<Workflow, 'name' | 'description' | 'tags'>>) => {
    setWorkflow(produce(w => {
      Object.assign(w, updates);
      w.updatedAt = Date.now();
    }));
  };

  const updateWorkflowSettings = (settings: Partial<Workflow['settings']>) => {
    setWorkflow(produce(w => {
      Object.assign(w.settings, settings);
      w.updatedAt = Date.now();
    }));
  };

  const setVariable = (key: string, value: any) => {
    setWorkflow(produce(w => {
      w.variables[key] = value;
    }));
  };

  const deleteVariable = (key: string) => {
    setWorkflow(produce(w => {
      delete w.variables[key];
    }));
  };

  const toggleReadOnly = () => {
    setCanvas(produce(c => {
      c.readOnly = !c.readOnly;
    }));
  };

  return {
    workflow,
    setWorkflow,
    canvas,
    setCanvas,
    execution: execution,
    
    history,
    undo,
    redo,
    canUndo: () => history.past.length > 0,
    canRedo: () => history.future.length > 0,
    
    addNode,
    updateNode,
    updateNodePosition,
    deleteNode,
    deleteNodes,
    duplicateNode,
    
    addConnection,
    deleteConnection,
    
    selectNode,
    selectNodes,
    clearSelection,
    selectAll,
    
    setZoom,
    setOffset,
    resetView,
    fitToScreen,
    
    startConnecting,
    updateConnectingPosition,
    endConnecting,
    
    executeWorkflow,
    stopExecution,
    
    loadWorkflow,
    updateWorkflowMeta,
    updateWorkflowSettings,
    
    setVariable,
    deleteVariable,
    
    toggleReadOnly,
  };
}

export type WorkflowStore = ReturnType<typeof createWorkflowStore>;

const WorkflowContext = createRoot(createWorkflowStore);
export default WorkflowContext;
