import { For } from "solid-js";
import { HeadingText, Button, Card } from "~/components/ThemeComponents";
import { HiSolidUsers, HiSolidCurrencyDollar, HiSolidArrowTrendingUp } from "solid-icons/hi";
import { t } from "~/lib/i18n";

export default function DashboardOverview() {
  const stats = () => [
    { label: t("dash.index.activeUsers"), value: '1,234', change: '+12%', icon: <HiSolidUsers size={24} /> },
    { label: t("dash.index.totalRev"), value: '$12k', change: '+8.4%', icon: <HiSolidCurrencyDollar size={24} /> },
    { label: t("dash.index.subRate"), value: '98%', change: '+2.1%', icon: <HiSolidArrowTrendingUp size={24} /> },
  ];

  return (
    <div class="space-y-6 max-w-7xl mx-auto py-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <HeadingText level={1} class="text-3xl sm:text-4xl">
            {t("dash.index.title")}
          </HeadingText>
          <p class="text-sm text-muted mt-2">{t("dash.index.desc")}</p>
        </div>
        <Button class="shadow-sm">
          {t("dash.index.newProj")}
        </Button>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <For each={stats()}>
          {(stat) => (
            <Card hover={true} class="group">
              <div class="flex items-start justify-between mb-6">
                <div class="h-12 w-12 rounded-xl bg-surface/50 border-none flex items-center justify-center text-xl shadow-sm group-hover:bg-primary/5 transition-colors">
                   {stat.icon}
                </div>
                <span class="text-xs font-semibold text-theme-solid bg-primary/10 px-3 py-1 rounded-full border-none">
                  {stat.change}
                </span>
              </div>
              
              <h3 class="text-sm font-medium text-muted mb-1">
                {stat.label}
              </h3>
              
              <p class="text-3xl font-bold text-main mb-6">
                {stat.value}
              </p>
              
              <div class="flex items-center gap-3">
                <div class="h-1.5 flex-grow bg-accent-muted rounded-full overflow-hidden">
                  <div class="h-full bg-theme w-[70%] rounded-full shadow-sm" />
                </div>
                <span class="text-xs font-medium text-muted">{t("dash.index.target")}</span>
              </div>
            </Card>
          )}
        </For>
      </div>

      <Card class="mt-8 overflow-hidden" padding="p-0">
        <div class="p-6 border-b-none bg-surface/80 backdrop-blur-md">
          <HeadingText level={2} class="text-xl">{t("dash.index.activity")}</HeadingText>
        </div>
        <div class="divide-y-0 bg-surface/50">
          <For each={[1, 2, 3]}>
            {(i) => (
              <div class="p-6 flex items-center justify-between hover:bg-surface transition-colors group">
                <div class="flex items-center gap-4">
                  <div class="h-10 w-10 rounded-xl bg-theme text-white flex items-center justify-center font-bold shadow-sm">
                    {i === 1 ? 'U' : i === 2 ? 'R' : 'S'}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-main">{t("dash.index.sysUpdate")} {i}</p>
                    <p class="text-xs text-muted mt-0.5">{t("dash.index.sysUpdateDesc")}</p>
                  </div>
                </div>
                <span class="text-xs font-medium text-muted">{i * 2}{t("dash.index.hAgo")}</span>
              </div>
            )}
          </For>
        </div>
      </Card>
    </div>
  );
}
