import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_SPARKLES, ICON_CHECK_CIRCLE, ICON_BOLT } from '~/lib/icons';
import { Badge } from '~/components/content/Badge';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function BadgePage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_SPARKLES} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Badge</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Colors"
          icon={<Icon icon={ICON_CHECK_CIRCLE} />}
          description="Use different colors to indicate various statuses or categories."
          code={`
<div class="flex flex-wrap gap-2">
  <Badge variant="primary">Primary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="error">Error</Badge>
  <Badge variant="info">Info</Badge>
</div>
          `}
        >
          <div class="flex flex-wrap gap-3">
            <Badge variant="primary">Active</Badge>
            <Badge variant="success">Completed</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="error">Failed</Badge>
            <Badge variant="info">Processing</Badge>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Sizes & Shapes"
          icon={<Icon icon={ICON_SPARKLES} />}
          description="Adjust the size and border radius of the badge."
          code={`
<Badge size="xs" round={true}>Small</Badge>
<Badge size="sm">Medium</Badge>
<Badge size="md" variant="outline">Large</Badge>
          `}
        >
          <div class="flex flex-wrap items-center gap-4">
             <div class="flex items-center gap-2">
                <span class="text-xs font-medium text-muted">Small & Round:</span>
                <Badge size="xs" round={true} variant="success">New</Badge>
             </div>
             <div class="flex items-center gap-2">
                <span class="text-xs font-medium text-muted">Standard:</span>
                <Badge size="md" variant="primary">Update</Badge>
             </div>
             <div class="flex items-center gap-2">
                <span class="text-xs font-medium text-muted">Outline:</span>
                <Badge size="md" variant="outline">Default</Badge>
             </div>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Variants"
          icon={<Icon icon={ICON_BOLT} />}
          description="Different visual styles for secondary information."
          code={`
<Badge variant="secondary">Secondary</Badge>
<Badge variant="ghost">Ghost</Badge>
<Badge variant="outline">Outline</Badge>
          `}
        >
          <div class="flex flex-wrap gap-3">
             <Badge variant="secondary">In Stock</Badge>
             <Badge variant="ghost">Archived</Badge>
             <Badge variant="outline">Draft</Badge>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
