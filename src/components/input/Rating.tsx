import { createSignal, For, Show } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_STAR } from "~/lib/icons";

export interface RatingProps {
  label?: string;
  count?: number;
  value: number;
  onChange: (val: number) => void;
  icon?: any;
  disabled?: boolean;
  size?: number;
  class?: string;
}

export function Rating(props: RatingProps) {
  const count = () => props.count || 5;
  const size = () => props.size || 24;
  const icon = () => props.icon || ICON_STAR;
  
  const [hoverValue, setHoverValue] = createSignal<number | null>(null);

  const displayValue = () => hoverValue() ?? props.value;

  return (
    <div class={`flex flex-col gap-2.5 ${props.class || ""}`}>
      {props.label && (
        <label class="text-[0.8rem] font-black text-main uppercase tracking-widest ml-1">
          {props.label}
        </label>
      )}

      <div 
        class="flex items-center gap-1.5"
        onMouseLeave={() => setHoverValue(null)}
      >
        <For each={Array.from({ length: count() })}>
          {(_, i) => {
            const index = i() + 1;
            const isActive = () => index <= displayValue();
            
            return (
              <button
                type="button"
                disabled={props.disabled}
                onClick={() => props.onChange(index)}
                onMouseEnter={() => !props.disabled && setHoverValue(index)}
                class="relative transition-all duration-300 active:scale-90 outline-none"
                classList={{
                  "cursor-pointer": !props.disabled,
                  "cursor-not-allowed opacity-50": props.disabled === true
                }}
              >
                {/* Background/Base Icon */}
                <div 
                  class="text-input-border transition-colors duration-300"
                  classList={{ "text-theme/20": isActive() }}
                >
                  <Icon icon={icon()} width={size()} height={size()} />
                </div>

                {/* Active/Glow Icon Overlay */}
                <div 
                  class="absolute inset-0 text-theme transition-all duration-300 origin-center overflow-hidden w-0"
                  classList={{
                     "w-full": isActive(),
                     "scale-110 drop-shadow-[0_0_8px_var(--primary)]": isActive() && hoverValue() === index
                  }}
                >
                   <Icon icon={icon()} width={size()} height={size()} />
                </div>
              </button>
            );
          }}
        </For>
        
        <Show when={props.value > 0}>
           <span class="ml-2 text-xs font-black text-theme animate-fade-in px-2 py-0.5 bg-theme/5 rounded-md">
             {props.value.toFixed(1)}
           </span>
        </Show>
      </div>
    </div>
  );
}
