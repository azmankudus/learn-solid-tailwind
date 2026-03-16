import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { 
  ICON_BOLT, ICON_HEART, ICON_TRASH, ICON_CHECK, 
  ICON_QUESTION, ICON_ARROWS_EXPAND, ICON_SPARKLES 
} from '~/lib/icons';
import { Button, IconButton } from '~/components/input/Button';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function ButtonsPage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_BOLT} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Buttons</HeadingText>
      </div>

      <div class="flex flex-col gap-6">
        <ComponentViewer 
          title="Variants" 
          icon={<Icon icon={ICON_BOLT} />} 
          description="Use different color variants to represent primary or secondary actions."
          code={`
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="info">Info</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>
          `}
        >
          <div class="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="info">Info</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="error">Error</Button>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Buttons with Icons" 
          icon={<Icon icon={ICON_HEART} />} 
          description="Combined text and icons to provide more context to the action."
          code={`
<Button icon={<Icon icon={ICON_HEART} />} layout="icon-text">Favorite</Button>
<Button variant="primary" icon={<Icon icon={ICON_BOLT} />} layout="text-icon">Process</Button>
<Button variant="success" icon={<Icon icon={ICON_CHECK} />} layout="icon-text">Complete</Button>
<Button variant="error" icon={<Icon icon={ICON_TRASH} />} layout="text-icon">Delete</Button>
          `}
        >
          <div class="flex flex-wrap gap-4 items-center">
            <Button icon={<Icon icon={ICON_HEART} />} layout="icon-text">Favorite</Button>
            <Button variant="primary" icon={<Icon icon={ICON_BOLT} />} layout="text-icon">Next Step</Button>
            <Button variant="success" icon={<Icon icon={ICON_CHECK} />} layout="icon-text">Done</Button>
            <Button variant="error" icon={<Icon icon={ICON_TRASH} />} layout="text-icon">Delete</Button>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Icon Only" 
          icon={<Icon icon={ICON_CHECK} />} 
          description="Minimalist buttons that only display an icon, often used in toolbars."
          code={`
<IconButton tooltip="Like"><Icon icon={ICON_HEART} /></IconButton>
<IconButton tooltip="Settings"><Icon icon={ICON_CHECK} /></IconButton>
          `}
        >
          <div class="flex flex-wrap gap-6 items-center">
            <IconButton tooltip="Add Item">
              <Icon icon={ICON_BOLT} width={20} height={20} class="text-theme" />
            </IconButton>
            <IconButton tooltip="Add to Favorites">
              <Icon icon={ICON_HEART} width={20} height={20} class="text-rose-500" />
            </IconButton>
            <IconButton tooltip="Save Changes" class="bg-theme/10 border-theme/20">
              <Icon icon={ICON_CHECK} width={20} height={20} class="text-emerald-500" />
            </IconButton>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Tooltip Positions" 
          icon={<Icon icon={ICON_QUESTION} />} 
          description="Control where the tooltip appears relative to the button."
          code={`
<Button tooltip="Top" tooltipPosition="top">Top</Button>
<Button tooltip="Right" tooltipPosition="right">Right</Button>
<Button tooltip="Bottom" tooltipPosition="bottom">Bottom</Button>
<Button tooltip="Left" tooltipPosition="left">Left</Button>
          `}
        >
          <div class="flex flex-wrap gap-4">
            <Button tooltip="Tooltip on Top" tooltipPosition="top" variant="primary">Top</Button>
            <Button tooltip="Tooltip on Right" tooltipPosition="right" variant="primary">Right</Button>
            <Button tooltip="Tooltip on Bottom" tooltipPosition="bottom" variant="primary">Bottom</Button>
            <Button tooltip="Tooltip on Left" tooltipPosition="left" variant="primary">Left</Button>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Sizes & Layouts" 
          icon={<Icon icon={ICON_ARROWS_EXPAND} />} 
          description="Control the width of the button to fit the content or fill the container."
          code={`
<Button class="w-fit">Fit Content</Button>
<Button class="w-full">Full Width</Button>
          `}
        >
          <div class="flex flex-col gap-6 w-full max-w-md">
            <div class="flex flex-wrap items-center gap-4">
              <Button variant="info" class="w-fit">Short Button</Button>
              <Button variant="info" class="w-48">Fixed Width</Button>
            </div>
            <Button variant="info" class="w-full">Full Width Button</Button>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Hover Effects" 
          icon={<Icon icon={ICON_SPARKLES} />} 
          description="Interactive reveal effects that show an icon when the user hovers."
          code={`
<Button layout="reveal-right" icon={<Icon icon={ICON_BOLT} />}>Reveal Right</Button>
<Button layout="reveal-left" icon={<Icon icon={ICON_TRASH} />}>Reveal Left</Button>
          `}
        >
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full font-semibold">
            <div class="flex flex-col gap-4">
              <span class="text-[10px] font-bold text-muted uppercase tracking-wider block">Standard Reveal</span>
              <div class="flex flex-col gap-3">
                <Button variant="info" icon={<Icon icon={ICON_BOLT} />} layout="reveal-right">
                  Reveal Right
                </Button>
                <Button variant="error" icon={<Icon icon={ICON_TRASH} />} layout="reveal-left">
                  Reveal Left
                </Button>
              </div>
            </div>

            <div class="flex flex-col gap-4">
              <span class="text-[10px] font-bold text-muted uppercase tracking-wider block">Full Width Reveal</span>
              <div class="flex flex-col gap-3">
                <Button variant="primary" icon={<Icon icon={ICON_CHECK} />} layout="reveal-right" class="w-48">
                  Fixed Width
                </Button>
                <Button variant="success" icon={<Icon icon={ICON_BOLT} />} layout="reveal-left" class="w-full">
                  Full Width Reveal
                </Button>
              </div>
            </div>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
