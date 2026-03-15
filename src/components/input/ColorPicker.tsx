
import { createSignal, For } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_CHECK } from "~/lib/icons";

export interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  class?: string;
}

export function ColorPicker(props: ColorPickerProps) {
  const presets = [
    "#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", 
    "#ec4899", "#8b5cf6", "#64748b", "#000000", "#ffffff"
  ];

  return (
    <div class={`flex flex-col gap-3 ${props.class || ""}`}>
      {props.label && (
        <label class="text-[0.7rem] font-bold text-main uppercase tracking-widest">{props.label}</label>
      )}
      
      <div class="flex flex-wrap gap-2.5 p-3 bg-input border border-input-border rounded-2xl shadow-inner">
        <For each={presets}>
          {(color) => (
            <button
              onClick={() => props.onChange(color)}
              class="group relative h-8 w-8 rounded-lg transition-all duration-300 hover:scale-110 active:scale-90 flex items-center justify-center cursor-pointer shadow-sm border border-black/5"
              style={{ "background-color": color }}
            >
              {props.value === color && (
                <Icon 
                  icon={ICON_CHECK} 
                  class={color === "#ffffff" ? "text-black" : "text-white"} 
                  width={16} 
                  height={16} 
                />
              )}
              <div class="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-main text-[8px] text-white rounded pointer-events-none transition-all duration-200">
                {color}
              </div>
            </button>
          )}
        </For>
        
        <div class="w-full mt-2 pt-2 border-t border-input-border flex items-center justify-between">
          <span class="text-[10px] uppercase font-bold text-muted tracking-tighter">Custom Hex</span>
          <div class="flex items-center gap-2">
            <div class="h-4 w-4 rounded-full border border-input-border shadow-sm" style={{ "background-color": props.value }} />
            <input 
              type="text" 
              value={props.value}
              onInput={(e) => props.onChange(e.currentTarget.value)}
              class="bg-transparent border-none text-[10px] font-bold text-theme focus:outline-none w-16 text-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
