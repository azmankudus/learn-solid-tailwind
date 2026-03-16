import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_SQUARE_3_STACK, ICON_BOLT, ICON_COG, ICON_SHIELD_CHECK } from '~/lib/icons';
import { Accordion } from '~/components/content/Accordion';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function AccordionPage() {
  const items = [
    {
      id: "1",
      title: "System Integration",
      icon: ICON_BOLT,
      content: "Deployment scripts are currently synchronizing with the primary node. Expected completion: T-minus 40 seconds."
    },
    {
      id: "2",
      title: "Security Encryption",
      icon: ICON_SHIELD_CHECK,
      content: "AES-256 protocols are active. All outgoing transmissions are fragmented and routed through neural layers."
    },
    {
      id: "3",
      title: "Hardware Diagnostics",
      icon: ICON_COG,
      content: "Thermal levels are within safe parameters (42°C). Cooling fans operating at 60% efficiency."
    }
  ];

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_SQUARE_3_STACK} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-black italic tracking-tighter uppercase">Structural Protocol</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Single Expansion"
          icon={<Icon icon={ICON_SQUARE_3_STACK} />}
          description="High-density accordion with hardware-accelerated transitions for focus retention."
          code={`
<Accordion items={items} />
          `}
        >
          <Accordion items={items} class="max-w-2xl" />
        </ComponentViewer>

        <ComponentViewer 
          title="Multi-Parallel View"
          icon={<Icon icon={ICON_BOLT} />}
          description="Support for concurrent section visibility during complex system audits."
          code={`
<Accordion 
  items={items} 
  allowMultiple={true} 
/>
          `}
        >
          <div class="p-6 bg-surface border border-input-border rounded-3xl">
             <Accordion items={items} allowMultiple={true} class="max-w-2xl" />
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
