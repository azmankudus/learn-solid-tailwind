import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { showToast } from '~/components/content/Toast';
import { Icon } from '@iconify-icon/solid';
import { ICON_BOLT, ICON_CHECK_CIRCLE, ICON_EXCLAMATION_TRIANGLE, ICON_INFORMATION_CIRCLE } from '~/lib/icons';
import { ComponentViewer } from '~/components/content/ComponentViewer';
import { For } from 'solid-js';

export default function ToastPage() {
  const triggerToast = (type: any, position: any = "top-right") => {
    const messages = {
      success: "Your changes have been saved successfully.",
      error: "An error occurred while trying to save your data.",
      warning: "Please review the missing fields before proceeding.",
      info: "A new software update is available for download."
    };

    showToast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Message`,
      message: messages[type as keyof typeof messages],
      type,
      position,
      duration: 3000
    });
  };

  const positions = [
    "top-left", "top-right", "bottom-left", "bottom-right",
    "center-top", "center-bottom", "center-middle"
  ];

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_BOLT} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Toast</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Notification Types"
          icon={<Icon icon={ICON_BOLT} />}
          description="Display different types of notifications to provide feedback to the user."
          code={`
import { showToast } from '~/components/content/Toast';

showToast({
  title: "Success",
  message: "Your profile has been updated.",
  type: "success",
  position: "top-right"
});
          `}
        >
          <div class="space-y-6">
            <div class="flex flex-wrap gap-3">
              <button 
                onClick={() => triggerToast("success")}
                class="px-4 py-2 rounded-xl bg-green-500 text-white font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all"
              >
                Show Success
              </button>
              <button 
                onClick={() => triggerToast("error")}
                class="px-4 py-2 rounded-xl bg-red-500 text-white font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all"
              >
                Show Error
              </button>
              <button 
                onClick={() => triggerToast("warning")}
                class="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all"
              >
                Show Warning
              </button>
              <button 
                onClick={() => triggerToast("info")}
                class="px-4 py-2 rounded-xl bg-blue-500 text-white font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all"
              >
                Show Info
              </button>
            </div>

            <div class="flex flex-col gap-3">
               <div class="text-[10px] font-bold text-muted uppercase tracking-widest">Global Positions</div>
               <div class="flex flex-wrap gap-2">
                  <For each={positions}>
                    {(pos) => (
                      <button 
                        onClick={() => triggerToast("info", pos)}
                        class="px-3 py-1.5 rounded-lg bg-surface border border-border-theme/10 text-[10px] font-bold text-main hover:bg-theme/10 hover:border-theme/30 transition-all uppercase"
                      >
                        {pos.replace('-', ' ')}
                      </button>
                    )}
                  </For>
               </div>
            </div>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
