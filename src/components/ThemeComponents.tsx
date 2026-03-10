import { ParentProps, JSX, Show, createSignal, For, onCleanup, createEffect } from "solid-js";
import { Dynamic, Portal } from "solid-js/web";
import { A } from "@solidjs/router";
import { Motion, Presence } from "solid-motionone";
import { HiSolidChevronDown, HiSolidXMark } from "solid-icons/hi";

interface BaseProps extends ParentProps {
  class?: string;
}

interface ButtonProps extends BaseProps {
  onClick?: (e: MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  tooltip?: string;
}

export function Tooltip(props: { text: string; children: JSX.Element }) {
  const [show, setShow] = createSignal(false);
  return (
    <div 
      class="relative flex items-center justify-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {props.children}
      <Presence>
        <Show when={show()}>
          <Motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.15, easing: "ease-out" }}
            class="absolute top-full mt-2 px-3 py-1.5 rounded-lg bg-solid border border-black/5 text-[10px] font-bold text-main whitespace-nowrap shadow-xl z-[200] pointer-events-none uppercase tracking-wider"
          >
            {props.text}
          </Motion.div>
        </Show>
      </Presence>
    </div>
  );
}

export function Button(props: ButtonProps) {
  return (
    <Motion.button
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      hover={!props.disabled ? { scale: 1.05 } : undefined}
      press={!props.disabled ? { scale: 0.95 } : undefined}
      transition={{ duration: 0.2, easing: "ease-out" }}
      class={`bg-theme text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed ${props.class || ""}`}
    >
      {props.children}
    </Motion.button>
  );
}

export function IconButton(props: ButtonProps) {
  const button = (
    <Motion.button
      type="button"
      onClick={props.onClick}
      hover={{ scale: 1.1, backgroundColor: "var(--bg-hover)" }}
      press={{ scale: 0.9 }}
      transition={{ duration: 0.2, easing: "ease-out" }}
      class={`h-10 w-10 flex items-center justify-center rounded-xl bg-surface/80 backdrop-blur-2xl text-muted hover:text-theme-solid transition-colors shadow-sm border-none ${props.class || ""}`}
    >
      {props.children}
    </Motion.button>
  );

  return (
    <Show when={props.tooltip} fallback={button}>
      <Tooltip text={props.tooltip!}>{button}</Tooltip>
    </Show>
  );
}

interface CardProps extends BaseProps {
  hover?: boolean;
  padding?: string;
  themeTint?: boolean;
  overflowVisible?: boolean;
}

export function Card(props: CardProps) {
  return (
    <Motion.div 
      class={`rounded-2xl bg-surface/80 backdrop-blur-2xl relative ${props.overflowVisible ? 'overflow-visible' : 'overflow-hidden'} border-none ${props.padding || 'p-4 sm:p-6'} ${props.class || ""}`}
      style={{ "box-shadow": "var(--card-shadow)" }}
      hover={props.hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, easing: "ease-out" }}
    >
      <Show when={props.themeTint}>
        <div class="absolute inset-0 bg-primary/[0.03] pointer-events-none" />
      </Show>
      <div class="relative z-10">
        {props.children}
      </div>
    </Motion.div>
  );
}

interface NavButtonProps extends ParentProps {
  href: string;
  active?: boolean;
  icon?: JSX.Element;
  collapsed?: boolean;
}

export function ThemeButton(props: NavButtonProps) {
  return (
    <A
      href={props.href}
      end={true}
      activeClass="bg-surface text-main shadow-md backdrop-blur-2xl"
      inactiveClass="text-muted hover:bg-surface/50 hover:text-main backdrop-blur-md"
      class={`flex items-center space-x-3 rounded-xl px-2.5 py-2 text-sm font-medium transition-all duration-200 active:scale-95 hover:scale-[1.02] group border-none ${props.collapsed ? 'justify-center' : ''}`}
    >
      <Show when={props.icon}>
        <div class={`flex h-7 w-7 min-w-[28px] items-center justify-center rounded-lg transition-all duration-300 ${props.active ? 'bg-theme text-white shadow-md' : 'bg-surface/50 group-hover:bg-accent-muted'}`}>
          {props.icon}
        </div>
      </Show>
      <Show when={!props.collapsed}>
        <span class="whitespace-nowrap">{props.children}</span>
      </Show>
    </A>
  );
}

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  renderIcon?: (value: string) => JSX.Element;
  class?: string;
}

export function CustomDropdown(props: CustomDropdownProps) {
  const [isOpen, setIsOpen] = createSignal(false);
  const selectedOption = () => props.options.find(o => o.value === props.value) || props.options[0];

  let dropdownRef: HTMLDivElement | undefined;

  createEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    onCleanup(() => document.removeEventListener("mousedown", handleClickOutside));
  });

  return (
    <div class={`relative w-full ${props.class || ""}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen())}
        class="w-full flex items-center justify-between p-3.5 rounded-xl bg-surface/80 backdrop-blur-2xl border-none hover:bg-surface transition-all text-xs font-semibold text-main shadow-sm active:scale-[0.98]"
      >
        <div class="flex items-center gap-3">
          {props.renderIcon ? props.renderIcon(props.value) : <div class="h-4 w-4 rounded-full bg-theme"></div>}
          <span>{selectedOption()?.label}</span>
        </div>
        <HiSolidChevronDown class={`transition-transform duration-300 ${isOpen() ? 'rotate-180' : ''}`} size={16} />
      </button>

      <Presence>
        <Show when={isOpen()}>
          <Motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, easing: "ease-out" }}
            class="absolute top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto rounded-2xl bg-solid border border-black/5 shadow-xl shadow-black/10 z-[150] custom-scrollbar p-1.5"
          >
            <For each={props.options}>
              {(option) => (
                <button
                  onClick={() => {
                    props.onChange(option.value);
                    setIsOpen(false);
                  }}
                  class={`w-full flex items-center gap-4 p-3 rounded-xl transition-colors text-xs font-medium hover:bg-hover ${props.value === option.value ? 'bg-hover text-main font-semibold shadow-sm border-none' : 'text-muted border-none'}`}
                >
                {props.renderIcon ? props.renderIcon(option.value) : <div class="h-4 w-4 rounded-full bg-theme shadow-sm"></div>}
                {option.label}
              </button>
              )}
            </For>
          </Motion.div>
        </Show>
      </Presence>
    </div>
  );
}

interface HeadingProps extends BaseProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  gradient?: boolean;
}

export function HeadingText(props: HeadingProps) {
  return (
    <Dynamic
      component={`h${props.level || 1}`}
      class={`${props.gradient ? "text-theme" : "text-main"} font-bold tracking-tight ${props.class || ""}`}
    >
      {props.children}
    </Dynamic>
  );
}

export function PageWrapper(props: ParentProps & { class?: string }) {
  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 15 }}
      transition={{ duration: 0.4, easing: "ease-out" }}
      class={props.class}
    >
      {props.children}
    </Motion.div>
  );
}

export function Modal(props: { isOpen: boolean; onClose: () => void; title: string; icon?: JSX.Element; footer?: JSX.Element; children: JSX.Element }) {
  createEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  onCleanup(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "auto";
    }
  });

  return (
    <Portal>
      <Presence>
        <Show when={props.isOpen}>
          <div class="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <Motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              class="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={props.onClose}
            />
            <Motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, easing: "ease-out" }}
              class="relative z-10 w-full max-w-md bg-solid rounded-2xl shadow-2xl border border-black/5 overflow-hidden flex flex-col max-h-[90vh]"
              style={{ "box-shadow": "var(--card-shadow)" }}
            >
              <div class="px-6 py-4 flex items-center justify-between border-b border-black/5 backdrop-blur-md bg-surface/50">
                <div class="flex items-center gap-3">
                  <Show when={props.icon}>
                    <div class="text-theme flex items-center justify-center">
                      {props.icon}
                    </div>
                  </Show>
                  <h3 class="text-lg font-bold text-main tracking-tight">{props.title}</h3>
                </div>
                <button 
                  onClick={props.onClose}
                  class="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-black/5 text-muted hover:text-rose-500 transition-colors border-none"
                >
                  <HiSolidXMark size={20} />
                </button>
              </div>
              <div class="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                {props.children}
              </div>
              <Show when={props.footer !== undefined}>
                <div class="px-6 py-4 border-t border-black/5 flex items-center justify-end gap-3 bg-surface/30">
                  {props.footer}
                </div>
              </Show>
            </Motion.div>
          </div>
        </Show>
      </Presence>
    </Portal>
  );
}

interface TextFieldProps {
  type?: string;
  label?: string;
  value: string;
  onInput: (val: string) => void;
  error?: string;
  placeholder?: string;
  class?: string;
}

export function TextField(props: TextFieldProps) {
  return (
    <div class={`flex flex-col gap-1.5 ${props.class || ""}`}>
      <Show when={props.label}>
        <label class="text-[0.8rem] font-bold text-main ml-1 tracking-wide">{props.label}</label>
      </Show>
      <div class="relative">
        <Show when={props.error}>
          <Motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            class="absolute bottom-full left-0 mb-1 px-2.5 py-1 bg-rose-500 text-white text-[10px] font-bold rounded shadow-lg uppercase tracking-wider z-10 pointer-events-none"
          >
            {props.error}
          </Motion.div>
        </Show>
        <input
          type={props.type || "text"}
          value={props.value}
          onInput={(e) => props.onInput(e.currentTarget.value)}
          placeholder={props.placeholder}
          class={`w-full bg-surface border ${props.error ? 'border-rose-500 focus:ring-rose-500/20' : 'border-black/5 focus:border-theme focus:ring-theme/20'} rounded-xl px-4 py-3 text-sm text-main placeholder-muted focus:outline-none focus:ring-4 transition-all`}
        />
      </div>
    </div>
  );
}
