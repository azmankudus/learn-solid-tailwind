import { PageWrapper } from "~/components/layout/PageWrapper";
import { TreeMapChart } from "~/components/content/chart/TreeMapChart";
import { TREEMAP_DATA } from "~/lib/sample";

export default function TreeMapPage() {
  const option = {
    series: [{ type: 'treemap', data: TREEMAP_DATA }]
  };
  return (
    <PageWrapper>
      <TreeMapChart title="Hierarchical Volume" subtitle="Categorical data density visualization" option={option} />
    </PageWrapper>
  );
}
