import { Icon } from "@iconify-icon/solid";
import { ICON_CHECK } from "~/lib/icons";
import { Show } from "solid-js";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  class?: string;
}

export function Checkbox(props: CheckboxProps) {
  return (
    <button 
      onClick={() => props.onChange(!props.checked)}
      class={`flex items-center gap-3 group transition-all active:scale-95 ${props.class || ""}`}
    >
      <div 
        class={`h-5 w-5 rounded-lg border-2 flex items-center justify-center transition-all duration-300`}
        classList={{
           "bg-theme border-theme shadow-lg shadow-theme/30": props.checked,
           "bg-input border-input-border text-transparent hover:border-theme/30": !props.checked
        }}
      >
        <Show when={props.checked}>
           <Icon icon={ICON_CHECK} width={14} class="text-white animate-scale-in" />
        </Show>
      </div>
      <Show when={props.label}>
         <span class="text-xs font-black uppercase tracking-widest text-muted group-hover:text-main transition-colors">
           {props.label}
         </span>
      </Show>
    </button>
  );
}
