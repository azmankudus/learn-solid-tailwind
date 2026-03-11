import { JSX, createMemo } from "solid-js";

interface Option {
  id: string;
  label: string;
  icon?: (props: any) => JSX.Element;
}

export interface SegmentedToggleProps {
  value: string;
  options: [Option, Option];
  onChange: (value: any) => void;
  class?: string;
}

export function SegmentedToggle(props: SegmentedToggleProps) {
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
      <button
        type="button"
        onClick={() => props.onChange(props.options[0].id)}
        class={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg relative z-10 transition-colors duration-300 ${activeIndex() === 0 ? 'text-white' : 'text-muted hover:text-main'}`}
      >
        {props.options[0].icon && (
          <div class="flex items-center justify-center">
            {props.options[0].icon({ size: 18 })}
          </div>
        )}
        <span class="text-xs font-bold uppercase tracking-wider">{props.options[0].label}</span>
      </button>

      <button
        type="button"
        onClick={() => props.onChange(props.options[1].id)}
        class={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg relative z-10 transition-colors duration-300 ${activeIndex() === 1 ? 'text-white' : 'text-muted hover:text-main'}`}
      >
        {props.options[1].icon && (
          <div class="flex items-center justify-center">
            {props.options[1].icon({ size: 18 })}
          </div>
        )}
        <span class="text-xs font-bold uppercase tracking-wider">{props.options[1].label}</span>
      </button>
    </div>
  );
}
