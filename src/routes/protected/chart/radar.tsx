import { PageWrapper } from "~/components/layout/PageWrapper";
import { RadarChart } from "~/components/content/chart/RadarChart";
import { RADAR_DATA } from "~/lib/sample";

export default function RadarPage() {
  const option = {
    radar: { indicator: RADAR_DATA.indicators },
    series: [{ type: 'radar', data: RADAR_DATA.series }]
  };
  return (
    <PageWrapper>
      <RadarChart title="Skill Matrix" subtitle="Multi-dimensional performance overview" option={option} />
    </PageWrapper>
  );
}
