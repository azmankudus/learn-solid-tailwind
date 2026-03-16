import { createSignal, onMount, Show, For } from 'solid-js';
import { useSearchParams, useNavigate } from '@solidjs/router';
import { Workflow, getNodeTypeDefinition, WorkflowNode } from '~/lib/workflow/types';
import { Icon } from '@iconify-icon/solid';
import { ICON_ARROW_LEFT, ICON_EYE, ICON_CLOCK, ICON_EXCLAMATION_TRIANGLE, ICON_PLAY, ICON_CHECK_CIRCLE, ICON_X_MARK } from '~/lib/icons';

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

const NODE_WIDTH = 100;
const NODE_HEIGHT = 100;
const GRID_SIZE = 20;

function getBezierPath(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1;
  const cp = Math.max(Math.abs(dx) * 0.5, 50);
  return `M ${x1} ${y1} C ${x1 + cp} ${y1}, ${x2 - cp} ${y2}, ${x2} ${y2}`;
}

export default function WorkflowViewerPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [workflow, setWorkflow] = createSignal<Workflow | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = createSignal<string | null>(null);
  const [zoom, setZoom] = createSignal(1);
  const [offset, setOffset] = createSignal({ x: 400, y: 200 });
  const [isPanning, setIsPanning] = createSignal(false);
  const [panStart, setPanStart] = createSignal({ x: 0, y: 0, offsetX: 0, offsetY: 0 });

  let containerRef: HTMLDivElement | undefined;

  onMount(() => {
    const workflowId = searchParams.id;
    if (workflowId) {
      const loaded = loadWorkflowFromStorage(workflowId);
      if (loaded) {
        setWorkflow(loaded);
      } else {
        setError('Workflow not found');
      }
    } else {
      setError('No workflow specified');
    }
    setLoading(false);
  });

  const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setZoom(z => Math.max(0.1, Math.min(3, z - e.deltaY * 0.001)));
    } else {
      setOffset(o => ({ x: o.x - e.deltaX, y: o.y - e.deltaY }));
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (e.button === 0 && !(e.target as HTMLElement).closest('.workflow-node')) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY, offsetX: offset().x, offsetY: offset().y });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isPanning()) {
      const start = panStart();
      setOffset({ x: start.offsetX + e.clientX - start.x, y: start.offsetY + e.clientY - start.y });
    }
  };

  const handleMouseUp = () => setIsPanning(false);

  const selectedNode = () => {
    const id = selectedNodeId();
    return id ? workflow()?.nodes.find(n => n.id === id) : null;
  };

  const formatDate = (timestamp: number) => new Date(timestamp).toLocaleString();

  return (
    <div class="h-screen bg-[#0a0d14] text-slate-300 flex flex-col">
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
            <button onClick={() => navigate('/workflow')} class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg mt-4">
              Back to Workflows
            </button>
          </div>
        </div>
      </Show>

      <Show when={workflow() && !loading()}>
        <header class="h-14 flex items-center justify-between px-4 bg-[#12161f] border-b border-slate-700/50 z-50">
          <div class="flex items-center gap-4">
            <button onClick={() => navigate('/workflow')} class="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white">
              <Icon icon={ICON_ARROW_LEFT} width={18} />
            </button>
            <div>
              <h1 class="text-sm font-bold text-white">{workflow()!.name}</h1>
              <div class="flex items-center gap-2 text-[10px] text-slate-500">
                <Icon icon={ICON_EYE} width={12} />
                <span>Read-only View</span>
                <span>•</span>
                <span>{workflow()!.nodes.length} nodes</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onClick={() => navigate(`/workflow/designer?id=${workflow()!.id}`)} class="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold">
              Edit Workflow
            </button>
          </div>
        </header>

        <div class="flex-1 flex overflow-hidden">
          <div
            ref={containerRef}
            class="flex-1 overflow-hidden relative"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              class="absolute inset-0"
              style={{
                transform: `translate(${offset().x}px, ${offset().y}px) scale(${zoom()})`,
                'transform-origin': '0 0',
              }}
            >
              <div
                class="absolute pointer-events-none opacity-[0.03]"
                style={{
                  width: '20000px',
                  height: '20000px',
                  left: '-10000px',
                  top: '-10000px',
                  'background-image': `radial-gradient(circle, white 1px, transparent 1px)`,
                  'background-size': `${GRID_SIZE}px ${GRID_SIZE}px`,
                }}
              />

              <svg class="absolute pointer-events-none" style={{ width: '20000px', height: '20000px', left: '-10000px', top: '-10000px' }}>
                <g transform="translate(10000, 10000)">
                  <For each={workflow()!.connections}>
                    {(conn) => {
                      const source = workflow()!.nodes.find(n => n.id === conn.sourceNodeId);
                      const target = workflow()!.nodes.find(n => n.id === conn.targetNodeId);
                      if (!source || !target) return null;
                      const x1 = source.position.x + NODE_WIDTH;
                      const y1 = source.position.y + NODE_HEIGHT / 2;
                      const x2 = target.position.x;
                      const y2 = target.position.y + NODE_HEIGHT / 2;
                      return (
                        <path
                          d={getBezierPath(x1, y1, x2, y2)}
                          fill="none"
                          stroke="rgba(148, 163, 184, 0.3)"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      );
                    }}
                  </For>
                </g>
              </svg>

              <For each={workflow()!.nodes}>
                {(node) => {
                  const def = getNodeTypeDefinition(node.type);
                  const isSelected = () => selectedNodeId() === node.id;
                  return (
                    <div
                      class={`absolute workflow-node cursor-pointer transition-all ${isSelected() ? 'z-50' : 'z-10'}`}
                      style={{
                        left: `${node.position.x}px`,
                        top: `${node.position.y}px`,
                        width: `${NODE_WIDTH}px`,
                        height: `${NODE_HEIGHT}px`,
                      }}
                      onClick={() => setSelectedNodeId(node.id)}
                    >
                      <div
                        class={`w-full h-full rounded-2xl border-2 flex flex-col items-center justify-center relative overflow-hidden transition-all
                          ${isSelected() ? 'border-orange-400 shadow-[0_0_0_3px_rgba(251,146,60,0.2)]' : 'border-slate-700/50 hover:border-slate-600'}
                          ${node.disabled ? 'opacity-50 grayscale' : ''}`}
                        style={{ background: 'linear-gradient(135deg, #1a1f2e 0%, #151923 100%)' }}
                      >
                        <div class="absolute bottom-0 left-0 right-0 h-1" style={{ 'background-color': def?.color ?? '#6b7280' }} />
                        <Show when={def}>
                          <Icon icon={def!.icon} width={36} height={36} style={{ color: def!.color }} class="text-white/90" />
                        </Show>
                      </div>
                      <div class="absolute -bottom-7 left-1/2 -translate-x-1/2 w-36 text-center pointer-events-none">
                        <span class={`text-[10px] font-bold uppercase tracking-wide truncate block ${isSelected() ? 'text-white' : 'text-slate-400'}`}>
                          {node.name}
                        </span>
                      </div>
                    </div>
                  );
                }}
              </For>
            </div>

            <div class="absolute left-4 bottom-4 flex items-center bg-slate-800/90 backdrop-blur border border-slate-700/50 rounded-xl p-1 gap-1 z-40">
              <button onClick={() => setZoom(z => Math.min(z + 0.1, 3))} class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
              <span class="px-2 text-xs font-mono text-slate-400">{Math.round(zoom() * 100)}%</span>
              <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.1))} class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
            </div>
          </div>

          <Show when={selectedNode()}>
            {(node) => {
              const def = getNodeTypeDefinition(node().type);
              return (
                <div class="w-80 h-full bg-[#12161f] border-l border-slate-700/50 flex flex-col">
                  <div class="flex items-center gap-3 p-4 border-b border-slate-700/50">
                    <Show when={def}>
                      <div class="w-11 h-11 rounded-xl flex items-center justify-center" style={{ 'background-color': def!.color }}>
                        <Icon icon={def!.icon} width={24} class="text-white" />
                      </div>
                    </Show>
                    <div>
                      <h3 class="text-sm font-bold text-white">{node().name}</h3>
                      <span class="text-[10px] text-slate-500 font-mono">{node().id}</span>
                    </div>
                  </div>

                  <div class="flex-1 overflow-y-auto p-4 space-y-4">
                    <div class="space-y-3">
                      <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400">Parameters</h4>
                      <For each={Object.entries(node().parameters)}>
                        {([key, value]) => (
                          <div>
                            <label class="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">{key}</label>
                            <div class="text-sm text-slate-300 bg-slate-800/50 rounded-lg px-3 py-2 border border-slate-700/50">
                              {String(value)}
                            </div>
                          </div>
                        )}
                      </For>
                      <Show when={Object.keys(node().parameters).length === 0}>
                        <p class="text-slate-500 text-sm">No parameters</p>
                      </Show>
                    </div>

                    <Show when={node().notes}>
                      <div class="pt-4 border-t border-slate-700/50">
                        <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Notes</h4>
                        <p class="text-sm text-slate-300">{node().notes}</p>
                      </div>
                    </Show>
                  </div>

                  <div class="p-4 border-t border-slate-700/50 text-xs text-slate-500">
                    <div class="flex items-center gap-2 mb-1">
                      <Icon icon={ICON_CLOCK} width={12} />
                      <span>Type: {def?.category ?? 'unknown'}</span>
                    </div>
                    <Show when={node().disabled}>
                      <div class="text-amber-400">This node is disabled</div>
                    </Show>
                  </div>
                </div>
              );
            }}
          </Show>
        </div>

        <footer class="h-8 flex items-center justify-between px-4 bg-[#12161f] border-t border-slate-700/50 text-[10px] text-slate-500">
          <div class="flex items-center gap-4">
            <span>Created: {formatDate(workflow()!.createdAt)}</span>
            <span>Updated: {formatDate(workflow()!.updatedAt)}</span>
          </div>
          <span>Version {workflow()!.version}</span>
        </footer>
      </Show>
    </div>
  );
}
