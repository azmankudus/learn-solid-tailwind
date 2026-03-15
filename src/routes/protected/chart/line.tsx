import { PageWrapper } from "~/components/layout/PageWrapper";
import { LineChart } from "~/components/content/chart/LineChart";
import { LINE_DATA } from "~/lib/sample";

export default function LinePage() {
  const option = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: LINE_DATA.timeline },
    yAxis: { type: 'value' },
    series: LINE_DATA.series.map(s => ({ name: s.name, type: 'line', smooth: true, data: s.data }))
  };
  return (
    <PageWrapper>
      <LineChart title="Revenue Trends" subtitle="Monthly financial performance indicators" option={option} />
    </PageWrapper>
  );
}
