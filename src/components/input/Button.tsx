import { ParentProps, JSX, splitProps, Show } from "solid-js";
import { Tooltip } from "../content/Tooltip";

export interface ButtonProps extends ParentProps {
  class?: string;
  onClick?: (e: MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  tooltip?: string;
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  variant?: "default" | "accent" | "info" | "success" | "warning" | "error";
  layout?: "default" | "text-icon" | "icon-text" | "reveal-left" | "reveal-right";
  icon?: JSX.Element;
  glow?: boolean;
}

export function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, ["class", "variant", "layout", "icon", "children", "tooltip", "tooltipPosition", "disabled", "glow"]);

  const variantClasses = {
    default: "bg-theme text-white shadow-lg shadow-primary/20",
    accent: "bg-surface dark:bg-white/10 text-theme-solid border border-input-border shadow-sm hover:bg-hover",
    info: "bg-blue-500 text-white shadow-lg shadow-blue-500/20",
    success: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20",
    warning: "bg-amber-500 text-white shadow-lg shadow-amber-500/20",
    error: "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
  };

  const iconBg = {
    default: "bg-white text-theme",
    accent: "bg-theme text-white",
    info: "bg-white text-blue-500",
    success: "bg-white text-emerald-500",
    warning: "bg-white text-amber-500",
    error: "bg-white text-rose-500"
  };

  const glowColors = {
    default: "bg-white/10",
    accent: "bg-theme/10",
    info: "bg-blue-500/20",
    success: "bg-emerald-500/20",
    warning: "bg-amber-500/20",
    error: "bg-rose-500/20"
  };

  const getVariantClass = () => variantClasses[local.variant || "default"];
  const getIconBg = () => iconBg[local.variant || "default"];
  const getGlowColor = () => glowColors[local.variant || "default"];
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
        type={others.type || "button"}
        onClick={props.onClick}
        disabled={local.disabled}
        aria-label={local.tooltip}
        aria-disabled={local.disabled}
        class={`p-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden ${getVariantClass()} ${local.class || ""}`}
      >
        {/* Glow Layer from IconButton.tsx */}
        <Show when={local.glow}>
          <div class={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none ${getGlowColor()}`} />
        </Show>

        <div class="flex items-center justify-center gap-2 relative z-10 transition-all duration-300">
          <Show when={local.layout === "icon-text" && local.icon}>
            <div class="flex items-center justify-center w-4 h-4 shrink-0 transition-transform group-hover:scale-110">
              {local.icon}
            </div>
          </Show>

          <span class={`flex-1 text-center transition-transform duration-300 ease-out
            ${local.layout === "reveal-right" ? "group-hover:-translate-x-4" : ""}
            ${local.layout === "reveal-left" ? "group-hover:translate-x-4" : ""}
          `}>
            {local.children}
          </span>

          <Show when={(local.layout === "text-icon" || (local.icon && !local.layout)) && local.icon}>
            <div class="flex items-center justify-center w-4 h-4 shrink-0 transition-transform group-hover:scale-110">
              {local.icon}
            </div>
          </Show>

          {/* Reveal Icon Box from TextButton.tsx */}
          <Show when={isReveal() && local.icon}>
             <div class={`absolute inset-y-0 flex items-center justify-center aspect-square transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 overflow-hidden ${getIconBg()}
               ${local.layout === "reveal-right" ? "right-0 translate-x-full group-hover:translate-x-0 rounded-l-lg" : "left-0 -translate-x-full group-hover:translate-x-0 rounded-r-lg"}
             `}>
               <div class="w-4 h-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                 {local.icon}
               </div>
             </div>
          </Show>
        </div>
      </button>
    </Tooltip>
  );
}

export function IconButton(props: ButtonProps) {
  const [local, others] = splitProps(props, ["class", "variant", "tooltip", "tooltipPosition", "disabled", "children", "glow"]);
  
  const getGlowColor = () => {
    if (local.variant === 'error') return "bg-rose-500/20";
    if (local.variant === 'success') return "bg-emerald-500/20";
    return "bg-theme/20";
  };

  return (
    <Tooltip text={local.tooltip!} position={local.tooltipPosition || "bottom"} disabled={!local.tooltip}>
      <button
        type="button"
        disabled={local.disabled}
        aria-label={local.tooltip}
        aria-disabled={local.disabled}
        class={`h-10 w-10 flex items-center justify-center rounded-xl bg-input border border-input-border text-main transition-all duration-300 hover:brightness-110 hover:bg-hover hover:scale-110 active:scale-90 shadow-sm group cursor-pointer relative overflow-hidden ${local.class || ""}`}
        {...others}
      >
        {/* Glow Layer from IconButton.tsx */}
        <Show when={local.glow}>
          <div class={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none ${getGlowColor()}`} />
        </Show>

        <div class="flex items-center justify-center w-5 h-5 relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor] group-hover:scale-110">
          {local.children}
        </div>
      </button>
    </Tooltip>
  );
}
