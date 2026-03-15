import { Show, JSX } from "solid-js";
import { Card } from "../Card";
import { useChart } from "~/lib/hooks/useChart";
import { chartTheme } from "~/lib/store";

export interface PieChartProps {
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
  option: any;
  height?: string;
  class?: string;
  loading?: boolean;
}

export function PieChart(props: PieChartProps) {
  let chartRef: HTMLDivElement | undefined;
  useChart({ ref: () => chartRef, option: () => props.option, theme: () => chartTheme() });

  return (
    <Card class={`p-8 shadow-2xl animate-fade-in ${props.class || ""}`}>
      <Show when={props.title || props.subtitle}>
        <div class="mb-6 space-y-1">
          <Show when={props.title}><h3 class="text-xl font-bold tracking-tight text-main">{props.title}</h3></Show>
          <Show when={props.subtitle}><p class="text-sm text-muted leading-relaxed">{props.subtitle}</p></Show>
        </div>
      </Show>
      <div class={`relative rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden ${props.height || "h-[450px]"}`}>
        <Show when={props.loading}>
          <div class="absolute inset-0 z-50 bg-background/60 backdrop-blur-md flex items-center justify-center">
            <div class="w-12 h-12 border-4 border-theme border-t-transparent rounded-full animate-spin" />
          </div>
        </Show>
        <div ref={chartRef} class="w-full h-full" />
      </div>
    </Card>
  );
}
