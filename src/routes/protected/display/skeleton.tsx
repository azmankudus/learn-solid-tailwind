import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Skeleton } from '~/components/content/Skeleton';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_CUBE, ICON_SPARKLES, ICON_BOLT } from '~/lib/icons';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function SkeletonPage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_CUBE} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Skeleton</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Loading Placeholders"
          icon={<Icon icon={ICON_SPARKLES} />}
          description="Skeletons provide a preview of the content structure while data is being fetched."
          code={`
<Skeleton variant="shimmer" height={20} count={3} />
<Skeleton circle={true} width={48} height={48} />
          `}
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card class="bg-surface/30 border border-white/5 p-6">
               <div class="flex items-center gap-4 mb-6">
                  <Skeleton circle={true} width={56} height={56} variant="shimmer" />
                  <div class="flex-1 space-y-2">
                     <Skeleton width="60%" height={16} variant="shimmer" />
                     <Skeleton width="40%" height={12} variant="shimmer" />
                  </div>
               </div>
               <div class="space-y-4">
                  <Skeleton count={3} height={10} variant="shimmer" />
                  <Skeleton width="80%" height={10} variant="shimmer" />
               </div>
               <div class="mt-6 flex gap-2">
                  <Skeleton width={80} height={32} class="rounded-lg" variant="shimmer" />
                  <Skeleton width={80} height={32} class="rounded-lg" variant="shimmer" />
               </div>
            </Card>

            <div class="flex flex-col gap-4">
               <Card themeTint={true} padding="p-6">
                  <div class="flex items-center gap-3 mb-4">
                     <Icon icon={ICON_BOLT} class="text-theme" />
                     <h4 class="text-xs font-bold uppercase tracking-wider">Pulse Animation</h4>
                  </div>
                  <Skeleton variant="pulse" count={2} height={12} />
               </Card>
               <Card class="bg-surface/30 border border-white/5 p-6">
                  <div class="grid grid-cols-3 gap-2">
                     <Skeleton variant="shimmer" height={60} />
                     <Skeleton variant="shimmer" height={60} />
                     <Skeleton variant="shimmer" height={60} />
                  </div>
               </Card>
            </div>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
