import { ParentProps, JSX, splitProps, Show } from "solid-js";
import { Tooltip } from "../content/Tooltip";

export interface ButtonProps extends ParentProps {
  class?: string;
  onClick?: (e: MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  tooltip?: string;
  tooltipPosition?: "top" | "right" | "bottom";
  variant?: "default" | "accent" | "info" | "success" | "warning" | "error";
  layout?: "default" | "text-icon" | "icon-text";
  icon?: JSX.Element;
}

export function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, ["class", "variant", "layout", "icon", "children", "tooltip", "tooltipPosition", "disabled"]);

  const variantClasses = {
    default: "bg-theme text-white shadow-lg shadow-primary/20",
    accent: "bg-surface dark:bg-white/10 text-theme-solid border border-input-border shadow-sm hover:bg-hover",
    info: "bg-blue-500 text-white shadow-lg shadow-blue-500/20",
    success: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20",
    warning: "bg-amber-500 text-white shadow-lg shadow-amber-500/20",
    error: "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
  };

  const getVariantClass = () => variantClasses[local.variant || "default"];
  const isFull = () => local.class?.includes("w-full");

  return (
    <Tooltip
      text={local.tooltip!}
      position={local.tooltipPosition}
      disabled={!local.tooltip}
      class={isFull() ? "w-full" : ""}
    >
      <button
        type={others.type || "button"}
        onClick={props.onClick}
        disabled={local.disabled}
        aria-label={local.tooltip}
        aria-disabled={local.disabled}
        class={`p-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${getVariantClass()} ${local.class || ""}`}
      >
        <div class="flex items-center justify-center gap-2">
          <Show when={local.layout === "icon-text" && local.icon}>
            <div class="flex items-center justify-center w-4 h-4 shrink-0 transition-transform group-hover:scale-110">
              {local.icon}
            </div>
          </Show>
          
          <span class="flex-1 text-center">{local.children}</span>
          
          <Show when={(local.layout === "text-icon" || (local.icon && !local.layout)) && local.icon}>
            <div class="flex items-center justify-center w-4 h-4 shrink-0 transition-transform group-hover:scale-110">
              {local.icon}
            </div>
          </Show>
        </div>
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
        class={`h-10 w-10 flex items-center justify-center rounded-xl bg-input border border-input-border text-main transition-all duration-300 hover:brightness-110 hover:bg-hover hover:scale-105 active:scale-90 shadow-sm group cursor-pointer ${props.class || ""}`}
      >
        <div class="flex items-center justify-center w-5 h-5">
          {props.children}
        </div>
      </button>
    </Tooltip>
  );
}
