import { Show } from "solid-js";

export interface ProgressProps {
  value?: number;
  max?: number;
  label?: string;
  variant?: "primary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  indeterminate?: boolean;
  class?: string;
}

export function Progress(props: ProgressProps) {
  const max = () => props.max || 100;
  const value = () => props.value || 0;
  const percentage = () => Math.min(Math.max((value() / max()) * 100, 0), 100);

  const variantClasses = {
    primary: "bg-theme",
    success: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
    info: "bg-blue-500"
  };

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  };

  return (
    <div class={`flex flex-col gap-2 w-full ${props.class || ""}`}>
      <div class="flex justify-between items-end px-1">
        <Show when={props.label}>
          <span class="text-[10px] font-black uppercase tracking-widest text-main">
            {props.label}
          </span>
        </Show>
        <Show when={props.showValue && !props.indeterminate}>
          <span 
            class="text-[10px] font-black uppercase tracking-tighter"
            classList={{
              "text-theme": props.variant === "primary" || !props.variant,
              "text-green-500": props.variant === "success",
              "text-amber-500": props.variant === "warning",
              "text-red-500": props.variant === "error",
              "text-blue-500": props.variant === "info"
            }}
          >
            {Math.round(percentage())}%
          </span>
        </Show>
      </div>

      <div 
        class={`relative w-full bg-input rounded-full overflow-hidden border border-input-border shadow-inner ${sizeClasses[props.size || "md"]}`}
      >
        <Show 
          when={!props.indeterminate} 
          fallback={
            <div class={`absolute inset-0 w-1/3 animate-[shimmer_1.5s_infinite] rounded-full ${variantClasses[props.variant || "primary"]}`} />
          }
        >
          <div 
            class={`h-full transition-all duration-500 ease-out rounded-full shadow-sm ${variantClasses[props.variant || "primary"]}`}
            style={{ width: `${percentage()}%` }}
          >
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
          </div>
        </Show>
      </div>
    </div>
  );
}
