import { PageWrapper } from "~/components/layout/PageWrapper";
import { DonutChart } from "~/components/content/chart/DonutChart";
import { DONUT_DATA } from "~/lib/sample";

export default function DonutPage() {
  const option = {
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      data: DONUT_DATA,
      itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 }
    }]
  };
  return (
    <PageWrapper>
      <DonutChart title="Device Breakdown" subtitle="Platform ecosystem analysis" option={option} />
    </PageWrapper>
  );
}
