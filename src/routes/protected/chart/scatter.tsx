import { PageWrapper } from "~/components/layout/PageWrapper";
import { ScatterChart } from "~/components/content/chart/ScatterChart";
import { SCATTER_DATA } from "~/lib/sample";

export default function ScatterPage() {
  const option = {
    xAxis: {},
    yAxis: {},
    series: [{ symbolSize: 20, data: SCATTER_DATA, type: 'scatter' }]
  };
  return (
    <PageWrapper>
      <ScatterChart title="Correlation Map" subtitle="Statistical distribution of variables" option={option} />
    </PageWrapper>
  );
}
