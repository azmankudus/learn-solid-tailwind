import { A } from "@solidjs/router";
import { HeadingText, Button, PageWrapper } from "~/components/Components";
import { t } from "~/lib/i18n";
import { HiSolidHome } from "solid-icons/hi";

export default function NotFound() {
  return (
    <PageWrapper class="min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
      <div class="text-center">
        <HeadingText level={1} class="text-8xl md:text-9xl mb-4 text-theme">
          404
        </HeadingText>
        <HeadingText level={2} class="text-3xl md:text-4xl mb-4">
          {t("error.title")}
        </HeadingText>
        <p class="text-muted text-lg mb-8 max-w-md mx-auto">
          {t("error.desc")}
        </p>
        <A href="/">
          <Button class="flex items-center gap-2 mx-auto">
            <HiSolidHome size={20} />
            {t("error.back")}
          </Button>
        </A>
      </div>
    </PageWrapper>
  );
}
