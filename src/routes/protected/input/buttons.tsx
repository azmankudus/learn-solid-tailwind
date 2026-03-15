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
        {/* Semantic Variants */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Semantic Variants</HeadingText>
          <div class="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="info">Info</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="error">Error</Button>
          </div>
        </Card>

        {/* Layouts with Icons */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Icon Layouts</HeadingText>
          <div class="flex flex-wrap gap-4 items-center">
            <Button variant="default" icon={<Icon icon={ICON_HEART} />} layout="icon-text">
              Favorite
            </Button>
            <Button variant="accent" icon={<Icon icon={ICON_BOLT} />} layout="text-icon">
              Process
            </Button>
            <Button variant="success" icon={<Icon icon={ICON_CHECK} />} layout="icon-text">
              Complete
            </Button>
            <Button variant="error" icon={<Icon icon={ICON_TRASH} />} layout="text-icon">
              Delete
            </Button>
          </div>
        </Card>

        {/* Icon Buttons */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Standalone Icons</HeadingText>
          <div class="flex flex-wrap gap-6 items-center">
            <IconButton tooltip="Add Contact">
              <Icon icon={ICON_BOLT} width={20} height={20} class="text-theme" />
            </IconButton>
            <IconButton tooltip="Notifications">
              <Icon icon={ICON_HEART} width={20} height={20} class="text-rose-500" />
            </IconButton>
            <IconButton tooltip="Settings" class="bg-theme/10 border-theme/20">
              <Icon icon={ICON_CHECK} width={20} height={20} class="text-emerald-500" />
            </IconButton>
          </div>
        </Card>

        {/* Full Width & Tooltips */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6 ">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Features</HeadingText>
          <div class="flex flex-col gap-6">
            <Button class="w-full" variant="default" icon={<Icon icon={ICON_BOLT} />} layout="text-icon">
              Full Width with Icon
            </Button>
            <div class="flex gap-4">
              <Button tooltip="Top tooltip position" tooltipPosition="top" variant="info">
                Hover Me
              </Button>
              <Button tooltip="Right tooltip position" tooltipPosition="right" variant="accent">
                Right Tooltip
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
