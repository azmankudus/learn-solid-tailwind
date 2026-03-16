import { Show, createMemo } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import { ICON_PLAY, ICON_STOP, ICON_FLOPPY, ICON_ARROW_PATH, ICON_PLUS, ICON_ZOOM_IN_FLUENT, ICON_ZOOM_OUT_FLUENT, ICON_CURSOR_FLOW_FLUENT, ICON_LIST, ICON_COG, ICON_BOLT, ICON_EYE, ICON_EYE_SLASH, ICON_CLIPBOARD_DOCUMENT, ICON_FOLDER_PLUS, ICON_ARROW_UP_CIRCLE, ICON_CHECK_CIRCLE, ICON_X_MARK } from '~/lib/icons';

interface WorkflowToolbarProps {
  workflowName: string;
  isRunning: boolean;
  isReadOnly: boolean;
  canUndo: boolean;
  canRedo: boolean;
  zoom: number;
  hasChanges: boolean;
  nodeCount: number;
  connectionCount: number;
  onRun: () => void;
  onStop: () => void;
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onAddNode: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onFitToScreen: () => void;
  onToggleReadOnly: () => void;
  onOpenSettings: () => void;
  onOpenExecutions: () => void;
  onDuplicate: () => void;
  onNameChange: (name: string) => void;
}

export function WorkflowToolbar(props: WorkflowToolbarProps) {
  return (
    <header class="h-14 flex items-center justify-between px-4 bg-[#12161f] border-b border-slate-700/50 z-50">
      <div class="flex items-center gap-4">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
          <Icon icon={ICON_BOLT} width={20} class="text-white" />
        </div>

        <div class="flex flex-col">
          <input
            type="text"
            value={props.workflowName}
            onInput={(e) => props.onNameChange(e.currentTarget.value)}
            disabled={props.isReadOnly}
            class="bg-transparent text-sm font-bold text-white outline-none disabled:cursor-default min-w-[150px]"
          />
          <div class="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-600">
            <Show when={props.isReadOnly}>
              <span class="text-amber-400">Read Only</span>
              <span>•</span>
            </Show>
            <span>{props.nodeCount} nodes</span>
            <span>•</span>
            <span>{props.connectionCount} connections</span>
            <Show when={props.hasChanges}>
              <span>•</span>
              <span class="text-orange-400">Unsaved</span>
            </Show>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Show when={!props.isReadOnly}>
          <div class="flex items-center gap-1 mr-2">
            <button
              onClick={props.onUndo}
              disabled={!props.canUndo}
              class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Icon icon={ICON_ARROW_PATH} width={16} style={{ transform: 'scaleX(-1)' }} />
            </button>
            <button
              onClick={props.onRedo}
              disabled={!props.canRedo}
              class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Icon icon={ICON_ARROW_PATH} width={16} />
            </button>
          </div>

          <button
            onClick={props.onDuplicate}
            class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            title="Duplicate Selection"
          >
            <Icon icon={ICON_CLIPBOARD_DOCUMENT} width={16} />
          </button>
        </Show>

        <div class="w-px h-6 bg-slate-700/50 mx-1" />

        <div class="flex items-center bg-slate-800/50 rounded-xl p-1 border border-slate-700/50">
          <button
            onClick={props.onZoomOut}
            class="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <Icon icon={ICON_ZOOM_OUT_FLUENT} width={16} />
          </button>
          <span class="px-2 text-xs font-mono text-slate-400 min-w-[48px] text-center">
            {Math.round(props.zoom * 100)}%
          </span>
          <button
            onClick={props.onZoomIn}
            class="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            title="Zoom In"
          >
            <Icon icon={ICON_ZOOM_IN_FLUENT} width={16} />
          </button>
          <button
            onClick={props.onFitToScreen}
            class="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            title="Fit to Screen"
          >
            <Icon icon={ICON_CURSOR_FLOW_FLUENT} width={16} />
          </button>
        </div>

        <div class="w-px h-6 bg-slate-700/50 mx-1" />

        <button
          onClick={props.onToggleReadOnly}
          class={`p-2 rounded-lg transition-colors ${props.isReadOnly ? 'bg-amber-500/20 text-amber-400' : 'hover:bg-slate-700/50 text-slate-400 hover:text-white'}`}
          title={props.isReadOnly ? 'Exit Read Only' : 'Read Only Mode'}
        >
          <Icon icon={props.isReadOnly ? ICON_EYE : ICON_EYE_SLASH} width={16} />
        </button>

        <button
          onClick={props.onOpenSettings}
          class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
          title="Workflow Settings"
        >
          <Icon icon={ICON_COG} width={16} />
        </button>

        <button
          onClick={props.onOpenExecutions}
          class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
          title="Execution History"
        >
          <Icon icon={ICON_LIST} width={16} />
        </button>

        <Show when={!props.isReadOnly}>
          <button
            onClick={props.onAddNode}
            class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            title="Add Node"
          >
            <Icon icon={ICON_PLUS} width={16} />
          </button>
        </Show>

        <div class="w-px h-6 bg-slate-700/50 mx-1" />

        <Show when={!props.isReadOnly}>
          <button
            onClick={props.onSave}
            class="px-3 py-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wide transition-colors flex items-center gap-2"
          >
            <Icon icon={ICON_FLOPPY} width={14} />
            Save
          </button>
        </Show>

        <Show when={props.isRunning}>
          <button
            onClick={props.onStop}
            class="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold uppercase tracking-wide transition-all flex items-center gap-2"
          >
            <Icon icon={ICON_STOP} width={14} />
            Stop
          </button>
        </Show>

        <Show when={!props.isRunning}>
          <button
            onClick={props.onRun}
            class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold uppercase tracking-wide transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <Icon icon={ICON_PLAY} width={14} />
            Execute
          </button>
        </Show>
      </div>
    </header>
  );
}
