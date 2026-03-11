import { For } from "solid-js";
import { HeadingText, Card, PageWrapper } from "~/components/Components";
import { HiSolidChatBubbleLeftRight, HiSolidEnvelope, HiSolidGlobeAlt, HiSolidShieldCheck, HiSolidChevronRight } from "solid-icons/hi";
import { text } from "~/lib/i18n";

export default function Help() {
  const channels = () => [
    { name: text("help.sec1.title"), desc: text("help.sec1.desc"), icon: <HiSolidChatBubbleLeftRight size={24} /> },
    { name: text("help.sec2.title"), desc: text("help.sec2.desc"), icon: <HiSolidEnvelope size={24} /> },
    { name: text("help.sec3.title"), desc: text("help.sec3.desc"), icon: <HiSolidGlobeAlt size={24} /> },
    { name: text("help.sec4.title"), desc: text("help.sec4.desc"), icon: <HiSolidShieldCheck size={24} /> },
  ];

  return (
    <PageWrapper class="relative min-h-[calc(100vh-64px)] pt-4 pb-24">
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-theme rounded-full blur-[160px] opacity-10 pointer-events-none" />

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16 max-w-3xl mx-auto pt-6">
            <HeadingText level={1} class="text-5xl sm:text-6xl tracking-tight mb-6">
              {text("help.title1")}<span class="text-theme">{text("help.title2")}</span>{text("help.title3")}
            </HeadingText>
            <p class="text-lg text-muted leading-relaxed font-medium">
              {text("help.desc")}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <For each={channels()}>
              {(channel) => (
                <Card hover={true} class="group p-5 flex flex-col justify-between min-h-[240px]">
                  <div>
                    <div class="mb-6 h-12 w-12 rounded-xl bg-surface border-none flex items-center justify-center group-hover:scale-105 group-hover:bg-primary/5 transition-all duration-300 text-2xl shadow-sm">
                      {channel.icon}
                    </div>
                    <h4 class="text-lg font-bold text-main mb-2 tracking-tight">
                      {channel.name}
                    </h4>
                    <p class="text-sm text-muted font-medium leading-relaxed">
                      {channel.desc}
                    </p>
                  </div>

                  <div class="mt-8 h-8 w-8 rounded-full bg-surface border-none shadow-sm flex items-center justify-center text-muted group-hover:bg-primary/5 group-hover:text-theme transition-all cursor-pointer">
                    <HiSolidChevronRight size={18} />
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
