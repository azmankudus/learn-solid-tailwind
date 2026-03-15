import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_DOCUMENT_TEXT } from '~/lib/icons';
import { TextField } from '~/components/input/TextField';
import { ComponentViewer } from '~/components/content/ComponentViewer';

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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <ComponentViewer 
          title="Standard Input"
          code={`
<TextField 
  label="Username"
  placeholder="Enter your username"
  value={user()}
  onInput={setUser}
/>
          `}
        >
          <TextField 
            label="Username"
            placeholder="Enter your username"
            value={user()}
            onInput={setUser}
            class="w-full"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Secure Input"
          code={`
<TextField 
  label="Password"
  type="password"
  placeholder="••••••••"
  value={pass()}
  onInput={setPass}
/>
          `}
        >
          <TextField 
            label="Password"
            type="password"
            placeholder="••••••••"
            value={pass()}
            onInput={setPass}
            class="w-full"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Validation State"
          code={`
<TextField 
  label="Email Address"
  placeholder="john@example.com"
  value={email()}
  onInput={setEmail}
  error={!email().includes("@") ? "Invalid email" : undefined}
/>
          `}
        >
          <TextField 
            label="Email Address"
            placeholder="john@example.com"
            value={email()}
            onInput={setEmail}
            error={!email().includes("@") ? "Please enter a valid email address." : undefined}
            class="w-full"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Disabled State"
          code={`
<TextField 
  label="System ID"
  value="ADM-9920-X12"
  disabled={true}
/>
          `}
        >
          <TextField 
            label="System ID (Read Only)"
            value="ADM-9920-X12"
            onInput={() => {}}
            placeholder="Cannot edit this"
            class="opacity-60 grayscale pointer-events-none w-full"
          />
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
