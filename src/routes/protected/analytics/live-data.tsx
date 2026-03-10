import { For } from "solid-js";
import { HeadingText, Card } from "~/components/ThemeComponents";
import { t } from "~/lib/i18n";

export default function Analytics() {
  const bars = [40, 70, 45, 90, 65, 80, 50, 60, 100, 75, 85, 55];
  
  const regions = [
    { country: 'United States', val: 45 },
    { country: 'Germany', val: 22 },
    { country: 'United Kingdom', val: 18 },
    { country: 'France', val: 15 }
  ];

  const devices = [
    { device: 'Mobile', val: 55 },
    { device: 'Desktop', val: 35 },
    { device: 'Tablet', val: 8 },
    { device: 'Other', val: 2 }
  ];

  return (
    <div class="space-y-8 max-w-6xl mx-auto py-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <HeadingText level={1} class="text-3xl sm:text-4xl">
            Live Analytics
          </HeadingText>
        </div>
        
        <div class="flex items-center space-x-2 bg-surface/80 backdrop-blur-xl px-4 py-2 rounded-xl shadow-sm border-none">
          <div class="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span class="text-xs font-semibold text-main">Real-time Data</span>
        </div>
      </div>

      <Card hover={true} class="overflow-hidden">
        <div class="mb-10">
          <HeadingText level={2} class="text-xl mb-1">Traffic Overview</HeadingText>
          <p class="text-sm font-medium text-muted">{t("dash.liveData.desc")}</p>
        </div>
        
        <div class="h-64 flex items-end justify-between gap-2">
           <For each={bars}>
             {(h, i) => (
                <div class="flex-1 flex flex-col items-center group/bar min-w-[1.5rem]">
                  <div class="relative w-full h-full flex items-end bg-surface/50 rounded-md overflow-hidden border-none hover:bg-surface transition-colors shadow-inner">
                     <div 
                        class="w-full bg-theme transition-all duration-700 ease-out group-hover/bar:brightness-110 shadow-sm" 
                        style={{ 
                          height: `${h}%`,
                          "transition-delay": `${i() * 20}ms`
                        }}
                      />
                  </div>
                </div>
             )}
           </For>
        </div>
      </Card>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hover={true}>
          <HeadingText level={3} class="text-lg font-semibold mb-6">Top Regions</HeadingText>
          <div class="space-y-4">
            <For each={regions}>
              {(region) => (
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-main">{region.country}</span>
                  <span class="text-xs font-semibold text-theme bg-primary/5 px-2.5 py-1 rounded-full border-none">{region.val}%</span>
                </div>
              )}
            </For>
          </div>
        </Card>
        <Card hover={true}>
          <HeadingText level={3} class="text-lg font-semibold mb-6">Device Type</HeadingText>
          <div class="space-y-4">
            <For each={devices}>
              {(deviceStat) => (
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-main">{deviceStat.device}</span>
                  <span class="text-xs font-semibold text-theme bg-primary/5 px-2.5 py-1 rounded-full border-none">{deviceStat.val}%</span>
                </div>
              )}
            </For>
          </div>
        </Card>
      </div>
    </div>
  );
}
