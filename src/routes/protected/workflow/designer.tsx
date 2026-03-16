import { createSignal, onMount, Show } from 'solid-js';
import { useSearchParams, useNavigate } from '@solidjs/router';
import { WorkflowDesigner } from '~/components/workflow';
import { createStore, produce } from 'solid-js/store';
import { Workflow, DEFAULT_WORKFLOW_SETTINGS, createNode, getNodeTypeDefinition, NodeStatus } from '~/lib/workflow/types';
import { Icon } from '@iconify-icon/solid';
import { ICON_EXCLAMATION_TRIANGLE } from '~/lib/icons';

const STORAGE_KEY = 'workflows';

function loadWorkflowFromStorage(id: string): Workflow | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const workflows: Workflow[] = data ? JSON.parse(data) : [];
    return workflows.find(w => w.id === id) || null;
  } catch {
    return null;
  }
}

function saveWorkflowToStorage(workflow: Workflow) {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const workflows: Workflow[] = data ? JSON.parse(data) : [];
    const index = workflows.findIndex(w => w.id === workflow.id);
    const updated = { ...workflow, updatedAt: Date.now() };
    if (index !== -1) {
      workflows[index] = updated;
    } else {
      workflows.push(updated);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workflows));
    return true;
  } catch {
    return false;
  }
}

interface CanvasState {
  zoom: number;
  offset: { x: number; y: number };
  selectedNodeIds: Set<string>;
  selectedConnectionIds: Set<string>;
  isDragging: boolean;
  isConnecting: boolean;
  connectingFrom: { nodeId: string; outputIndex: number } | null;
  connectingTo: { x: number; y: number } | null;
  selectionBox: { start: Position; end: Position } | null;
  readOnly: boolean;
}

interface Position { x: number; y: number; }

interface HistoryState {
  nodes: Workflow['nodes'];
  connections: Workflow['connections'];
}

function createWorkflowStore(initialWorkflow?: Workflow) {
  const [workflow, setWorkflow] = createStore<Workflow>(initialWorkflow || {
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

  const [execution, setExecution] = createSignal<{
    id: string;
    workflowId: string;
    status: 'idle' | 'running' | 'completed' | 'failed' | 'cancelled';
    startedAt: number;
    completedAt?: number;
    logs: any[];
    currentNodeId?: string;
  } | null>(null);

  const [history, setHistory] = createStore<{
    past: HistoryState[];
    future: HistoryState[];
  }>({
    past: [],
    future: [],
  });

  const saveHistory = () => {
    setHistory(produce(h => {
      h.past.push({ nodes: [...workflow.nodes], connections: [...workflow.connections] });
      if (h.past.length > 50) h.past.shift();
      h.future = [];
    }));
  };

  const addNode = (type: string, position: { x: number; y: number }) => {
    saveHistory();
    const node = createNode(type, position);
    setWorkflow(produce(w => { w.nodes.push(node); }));
    return node;
  };

  const updateNode = (id: string, updates: Partial<Workflow['nodes'][0]>) => {
    setWorkflow(produce(w => {
      const idx = w.nodes.findIndex(n => n.id === id);
      if (idx !== -1) Object.assign(w.nodes[idx], updates);
    }));
  };

  const updateNodePosition = (id: string, position: { x: number; y: number }) => {
    setWorkflow(produce(w => {
      const node = w.nodes.find(n => n.id === id);
      if (node) node.position = position;
    }));
  };

  const deleteNode = (id: string) => {
    saveHistory();
    setWorkflow(produce(w => {
      w.nodes = w.nodes.filter(n => n.id !== id);
      w.connections = w.connections.filter(c => c.sourceNodeId !== id && c.targetNodeId !== id);
    }));
    setCanvas(produce(c => { c.selectedNodeIds.delete(id); }));
  };

  const deleteNodes = (ids: string[]) => {
    saveHistory();
    setWorkflow(produce(w => {
      w.nodes = w.nodes.filter(n => !ids.includes(n.id));
      w.connections = w.connections.filter(c => !ids.includes(c.sourceNodeId) && !ids.includes(c.targetNodeId));
    }));
    setCanvas(produce(c => { ids.forEach(id => c.selectedNodeIds.delete(id)); }));
  };

  const duplicateNode = (id: string) => {
    const node = workflow.nodes.find(n => n.id === id);
    if (!node) return null;
    saveHistory();
    const newNode = {
      ...node,
      id: `${node.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      position: { x: node.position.x + 50, y: node.position.y + 50 },
      status: 'idle' as NodeStatus,
      data: [],
    };
    setWorkflow(produce(w => { w.nodes.push(newNode); }));
    return newNode;
  };

  const addConnection = (sourceNodeId: string, sourceOutputIndex: number, targetNodeId: string, targetInputIndex: number) => {
    if (sourceNodeId === targetNodeId) return { success: false, error: 'Cannot connect to self' };
    if (workflow.connections.some(c => c.sourceNodeId === sourceNodeId && c.targetNodeId === targetNodeId)) {
      return { success: false, error: 'Already connected' };
    }
    saveHistory();
    const connection = {
      id: `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sourceNodeId,
      sourceOutputIndex,
      targetNodeId,
      targetInputIndex,
    };
    setWorkflow(produce(w => { w.connections.push(connection); }));
    return { success: true, connection };
  };

  const deleteConnection = (id: string) => {
    saveHistory();
    setWorkflow(produce(w => { w.connections = w.connections.filter(c => c.id !== id); }));
    setCanvas(produce(c => { c.selectedConnectionIds.delete(id); }));
  };

  const selectNode = (id: string, additive = false) => {
    setCanvas(produce(c => {
      if (!additive) {
        c.selectedNodeIds = new Set([id]);
        c.selectedConnectionIds = new Set();
      } else {
        if (c.selectedNodeIds.has(id)) c.selectedNodeIds.delete(id);
        else c.selectedNodeIds.add(id);
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
    setCanvas(produce(c => { c.selectedNodeIds = new Set(workflow.nodes.map(n => n.id)); }));
  };

  const setZoom = (zoom: number) => setCanvas('zoom', Math.max(0.1, Math.min(3, zoom)));
  const setOffset = (offset: { x: number; y: number }) => setCanvas('offset', offset);
  const resetView = () => {
    setCanvas('zoom', 1);
    setCanvas('offset', { x: 400, y: 200 });
  };

  const fitToScreen = (containerWidth: number, containerHeight: number) => {
    if (workflow.nodes.length === 0) { resetView(); return; }
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const node of workflow.nodes) {
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + 100);
      maxY = Math.max(maxY, node.position.y + 100);
    }
    const contentWidth = maxX - minX + 200;
    const contentHeight = maxY - minY + 200;
    const zoom = Math.min(containerWidth / contentWidth, containerHeight / contentHeight, 1.5);
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    setCanvas('zoom', zoom);
    setCanvas('offset', { x: containerWidth / 2 - centerX * zoom, y: containerHeight / 2 - centerY * zoom });
  };

  const startConnecting = (nodeId: string, outputIndex: number) => {
    setCanvas(produce(c => { c.isConnecting = true; c.connectingFrom = { nodeId, outputIndex }; }));
  };

  const updateConnectingPosition = (pos: { x: number; y: number }) => setCanvas('connectingTo', pos);

  const endConnecting = () => {
    setCanvas(produce(c => { c.isConnecting = false; c.connectingFrom = null; c.connectingTo = null; }));
  };

  const executeWorkflow = async () => {
    setExecution({
      id: `exec-${Date.now()}`,
      workflowId: workflow.id,
      status: 'running',
      startedAt: Date.now(),
      logs: [],
    });

    setWorkflow(produce(w => {
      for (const node of w.nodes) {
        node.status = 'idle';
        node.data = [];
        node.error = undefined;
      }
    }));

    const triggers = workflow.nodes.filter(n => getNodeTypeDefinition(n.type)?.category === 'trigger');
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
        default:
          output = [...input, { json: { processedBy: node.name, nodeId: node.id, timestamp: Date.now() } }];
      }
      updateNode(nodeId, { status: 'success', data: output });

      const outgoingConnections = workflow.connections.filter(c => c.sourceNodeId === nodeId);
      for (const conn of outgoingConnections) {
        const targetNode = workflow.nodes.find(n => n.id === conn.targetNodeId);
        if (targetNode) await executeFromNode(targetNode.id, output);
      }
    } catch (error: any) {
      updateNode(nodeId, { status: 'error', error: error.message });
    }
  };

  const stopExecution = () => {
    setExecution(prev => prev ? { ...prev, status: 'cancelled', completedAt: Date.now() } : null);
    setWorkflow(produce(w => {
      for (const node of w.nodes) {
        if (node.status === 'running') node.status = 'idle';
      }
    }));
  };

  const loadWorkflowData = (data: Workflow) => {
    setWorkflow(data);
    setHistory({ past: [], future: [] });
    setCanvas(produce(c => { c.selectedNodeIds = new Set(); c.selectedConnectionIds = new Set(); }));
    setExecution(null);
  };

  const updateWorkflowMeta = (updates: Partial<Pick<Workflow, 'name' | 'description' | 'tags'>>) => {
    setWorkflow(produce(w => Object.assign(w, updates)));
  };

  const updateWorkflowSettings = (settings: Partial<Workflow['settings']>) => {
    setWorkflow(produce(w => Object.assign(w.settings, settings)));
  };

  const toggleReadOnly = () => setCanvas(produce(c => { c.readOnly = !c.readOnly; }));

  const undo = () => {
    if (history.past.length === 0) return;
    const previous = history.past[history.past.length - 1];
    setHistory(produce(h => { h.past.pop(); h.future.unshift({ nodes: [...workflow.nodes], connections: [...workflow.connections] }); }));
    setWorkflow(produce(w => { w.nodes = previous.nodes; w.connections = previous.connections; }));
  };

  const redo = () => {
    if (history.future.length === 0) return;
    const next = history.future[0];
    setHistory(produce(h => { h.future.shift(); h.past.push({ nodes: [...workflow.nodes], connections: [...workflow.connections] }); }));
    setWorkflow(produce(w => { w.nodes = next.nodes; w.connections = next.connections; }));
  };

  return {
    workflow, setWorkflow, canvas, setCanvas, execution, history, saveHistory,
    undo, redo, canUndo: () => history.past.length > 0, canRedo: () => history.future.length > 0,
    addNode, updateNode, updateNodePosition, deleteNode, deleteNodes, duplicateNode,
    addConnection, deleteConnection, selectNode, selectNodes, clearSelection, selectAll,
    setZoom, setOffset, resetView, fitToScreen, startConnecting, updateConnectingPosition, endConnecting,
    executeWorkflow, stopExecution, loadWorkflow: loadWorkflowData,
    updateWorkflowMeta, updateWorkflowSettings, toggleReadOnly,
  };
}

export type WorkflowStore = ReturnType<typeof createWorkflowStore>;

export default function WorkflowDesignerPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [store, setStore] = createSignal<WorkflowStore | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  onMount(() => {
    const workflowId = searchParams.id;
    if (workflowId) {
      const loadedWorkflow = loadWorkflowFromStorage(workflowId);
      if (loadedWorkflow) {
        setStore(createWorkflowStore(loadedWorkflow));
      } else {
        setError('Workflow not found');
      }
    } else {
      setStore(createWorkflowStore());
    }
    setLoading(false);
  });

  const handleSave = (workflow: Workflow) => {
    saveWorkflowToStorage(workflow);
  };

  return (
    <div class="h-screen bg-[#0a0d14]">
      <Show when={loading()}>
        <div class="flex items-center justify-center h-screen">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </Show>
      <Show when={error()}>
        <div class="flex flex-col items-center justify-center h-screen">
          <div class="text-center">
            <div class="w-16 h-16 rounded-2xl bg-rose-500/20 flex items-center justify-center mx-auto mb-4">
              <Icon icon={ICON_EXCLAMATION_TRIANGLE} class="text-rose-400" width={32} />
            </div>
            <h2 class="text-xl font-bold text-white mb-2">{error()}</h2>
            <p class="text-slate-400 mb-6">The workflow you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/workflow')} class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg">
              Back to Workflows
            </button>
          </div>
        </div>
      </Show>
      <Show when={store() && !loading()}>
        <WorkflowDesigner store={store()!} onSave={handleSave} />
      </Show>
    </div>
  );
}
