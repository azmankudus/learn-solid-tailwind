import { PageWrapper } from "~/components/layout/PageWrapper";
import { HeatMapChart } from "~/components/content/chart/HeatMapChart";
import { HEATMAP_DATA } from "~/lib/sample";

export default function HeatMapPage() {
  const option = {
    tooltip: { position: 'top' },
    grid: { height: '50%', top: '10%' },
    xAxis: { type: 'category', data: Array.from({length: 24}, (_, i) => i + 'h') },
    yAxis: { type: 'category', data: ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun'] },
    visualMap: { min: 0, max: 10, calculable: true, orient: 'horizontal', left: 'center', bottom: '15%' },
    series: [{ name: 'Activity', type: 'heatmap', data: HEATMAP_DATA, label: { show: true }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } } }]
  };
  return (
    <PageWrapper>
      <HeatMapChart title="Activity Density" subtitle="Peak usage patterns across the temporal spectrum" option={option} />
    </PageWrapper>
  );
}
