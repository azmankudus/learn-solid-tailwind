import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_SHIELD_CHECK, ICON_LOCK_CLOSED, ICON_BOLT } from '~/lib/icons';
import { PinField } from '~/components/input/PinField';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function PinPage() {
  const [pin1, setPin1] = createSignal("");
  const [pin2, setPin2] = createSignal("123456");
  const [pin3, setPin3] = createSignal("");

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_SHIELD_CHECK} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">PIN Field</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Basic PIN"
          icon={<Icon icon={ICON_LOCK_CLOSED} />}
          description="A set of input boxes for entering a 4-digit or 6-digit numeric code."
          code={`
<PinField 
  label="Security Code"
  value={pin()} 
  onChange={setPin} 
  length={4}
/>
          `}
        >
          <PinField 
            label="Verification Code (4 Digits)"
            value={pin1()} 
            onChange={setPin1} 
            length={4}
            class="max-w-sm"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Masked Input"
          icon={<Icon icon={ICON_SHIELD_CHECK} />}
          description="Hide the characters for enhanced security, useful for passwords or bank PINs."
          code={`
<PinField 
  label="Password"
  value={pin()} 
  onChange={setPin} 
  mask={true}
  length={6}
/>
          `}
        >
          <PinField 
            label="Secure Entry (6 Digits)"
            value={pin2()} 
            onChange={setPin2} 
            mask={true}
            length={6}
            class="max-w-sm"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Disabled State"
          icon={<Icon icon={ICON_BOLT} />}
          description="Prevent user input when the field is not ready or locked."
          code={`
<PinField 
  label="Access Code"
  value="" 
  disabled={true}
/>
          `}
        >
          <PinField 
            label="Locked Field"
            value={pin3()} 
            onChange={setPin3} 
            disabled={true}
            length={4}
            class="max-w-sm"
          />
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
