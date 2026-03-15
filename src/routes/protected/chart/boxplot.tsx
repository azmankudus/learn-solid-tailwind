import { PageWrapper } from "~/components/layout/PageWrapper";
import { BoxPlotChart } from "~/components/content/chart/BoxPlotChart";
import { BOXPLOT_DATA } from "~/lib/sample";

export default function BoxPlotPage() {
  const option = {
    xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
    yAxis: {},
    series: [{ type: 'boxplot', data: BOXPLOT_DATA }]
  };
  return (
    <PageWrapper>
      <BoxPlotChart title="Variance Distribution" subtitle="Quartile-based statistical analysis" option={option} />
    </PageWrapper>
  );
}
