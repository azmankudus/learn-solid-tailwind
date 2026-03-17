import { Show, For, createEffect, onCleanup } from 'solid-js';
import { Icon } from '@iconify-icon/solid';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  items: ContextMenuItem[];
  onClose: () => void;
}

export function ContextMenu(props: ContextMenuProps) {
  createEffect(() => {
    if (props.isOpen) {
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.context-menu')) {
          props.onClose();
        }
      };
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          props.onClose();
        }
      };

      setTimeout(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyDown);
      }, 0);

      onCleanup(() => {
        document.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleKeyDown);
      });
    }
  });

  const adjustPosition = () => {
    const menuWidth = 200;
    const menuHeight = props.items.filter(i => !i.divider).length * 36 + 16;
    const padding = 8;

    let x = props.position.x;
    let y = props.position.y;

    if (x + menuWidth + padding > window.innerWidth) {
      x = window.innerWidth - menuWidth - padding;
    }
    if (y + menuHeight + padding > window.innerHeight) {
      y = window.innerHeight - menuHeight - padding;
    }

    return { x: Math.max(padding, x), y: Math.max(padding, y) };
  };

  return (
    <Show when={props.isOpen}>
      <div
        class="context-menu fixed z-[1000] min-w-[180px] py-2 bg-[#1a1f2e] border border-slate-700/50 rounded-xl shadow-2xl animate-scale-in origin-top-left"
        style={{
          left: `${adjustPosition().x}px`,
          top: `${adjustPosition().y}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <For each={props.items}>
          {(item) => (
            <Show
              when={!item.divider}
              fallback={<div class="my-2 mx-3 border-t border-slate-700/50" />}
            >
              <button
                class={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors
                  ${item.disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-700/50'}
                  ${item.danger ? 'text-rose-400 hover:text-rose-300' : 'text-slate-300 hover:text-white'}
                `}
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled && item.onClick) {
                    item.onClick();
                    props.onClose();
                  }
                }}
              >
                <Show when={item.icon}>
                  <Icon icon={item.icon!} width={16} />
                </Show>
                <span class="flex-1 text-sm">{item.label}</span>
                <Show when={item.shortcut}>
                  <span class="text-xs text-slate-500 font-mono">{item.shortcut}</span>
                </Show>
              </button>
            </Show>
          )}
        </For>
      </div>
      <style>{`
        .animate-scale-in { animation: scaleIn 0.1s ease-out forwards; }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </Show>
  );
}
