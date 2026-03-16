import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_BOLT, ICON_CHECK_CIRCLE, ICON_MAP_PIN } from '~/lib/icons';
import { showToast, ToastPosition } from '~/components/content/Toast';
import { Button } from '~/components/input/Button';
import { ComponentViewer } from '~/components/content/ComponentViewer';
import { For } from 'solid-js';

export default function ToastPage() {
  const triggerToast = (pos: ToastPosition) => showToast({
    title: `Signal: ${pos}`,
    message: `Initializing notification stream at [${pos}] coordinate. System integrity verified.`,
    type: "info",
    position: pos,
    duration: 3000
  });

  const positions: ToastPosition[] = [
    "top-left", "center-top", "top-right",
    "center-left", "center", "right",
    "bottom-left", "center-bottom", "bottom-right"
  ];

  const types = ["success", "error", "warning", "info"] as const;

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_BOLT} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-black italic tracking-tighter uppercase">Incident Protocol</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Coordinate Orchestration"
          icon={<Icon icon={ICON_MAP_PIN} />}
          description="Deploy toasts across 9 distinct technical coordinates within the content area."
          code={`
import { showToast } from '~/components/content/Toast';

showToast({
  title: "Vector Established",
  message: "Notification locked on target",
  position: "center",
  type: "info"
});
          `}
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-input/20 rounded-[2.5rem] border border-input-border">
            <For each={positions}>
              {(pos) => (
                <div class="flex flex-col gap-2">
                   <Button 
                    onClick={() => triggerToast(pos)} 
                    variant="primary" 
                    class="!rounded-2xl h-12 uppercase text-[10px] font-black shadow-lg shadow-theme/10"
                   >
                     Deploy {pos}
                   </Button>
                </div>
              )}
            </For>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Type Classifiers"
          icon={<Icon icon={ICON_BOLT} />}
          description="Contextual overlays with integrated duration-sync progress indicators."
        >
          <div class="flex flex-wrap gap-4">
            <For each={types}>
               {(type) => (
                 <Button 
                  onClick={() => showToast({ title: `${type} alert`.toUpperCase(), message: `Technical payout for ${type} protocol.`, type })} 
                  variant="secondary" 
                  class="!rounded-2xl border-theme/20 uppercase text-[10px] font-black"
                 >
                   Trigger {type}
                 </Button>
               )}
            </For>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
