
import { createSignal, Show, splitProps, For } from "solid-js";

export interface SliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number | [number, number];
  onChange: (val: any) => void;
  class?: string;
}

export function Slider(props: SliderProps) {
  const [isHovered, setIsHovered] = createSignal(false);
  
  const isRange = () => Array.isArray(props.value);
  const min = () => props.min ?? 0;
  const max = () => props.max ?? 100;
  const step = () => props.step ?? 1;

  const getPercentage = (val: number) => {
    return ((val - min()) / (max() - min())) * 100;
  };

  const handleRangeChange = (index: number, newVal: number) => {
    if (!isRange()) return;
    const current = [...(props.value as [number, number])];
    
    // Ensure handles don't cross
    if (index === 0) {
      current[0] = Math.min(newVal, current[1]);
    } else {
      current[1] = Math.max(newVal, current[0]);
    }
    
    props.onChange(current);
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
        <div class="flex items-center gap-1.5">
          <Show when={isRange()} fallback={
            <span class="text-xs font-bold text-theme bg-theme/10 px-2 py-0.5 rounded-md min-w-[32px] text-center">
              {props.value as number}
            </span>
          }>
            <span class="text-[10px] font-black text-theme bg-theme/10 px-2 py-0.5 rounded-md min-w-[32px] text-center">
              {(props.value as [number, number])[0]}
            </span>
            <span class="text-[10px] font-black text-muted">—</span>
            <span class="text-[10px] font-black text-theme bg-theme/10 px-2 py-0.5 rounded-md min-w-[32px] text-center">
              {(props.value as [number, number])[1]}
            </span>
          </Show>
        </div>
      </div>
      
      <div class="relative flex items-center h-6 group">
        {/* Track Background */}
        <div class="absolute w-full h-1.5 bg-input border border-input-border rounded-full" />
        
        {/* Active Track */}
        <Show when={isRange()} fallback={
          <div 
            class="absolute h-1.5 bg-theme rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${getPercentage(props.value as number)}%` }}
          />
        }>
          <div 
            class="absolute h-1.5 bg-theme rounded-full transition-all duration-300 shadow-sm"
            style={{ 
              left: `${getPercentage((props.value as [number, number])[0])}%`,
              width: `${getPercentage((props.value as [number, number])[1]) - getPercentage((props.value as [number, number])[0])}%` 
            }}
          />
        </Show>
        
        {/* Handles */}
        <Show when={isRange()} fallback={
          <>
            <input
              type="range"
              min={min()}
              max={max()}
              step={step()}
              value={props.value as number}
              onInput={(e) => props.onChange(Number(e.currentTarget.value))}
              class="absolute w-full h-full opacity-0 cursor-pointer z-20"
            />
            <div 
              class="absolute h-6 w-6 bg-white border-2 border-theme rounded-full shadow-lg transition-transform duration-200 pointer-events-none z-10"
              style={{ 
                left: `calc(${getPercentage(props.value as number)}% - 12px)`,
                transform: isHovered() ? 'scale(1.15)' : 'scale(1)'
              }}
            >
              <div class="absolute inset-1.5 bg-theme/20 rounded-full animate-pulse" />
            </div>
          </>
        }>
          {/* Dual Range Handles */}
          <div class="absolute w-full h-full z-20">
            <input
              type="range"
              min={min()}
              max={max()}
              step={step()}
              value={(props.value as [number, number])[0]}
              onInput={(e) => handleRangeChange(0, Number(e.currentTarget.value))}
              class="absolute w-full h-full opacity-0 cursor-pointer pointer-events-auto z-30 slider-range-input"
              style={{ "z-index": (props.value as [number, number])[0] > (max() / 2) ? 31 : 30 }}
            />
            <input
              type="range"
              min={min()}
              max={max()}
              step={step()}
              value={(props.value as [number, number])[1]}
              onInput={(e) => handleRangeChange(1, Number(e.currentTarget.value))}
              class="absolute w-full h-full opacity-0 cursor-pointer pointer-events-auto z-30 slider-range-input"
              style={{ "z-index": (props.value as [number, number])[1] < (max() / 2) ? 31 : 30 }}
            />
            
            {/* Custom Thumb 1 */}
            <div 
              class="absolute h-6 w-6 bg-white border-2 border-theme rounded-full shadow-lg transition-transform duration-200 pointer-events-none z-10"
              style={{ 
                left: `calc(${getPercentage((props.value as [number, number])[0])}% - 12px)`,
                transform: isHovered() ? 'scale(1.15)' : 'scale(1)'
              }}
            >
              <div class="absolute inset-1.5 bg-theme/10 rounded-full" />
            </div>

            {/* Custom Thumb 2 */}
            <div 
              class="absolute h-6 w-6 bg-white border-2 border-theme rounded-full shadow-lg transition-transform duration-200 pointer-events-none z-10"
              style={{ 
                left: `calc(${getPercentage((props.value as [number, number])[1])}% - 12px)`,
                transform: isHovered() ? 'scale(1.15)' : 'scale(1)'
              }}
            >
              <div class="absolute inset-1.5 bg-theme/10 rounded-full" />
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}
