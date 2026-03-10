import { For } from "solid-js";
import { HeadingText, Card, PageWrapper } from "~/components/ThemeComponents";
import { HiSolidRocketLaunch, HiSolidBookOpen, HiSolidLightBulb, HiSolidShieldCheck, HiSolidArrowSmallRight } from "solid-icons/hi";
import { t } from "~/lib/i18n";

export default function Docs() {
  const sections = () => [
    { title: t("docs.sec1.title"), desc: t("docs.sec1.desc"), icon: <HiSolidRocketLaunch size={24} /> },
    { title: t("docs.sec2.title"), desc: t("docs.sec2.desc"), icon: <HiSolidBookOpen size={24} /> },
    { title: t("docs.sec3.title"), desc: t("docs.sec3.desc"), icon: <HiSolidLightBulb size={24} /> },
    { title: t("docs.sec4.title"), desc: t("docs.sec4.desc"), icon: <HiSolidShieldCheck size={24} /> },
  ];

  return (
    <PageWrapper class="relative min-h-[calc(100vh-64px)] pt-12 pb-24">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-theme rounded-full blur-[160px] opacity-10 pointer-events-none" />
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <span class="bg-primary/5 text-theme-solid px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 inline-block border-none shadow-sm relative overflow-hidden">
              <div class="absolute inset-0 bg-theme/10 blur-xl pointer-events-none" />
              <span class="relative z-10">{t("docs.badge")}</span>
            </span>
            <HeadingText level={1} class="text-5xl sm:text-6xl tracking-tight mb-6">
              {t("docs.title1")}<span class="text-theme">{t("docs.title2")}</span>
            </HeadingText>
            <p class="text-lg text-muted leading-relaxed font-medium max-w-2xl mx-auto">
              {t("docs.desc")}
            </p>
          </div>
          
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <For each={sections()}>
              {(section) => (
                <Card hover={true} class="group p-6">
                  <div class="h-12 w-12 rounded-xl bg-surface border-none flex items-center justify-center mb-6 text-2xl group-hover:scale-105 transition-all duration-300 shadow-sm group-hover:bg-primary/5">
                    {section.icon}
                  </div>
                  <h3 class="text-xl font-bold text-main mb-3">{section.title}</h3>
                  <p class="text-muted text-sm font-medium leading-relaxed mb-6">{section.desc}</p>
                  
                  <div class="pt-5 border-none flex items-center gap-2 text-theme-solid text-sm font-semibold group/link cursor-pointer">
                    <span>{t("docs.explore")}</span>
                    <HiSolidArrowSmallRight class="group-hover:translate-x-1 transition-transform" size={18} />
                  </div>
                </Card>
              )}
            </For>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
