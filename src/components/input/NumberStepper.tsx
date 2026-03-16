import { createSignal, Show } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_PLUS, ICON_MINUS } from "~/lib/icons";

export interface NumberStepperProps {
  label?: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  class?: string;
}

export function NumberStepper(props: NumberStepperProps) {
  const step = () => props.step || 1;
  const [isFocused, setIsFocused] = createSignal(false);

  const increment = () => {
    const next = props.value + step();
    if (props.max !== undefined && next > props.max) return;
    props.onChange(next);
  };

  const decrement = () => {
    const next = props.value - step();
    if (props.min !== undefined && next < props.min) return;
    props.onChange(next);
  };

  const handleManualInput = (val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      props.onChange(num);
    }
  };

  return (
    <div class={`flex flex-col gap-2.5 ${props.class || ""}`}>
      {props.label && (
        <label class="text-[0.8rem] font-black text-main uppercase tracking-widest ml-1">
          {props.label}
        </label>
      )}

      <div 
        class="group flex items-center bg-input border-2 border-input-border rounded-2xl p-1 transition-all duration-300"
        classList={{
          "border-theme bg-solid ring-4 ring-theme/10 shadow-lg": isFocused(),
          "hover:border-theme/30": !isFocused() && !props.disabled,
          "opacity-50 grayscale cursor-not-allowed": props.disabled === true
        }}
      >
        <button
          onClick={decrement}
          disabled={props.disabled || (props.min !== undefined && props.value <= props.min)}
          class="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 active:scale-90 disabled:opacity-30 disabled:pointer-events-none hover:bg-theme/10 text-main"
        >
          <Icon icon={ICON_MINUS} width={18} height={18} />
        </button>

        <input
          type="number"
          value={props.value}
          disabled={props.disabled}
          onInput={(e) => handleManualInput(e.currentTarget.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          class="flex-1 bg-transparent border-none outline-none text-center text-sm font-black text-main font-mono [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          onClick={increment}
          disabled={props.disabled || (props.max !== undefined && props.value >= props.max)}
          class="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 active:scale-90 disabled:opacity-30 disabled:pointer-events-none hover:bg-theme/10 text-main"
        >
          <Icon icon={ICON_PLUS} width={18} height={18} />
        </button>
      </div>
      
      <div class="flex justify-between px-1">
         <span class="text-[9px] font-black text-muted uppercase tracking-widest italic">
           Increment: {step()}
         </span>
         { (props.min !== undefined || props.max !== undefined) && (
           <span class="text-[9px] font-black text-muted uppercase tracking-widest italic">
             Bounds: {props.min ?? "-∞"}..{props.max ?? "+∞"}
           </span>
         )}
      </div>
    </div>
  );
}
