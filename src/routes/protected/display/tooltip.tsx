import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Tooltip } from '~/components/content/Tooltip';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_CHAT_BUBBLE, ICON_SPARKLES, ICON_BOLT, ICON_INFORMATION_CIRCLE } from '~/lib/icons';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function TooltipPage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_CHAT_BUBBLE} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Tooltip</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Directional Tooltips"
          icon={<Icon icon={ICON_SPARKLES} />}
          description="Position the tooltip relative to the target element."
          code={`
<Tooltip text="Tooltip on Top" position="top">
  <button>Hover Me</button>
</Tooltip>
          `}
        >
          <div class="flex flex-col gap-10">
            <div class="flex flex-wrap items-center gap-12 p-8 rounded-2xl bg-surface/30 border border-white/5">
              <Tooltip text="Tooltip on Top" position="top">
                <div class="h-12 w-12 rounded-xl bg-theme/10 text-theme flex items-center justify-center cursor-help ring-1 ring-theme/20">
                  <Icon icon={ICON_SPARKLES} width={24} />
                </div>
              </Tooltip>

              <Tooltip text="Tooltip on Bottom" position="bottom">
                <div class="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center cursor-help ring-1 ring-primary/20">
                  <Icon icon={ICON_BOLT} width={24} />
                </div>
              </Tooltip>

              <Tooltip text="Tooltip on Right" position="right">
                <div class="h-12 w-12 rounded-xl bg-success/10 text-success flex items-center justify-center cursor-help ring-1 ring-success/20">
                   <div class="font-bold text-lg">R</div>
                </div>
              </Tooltip>

              <Tooltip text="Tooltip on Left" position="left">
                <div class="h-12 w-12 rounded-xl bg-error/10 text-error flex items-center justify-center cursor-help ring-1 ring-error/20">
                   <div class="font-bold text-lg">L</div>
                </div>
              </Tooltip>
            </div>

            <Card class="max-w-md">
               <div class="flex items-center justify-between mb-4">
                  <h4 class="font-bold text-main">Example Usage</h4>
                  <Tooltip text="Helpful information here." position="top">
                     <Icon icon={ICON_INFORMATION_CIRCLE} class="text-muted hover:text-theme transition-colors cursor-help" />
                  </Tooltip>
               </div>
               <p class="text-sm text-muted">Hover over the status tags below to see more details about each item.</p>
               <div class="flex gap-2 mt-4">
                  <Tooltip text="Last updated 5 mins ago" position="top">
                    <div class="px-2 py-1 rounded bg-success/10 text-success text-[10px] font-bold cursor-help">UPDATED</div>
                  </Tooltip>
                  <Tooltip text="Click to view details" position="top">
                    <div class="px-2 py-1 rounded bg-theme/10 text-theme text-[10px] font-bold cursor-help">DETAILS</div>
                  </Tooltip>
               </div>
            </Card>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
