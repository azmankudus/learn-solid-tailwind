import { Show, For, createMemo, createSignal, createEffect } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import { WorkflowNode, getNodeTypeDefinition, NodeParameter } from '~/lib/workflow/types';
import { Toggle } from '~/components/input/Toggle';
import { ICON_X_MARK, ICON_CODE } from '~/lib/icons';

interface NodeConfigModalProps {
  isOpen: boolean;
  node: WorkflowNode | null;
  onClose: () => void;
  onSave: (nodeId: string, updates: Partial<WorkflowNode>) => void;
  onDelete: (nodeId: string) => void;
  onDuplicate: (nodeId: string) => void;
  isReadOnly: boolean;
}

function ParameterField(props: {
  parameter: NodeParameter;
  value: any;
  onChange: (value: any) => void;
  disabled: boolean;
}) {
  return (
    <div class="space-y-2">
      <label class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
        {props.parameter.label}
        <Show when={props.parameter.required}>
          <span class="text-orange-400">*</span>
        </Show>
      </label>

      <Show when={props.parameter.type === 'string' || props.parameter.type === 'password'}>
        <input
          type={props.parameter.type === 'password' ? 'password' : 'text'}
          value={props.value ?? props.parameter.default ?? ''}
          placeholder={props.parameter.placeholder}
          onInput={(e) => props.onChange(e.currentTarget.value)}
          disabled={props.disabled}
          class="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-400/50 disabled:opacity-50 transition-colors"
        />
      </Show>

      <Show when={props.parameter.type === 'number'}>
        <input
          type="number"
          value={props.value ?? props.parameter.default ?? 0}
          placeholder={props.parameter.placeholder}
          onInput={(e) => props.onChange(parseFloat(e.currentTarget.value) || 0)}
          disabled={props.disabled}
          class="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-400/50 disabled:opacity-50 transition-colors"
        />
      </Show>

      <Show when={props.parameter.type === 'boolean'}>
        <Toggle
          checked={props.value ?? props.parameter.default ?? false}
          onChange={(v) => props.onChange(v)}
          disabled={props.disabled}
        />
      </Show>

      <Show when={props.parameter.type === 'select'}>
        <select
          value={props.value ?? props.parameter.default ?? ''}
          onChange={(e) => props.onChange(e.currentTarget.value)}
          disabled={props.disabled}
          class="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-white outline-none focus:border-orange-400/50 disabled:opacity-50 transition-colors"
        >
          <For each={props.parameter.options}>
            {(opt) => <option value={String(opt.value)}>{opt.label}</option>}
          </For>
        </select>
      </Show>

      <Show when={props.parameter.type === 'code'}>
        <div class="relative">
          <div class="absolute top-2 right-2 flex items-center gap-1 text-slate-500 text-[10px] font-bold uppercase">
            <Icon icon={ICON_CODE} width={12} />
            <span>JavaScript</span>
          </div>
          <textarea
            value={props.value ?? props.parameter.default ?? ''}
            placeholder={props.parameter.placeholder}
            onInput={(e) => props.onChange(e.currentTarget.value)}
            disabled={props.disabled}
            rows={10}
            class="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-sm text-emerald-400 font-mono placeholder:text-slate-600 outline-none focus:border-orange-400/50 disabled:opacity-50 transition-colors resize-none"
            spellcheck={false}
          />
        </div>
      </Show>

      <Show when={props.parameter.type === 'json'}>
        <textarea
          value={props.value ?? props.parameter.default ?? ''}
          placeholder={props.parameter.placeholder}
          onInput={(e) => props.onChange(e.currentTarget.value)}
          disabled={props.disabled}
          rows={6}
          class="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-sm text-blue-400 font-mono placeholder:text-slate-600 outline-none focus:border-orange-400/50 disabled:opacity-50 transition-colors resize-none"
          spellcheck={false}
        />
      </Show>

      <Show when={props.parameter.description}>
        <p class="text-xs text-slate-500">{props.parameter.description}</p>
      </Show>
    </div>
  );
}

export function NodeConfigModal(props: NodeConfigModalProps) {
  const [activeTab, setActiveTab] = createSignal<'params' | 'output' | 'notes'>('params');
  const [localParams, setLocalParams] = createSignal<Record<string, any>>({});
  const [localName, setLocalName] = createSignal('');
  const [localNotes, setLocalNotes] = createSignal('');

  const definition = createMemo(() => {
    if (!props.node) return null;
    return getNodeTypeDefinition(props.node.type);
  });

  createEffect(() => {
    if (props.node) {
      setLocalParams({ ...props.node.parameters });
      setLocalName(props.node.name);
      setLocalNotes(props.node.notes ?? '');
    }
  });

  const handleSave = () => {
    if (!props.node || props.isReadOnly) return;
    props.onSave(props.node.id, {
      name: localName(),
      parameters: localParams(),
      notes: localNotes(),
    });
    props.onClose();
  };

  return (
    <Show when={props.isOpen && props.node}>
      <div
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && props.onClose()}
      >
        <div
          class="w-[640px] max-h-[90vh] bg-[#12161f] rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div class="flex items-center gap-4 p-5 border-b border-slate-700/50 bg-slate-800/30">
            <Show when={definition()}>
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                style={{ 'background-color': definition()!.color }}
              >
                <Icon icon={definition()!.icon} width={26} class="text-white" />
              </div>
            </Show>
            <div class="flex-1 min-w-0">
              <input
                type="text"
                value={localName()}
                disabled={props.isReadOnly}
                class="w-full bg-transparent text-lg font-bold text-white outline-none disabled:cursor-default"
                onInput={(e) => setLocalName(e.currentTarget.value)}
              />
              <div class="flex items-center gap-3 mt-1">
                <span class="text-xs text-slate-500 font-mono">{props.node!.id}</span>
                <span class="text-xs text-slate-600">•</span>
                <span class="text-xs text-slate-500 capitalize">{definition()?.category}</span>
                <Show when={props.node!.disabled}>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400">Disabled</span>
                </Show>
              </div>
            </div>
            <button
              onClick={props.onClose}
              class="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <Icon icon={ICON_X_MARK} width={20} />
            </button>
          </div>

          {/* Tabs */}
          <div class="flex border-b border-slate-700/50">
            <For each={['params', 'output', 'notes'] as const}>
              {(tab) => (
                <button
                  onClick={() => setActiveTab(tab)}
                  class={`flex-1 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                    activeTab() === tab
                      ? 'text-orange-400 border-b-2 border-orange-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab === 'params' ? 'Parameters' : tab === 'output' ? 'Output' : 'Notes'}
                  <Show when={tab === 'output' && props.node!.data && props.node!.data.length > 0}>
                    <span class="ml-2 px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400">
                      {props.node!.data!.length}
                    </span>
                  </Show>
                </button>
              )}
            </For>
          </div>

          {/* Content */}
          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <Show when={activeTab() === 'params'}>
              <div class="p-5 space-y-5">
                <Show
                  when={(definition()?.parameters.length ?? 0) > 0}
                  fallback={
                    <div class="text-center py-12">
                      <div class="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                        <Icon icon="mdi:cog-outline" class="text-slate-600" width={32} />
                      </div>
                      <p class="text-slate-500 text-sm">No parameters for this node type</p>
                    </div>
                  }
                >
                  <For each={definition()?.parameters}>
                    {(param) => (
                      <ParameterField
                        parameter={param}
                        value={localParams()[param.key]}
                        onChange={(value) => setLocalParams(p => ({ ...p, [param.key]: value }))}
                        disabled={props.isReadOnly}
                      />
                    )}
                  </For>
                </Show>
              </div>
            </Show>

            <Show when={activeTab() === 'output'}>
              <div class="p-5">
                <Show
                  when={props.node!.data && props.node!.data.length > 0}
                  fallback={
                    <div class="text-center py-12">
                      <div class="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                        <Icon icon="mdi:database-outline" class="text-slate-600" width={32} />
                      </div>
                      <p class="text-slate-500 text-sm">No output data yet</p>
                      <p class="text-slate-600 text-xs mt-1">Execute the workflow to see output</p>
                    </div>
                  }
                >
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold uppercase tracking-widest text-emerald-400">Output Data</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(JSON.stringify(props.node!.data, null, 2))}
                        class="px-3 py-1 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        Copy JSON
                      </button>
                    </div>
                    <div class="p-4 bg-slate-900 border border-slate-700/50 rounded-xl max-h-80 overflow-auto">
                      <pre class="font-mono text-xs text-emerald-400/80 whitespace-pre-wrap">
                        {JSON.stringify(props.node!.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                </Show>

                <Show when={props.node!.error}>
                  <div class="mt-5 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <div class="flex items-center gap-2 text-rose-400 text-sm font-bold mb-2">
                      <Icon icon="mdi:alert-circle" width={18} />
                      Execution Error
                    </div>
                    <p class="text-sm text-rose-300">{props.node!.error}</p>
                  </div>
                </Show>
              </div>
            </Show>

            <Show when={activeTab() === 'notes'}>
              <div class="p-5">
                <textarea
                  value={localNotes()}
                  placeholder="Add notes for this node..."
                  onInput={(e) => setLocalNotes(e.currentTarget.value)}
                  disabled={props.isReadOnly}
                  rows={12}
                  class="w-full bg-slate-800/30 border border-slate-700/50 rounded-xl py-4 px-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-orange-400/50 disabled:opacity-50 transition-colors resize-none"
                />
              </div>
            </Show>
          </div>

          {/* Footer */}
          <Show when={!props.isReadOnly}>
            <div class="flex items-center justify-between p-4 border-t border-slate-700/50 bg-slate-800/20">
              <div class="flex items-center gap-2">
                <button
                  onClick={() => { props.onDuplicate(props.node!.id); props.onClose(); }}
                  class="px-4 py-2 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wide transition-colors"
                >
                  Duplicate
                </button>
                <button
                  onClick={() => props.onSave(props.node!.id, { disabled: !props.node!.disabled })}
                  class={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-colors ${
                    props.node!.disabled
                      ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                  }`}
                >
                  {props.node!.disabled ? 'Enable' : 'Disable'}
                </button>
                <button
                  onClick={() => { props.onDelete(props.node!.id); props.onClose(); }}
                  class="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white text-xs font-bold uppercase tracking-wide transition-colors"
                >
                  Delete
                </button>
              </div>
              <div class="flex items-center gap-2">
                <button
                  onClick={props.onClose}
                  class="px-4 py-2 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wide transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  class="px-6 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold uppercase tracking-wide transition-colors shadow-lg shadow-orange-500/20"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </Show>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(100, 116, 139, 0.3); border-radius: 10px; }
        .animate-scale-in { animation: scaleIn 0.15s ease-out forwards; }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </Show>
  );
}
