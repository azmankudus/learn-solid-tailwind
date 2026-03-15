
import { createSignal } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_CALENDAR } from "~/lib/icons";

export interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  class?: string;
}

export function DatePicker(props: DatePickerProps) {
  const [isFocused, setIsFocused] = createSignal(false);

  return (
    <div class={`flex flex-col gap-1.5 ${props.class || ""}`}>
      {props.label && (
        <label class="text-[0.8rem] font-bold text-main ml-1 tracking-wide">{props.label}</label>
      )}
      <div class="relative group">
        <div 
          class={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10 
            ${isFocused() ? 'text-theme' : 'text-muted group-hover:text-main'}`}
        >
          <Icon icon={ICON_CALENDAR} width={18} height={18} />
        </div>
        <input
          type="date"
          value={props.value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onInput={(e) => props.onChange(e.currentTarget.value)}
          class="w-full bg-input border border-input-border focus:border-theme focus:ring-4 focus:ring-theme/20 rounded-xl py-3 pl-12 pr-4 text-sm text-main focus:outline-none transition-all cursor-pointer appearance-none block"
          style={{ 
            "box-shadow": "var(--color-input-shadow)",
            "color-scheme": "dark" // Better for dark mode browsers
          }}
        />
        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] font-bold uppercase text-muted tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
          Open Calendar
        </div>
      </div>
    </div>
  );
}
