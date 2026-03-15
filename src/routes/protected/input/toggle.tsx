import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_SWATCH, ICON_BOLT, ICON_CHAT_BUBBLE } from '~/lib/icons';
import { Toggle } from '~/components/input/Toggle';

export default function TogglePage() {
  const [active1, setActive1] = createSignal(true);
  const [active2, setActive2] = createSignal(false);
  const [active3, setActive3] = createSignal(false);

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_SWATCH} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">Toggles</HeadingText>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Toggle */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Simple Logic</HeadingText>
          <Toggle 
            label="Enable Night Mode"
            active={active1()}
            onToggle={() => setActive1(!active1())}
          />
          <p class="text-[10px] text-muted font-medium italic">Status: <span class={active1() ? "text-theme" : "text-rose-500"}>{active1() ? "ENABLED" : "DISABLED"}</span></p>
        </Card>

        {/* Toggle with Icon */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Feature Flags</HeadingText>
          <Toggle 
            label="Accelerated Graphics"
            icon={<Icon icon={ICON_BOLT} width={18} height={18} />}
            active={active2()}
            onToggle={() => setActive2(!active2())}
          />
        </Card>

        {/* Notif Toggle */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Communications</HeadingText>
          <Toggle 
            label="Push Notifications"
            icon={<Icon icon={ICON_CHAT_BUBBLE} width={18} height={18} />}
            active={active3()}
            onToggle={() => setActive3(!active3())}
          />
        </Card>
      </div>

      {/* Info Sections */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card class="p-8 border-none shadow-sm bg-theme/5 border border-theme/10">
          <HeadingText level={4} class="text-xs font-bold text-theme mb-2 uppercase">Best Practices</HeadingText>
          <ul class="text-xs text-muted space-y-2 list-disc ml-4">
            <li>Use toggles for settings that take effect immediately.</li>
            <li>Always provide a clear label explaining the state change.</li>
            <li>Maintain consistent visual feedback for active/inactive states.</li>
          </ul>
        </Card>
      </div>
    </PageWrapper>
  );
}
