import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_CUBE, ICON_BOLT } from '~/lib/icons';
import { Skeleton } from '~/components/content/Skeleton';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function SkeletonPage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_CUBE} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-black italic tracking-tighter uppercase">Perception Protocol</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Static Pulse"
          icon={<Icon icon={ICON_CUBE} />}
          description="Subtle opacity modulation for standard perceived performance during data fetching."
          code={`
<Skeleton height={20} width="60%" />
<Skeleton height={80} class="rounded-3xl" />
          `}
        >
          <div class="flex flex-col gap-4 w-full max-w-md">
             <Skeleton height={24} width="40%" />
             <Skeleton height={12} width="90%" />
             <Skeleton height={12} width="80%" />
             <Skeleton height={120} class="rounded-3xl" />
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Cinematic Shimmer"
          icon={<Icon icon={ICON_BOLT} />}
          description="High-frequency light sweep effect for premium, high-speed interface simulation."
          code={`
<Skeleton 
  variant="shimmer" 
  height={60} 
  circle={true} 
/>
          `}
        >
          <div class="flex items-center gap-6 w-full max-w-md p-6 bg-surface border border-input-border rounded-3xl">
             <Skeleton variant="shimmer" height={64} width={64} circle={true} />
             <div class="flex-1 flex flex-col gap-3">
                <Skeleton variant="shimmer" height={16} width="50%" />
                <Skeleton variant="shimmer" height={10} width="80%" />
             </div>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Node Sequences"
          icon={<Icon icon={ICON_CUBE} />}
          description="Batch skeleton generation for grid and list data structures."
          code={`
<Skeleton count={4} height={12} />
          `}
        >
          <div class="grid grid-cols-2 gap-4 w-full max-w-xl">
             <Skeleton count={3} height={100} class="rounded-2xl" />
             <Skeleton count={3} height={100} class="rounded-2xl" />
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
