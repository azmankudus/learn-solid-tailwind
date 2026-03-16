import { For, Show, createMemo, createSignal } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import { WorkflowNode, getNodeTypeDefinition, NodeParameter } from '~/lib/workflow/types';
import { ICON_X_MARK, ICON_TRASH, ICON_PLAY, ICON_CHECK_CIRCLE, ICON_X_MARK as ICON_ERROR, ICON_CODE } from '~/lib/icons';
import { TextField } from '~/components/input/TextField';
import { TextArea } from '~/components/input/TextArea';

interface NodePropertiesProps {
  node: WorkflowNode;
  onClose: () => void;
  onUpdate: (updates: Partial<WorkflowNode>) => void;
  onDelete: () => void;
  onTest: () => void;
  isReadOnly: boolean;
}

function ParameterInput(props: {
  parameter: NodeParameter;
  value: any;
  onChange: (value: any) => void;
  disabled: boolean;
}) {
  const handleChange = (val: string) => {
    switch (props.parameter.type) {
      case 'number':
        props.onChange(Number(val) || 0);
        break;
      case 'boolean':
        props.onChange(val === 'true');
        break;
      default:
        props.onChange(val);
    }
  };

  return (
    <Show
      when={props.parameter.type === 'select'}
      fallback={
        <Show
          when={props.parameter.type === 'code' || props.parameter.type === 'json'}
          fallback={
            <Show
              when={props.parameter.type === 'boolean'}
              fallback={
                <TextField
                  type={props.parameter.type === 'number' ? 'number' : props.parameter.type === 'password' ? 'password' : 'text'}
                  value={String(props.value ?? props.parameter.default ?? '')}
                  placeholder={props.parameter.placeholder}
                  onInput={handleChange}
                  disabled={props.disabled}
                />
              }
            >
              <select
                value={String(props.value ?? props.parameter.default ?? false)}
                onChange={(e) => props.onChange(e.currentTarget.value === 'true')}
                disabled={props.disabled}
                class="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-white outline-none focus:border-orange-400/50 disabled:opacity-50"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </Show>
          }
        >
          <div class="relative">
            <TextArea
              value={String(props.value ?? props.parameter.default ?? '')}
              placeholder={props.parameter.placeholder}
              onChange={handleChange}
              disabled={props.disabled}
              rows={6}
              class="font-mono text-xs"
            />
            <div class="absolute top-2 right-2">
              <Icon icon={ICON_CODE} class="text-slate-500" width={14} />
            </div>
          </div>
        </Show>
      }
    >
      <select
        value={String(props.value ?? props.parameter.default ?? '')}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        disabled={props.disabled}
        class="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-white outline-none focus:border-orange-400/50 disabled:opacity-50"
      >
        <For each={props.parameter.options}>
          {(opt) => (
            <option value={String(opt.value)}>{opt.label}</option>
          )}
        </For>
      </select>
    </Show>
  );
}

export function NodeProperties(props: NodePropertiesProps) {
  const definition = () => getNodeTypeDefinition(props.node.type);
  const [activeTab, setActiveTab] = createSignal<'params' | 'output'>('params');

  const handleParameterChange = (key: string, value: any) => {
    if (props.isReadOnly) return;
    props.onUpdate({
      parameters: {
        ...props.node.parameters,
        [key]: value,
      },
    });
  };

  return (
    <div class="w-96 h-full bg-[#12161f] border-l border-slate-700/50 flex flex-col animate-slide-in-right">
      <div class="flex items-center gap-3 p-4 border-b border-slate-700/50">
        <Show when={definition()}>
          <div
            class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ 'background-color': definition()!.color }}
          >
            <Icon icon={definition()!.icon} width={24} class="text-white" />
          </div>
        </Show>
        <div class="flex-1 min-w-0">
          <input
            type="text"
            value={props.node.name}
            onInput={(e) => !props.isReadOnly && props.onUpdate({ name: e.currentTarget.value })}
            disabled={props.isReadOnly}
            class="w-full bg-transparent text-sm font-bold text-white outline-none disabled:cursor-default"
          />
          <div class="text-[10px] text-slate-500 font-mono mt-0.5">{props.node.id}</div>
        </div>
        <button
          onClick={props.onClose}
          class="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <Icon icon={ICON_X_MARK} width={16} />
        </button>
      </div>

      <div class="flex border-b border-slate-700/50">
        <button
          onClick={() => setActiveTab('params')}
          class={`flex-1 py-3 text-xs font-bold uppercase tracking-wide transition-colors ${
            activeTab() === 'params' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          Parameters
        </button>
        <button
          onClick={() => setActiveTab('output')}
          class={`flex-1 py-3 text-xs font-bold uppercase tracking-wide transition-colors ${
            activeTab() === 'output' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          Output
        </button>
      </div>

      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <Show when={activeTab() === 'params'}>
          <div class="p-4 space-y-5">
            <Show when={definition()?.parameters.length === 0}>
              <div class="text-center py-8 text-slate-500 text-sm">
                No parameters for this node
              </div>
            </Show>

            <For each={definition()?.parameters}>
              {(param) => (
                <div class="space-y-2">
                  <label class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {param.label}
                    <Show when={param.required}>
                      <span class="text-orange-400">*</span>
                    </Show>
                  </label>
                  <ParameterInput
                    parameter={param}
                    value={props.node.parameters[param.key]}
                    onChange={(value) => handleParameterChange(param.key, value)}
                    disabled={props.isReadOnly}
                  />
                  <Show when={param.description}>
                    <p class="text-[10px] text-slate-500">{param.description}</p>
                  </Show>
                </div>
              )}
            </For>

            <div class="space-y-2 pt-4 border-t border-slate-700/50">
              <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Notes
              </label>
              <TextArea
                value={props.node.notes ?? ''}
                placeholder="Add notes for this node..."
                onChange={(value) => props.onUpdate({ notes: value })}
                disabled={props.isReadOnly}
                rows={3}
              />
            </div>
          </div>
        </Show>

        <Show when={activeTab() === 'output'}>
          <div class="p-4">
            <Show
              when={props.node.data && props.node.data.length > 0}
              fallback={
                <div class="text-center py-12">
                  <div class="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                    <Icon icon={ICON_CODE} class="text-slate-600" width={28} />
                  </div>
                  <p class="text-sm text-slate-500">No output data yet</p>
                  <p class="text-xs text-slate-600 mt-1">Run the workflow to see output</p>
                </div>
              }
            >
              <div class="p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl">
                <pre class="font-mono text-[11px] text-emerald-400/80 overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(props.node.data, null, 2)}
                </pre>
              </div>
            </Show>

            <Show when={props.node.error}>
              <div class="mt-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                <div class="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wide mb-2">
                  <Icon icon={ICON_ERROR} width={14} />
                  Error
                </div>
                <p class="text-sm text-rose-300">{props.node.error}</p>
              </div>
            </Show>
          </div>
        </Show>
      </div>

      <Show when={!props.isReadOnly}>
        <div class="p-4 border-t border-slate-700/50 flex gap-3">
          <button
            onClick={props.onDelete}
            class="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-xs font-bold uppercase tracking-wide border border-rose-500/20 transition-all"
          >
            Delete
          </button>
          <button
            onClick={props.onTest}
            class="flex-1 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2"
          >
            <Icon icon={ICON_PLAY} width={14} />
            Test Step
          </button>
        </div>
      </Show>
    </div>
  );
}
