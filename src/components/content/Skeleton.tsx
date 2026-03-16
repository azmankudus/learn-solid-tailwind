import { Show } from "solid-js";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  count?: number;
  class?: string;
  variant?: "shimmer" | "pulse";
}

export function Skeleton(props: SkeletonProps) {
  const width = () => typeof props.width === "number" ? `${props.width}px` : (props.width || "100%");
  const height = () => typeof props.height === "number" ? `${props.height}px` : (props.height || "1rem");
  
  return (
    <div class="flex flex-col gap-3 w-full">
      {Array.from({ length: props.count || 1 }).map(() => (
        <div 
          class={`relative overflow-hidden bg-input/50 rounded-xl ${props.circle ? 'rounded-full' : ''} ${props.class || ""}`}
          classList={{
            "animate-pulse": props.variant !== "shimmer",
          }}
          style={{ width: width(), height: height() }}
        >
          <Show when={props.variant === "shimmer"}>
             <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </Show>
        </div>
      ))}
    </div>
  );
}

// Add keyframes if not in app.css
// @keyframes shimmer {
//   100% { transform: translateX(100%); }
// }
