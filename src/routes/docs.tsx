import { For } from "solid-js";
import { HeadingText } from "~/components/content/Heading";
import { Card } from "~/components/content/Card";
import { PageWrapper } from "~/components/layout/PageWrapper";
import { Icon } from "@iconify-icon/solid";
import { ICON_ROCKET_LAUNCH, ICON_BOOK_OPEN, ICON_LIGHT_BULB, ICON_SHIELD_CHECK, ICON_ARROW_RIGHT } from "~/lib/icons";
import { text } from "~/lib/i18n";

export default function Docs() {
  const sections = () => [
    { title: text("docs.sec1.title"), desc: text("docs.sec1.desc"), icon: <Icon icon={ICON_ROCKET_LAUNCH} width={24} height={24} /> },
    { title: text("docs.sec2.title"), desc: text("docs.sec2.desc"), icon: <Icon icon={ICON_BOOK_OPEN} width={24} height={24} /> },
    { title: text("docs.sec3.title"), desc: text("docs.sec3.desc"), icon: <Icon icon={ICON_LIGHT_BULB} width={24} height={24} /> },
    { title: text("docs.sec4.title"), desc: text("docs.sec4.desc"), icon: <Icon icon={ICON_SHIELD_CHECK} width={24} height={24} /> },
  ];

  return (
    <PageWrapper class="relative min-h-[calc(100vh-64px)] pt-4 pb-24">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-theme rounded-full blur-[160px] opacity-10 pointer-events-none" />

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16 pt-6">
            <HeadingText level={1} class="text-5xl sm:text-6xl tracking-tight mb-6">
              {text("docs.title1")}<span class="text-theme">{text("docs.title2")}</span>
            </HeadingText>
            <p class="text-lg text-muted leading-relaxed font-medium max-w-2xl mx-auto">
              {text("docs.desc")}
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
                    <span>{text("docs.explore")}</span>
                    <Icon icon={ICON_ARROW_RIGHT} class="group-hover:translate-x-1 transition-transform" width={18} height={18} />
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
