import { ParentProps } from "solid-js";
import { Dynamic } from "solid-js/web";

export interface HeadingProps extends ParentProps {
  class?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  gradient?: boolean;
}

export function HeadingText(props: HeadingProps) {
  return (
    <Dynamic
      component={`h${props.level || 1}`}
      class={`${props.gradient ? "text-theme" : "text-main"} font-bold tracking-tight ${props.class || ""}`}
    >
      {props.children}
    </Dynamic>
  );
}
