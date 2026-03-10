import { HeadingText, Card } from "~/components/ThemeComponents";
import { t } from "~/lib/i18n";

export default function Products() {
  return (
    <div class="space-y-8 max-w-6xl mx-auto py-8">
      <HeadingText level={1} class="text-3xl sm:text-4xl">{t("dash.products.title")}</HeadingText>
      <Card>
        <p class="text-muted">{t("dash.products.desc")}</p>
      </Card>
    </div>
  );
}
