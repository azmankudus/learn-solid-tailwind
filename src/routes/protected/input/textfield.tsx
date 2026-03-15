import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_DOCUMENT_TEXT, ICON_IDENTIFICATION, ICON_SPARKLES, ICON_EXCLAMATION_TRIANGLE } from '~/lib/icons';
import { TextField } from '~/components/input/TextField';

export default function TextFieldPage() {
  const [user, setUser] = createSignal("");
  const [pass, setPass] = createSignal("");
  const [email, setEmail] = createSignal("invalid-email");

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_DOCUMENT_TEXT} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">Text Fields</HeadingText>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Input */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <div class="flex items-center gap-2">
            <Icon icon={ICON_IDENTIFICATION} class="text-theme" />
            <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Standard Input</HeadingText>
          </div>
          <TextField 
            label="Username"
            placeholder="Enter your username"
            value={user()}
            onInput={setUser}
          />
          <p class="text-[10px] text-muted font-medium italic">Current Value: <span class="text-theme">{user() || "(empty)"}</span></p>
        </Card>

        {/* Password Input */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <div class="flex items-center gap-2">
            <Icon icon={ICON_SPARKLES} class="text-theme" />
            <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Secure Input</HeadingText>
          </div>
          <TextField 
            label="Password"
            type="password"
            placeholder="••••••••"
            value={pass()}
            onInput={setPass}
          />
        </Card>

        {/* Error State */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <div class="flex items-center gap-2">
            <Icon icon={ICON_EXCLAMATION_TRIANGLE} class="text-rose-500" />
            <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Validation State</HeadingText>
          </div>
          <TextField 
            label="Email Address"
            placeholder="john@example.com"
            value={email()}
            onInput={setEmail}
            error={!email().includes("@") ? "Please enter a valid email address." : undefined}
          />
        </Card>

        {/* Disabled State */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <div class="flex items-center gap-2">
            <Icon icon={ICON_DOCUMENT_TEXT} class="text-muted" />
            <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Disabled State</HeadingText>
          </div>
          <TextField 
            label="System ID (Read Only)"
            value="ADM-9920-X12"
            onInput={() => {}}
            placeholder="Cannot edit this"
            class="opacity-60 grayscale pointer-events-none"
          />
        </Card>
      </div>
    </PageWrapper>
  );
}
