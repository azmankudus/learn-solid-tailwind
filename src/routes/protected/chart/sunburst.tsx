import { PageWrapper } from "~/components/layout/PageWrapper";
import { SunburstChart } from "~/components/content/chart/SunburstChart";
import { SUNBURST_DATA } from "~/lib/sample";

export default function SunburstPage() {
  const option = {
    series: [{ type: 'sunburst', data: SUNBURST_DATA, radius: [0, '90%'] }]
  };
  return (
    <PageWrapper>
      <SunburstChart title="Ancestry Structure" subtitle="Circular hierarchical relationship analysis" option={option} />
    </PageWrapper>
  );
}
