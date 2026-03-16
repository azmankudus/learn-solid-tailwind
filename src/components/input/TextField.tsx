
import { createSignal, createEffect, Show } from "solid-js";

export interface TextFieldProps {
  type?: string;
  label?: string;
  value: string;
  onInput?: (val: string) => void;
  onChange?: (val: string) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  error?: string;
  placeholder?: string;
  class?: string;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export function TextField(props: TextFieldProps) {
  const [isVisible, setIsVisible] = createSignal(false);

  createEffect(() => {
    if (props.error) setIsVisible(true);
  });

  const handleInput = (val: string) => {
    props.onInput?.(val);
    props.onChange?.(val);
    if (isVisible()) setIsVisible(false);
  };

  return (
    <div class={`flex flex-col gap-1.5 ${props.class || ""} ${props.disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div class="flex items-center justify-between px-1">
        <Show when={props.label}>
          <label class="text-[0.8rem] font-bold text-main tracking-wide">{props.label}</label>
        </Show>
        <Show when={props.maxLength !== undefined || props.minLength !== undefined}>
          <div 
            class="text-[10px] font-black uppercase tracking-widest transition-all duration-300"
            classList={{
              "text-rose-500": (props.minLength !== undefined && props.value.length > 0 && props.value.length < props.minLength) || (props.maxLength !== undefined && props.value.length >= props.maxLength),
              "text-muted": !((props.minLength !== undefined && props.value.length > 0 && props.value.length < props.minLength) || (props.maxLength !== undefined && props.value.length >= props.maxLength))
            }}
          >
            <span classList={{ "animate-pulse": props.maxLength !== undefined && props.value.length >= props.maxLength }}>
              {props.value.length}
            </span>
            <Show when={props.maxLength !== undefined}>
              <span class="opacity-40 mx-1">/</span>
              <span>{props.maxLength}</span>
            </Show>
          </div>
        </Show>
      </div>
      <div class="relative">
        <Show when={props.error && isVisible()}>
          <div class="absolute bottom-full right-0 mb-1 px-3 py-1.5 bg-rose-500 text-white text-[10px] font-bold rounded shadow-lg tracking-wider z-10 pointer-events-none animate-fade-in whitespace-nowrap">
            {props.error}
          </div>
        </Show>
        <input
          type={props.type || "text"}
          value={props.value}
          disabled={props.disabled}
          onInput={(e) => handleInput(e.currentTarget.value)}
          onKeyDown={(e) => props.onKeyDown?.(e)}
          placeholder={props.placeholder || props.pattern}
          minLength={props.minLength}
          maxLength={props.maxLength}
          pattern={props.pattern}
          class={`w-full bg-input border ${props.error && isVisible() ? 'border-rose-500 focus:ring-rose-500/20' : 'border-input-border focus:border-theme focus:ring-theme/20'} rounded-xl p-3 text-sm text-main placeholder-muted focus:outline-none focus:ring-4 transition-all`}
          style={{ "box-shadow": "var(--color-input-shadow)" }}
        />
      </div>
    </div>
  );
}
