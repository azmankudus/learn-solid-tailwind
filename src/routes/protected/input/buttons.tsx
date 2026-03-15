import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_BOLT, ICON_HEART, ICON_TRASH, ICON_CHECK, ICON_X_MARK } from '~/lib/icons';
import { Button, IconButton } from '~/components/input/Button';
import { ComponentViewer } from '~/components/content/ComponentViewer';

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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {/* Semantic Variants */}
        <ComponentViewer 
          title="Semantic Variants"
          code={`
<Button variant="default">Default</Button>
<Button variant="accent">Accent</Button>
<Button variant="info">Info</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>
          `}
        >
          <Button variant="default">Default</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="info">Info</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="error">Error</Button>
        </ComponentViewer>

        {/* Layouts with Icons */}
        <ComponentViewer 
          title="Icon Layouts"
          code={`
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
          `}
        >
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
        </ComponentViewer>

        {/* Icon Buttons */}
        <ComponentViewer 
          title="Standalone Icons"
          code={`
<IconButton tooltip="Add Contact">
  <Icon icon={ICON_BOLT} width={20} height={20} class="text-theme" />
</IconButton>
<IconButton tooltip="Notifications">
  <Icon icon={ICON_HEART} width={20} height={20} class="text-rose-500" />
</IconButton>
<IconButton tooltip="Settings" class="bg-theme/10 border-theme/20">
  <Icon icon={ICON_CHECK} width={20} height={20} class="text-emerald-500" />
</IconButton>
          `}
        >
          <IconButton tooltip="Add Contact">
            <Icon icon={ICON_BOLT} width={20} height={20} class="text-theme" />
          </IconButton>
          <IconButton tooltip="Notifications">
            <Icon icon={ICON_HEART} width={20} height={20} class="text-rose-500" />
          </IconButton>
          <IconButton tooltip="Settings" class="bg-theme/10 border-theme/20">
            <Icon icon={ICON_CHECK} width={20} height={20} class="text-emerald-500" />
          </IconButton>
        </ComponentViewer>

        {/* Tooltip Positions */}
        <ComponentViewer 
          title="Tooltip Positions"
          code={`
<Button tooltip="Tooltip on Top" tooltipPosition="top" variant="accent">Top</Button>
<Button tooltip="Tooltip on Right" tooltipPosition="right" variant="accent">Right</Button>
<Button tooltip="Tooltip on Bottom" tooltipPosition="bottom" variant="accent">Bottom</Button>
<Button tooltip="Tooltip on Left" tooltipPosition="left" variant="accent">Left</Button>
          `}
        >
          <Button tooltip="Tooltip on Top" tooltipPosition="top" variant="accent">Top</Button>
          <Button tooltip="Tooltip on Right" tooltipPosition="right" variant="accent">Right</Button>
          <Button tooltip="Tooltip on Bottom" tooltipPosition="bottom" variant="accent">Bottom</Button>
          <Button tooltip="Tooltip on Left" tooltipPosition="left" variant="accent">Left</Button>
        </ComponentViewer>

        {/* Sizing Options */}
        <ComponentViewer 
          title="Sizing Options"
          code={`
<Button variant="info" class="w-fit">Fit Content</Button>
<Button variant="info" class="w-48">Fixed Width (48)</Button>
<Button variant="info" class="w-full">Fluid / Full Width</Button>
          `}
        >
          <div class="flex flex-col gap-6 w-full max-w-sm">
            <div class="flex flex-wrap items-center gap-4 justify-center">
              <Button variant="info" class="w-fit">Fit Content</Button>
              <Button variant="info" class="w-48">Fixed Width (48)</Button>
            </div>
            <Button variant="info" class="w-full">Fluid / Full Width</Button>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
