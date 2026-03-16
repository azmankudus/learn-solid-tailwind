import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_USER, ICON_BOLT } from '~/lib/icons';
import { Avatar } from '~/components/content/Avatar';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function AvatarPage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_USER} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-black italic tracking-tighter uppercase">Identity Protocol</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Digital Profiles"
          icon={<Icon icon={ICON_USER} />}
          description="High-fidelity user identity markers with real-time status synchronization."
          code={`
<Avatar 
  name="Operator Alpha" 
  status="online" 
  size="lg" 
/>
<Avatar 
  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" 
  status="busy" 
/>
          `}
        >
          <div class="flex items-end gap-6">
             <Avatar name="Operator Alpha" status="online" size="xl" />
             <Avatar name="Beta User" status="away" size="lg" />
             <Avatar name="Gamma Dev" status="busy" size="md" />
             <Avatar name="Delta" status="offline" size="sm" />
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Image Payloads"
          icon={<Icon icon={ICON_BOLT} />}
          description="Geometric rounding and layered shadows for premium visual depth."
          code={`
<Avatar 
  src="..." 
  name="Admin 01" 
  size="xl" 
/>
          `}
        >
          <div class="flex items-center gap-4">
            <Avatar 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" 
              size="lg" 
              name="Admin Principal"
            />
            <Avatar 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
              size="lg" 
              name="Security Core"
              status="online"
            />
            <div class="flex flex-col ml-2">
               <span class="text-sm font-black text-main">Principal Security Lead</span>
               <span class="text-[10px] font-bold text-theme uppercase tracking-widest">Authorized Access</span>
            </div>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Initial Fallbacks"
          icon={<Icon icon={ICON_USER} />}
          description="Algorithmic initial generation for placeholder identities."
          code={`
<Avatar name="John Doe" size="md" />
<Avatar size="md" />
          `}
        >
          <div class="flex items-center gap-4">
             <Avatar name="Solid Team" size="md" />
             <Avatar name="Alex Smith" size="md" />
             <Avatar name="Design Ops" size="md" />
             <Avatar size="md" />
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
