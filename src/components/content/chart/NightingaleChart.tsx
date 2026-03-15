import { Show } from "solid-js";
import { Card } from "../Card";
import { useChart } from "~/lib/hooks/useChart";
import { chartTheme } from "~/lib/store";

export function NightingaleChart(props: any) {
  let chartRef: HTMLDivElement | undefined;
  useChart({ ref: () => chartRef, option: () => props.option, theme: () => chartTheme() });
  return (
    <Card class="p-8 shadow-2xl animate-fade-in">
      <Show when={props.title}><h3 class="text-xl font-bold mb-1 text-main">{props.title}</h3></Show>
      <Show when={props.subtitle}><p class="text-sm text-muted mb-6">{props.subtitle}</p></Show>
      <div class={`relative rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden ${props.height || "h-[500px]"}`}>
        <div ref={chartRef} class="w-full h-full" />
      </div>
    </Card>
  );
}
