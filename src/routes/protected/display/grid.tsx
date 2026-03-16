import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Grid } from '~/components/content/Grid';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_SQUARE_3_STACK, ICON_VIEW_COLUMNS, ICON_SPARKLES } from '~/lib/icons';
import { ComponentViewer } from '~/components/content/ComponentViewer';
import { For } from 'solid-js';

export default function GridPage() {
  const items = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Feature ${i + 1}`,
    value: Math.floor(Math.random() * 100)
  }));

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_SQUARE_3_STACK} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Grid</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Responsive Grid"
          icon={<Icon icon={ICON_VIEW_COLUMNS} />}
          description="A grid that automatically adjusts the number of columns based on the screen size."
          code={`
<Grid responsive={true} gap={6}>
  <For each={items}>
    {(item) => (
      <Card>
        <h4>{item.title}</h4>
      </Card>
    )}
  </For>
</Grid>
          `}
        >
          <Grid responsive={true} gap={6}>
            <For each={items}>
              {(item) => (
                <Card themeTint={true} class="border-theme/10">
                  <div class="flex justify-between items-center mb-4">
                     <div class="h-8 w-8 rounded-lg bg-theme/20 flex items-center justify-center text-theme">
                        <Icon icon={ICON_SPARKLES} />
                     </div>
                     <span class="text-[10px] font-bold text-muted uppercase">ID-{item.id}</span>
                  </div>
                  <h4 class="font-bold text-sm mb-1">{item.title}</h4>
                  <div class="flex items-baseline gap-2">
                     <span class="text-2xl font-bold text-theme">{item.value}</span>
                     <span class="text-[10px] font-bold text-muted uppercase">Users</span>
                  </div>
                </Card>
              )}
            </For>
          </Grid>
        </ComponentViewer>

        <ComponentViewer 
          title="Fixed Columns"
          icon={<Icon icon={ICON_SQUARE_3_STACK} />}
          description="Define a specific number of columns for the grid layout."
          code={`
<Grid cols={2} gap={4}>
  <Card>Left Column</Card>
  <Card>Right Column</Card>
</Grid>
          `}
        >
          <div class="space-y-4">
            <Grid cols={2} gap={4}>
              <Card class="bg-primary/5 border-primary/20">
                 <div class="text-xs font-bold uppercase text-primary mb-2">Storage Usage</div>
                 <div class="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                    <div class="h-full w-3/4 bg-primary" />
                 </div>
              </Card>
              <Card class="bg-theme/5 border-theme/20">
                 <div class="text-xs font-bold uppercase text-theme mb-2">Bandwidth</div>
                 <div class="h-2 w-full bg-theme/20 rounded-full overflow-hidden">
                    <div class="h-full w-1/2 bg-theme" />
                 </div>
              </Card>
            </Grid>
            <Grid cols={3} gap={4}>
               <For each={[1, 2, 3]}>
                  {(id) => (
                    <div class="h-12 border-2 border-dashed border-border-theme/10 rounded-xl flex items-center justify-center text-[10px] font-bold text-muted uppercase">
                       Col {id}
                    </div>
                  )}
               </For>
            </Grid>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
