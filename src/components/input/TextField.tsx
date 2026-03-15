import { createSignal, createEffect, Show } from "solid-js";

export interface TextFieldProps {
  type?: string;
  label?: string;
  value: string;
  onInput: (val: string) => void;
  error?: string;
  placeholder?: string;
  class?: string;
}

export function TextField(props: TextFieldProps) {
  const [isVisible, setIsVisible] = createSignal(true);

  createEffect(() => {
    if (props.error) setIsVisible(true);
  });

  return (
    <div class={`flex flex-col gap-1.5 ${props.class || ""}`}>
      <Show when={props.label}>
        <label class="text-[0.8rem] font-bold text-main ml-1 tracking-wide">{props.label}</label>
      </Show>
      <div class="relative">
        <Show when={props.error && isVisible()}>
          <div class="absolute bottom-full right-0 mb-1 p3 bg-rose-500 text-white text-[10px] font-bold rounded shadow-lg tracking-wider z-10 pointer-events-none animate-fade-in">
            {props.error}
          </div>
        </Show>
        <input
          type={props.type || "text"}
          value={props.value}
          onInput={(e) => {
            props.onInput(e.currentTarget.value);
            setIsVisible(false);
          }}
          placeholder={props.placeholder}
          class={`w-full bg-input border ${props.error && isVisible() ? 'border-rose-500 focus:ring-rose-500/20' : 'border-input-border focus:border-theme focus:ring-theme/20'} rounded-xl p-3 text-sm text-main placeholder-muted focus:outline-none focus:ring-4 transition-all`}
          style={{ "box-shadow": "var(--color-input-shadow)" }}
        />
      </div>
    </div>
  );
}
