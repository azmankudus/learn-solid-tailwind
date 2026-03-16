import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_CREDIT_CARD, ICON_SPARKLES, ICON_SQUARE_3_STACK, ICON_BOLT } from '~/lib/icons';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function CardPage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_CREDIT_CARD} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Card</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Basic Cards"
          icon={<Icon icon={ICON_SQUARE_3_STACK} />}
          description="A flexible container for displaying content in a consistent box style."
          code={`
<Card class="max-w-md">
  <h3 class="text-xl font-bold mb-2">Project Overview</h3>
  <p class="text-muted text-sm leading-relaxed">
    This project is focused on building a modern UI library using SolidJS and Tailwind CSS.
  </p>
</Card>
          `}
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <div class="flex items-center space-x-3 mb-4">
                 <div class="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon icon={ICON_SPARKLES} />
                 </div>
                 <h3 class="font-bold">Latest Features</h3>
              </div>
              <p class="text-sm text-muted mb-4">We just added 5 new components to the library. Check them out in the sidebar.</p>
              <div class="h-1 w-full bg-border-theme/20 rounded-full overflow-hidden">
                <div class="h-full w-2/3 bg-primary" />
              </div>
            </Card>
            <Card themeTint={true}>
              <div class="flex items-center space-x-3 mb-4">
                 <div class="p-2 rounded-lg bg-theme/10 text-theme">
                    <Icon icon={ICON_BOLT} />
                 </div>
                 <h3 class="font-bold">Fast Performance</h3>
              </div>
              <p class="text-sm text-muted mb-4">Optimized for speed and accessibility using the latest web technologies.</p>
              <button class="px-4 py-1.5 rounded-lg bg-theme text-white text-xs font-bold uppercase">Learn More</button>
            </Card>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Card with Header"
          icon={<Icon icon={ICON_SQUARE_3_STACK} />}
          description="Cards can include headers with backgrounds or images."
          code={`
<Card padding="p-0">
  <div class="bg-theme h-32" />
  <div class="p-6">Content below header</div>
</Card>
          `}
        >
          <div class="max-w-lg">
            <Card padding="p-0">
              <div class="relative h-24 bg-gradient-to-r from-theme/20 to-primary/20 backdrop-blur-md flex items-center justify-center border-b border-white/5">
                <Icon icon={ICON_SPARKLES} width={40} class="text-theme" />
              </div>
              <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                   <div>
                      <h4 class="font-bold text-lg">User Profile</h4>
                      <p class="text-xs text-muted uppercase font-bold tracking-wider">Premium Account</p>
                   </div>
                   <div class="px-2 py-0.5 rounded text-[10px] font-bold bg-success/10 text-success border border-success/20">ACTIVE</div>
                </div>
                <p class="text-sm text-muted mb-4">View and manage your account settings, including security and notification preferences.</p>
                <div class="flex gap-2">
                   <div class="flex-1 px-3 py-2 rounded-xl bg-surface/50 border border-white/5 text-center">
                      <div class="text-[10px] text-muted uppercase font-bold">Followers</div>
                      <div class="font-bold text-theme">1.2k</div>
                   </div>
                   <div class="flex-1 px-3 py-2 rounded-xl bg-surface/50 border border-white/5 text-center">
                      <div class="text-[10px] text-muted uppercase font-bold">Posts</div>
                      <div class="font-bold text-primary">48</div>
                   </div>
                </div>
              </div>
            </Card>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
