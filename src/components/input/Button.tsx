import { ParentProps } from "solid-js";
import { Tooltip } from "../Components";

export interface ButtonProps extends ParentProps {
  class?: string;
  onClick?: (e: MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  tooltip?: string;
  tooltipPosition?: "top" | "right" | "bottom";
}

export function Button(props: ButtonProps) {
  return (
    <Tooltip text={props.tooltip!} position={props.tooltipPosition} disabled={!props.tooltip}>
      <button
        type={props.type || "button"}
        onClick={props.onClick}
        disabled={props.disabled}
        aria-label={props.tooltip}
        aria-disabled={props.disabled}
        class={`bg-theme text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-95 cursor-pointer ${props.class || ""}`}
      >
        {props.children}
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
