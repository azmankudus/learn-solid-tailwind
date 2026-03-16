import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_QUEUE_LIST, ICON_CUBE, ICON_BOLT } from '~/lib/icons';
import { Tree } from '~/components/content/Tree';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function TreePage() {
  const systemTree = [
    {
      id: "root",
      label: "System Core",
      children: [
        {
          id: "bin",
          label: "Instruction Sets",
          children: [
            { id: "exec", label: "execute_node.sh" },
            { id: "sync", label: "sync_cluster.py" }
          ]
        },
        {
          id: "etc",
          label: "Configuration",
          children: [
            { id: "net", label: "network_topo.conf" },
            { id: "sec", label: "security_key.pem" }
          ]
        },
        {
          id: "logs",
          label: "Diagnostic Logs",
          children: [
            { id: "err", label: "error_stack.log" }
          ]
        }
      ]
    }
  ];

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_QUEUE_LIST} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-black italic tracking-tighter uppercase">Topology Protocol</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Hierarchical Explorer"
          icon={<Icon icon={ICON_CUBE} />}
          description="Recursive node navigation for complex system structures and directory topologies."
          code={`
<Tree items={systemTree} />
          `}
        >
          <div class="p-6 bg-surface border border-input-border rounded-3xl max-w-md">
             <Tree items={systemTree} />
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Interactive Selection"
          icon={<Icon icon={ICON_BOLT} />}
          description="Support for selection callbacks and deep-nested visibility logic."
          code={`
<Tree 
  items={systemTree} 
  onSelect={(item) => console.log(item)} 
/>
          `}
        >
          <div class="flex flex-col gap-4">
             <Tree items={systemTree} onSelect={(i) => alert(`Selected: ${i.label}`)} />
             <div class="p-4 rounded-xl bg-theme/5 border border-theme/10">
                <p class="text-[10px] font-black uppercase text-theme">Observation active</p>
             </div>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
