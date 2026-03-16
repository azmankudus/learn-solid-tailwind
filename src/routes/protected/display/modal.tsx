import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Modal } from '~/components/content/Modal';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_WINDOW, ICON_BOLT, ICON_SPARKLES, ICON_CHECK_CIRCLE } from '~/lib/icons';
import { ComponentViewer } from '~/components/content/ComponentViewer';
import { createSignal } from 'solid-js';

export default function ModalPage() {
  const [isBasicOpen, setIsBasicOpen] = createSignal(false);
  const [isAlertOpen, setIsAlertOpen] = createSignal(false);

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_WINDOW} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Modal</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Simple Dialog"
          icon={<Icon icon={ICON_BOLT} />}
          description="A standard modal for displaying information or gathering user input."
          code={`
const [isOpen, setIsOpen] = createSignal(false);

<Modal 
  isOpen={isOpen()} 
  onClose={() => setIsOpen(false)}
  title="New Project"
  icon={<Icon icon={ICON_SPARKLES} />}
>
  <p>Fill out the details to create a new project.</p>
</Modal>
          `}
        >
          <div class="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsBasicOpen(true)}
              class="px-6 py-2.5 rounded-xl bg-theme text-white font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-lg shadow-theme/20"
            >
              Open Modal
            </button>

            <button 
              onClick={() => setIsAlertOpen(true)}
              class="px-6 py-2.5 rounded-xl bg-surface border border-border-theme/20 text-main font-bold uppercase tracking-widest text-xs hover:bg-surface/80 transition-all"
            >
              Confirm Action
            </button>
          </div>

          <Modal 
            isOpen={isBasicOpen()} 
            onClose={() => setIsBasicOpen(false)}
            title="Create New Project"
            icon={<Icon icon={ICON_SPARKLES} width={20} />}
            footer={
              <button 
                onClick={() => setIsBasicOpen(false)}
                class="px-4 py-2 rounded-lg bg-theme text-white text-xs font-bold uppercase"
              >
                Close
              </button>
            }
          >
            <div class="space-y-4">
              <div class="h-32 rounded-xl bg-gradient-to-br from-theme/20 to-primary/20 flex items-center justify-center border border-white/5 text-theme font-bold">
                 Project Preview
              </div>
              <p class="text-sm text-muted leading-relaxed">
                This dialog allows you to set up a new project configuration. You can choose templates, themes, and initial settings for your workspace.
              </p>
              <div class="flex items-center gap-2 p-3 rounded-lg bg-surface/50 border border-white/5">
                 <Icon icon={ICON_CHECK_CIRCLE} class="text-success" />
                 <span class="text-xs font-medium text-main">Configuration is valid.</span>
              </div>
            </div>
          </Modal>

          <Modal 
            isOpen={isAlertOpen()} 
            onClose={() => setIsAlertOpen(false)}
            title="Confirm Deletion"
            icon={<Icon icon={ICON_BOLT} width={20} class="text-error" />}
          >
            <div class="p-4 rounded-xl bg-error/5 border border-error/20 text-error">
               <h4 class="font-bold mb-1">Delete Workspace?</h4>
               <p class="text-xs opacity-80">Are you sure you want to permanently delete this workspace? This action cannot be undone.</p>
            </div>
            <div class="flex flex-col gap-2 mt-2">
               <div class="text-[10px] font-bold text-muted uppercase tracking-widest">Available Actions</div>
               <button class="w-full py-2 rounded-lg bg-error text-white text-xs font-bold hover:opacity-90">Delete Workspace</button>
               <button class="w-full py-2 rounded-lg bg-surface border border-border-theme/10 text-xs font-bold text-main hover:bg-black/5" onClick={() => setIsAlertOpen(false)}>Cancel</button>
            </div>
          </Modal>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
