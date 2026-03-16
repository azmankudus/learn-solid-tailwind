import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_SQUARE_3_STACK, ICON_CUBE, ICON_BOLT } from '~/lib/icons';
import { Grid } from '~/components/content/Grid';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function GridPage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_SQUARE_3_STACK} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-black italic tracking-tighter uppercase">Spatial Matrix</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Geometric Distribution"
          icon={<Icon icon={ICON_SQUARE_3_STACK} />}
          description="Fixed column layouts for predictable diagnostic dashboards."
          code={`
<Grid cols={3} gap={4}>
  <Card />
  <Card />
  <Card />
</Grid>
          `}
        >
          <Grid cols={3} gap={4} class="w-full">
             <For each={[1, 2, 3]}>
                {() => (
                  <div class="h-32 rounded-3xl bg-input border-2 border-input-border flex items-center justify-center text-[10px] font-black uppercase text-muted">
                    Static Node
                  </div>
                )}
             </For>
          </Grid>
        </ComponentViewer>

        <ComponentViewer 
          title="Adaptive Resolution"
          icon={<Icon icon={ICON_BOLT} />}
          description="Responsive matrix that scales column density based on viewport clearance."
          code={`
<Grid responsive={true} gap={6}>
  ...
</Grid>
          `}
        >
          <Grid responsive={true} gap={6} class="w-full">
             <For each={[1, 2, 3, 4]}>
                {() => (
                  <div class="h-32 rounded-3xl bg-theme/5 border-2 border-theme/20 flex flex-col items-center justify-center gap-2 group hover:bg-theme/10 transition-colors">
                    <Icon icon={ICON_CUBE} class="text-theme group-hover:scale-110 transition-transform" />
                    <span class="text-[10px] font-black uppercase">Adaptive Cluster</span>
                  </div>
                )}
             </For>
          </Grid>
        </ComponentViewer>

        <ComponentViewer 
          title="Scalar Control"
          icon={<Icon icon={ICON_CUBE} />}
          description="High-resolution 12-column grid system for granular layout control."
          code={`
<Grid cols={12} gap={2}>
  <div class="col-span-8" />
  <div class="col-span-4" />
</Grid>
          `}
        >
          <Grid cols={12} gap={2} class="w-full">
             <div class="col-span-8 h-20 bg-input border border-input-border rounded-xl flex items-center justify-center text-[9px] font-bold uppercase">Span 8</div>
             <div class="col-span-4 h-20 bg-theme border border-theme/20 rounded-xl flex items-center justify-center text-[9px] font-bold uppercase text-white shadow-lg">Span 4</div>
             <div class="col-span-12 h-10 bg-input/50 border border-input-border/30 rounded-xl flex items-center justify-center text-[8px] font-bold uppercase tracking-widest">Span 12 Interface</div>
          </Grid>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}

import { For } from 'solid-js';
import { Card } from '~/components/content/Card';
