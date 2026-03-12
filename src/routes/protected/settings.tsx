import { HeadingText } from "~/components/display/Heading";
import { Card } from "~/components/display/Card";
import { Icon } from "@iconify-icon/solid";
import { ICON_COG } from "~/lib/icons";
import { text } from "~/lib/i18n";
import { Title } from "@solidjs/meta";
import { PageWrapper } from "~/components/layout/PageWrapper";

export default function Settings() {
  return (
    <PageWrapper class="flex flex-col space-y-6 pb-20">
      <Title>{text("dash.settings.title")} | UI-DEN</Title>
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_COG} width={24} height={24} />
        </div>
        <HeadingText level={1} class="text-3xl sm:text-4xl">{text("dash.settings.title")}</HeadingText>
      </div>

      <Card class="border-none shadow-sm">
        <div class="p-6 bg-surface/30 rounded-2xl border border-input-border/20">
          <p class="text-muted font-medium">{text("dash.settings.desc")}</p>
        </div>
      </Card>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card class="p-6">
          <h4 class="text-sm font-bold text-main mb-4">Notification Settings</h4>
          <div class="space-y-4">
            {['Email Notifications', 'Push Notifications', 'Weekly Summary'].map(label => (
              <div class="flex items-center justify-between">
                <span class="text-sm text-muted">{label}</span>
                <div class="h-6 w-11 rounded-full bg-theme p-1 relative">
                  <div class="h-4 w-4 rounded-full bg-white absolute right-1" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card class="p-6">
          <h4 class="text-sm font-bold text-main mb-4">Security Preferences</h4>
          <div class="space-y-4">
            {['Two-Factor Auth', 'Login Alerts', 'API Access'].map(label => (
              <div class="flex items-center justify-between">
                <span class="text-sm text-muted">{label}</span>
                <div class="h-6 w-11 rounded-full bg-black/10 p-1 relative">
                  <div class="h-4 w-4 rounded-full bg-white absolute left-1" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
