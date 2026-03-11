import { HeadingText } from "~/components/display/Heading";
import { Card } from "~/components/display/Card";
import { IconButton } from "~/components/input/Button";
import { HiSolidUsers } from "solid-icons/hi";
import { text } from "~/lib/i18n";

export default function Users() {
  return (
    <div class="flex flex-col space-y-6 pb-20">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <HiSolidUsers size={24} />
        </div>
        <HeadingText level={1} class="text-3xl sm:text-4xl">{text("dash.users.title")}</HeadingText>
      </div>

      <Card class="border-none shadow-sm">
        <div class="p-6 bg-surface/30 rounded-2xl border border-input-border/20">
          <p class="text-muted font-medium">{text("dash.users.desc")}</p>
        </div>
      </Card>

      {/* Test global scroll */}
      <div class="h-[800px] w-full flex flex-col items-center justify-center text-muted italic gap-4 opacity-30 select-none">
        <div class="h-0.5 w-full bg-input-border max-w-sm" />
        <span>Scrollable User List Area</span>
        <div class="h-0.5 w-full bg-input-border max-w-sm" />
      </div>
    </div>
  );
}
