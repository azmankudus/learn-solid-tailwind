import { A } from "@solidjs/router";
import { HeadingText } from "~/components/content/Heading";
import { Button } from "~/components/input/Button";
import { PageWrapper } from "~/components/layout/PageWrapper";
import { text } from "~/lib/i18n";
import { Icon } from "@iconify-icon/solid";
import { ICON_HOME } from "~/lib/icons";

export default function NotFound() {
  return (
    <PageWrapper class="min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
      <div class="text-center">
        <HeadingText level={1} class="text-8xl md:text-9xl mb-4 text-theme">
          404
        </HeadingText>
        <HeadingText level={2} class="text-3xl md:text-4xl mb-4">
          {text("error.title")}
        </HeadingText>
        <p class="text-muted text-lg mb-8 max-w-md mx-auto">
          {text("error.desc")}
        </p>
        <A href="/">
          <Button class="flex items-center gap-2 mx-auto">
            <Icon icon={ICON_HOME} width={20} height={20} />
            {text("error.back")}
          </Button>
        </A>
      </div>
    </PageWrapper>
  );
}
