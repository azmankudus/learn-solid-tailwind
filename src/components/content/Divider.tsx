import { ParentProps, Show } from "solid-js";

export interface DividerProps extends ParentProps {
  orientation?: "horizontal" | "vertical";
  labelPlacement?: "start" | "center" | "end";
  class?: string;
  dashed?: boolean;
}

export function Divider(props: DividerProps) {
  const isHorizontal = () => (props.orientation || "horizontal") === "horizontal";
  const labelPlacement = () => props.labelPlacement || "center";

  return (
    <div 
      class={`relative flex items-center ${isHorizontal() ? 'w-full my-4' : 'h-full mx-4'} ${props.class || ""}`}
      classList={{
        "flex-row": isHorizontal(),
        "flex-col": !isHorizontal()
      }}
    >
      {/* Before Label Line */}
      <div 
        class={`bg-input-border/50 transition-colors duration-500`}
        classList={{
          "h-px grow": isHorizontal(),
          "w-px grow": !isHorizontal(),
          "border-t border-dashed bg-transparent": props.dashed && isHorizontal(),
          "border-l border-dashed bg-transparent": props.dashed && !isHorizontal(),
          "hidden": labelPlacement() === "start" && !!props.children
        }}
      />

      <Show when={!!props.children}>
        <div 
          class="px-4 py-1.5"
          classList={{
             "text-[10px] font-black uppercase tracking-[0.2em] text-muted/60 whitespace-nowrap": true
          }}
        >
          {props.children}
        </div>
      </Show>

      {/* After Label Line */}
      <div 
        class={`bg-input-border/50 transition-colors duration-500`}
        classList={{
          "h-px grow": isHorizontal(),
          "w-px grow": !isHorizontal(),
          "border-t border-dashed bg-transparent": props.dashed && isHorizontal(),
          "border-l border-dashed bg-transparent": props.dashed && !isHorizontal(),
          "hidden": labelPlacement() === "end" && !!props.children
        }}
      />
    </div>
  );
}
