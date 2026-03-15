import { PageWrapper } from "~/components/layout/PageWrapper";
import { CandleStickChart } from "~/components/content/chart/CandleStickChart";
import { CANDLESTICK_DATA } from "~/lib/sample";

export default function CandleStickPage() {
  const option = {
    xAxis: { data: CANDLESTICK_DATA.map(d => d[0]) },
    yAxis: {},
    series: [{ type: 'candlestick', data: CANDLESTICK_DATA.map(d => d.slice(1)) }]
  };
  return (
    <PageWrapper>
      <CandleStickChart title="Market Volatility" subtitle="Open-High-Low-Close financial analysis" option={option} />
    </PageWrapper>
  );
}
