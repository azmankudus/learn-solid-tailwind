import { For } from "solid-js";
import { HeadingText } from "~/components/display/Heading";
import { Icon } from "@iconify-icon/solid";
import { ICON_CUBE } from "~/lib/icons";
import { text } from "~/lib/i18n";
import { PageWrapper } from "~/components/layout/PageWrapper";

export default function GridScrollingTest() {
  const dummyItems = Array.from({ length: 80 }, (_, i) => ({
    id: i + 1,
    title: `Grid Item #${i + 1}`,
    description: "Detailed grid component visualization. This layout uses the browser root scrollbar to manage vertical overflow of multiple distinct cards."
  }));

  return (
    <PageWrapper class="flex flex-col space-y-6 pb-32">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_CUBE} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">{text("menu.gridScrolling")}</HeadingText>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <For each={dummyItems}>
          {(item) => (
            <div class="group p-8 rounded-2xl bg-surface/80 backdrop-blur-xl border border-input-border shadow-sm hover:border-theme/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div class="h-14 w-14 rounded-2xl bg-theme/10 flex items-center justify-center text-theme mb-6 group-hover:scale-110 group-hover:bg-theme group-hover:text-white transition-all duration-300 shadow-sm">
                <Icon icon={ICON_CUBE} width={28} height={28} />
              </div>
              <h4 class="text-sm font-bold text-main mb-3">{item.title}</h4>
              <p class="text-xs text-muted leading-relaxed opacity-80">
                {item.description}
              </p>
              <div class="mt-6 pt-6 border-t border-input-border/50 flex flex-col gap-3">
                <div class="flex justify-between items-center text-[10px] font-bold text-muted uppercase tracking-widest">
                  <span>Performance</span>
                  <span class="text-theme">60 FPS</span>
                </div>
                <div class="h-2 w-full bg-accent-muted rounded-full overflow-hidden">
                  <div class="h-full bg-theme rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] transition-all duration-1000" style={{ width: `${70 + Math.random() * 30}%` }} />
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </PageWrapper>
  );
}

