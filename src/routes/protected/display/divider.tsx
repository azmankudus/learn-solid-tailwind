import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Divider } from '~/components/content/Divider';
import { Icon } from '@iconify-icon/solid';
import { ICON_VIEW_COLUMNS, ICON_SPARKLES, ICON_BOLT } from '~/lib/icons';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function DividerPage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_VIEW_COLUMNS} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Divider</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Horizontal Divider"
          icon={<Icon icon={ICON_SPARKLES} />}
          description="Standard horizontal line to separate content sections."
          code={`
<Divider>Label</Divider>
<Divider dashed={true} />
<Divider labelPlacement="start">Left Label</Divider>
          `}
        >
          <div class="flex flex-col gap-8 w-full max-w-2xl px-8 py-12 rounded-2xl bg-surface/30 border border-white/5">
            <Divider>Section One</Divider>
            <div class="h-24 bg-theme/5 rounded-xl border border-dashed border-theme/20" />
            
            <Divider dashed={true}>Middle Divider</Divider>
            <div class="h-24 bg-primary/5 rounded-xl border border-dashed border-primary/20" />
            
            <Divider labelPlacement="start">Start Label</Divider>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Vertical Divider"
          icon={<Icon icon={ICON_BOLT} />}
          description="Used to separate content in horizontal layouts."
          code={`
<div class="flex h-32">
  <div>Side A</div>
  <Divider orientation="vertical" />
  <div>Side B</div>
</div>
          `}
        >
          <div class="flex h-48 items-center justify-center gap-4 p-8 rounded-2xl bg-surface/30 border border-white/5">
             <div class="flex-1 text-center font-bold text-theme">Column A</div>
             <Divider orientation="vertical">OR</Divider>
             <div class="flex-1 text-center font-bold text-primary">Column B</div>
             <Divider orientation="vertical" dashed={true} />
             <div class="flex-1 text-center font-bold text-muted">Column C</div>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
