import { ParentProps, Show } from "solid-js";

export interface BadgeProps extends ParentProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "outline" | "ghost";
  size?: "xs" | "sm" | "md";
  class?: string;
  round?: boolean;
}

export function Badge(props: BadgeProps) {
  const baseClasses = "inline-flex items-center font-black uppercase tracking-widest transition-all duration-300";
  
  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-[8px]",
    sm: "px-2 py-0.5 text-[9px]",
    md: "px-2.5 py-1 text-[10px]"
  };

  const variantClasses = {
    primary: "bg-theme/10 text-theme border border-theme/20",
    secondary: "bg-input text-muted border border-input-border",
    success: "bg-green-500/10 text-green-500 border border-green-500/20",
    warning: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
    error: "bg-red-500/10 text-red-500 border border-red-500/20",
    info: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
    outline: "bg-transparent text-main border border-input-border",
    ghost: "bg-transparent text-muted hover:text-main"
  };

  return (
    <span 
      class={`${baseClasses} ${sizeClasses[props.size || "sm"]} ${variantClasses[props.variant || "primary"]} ${props.round ? 'rounded-full' : 'rounded-lg'} ${props.class || ""}`}
    >
      {props.children}
    </span>
  );
}
