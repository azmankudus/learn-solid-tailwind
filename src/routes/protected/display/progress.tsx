import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Progress } from '~/components/content/Progress';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_TRENDING_UP, ICON_BOLT, ICON_SPARKLES } from '~/lib/icons';
import { ComponentViewer } from '~/components/content/ComponentViewer';
import { createSignal, onMount, onCleanup } from 'solid-js';

export default function ProgressPage() {
  const [dynamicValue, setDynamicValue] = createSignal(0);

  let timer: any;
  onMount(() => {
    timer = setInterval(() => {
      setDynamicValue(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);
  });

  onCleanup(() => clearInterval(timer));

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_TRENDING_UP} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Progress</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Linear Progress"
          icon={<Icon icon={ICON_BOLT} />}
          description="Visual indicators for tasks with a measurable duration or percentage."
          code={`
<Progress 
  value={65} 
  label="Uploading Files" 
  showValue={true} 
  variant="primary" 
/>
          `}
        >
          <div class="space-y-8 max-w-xl">
            <Progress 
              value={dynamicValue()} 
              label="Task Progress" 
              showValue={true} 
              variant="primary" 
              size="lg"
            />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Progress value={85} label="CPU Usage" showValue={true} variant="success" size="sm" />
              <Progress value={42} label="Memory Usage" showValue={true} variant="warning" size="sm" />
              <Progress value={12} label="Disk Space" showValue={true} variant="error" size="sm" />
              <Progress value={94} label="Network Traffic" showValue={true} variant="info" size="sm" />
            </div>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Indeterminate Progress"
          icon={<Icon icon={ICON_SPARKLES} />}
          description="Animations for tasks where the completion time is unknown."
          code={`
<Progress indeterminate={true} variant="primary" size="md" />
          `}
        >
          <div class="space-y-6 max-w-xl">
             <div class="p-4 rounded-xl bg-surface/50 border border-white/5">
                <div class="flex items-center justify-between mb-2">
                   <div class="text-[10px] font-bold text-theme uppercase tracking-widest">Searching Database...</div>
                   <div class="flex gap-1">
                      <div class="h-1 w-1 rounded-full bg-theme animate-pulse" />
                      <div class="h-1 w-1 rounded-full bg-theme animate-pulse delay-75" />
                      <div class="h-1 w-1 rounded-full bg-theme animate-pulse delay-150" />
                   </div>
                </div>
                <Progress indeterminate={true} variant="primary" size="sm" />
             </div>
             
             <Card themeTint={true} padding="p-4">
                <div class="flex items-center gap-3 mb-3">
                   <Icon icon={ICON_SPARKLES} class="text-primary" />
                   <div class="text-[10px] font-bold text-muted uppercase tracking-widest">Optimizing Assets...</div>
                </div>
                <Progress indeterminate={true} variant="info" size="md" />
             </Card>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
