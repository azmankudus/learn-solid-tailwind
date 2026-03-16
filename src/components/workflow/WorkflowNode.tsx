import { Show, For, createMemo } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import { WorkflowNode, getNodeTypeDefinition, NodeStatus } from '~/lib/workflow/types';
import { ICON_TRASH, ICON_CLIPBOARD_DOCUMENT, ICON_PLAY, ICON_CHECK_CIRCLE, ICON_X_MARK, ICON_ARROW_PATH, ICON_BAN, ICON_CLOCK, ICON_EYE, ICON_PAUSE } from '~/lib/icons';

interface WorkflowNodeProps {
  node: WorkflowNode;
  isSelected: boolean;
  isReadOnly: boolean;
  onSelect: (e: MouseEvent, additive: boolean) => void;
  onDragStart: (e: MouseEvent) => void;
  onOutputMouseDown: (outputIndex: number, e: MouseEvent) => void;
  onInputMouseUp: (inputIndex: number, e: MouseEvent) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onDisable: () => void;
}

const NODE_WIDTH = 100;
const NODE_HEIGHT = 100;

function StatusIcon(props: { status: NodeStatus }) {
  const config = createMemo(() => {
    switch (props.status) {
      case 'running': return { icon: ICON_ARROW_PATH, class: 'text-blue-400 animate-spin', bg: 'bg-blue-500/20' };
      case 'success': return { icon: ICON_CHECK_CIRCLE, class: 'text-emerald-400', bg: 'bg-emerald-500/20' };
      case 'error': return { icon: ICON_X_MARK, class: 'text-rose-400', bg: 'bg-rose-500/20' };
      case 'warning': return { icon: ICON_CLOCK, class: 'text-amber-400', bg: 'bg-amber-500/20' };
      case 'skipped': return { icon: ICON_BAN, class: 'text-slate-400', bg: 'bg-slate-500/20' };
      case 'pending': return { icon: ICON_CLOCK, class: 'text-violet-400', bg: 'bg-violet-500/20' };
      default: return null;
    }
  });

  return (
    <Show when={config()}>
      {c => (
        <div class={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full ${c().bg} border border-slate-700 flex items-center justify-center z-10`}>
          <Icon icon={c().icon} width={12} class={c().class} />
        </div>
      )}
    </Show>
  );
}

export function WorkflowNodeComponent(props: WorkflowNodeProps) {
  const definition = () => getNodeTypeDefinition(props.node.type);
  const inputCount = () => definition()?.inputs ?? 1;
  const outputCount = () => definition()?.outputs ?? 1;
  const nodeColor = () => definition()?.color ?? '#6b7280';
  const isTrigger = () => definition()?.category === 'trigger';
  const isOutput = () => definition()?.category === 'output';

  return (
    <div
      class={`absolute select-none group ${props.isReadOnly ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
      style={{
        left: `${props.node.position.x}px`,
        top: `${props.node.position.y}px`,
        width: `${NODE_WIDTH}px`,
        height: `${NODE_HEIGHT}px`,
        'z-index': props.isSelected ? 100 : 10,
      }}
      onMouseDown={(e) => {
        if ((e.target as HTMLElement).closest('.port')) return;
        props.onSelect(e, e.shiftKey || e.ctrlKey || e.metaKey);
        if (!props.isReadOnly) props.onDragStart(e);
      }}
    >
      <Show when={!isTrigger()}>
        <For each={Array.from({ length: inputCount() })}>
          {(_, i) => (
            <div
              class={`port absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-[#1a1f2e] border-2 flex items-center justify-center transition-all z-20
                ${props.node.disabled ? 'border-slate-600 opacity-50' : 'border-slate-500 hover:border-orange-400 hover:scale-125'}
              `}
              style={{ transform: `translateY(-50%) translateY(${(i() - (inputCount() - 1) / 2) * 20}px)` }}
              onMouseUp={(e) => {
                e.stopPropagation();
                props.onInputMouseUp(i(), e);
              }}
            >
              <div class={`w-1.5 h-1.5 rounded-full ${props.node.disabled ? 'bg-slate-600' : 'bg-orange-400'}`} />
            </div>
          )}
        </For>
      </Show>

      <Show when={!isOutput()}>
        <For each={Array.from({ length: outputCount() })}>
          {(_, i) => (
            <div
              class={`port absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-[#1a1f2e] border-2 flex items-center justify-center transition-all z-20 cursor-crosshair
                ${props.node.disabled ? 'border-slate-600 opacity-50' : 'border-slate-500 hover:border-orange-400 hover:scale-125'}
              `}
              style={{ transform: `translateY(-50%) translateY(${(i() - (outputCount() - 1) / 2) * 20}px)` }}
              onMouseDown={(e) => {
                e.stopPropagation();
                if (!props.isReadOnly) props.onOutputMouseDown(i(), e);
              }}
            >
              <div class={`w-1.5 h-1.5 rounded-full ${props.node.disabled ? 'bg-slate-600' : 'bg-orange-400'}`} />
            </div>
          )}
        </For>
      </Show>

      <div
        class={`w-full h-full rounded-2xl border-2 flex flex-col items-center justify-center relative overflow-hidden transition-all
          ${props.isSelected ? 'border-orange-400 shadow-[0_0_0_3px_rgba(251,146,60,0.2),0_0_30px_rgba(251,146,60,0.15)]' : 'border-slate-700/50 hover:border-slate-600'}
          ${props.node.disabled ? 'opacity-50 grayscale' : ''}
          ${props.node.status === 'running' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : ''}
        `}
        style={{ 'background': 'linear-gradient(135deg, #1a1f2e 0%, #151923 100%)' }}
      >
        <div
          class="absolute bottom-0 left-0 right-0 h-1 transition-all"
          style={{ 'background-color': nodeColor() }}
        />

        <Show when={definition()}>
          <Icon
            icon={definition()!.icon}
            width={36}
            height={36}
            class={`text-white/90 transition-transform group-hover:scale-110 ${props.node.disabled ? 'opacity-50' : ''}`}
            style={{ color: nodeColor() }}
          />
        </Show>

        <StatusIcon status={props.node.status} />

        <Show when={props.node.disabled}>
          <div class="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-slate-700/80 text-[8px] font-bold uppercase tracking-wider text-slate-400">
            Disabled
          </div>
        </Show>
      </div>

      <div class="absolute -bottom-7 left-1/2 -translate-x-1/2 w-36 text-center pointer-events-none">
        <span class={`text-[10px] font-bold uppercase tracking-wide truncate block ${props.isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
          {props.node.name}
        </span>
      </div>

      <Show when={!props.isReadOnly}>
        <div class="absolute -top-10 left-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 translate-y-1 group-hover:translate-y-0">
          <button
            onClick={(e) => { e.stopPropagation(); props.onDuplicate(); }}
            class="p-1.5 rounded-lg bg-[#1a1f2e] border border-slate-700 hover:border-orange-400 hover:text-orange-400 text-slate-400 transition-all"
            title="Duplicate"
          >
            <Icon icon={ICON_CLIPBOARD_DOCUMENT} width={12} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); props.onDisable(); }}
            class={`p-1.5 rounded-lg bg-[#1a1f2e] border border-slate-700 hover:border-amber-400 hover:text-amber-400 text-slate-400 transition-all ${props.node.disabled ? 'border-amber-400 text-amber-400' : ''}`}
            title={props.node.disabled ? 'Enable' : 'Disable'}
          >
            <Icon icon={ICON_PAUSE} width={12} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); props.onDelete(); }}
            class="p-1.5 rounded-lg bg-[#1a1f2e] border border-slate-700 hover:border-rose-400 hover:text-rose-400 text-slate-400 transition-all"
            title="Delete"
          >
            <Icon icon={ICON_TRASH} width={12} />
          </button>
        </div>
      </Show>
    </div>
  );
}

export { NODE_WIDTH, NODE_HEIGHT };
