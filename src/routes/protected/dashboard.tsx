import { For } from "solid-js";
import { HeadingText } from "~/components/content/Heading";
import { Card } from "~/components/content/Card";
import { Icon } from "@iconify-icon/solid";
import { ICON_CHART_BAR, ICON_USERS, ICON_SHOPPING_BAG, ICON_BOLT } from "~/lib/icons";
import { text } from "~/lib/i18n";
import { PageWrapper } from "~/components/layout/PageWrapper";

export default function DashboardOverview() {
  const stats = [
    { label: text("dash.stats.users"), value: "12,456", change: "+12%", icon: ICON_USERS },
    { label: text("dash.stats.revenue"), value: "$45,231", change: "+8%", icon: ICON_SHOPPING_BAG },
    { label: text("dash.stats.activeNow"), value: "847", change: "+24%", icon: ICON_BOLT },
  ];

  const recentActivities = [
    { user: "Sarah Johnson", action: "User registered", time: "2 min ago" },
    { user: "Michael Chen", action: "Product purchased", time: "15 min ago" },
    { user: "Emma Wilson", action: "Support ticket opened", time: "1 hour ago" },
  ];

  return (
    <PageWrapper class="flex flex-col space-y-6 pb-20">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_CHART_BAR} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">{text("dash.pageTitle")}</HeadingText>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <For each={stats}>
          {(stat) => (
            <Card hover={true} class="group">
              <div class="flex items-start justify-between mb-6">
                <div class="h-12 w-12 rounded-xl bg-surface/50 border-none flex items-center justify-center text-xl shadow-sm group-hover:bg-primary/5 transition-colors">
                  <Icon icon={stat.icon} width={24} height={24} />
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
                <span class="text-[10px] font-bold text-muted uppercase tracking-widest">70% Goal</span>
              </div>
            </Card>
          )}
        </For>
      </div>

      <Card class="border-none shadow-sm">
        <div class="mb-6 flex items-center justify-between">
          <HeadingText level={3} class="text-xl">{text("dash.recentActivity")}</HeadingText>
          <button class="text-xs font-bold text-theme hover:underline">{text("dash.viewAll")}</button>
        </div>
        <div class="space-y-1">
          <For each={recentActivities}>
            {(activity) => (
              <div class="flex items-center justify-between p-4 rounded-xl hover:bg-surface/50 transition-all border border-transparent hover:border-input-border/30">
                <div class="flex items-center gap-4">
                  <div class="h-10 w-10 rounded-full bg-theme/5 border-none flex items-center justify-center text-theme">
                    <Icon icon={ICON_USERS} width={18} height={18} />
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-main">{activity.user}</h4>
                    <p class="text-xs text-muted font-medium">{activity.action}</p>
                  </div>
                </div>
                <span class="text-xs font-medium text-muted/60 bg-surface px-2.5 py-1 rounded-lg">
                  {activity.time}
                </span>
              </div>
            )}
          </For>
        </div>
      </Card>

      {/* Test for long content to trigger root scroll */}
      <div class="h-96 w-full flex items-center justify-center border-none rounded-3xl bg-surface/30 text-muted italic">
        Scroll more to see the footer area...
      </div>
    </PageWrapper>
  );
}
