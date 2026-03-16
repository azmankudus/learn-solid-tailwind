import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_VIEW_COLUMNS, ICON_BOLT } from '~/lib/icons';
import { Divider } from '~/components/content/Divider';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function DividerPage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_VIEW_COLUMNS} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-black italic tracking-tighter uppercase">Spatial Protocol</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Geometric Separation"
          icon={<Icon icon={ICON_VIEW_COLUMNS} />}
          description="High-contrast spatial dividers for distinct section definitions."
          code={`
<Divider />
<Divider>Section Alpha</Divider>
<Divider labelPlacement="start">Start Label</Divider>
          `}
        >
          <div class="flex flex-col w-full max-w-2xl px-4">
             <p class="text-[10px] font-bold text-muted uppercase">Terminal Stream Header</p>
             <Divider />
             <p class="text-[10px] font-bold text-muted uppercase">System Core Configuration</p>
             <Divider>Sector 01-A</Divider>
             <p class="text-[11px] font-medium text-main leading-relaxed mb-4">Payload data stream active in this sector. Initializing synchronization protocols for local instances.</p>
             <Divider labelPlacement="end">EOD Report</Divider>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Dashed Typography"
          icon={<Icon icon={ICON_BOLT} />}
          description="Subtle interrupted paths for lightweight metadata separation."
          code={`
<Divider dashed={true}>Metadata</Divider>
          `}
        >
          <div class="flex flex-col w-full max-w-2xl px-4">
             <Divider dashed={true}>Diagnostic Log</Divider>
             <div class="flex h-20 items-center justify-center gap-4">
                <div class="p-3 bg-input rounded-xl text-[10px] font-black uppercase text-theme">Metric A</div>
                <Divider orientation="vertical" dashed={true} />
                <div class="p-3 bg-input rounded-xl text-[10px] font-black uppercase text-theme">Metric B</div>
             </div>
             <Divider dashed={true} />
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Vertical Alignment"
          icon={<Icon icon={ICON_VIEW_COLUMNS} />}
          description="Lateral dividers for toolbar and navigation segmentation."
          code={`
<Divider orientation="vertical" />
          `}
        >
          <div class="flex items-center h-12 bg-surface border border-input-border rounded-2xl px-4 gap-2 w-fit">
             <Icon icon={ICON_BOLT} class="text-theme" />
             <Divider orientation="vertical" />
             <span class="text-xs font-black uppercase">Tools</span>
             <Divider orientation="vertical" />
             <Icon icon={ICON_VIEW_COLUMNS} class="opacity-30" />
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
