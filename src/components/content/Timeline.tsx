import { For, JSX, Show } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_CLOCK } from "~/lib/icons";

export interface TimelineItem {
  title: string;
  time: string;
  description?: string;
  icon?: any;
  status?: "primary" | "success" | "warning" | "error";
  content?: JSX.Element;
}

export interface TimelineProps {
  items: TimelineItem[];
  class?: string;
}

export function Timeline(props: TimelineProps) {
  const statusColors = {
    primary: "bg-theme border-theme/20",
    success: "bg-green-500 border-green-500/20",
    warning: "bg-amber-500 border-amber-500/20",
    error: "bg-red-500 border-red-500/20"
  };

  const statusTexts = {
    primary: "text-theme",
    success: "text-green-500",
    warning: "text-amber-500",
    error: "text-red-500"
  };

  return (
    <div class={`flex flex-col ${props.class || ""}`}>
      <For each={props.items}>
        {(item, i) => (
          <div class="relative flex gap-6 pb-10 last:pb-0 group">
            {/* Thread Line */}
            <Show when={i() !== props.items.length - 1}>
               <div class="absolute left-5 top-10 bottom-0 w-0.5 bg-input-border/30 group-hover:bg-theme/20 transition-colors duration-500" />
            </Show>

            {/* Icon/Dot Node */}
            <div class={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border-4 border-surface shadow-md shrink-0 transition-transform duration-500 group-hover:scale-110 ${statusColors[item.status || "primary"]}`}>
              <Icon 
                icon={item.icon || ICON_CLOCK} 
                class="text-white" 
                width={18} 
                height={18} 
              />
            </div>

            {/* Content Card */}
            <div class="flex flex-col pt-1">
              <div class="flex items-center gap-3 mb-1.5 px-1">
                <span class={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md bg-input border border-input-border ${statusTexts[item.status || "primary"]}`}>
                  {item.time}
                </span>
                <span class="text-xs font-black text-main uppercase tracking-widest leading-none">
                  {item.title}
                </span>
              </div>
              
              <Show when={item.description}>
                <p class="text-[13px] font-medium text-muted/80 leading-relaxed px-1">
                  {item.description}
                </p>
              </Show>

              <Show when={item.content}>
                <div class="mt-4 p-4 rounded-2xl bg-input/50 border border-input-border/50 animate-fade-in text-xs font-semibold">
                   {item.content}
                </div>
              </Show>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
