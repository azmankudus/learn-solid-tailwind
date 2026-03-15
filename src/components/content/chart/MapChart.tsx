import { Show, createEffect, createSignal, createMemo } from "solid-js";
import { Card } from "../Card";
import { useChart } from "~/lib/hooks/useChart";
import { chartTheme } from "~/lib/store";
import * as echarts from "echarts";

export function MapChart(props: any) {
  let chartRef: HTMLDivElement | undefined;
  
  const [registeredMaps, setRegisteredMaps] = createSignal<Set<string>>(new Set());
  
  // Handle GeoJSON registration if provided
  createEffect(() => {
    const mapId = props.mapId;
    const geo = props.geoJSON;
    if (mapId && geo && geo.features && geo.features.length > 0) {
      // Always register to ensure the registry has the latest features for this ID.
      // IDs like map-malaysia might have been registered with stale data during a fast transition.
      echarts.registerMap(mapId, geo);
      
      setRegisteredMaps(prev => {
        if (prev.has(mapId)) return prev;
        const next = new Set(prev);
        next.add(mapId);
        return next;
      });
    }
  });

  const chartOption = createMemo(() => {
    const id = props.mapId;
    if (!id || !registeredMaps().has(id)) {
      // Return a safe placeholder option to prevent "regions" error
      // Also MUST remove 'geo' if it exists, as ECharts will try to load the map for it too
      const { geo, ...rest } = props.option;
      return { 
        ...rest, 
        series: []
      };
    }
    return props.option;
  });

  const { getInstance } = useChart({ 
    ref: () => chartRef, 
    option: chartOption, 
    theme: () => chartTheme(),
    onEvents: props.onEvents
  });

  return (
    <Card class="p-8 shadow-2xl animate-fade-in relative overflow-visible">
      <Show when={props.title || props.subtitle || props.headerExtra}>
        <div class="flex items-center justify-between mb-6">
          <div class="space-y-1">
            <Show when={props.title}><h3 class="text-xl font-bold tracking-tight text-main">{props.title}</h3></Show>
            <Show when={props.subtitle}><p class="text-sm text-muted leading-relaxed">{props.subtitle}</p></Show>
          </div>
          <Show when={props.headerExtra}><div class="flex items-center gap-2">{props.headerExtra}</div></Show>
        </div>
      </Show>

      <div class={`relative rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden backdrop-blur-sm transition-all duration-500 ${props.height || "h-[650px]"}`}>
        <Show when={props.loading}>
            <div class="absolute inset-0 z-50 bg-surface/60 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
              <div class="w-12 h-12 border-4 border-theme border-t-transparent rounded-full animate-spin" />
              <p class="text-xs font-black uppercase tracking-widest text-theme-solid animate-pulse">Loading Geospatial Assets</p>
            </div>
        </Show>

        <div class={`w-full h-full transition-all duration-700 ${props.refreshing ? 'opacity-0 scale-[0.98] blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
          <div ref={chartRef} class="w-full h-full" />
        </div>
      </div>
    </Card>
  );
}
