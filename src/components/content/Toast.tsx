import { createSignal, For, Show, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import { Icon } from "@iconify-icon/solid";
import { TransitionGroup } from "solid-transition-group";
import { ICON_CHECK_CIRCLE, ICON_EXCLAMATION_TRIANGLE, ICON_INFORMATION_CIRCLE, ICON_X_MARK } from "~/lib/icons";

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPosition = 
  | "top-left" | "top-right" | "bottom-left" | "bottom-right" 
  | "center-top" | "center-left" | "center" | "right" | "center-bottom" | "center-middle";

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: ToastType;
  duration?: number;
  position?: ToastPosition;
}

const [toasts, setToasts] = createStore<Toast[]>([]);

export const showToast = (toast: Omit<Toast, "id">) => {
  const id = Math.random().toString(36).slice(2, 11);
  const newToast: Toast = { ...toast, id };
  setToasts([...toasts, newToast]);

  const duration = toast.duration || 5000;
  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
};

export const removeToast = (id: string) => {
  setToasts(prev => prev.filter((t) => t.id !== id));
};

// Orchestration Coordinates
const POSITION_MAP: Record<string, string> = {
  "top-left": "top-0 left-0 items-start",
  "top-right": "top-0 right-0 items-end",
  "bottom-left": "bottom-0 left-0 items-start",
  "bottom-right": "bottom-0 right-0 items-end",
  "center-top": "top-0 left-1/2 -translate-x-1/2 items-center",
  "center-bottom": "bottom-0 left-1/2 -translate-x-1/2 items-center",
  "center-left": "top-1/2 left-0 -translate-y-1/2 items-start",
  "right": "top-1/2 right-0 -translate-y-1/2 items-end",
  "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center",
  "center-middle": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center"
};

export function ToastContainer() {
  const groupedToasts = createMemo(() => {
    const groups: Record<string, Toast[]> = {};
    Object.keys(POSITION_MAP).forEach(pos => groups[pos] = []);
    
    toasts.forEach(toast => {
      let pos = toast.position || "top-right";
      const normalizedPos = String(pos).toLowerCase().replace(/[\s_]+/g, "-");
      if (POSITION_MAP[normalizedPos]) {
        groups[normalizedPos].push(toast);
      } else {
        groups["top-right"].push(toast);
      }
    });
    return groups;
  });

  return (
    <div 
      class="fixed z-[6000] pointer-events-none transition-all duration-300 overflow-hidden"
      style={{
        "top": "64px",
        "left": "calc(max(0px, (100vw - var(--layout-max-width, 100vw)) / 2) + var(--sidebar-width, 0px))",
        "right": "max(0px, (100vw - var(--layout-max-width, 100vw)) / 2)",
        "bottom": "0"
      }}
    >
      <div class="relative w-full h-full">
        <For each={Object.entries(POSITION_MAP)}>
          {([posKey, posClass]) => (
            <div class={`absolute flex flex-col gap-3 p-4 z-10 ${posClass}`}>
              <TransitionGroup name="toast-item" appear>
                <For each={groupedToasts()[posKey]}>
                  {(toast) => <ToastItem toast={toast} />}
                </For>
              </TransitionGroup>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

function ToastItem(props: { toast: Toast }) {
  const iconMap = {
    success: ICON_CHECK_CIRCLE,
    error: ICON_X_MARK,
    warning: ICON_EXCLAMATION_TRIANGLE,
    info: ICON_INFORMATION_CIRCLE
  };

  const typeClasses = {
    success: "text-green-500 bg-green-500/10 border-green-500/20",
    error: "text-red-500 bg-red-500/10 border-red-500/20",
    warning: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    info: "text-blue-500 bg-blue-500/10 border-blue-500/20"
  };

  return (
    <div 
      class={`pointer-events-auto w-80 p-4 rounded-2xl bg-solid border-2 shadow-2xl transition-all duration-300 ${typeClasses[props.toast.type]} hover:relative hover:z-50 hover:scale-[1.02]`}
    >
      <div class="flex gap-4">
        <div class="shrink-0 mt-0.5">
          <Icon icon={iconMap[props.toast.type]} width={20} height={20} />
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-black uppercase tracking-widest leading-none mb-1.5 grayscale-[0.2]">{props.toast.title}</h4>
          <p class="text-[13px] font-semibold text-main/80 leading-relaxed mb-3">
            {props.toast.message}
          </p>
          <div class="h-1 w-full bg-black/5 rounded-full overflow-hidden transition-opacity duration-300">
             <div 
              class="h-full bg-current opacity-20 animate-[shimmer_linear_forwards]" 
              style={{ "animation-duration": `${props.toast.duration || 5000}ms` }}
             />
          </div>
        </div>
        <button 
          onClick={() => removeToast(props.toast.id)}
          class="shrink-0 hover:bg-black/5 rounded-lg h-6 w-6 flex items-center justify-center transition-colors px-0 cursor-pointer"
        >
          <Icon icon={ICON_X_MARK} width={16} height={16} />
        </button>
      </div>
    </div>
  );
}
