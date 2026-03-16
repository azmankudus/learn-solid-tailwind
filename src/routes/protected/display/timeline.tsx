import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Timeline } from '~/components/content/Timeline';
import { Icon } from '@iconify-icon/solid';
import { ICON_CLOCK, ICON_SPARKLES, ICON_BOLT, ICON_SHIELD_CHECK, ICON_CHECK_CIRCLE } from '~/lib/icons';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function TimelinePage() {
  const historyItems = [
    {
      title: "Account Created",
      time: "2 HOURS AGO",
      description: "You have successfully created a new account and verified your email address.",
      icon: ICON_SPARKLES,
      status: "primary" as const
    },
    {
      title: "Profile Updated",
      time: "1 HOUR AGO",
      description: "Changed profile picture and updated contact information.",
      icon: ICON_CHECK_CIRCLE,
      status: "success" as const
    },
    {
      title: "Security Alert",
      time: "30 MINS AGO",
      description: "A new login was detected from an unknown device. Please review your security settings.",
      icon: ICON_SHIELD_CHECK,
      status: "error" as const,
      content: (
        <div class="space-y-2">
           <div class="flex justify-between text-[10px] uppercase font-bold text-error">
              <span>Risk Level</span>
              <span>High</span>
           </div>
           <div class="h-1.5 w-full bg-error/20 rounded-full overflow-hidden">
              <div class="h-full w-full bg-error" />
           </div>
        </div>
      )
    },
    {
      title: "Session Active",
      time: "NOW",
      description: "Currently logged in from your primary device.",
      icon: ICON_BOLT,
      status: "success" as const
    }
  ];

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_CLOCK} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Timeline</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Activity Timeline"
          icon={<Icon icon={ICON_SPARKLES} />}
          description="A chronological list of events or activities."
          code={`
<Timeline items={historyItems} />
          `}
        >
          <div class="max-w-xl p-8 rounded-2xl bg-surface/30 border border-white/5 backdrop-blur-md">
            <Timeline items={historyItems} />
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
