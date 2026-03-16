import { createSignal, For, onMount, createEffect } from "solid-js";

export interface PinFieldProps {
  label?: string;
  length?: number;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  mask?: boolean;
  class?: string;
}

export function PinField(props: PinFieldProps) {
  const length = () => props.length || 4;
  const [focusedIndex, setFocusedIndex] = createSignal<number | null>(null);
  let inputRefs: HTMLInputElement[] = [];

  const handleInput = (e: InputEvent, index: number) => {
    const val = (e.currentTarget as HTMLInputElement).value;
    // Only allow one digit
    const digit = val.slice(-1).replace(/[^0-9]/g, "");
    
    if (digit) {
      const currentVal = props.value.split("");
      currentVal[index] = digit;
      props.onChange(currentVal.join(""));
      
      // Move to next
      if (index < length() - 1) {
        inputRefs[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      if (!props.value[index] && index > 0) {
        const currentVal = props.value.split("");
        currentVal[index - 1] = "";
        props.onChange(currentVal.join(""));
        inputRefs[index - 1].focus();
      } else {
        const currentVal = props.value.split("");
        currentVal[index] = "";
        props.onChange(currentVal.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length() - 1) {
      inputRefs[index + 1].focus();
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData?.getData("text") || "";
    const digits = pasteData.replace(/[^0-9]/g, "").slice(0, length());
    props.onChange(digits);
    
    // Focus last filled or first empty
    const nextIndex = Math.min(digits.length, length() - 1);
    inputRefs[nextIndex]?.focus();
  };

  return (
    <div class={`flex flex-col gap-2.5 ${props.class || ""}`}>
      {props.label && (
        <label class="text-[0.8rem] font-black text-main ml-1 uppercase tracking-widest leading-none">
          {props.label}
        </label>
      )}
      
      <div class="flex items-center gap-3">
        <For each={Array.from({ length: length() })}>
          {(_, i) => (
            <div class="relative group">
              <input
                ref={(el) => (inputRefs[i()] = el)}
                type={props.mask ? "password" : "text"}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={props.value[i()] || ""}
                disabled={props.disabled}
                onInput={(e) => handleInput(e as InputEvent, i())}
                onKeyDown={(e) => handleKeyDown(e, i())}
                onPaste={handlePaste}
                onFocus={() => setFocusedIndex(i())}
                onBlur={() => setFocusedIndex(null)}
                class="w-12 h-14 md:w-14 md:h-16 text-center text-xl md:text-2xl font-black bg-input border-2 border-input-border rounded-xl transition-all duration-300 outline-none select-none"
                classList={{
                  "border-theme ring-4 ring-theme/10 bg-solid shadow-lg scale-105 z-10": focusedIndex() === i(),
                  "hover:border-theme/30": focusedIndex() !== i() && !props.disabled,
                  "opacity-50 grayscale cursor-not-allowed": props.disabled === true,
                  "text-theme": props.value[i()] !== undefined && props.value[i()] !== ""
                }}
              />
              <div 
                class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-theme transition-all duration-500 scale-0"
                classList={{
                   "scale-100 opacity-100": focusedIndex() === i(),
                   "scale-50 opacity-0": focusedIndex() !== i()
                }}
              />
            </div>
          )}
        </For>
      </div>
      
      <div class="flex items-center gap-2 ml-1">
         <div class="h-1 w-8 rounded-full bg-theme/20 overflow-hidden">
            <div 
              class="h-full bg-theme transition-all duration-500"
              style={{ width: `${(props.value.length / length()) * 100}%` }}
            />
         </div>
         <span class="text-[9px] font-black text-muted uppercase tracking-tighter">
           {props.value.length} / {length()} Digits
         </span>
      </div>
    </div>
  );
}
