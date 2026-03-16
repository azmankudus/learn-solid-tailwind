
import { createSignal, createEffect, onCleanup, For, Show } from "solid-js";
import { Portal, isServer } from "solid-js/web";
import { Icon } from "@iconify-icon/solid";
import { ICON_CHEVRON_LEFT, ICON_ARROW_PATH, ICON_X_MARK, ICON_INFORMATION_CIRCLE } from "~/lib/icons";
import { getErrorConfig } from "~/lib/errors";
import { Button } from "../input/Button";
import { Modal } from "./Modal";

interface ErrorModalProps {
  code: string | number;
  isOpen: boolean;
  onClose: () => void;
}

export function ErrorModal(props: ErrorModalProps) {
  const config = () => getErrorConfig(props.code);
  const [showDetails, setShowDetails] = createSignal(false);
  const [hovered, setHovered] = createSignal(false);

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

  // Condensed background watermarks
  const bgIcons = [
    { s: 2.1, x: '8%', y: '12%', r: 45, o: 0.12 },
    { s: 1.4, x: '82%', y: '15%', r: -25, o: 0.18 },
    { s: 2.6, x: '18%', y: '72%', r: 120, o: 0.08 },
    { s: 1.7, x: '78%', y: '85%', r: 35, o: 0.20 },
    { s: 1.9, x: '42%', y: '8%', r: -60, o: 0.14 },
    { s: 2.3, x: '92%', y: '38%', r: 155, o: 0.09 },
    { s: 1.2, x: '12%', y: '42%', r: 95, o: 0.15 },
    { s: 3.2, x: '55%', y: '55%', r: 20, o: 0.06 },
    { s: 1.3, x: '35%', y: '25%', r: -35, o: 0.18 },
    { s: 2.9, x: '65%', y: '12%', r: 195, o: 0.11 },
  ];

  return (
    <Portal>
      <div
        class="fixed inset-0 z-[1000] flex items-center justify-center p-4 modal-overlay"
        classList={{ "modal-overlay--open": props.isOpen }}
      >
        {/* Backdrop */}
        <div
          class="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500"
          onClick={props.onClose}
        />

        <Show when={props.isOpen}>
          <div
            class="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 sm:p-20 text-center animate-fade-in gap-0"
          >
            {/* Scattered Background Icon Watermarks */}
            <div class="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
              <For each={bgIcons}>
                {(item) => (
                  <div
                    class="absolute text-theme transition-colors duration-700"
                    style={{
                      left: item.x,
                      top: item.y,
                      opacity: item.o,
                      transform: `scale(${item.s}) rotate(${item.r}deg)`,
                    }}
                  >
                    <Icon icon={config().icon} width={80} height={80} />
                  </div>
                )}
              </For>
            </div>

            {/* Flickering HTTP Code */}
            <div class="relative z-10 select-none">
              <div
                class="flex items-center justify-center font-black font-mono tracking-tighter"
                style={{ "font-size": "min(18rem, 40vw)" }}
              >
                <For each={String(config().code).split('')}>
                  {(digit, i) => (
                    <span
                      class="text-theme inline-block animate-flicker"
                      style={{
                        "animation-delay": `${i() * 0.3}s`,
                        "filter": "drop-shadow(0 0 30px color-mix(in srgb, var(--primary), transparent 50%))",
                      }}
                    >
                      {digit}
                    </span>
                  )}
                </For>
              </div>
            </div>

            {/* Error Content */}
            <div class="flex flex-col items-center z-20 w-full max-w-4xl -mt-12">
              <h2 class="text-4xl sm:text-7xl font-black text-main tracking-tighter text-center leading-[0.9] transition-all duration-300 w-full italic uppercase mb-10">
                {config().name}
              </h2>

              {/* Action Buttons */}
              <div class="flex flex-col sm:flex-row gap-4 items-center w-full justify-center">
                <Button
                  variant="primary"
                  class="px-10 h-16 rounded-2xl min-w-[200px]"
                  onClick={props.onClose}
                  icon={<Icon icon={ICON_CHEVRON_LEFT} />}
                  layout="reveal-left"
                >
                  Back
                </Button>

                <Button
                  variant="secondary"
                  class="px-10 h-16 rounded-2xl min-w-[200px]"
                  onClick={() => setShowDetails(true)}
                  icon={<Icon icon={ICON_INFORMATION_CIRCLE} />}
                  layout="icon-text"
                >
                  More Info
                </Button>
              </div>
            </div>
          </div>
        </Show>
      </div>
      <Modal
        isOpen={showDetails()}
        onClose={() => setShowDetails(false)}
        title="Diagnostic Details"
        icon={<Icon icon={ICON_INFORMATION_CIRCLE} />}
      >
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-theme/5 border border-theme/10">
            <h4 class="text-[10px] font-black text-theme uppercase tracking-[0.2em] mb-2">Protocol Name</h4>
            <p class="text-main font-bold">{config().name}</p>
          </div>

          <div class="p-4 rounded-xl bg-hover border border-input-border">
            <h4 class="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-2">Description</h4>
            <p class="text-muted text-sm leading-relaxed">{config().description}</p>
          </div>

          <div class="p-4 rounded-xl bg-hover border border-input-border">
            <h4 class="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-2">Technical Code</h4>
            <p class="text-main font-mono font-bold">HTTP_{config().code}</p>
          </div>
        </div>
      </Modal>
    </Portal>
  );
}
