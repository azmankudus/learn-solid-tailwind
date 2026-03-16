import { createSignal, createEffect, createMemo, onCleanup, For, Show, JSX } from "solid-js";
import { isServer } from "solid-js/web";
import { Icon } from "@iconify-icon/solid";
import { ICON_CHEVRON_DOWN, ICON_CHECK, ICON_MAGNIFYING_GLASS, ICON_X_MARK } from "~/lib/icons";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  value: string | string[];
  options: DropdownOption[];
  onChange: (value: any) => void;
  renderIcon?: (value: string) => JSX.Element;
  class?: string;
  placeholder?: string;
  variant?: "absolute" | "inline";
  disabled?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  textAlign?: "left" | "right" | "center";
}

export function Dropdown(props: DropdownProps) {
  const variant = () => props.variant || "absolute";
  const [isOpen, setIsOpen] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal("");
  const [placement, setPlacement] = createSignal<"bottom" | "top">("bottom");

  let dropdownRef: HTMLDivElement | undefined;
  let popupRef: HTMLDivElement | undefined;
  let inputRef: HTMLInputElement | undefined;

  const isSelected = (val: string) => {
    if (Array.isArray(props.value)) {
      return props.value.includes(val);
    }
    return props.value === val;
  };

  const selectedOptions = createMemo(() => {
    if (Array.isArray(props.value)) {
      return props.options.filter(o => props.value.includes(o.value));
    }
    const found = props.options.find(o => o.value === props.value);
    return found ? [found] : [];
  });

  const handleSelect = (val: string) => {
    if (props.multiple) {
      const current = Array.isArray(props.value) ? [...props.value] : [];
      const index = current.indexOf(val);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(val);
      }
      props.onChange(current);
    } else {
      props.onChange(val);
      setIsOpen(false);
    }
  };

  const removeValue = (e: MouseEvent, val: string) => {
    e.stopPropagation();
    if (Array.isArray(props.value)) {
      props.onChange(props.value.filter(v => v !== val));
    }
  };

  createEffect(() => {
    if (isServer) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    onCleanup(() => document.removeEventListener("mousedown", handleClickOutside));
  });

  createEffect(() => {
    if (isServer) return;
    if (isOpen() && dropdownRef) {
      setPlacement("bottom");
      requestAnimationFrame(() => {
        if (!dropdownRef || !popupRef) return;
        const rect = dropdownRef.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const popupHeight = popupRef.scrollHeight;
        if (spaceBelow < popupHeight && spaceAbove > popupHeight) {
          setPlacement("top");
        }
      });
    } else if (!isOpen()) {
      setSearchQuery("");
    }
  });

  const filteredOptions = createMemo(() => {
    if (!props.searchable || !searchQuery()) return props.options;
    const query = searchQuery().toLowerCase();
    return props.options.filter(o => o.label.toLowerCase().includes(query));
  });

  return (
    <div 
      class={`relative w-full ${props.class || ""}`} 
      ref={dropdownRef}
      style={{ "z-index": isOpen() ? "100" : "1" }}
    >
      <div
        onClick={() => !props.disabled && setIsOpen(!isOpen())}
        class={`w-full min-h-[44px] flex items-center justify-between p-1.5 rounded-xl bg-input border border-input-border hover:border-theme/30 transition-all duration-300 text-sm font-semibold text-main cursor-pointer shadow-sm
          ${(props.textAlign || "left") === "left" ? "text-left" : (props.textAlign === "right" ? "text-right" : "text-center")}`}
        classList={{
          "opacity-50 pointer-events-none grayscale-[0.5]": props.disabled === true,
          "border-theme ring-2 ring-theme/10": isOpen()
        }}
      >
        <div class="flex flex-wrap gap-1.5 flex-1 min-w-0 px-2" classList={{
          "justify-start": !props.textAlign || props.textAlign === "left",
          "justify-end": props.textAlign === "right",
          "justify-center": props.textAlign === "center"
        }}>
          <Show when={selectedOptions().length === 0 && !searchQuery()}>
            <span class="text-muted/50 font-medium truncate">{props.placeholder || "Select Option"}</span>
          </Show>

          <For each={selectedOptions()}>
            {(option) => (
              <Show 
                when={props.multiple} 
                fallback={
                  <div class="flex items-center gap-2 truncate">
                    <Show when={props.renderIcon}>
                      {props.renderIcon!(option.value)}
                    </Show>
                    {!props.searchable || !isOpen() ? (
                        <span class="truncate">{option.label}</span>
                    ) : null}
                  </div>
                }
              >
                <div class="inline-flex items-center gap-1.5 px-2 py-1 bg-theme/10 text-theme rounded-lg text-[10px] font-black uppercase tracking-wider animate-fade-in group/tag">
                   <Show when={props.renderIcon}>
                     {props.renderIcon!(option.value)}
                   </Show>
                   {option.label}
                   <button 
                    onClick={(e) => removeValue(e, option.value)}
                    class="p-0.5 hover:bg-theme/20 rounded-md transition-colors"
                   >
                     <Icon icon={ICON_X_MARK} width={10} height={10} />
                   </button>
                </div>
              </Show>
            )}
          </For>

          <Show when={props.searchable && isOpen()}>
            <input
              ref={inputRef}
              type="text"
              autofocus
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.currentTarget.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder={selectedOptions().length > 0 ? "" : props.placeholder}
              class="flex-1 bg-transparent border-none outline-none text-sm font-bold text-main min-w-[60px]"
            />
          </Show>
        </div>
        
        <div class="flex items-center gap-1 px-2 border-l border-input-border/50 ml-1">
          <Icon 
            icon={ICON_CHEVRON_DOWN} 
            class={`transition-transform duration-300 ${isOpen() && !props.disabled ? 'rotate-180' : ''} text-muted/50`} 
            width={18} 
            height={18} 
          />
        </div>
      </div>

      {/* Popup */}
      <div
        classList={{
          "absolute left-0 right-0 z-[150]": variant() === "absolute",
          "top-full": variant() === "absolute" && placement() === "bottom",
          "bottom-full": variant() === "absolute" && placement() === "top",
          "relative": variant() === "inline"
        }}
      >
        <div
          class="grid transition-all duration-300 ease-in-out"
          style={{
            "grid-template-rows": isOpen() ? "1fr" : "0fr",
            "opacity": isOpen() ? "1" : "0",
            "visibility": isOpen() ? "visible" : "hidden"
          }}
        >
          <div class="overflow-hidden">
            <div
              ref={popupRef}
              class="flex flex-col rounded-2xl bg-solid border border-input-border shadow-2xl z-[150] overflow-hidden mt-2 mb-2"
            >
              <div class="max-h-64 overflow-y-auto custom-scrollbar p-1.5 flex flex-col gap-0.5">
                <For each={filteredOptions()}>
                  {(option) => (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(option.value);
                      }}
                      class="w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-sm font-medium cursor-pointer border border-transparent shrink-0"
                      classList={{
                        "hover:bg-hover": !isSelected(option.value),
                        "text-theme font-black bg-theme/5 border-theme/10": isSelected(option.value),
                        "text-muted hover:text-main": !isSelected(option.value)
                      }}
                    >
                      <div class="flex items-center gap-3 flex-1">
                        <Show when={props.renderIcon}>
                          {props.renderIcon!(option.value)}
                        </Show>
                        <span class="whitespace-nowrap flex-1 text-left">{option.label}</span>
                        <Show when={isSelected(option.value)}>
                          <Icon icon={ICON_CHECK} class="text-theme" width={16} height={16} />
                        </Show>
                      </div>
                    </button>
                  )}
                </For>
                <Show when={filteredOptions().length === 0}>
                  <div class="p-8 text-center text-[10px] font-black uppercase tracking-widest text-muted/40 italic">
                    No results found
                  </div>
                </Show>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
