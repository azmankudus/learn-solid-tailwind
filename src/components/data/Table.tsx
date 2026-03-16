import { createSignal, createMemo, For, Show, JSX } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_UP_DOWN, ICON_FUNNEL, ICON_X_MARK, ICON_BOLT, ICON_PENCIL_SQUARE, ICON_TRASH } from "~/lib/icons";
import { Pagination } from "./Pagination";
import { DataModal } from "./DataModal";
import { AdvancedFilterModal, FilterGroup, FilterCondition } from "./AdvancedFilterModal";

export type ColumnType = "string" | "number" | "date" | "time" | "date-time" | "duration" | "boolean" | "enum" | "action";

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  type?: ColumnType;
  render?: (item: T) => JSX.Element;
  sortable?: boolean;
  filterable?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  class?: string;
  onExecute?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  title?: string;
}

export function Table<T extends Record<string, any>>(props: TableProps<T>) {
  const [currentPage, setCurrentPage] = createSignal(1);
  const [sortConfig, setSortConfig] = createSignal<{ key: string; direction: 'asc' | 'desc' | null }>({ key: "", direction: null });
  const [filters, setFilters] = createSignal<Record<string, string>>({});
  const [activeFilters, setActiveFilters] = createSignal<Record<string, string>>({});
  const [advancedFilter, setAdvancedFilter] = createSignal<FilterGroup | null>(null);
  const [showAdvancedModal, setShowAdvancedModal] = createSignal(false);
  const [selectedRow, setSelectedRow] = createSignal<T | null>(null);

  const pageSize = () => props.pageSize || 10;

  const createWildcardRegex = (pattern: string) => {
     let escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&');
     escaped = escaped.replace(/\*/g, '.*').replace(/\?/g, '.');
     return new RegExp(`^${escaped}$`, 'i');
  };

  const evaluateCondition = (item: T, cond: FilterCondition): boolean => {
    const val = item[cond.field];
    if (val === undefined || val === null) return false;
    
    let isMatch = false;
    const strVal = String(val).toLowerCase();
    const compareVal = String(cond.value).toLowerCase();
    const compareVal2 = cond.value2 !== undefined ? String(cond.value2).toLowerCase() : "";

    switch (cond.operator) {
      case "equals": isMatch = strVal === compareVal; break;
      case "starts_with": isMatch = strVal.startsWith(compareVal); break;
      case "ends_with": isMatch = strVal.endsWith(compareVal); break;
      case "contains": isMatch = strVal.includes(compareVal); break;
      case "regex": try { isMatch = new RegExp(cond.value, cond.ignoreCase ? "i" : "").test(String(val)); } catch { isMatch = false; } break;
      case "gt": isMatch = Number(val) > Number(cond.value); break;
      case "lt": isMatch = Number(val) < Number(cond.value); break;
      case "gte": isMatch = Number(val) >= Number(cond.value); break;
      case "lte": isMatch = Number(val) <= Number(cond.value); break;
      case "between": {
        const nVal = Number(val);
        isMatch = nVal >= Number(cond.value) && nVal <= Number(cond.value2);
        break;
      }
      case "is": isMatch = Boolean(val) === Boolean(cond.value); break;
      case "in": isMatch = String(cond.value).split(",").map(v => v.trim().toLowerCase()).includes(strVal); break;
    }

    return cond.not ? !isMatch : isMatch;
  };

  const evaluateGroup = (item: T, group: FilterGroup): boolean => {
    if (group.items.length === 0) return true;
    
    if (group.logicalOperator === "AND") {
      return group.items.every(child => child.type === "group" ? evaluateGroup(item, child) : evaluateCondition(item, child));
    } else {
      return group.items.some(child => child.type === "group" ? evaluateGroup(item, child) : evaluateCondition(item, child));
    }
  };

  const filteredData = createMemo(() => {
    let result = [...props.data];

    // Apply Column Filters (Simple Wildcard)
    const currentActiveFilters = activeFilters();
    Object.keys(currentActiveFilters).forEach((key) => {
      const pattern = currentActiveFilters[key];
      if (pattern) {
        try {
          const regex = createWildcardRegex(pattern);
          result = result.filter((item) => {
            const val = item[key];
            if (val === undefined || val === null) return false;
            return regex.test(String(val));
          });
        } catch (e) {
          result = result.filter((item) => String(item[key]).toLowerCase().includes(pattern.toLowerCase()));
        }
      }
    });

    // Apply Advanced Filter (Complex Logic Engine)
    const advFilter = advancedFilter();
    if (advFilter) {
      result = result.filter(item => evaluateGroup(item, advFilter));
    }

    // Apply Sorting
    const { key, direction } = sortConfig();
    if (key && direction) {
      const col = props.columns.find(c => c.key === key);
      const type = col?.type || 'string';
      result.sort((a, b) => {
        let valA = a[key], valB = b[key];
        if (type === 'number') { valA = Number(valA); valB = Number(valB); }
        else if (['date', 'date-time', 'time'].includes(type)) { valA = new Date(valA).getTime(); valB = new Date(valB).getTime(); }
        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  });

  const paginatedData = createMemo(() => {
    const start = (currentPage() - 1) * pageSize();
    return filteredData().slice(start, start + pageSize());
  });

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        if (prev.direction === 'desc') return { key: "", direction: null };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleFilterKeyDown = (e: KeyboardEvent, key: string) => {
    if (e.key === "Enter") {
      setActiveFilters({ ...activeFilters(), [key]: filters()[key] || "" });
      setCurrentPage(1);
    }
  };

  const clearFilters = () => {
    setFilters({});
    setActiveFilters({});
    setAdvancedFilter(null);
    setCurrentPage(1);
  };

  const ActionButtons = (bProps: { item: T, onEx?: (i: T) => void, onEd?: (i: T) => void, onDe?: (i: T) => void }) => (
    <div class="flex items-center gap-1.5">
       <Show when={!!bProps.onEx}>
          <button onClick={(e) => { e.stopPropagation(); bProps.onEx!(bProps.item); }} class="w-8 h-8 rounded-lg bg-theme/10 text-theme flex items-center justify-center hover:bg-theme hover:text-white transition-all active:scale-90 shadow-sm"><Icon icon={ICON_BOLT} width={14} /></button>
       </Show>
       <Show when={!!bProps.onEd}>
          <button onClick={(e) => { e.stopPropagation(); bProps.onEd!(bProps.item); }} class="w-8 h-8 rounded-lg bg-input border border-input-border text-main flex items-center justify-center hover:border-theme hover:text-theme transition-all active:scale-90 shadow-sm"><Icon icon={ICON_PENCIL_SQUARE} width={14} /></button>
       </Show>
       <Show when={!!bProps.onDe}>
          <button onClick={(e) => { e.stopPropagation(); bProps.onDe!(bProps.item); }} class="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-90 shadow-sm"><Icon icon={ICON_TRASH} width={14} /></button>
       </Show>
    </div>
  );

  return (
    <div class={`flex flex-col gap-4 ${props.class || ""}`}>
      <div class="flex items-center justify-between px-1">
         <div class="flex items-center gap-3">
            <button 
              onClick={() => setShowAdvancedModal(true)}
              class="h-9 px-4 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all bg-theme/5 text-theme border border-theme/20 hover:bg-theme hover:text-white shadow-lg shadow-theme/5"
            >
               <Icon icon={ICON_FUNNEL} width={14} />
               Logic Engine
            </button>
            <Show when={Object.values(activeFilters()).some(v => v) || !!advancedFilter()}>
               <button onClick={clearFilters} class="h-9 px-4 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/10">
                 <Icon icon={ICON_X_MARK} width={14} />
                 Reset Calibration
               </button>
            </Show>
         </div>
         <div class="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
            Registry Count: <span class="text-theme">{filteredData().length}</span> Nodes 
         </div>
      </div>

      <div class="w-full overflow-hidden border-2 border-input-border rounded-3xl bg-surface shadow-2xl">
        <div class="overflow-x-auto custom-scrollbar">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-input/50 border-b-2 border-input-border">
                <For each={props.columns}>
                  {(col) => (
                    <th class="p-4 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-muted relative" style={{ width: col.width }}>
                      <div class="flex items-center justify-between group">
                        <span>{col.header}</span>
                        <Show when={col.sortable !== false && col.type !== 'action'}><button onClick={() => handleSort(col.key)} class="p-1 rounded-md transition-all duration-300 hover:bg-theme/10 hover:text-theme" classList={{ "text-theme rotate-180": sortConfig().key === col.key && sortConfig().direction === 'desc', "text-theme": sortConfig().key === col.key && sortConfig().direction === 'asc' }}><Icon icon={ICON_UP_DOWN} width={10} /></button></Show>
                      </div>
                    </th>
                  )}
                </For>
              </tr>
              <tr class="bg-input/20 border-b border-input-border">
                <For each={props.columns}>
                  {(col) => (
                    <td class="p-2 px-4 text-center">
                      <Show when={col.filterable !== false && col.type !== 'action'}>
                        <div class="relative group">
                           <input type="text" placeholder="..." value={filters()[col.key] || ""} onInput={(e) => setFilters({ ...filters(), [col.key]: e.currentTarget.value })} onKeyDown={(e) => handleFilterKeyDown(e, col.key)} class="w-full bg-input/50 border border-input-border rounded-xl px-3 py-1.5 text-[11px] font-bold text-main outline-none focus:border-theme/50 focus:bg-solid focus:ring-4 focus:ring-theme/10 transition-all placeholder:text-[9px] placeholder:font-black placeholder:uppercase placeholder:opacity-30" />
                        </div>
                      </Show>
                    </td>
                  )}
                </For>
              </tr>
            </thead>
            <tbody class="divide-y divide-input-border/50">
              <For each={paginatedData()} fallback={<tr><td colspan={props.columns.length} class="p-24 text-center"><div class="flex flex-col items-center gap-4 opacity-30"><Icon icon={ICON_FUNNEL} width={48} /><span class="text-xs font-black uppercase tracking-[0.3em] italic">Access Denied: No Records Available</span></div></td></tr>}>
                {(item, i) => (
                  <tr onClick={() => setSelectedRow(item as any)} class="group hover:bg-theme/[0.03] transition-colors border-l-4 border-transparent hover:border-theme/40 animate-fade-in cursor-pointer" style={{ "animation-delay": `${i() * 30}ms` }}>
                    <For each={props.columns}>
                      {(col) => (
                        <td class="p-4 text-[13px] font-semibold text-main/90">
                          <Show when={col.type === 'action'} fallback={col.render ? col.render(item) : (<Show when={col.type === 'boolean'} fallback={String(item[col.key])}><div class="flex items-center gap-2"><div class={`w-2.5 h-2.5 rounded-full ${item[col.key] ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`} /><span class="text-[10px] font-black uppercase tracking-widest">{String(item[col.key])}</span></div></Show>)}><ActionButtons item={item} onEx={props.onExecute} onEd={props.onEdit} onDe={props.onDelete} /></Show>
                        </td>
                      )}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>

      <Pagination current={currentPage()} total={filteredData().length} pageSize={pageSize()} onChange={setCurrentPage} class="justify-center mt-2" />

      <DataModal data={selectedRow()} columns={props.columns.filter(c => c.type !== 'action').map(c => ({ key: c.key, header: c.header, type: c.type || "string" }))} title={props.title} onClose={() => setSelectedRow(null)} />
      
      <Show when={showAdvancedModal()}>
        <AdvancedFilterModal 
          columns={props.columns.filter(c => c.type !== 'action').map(c => ({ key: c.key, header: c.header, type: c.type || "string" }))}
          initialFilter={advancedFilter() || undefined}
          onApply={(filter) => { setAdvancedFilter(filter); setShowAdvancedModal(false); setCurrentPage(1); }}
          onClose={() => setShowAdvancedModal(false)}
        />
      </Show>
    </div>
  );
}
