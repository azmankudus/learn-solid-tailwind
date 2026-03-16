import { Show } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_USER } from "~/lib/icons";

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "away" | "busy";
  class?: string;
}

export function Avatar(props: AvatarProps) {
  const sizeMap = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-xl"
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-muted",
    away: "bg-amber-500",
    busy: "bg-red-500"
  };

  const getInitials = (name?: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div class={`relative inline-flex shrink-0 ${props.class || ""}`}>
      <div 
        class={`flex items-center justify-center rounded-2xl overflow-hidden border-2 border-surface bg-input text-main font-black transition-all duration-300 shadow-sm ${sizeMap[props.size || "md"]}`}
      >
        <Show 
          when={props.src} 
          fallback={
            <Show when={props.name} fallback={<Icon icon={ICON_USER} class="opacity-30" />}>
              <span class="tracking-tighter">{getInitials(props.name)}</span>
            </Show>
          }
        >
          <img src={props.src} alt={props.name} class="h-full w-full object-cover" />
        </Show>
      </div>

      <Show when={props.status}>
        <div 
          class={`absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-surface ring-1 ring-black/5 animate-pulse ${statusColors[props.status!]} ${props.size === "xs" ? "h-2 w-2" : "h-3 w-3"}`}
        />
      </Show>
    </div>
  );
}
