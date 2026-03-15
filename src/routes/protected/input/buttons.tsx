import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_BOLT, ICON_HEART, ICON_TRASH, ICON_CHECK, ICON_X_MARK } from '~/lib/icons';
import { Button, IconButton } from '~/components/input/Button';

export default function ButtonsPage() {
  const [clickCount, setClickCount] = createSignal(0);

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_BOLT} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">Buttons</HeadingText>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard Buttons */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Standard Buttons</HeadingText>
          <div class="flex flex-wrap gap-4">
            <Button onClick={() => setClickCount(c => c + 1)}>
              Default Button
            </Button>
            <Button class="bg-rose-500 shadow-rose-500/20">
              Danger Button
            </Button>
            <Button class="bg-emerald-500 shadow-emerald-500/20">
              Success Button
            </Button>
            <Button disabled>
              Disabled
            </Button>
          </div>
          <div class="p-4 bg-surface rounded-xl border border-input-border text-xs text-center">
            Clicks: <span class="font-bold text-theme">{clickCount()}</span>
          </div>
        </Card>

        {/* Icon Buttons */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Icon Buttons</HeadingText>
          <div class="flex flex-wrap gap-6 items-center">
            <IconButton tooltip="Add to Favorites">
              <Icon icon={ICON_HEART} width={20} height={20} class="text-rose-500" />
            </IconButton>
            <IconButton tooltip="Delete Item" class="border-rose-500/20 hover:bg-rose-500/10">
              <Icon icon={ICON_TRASH} width={20} height={20} class="text-rose-500" />
            </IconButton>
            <IconButton tooltip="Approve" class="border-emerald-500/20 hover:bg-emerald-500/10">
              <Icon icon={ICON_CHECK} width={20} height={20} class="text-emerald-500" />
            </IconButton>
            <IconButton tooltip="Reject" class="border-rose-500/20 hover:bg-rose-500/10">
              <Icon icon={ICON_X_MARK} width={20} height={20} class="text-rose-500" />
            </IconButton>
          </div>
        </Card>

        {/* Full Width & Tooltips */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6 md:col-span-2">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Variations & Features</HeadingText>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div class="flex flex-col gap-4">
              <span class="text-xs font-semibold text-muted">Full Width Button</span>
              <Button class="w-full">Submit Application</Button>
            </div>
            <div class="flex flex-col gap-4">
              <span class="text-xs font-semibold text-muted">Buttons with Tooltips</span>
              <div class="flex gap-4">
                <Button tooltip="This button has a tooltip" tooltipPosition="top">Hover me (Top)</Button>
                <Button tooltip="Another tooltip here" tooltipPosition="right" class="bg-surface !text-main border border-input-border">Right Tooltip</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
