import { onMount, onCleanup, createEffect } from "solid-js";
import * as echarts from "echarts";
import { mode, color } from "~/lib/store";
import { registerThemes, getAccentPalette, lightTheme, darkTheme } from "~/lib/theme";

// Initialize themes once
registerThemes();

const registeredDynamicThemes = new Set<string>();

export function useChart(props: {
  ref: () => HTMLDivElement | undefined;
  option: () => echarts.EChartsOption;
  theme?: () => string;
  onEvents?: Record<string, (params: any) => void>;
}) {
  let chartInstance: echarts.ECharts | undefined;

  const getThemeName = () => {
    const currentMode = mode();
    const targetTheme = props.theme?.() || "auto";

    if (targetTheme === "auto") return currentMode;
    
    if (targetTheme === "accent") {
      const accentName = `accent-${color()}-${currentMode}`;
      if (!registeredDynamicThemes.has(accentName)) {
        const palette = getAccentPalette(color());
        const baseTheme = (currentMode === 'dark' ? darkTheme : lightTheme) as any;
        
        // Create theme-aware map colors
        const accentBase = palette[0];
        const r = parseInt(accentBase.slice(1, 3), 16);
        const g = parseInt(accentBase.slice(3, 5), 16);
        const b = parseInt(accentBase.slice(5, 7), 16);
        
        const areaColor = `rgba(${r}, ${g}, ${b}, ${currentMode === 'dark' ? '0.12' : '0.15'})`; 
        const borderColor = `rgba(${r}, ${g}, ${b}, ${currentMode === 'dark' ? '0.25' : '0.3'})`; 
        
        echarts.registerTheme(accentName, {
            ...baseTheme,
            color: palette,
            geo: {
                ...(baseTheme.geo || {}),
                itemStyle: {
                    ...(baseTheme.geo?.itemStyle || {}),
                    areaColor: areaColor,
                    borderColor: borderColor
                }
            },
            map: {
                ...(baseTheme.map || {}),
                itemStyle: {
                    ...(baseTheme.map?.itemStyle || {}),
                    areaColor: areaColor,
                    borderColor: borderColor
                }
            }
        });
        registeredDynamicThemes.add(accentName);
      }
      return accentName;
    }

    return `${targetTheme}-${currentMode}`;
  };

  const initChart = () => {
    const el = props.ref();
    if (el) {
      if (chartInstance) {
        chartInstance.dispose();
      }
      
      chartInstance = echarts.init(el, getThemeName());
      chartInstance.setOption(props.option());

      if (props.onEvents) {
        Object.entries(props.onEvents).forEach(([eventName, handler]) => {
          chartInstance?.on(eventName, handler);
        });
      }
    }
  };

  onMount(() => {
    initChart();

    const handleResize = () => {
      chartInstance?.resize();
    };

    window.addEventListener("resize", handleResize);

    onCleanup(() => {
      window.removeEventListener("resize", handleResize);
      chartInstance?.dispose();
    });
  });

  // Re-initialize when mode or theme changes
  createEffect(() => {
    mode();
    props.theme?.();
    initChart();
  });

  // Re-initialize for accent color
  createEffect(() => {
    if (props.theme?.() === "accent") {
      color();
      initChart();
    }
  });

  // Update options
  createEffect(() => {
    const opt = props.option();
    if (chartInstance && opt) {
      chartInstance.setOption(opt, { notMerge: true });
    }
  });

  return {
    getInstance: () => chartInstance
  };
}
