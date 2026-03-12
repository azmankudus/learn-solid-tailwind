import { HeadingText } from "~/components/display/Heading";
import { Card } from "~/components/display/Card";
import { Icon } from "@iconify-icon/solid";
import { ICON_SHOPPING_BAG } from "~/lib/icons";
import { text } from "~/lib/i18n";
import { PageWrapper } from "~/components/layout/PageWrapper";

export default function Products() {
  return (
    <PageWrapper class="flex flex-col space-y-6 pb-20">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_SHOPPING_BAG} width={24} height={24} />
        </div>
        <HeadingText level={1} class="text-3xl sm:text-4xl">{text("dash.products.title")}</HeadingText>
      </div>

      <Card class="border-none shadow-sm">
        <div class="p-4 bg-surface/30 rounded-2xl border border-input-border/20 text-muted italic">
          {text("dash.products.desc")}
        </div>
      </Card>

      {/* Test global scroll */}
      <div class="h-[800px] w-full flex flex-col items-center justify-center text-muted italic gap-4 opacity-30 select-none">
        <div class="h-0.5 w-full bg-input-border max-w-sm" />
        <span>Scrollable Products Area</span>
        <div class="h-0.5 w-full bg-input-border max-w-sm" />
      </div>
    </PageWrapper>
  );
}
