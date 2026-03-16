
import { JSX, createMemo, Show, For } from "solid-js";
import { Tooltip } from "../content/Tooltip";

interface Option {
  id: string;
  label: string;
  icon?: (props: any) => JSX.Element;
  tooltip?: string;
}

export interface RadioProps {
  value: string;
  options: Option[];
  onChange?: (value: any) => void;
  onInput?: (value: any) => void;
  class?: string;
  disabled?: boolean;
}

export function Radio(props: RadioProps) {
  const activeIndex = createMemo(() =>
    props.options.findIndex(opt => opt.id === props.value)
  );

  const handleChange = (id: string) => {
    if (props.disabled) return;
    props.onChange?.(id);
    props.onInput?.(id);
  };

  return (
    <div
      class={`flex p-1 bg-input rounded-xl relative border border-input-border shadow-inner ${props.class || ""} ${props.disabled ? 'opacity-50 pointer-events-none' : ''}`}
      style={{ "box-shadow": "var(--color-input-shadow)" }}
    >
      {/* Sliding Background */}
      <Show when={activeIndex() !== -1}>
        <div
          class="absolute top-1 bottom-1 bg-theme rounded-lg shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0 border border-white/10"
          style={{
            width: `calc(${100 / props.options.length}% - 4px)`,
            transform: `translateX(${activeIndex() * 100}%)`,
            left: '4px'
          }}
        />
      </Show>

      {/* Options */}
      <For each={props.options}>
        {(option, index) => {
          const isActive = createMemo(() => index() === activeIndex());
          return (
            <Tooltip
              text={option.tooltip || option.label}
              disabled={!option.tooltip && !option.label}
              class="flex-1 !flex !items-stretch"
            >
              <button
                type="button"
                disabled={props.disabled}
                onClick={() => handleChange(option.id)}
                class={`w-full flex-1 flex items-center justify-center gap-2 p-3 rounded-lg relative z-10 transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                  isActive()
                    ? 'text-white hover:brightness-110' 
                    : 'text-muted hover:text-main hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {option.icon && (
                  <div class="flex items-center justify-center shrink-0">
                    {option.icon({ size: 18 })}
                  </div>
                )}
                <Show when={option.label}>
                  <span class="text-xs font-bold uppercase tracking-wider text-center leading-tight">{option.label}</span>
                </Show>
              </button>
            </Tooltip>
          );
        }}
      </For>
    </div>
  );
}
