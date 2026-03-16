import { For, JSX, Show, createSignal, onMount, onCleanup } from "solid-js";
import { Portal } from "solid-js/web";
import { Icon } from "@iconify-icon/solid";

export interface ContextMenuItem {
  label: string;
  icon?: any;
  onClick: () => void;
  variant?: 'default' | 'danger';
  divider?: boolean;
}

export interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  items: ContextMenuItem[];
}

export function ContextMenu(props: ContextMenuProps) {
  let menuRef: HTMLDivElement | undefined;

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef && !menuRef.contains(e.target as Node)) {
      props.onClose();
    }
  };

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <Portal>
      <Show when={props.isOpen}>
        <div 
          ref={menuRef}
          class="fixed z-[1000] min-w-[180px] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-1.5 animate-scale-in"
          style={{
            left: `${props.x}px`,
            top: `${props.y}px`
          }}
        >
          <For each={props.items}>
            {(item) => (
              <>
                <Show when={item.divider}>
                  <div class="h-px bg-white/5 my-1 mx-1" />
                </Show>
                <button
                  onClick={() => {
                    item.onClick();
                    props.onClose();
                  }}
                  class={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all
                    ${item.variant === 'danger' 
                      ? 'text-rose-400 hover:bg-rose-500/20' 
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'}
                  `}
                >
                  <Show when={item.icon}>
                    <Icon icon={item.icon} width={16} height={16} />
                  </Show>
                  <span>{item.label}</span>
                </button>
              </>
            )}
          </For>
        </div>
      </Show>
    </Portal>
  );
}
