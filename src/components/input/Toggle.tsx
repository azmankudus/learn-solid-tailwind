import { JSX, Show } from "solid-js";

export interface ToggleProps {
  active: boolean;
  onToggle: () => void;
  label?: string;
  icon?: JSX.Element;
  class?: string;
}

export function Toggle(props: ToggleProps) {
  return (
    <button
      onClick={props.onToggle}
      class={`w-full flex items-center justify-between p-4 rounded-xl bg-input border border-input-border hover:bg-hover transition-all group active:scale-[0.98] cursor-pointer ${props.class || ""}`}
      style={{ "box-shadow": "var(--color-input-shadow)" }}
    >
      <div class="flex items-center gap-3">
        <Show when={props.icon}>
          <div class="text-theme flex items-center justify-center w-5 h-5">
            {props.icon}
          </div>
        </Show>
        <span class="text-xs font-semibold text-main">
          {props.label}
        </span>
      </div>

      <div
        class={`h-6 w-11 rounded-full relative p-1 transition-all duration-300 
          ${props.active ? 'bg-theme border-primary-to shadow-lg' : 'bg-surface/50 dark:bg-black/40 border-black/10 dark:border-white/20 shadow-inner'}`}
      >
        <div class={`h-4 w-4 rounded-full transition-all duration-300 shadow-sm border-none ${props.active ? 'bg-white translate-x-5 scale-110' : 'bg-muted/80 translate-x-0'}`} />
      </div>
    </button>
  );
}
