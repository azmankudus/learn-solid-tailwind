import { createSignal, createEffect, onCleanup, For, Show, JSX } from "solid-js";
import { isServer } from "solid-js/web";
import { HiSolidChevronDown } from "solid-icons/hi";

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
}

export function Dropdown(props: DropdownProps) {
  const [isOpen, setIsOpen] = createSignal(false);
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
    }
  });

  return (
    <div class={`relative w-full ${props.class || ""}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen())}
        class="w-full flex items-center justify-between p-3.5 rounded-xl bg-input border border-input-border hover:bg-hover transition-all duration-300 text-xs font-semibold text-main active:scale-[0.98] cursor-pointer"
        style={{ "box-shadow": "var(--color-input-shadow)" }}
      >
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-5 h-5">
            {props.renderIcon ? props.renderIcon(props.value) : <div class="h-5 w-5 rounded-full bg-theme"></div>}
          </div>
          <span>{selectedOption()?.label}</span>
        </div>
        <HiSolidChevronDown class={`transition-transform duration-200 ${isOpen() ? 'rotate-180' : ''}`} size={20} />
      </button>

      <div
        ref={optionsRef}
        class="absolute top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto rounded-2xl bg-solid border border-input-border shadow-2xl z-[150] custom-scrollbar p-2 dropdown-panel"
        classList={{ "dropdown-panel--open": isOpen() }}
      >
        <Show when={isOpen()}>
          <For each={props.options}>
            {(option) => (
              <button
                onClick={() => {
                  props.onChange(option.value);
                  setIsOpen(false);
                }}
                data-selected={props.value === option.value}
                class={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 text-xs font-medium hover:bg-theme/5 cursor-pointer ${props.value === option.value ? 'bg-theme/10 text-theme font-bold shadow-sm' : 'text-main border-none'}`}
              >
              <div class="flex items-center justify-center w-5 h-5">
                {props.renderIcon ? props.renderIcon(option.value) : <div class="h-5 w-5 rounded-full bg-theme shadow-sm"></div>}
              </div>
              {option.label}
            </button>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
}
