import { For } from "solid-js";
import { HeadingText, Card, IconButton } from "~/components/Components";
import { HiSolidDocumentChartBar, HiSolidArrowDownTray, HiSolidArrowTopRightOnSquare } from "solid-icons/hi";
import { t } from "~/lib/i18n";

export default function Reports() {
  const reports = [
    { title: 'Annual Financial Report 2024', date: 'March 15, 2024', size: '2.4 MB', status: 'Ready' },
    { title: 'Quarterly User Growth Analysis', date: 'Feb 28, 2024', size: '1.8 MB', status: 'Ready' },
    { title: 'Marketing Campaign Performance', date: 'Jan 12, 2024', size: '4.2 MB', status: 'Processing' },
    { title: 'Infrastructure Security Audit', date: 'Dec 05, 2023', size: '3.1 MB', status: 'Ready' }
  ];

  return (
    <div class="flex flex-col space-y-6 pb-20">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-4">
        <div class="flex items-center gap-4">
          <div class="h-12 w-12 rounded-2xl bg-theme/10 text-theme flex items-center justify-center shadow-sm">
            <HiSolidDocumentChartBar size={28} />
          </div>
          <div>
            <HeadingText level={1} class="text-3xl sm:text-4xl">
              {t("dash.reports.title")}
            </HeadingText>
            <p class="text-sm text-muted mt-1">{t("dash.reports.desc")}</p>
          </div>
        </div>

        <button class="bg-theme text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20 border-none">
          {t("dash.reports.generate")}
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        <For each={reports}>
          {(report) => (
            <Card hover={true} class="relative group border-none shadow-sm">
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-4">
                  <div class="h-14 w-14 rounded-2xl bg-surface/50 flex items-center justify-center text-theme group-hover:bg-theme group-hover:text-white transition-all duration-300 shadow-sm">
                    <HiSolidDocumentChartBar size={32} />
                  </div>
                  <div>
                    <h4 class="text-base font-bold text-main mb-1 group-hover:text-theme transition-colors">{report.title}</h4>
                    <div class="flex items-center gap-3 text-xs text-muted font-medium opacity-80">
                      <span>{report.date}</span>
                      <span class="h-1 w-1 rounded-full bg-muted/30" />
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <IconButton tooltip={t("dash.reports.download")} class="hover:bg-theme/10 hover:text-theme border-none">
                    <HiSolidArrowDownTray size={18} />
                  </IconButton>
                  <IconButton tooltip={t("dash.reports.open")} class="hover:bg-theme/10 hover:text-theme border-none">
                    <HiSolidArrowTopRightOnSquare size={18} />
                  </IconButton>
                </div>
              </div>

              <div class="mt-6 pt-6 border-t border-input-border/50 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class={`h-2 w-2 rounded-full ${report.status === 'Ready' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                  <span class="text-[10px] font-bold uppercase tracking-wider text-muted">{report.status}</span>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-muted opacity-50">#REP-0921-X</span>
              </div>
            </Card>
          )}
        </For>
      </div>

      {/* Footer test */}
      <div class="h-96 w-full" />
    </div>
  );
}
