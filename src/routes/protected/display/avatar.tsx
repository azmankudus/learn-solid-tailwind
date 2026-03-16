import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Avatar } from '~/components/content/Avatar';
import { Icon } from '@iconify-icon/solid';
import { ICON_USER, ICON_SPARKLES, ICON_BOLT } from '~/lib/icons';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function AvatarPage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_USER} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Avatar</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Sizes & Status"
          icon={<Icon icon={ICON_SPARKLES} />}
          description="Avatars come in multiple sizes and can display an online status indicator."
          code={`
<Avatar 
  name="John Doe" 
  size="xl" 
  status="online" 
/>
          `}
        >
          <div class="flex flex-wrap items-end gap-6 p-8 rounded-2xl bg-surface/30 border border-white/5 backdrop-blur-md">
            <div class="flex flex-col items-center gap-2">
               <Avatar name="John Doe" size="xl" status="online" />
               <span class="text-[10px] font-bold uppercase tracking-wider text-theme">Extra Large</span>
            </div>
            <div class="flex flex-col items-center gap-2">
               <Avatar name="Jane Smith" size="lg" status="away" />
               <span class="text-[10px] font-bold uppercase tracking-wider text-amber-500">Large</span>
            </div>
            <div class="flex flex-col items-center gap-2">
               <Avatar name="Mike Ross" size="md" status="busy" />
               <span class="text-[10px] font-bold uppercase tracking-wider text-red-500">Medium</span>
            </div>
            <div class="flex flex-col items-center gap-2">
               <Avatar size="sm" status="offline" />
               <span class="text-[10px] font-bold uppercase tracking-wider text-muted">Small</span>
            </div>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Initials & Outlines"
          icon={<Icon icon={ICON_BOLT} />}
          description="Fallback to initials when no image is provided, and support for custom ring styles."
          code={`
<div class="flex gap-2">
  <Avatar name="Alex Johnson" size="lg" class="ring-2 ring-theme" />
</div>
          `}
        >
          <div class="flex gap-4">
            <Avatar name="Alex Johnson" size="lg" class="ring-2 ring-theme ring-offset-4 ring-offset-surface" />
            <Avatar name="Sarah Williams" size="lg" class="ring-2 ring-primary ring-offset-4 ring-offset-surface" />
            <Avatar name="Chris Brown" size="lg" class="ring-2 ring-success ring-offset-4 ring-offset-surface" />
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
