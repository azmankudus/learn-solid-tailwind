import { createSignal } from "solid-js";
import { HeadingText } from "~/components/content/Heading";
import { Card } from "~/components/content/Card";
import { TextField } from "~/components/input/TextField";
import { Button } from "~/components/input/Button";
import { Icon } from "@iconify-icon/solid";
import { ICON_IDENTIFICATION } from "~/lib/icons";
import { text } from "~/lib/i18n";
import { PageWrapper } from "~/components/layout/PageWrapper";

export default function ProfileDetails() {
  const [firstName, setFirstName] = createSignal("Admin");
  const [lastName, setLastName] = createSignal("User");
  const [email, setEmail] = createSignal("admin@ui-den.dev");
  const [role, setRole] = createSignal("Administrator");

  const handleUpdate = () => {
    // Dummy update logic
    alert(text("profile.success"));
  };

  return (
    <PageWrapper class="flex flex-col space-y-6 pb-20">
      <div class="flex items-center space-x-3 mb-4  ">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_IDENTIFICATION} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">{text("profile.title")}</HeadingText>
      </div>

      <Card class="p-8 border-none shadow-sm">
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              label={text("profile.firstName")}
              value={firstName()}
              onInput={setFirstName}
              placeholder="Enter first name"
            />
            <TextField
              label={text("profile.lastName")}
              value={lastName()}
              onInput={setLastName}
              placeholder="Enter last name"
            />
          </div>
          <TextField
            type="email"
            label={text("profile.email")}
            value={email()}
            onInput={setEmail}
            placeholder="Enter email address"
          />
          <TextField
            label={text("profile.role")}
            value={role()}
            onInput={() => { }}
            class="opacity-70 pointer-events-none"
          />
          <div class="pt-4 border-t border-black/5 flex justify-end">
            <Button onClick={handleUpdate} class="px-8 py-2.5">
              {text("profile.update")}
            </Button>
          </div>
        </div>
      </Card>

      {/* Test global scroll */}
      <div class="h-[800px] w-full flex flex-col items-center justify-center text-muted italic gap-4 opacity-50 select-none">
        <div class="h-0.5 w-full bg-input-border max-w-sm" />
        <span>Root Scroll Implementation Test</span>
        <div class="h-0.5 w-full bg-input-border max-w-sm" />
      </div>
    </PageWrapper>
  );
}
