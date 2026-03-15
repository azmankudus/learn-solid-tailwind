import { PageWrapper } from "~/components/layout/PageWrapper";
import { StackedBarChart } from "~/components/content/chart/StackedBarChart";
import { STACKED_BAR_DATA } from "~/lib/sample";

export default function StackedBarPage() {
  const option = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: { type: 'category', data: STACKED_BAR_DATA.categories },
    yAxis: { type: 'value' },
    series: STACKED_BAR_DATA.series.map(s => ({ name: s.name, type: 'bar', stack: 'total', data: s.data }))
  };
  return (
    <PageWrapper>
      <StackedBarChart title="Component Breakdown" subtitle="Cumulative vertical analysis" option={option} />
    </PageWrapper>
  );
}
