import { ParentProps, Show } from "solid-js";

export interface CardProps extends ParentProps {
  class?: string;
  hover?: boolean;
  padding?: string;
  themeTint?: boolean;
  overflowVisible?: boolean;
}

export function Card(props: CardProps) {
  return (
    <div 
      class={`rounded-2xl bg-surface/80 backdrop-blur-2xl relative ${props.overflowVisible ? 'overflow-visible' : 'overflow-hidden'} border-none ${props.padding || 'p-4 sm:p-6'} transition-all duration-500 hover:-translate-y-1 ${props.class || ""}`}
      style={{ "box-shadow": "var(--card-shadow)" }}
    >
      <Show when={props.themeTint}>
        <div class="absolute inset-0 bg-primary/[0.03] pointer-events-none" />
      </Show>
      <div class="relative z-10">
        {props.children}
      </div>
    </div>
  );
}
