import { PageWrapper } from "~/components/layout/PageWrapper";
import { BarChart } from "~/components/content/chart/BarChart";
import { BAR_DATA, STACKED_BAR_DATA } from "~/lib/sample";
import { Icon } from "@iconify-icon/solid";
import { ICON_CHART_BAR } from "~/lib/icons";

export default function BarPage() {
  const verticalOption = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: BAR_DATA.categories },
    yAxis: { type: 'value' },
    series: [{ data: BAR_DATA.values, type: 'bar', itemStyle: { borderRadius: [8, 8, 0, 0] } }]
  };

  const horizontalOption = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', data: BAR_DATA.categories },
    series: [{ data: BAR_DATA.values, type: 'bar', itemStyle: { borderRadius: [0, 8, 8, 0] } }]
  };

  const groupedOption = {
    tooltip: { 
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: { show: true, bottom: 0 },
    xAxis: { type: 'category', data: STACKED_BAR_DATA.categories },
    yAxis: { type: 'value' },
    series: STACKED_BAR_DATA.series.map(s => ({
      ...s,
      type: 'bar',
      emphasis: {
        focus: 'series'
      },
      blur: {
        opacity: 0.1
      },
      itemStyle: { borderRadius: [4, 4, 0, 0] }
    }))
  };

  return (
    <PageWrapper>
      <div class="flex items-center space-x-3 mb-8">
        <div class="h-12 w-12 rounded-2xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_CHART_BAR} width={28} height={28} />
        </div>
        <h1 class="text-4xl font-black tracking-tight text-main">Bar Analysis</h1>
      </div>

      <div class="flex flex-col space-y-8">
        <BarChart 
          title="Vertical Metrics" 
          subtitle="Standard breakdown of daily traffic across all nodes"
          option={verticalOption} 
        />
        
        <BarChart 
          title="Horizontal Perspective" 
          subtitle="Alternative visualization for comparative density analysis"
          option={horizontalOption} 
        />

        <BarChart 
          title="Grouped Comparison" 
          subtitle="Multi-series analysis across diverse media channels"
          option={groupedOption} 
        />
      </div>
    </PageWrapper>
  );
}
