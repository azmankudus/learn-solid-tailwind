import { ParentProps, JSX, splitProps, Show, createSignal, onMount, onCleanup } from "solid-js";
import { Tooltip } from "../content/Tooltip";

export interface ButtonProps extends ParentProps {
  class?: string;
  onClick?: (e: MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  tooltip?: string;
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  variant?: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  layout?: "default" | "text-icon" | "icon-text" | "reveal-left" | "reveal-right";
  icon?: JSX.Element;
}

export function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, ["class", "variant", "layout", "icon", "children", "tooltip", "tooltipPosition", "disabled"]);
  let btnRef: HTMLButtonElement | undefined;
  const [shift, setShift] = createSignal(0);

  onMount(() => {
    if (!btnRef) return;
    const update = () => {
      if (btnRef) setShift(btnRef.offsetHeight / 2);
    };
    const observer = new ResizeObserver(update);
    observer.observe(btnRef);
    update();
    onCleanup(() => observer.disconnect());
  });

  const primaryStyle = "bg-theme text-white [--reveal-box-bg:white] [--reveal-icon-color:var(--primary)] shadow-lg shadow-primary/20";
  
  const variantClasses: Record<string, string> = {
    primary: primaryStyle,
    secondary: "bg-surface dark:bg-white/10 text-theme-solid [--reveal-box-bg:var(--primary)] [--reveal-icon-color:white] border border-input-border shadow-sm hover:bg-hover",
    info: "bg-blue-500 text-white [--reveal-box-bg:white] [--reveal-icon-color:#3b82f6] shadow-lg shadow-blue-500/20",
    success: "bg-emerald-500 text-white [--reveal-box-bg:white] [--reveal-icon-color:#10b981] shadow-lg shadow-emerald-500/20",
    warning: "bg-amber-500 text-white [--reveal-box-bg:white] [--reveal-icon-color:#f59e0b] shadow-lg shadow-amber-500/20",
    error: "bg-rose-500 text-white [--reveal-box-bg:white] [--reveal-icon-color:#f43f5e] shadow-lg shadow-rose-500/20"
  };

  const getVariantClass = () => variantClasses[local.variant || "primary"];
  const isFull = () => local.class?.includes("w-full");
  const isReveal = () => local.layout === "reveal-left" || local.layout === "reveal-right";

  return (
    <Tooltip
      text={local.tooltip!}
      position={local.tooltipPosition}
      disabled={!local.tooltip}
      class={isFull() ? "w-full" : ""}
    >
      <button
        ref={btnRef}
        type={others.type || "button"}
        onClick={props.onClick}
        disabled={local.disabled}
        aria-label={local.tooltip}
        aria-disabled={local.disabled}
        class={`p-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden ${getVariantClass()} ${local.class || ""}`}
        style={{ "--reveal-shift": `${shift()}px` }}
      >
        <div class={`flex items-center justify-center gap-0 transition-all duration-300 relative z-10 w-full h-full
          ${local.layout === 'reveal-right' ? 'group-hover:-translate-x-[var(--reveal-shift)]' : ''}
          ${local.layout === 'reveal-left' ? 'group-hover:translate-x-[var(--reveal-shift)]' : ''}
        `}>
          {/* Balanced spacers: exactly half the button height each = total added width of button height */}
          <Show when={isReveal()}>
            <div
              style={{ width: `${shift()}px` }}
              class="h-full shrink-0"
              aria-hidden="true"
            />
          </Show>

          <div class="flex items-center justify-center gap-2 flex-1">
            <Show when={local.layout === "icon-text" && local.icon}>
              <div class="flex items-center justify-center w-4 h-4 shrink-0">
                {local.icon}
              </div>
            </Show>

            <span class="text-center font-semibold tracking-wide whitespace-nowrap">{local.children}</span>

            <Show when={(local.layout === "text-icon" || (local.icon && !local.layout)) && local.icon}>
              <div class="flex items-center justify-center w-4 h-4 shrink-0">
                {local.icon}
              </div>
            </Show>
          </div>

          <Show when={isReveal()}>
            <div
              style={{ width: `${shift()}px` }}
              class="h-full shrink-0"
              aria-hidden="true"
            />
          </Show>
        </div>

        {/* Dynamic Reveal Icon Box */}
        <Show when={isReveal() && local.icon}>
          <div class={`absolute inset-y-0 aspect-square flex items-center justify-center transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 bg-[var(--reveal-box-bg)] text-[var(--reveal-icon-color)]
            ${local.layout === 'reveal-right' ? 'right-0 translate-x-full group-hover:translate-x-0 rounded-l-xl' : 'left-0 -translate-x-full group-hover:translate-x-0 rounded-r-xl'}
          `}>
            <div class="w-4 h-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              {local.icon}
            </div>
          </div>
        </Show>
      </button>
    </Tooltip>
  );
}

export function IconButton(props: ButtonProps) {
  return (
    <Tooltip text={props.tooltip!} position={props.tooltipPosition || "bottom"} disabled={!props.tooltip}>
      <button
        type="button"
        onClick={props.onClick}
        disabled={props.disabled}
        aria-label={props.tooltip}
        aria-disabled={props.disabled}
        class={`h-10 w-10 flex items-center justify-center rounded-xl bg-input border border-input-border text-main transition-all duration-300 hover:brightness-110 hover:bg-hover active:scale-90 shadow-sm group cursor-pointer ${props.class || ""}`}
      >
        <div class="flex items-center justify-center w-5 h-5">
          {props.children}
        </div>
      </button>
    </Tooltip>
  );
}
