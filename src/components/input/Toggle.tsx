
import { JSX, Show } from "solid-js";

export interface ToggleProps {
  active: boolean;
  onToggle?: () => void;
  onChange?: (active: boolean) => void;
  label?: string;
  icon?: JSX.Element;
  class?: string;
  disabled?: boolean;
}

export function Toggle(props: ToggleProps) {
  const handleToggle = () => {
    if (props.disabled) return;
    props.onToggle?.();
    props.onChange?.(!props.active);
  };

  const hasContent = () => !!(props.label || props.icon);

  return (
    <button
      onClick={handleToggle}
      disabled={props.disabled}
      class={`flex items-center transition-all group active:scale-[0.95] cursor-pointer ${props.class || ""} ${props.disabled ? 'opacity-50 pointer-events-none' : ''}`}
      classList={{
        "w-full justify-between p-3 rounded-xl bg-input border border-input-border shadow-sm": hasContent(),
        "p-1": !hasContent()
      }}
      style={hasContent() ? { "box-shadow": "var(--color-input-shadow)" } : {}}
    >
      <Show when={hasContent()}>
        <div class="flex items-center gap-3 pr-8">
          <Show when={props.icon}>
            <div class="text-theme flex items-center justify-center w-5 h-5">
              {props.icon}
            </div>
          </Show>
          <span class="text-xs font-bold uppercase tracking-wider text-main whitespace-nowrap">
            {props.label}
          </span>
        </div>
      </Show>

      <div
        class="h-6 w-11 rounded-full relative p-1 transition-all duration-300"
        classList={{
          "bg-theme shadow-lg": props.active,
          "bg-surface/50 dark:bg-black/40 border border-black/5 dark:border-white/10 shadow-inner": !props.active
        }}
      >
        <div class={`h-4 w-4 rounded-full transition-all duration-300 shadow-sm ${props.active ? 'bg-white translate-x-5 scale-110' : 'bg-muted/80 translate-x-0'}`} />
      </div>
    </button>
  );
}
