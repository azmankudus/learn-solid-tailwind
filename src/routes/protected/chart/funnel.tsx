import { PageWrapper } from "~/components/layout/PageWrapper";
import { FunnelChart } from "~/components/content/chart/FunnelChart";
import { FUNNEL_DATA } from "~/lib/sample";

export default function FunnelPage() {
  const option = {
    series: [{ type: 'funnel', left: '10%', width: '80%', data: FUNNEL_DATA }]
  };
  return (
    <PageWrapper>
      <FunnelChart title="Conversion Pipeline" subtitle="Staged attrition and throughput analysis" option={option} />
    </PageWrapper>
  );
}
