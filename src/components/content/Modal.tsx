import { createEffect, onCleanup, Show, JSX } from "solid-js";
import { Portal, isServer } from "solid-js/web";
import { Icon } from "@iconify-icon/solid";
import { ICON_X_MARK } from "~/lib/icons";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: JSX.Element;
  footer?: JSX.Element;
  children: JSX.Element;
}

export function Modal(props: ModalProps) {
  createEffect(() => {
    if (isServer) return;
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  onCleanup(() => {
    if (!isServer) {
      document.body.style.overflow = "auto";
    }
  });

  return (
    <Portal>
      <div
        class="fixed inset-0 z-[1000] flex items-center justify-center p-4 modal-overlay"
        classList={{ "modal-overlay--open": props.isOpen }}
      >
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={props.onClose}
        />
        <Show when={props.isOpen}>
          <div
            class="relative z-10 w-full max-w-md bg-solid rounded-2xl shadow-2xl border border-black/5 overflow-hidden flex flex-col max-h-[90vh] modal-content"
            style={{ "box-shadow": "var(--card-shadow)" }}
          >
            <div class="px-6 py-4 flex items-center justify-between border-b border-black/5 backdrop-blur-md bg-surface/50">
              <div class="flex items-center gap-3">
                <Show when={props.icon}>
                  <div class="text-theme flex items-center justify-center w-5 h-5">
                    {props.icon}
                  </div>
                </Show>
                <h3 class="text-lg font-bold text-main tracking-tight">{props.title}</h3>
              </div>
              <button 
                onClick={props.onClose}
                class="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-black/5 text-muted hover:text-rose-500 transition-colors border-none cursor-pointer"
              >
                <Icon icon={ICON_X_MARK} width={20} height={20} />
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
          </div>
        </Show>
      </div>
    </Portal>
  );
}
