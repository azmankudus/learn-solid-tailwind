import { createMemo, For, Show } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_CHEVRON_LEFT, ICON_CHEVRON_RIGHT } from "~/lib/icons";

export interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
  class?: string;
}

export function Pagination(props: PaginationProps) {
  const totalPages = createMemo(() => Math.ceil(props.total / props.pageSize));
  
  const pages = createMemo(() => {
    const current = props.current;
    const total = totalPages();
    const result: (number | string)[] = [];
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) result.push(i);
    } else {
      result.push(1);
      if (current > 4) result.push("...");
      
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      
      for (let i = start; i <= end; i++) result.push(i);
      
      if (current < total - 3) result.push("...");
      result.push(total);
    }
    return result;
  });

  return (
    <div class={`flex items-center gap-2 ${props.class || ""}`}>
      <button
        disabled={props.current === 1}
        onClick={() => props.onChange(props.current - 1)}
        class="w-10 h-10 flex items-center justify-center rounded-xl bg-input border border-input-border text-main transition-all duration-300 hover:border-theme/30 disabled:opacity-30 disabled:pointer-events-none active:scale-95"
      >
        <Icon icon={ICON_CHEVRON_LEFT} width={18} />
      </button>
      
      <div class="flex items-center gap-1.5">
        <For each={pages()}>
          {(page) => (
            <Show 
              when={typeof page === "number"} 
              fallback={
                <span class="w-8 text-center text-[10px] font-black tracking-widest text-muted">...</span>
              }
            >
              <button
                onClick={() => props.onChange(page as number)}
                class="min-w-10 h-10 px-3 rounded-xl flex items-center justify-center text-xs font-black uppercase transition-all duration-300 active:scale-95"
                classList={{
                   "bg-theme text-white border-2 border-theme shadow-lg shadow-theme/20 z-10": props.current === page,
                   "bg-input border border-input-border text-main hover:border-theme/30": props.current !== page
                }}
              >
                {page}
              </button>
            </Show>
          )}
        </For>
      </div>

      <button
        disabled={props.current === totalPages()}
        onClick={() => props.onChange(props.current + 1)}
        class="w-10 h-10 flex items-center justify-center rounded-xl bg-input border border-input-border text-main transition-all duration-300 hover:border-theme/30 disabled:opacity-30 disabled:pointer-events-none active:scale-95"
      >
        <Icon icon={ICON_CHEVRON_RIGHT} width={18} />
      </button>
      
      <div class="ml-4 hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted">
         <span>Total </span>
         <span class="text-theme">{props.total}</span>
         <span> Entry</span>
      </div>
    </div>
  );
}
