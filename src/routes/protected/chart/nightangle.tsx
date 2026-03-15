import { PageWrapper } from "~/components/layout/PageWrapper";
import { NightingaleChart } from "~/components/content/chart/NightingaleChart";
import { NIGHTINGALE_DATA } from "~/lib/sample";

export default function NightingalePage() {
  const option = {
    series: [{
      type: 'pie',
      radius: [50, 250],
      roseType: 'area',
      data: NIGHTINGALE_DATA
    }]
  };
  return (
    <PageWrapper>
      <NightingaleChart title="Nightingale Rose" subtitle="Proportional distribution visualization" option={option} />
    </PageWrapper>
  );
}
