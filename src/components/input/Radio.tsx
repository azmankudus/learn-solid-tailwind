import { JSX, createMemo, Show } from "solid-js";
import { Tooltip } from "../content/Tooltip";

interface Option {
  id: string;
  label: string;
  icon?: (props: any) => JSX.Element;
  tooltip?: string;
}

export interface RadioProps {
  value: string;
  options: [Option, Option];
  onChange: (value: any) => void;
  class?: string;
}

export function Radio(props: RadioProps) {
  const activeIndex = createMemo(() =>
    props.options.findIndex(opt => opt.id === props.value)
  );

  return (
    <div
      class={`flex p-1 bg-input rounded-xl relative border border-input-border shadow-inner ${props.class || ""}`}
      style={{ "box-shadow": "var(--color-input-shadow)" }}
    >
      {/* Sliding Background */}
      <div
        class="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-theme rounded-lg shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0 border border-white/10"
        style={{
          transform: `translateX(${activeIndex() * 100}%)`,
          left: '4px'
        }}
      />

      {/* Options */}
      <Tooltip
        text={props.options[0].tooltip || props.options[0].label}
        disabled={!props.options[0].tooltip && !!props.options[0].label}
        class="flex-1 h-full"
      >
        <button
          type="button"
          onClick={() => props.onChange(props.options[0].id)}
          class={`w-full h-full flex items-center justify-center gap-2 p-3 rounded-lg relative z-10 transition-all duration-300 active:scale-[0.98] cursor-pointer ${
            activeIndex() === 0 
              ? 'text-white hover:brightness-110' 
              : 'text-muted hover:text-main hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          {props.options[0].icon && (
            <div class="flex items-center justify-center">
              {props.options[0].icon({ size: 18 })}
            </div>
          )}
          <Show when={props.options[0].label}>
            <span class="text-xs font-bold uppercase tracking-wider">{props.options[0].label}</span>
          </Show>
        </button>
      </Tooltip>

      <Tooltip
        text={props.options[1].tooltip || props.options[1].label}
        disabled={!props.options[1].tooltip && !!props.options[1].label}
        class="flex-1 h-full"
      >
        <button
          type="button"
          onClick={() => props.onChange(props.options[1].id)}
          class={`w-full h-full flex items-center justify-center gap-2 p-3 rounded-lg relative z-10 transition-all duration-300 active:scale-[0.98] cursor-pointer ${
            activeIndex() === 1 
              ? 'text-white hover:brightness-110' 
              : 'text-muted hover:text-main hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          {props.options[1].icon && (
            <div class="flex items-center justify-center">
              {props.options[1].icon({ size: 18 })}
            </div>
          )}
          <Show when={props.options[1].label}>
            <span class="text-xs font-bold uppercase tracking-wider">{props.options[1].label}</span>
          </Show>
        </button>
      </Tooltip>
    </div>
  );
}
