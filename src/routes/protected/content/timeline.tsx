import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_CLOCK, ICON_ROCKET_LAUNCH, ICON_SHIELD_CHECK, ICON_BOLT } from '~/lib/icons';
import { Timeline } from '~/components/content/Timeline';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function TimelinePage() {
  const events = [
    {
      title: "System Initialization",
      time: "08:00 AM",
      description: "Core modules loaded and established neural connection with local host.",
      icon: ICON_BOLT,
      status: "primary" as const
    },
    {
      title: "Security Uplink",
      time: "10:30 AM",
      description: "Established encrypted tunnel via AES-256 protocols. Authorized personnel verified.",
      icon: ICON_SHIELD_CHECK,
      status: "success" as const
    },
    {
      title: "Atmospheric Breach",
      time: "02:15 PM",
      description: "Unauthorized data ingress detected in sector 7G. Initiating lockdown.",
      icon: ICON_ROCKET_LAUNCH,
      status: "error" as const
    }
  ];

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_CLOCK} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-black italic tracking-tighter uppercase">Audit Protocol</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Sequential Events"
          icon={<Icon icon={ICON_CLOCK} />}
          description="Cinematic event sequencing for tracking system progress and historical logs."
          code={`
<Timeline items={events} />
          `}
        >
          <Timeline items={events} class="max-w-xl pr-10" />
        </ComponentViewer>

        <ComponentViewer 
          title="Localized Diagnostics"
          icon={<Icon icon={ICON_BOLT} />}
          description="Support for nested custom content blocks and status-aware iconography."
          code={`
<Timeline 
  items={[
    { 
      title: "Payload Summary", 
      time: "LIVE", 
      content: <code>...</code> 
    }
  ]} 
/>
          `}
        >
          <Timeline 
            items={[
              ...events,
              {
                title: "Diagnostic Payload",
                time: "LIVE",
                description: "Live monitoring of decentralized storage nodes.",
                status: "warning",
                content: (
                  <div class="grid grid-cols-2 gap-4">
                     <div class="flex flex-col">
                        <span class="text-[8px] uppercase tracking-widest text-muted">Node ID</span>
                        <span class="font-mono text-main">NX-90521</span>
                     </div>
                     <div class="flex flex-col">
                        <span class="text-[8px] uppercase tracking-widest text-muted">Load Status</span>
                        <span class="font-mono text-amber-500">84.2%</span>
                     </div>
                  </div>
                )
              }
            ]} 
            class="max-w-xl pr-10"
          />
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
