import { PageWrapper } from "~/components/layout/PageWrapper";
import { GaugeChart } from "~/components/content/chart/GaugeChart";
import { GAUGE_DATA } from "~/lib/sample";

export default function GaugePage() {
  const standardOption = {
    series: [{ 
      type: 'gauge', 
      progress: { show: true }, 
      detail: { valueAnimation: true, formatter: '{value}' }, 
      data: GAUGE_DATA 
    }]
  };

  const segmentedOption = {
    series: [{
      type: 'gauge',
      axisLine: {
        lineStyle: {
          width: 12,
          color: [
            [0.3, '#10B981'], // Green
            [0.5, '#FBBF24'], // Yellow
            [0.8, '#F59E0B'], // Amber
            [1, '#EF4444']    // Red
          ]
        }
      },
      pointer: { itemStyle: { color: 'inherit' } },
      axisTick: { distance: -12, length: 8, lineStyle: { color: '#fff', width: 2 } },
      splitLine: { distance: -12, length: 12, lineStyle: { color: '#fff', width: 4 } },
      axisLabel: { color: 'inherit', distance: 20, fontSize: 12 },
      detail: { valueAnimation: true, formatter: '{value}%', color: 'inherit' },
      data: GAUGE_DATA
    }]
  };

  return (
    <PageWrapper>
      <div class="flex flex-col space-y-8">
        <GaugeChart title="Standard Meter" subtitle="Base performance status visualization" option={standardOption} />
        <GaugeChart title="Status Segments" subtitle="Detailed health monitoring with threshold indicators" option={segmentedOption} />
      </div>
    </PageWrapper>
  );
}
