import { For } from "solid-js";
import { HeadingText } from "~/components/display/Heading";
import { Card } from "~/components/display/Card";
import { Icon } from "@iconify-icon/solid";
import { ICON_DOCUMENT_CHART } from "~/lib/icons";
import { text } from "~/lib/i18n";

export default function ScrollingTest() {
  const dummyItems = Array.from({ length: 80 }, (_, i) => ({
    id: i + 1,
    title: `List Item #${i + 1}`,
    description: "Sample entry for vertical scrolling performance evaluation. This layout now triggers the browser root scrollbar instead of an inner-card scroll."
  }));

  return (
    <div class="flex flex-col space-y-6 pb-20">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_DOCUMENT_CHART} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">{text("menu.scrolling")}</HeadingText>
      </div>

      <Card class="p-0 overflow-hidden border-none shadow-sm" padding="p-0">
        <div class="divide-y divide-input-border/50 bg-surface/30">
          <For each={dummyItems}>
            {(item) => (
              <div class="p-8 hover:bg-surface/80 hover:backdrop-blur-xl transition-all duration-300 group cursor-default border-none">
                <div class="flex items-center space-x-6">
                  <div class="h-14 w-14 rounded-2xl bg-theme/5 flex items-center justify-center text-theme transition-all duration-500 group-hover:scale-110 group-hover:bg-theme group-hover:text-white shadow-sm">
                    <Icon icon={ICON_DOCUMENT_CHART} width={28} height={28} />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-base font-bold text-main mb-1.5 group-hover:text-theme transition-colors">{item.title}</h4>
                    <p class="text-sm text-muted font-medium opacity-80 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                    <div class="mt-4 flex items-center gap-6">
                      <div class="flex items-center gap-2">
                        <div class="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span class="text-[10px] font-bold uppercase tracking-widest text-muted">Active</span>
                      </div>
                      <div class="flex items-center gap-2 text-muted opacity-50">
                        <span class="text-[10px] font-bold tracking-widest text-muted">ID: {item.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </Card>

      {/* End of list marker */}
      <div class="py-12 flex justify-center opacity-20">
        <div class="h-1 w-24 bg-muted rounded-full" />
      </div>
    </div>
  );
}
