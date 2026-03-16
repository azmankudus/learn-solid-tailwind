import { For, Show, createSignal, createMemo } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import { NODE_CATALOG, NodeCategory, NodeTypeDefinition } from '~/lib/workflow/types';
import { ICON_SEARCH, ICON_X_MARK, ICON_CHEVRON_DOWN, ICON_CHEVRON_RIGHT } from '~/lib/icons';

interface NodePaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNode: (type: string) => void;
}

const CATEGORY_CONFIG: Record<NodeCategory, { label: string; color: string }> = {
  trigger: { label: 'Triggers', color: '#f59e0b' },
  action: { label: 'Actions', color: '#3b82f6' },
  logic: { label: 'Logic', color: '#8b5cf6' },
  transform: { label: 'Transform', color: '#10b981' },
  output: { label: 'Outputs', color: '#ef4444' },
};

const CATEGORY_ORDER: NodeCategory[] = ['trigger', 'action', 'logic', 'transform', 'output'];

function CategorySection(props: {
  category: NodeCategory;
  nodes: NodeTypeDefinition[];
  search: string;
  onAddNode: (type: string) => void;
  expanded: boolean;
  onToggle: () => void;
}) {
  const config = () => CATEGORY_CONFIG[props.category];
  
  const filteredNodes = createMemo(() => {
    const search = props.search.toLowerCase();
    return props.nodes.filter(n => 
      n.name.toLowerCase().includes(search) ||
      n.description.toLowerCase().includes(search)
    );
  });

  return (
    <Show when={filteredNodes().length > 0}>
      <div class="mb-4">
        <button
          onClick={props.onToggle}
          class="w-full flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
        >
          <Icon icon={props.expanded ? ICON_CHEVRON_DOWN : ICON_CHEVRON_RIGHT} width={12} />
          <span class="flex-1 text-left">{config().label}</span>
          <span class="text-slate-600">{filteredNodes().length}</span>
        </button>
        
        <Show when={props.expanded}>
          <div class="space-y-1 mt-1">
            <For each={filteredNodes()}>
              {(node) => (
                <button
                  onClick={() => props.onAddNode(node.type)}
                  class="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600 transition-all group text-left"
                >
                  <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                    style={{ 'background-color': `${node.color}15`, color: node.color }}
                  >
                    <Icon icon={node.icon} width={20} />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-xs font-bold text-white">{node.name}</div>
                    <div class="text-[10px] text-slate-500 truncate mt-0.5">{node.description}</div>
                  </div>
                </button>
              )}
            </For>
          </div>
        </Show>
      </div>
    </Show>
  );
}

export function NodePalette(props: NodePaletteProps) {
  const [search, setSearch] = createSignal('');
  const [expandedCategories, setExpandedCategories] = createSignal<Set<NodeCategory>>(
    new Set(['trigger', 'action'])
  );

  const nodesByCategory = createMemo(() => {
    const result: Partial<Record<NodeCategory, NodeTypeDefinition[]>> = {};
    for (const node of NODE_CATALOG) {
      if (!result[node.category]) result[node.category] = [];
      result[node.category]!.push(node);
    }
    return result;
  });

  const toggleCategory = (category: NodeCategory) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return (
    <Show when={props.isOpen}>
      <div class="w-80 h-full bg-[#12161f] border-l border-slate-700/50 flex flex-col animate-slide-in-right">
        <div class="flex items-center justify-between p-4 border-b border-slate-700/50">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide">Add Node</h3>
          <button
            onClick={props.onClose}
            class="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <Icon icon={ICON_X_MARK} width={16} />
          </button>
        </div>

        <div class="p-4">
          <div class="relative">
            <Icon icon={ICON_SEARCH} class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" width={16} />
            <input
              type="text"
              placeholder="Search nodes..."
              value={search()}
              onInput={(e) => setSearch(e.currentTarget.value)}
              class="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-400/50 focus:ring-1 focus:ring-orange-400/20 transition-all"
            />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
          <For each={CATEGORY_ORDER}>
            {(category) => (
              <CategorySection
                category={category}
                nodes={nodesByCategory()[category] || []}
                search={search()}
                onAddNode={(type) => {
                  props.onAddNode(type);
                  props.onClose();
                }}
                expanded={expandedCategories().has(category)}
                onToggle={() => toggleCategory(category)}
              />
            )}
          </For>
        </div>
      </div>
    </Show>
  );
}
