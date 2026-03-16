import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Tree } from '~/components/content/Tree';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_QUEUE_LIST, ICON_SPARKLES, ICON_BOLT, ICON_CUBE, ICON_DOCUMENT_TEXT } from '~/lib/icons';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function TreePage() {
  const fileSystem = [
    {
      id: 'root',
      label: 'Project Files',
      icon: ICON_CUBE,
      children: [
        {
          id: 'src',
          label: 'src',
          children: [
            { id: 'd1', label: 'App.tsx', icon: ICON_BOLT },
            { id: 'd2', label: 'index.css', icon: ICON_BOLT },
          ]
        },
        {
          id: 'lib',
          label: 'components',
          children: [
            { id: 'l1', label: 'Button.tsx' },
            { id: 'l2', label: 'Card.tsx' },
          ]
        },
        { id: 'config', label: 'package.json', icon: ICON_DOCUMENT_TEXT },
      ]
    },
    {
      id: 'media',
      label: 'Assets',
      children: [
        { id: 'm1', label: 'logo.png' },
        { id: 'm2', label: 'banner.jpg' },
      ]
    }
  ];

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_QUEUE_LIST} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Tree</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="File Structure"
          icon={<Icon icon={ICON_SPARKLES} />}
          description="Display hierarchical data structures with nested items and custom icons."
          code={`
<Tree 
  items={fileSystem} 
  onSelect={(item) => console.log(item.label)} 
/>
          `}
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card class="bg-surface/50 border border-white/5 backdrop-blur-md">
               <div class="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                  <div class="text-[10px] font-bold text-theme uppercase tracking-widest">File Explorer</div>
                  <Icon icon={ICON_SPARKLES} class="text-theme" />
               </div>
               <Tree items={fileSystem} onSelect={(item) => alert(`Selected: ${item.label}`)} />
            </Card>

            <div class="flex flex-col gap-4">
               <Card themeTint={true} padding="p-4">
                  <h4 class="text-xs font-bold uppercase tracking-widest text-muted mb-3">Customization</h4>
                  <p class="text-sm text-muted mb-4 leading-relaxed">
                    The tree component supports infinite nesting and allows you to provide custom icons for each node. It also handles selection events for interaction.
                  </p>
                  <div class="p-3 rounded-lg bg-black/5 border border-white/5">
                     <div class="flex items-center gap-2">
                        <Icon icon={ICON_BOLT} class="text-theme" />
                        <span class="text-[10px] font-bold uppercase">Ready for interaction</span>
                     </div>
                  </div>
               </Card>
            </div>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
