import { createSignal, Show, createMemo, onMount, createEffect } from 'solid-js';
import { WorkflowCanvas } from './WorkflowCanvas';
import { NodePalette } from './NodePalette';
import { NodeProperties } from './NodeProperties';
import { WorkflowToolbar } from './WorkflowToolbar';
import { WorkflowStore } from '~/lib/workflow/store';
import { ICON_COG, ICON_X_MARK, ICON_LIST, ICON_PLAY, ICON_CHECK_CIRCLE, ICON_X_MARK as ICON_ERROR, ICON_CLOCK } from '~/lib/icons';
import { Icon } from '@iconify-icon/solid';
import { TextField } from '~/components/input/TextField';
import { TextArea } from '~/components/input/TextArea';
import { Toggle } from '~/components/input/Toggle';

interface WorkflowDesignerProps {
  store: WorkflowStore;
  onSave?: (workflow: typeof store.workflow) => void;
  onLoad?: () => typeof store.workflow | null;
}

function SettingsPanel(props: {
  isOpen: boolean;
  onClose: () => void;
  store: WorkflowStore;
}) {
  const { workflow, updateWorkflowMeta, updateWorkflowSettings } = props.store;

  return (
    <Show when={props.isOpen}>
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center" onClick={props.onClose}>
        <div class="w-[500px] max-h-[80vh] bg-[#12161f] rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden animate-scale-in" onClick={e => e.stopPropagation()}>
          <div class="flex items-center justify-between p-4 border-b border-slate-700/50">
            <h3 class="text-sm font-bold text-white uppercase tracking-wide">Workflow Settings</h3>
            <button onClick={props.onClose} class="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white">
              <Icon icon={ICON_X_MARK} width={16} />
            </button>
          </div>

          <div class="p-6 space-y-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
            <div class="space-y-4">
              <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400">General</h4>
              <TextField
                label="Workflow Name"
                value={workflow.name}
                onInput={(v) => updateWorkflowMeta({ name: v })}
              />
              <TextArea
                label="Description"
                value={workflow.description ?? ''}
                placeholder="Describe what this workflow does..."
                onChange={(v) => updateWorkflowMeta({ description: v })}
                rows={3}
              />
              <TextField
                label="Tags (comma separated)"
                value={(workflow.tags ?? []).join(', ')}
                onInput={(v) => updateWorkflowMeta({ tags: v.split(',').map(t => t.trim()).filter(Boolean) })}
              />
            </div>

            <div class="space-y-4 pt-4 border-t border-slate-700/50">
              <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400">Execution</h4>
              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-300">Timezone</span>
                <select
                  value={workflow.settings.timezone}
                  onChange={(e) => updateWorkflowSettings({ timezone: e.currentTarget.value })}
                  class="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white outline-none"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="America/Los_Angeles">America/Los_Angeles</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                  <option value="Asia/Shanghai">Asia/Shanghai</option>
                  <option value="Asia/Singapore">Asia/Singapore</option>
                </select>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-300">Execution Timeout (seconds)</span>
                <input
                  type="number"
                  value={workflow.settings.executionTimeout}
                  onChange={(e) => updateWorkflowSettings({ executionTimeout: Number(e.currentTarget.value) })}
                  class="w-24 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white outline-none"
                />
              </div>
              <Toggle
                label="Save Manual Executions"
                checked={workflow.settings.saveManualExecutions}
                onChange={(v) => updateWorkflowSettings({ saveManualExecutions: v })}
              />
              <Toggle
                label="Save Execution Progress"
                checked={workflow.settings.saveExecutionProgress}
                onChange={(v) => updateWorkflowSettings({ saveExecutionProgress: v })}
              />
            </div>

            <div class="space-y-4 pt-4 border-t border-slate-700/50">
              <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400">Error Handling</h4>
              <Toggle
                label="Retry on Failure"
                checked={workflow.settings.retryOnFail}
                onChange={(v) => updateWorkflowSettings({ retryOnFail: v })}
              />
              <Show when={workflow.settings.retryOnFail}>
                <div class="grid grid-cols-2 gap-4 pl-4">
                  <div>
                    <label class="text-xs text-slate-400 block mb-1">Max Tries</label>
                    <input
                      type="number"
                      value={workflow.settings.maxTries}
                      onChange={(e) => updateWorkflowSettings({ maxTries: Number(e.currentTarget.value) })}
                      class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white outline-none"
                    />
                  </div>
                  <div>
                    <label class="text-xs text-slate-400 block mb-1">Wait Between Tries (ms)</label>
                    <input
                      type="number"
                      value={workflow.settings.waitBetweenTries}
                      onChange={(e) => updateWorkflowSettings({ waitBetweenTries: Number(e.currentTarget.value) })}
                      class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white outline-none"
                    />
                  </div>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}

function ExecutionPanel(props: {
  isOpen: boolean;
  onClose: () => void;
  store: WorkflowStore;
}) {
  const { execution } = props.store;

  const statusConfig = () => {
    const status = execution()?.status;
    switch (status) {
      case 'running': return { color: 'text-blue-400', bg: 'bg-blue-500/20', label: 'Running' };
      case 'completed': return { color: 'text-emerald-400', bg: 'bg-emerald-500/20', label: 'Completed' };
      case 'failed': return { color: 'text-rose-400', bg: 'bg-rose-500/20', label: 'Failed' };
      case 'cancelled': return { color: 'text-amber-400', bg: 'bg-amber-500/20', label: 'Cancelled' };
      default: return { color: 'text-slate-400', bg: 'bg-slate-500/20', label: 'Idle' };
    }
  };

  return (
    <Show when={props.isOpen}>
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center" onClick={props.onClose}>
        <div class="w-[600px] max-h-[80vh] bg-[#12161f] rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden animate-scale-in" onClick={e => e.stopPropagation()}>
          <div class="flex items-center justify-between p-4 border-b border-slate-700/50">
            <div class="flex items-center gap-3">
              <h3 class="text-sm font-bold text-white uppercase tracking-wide">Execution History</h3>
              <Show when={execution()}>
                <span class={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusConfig().bg} ${statusConfig().color}`}>
                  {statusConfig().label}
                </span>
              </Show>
            </div>
            <button onClick={props.onClose} class="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white">
              <Icon icon={ICON_X_MARK} width={16} />
            </button>
          </div>

          <div class="p-4 overflow-y-auto max-h-[60vh] custom-scrollbar">
            <Show when={execution()} fallback={
              <div class="text-center py-12">
                <div class="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                  <Icon icon={ICON_CLOCK} class="text-slate-600" width={28} />
                </div>
                <p class="text-slate-500 text-sm">No execution yet</p>
                <p class="text-slate-600 text-xs mt-1">Run the workflow to see execution history</p>
              </div>
            }>
              <div class="space-y-3">
                <For each={execution()!.logs}>
                  {(log) => {
                    const node = props.store.workflow.nodes.find(n => n.id === log.nodeId);
                    return (
                      <div class="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                        <div class="flex items-center justify-between mb-2">
                          <span class="text-sm font-bold text-white">{node?.name ?? log.nodeId}</span>
                          <span class={`text-[10px] font-bold uppercase ${log.status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {log.status}
                          </span>
                        </div>
                        <div class="text-xs text-slate-500">
                          Duration: {log.duration}ms • {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                        <Show when={log.output}>
                          <pre class="mt-2 p-2 bg-slate-900/50 rounded-lg text-[10px] text-emerald-400/80 overflow-x-auto">
                            {JSON.stringify(log.output, null, 2)}
                          </pre>
                        </Show>
                        <Show when={log.error}>
                          <div class="mt-2 p-2 bg-rose-500/10 rounded-lg text-[10px] text-rose-400">
                            {log.error}
                          </div>
                        </Show>
                      </div>
                    );
                  }}
                </For>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </Show>
  );
}

export function WorkflowDesigner(props: WorkflowDesignerProps) {
  const store = props.store;
  const { workflow, canvas, addNode, loadWorkflow, executeWorkflow, stopExecution } = store;

  const [isPaletteOpen, setIsPaletteOpen] = createSignal(false);
  const [isSettingsOpen, setIsSettingsOpen] = createSignal(false);
  const [isExecutionsOpen, setIsExecutionsOpen] = createSignal(false);
  const [lastSaved, setLastSaved] = createSignal<number | null>(null);

  const selectedNode = () => {
    const ids = Array.from(canvas.selectedNodeIds);
    return ids.length === 1 ? workflow.nodes.find(n => n.id === ids[0]) : null;
  };

  const hasChanges = createMemo(() => {
    if (!lastSaved()) return workflow.nodes.length > 0 || workflow.connections.length > 0;
    return workflow.updatedAt > lastSaved()!;
  });

  const handleSave = () => {
    setLastSaved(Date.now());
    props.onSave?.(workflow);
  };

  const handleAddNode = (type: string) => {
    const rect = document.querySelector('.workflow-canvas')?.getBoundingClientRect();
    const x = rect ? (-canvas.offset.x + rect.width / 2) / canvas.zoom - 50 : 200;
    const y = rect ? (-canvas.offset.y + rect.height / 2) / canvas.zoom - 50 : 200;
    addNode(type, { x, y });
  };

  const handleAddNodeAtPosition = (type: string, position: { x: number; y: number }) => {
    addNode(type, position);
  };

  const handleRun = async () => {
    await executeWorkflow();
  };

  createEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div class="flex flex-col h-screen bg-[#0a0d14] text-slate-300 overflow-hidden">
      <WorkflowToolbar
        workflowName={workflow.name}
        isRunning={store.execution()?.status === 'running'}
        isReadOnly={canvas.readOnly}
        canUndo={store.canUndo()}
        canRedo={store.canRedo()}
        zoom={canvas.zoom}
        hasChanges={hasChanges()}
        nodeCount={workflow.nodes.length}
        connectionCount={workflow.connections.length}
        onRun={handleRun}
        onStop={stopExecution}
        onSave={handleSave}
        onUndo={store.undo}
        onRedo={store.redo}
        onAddNode={() => setIsPaletteOpen(true)}
        onZoomIn={() => store.setZoom(z => Math.min(z + 0.1, 3))}
        onZoomOut={() => store.setZoom(z => Math.max(z - 0.1, 0.1))}
        onResetView={store.resetView}
        onFitToScreen={() => {
          const container = document.querySelector('.workflow-canvas');
          if (container) {
            const rect = container.getBoundingClientRect();
            store.fitToScreen(rect.width, rect.height);
          }
        }}
        onToggleReadOnly={store.toggleReadOnly}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenExecutions={() => setIsExecutionsOpen(true)}
        onDuplicate={() => {
          const id = Array.from(canvas.selectedNodeIds)[0];
          if (id) store.duplicateNode(id);
        }}
        onNameChange={(name) => store.updateWorkflowMeta({ name })}
      />

      <div class="flex-1 flex overflow-hidden">
        <div class="flex-1 flex overflow-hidden">
          <div class="flex-1 workflow-canvas">
            <WorkflowCanvas
              store={store}
              onAddNodeAtPosition={handleAddNodeAtPosition}
              onOpenNodePalette={() => setIsPaletteOpen(true)}
            />
          </div>

          <Show when={selectedNode()}>
            {(node) => (
              <NodeProperties
                node={node()}
                onClose={() => store.clearSelection()}
                onUpdate={(updates) => store.updateNode(node().id, updates)}
                onDelete={() => store.deleteNode(node().id)}
                onTest={() => {}}
                isReadOnly={canvas.readOnly}
              />
            )}
          </Show>
        </div>

        <NodePalette
          isOpen={isPaletteOpen()}
          onClose={() => setIsPaletteOpen(false)}
          onAddNode={handleAddNode}
        />
      </div>

      <footer class="h-8 flex items-center justify-between px-4 bg-[#12161f] border-t border-slate-700/50 text-[10px] font-bold uppercase tracking-widest text-slate-600">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div class={`w-1.5 h-1.5 rounded-full ${store.execution()?.status === 'running' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`} />
            <span>{store.execution()?.status === 'running' ? 'Executing...' : 'Ready'}</span>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <span>v{workflow.version}</span>
          <Show when={lastSaved()}>
            <span class="text-slate-500">Saved {new Date(lastSaved()!).toLocaleTimeString()}</span>
          </Show>
        </div>
      </footer>

      <SettingsPanel
        isOpen={isSettingsOpen()}
        onClose={() => setIsSettingsOpen(false)}
        store={store}
      />

      <ExecutionPanel
        isOpen={isExecutionsOpen()}
        onClose={() => setIsExecutionsOpen(false)}
        store={store}
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(100, 116, 139, 0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(100, 116, 139, 0.5); }
        .animate-slide-in-right { animation: slideInRight 0.2s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.15s ease-out forwards; }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
