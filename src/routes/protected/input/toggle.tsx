import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_BOLT, ICON_SUN, ICON_MOON, ICON_ENVELOPE, ICON_SHIELD_CHECK } from '~/lib/icons';
import { Toggle } from '~/components/input/Toggle';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function TogglePage() {
  const [active, setActive] = createSignal(true);
  const [notifications, setNotifications] = createSignal(true);
  const [darkMode, setDarkMode] = createSignal(false);

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_BOLT} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Toggle</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-12">
        <ComponentViewer 
          title="Row Style"
          icon={<Icon icon={active() ? ICON_SUN : ICON_MOON} />}
          description="A row-based toggle that includes a label and an icon."
          code={`
<Toggle 
  label="High Performance" 
  icon={<Icon icon={ICON_BOLT} />}
  active={active()} 
  onChange={setActive} 
/>
          `}
        >
          <Toggle 
            class="max-w-sm"
            label={active() ? "Enabled" : "Disabled"} 
            icon={<Icon icon={ICON_BOLT} />}
            active={active()} 
            onChange={setActive} 
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Basic Switch"
          icon={<Icon icon={ICON_ENVELOPE} />}
          description="A simple switch used inside other components or custom layouts."
          code={`
<div class="flex justify-between">
  <span>Allow Notifications</span>
  <Toggle 
    active={notifications()} 
    onChange={setNotifications} 
  />
</div>
          `}
        >
          <div class="flex items-center justify-between gap-8 p-4 bg-surface/50 rounded-2xl border border-input-border w-full max-w-sm">
            <span class="text-xs font-bold uppercase tracking-widest text-main">
              Push Notifications
            </span>
            <Toggle 
              active={notifications()} 
              onChange={setNotifications} 
            />
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
