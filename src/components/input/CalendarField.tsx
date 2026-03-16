
import { createSignal, createEffect, createMemo, onCleanup, Show } from "solid-js";
import { isServer } from "solid-js/web";
import { Icon } from "@iconify-icon/solid";
import { ICON_CALENDAR } from "~/lib/icons";
import { Calendar } from "./Calendar";

export interface CalendarFieldProps {
  type?: 'date' | 'time' | 'datetime' | 'date-range' | 'time-range' | 'datetime-range';
  label?: string;
  value?: string | string[];
  placeholder?: string;
  onChange?: (val: any) => void;
  displayFormat?: (val: any) => string;
  showSeconds?: boolean;
  use12Hours?: boolean;
  defaultToNow?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
  exact?: string;
  error?: string;
  class?: string;
}

export function CalendarField(props: CalendarFieldProps) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [placement, setPlacement] = createSignal<"bottom" | "top">("bottom");
  
  let containerRef: HTMLDivElement | undefined;
  let popupRef: HTMLDivElement | undefined;

  // Auto-set current date/time as default
  if (props.defaultToNow && !props.value) {
    const now = new Date().toISOString();
    if (props.type?.includes('range')) {
      props.onChange?.([now, now]);
    } else {
      props.onChange?.(now);
    }
  }

  createEffect(() => {
    if (isServer) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef && !containerRef.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleWindowBlur = () => {
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("blur", handleWindowBlur);
    onCleanup(() => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("blur", handleWindowBlur);
    });
  });

  createEffect(() => {
    if (isServer) return;
    if (isOpen() && containerRef) {
      // Default to bottom first, then measure and adjust
      setPlacement("bottom");
      
      requestAnimationFrame(() => {
        if (!containerRef || !popupRef) return;
        const rect = containerRef.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const popupHeight = popupRef.scrollHeight;
        
        // Only flip to top if popup won't fit below AND it will fit above
        if (spaceBelow < popupHeight && spaceAbove > popupHeight) {
          setPlacement("top");
        }
      });
    }
  });

  const displayValue = () => {
    if (!props.value || (Array.isArray(props.value) && props.value.length === 0)) {
      return props.placeholder || "Select date/time";
    }

    if (props.displayFormat) {
      return props.displayFormat(props.value);
    }

    const dateOptions: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    
    const timeOptions: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit',
      second: props.showSeconds ? '2-digit' : undefined,
      hour12: props.use12Hours
    };

    const fullOptions: Intl.DateTimeFormatOptions = {
        ...dateOptions,
        ...timeOptions
    };
    
    const formatPart = (val: string) => {
      const d = new Date(val);
      if (props.type === 'time' || props.type === 'time-range') {
        return d.toLocaleTimeString(undefined, timeOptions);
      }
      if (props.type?.includes('datetime')) {
        return d.toLocaleString(undefined, fullOptions);
      }
      return d.toLocaleDateString(undefined, dateOptions);
    };

    if (Array.isArray(props.value)) {
      const s = props.value[0] ? formatPart(props.value[0]) : "...";
      const e = props.value[1] ? formatPart(props.value[1]) : "...";
      return `${s} — ${e}`;
    }
    
    return formatPart(props.value as string);
  };

  const validationError = createMemo(() => {
    if (props.error) return props.error;
    if (!props.value) return "";
    
    const val = Array.isArray(props.value) ? props.value[0] : props.value;
    if (!val) return "";
    
    const d = new Date(val);
    const isTimeType = props.type === 'time' || props.type === 'time-range';
    
    if (props.min) {
      const minD = new Date(props.min);
      if (isTimeType) {
        const valMinutes = d.getHours() * 60 + d.getMinutes();
        const minMinutes = minD.getHours() * 60 + minD.getMinutes();
        if (valMinutes < minMinutes) return `Must be later than ${minD.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
      } else {
        if (d < minD) return `Must be later than ${minD.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
    }
    
    if (props.max) {
      const maxD = new Date(props.max);
      if (isTimeType) {
        const valMinutes = d.getHours() * 60 + d.getMinutes();
        const maxMinutes = maxD.getHours() * 60 + maxD.getMinutes();
        if (valMinutes > maxMinutes) return `Must be earlier than ${maxD.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
      } else {
        if (d > maxD) return `Must be earlier than ${maxD.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
    }
    
    if (props.exact) {
      const exactD = new Date(props.exact);
      if (isTimeType) {
        const valMinutes = d.getHours() * 60 + d.getMinutes();
        const exactMinutes = exactD.getHours() * 60 + exactD.getMinutes();
        if (valMinutes !== exactMinutes) return `Must be exactly ${exactD.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
      } else {
        if (d.toDateString() !== exactD.toDateString()) return `Must be exactly ${exactD.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
    }
    
    return "";
  });

  return (
    <div 
      class={`relative w-full transition-all duration-300 outline-none ${isOpen() ? 'z-50' : 'z-10'} ${props.class || ""}`} 
      ref={containerRef}
      tabindex="0"
    >
      <Show when={props.label}>
        <label class="text-[0.85rem] font-black text-main ml-1 tracking-wide block mb-2">{props.label}</label>
      </Show>
      
      <div 
        onClick={() => !props.disabled && setIsOpen(!isOpen())}
        class="w-full relative flex items-center bg-input border rounded-2xl group transition-all duration-300 shadow-sm"
        classList={{
          "hover:border-theme cursor-pointer": !props.disabled && !validationError(),
          "border-input-border": !validationError(),
          "border-red-500 hover:border-red-600": !!validationError() && !props.disabled,
          "opacity-50 grayscale-[0.5] pointer-events-none": props.disabled
        }}
        style={{ "box-shadow": validationError() ? "0 0 0 3px rgba(239, 68, 68, 0.1)" : "var(--color-input-shadow)" }}
      >
        <div class="flex-1 px-4 py-3.5 min-w-0">
          <span 
            class="text-sm font-bold truncate block transition-colors duration-300"
            classList={{ 
              "text-main": !!props.value, 
              "text-muted/50": !props.value 
            }}
          >
            {displayValue()}
          </span>
        </div>
        
        <button
          class="h-full px-2 flex items-center justify-center border-l border-input-border group-hover:border-theme/30 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen());
          }}
        >
          <div 
            class="h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-300"
            classList={{
              "bg-theme text-white shadow-lg scale-110": isOpen(),
              "bg-theme/5 text-theme group-hover:bg-theme/20": !isOpen()
            }}
          >
            <Icon 
              icon={ICON_CALENDAR} 
              width={20} 
              height={20} 
            />
          </div>
        </button>

        {/* Calendar Popup */}
        <div 
          ref={popupRef}
          onClick={(e) => e.stopPropagation()}
          classList={{
            "absolute left-0 z-[1000] transition-all duration-500 ease-out w-max max-w-[95vw] shadow-2xl rounded-2xl": true,
            "opacity-100 translate-y-0 scale-100": isOpen(),
            "opacity-0 pointer-events-none -translate-y-2 scale-95": !isOpen()
          }}
          style={placement() === "bottom" ? { top: "calc(100% + 8px)" } : { bottom: "calc(100% + 8px)" }}
        >
          <Calendar 
            type={props.type}
            value={props.value}
            showSeconds={props.showSeconds}
            use12Hours={props.use12Hours}
            defaultToNow={props.defaultToNow}
            onChange={(val) => {
              props.onChange?.(val);
              if (!props.type?.includes('range') && !props.type?.includes('time')) setIsOpen(false);
            }}
          />
        </div>
      </div>
      <Show when={validationError()}>
        <div class="flex items-center gap-1.5 mt-1.5 ml-1 animate-fade-in">
          <div class="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
          <span class="text-xs font-semibold text-red-500">{validationError()}</span>
        </div>
      </Show>
    </div>
  );
}
