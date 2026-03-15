
import { createSignal } from "solid-js";

export interface SliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  class?: string;
}

export function Slider(props: SliderProps) {
  const [isHovered, setIsHovered] = createSignal(false);
  
  const percentage = () => {
    const min = props.min ?? 0;
    const max = props.max ?? 100;
    return ((props.value - min) / (max - min)) * 100;
  };

  return (
    <div 
      class={`flex flex-col gap-3 ${props.class || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div class="flex justify-between items-center">
        {props.label && (
          <label class="text-[0.7rem] font-bold text-main uppercase tracking-widest">{props.label}</label>
        )}
        <span class="text-xs font-bold text-theme bg-theme/10 px-2 py-0.5 rounded-md min-w-[32px] text-center">
          {props.value}
        </span>
      </div>
      
      <div class="relative flex items-center h-6 group">
        {/* Track Background */}
        <div class="absolute w-full h-1.5 bg-input border border-input-border rounded-full" />
        
        {/* Active Track */}
        <div 
          class="absolute h-1.5 bg-theme rounded-full transition-all duration-300 shadow-sm"
          style={{ width: `${percentage()}%` }}
        />
        
        {/* Range Input (Invisible original) */}
        <input
          type="range"
          min={props.min ?? 0}
          max={props.max ?? 100}
          step={props.step ?? 1}
          value={props.value}
          onInput={(e) => props.onChange(Number(e.currentTarget.value))}
          class="absolute w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {/* Custom Thumb */}
        <div 
          class="absolute h-5 w-5 bg-white border-2 border-theme rounded-full shadow-lg transition-transform duration-200 pointer-events-none z-0"
          style={{ 
            left: `calc(${percentage()}% - 10px)`,
            transform: isHovered() ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          <div class="absolute inset-1 bg-theme/20 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
