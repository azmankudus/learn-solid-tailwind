import { PageWrapper } from "~/components/layout/PageWrapper";
import { AreaChart } from "~/components/content/chart/AreaChart";
import { LINE_DATA } from "~/lib/sample";

export default function AreaPage() {
  const option = {
    xAxis: { type: 'category', boundaryGap: false, data: LINE_DATA.timeline },
    yAxis: { type: 'value' },
    series: LINE_DATA.series.map(s => ({ name: s.name, type: 'line', smooth: true, areaStyle: {}, data: s.data }))
  };
  return (
    <PageWrapper>
      <AreaChart title="Growth Surface" subtitle="Volume analysis over time" option={option} />
    </PageWrapper>
  );
}
