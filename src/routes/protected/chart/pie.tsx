import { PageWrapper } from "~/components/layout/PageWrapper";
import { PieChart } from "~/components/content/chart/PieChart";
import { PIE_DATA } from "~/lib/sample";

export default function PiePage() {
  const option = {
    tooltip: { trigger: 'item' },
    legend: { bottom: '5%', left: 'center' },
    series: [{
      name: 'Access From',
      type: 'pie',
      radius: '70%',
      data: PIE_DATA,
      itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 }
    }]
  };
  return (
    <PageWrapper>
      <PieChart title="Traffic Distribution" subtitle="Market share by acquisition channel" option={option} />
    </PageWrapper>
  );
}
