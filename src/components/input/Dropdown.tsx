import { createSignal, createEffect, createMemo, onCleanup, For, Show, JSX } from "solid-js";
import { isServer } from "solid-js/web";
import { Icon } from "@iconify-icon/solid";
import { ICON_CHEVRON_DOWN, ICON_CHECK } from "~/lib/icons";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  renderIcon?: (value: string) => JSX.Element;
  class?: string;
  variant?: "absolute" | "inline";
  disabled?: boolean;
  searchable?: boolean;
}

export function Dropdown(props: DropdownProps) {
  const variant = () => props.variant || "absolute";
  const [isOpen, setIsOpen] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal("");
  const selectedOption = () => props.options.find(o => o.value === props.value) || props.options[0];

  let dropdownRef: HTMLDivElement | undefined;
  let optionsRef: HTMLDivElement | undefined;

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
    if (isOpen() && optionsRef) {
      const selectedEl = optionsRef.querySelector('[data-selected="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
      
      // Auto-focus search input
      const searchInput = dropdownRef?.querySelector('input');
      if (searchInput) searchInput.focus();
    } else if (!isOpen()) {
      setSearchQuery("");
    }
  });

  const filteredOptions = createMemo(() => {
    if (!props.searchable || !searchQuery()) return props.options;
    
    const query = searchQuery().toLowerCase();
    // Support wildcard * by converting to regex
    const regexSource = query.split("*").map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join(".*");
    const regex = new RegExp(regexSource, "i");

    return props.options.filter(o => regex.test(o.label));
  });

  return (
    <div class={`relative w-full ${props.class || ""}`} ref={dropdownRef}>
      <button
        onClick={() => !props.disabled && setIsOpen(!isOpen())}
        disabled={props.disabled}
        class="w-full h-full flex items-center justify-between p-3 rounded-xl bg-input border border-input-border hover:bg-hover transition-all duration-300 text-xs font-semibold text-main text-left active:scale-[0.98] cursor-pointer"
        classList={{
          "opacity-50 pointer-events-none grayscale-[0.5]": props.disabled === true
        }}
        style={{ "box-shadow": "var(--color-input-shadow)" }}
      >
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-5 h-5">
            {props.renderIcon ? props.renderIcon(props.value) : <div class="h-5 w-5 rounded-full bg-theme"></div>}
          </div>
          <span>{selectedOption()?.label}</span>
        </div>
        <Icon icon={ICON_CHEVRON_DOWN} class={`transition-transform duration-200 ${isOpen() && !props.disabled ? 'rotate-180' : ''}`} width={20} height={20} />
      </button>

      <div
        classList={{
          "absolute top-full left-0 right-0 z-[150]": variant() === "absolute",
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
              class="mt-2 flex flex-col rounded-2xl bg-solid border border-input-border shadow-2xl z-[150] overflow-hidden"
            >
              <Show when={props.searchable}>
                <div class="relative flex items-center border-b border-input-border bg-input/50">
                  <div class="absolute left-4 text-main/30">
                    <Icon icon="heroicons:magnifying-glass" width={16} height={16} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={searchQuery()}
                    onInput={(e) => setSearchQuery(e.currentTarget.value)}
                    class="w-full h-12 pl-12 pr-4 bg-transparent text-xs font-semibold text-main focus:outline-none transition-colors"
                  />
                </div>
              </Show>

              <div
                ref={optionsRef}
                class="max-h-64 overflow-y-auto custom-scrollbar p-1.5 flex flex-col gap-1"
              >
                <For each={filteredOptions()}>
                  {(option) => (
                    <button
                      onClick={() => {
                        props.onChange(option.value);
                        setIsOpen(false);
                      }}
                      data-selected={props.value === option.value}
                      class="w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 text-xs font-medium text-left cursor-pointer border border-transparent shrink-0"
                      classList={{
                        "hover:bg-black/5 dark:hover:bg-white/10": props.value !== option.value,
                        "text-theme font-bold shadow-sm scale-[1.01]": props.value === option.value,
                        "text-main": props.value !== option.value
                      }}
                      style={props.value === option.value ? { "background-color": "color-mix(in srgb, var(--primary), transparent 85%)", "border-color": "color-mix(in srgb, var(--primary), transparent 80%)" } : {}}
                    >
                      <div class="flex items-center gap-4">
                        <div class="flex items-center justify-center w-5 h-5">
                          {props.renderIcon ? props.renderIcon(option.value) : <div class="h-5 w-5 rounded-full bg-theme shadow-sm"></div>}
                        </div>
                        {option.label}
                      </div>
                      <Show when={props.value === option.value}>
                        <Icon icon={ICON_CHECK} width={16} height={16} class="text-theme" />
                      </Show>
                    </button>
                  )}
                </For>
                <Show when={filteredOptions().length === 0}>
                  <div class="p-8 text-center text-xs text-main/40 font-medium italic">
                    No matching results
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
