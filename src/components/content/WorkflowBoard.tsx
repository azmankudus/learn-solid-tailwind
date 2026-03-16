import { For, JSX, Show, createSignal, onMount, onCleanup, createMemo, createEffect, createUniqueId, splitProps } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { 
  ICON_BOLT, ICON_COG, ICON_DATABASE, ICON_ENVELOPE, 
  ICON_PLAY, ICON_CHECK_CIRCLE, ICON_X_MARK, ICON_SPARKLES,
  ICON_ARROW_PATH, ICON_TRASH, ICON_PLUS, ICON_EYE, ICON_EYE_SLASH,
  ICON_ZOOM_IN_FLUENT, ICON_ZOOM_OUT_FLUENT, ICON_CURSOR_FLOW_FLUENT,
  ICON_ADJUSTMENTS, ICON_WINDOW, ICON_FLOPPY, ICON_SERVER,
  ICON_CODE, ICON_SEARCH, ICON_LIST, ICON_ACTIVITY, ICON_BRANCH,
  ICON_CLOCK, ICON_TERMINAL, ICON_POWER, ICON_PAUSE, ICON_STOP_V2,
  ICON_LINK, ICON_SHIELD_CHECK, ICON_LOGO_SLACK, ICON_PLUS_CIRCLE,
  ICON_CLIPBOARD_DOCUMENT, ICON_QUESTION_MARK_CIRCLE, ICON_PLAY_PAUSE,
  ICON_SQUARE_3_STACK
} from "~/lib/icons";
import { TextField } from "~/components/input/TextField";
import { TextArea } from "~/components/input/TextArea";
import { Button } from "~/components/input/Button";

// --- Types & Interfaces ---
export type NodeCategory = 'trigger' | 'action' | 'logic' | 'transform' | 'output';

export interface WorkflowNode {
  id: string;
  category: NodeCategory;
  type: string;
  name: string;
  icon: any;
  position: { x: number; y: number };
  status: 'idle' | 'running' | 'success' | 'warning' | 'error';
  parameters: Record<string, any>;
  data: any[]; 
  error?: string;
  expanded?: boolean;
}

export interface WorkflowConnection {
  id: string;
  sourceId: string;
  targetId: string;
}

export interface WorkflowState {
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
}

// --- Design Constants ---
const NODE_SIZE = 90; // n8n nodes are roughly 90x90
const GRID_SIZE = 24;

const CATALOG: Record<string, { category: NodeCategory, name: string, icon: any, color: string, description: string, defaultParams: any }> = {
  'trigger:webhook': { category: 'trigger', name: 'Webhook', icon: ICON_ACTIVITY, color: '#f59e0b', description: 'Trigger via HTTP POST/GET', defaultParams: { path: '/webhook', method: 'POST' } },
  'trigger:schedule': { category: 'trigger', name: 'Schedule', icon: ICON_CLOCK, color: '#f59e0b', description: 'Run on a timer', defaultParams: { cron: '0 12 * * *' } },
  'action:http': { category: 'action', name: 'HTTP Request', icon: ICON_LINK, color: '#3b82f6', description: 'Interact with APIs', defaultParams: { url: 'https://api.github.com', method: 'GET' } },
  'action:db': { category: 'action', name: 'Postgres', icon: ICON_DATABASE, color: '#3b82f6', description: 'SQL Database operations', defaultParams: { table: 'users', query: 'SELECT *' } },
  'logic:if': { category: 'logic', name: 'IF', icon: ICON_BRANCH, color: '#8b5cf6', description: 'Branch based on condition', defaultParams: { condition: 'true' } },
  'transform:code': { category: 'transform', name: 'Code', icon: ICON_CODE, color: '#10b981', description: 'JS Custom Transformation', defaultParams: { script: 'return items.map(p => ({ ...p.json, processed: true }));' } },
  'output:slack': { category: 'output', name: 'Slack', icon: ICON_LOGO_SLACK, color: '#ef4444', description: 'Send messages to Slack', defaultParams: { channel: '#billing', text: 'Alert!' } },
};

// --- Sub-Components ---

function N8nNode(props: {
  node: WorkflowNode;
  isSelected: boolean;
  onSelect: (e: MouseEvent) => void;
  onPortDown: (e: MouseEvent) => void;
  onPortUp: (e: MouseEvent) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const meta = () => CATALOG[`${props.node.category}:${props.node.type}`];

  return (
    <div 
      class={`absolute select-none cursor-grab active:cursor-grabbing transition-all group
        ${props.isSelected ? 'z-50' : 'z-20'}
      `}
      style={{
        left: `${props.node.position.x}px`,
        top: `${props.node.position.y}px`,
        width: `${NODE_SIZE}px`,
        height: `${NODE_SIZE}px`,
      }}
      onMouseDown={props.onSelect}
    >
      {/* Input Port */}
      <Show when={props.node.category !== 'trigger'}>
        <div 
          class="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1c212b] border border-white/20 flex items-center justify-center hover:scale-125 transition-all text-[#ff6d5b] cursor-pointer"
          onMouseUp={props.onPortUp}
        >
          <Icon icon={ICON_PLUS} width={10} />
        </div>
      </Show>

      {/* Output Port */}
      <Show when={props.node.category !== 'output'}>
        <div 
          class="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1c212b] border border-white/20 flex items-center justify-center hover:scale-125 transition-all text-[#ff6d5b] cursor-crosshair"
          onMouseDown={props.onPortDown}
        >
          <Icon icon={ICON_PLUS} width={10} />
        </div>
      </Show>

      {/* Main Card */}
      <div 
        class={`w-full h-full bg-[#1c212b] rounded-2xl border-2 flex items-center justify-center relative overflow-hidden transition-all
          ${props.isSelected ? 'border-[#ff6d5b] shadow-[0_0_20px_rgba(255,109,91,0.3)]' : 'border-white/5 hover:border-white/20'}
          ${props.node.status === 'running' ? 'animate-pulse border-[#3b82f6]' : ''}
        `}
      >
        <div class="absolute inset-x-0 bottom-0 h-1" style={{ "background-color": meta()?.color || '#3b82f6' }} />
        <Icon icon={props.node.icon} width={38} height={38} class="text-white opacity-90 transition-transform group-hover:scale-110" />
        
        {/* Status Badge */}
        <Show when={props.node.status !== 'idle'}>
           <div class={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1c212b] border border-white/10 flex items-center justify-center shadow-lg
            ${props.node.status === 'success' ? 'text-emerald-500' : props.node.status === 'error' ? 'text-rose-500' : 'text-blue-500 animate-spin'}
           `}>
             <Icon icon={props.node.status === 'success' ? ICON_CHECK_CIRCLE : props.node.status === 'error' ? ICON_X_MARK : ICON_ARROW_PATH} width={14} />
           </div>
        </Show>
      </div>

      {/* Label */}
      <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 text-center">
        <span class="text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors block truncate">{props.node.name}</span>
      </div>

      {/* Quick Menu */}
      <div class="absolute -top-8 left-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-200">
        <button onClick={(e) => { e.stopPropagation(); props.onDuplicate(); }} class="p-1.5 rounded-lg bg-[#1c212b] border border-white/10 hover:border-[#ff6d5b] hover:text-[#ff6d5b] transition-all"><Icon icon={ICON_CLIPBOARD_DOCUMENT} width={12} /></button>
        <button onClick={(e) => { e.stopPropagation(); props.onDelete(); }} class="p-1.5 rounded-lg bg-[#1c212b] border border-white/10 hover:bg-rose-500/10 hover:text-rose-500 transition-all"><Icon icon={ICON_TRASH} width={12} /></button>
      </div>
    </div>
  );
}

// --- Main Workflow Architect ---
export function WorkflowBoard(props: {
  initialNodes?: WorkflowNode[];
  initialConnections?: WorkflowConnection[];
  onSave?: (state: WorkflowState) => void;
}) {
  const [nodes, setNodes] = createSignal<WorkflowNode[]>(props.initialNodes || []);
  const [connections, setConnections] = createSignal<WorkflowConnection[]>(props.initialConnections || []);
  
  // Canvas State
  const [zoom, setZoom] = createSignal(1);
  const [offset, setOffset] = createSignal({ x: window.innerWidth / 4, y: 150 });
  
  // Interaction State
  const [selectedId, setSelectedId] = createSignal<string | null>(null);
  const [isPanning, setIsPanning] = createSignal(false);
  const [draggingId, setDraggingId] = createSignal<string | null>(null);
  const [drawingConn, setDrawingConn] = createSignal<{ source: string, x: number, y: number } | null>(null);
  
  // UI Panels
  const [isLibraryOpen, setIsLibraryOpen] = createSignal(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = createSignal(false);
  const [isRunning, setIsRunning] = createSignal(false);
  const [searchTerm, setSearchTerm] = createSignal("");

  let canvasRef: HTMLDivElement | undefined;
  let dragAnchor = { x: 0, y: 0 };
  let startOffset = { x: 0, y: 0 };

  // --- Handlers ---
  const handleMove = (e: MouseEvent) => {
    if (isPanning()) {
      setOffset({
        x: startOffset.x + (e.clientX - dragAnchor.x),
        y: startOffset.y + (e.clientY - dragAnchor.y)
      });
      return;
    }

    const dId = draggingId();
    if (dId) {
      const dx = (e.clientX - dragAnchor.x) / zoom();
      const dy = (e.clientY - dragAnchor.y) / zoom();
      setNodes(prev => prev.map(n => n.id === dId ? { ...n, position: { x: startOffset.x + dx, y: startOffset.y + dy } } : n));
      return;
    }

    const conn = drawingConn();
    if (conn) setDrawingConn({ ...conn, x: e.clientX, y: e.clientY });
  };

  const handleUp = () => {
    setIsPanning(false);
    setDraggingId(null);
    setDrawingConn(null);
  };

  onMount(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
  });

  onCleanup(() => {
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', handleUp);
  });

  const createNode = (key: string) => {
    const meta = CATALOG[key];
    const [cat, type] = key.split(':');
    const rect = canvasRef?.getBoundingClientRect();
    const x = rect ? (-offset().x + rect.width / 2) / zoom() - NODE_SIZE / 2 : 100;
    const y = rect ? (-offset().y + rect.height / 2) / zoom() - NODE_SIZE / 2 : 100;

    const newNode: WorkflowNode = {
      id: `${type}-${createUniqueId().slice(0, 4)}`,
      category: meta.category,
      type: type,
      name: meta.name,
      icon: meta.icon,
      position: { x, y },
      status: 'idle',
      parameters: { ...meta.defaultParams },
      data: []
    };
    setNodes([...nodes(), newNode]);
    setIsLibraryOpen(false);
    setSelectedId(newNode.id);
    setIsPropertiesOpen(true);
  };

  const executeWorkflow = async () => {
     if (isRunning()) return;
     setIsRunning(true);
     setNodes(nodes().map(n => ({ ...n, status: 'idle', data: [] })));

     const triggers = nodes().filter(n => n.category === 'trigger');
     for (const t of triggers) await runRecursive(t, []);
     setIsRunning(false);
  };

  const runRecursive = async (node: WorkflowNode, input: any[]) => {
     setNodes(prev => prev.map(n => n.id === node.id ? { ...n, status: 'running' } : n));
     await new Promise(r => setTimeout(r, 800));

     try {
        const out = [...input, { json: { status: "success", node: node.name, id: node.id, timestamp: Date.now() } }];
        setNodes(prev => prev.map(n => n.id === node.id ? { ...n, status: 'success', data: out } : n));
        
        const children = connections().filter(c => c.sourceId === node.id);
        for (const conn of children) {
           const target = nodes().find(n => n.id === conn.targetId);
           if (target) await runRecursive(target, out);
        }
     } catch (e: any) {
        setNodes(prev => prev.map(n => n.id === node.id ? { ...n, status: 'error', error: e.message } : n));
     }
  };

  const getBezier = (x1: number, y1: number, x2: number, y2: number) => {
     const dx = x2 - x1;
     const cp1 = x1 + Math.max(dx * 0.5, 50);
     const cp2 = x2 - Math.max(dx * 0.5, 50);
     return `M ${x1} ${y1} C ${cp1} ${y1}, ${cp2} ${y2}, ${x2} ${y2}`;
  };

  // --- Render ---
  return (
    <div class="flex flex-col h-screen bg-[#0d1117] text-slate-300 font-sans overflow-hidden">
      
      {/* n8n Top Navigation */}
      <header class="h-16 flex items-center justify-between px-8 bg-[#161b22] border-b border-white/5 z-[100] shadow-xl">
         <div class="flex items-center gap-6">
            <div class="w-10 h-10 bg-[#ff6d5b] rounded-xl flex items-center justify-center shadow-lg shadow-[#ff6d5b20] hover:rotate-6 transition-transform">
               <Icon icon={ICON_BOLT} width={24} height={24} class="text-white" />
            </div>
            <div class="flex flex-col">
               <input type="text" value="New Workflow" class="bg-transparent border-none outline-none text-sm font-bold text-white p-0 focus:underline" />
               <span class="text-[9px] font-black uppercase tracking-[0.2em] text-[#ffffff20] leading-none mt-1">v1.24.1 • PRODUCTION</span>
            </div>
         </div>

         <div class="flex items-center gap-4">
            <div class="flex items-center bg-black/40 rounded-2xl p-1 border border-white/5 pr-4 gap-4">
               <button 
                 onClick={executeWorkflow}
                 disabled={isRunning()}
                 class={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                  ${isRunning() ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-[#3fb950] text-[#0d1117] hover:bg-[#34d399] shadow-xl shadow-[#3fb95010] active:scale-95'}
                 `}
               >
                  <Icon icon={isRunning() ? ICON_ARROW_PATH : ICON_PLAY} class={isRunning() ? 'animate-spin' : ''} width={14} /> 
                  {isRunning() ? 'Running...' : 'Execute Workflow'}
               </button>
               <button class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                  <Icon icon={ICON_LIST} width={16} />
               </button>
            </div>
            <div class="w-px h-6 bg-white/10" />
            <Button onClick={() => props.onSave?.({ nodes: nodes(), connections: connections() })} variant="secondary" class="px-6 py-2.5 bg-white/5 border-white/10 text-[10px] font-black uppercase">Save</Button>
         </div>
      </header>

      {/* Designer Workspace */}
      <div class="flex-1 flex relative">
         
         {/* Canvas Controls */}
         <div class="absolute left-8 bottom-8 flex items-center gap-4 z-50">
            <button 
              onClick={() => setIsLibraryOpen(!isLibraryOpen())}
              class="w-16 h-16 bg-[#ff6d5b] text-white rounded-[1.8rem] flex items-center justify-center shadow-2xl shadow-[#ff6d5b40] hover:scale-110 active:scale-95 transition-all text-3xl"
            >
               <Icon icon={ICON_PLUS} width={32} />
            </button>
            <div class="flex p-2 bg-[#1c212b/90] backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl gap-2">
               <button onClick={() => setZoom(z => Math.min(z + 0.1, 2.5))} class="p-3 text-slate-400 hover:text-white rounded-xl hover:bg-white/5"><Icon icon={ICON_ZOOM_IN_FLUENT} width={18} /></button>
               <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.2))} class="p-3 text-slate-400 hover:text-white rounded-xl hover:bg-white/5"><Icon icon={ICON_ZOOM_OUT_FLUENT} width={18} /></button>
               <button onClick={() => { setZoom(1); setOffset({ x: window.innerWidth / 4, y: 150 }); }} class="p-3 text-slate-400 hover:text-white rounded-xl hover:bg-white/5"><Icon icon={ICON_CURSOR_FLOW_FLUENT} width={18} /></button>
            </div>
         </div>

         {/* Canvas */}
         <div 
           ref={canvasRef}
           class={`flex-1 overflow-hidden relative ${isPanning() ? 'cursor-grabbing' : 'cursor-default'}`}
           onMouseDown={(e) => {
              if (e.target === canvasRef) {
                 setIsPanning(true);
                 dragAnchor = { x: e.clientX, y: e.clientY };
                 startOffset = { ...offset() };
                 setSelectedId(null);
                 setIsPropertiesOpen(false);
              }
           }}
           onWheel={(e) => {
              if (e.ctrlKey) {
                 e.preventDefault();
                 setZoom(z => Math.min(Math.max(z - e.deltaY * 0.001, 0.1), 3));
              } else {
                 setOffset(o => ({ x: o.x - e.deltaX, y: o.y - e.deltaY }));
              }
           }}
         >
            <div 
              class="absolute inset-0 transition-none will-change-transform"
              style={{ transform: `translate(${offset().x}px, ${offset().y}px) scale(${zoom()})`, "transform-origin": "0 0" }}
            >
               {/* Dot Grid */}
               <div 
                 class="absolute -inset-[10000px] pointer-events-none opacity-[0.04]" 
                 style={{ "background-image": `radial-gradient(circle, white 1px, transparent 1px)`, "background-size": `${GRID_SIZE}px ${GRID_SIZE}px` }}
               />

               {/* Connection Lines */}
               <svg class="absolute -inset-[5000px] w-[10000px] h-[10000px] pointer-events-none overflow-visible">
                  <g transform="translate(5000, 5000)">
                     <For each={connections()}>
                        {(conn) => {
                           const s = nodes().find(n => n.id === conn.sourceId);
                           const t = nodes().find(n => n.id === conn.targetId);
                           if (!s || !t) return null;
                           const d = getBezier(s.position.x + NODE_SIZE, s.position.y + NODE_SIZE/2, t.position.x, t.position.y + NODE_SIZE/2);
                           return (
                             <g>
                                <path d={d} fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="4" stroke-linecap="round" />
                                <path d={d} fill="none" stroke={s.status === 'success' ? '#10b981' : '#ff6d5b40'} stroke-width="1.5" class="transition-all duration-700" />
                                {(s.status === 'success' || s.status === 'running') && (
                                   <circle r="3" fill="#ff6d5b">
                                      <animateMotion dur={s.status === 'running' ? '0.6s' : '2.5s'} repeatCount="indefinite" path={d} />
                                   </circle>
                                )}
                             </g>
                           );
                        }}
                     </For>
                     
                     {/* Draft Connection */}
                     <Show when={drawingConn()}>
                        {(c) => {
                           const currentConn = typeof c === 'function' ? c() : c;
                           const s = nodes().find(n => n.id === currentConn.source);
                           if (!s) return null;
                           const rect = canvasRef?.getBoundingClientRect();
                           if (!rect) return null;
                           const x2 = (currentConn.x - rect.left - offset().x) / zoom();
                           const y2 = (currentConn.y - rect.top - offset().y) / zoom();
                           return <path d={getBezier(s.position.x + NODE_SIZE, s.position.y + NODE_SIZE/2, x2, y2)} fill="none" stroke="#ff6d5b" stroke-width="2" stroke-dasharray="10,6" opacity="0.6" />;
                        }}
                     </Show>
                  </g>
               </svg>

               {/* Nodes */}
               <For each={nodes()}>
                  {(node) => (
                    <N8nNode 
                      node={node}
                      isSelected={selectedId() === node.id}
                      onSelect={(e) => {
                         setDraggingId(node.id);
                         setSelectedId(node.id);
                         setIsPropertiesOpen(true);
                         dragAnchor = { x: e.clientX, y: e.clientY };
                         startOffset = { ...node.position };
                         setIsLibraryOpen(false);
                      }}
                      onPortDown={(e) => { e.stopPropagation(); setDrawingConn({ source: node.id, x: e.clientX, y: e.clientY }); }}
                      onPortUp={() => {
                         const dr = drawingConn();
                         if (dr && dr.source !== node.id) {
                            setConnections([...connections(), { id: createUniqueId(), sourceId: dr.source, targetId: node.id }]);
                         }
                      }}
                      onDuplicate={() => {
                         const newNode = { ...node, id: `${node.type}-${createUniqueId().slice(0,4)}`, position: { x: node.position.x + 40, y: node.position.y + 40 }, status: 'idle' as const, data: [] };
                         setNodes([...nodes(), newNode]);
                      }}
                      onDelete={() => {
                         setNodes(nodes().filter(n => n.id !== node.id));
                         setConnections(connections().filter(c => c.sourceId !== node.id && c.targetId !== node.id));
                         if (selectedId() === node.id) setIsPropertiesOpen(false);
                      }}
                    />
                  )}
               </For>
            </div>
         </div>

         {/* Right Sidebar: Library & Properties Area */}
         <div class="h-full bg-[#161b22] border-l border-white/5 z-[60] flex transition-all duration-300" style={{ width: (isLibraryOpen() || isPropertiesOpen()) ? '420px' : '0' }}>
            
            {/* Library Panel */}
            <Show when={isLibraryOpen()}>
               <div class="w-full flex flex-col animate-fade-in-right">
                  <div class="p-8 border-b border-white/5 flex items-center justify-between">
                     <h4 class="text-xs font-black uppercase tracking-[0.2em] text-[#ffffff20] italic">Add Node</h4>
                     <button onClick={() => setIsLibraryOpen(false)} class="p-2 text-slate-500 hover:text-white"><Icon icon={ICON_X_MARK} width={18} /></button>
                  </div>
                  <div class="p-6">
                     <div class="relative">
                        <Icon icon={ICON_SEARCH} class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" width={18} />
                        <input 
                          type="text" 
                          placeholder="Search nodes..." 
                          class="w-full bg-black/30 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-xs text-white outline-none focus:ring-2 focus:ring-[#ff6d5b40]"
                          onInput={(e) => setSearchTerm(e.currentTarget.value)}
                        />
                     </div>
                  </div>
                  <div class="flex-1 overflow-y-auto custom-scrollbar px-6 pb-12 space-y-3">
                     <For each={Object.entries(CATALOG).filter(([_, d]) => d.name.toLowerCase().includes(searchTerm().toLowerCase()))}>
                        {([key, def]) => (
                           <button 
                             onClick={() => createNode(key)}
                             class="w-full flex items-center gap-5 p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group group-active:scale-95"
                           >
                              <div class="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform" style={{ "background-color": `${def.color}20`, "color": def.color }}>
                                 <Icon icon={def.icon} width={24} height={24} />
                              </div>
                              <div class="flex flex-col items-start min-w-0">
                                 <span class="text-xs font-black text-white uppercase tracking-tight italic">{def.name}</span>
                                 <span class="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1 truncate w-full">{def.description}</span>
                              </div>
                           </button>
                        )}
                     </For>
                  </div>
               </div>
            </Show>

            {/* Properties Panel */}
            <Show when={isPropertiesOpen() && nodes().find(n => n.id === selectedId())}>
               {(node) => {
                  const n = typeof node === 'function' ? node() : node;
                  const meta = CATALOG[`${n.category}:${n.type}`];
                  return (
                    <div class="w-full flex flex-col animate-fade-in-right">
                       <div class="p-8 border-b border-white/5 flex items-center justify-between">
                          <div class="flex items-center gap-4">
                             <div class="w-11 h-11 rounded-2xl flex items-center justify-center shadow-xl" style={{ "background-color": meta?.color || '#3b82f6' }}>
                                <Icon icon={n.icon} width={26} height={26} class="text-white" />
                             </div>
                             <div>
                                <h4 class="text-sm font-black text-white uppercase tracking-tight italic leading-none">{n.name}</h4>
                                <span class="text-[9px] text-[#ffffff20] font-black uppercase tracking-[0.2em] mt-1 block">{n.id}</span>
                             </div>
                          </div>
                          <button onClick={() => setIsPropertiesOpen(false)} class="p-2 text-slate-500 hover:text-white"><Icon icon={ICON_X_MARK} width={18} /></button>
                       </div>

                       <div class="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
                          <div class="space-y-8 animate-fade-up">
                             <TextField 
                               label="Node Name" 
                               value={n.name} 
                               onInput={(v) => setNodes(nodes().map(x => x.id === n.id ? { ...x, name: v } : x))} 
                             />
                             
                             <For each={Object.entries(n.parameters)}>
                                {([key, val]) => (
                                   <div class="space-y-2">
                                      <label class="text-[10px] font-black uppercase tracking-widest text-[#ffffff20] pl-1">{key}</label>
                                      <TextField 
                                         value={String(val)} 
                                         onInput={(v) => setNodes(nodes().map(x => x.id === n.id ? { ...x, parameters: { ...x.parameters, [key]: v } } : x))} 
                                      />
                                   </div>
                                )}
                             </For>
                             
                             <TextArea label="Process Notes" placeholder="Enter logic description..." value="" onChange={() => {}} />
                          </div>

                          <Show when={n.data.length > 0}>
                             <div class="pt-10 border-t border-white/5 space-y-4">
                                <span class="text-[11px] font-black uppercase tracking-widest text-[#10b981] italic">Output JSON</span>
                                <div class="p-6 bg-black/40 border border-white/5 rounded-[2rem] font-mono text-[11px] text-[#10b98190] overflow-x-auto whitespace-pre shadow-inner">
                                   {JSON.stringify(n.data, null, 2)}
                                </div>
                             </div>
                          </Show>
                       </div>

                       <div class="p-8 border-t border-white/5 bg-black/20 flex gap-4">
                          <button onClick={() => { setNodes(nodes().filter(x => x.id !== n.id)); setConnections(connections().filter(x => x.sourceId !== n.id && x.targetId !== n.id)); setIsPropertiesOpen(false); }} class="flex-1 py-4 rounded-2xl bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-widest border border-rose-500/10 hover:bg-rose-500 hover:text-white transition-all">Delete</button>
                          <button class="flex-1 py-4 rounded-2xl bg-[#ff6d5b] text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#ff6d5b20] hover:scale-105 transition-all">Test step</button>
                       </div>
                    </div>
                  );
               }}
            </Show>
         </div>
      </div>

      {/* Footer System HUD */}
      <footer class="h-10 bg-[#161b22] border-t border-white/5 flex items-center justify-between px-8 text-[9px] font-black uppercase tracking-widest text-[#ffffff20] z-[110]">
         <div class="flex items-center gap-8">
            <div class="flex items-center gap-2">
               <div class={`w-1.5 h-1.5 rounded-full ${isRunning() ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`} />
               {isRunning() ? 'Execution Active' : 'Engine Ready'}
            </div>
            <div class="w-px h-3 bg-white/5" />
            <div class="flex items-center gap-4">
               <span>Nodes: {nodes().length}</span>
               <span>Links: {connections().length}</span>
            </div>
         </div>
         <div class="flex items-center gap-6">
            <span class="text-white/40">{Math.round(zoom() * 100)}%</span>
            <Icon icon={ICON_QUESTION_MARK_CIRCLE} class="hover:text-white cursor-pointer" />
         </div>
      </footer>

      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
          .animate-fade-in-right { animation: fadeInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-fade-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          @keyframes fadeInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}
      </style>
    </div>
  );
}
