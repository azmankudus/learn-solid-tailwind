import { JSX, createSignal, onCleanup, createEffect, Show } from "solid-js";
import { Portal, isServer } from "solid-js/web";

export interface TooltipProps {
  text: string;
  children: JSX.Element;
  position?: "top" | "right" | "bottom";
  disabled?: boolean;
  class?: string;
}

export function Tooltip(props: TooltipProps) {
  const [show, setShow] = createSignal(false);
  let triggerRef: HTMLDivElement | undefined;
  const [coords, setCoords] = createSignal({ top: 0, left: 0 });

  const updatePosition = () => {
    if (isServer) return;
    if (triggerRef) {
      const rect = triggerRef.getBoundingClientRect();
      if (props.position === "right") {
        setCoords({ 
          top: Math.round(rect.top + rect.height / 2), 
          left: Math.round(rect.right + 8) 
        });
      } else if (props.position === "bottom") {
        setCoords({ 
          top: Math.round(rect.bottom + 8), 
          left: Math.round(rect.left + rect.width / 2) 
        });
      } else {
        setCoords({ 
          top: Math.round(rect.top - 8), 
          left: Math.round(rect.left + rect.width / 2) 
        });
      }
    }
  };

  createEffect(() => {
    if (isServer) return;
    if (show()) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    } else {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    }
  });

  onCleanup(() => {
    if (isServer) return;
    window.removeEventListener('scroll', updatePosition, true);
    window.removeEventListener('resize', updatePosition);
  });

  return (
    <div 
      ref={triggerRef}
      class={`relative inline-flex items-center ${props.class || ""}`}
      onMouseEnter={() => !props.disabled && setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {props.children}
      <Portal>
        <Show when={show() && !props.disabled}>
          <div 
            class="fixed z-[999] pointer-events-none"
            style={{
              top: `${coords().top}px`,
              left: `${coords().left}px`,
              transform: props.position === "right" ? "translateY(-50%)" : "translateX(-50%)" + (props.position === "bottom" ? "" : " translateY(-100%)")
            }}
          >
            <div
              class={`px-2.5 py-1.5 rounded-lg bg-nav border border-black/5 text-[10px] font-bold text-main text-left whitespace-nowrap shadow-xl tracking-wider backdrop-blur-xl flex items-center animate-fade-in animate-duration-150 ${
                props.position === "right" ? "origin-left" : props.position === "bottom" ? "origin-top" : "origin-bottom"
              }`}
            >
              {props.text}
            </div>
          </div>
        </Show>
      </Portal>
    </div>
  );
}
