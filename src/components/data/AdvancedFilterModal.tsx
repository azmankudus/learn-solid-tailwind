import { createSignal, For, Show, createMemo, JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { Icon } from "@iconify-icon/solid";
import { ICON_X_MARK, ICON_PLUS, ICON_TRASH, ICON_FUNNEL, ICON_BOLT, ICON_CHEVRON_RIGHT, ICON_SQUARE_3_STACK, ICON_FOLDER_PLUS } from "~/lib/icons";
import { Button } from "../input/Button";
import { Dropdown } from "../input/Dropdown";
import { TextField } from "../input/TextField";
import { Checkbox } from "../input/Checkbox";

export type LogicalOperator = "AND" | "OR";

export interface FilterCondition {
  id: string;
  type: "condition";
  field: string;
  operator: string;
  value: any;
  value2?: any; // For "between"
  not?: boolean;
  ignoreCase?: boolean;
}

export interface FilterGroup {
  id: string;
  type: "group";
  logicalOperator: LogicalOperator;
  items: (FilterCondition | FilterGroup)[];
}

export interface AdvancedFilterProps {
  columns: { key: string; header: string; type: string; options?: any[] }[];
  onApply: (filter: FilterGroup) => void;
  onClose: () => void;
  initialFilter?: FilterGroup;
}

const STRING_OPERATORS = [
  { label: "Equals", value: "equals" },
  { label: "Starts With", value: "starts_with" },
  { label: "Ends With", value: "ends_with" },
  { label: "Contains", value: "contains" },
  { label: "Like (Regex)", value: "regex" }
];

const NUMBER_OPERATORS = [
  { label: "Equals", value: "equals" },
  { label: "Greater Than", value: "gt" },
  { label: "Lower Than", value: "lt" },
  { label: "Greater Equals", value: "gte" },
  { label: "Lower Equals", value: "lte" },
  { label: "Between", value: "between" }
];

const DATE_OPERATORS = [
  { label: "Equals", value: "equals" },
  { label: "Earlier Than", value: "lt" },
  { label: "Later Than", value: "gt" },
  { label: "Between", value: "between" }
];

export function AdvancedFilterModal(props: AdvancedFilterProps) {
  const [rootGroup, setRootGroup] = createSignal<FilterGroup>(props.initialFilter || {
    id: "root",
    type: "group",
    logicalOperator: "AND",
    items: []
  });

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const getOperatorsForType = (type: string) => {
    switch (type) {
      case "number": return NUMBER_OPERATORS;
      case "date":
      case "time":
      case "date-time": 
      case "timestamp": return DATE_OPERATORS;
      case "boolean": return [{ label: "Is", value: "is" }];
      case "enum": return [{ label: "Equals", value: "equals" }, { label: "In (List)", value: "in" }];
      default: return STRING_OPERATORS;
    }
  };

  const addCondition = (groupId: string) => {
    const updateGroup = (group: FilterGroup): FilterGroup => {
      if (group.id === groupId) {
        const firstCol = props.columns[0];
        return {
          ...group,
          items: [...group.items, {
            id: generateId(),
            type: "condition",
            field: firstCol.key,
            operator: getOperatorsForType(firstCol.type)[0].value,
            value: firstCol.type === "boolean" ? true : ""
          }]
        };
      }
      return { ...group, items: group.items.map(item => item.type === "group" ? updateGroup(item) : item) };
    };
    setRootGroup(updateGroup(rootGroup()));
  };

  const addSubGroup = (groupId: string) => {
    const updateGroup = (group: FilterGroup): FilterGroup => {
      if (group.id === groupId) {
        return {
          ...group,
          items: [...group.items, {
            id: generateId(),
            type: "group",
            logicalOperator: "AND",
            items: []
          }]
        };
      }
      return { ...group, items: group.items.map(item => item.type === "group" ? updateGroup(item) : item) };
    };
    setRootGroup(updateGroup(rootGroup()));
  };

  const removeItem = (itemId: string) => {
    const updateGroup = (group: FilterGroup): FilterGroup => ({
      ...group,
      items: group.items.filter(item => item.id !== itemId).map(item => item.type === "group" ? updateGroup(item) : item)
    });
    setRootGroup(updateGroup(rootGroup()));
  };

  const updateCondition = (id: string, updates: Partial<FilterCondition>) => {
    const updateGroup = (group: FilterGroup): FilterGroup => ({
      ...group,
      items: group.items.map(item => {
        if (item.id === id) return { ...item, ...updates } as FilterCondition;
        if (item.type === "group") return updateGroup(item);
        return item;
      })
    });
    setRootGroup(updateGroup(rootGroup()));
  };

  const updateGroupOp = (id: string, op: LogicalOperator) => {
    const updateGroup = (group: FilterGroup): FilterGroup => {
      if (group.id === id) return { ...group, logicalOperator: op };
      return { ...group, items: group.items.map(item => item.type === "group" ? updateGroup(item) : item) };
    };
    setRootGroup(updateGroup(rootGroup()));
  };

  const ConditionRow = (cProps: { condition: FilterCondition }) => {
    const col = createMemo(() => props.columns.find(c => c.key === cProps.condition.field) || props.columns[0]);
    const operators = createMemo(() => getOperatorsForType(col().type));

    return (
      <div class="flex flex-wrap items-end gap-3 p-4 bg-input/20 border border-input-border rounded-2xl animate-fade-in group/row relative overflow-hidden">
        <div class="flex flex-col gap-1.5 min-w-[140px]">
           <span class="text-[8px] font-black uppercase tracking-widest text-muted px-1">Field</span>
           <Dropdown 
             options={props.columns.map(c => ({ label: c.header, value: c.key }))}
             value={cProps.condition.field}
             onChange={(val) => updateCondition(cProps.condition.id, { field: val, operator: getOperatorsForType(props.columns.find(c => c.key === val)!.type)[0].value })}
             class="h-9 !rounded-xl"
           />
        </div>

        <div class="flex flex-col gap-1.5 w-20 shrink-0">
          <span class="text-[8px] font-black uppercase tracking-widest text-muted px-1 text-center">Not?</span>
          <div class="h-9 flex items-center justify-center bg-input/50 rounded-xl border border-input-border">
             <Checkbox 
                checked={cProps.condition.not} 
                onChange={(checked: boolean) => updateCondition(cProps.condition.id, { not: checked })} 
             />
          </div>
        </div>

        <div class="flex flex-col gap-1.5 min-w-[120px]">
           <span class="text-[8px] font-black uppercase tracking-widest text-muted px-1">Operator</span>
           <Dropdown 
             options={operators()}
             value={cProps.condition.operator}
             onChange={(val) => updateCondition(cProps.condition.id, { operator: val })}
             class="h-9 !rounded-xl"
           />
        </div>

        <Show when={col().type !== "boolean"}>
           <div class="flex flex-col gap-1.5 flex-1 min-w-[150px]">
              <span class="text-[8px] font-black uppercase tracking-widest text-muted px-1">Value</span>
              <TextField 
                type={["number", "date", "time", "date-time"].includes(col().type) ? col().type as any : "text"}
                value={cProps.condition.value}
                onInput={(val) => updateCondition(cProps.condition.id, { value: val })}
                class="h-9 !rounded-xl"
              />
           </div>
        </Show>

        <Show when={cProps.condition.operator === "between"}>
           <div class="flex flex-col gap-1.5 flex-1 min-w-[150px]">
              <span class="text-[8px] font-black uppercase tracking-widest text-muted px-1">And Value</span>
              <TextField 
                type={["number", "date", "time", "date-time"].includes(col().type) ? col().type as any : "text"}
                value={cProps.condition.value2}
                onInput={(val) => updateCondition(cProps.condition.id, { value2: val })}
                class="h-9 !rounded-xl"
              />
           </div>
        </Show>

        <Show when={col().type === "string"}>
           <div class="flex flex-col gap-1.5 w-24 shrink-0">
              <span class="text-[8px] font-black uppercase tracking-widest text-muted px-1 text-center">Case?</span>
              <div class="h-9 flex items-center justify-center bg-input/50 rounded-xl border border-input-border">
                 <Checkbox 
                    checked={cProps.condition.ignoreCase} 
                    onChange={(checked: boolean) => updateCondition(cProps.condition.id, { ignoreCase: checked })} 
                 />
              </div>
           </div>
        </Show>

        <button 
          onClick={() => removeItem(cProps.condition.id)}
          class="h-9 w-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-90"
        >
          <Icon icon={ICON_TRASH} width={14} />
        </button>
      </div>
    );
  };

  const GroupView = (gProps: { group: FilterGroup, depth: number }) => {
    return (
      <div 
        class={`flex flex-col gap-4 p-5 rounded-[2rem] border-2 transition-all duration-500 ${gProps.depth === 0 ? 'bg-transparent border-input-border' : 'bg-surface border-theme/20 shadow-xl shadow-theme/5'}`}
      >
        <div class="flex items-center justify-between gap-4">
           <div class="flex items-center gap-3">
              <div class={`h-8 px-3 rounded-lg flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${gProps.group.logicalOperator === 'AND' ? 'bg-theme text-white' : 'bg-amber-500 text-white'}`}>
                 <Icon icon={ICON_BOLT} width={10} />
                 {gProps.group.logicalOperator} Engine
              </div>
              <div class="flex bg-input rounded-xl p-1 border border-input-border">
                  <button 
                    onClick={() => updateGroupOp(gProps.group.id, "AND")}
                    class={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${gProps.group.logicalOperator === 'AND' ? 'bg-theme text-white shadow-lg' : 'text-muted hover:text-main'}`}
                  >AND</button>
                  <button 
                    onClick={() => updateGroupOp(gProps.group.id, "OR")}
                    class={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${gProps.group.logicalOperator === 'OR' ? 'bg-amber-500 text-white shadow-lg' : 'text-muted hover:text-main'}`}
                  >OR</button>
              </div>
           </div>

           <div class="flex items-center gap-2">
              <button 
                onClick={() => addCondition(gProps.group.id)}
                class="h-8 px-3 rounded-xl bg-theme/5 text-theme border border-theme/20 flex items-center gap-2 text-[9px] font-black uppercase hover:bg-theme hover:text-white transition-all"
              >
                <Icon icon={ICON_PLUS} width={12} /> Add Rule
              </button>
              <button 
                onClick={() => addSubGroup(gProps.group.id)}
                class="h-8 px-3 rounded-xl bg-theme/5 text-theme border border-theme/20 flex items-center gap-2 text-[9px] font-black uppercase hover:bg-theme hover:text-white transition-all"
              >
                <Icon icon={ICON_FOLDER_PLUS} width={12} /> Add Group
              </button>
              <Show when={gProps.depth > 0}>
                <button 
                  onClick={() => removeItem(gProps.group.id)}
                  class="h-8 w-8 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                >
                  <Icon icon={ICON_TRASH} width={12} />
                </button>
              </Show>
           </div>
        </div>

        <div class="flex flex-col gap-4 pl-4 border-l-2 border-dashed border-input-border/50 py-2">
           <For each={gProps.group.items}>
             {(item) => (
                <Show when={item.type === "group"} fallback={<ConditionRow condition={item as FilterCondition} />}>
                   <GroupView group={item as FilterGroup} depth={gProps.depth + 1} />
                </Show>
             )}
           </For>
           <Show when={gProps.group.items.length === 0}>
              <div class="py-10 flex flex-col items-center justify-center opacity-30 gap-3 italic">
                 <Icon icon={ICON_SQUARE_3_STACK} width={32} />
                 <span class="text-[10px] font-black uppercase tracking-widest">Logic Cluster Empty</span>
              </div>
           </Show>
        </div>
      </div>
    );
  };

  return (
    <Portal>
      <div 
        class="fixed inset-0 z-[4000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
        onClick={(e) => e.target === e.currentTarget && props.onClose()}
      >
        <div 
          class="bg-surface rounded-[3rem] shadow-2xl border-2 border-input-border overflow-hidden max-w-5xl w-full flex flex-col max-h-[90vh] animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div class="bg-gradient-to-br from-theme to-theme/80 p-8 shrink-0 relative flex items-center gap-6">
            <div class="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-lg backdrop-blur-md border border-white/30">
              <Icon icon={ICON_FUNNEL} width={28} height={28} />
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-black text-white uppercase tracking-tighter italic leading-none mb-1">Advanced Logic Engine</h3>
              <p class="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">Construct complex multi-layered semantic filters</p>
            </div>
            <button 
              onClick={() => props.onClose()}
              class="h-10 w-10 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all active:scale-90"
            >
              <Icon icon={ICON_X_MARK} width={20} />
            </button>
          </div>

          {/* Body */}
          <div class="overflow-y-auto custom-scrollbar p-10 flex-1 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_30%)] from-theme/5">
             <GroupView group={rootGroup()} depth={0} />
          </div>

          {/* Footer */}
          <div class="p-8 border-t border-input-border/50 bg-input/20 flex justify-end gap-4 shadow-inner">
             <Button variant="secondary" onClick={props.onClose} class="!rounded-2xl px-8 h-12 uppercase text-[10px] font-black">Abort Sync</Button>
             <Button 
               variant="primary" 
               onClick={() => props.onApply(rootGroup())}
               class="!rounded-2xl px-12 h-12 uppercase text-[10px] font-black shadow-lg shadow-theme/30"
             >Apply Logic Protocol</Button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
