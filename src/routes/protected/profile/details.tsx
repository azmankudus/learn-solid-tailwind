import { createSignal } from "solid-js";
import { HeadingText, Card, TextField, Button } from "~/components/Components";
import { HiSolidIdentification } from "solid-icons/hi";
import { t } from "~/lib/i18n";

export default function ProfileDetails() {
  const [firstName, setFirstName] = createSignal("Admin");
  const [lastName, setLastName] = createSignal("User");
  const [email, setEmail] = createSignal("admin@ui-den.dev");
  const [role, setRole] = createSignal("Administrator");

  const handleUpdate = () => {
    // Dummy update logic
    alert(t("profile.success"));
  };

  return (
    <div class="flex flex-col space-y-6 pb-20">
      <div class="flex items-center space-x-3 mb-4  ">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <HiSolidIdentification size={24} />
        </div>
        <HeadingText level={2} class="text-3xl">{t("profile.title")}</HeadingText>
      </div>

      <Card class="p-8 border-none shadow-sm">
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              label={t("profile.firstName")}
              value={firstName()}
              onInput={setFirstName}
              placeholder="Enter first name"
            />
            <TextField
              label={t("profile.lastName")}
              value={lastName()}
              onInput={setLastName}
              placeholder="Enter last name"
            />
          </div>
          <TextField
            type="email"
            label={t("profile.email")}
            value={email()}
            onInput={setEmail}
            placeholder="Enter email address"
          />
          <TextField
            label={t("profile.role")}
            value={role()}
            onInput={() => { }}
            class="opacity-70 pointer-events-none"
          />
          <div class="pt-4 border-t border-black/5 flex justify-end">
            <Button onClick={handleUpdate} class="px-8 py-2.5">
              {t("profile.update")}
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
    </div>
  );
}
