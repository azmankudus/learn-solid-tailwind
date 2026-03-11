import { HeadingText, Card } from "~/components/Components";
import { HiSolidShoppingBag } from "solid-icons/hi";
import { t } from "~/lib/i18n";

export default function Products() {
  return (
    <div class="flex flex-col space-y-6 pb-20">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <HiSolidShoppingBag size={24} />
        </div>
        <HeadingText level={1} class="text-3xl sm:text-4xl">{t("dash.products.title")}</HeadingText>
      </div>

      <Card class="border-none shadow-sm">
        <div class="p-4 bg-surface/30 rounded-2xl border border-input-border/20 text-muted italic">
          {t("dash.products.desc")}
        </div>
      </Card>

      {/* Test global scroll */}
      <div class="h-[800px] w-full flex flex-col items-center justify-center text-muted italic gap-4 opacity-30 select-none">
        <div class="h-0.5 w-full bg-input-border max-w-sm" />
        <span>Scrollable Products Area</span>
        <div class="h-0.5 w-full bg-input-border max-w-sm" />
      </div>
    </div>
  );
}
