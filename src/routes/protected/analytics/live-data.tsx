import { For, createSignal } from "solid-js";
import { HeadingText } from "~/components/content/Heading";
import { Card } from "~/components/content/Card";
import { IconButton } from "~/components/input/Button";
import { Icon } from "@iconify-icon/solid";
import { ICON_ARROW_PATH, ICON_TRENDING_UP, ICON_BOLT } from "~/lib/icons";
import { Title } from "@solidjs/meta";
import { text } from "~/lib/i18n";
import { PageWrapper } from "~/components/layout/PageWrapper";

export default function LiveData() {
  const [data] = createSignal([
    { name: text("dash.analytics.visits"), value: 2400, color: "theme" },
    { name: text("dash.analytics.sessions"), value: 1398, color: "sky-500" },
    { name: text("dash.analytics.users"), value: 9800, color: "emerald-500" }
  ]);


  return (
    <PageWrapper class="flex flex-col space-y-8 pb-20">
      <Title>Live Analytics | UI-DEN</Title>
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
        <div class="flex items-center space-x-3">
          <div class="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Icon icon={ICON_BOLT} width={24} height={24} />
          </div>
          <HeadingText level={1} class="text-3xl sm:text-4xl">Live Data</HeadingText>
        </div>
        <IconButton tooltip="Refresh Data">
          <Icon icon={ICON_ARROW_PATH} width={20} height={20} />
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
                  <Icon icon={ICON_TRENDING_UP} width={14} height={14} />
                  <span>+12.5%</span>
                </div>
              </div>
            </Card>
          )}
        </For>
      </div>
    </PageWrapper>
  );
}
