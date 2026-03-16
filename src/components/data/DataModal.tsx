import { createEffect, onCleanup, For, Show, JSX, Switch, Match } from "solid-js";
import { Portal } from "solid-js/web";
import { Icon } from "@iconify-icon/solid";
import { ICON_X_MARK, ICON_TABLE_CELLS, ICON_CLOCK, ICON_CALENDAR } from "~/lib/icons";

export interface DataModalProps {
  data: Record<string, any> | null;
  columns: { key: string; header: string; type?: string }[];
  title?: string;
  onClose: () => void;
}

function TypeBadge(props: { type?: string }) {
  if (!props.type) return null;
  return (
    <span class="text-[9px] font-black px-2 py-0.5 rounded-full bg-theme/10 text-theme uppercase tracking-widest border border-theme/20">
      {props.type}
    </span>
  );
}

function ValueDisplay(props: { value: any, type?: string }) {
  const val = () => props.value;
  const type = () => props.type?.toLowerCase();

  return (
    <div class="bg-input/30 rounded-2xl p-4 border border-input-border transition-all hover:border-theme/30 hover:bg-surface">
      <Show when={val() !== null && val() !== undefined} fallback={<span class="text-xs font-black italic text-muted opacity-50 uppercase tracking-widest leading-none mb-1.5 grayscale-[0.2]">NULL SEQUENCE</span>}>
        <Switch>
          <Match when={type() === 'boolean'}>
            <div class="flex items-center gap-2">
               <div class={`w-2 h-2 rounded-full ${val() ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`} />
               <span class="text-sm font-black uppercase tracking-tight">{String(val())}</span>
            </div>
          </Match>
          <Match when={['date', 'time', 'date-time', 'timestamp'].includes(type() || '')}>
             <div class="flex flex-col gap-3">
                <div class="text-xs font-mono text-theme bg-theme/5 p-2 rounded-lg border border-theme/10 w-fit">{String(val())}</div>
                <DateTimeDetail dateString={String(val())} />
             </div>
          </Match>
          <Match when={type() === 'enum'}>
             <span class="text-xs font-black px-3 py-1 bg-theme text-white rounded-lg shadow-lg shadow-theme/20 uppercase tracking-widest">{String(val())}</span>
          </Match>
          <Match when={true}>
            <span class="text-sm font-bold text-main break-words block">{String(val())}</span>
          </Match>
        </Switch>
      </Show>
    </div>
  );
}

function DateTimeDetail(props: { dateString: string }) {
  const d = new Date(props.dateString);
  if (isNaN(d.getTime())) return null;

  const details = [
    { label: "Weekday", val: d.toLocaleDateString('en-US', { weekday: 'long' }), icon: ICON_CLOCK },
    { label: "Calendar", val: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), icon: ICON_CALENDAR },
    { label: "Precise Time", val: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }), icon: ICON_CLOCK }
  ];

  return (
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
       <For each={details}>
         {(item) => (
           <div class="flex flex-col gap-1">
              <span class="text-[8px] font-black text-muted uppercase tracking-widest">{item.label}</span>
              <span class="text-[11px] font-bold text-main">{item.val}</span>
           </div>
         )}
       </For>
    </div>
  );
}


export function DataModal(props: DataModalProps) {
  createEffect(() => {
    if (props.data) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") props.onClose(); };
      window.addEventListener("keydown", handleEscape);
      onCleanup(() => {
        window.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = '';
      });
    }
  });

  return (
    <Portal>
      <Show when={props.data}>
        <div 
          class="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
          onClick={(e) => e.target === e.currentTarget && props.onClose()}
        >
          <div 
            class="bg-surface rounded-[2.5rem] shadow-2xl border-2 border-input-border overflow-hidden max-w-2xl w-full flex flex-col max-h-[90vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div class="bg-theme p-6 pt-8 shrink-0 relative flex items-center gap-4">
              <div class="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner">
                <Icon icon={ICON_TABLE_CELLS} width={24} height={24} />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-black text-white uppercase tracking-tighter italic">{props.title || "Entry Logistics"}</h3>
                <p class="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Diagnostic Payload Protocol Active</p>
              </div>
              <button 
                onClick={() => props.onClose()}
                class="absolute top-6 right-6 h-8 w-8 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all active:scale-90"
              >
                <Icon icon={ICON_X_MARK} width={18} />
              </button>
            </div>

            {/* Body */}
            <div class="overflow-y-auto custom-scrollbar p-8 space-y-8">
              <For each={props.columns}>
                {(col) => (
                  <div class="flex flex-col gap-3 group">
                    <div class="flex items-center justify-between px-1">
                      <span class="text-[10px] font-black uppercase tracking-[0.25em] text-muted group-hover:text-theme transition-colors italic">
                        // {col.header}
                      </span>
                      <TypeBadge type={col.type} />
                    </div>
                    <ValueDisplay value={props.data![col.key]} type={col.type} />
                  </div>
                )}
              </For>
            </div>

            {/* Footer */}
            <div class="p-6 border-t border-input-border/50 bg-input/20 flex justify-end">
               <button 
                 onClick={() => props.onClose()}
                 class="h-10 px-6 rounded-xl bg-theme text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-theme/20 hover:scale-[1.02] active:scale-95 transition-all"
               >
                 Acknowledge & Close
               </button>
            </div>
          </div>
        </div>
      </Show>
    </Portal>
  );
}
