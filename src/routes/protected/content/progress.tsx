import { createSignal, onCleanup } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_TRENDING_UP, ICON_BOLT, ICON_CHECK_CIRCLE } from '~/lib/icons';
import { Progress } from '~/components/content/Progress';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function ProgressPage() {
  const [val, setVal] = createSignal(0);

  const interval = setInterval(() => {
    setVal((v) => (v >= 100 ? 0 : v + 2));
  }, 1000);

  onCleanup(() => clearInterval(interval));

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_TRENDING_UP} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-black italic tracking-tighter uppercase">Status Stream</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Diagnostic Iteration"
          icon={<Icon icon={ICON_TRENDING_UP} />}
          description="High-fidelity progress tracking with integrated diagnostic percentages."
          code={`
<Progress 
  label="Processing Payload" 
  value={65} 
  showValue={true} 
/>
          `}
        >
          <div class="flex flex-col gap-8 w-full max-w-xl">
             <Progress label="Sector Synchronization" value={val()} showValue={true} />
             <div class="grid grid-cols-2 gap-6">
                <Progress label="Integrity Check" value={80} variant="success" size="sm" showValue={true} />
                <Progress label="Threat Assessment" value={45} variant="warning" size="sm" showValue={true} />
             </div>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="System Modulation"
          icon={<Icon icon={ICON_BOLT} />}
          description="Semantic color variants for varying operational criticalities."
          code={`
<Progress value={95} variant="error" size="lg" />
          `}
        >
          <div class="flex flex-col gap-6 w-full max-w-xl">
             <Progress label="Reactor Core Temp" value={92} variant="error" size="lg" showValue={true} />
             <Progress label="Network Latency" value={15} variant="info" size="md" />
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Indeterminate Link"
          icon={<Icon icon={ICON_CHECK_CIRCLE} />}
          description="Hardware-accelerated shimmer effect for continuous background processes."
          code={`
<Progress indeterminate={true} />
          `}
        >
          <div class="flex flex-col gap-4 w-full max-w-xl">
             <Progress label="Waiting for Uplink..." indeterminate={true} variant="primary" />
             <Progress indeterminate={true} variant="success" size="sm" />
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
