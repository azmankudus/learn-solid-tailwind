import { createSignal, createMemo, Show } from "solid-js";

export interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  min?: number;
  max?: number;
  rows?: number;
  disabled?: boolean;
  class?: string;
}

export function TextArea(props: TextAreaProps) {
  const [isFocused, setIsFocused] = createSignal(false);
  const rows = () => props.rows || 4;

  const currentLength = () => props.value.length;
  
  const isInvalid = () => {
    if (props.min && currentLength() < props.min) return true;
    if (props.max && currentLength() > props.max) return true;
    return false;
  };

  return (
    <div class={`flex flex-col gap-2.5 ${props.class || ""}`}>
      <div class="flex justify-between items-end px-1">
        {props.label && (
          <label class="text-[0.8rem] font-black text-main uppercase tracking-widest leading-none">
            {props.label}
          </label>
        )}
        {(props.min || props.max) && (
          <div class="flex items-center gap-2">
            <span 
              class="text-[10px] font-black uppercase tracking-tighter"
              classList={{
                 "text-theme": !isInvalid(),
                 "text-red-500": isInvalid()
              }}
            >
              {currentLength()} {props.max ? `/ ${props.max}` : ""} Character{currentLength() !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      <div class="relative group">
        <textarea
          rows={rows()}
          placeholder={props.placeholder}
          value={props.value}
          disabled={props.disabled}
          onInput={(e) => props.onChange(e.currentTarget.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          class="w-full bg-input border-2 border-input-border rounded-2xl p-4 text-sm font-semibold text-main transition-all duration-300 outline-none resize-none custom-scrollbar"
          classList={{
            "border-theme bg-solid ring-4 ring-theme/10 shadow-lg": isFocused(),
            "border-red-500/50 bg-red-500/5": isInvalid() && props.value.length > 0,
            "hover:border-theme/30": !isFocused() && !props.disabled,
            "opacity-50 grayscale cursor-not-allowed": props.disabled === true
          }}
        />
        
        {/* Glow corner */}
        <div 
          class="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-theme/20 transition-all duration-500"
          classList={{ "bg-theme scale-150 shadow-[0_0_10px_var(--primary)]": isFocused() }}
        />
      </div>

      <Show when={isInvalid() && props.value.length > 0}>
        <div class="flex items-center gap-1.5 ml-1 animate-fade-in">
           <div class="w-1 h-1 rounded-full bg-red-500" />
           <span class="text-[9px] font-black text-red-500 uppercase tracking-widest">
             {props.min && currentLength() < props.min ? `Minimum ${props.min} required` : ""}
             {props.max && currentLength() > props.max ? `Maximum length exceeded` : ""}
           </span>
        </div>
      </Show>
    </div>
  );
}
