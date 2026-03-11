import { For, createSignal } from "solid-js";
import { HeadingText, Card, IconButton } from "~/components/Components";
import { HiSolidArrowPath, HiSolidArrowTrendingUp, HiSolidBolt } from "solid-icons/hi";
import { Title } from "@solidjs/meta";
import { text } from "~/lib/i18n";

export default function LiveData() {
  const [data] = createSignal([
    { name: text("dash.analytics.visits"), value: 2400, color: "theme" },
    { name: text("dash.analytics.sessions"), value: 1398, color: "sky-500" },
    { name: text("dash.analytics.users"), value: 9800, color: "emerald-500" }
  ]);


  return (
    <div class="flex flex-col space-y-8 animate-fade-in pb-20">
      <Title>Live Analytics | UI-DEN</Title>
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
        <div class="flex items-center space-x-3">
          <div class="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <HiSolidBolt size={24} />
          </div>
          <HeadingText level={1} class="text-3xl sm:text-4xl">Live Data</HeadingText>
        </div>
        <IconButton tooltip="Refresh Data">
          <HiSolidArrowPath size={20} />
        </IconButton>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <For each={data()}>
          {(item) => (
            <Card class="p-6 overflow-hidden relative group">
              <div class="absolute top-0 right-0 w-32 h-32 bg-theme/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              <div class="relative z-10">
                <p class="text-xs font-bold uppercase tracking-widest text-muted mb-1">{item.name}</p>
                <h3 class="text-3xl font-black text-main">{item.value.toLocaleString()}</h3>
                <div class="flex items-center gap-1 text-emerald-500 text-xs font-bold mt-2">
                  <HiSolidArrowTrendingUp size={14} />
                  <span>+12.5%</span>
                </div>
              </div>
            </Card>
          )}
        </For>
      </div>
    </div>
  );
}
