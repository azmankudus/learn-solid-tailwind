import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_BOLT } from '~/lib/icons';

export default function ContextPage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_BOLT} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Context Menu</HeadingText>
      </div>

      <Card class="p-8 border-none shadow-sm">
        <p class="text-muted">
          The <strong>Context Menu</strong> component allows you to display a custom menu when a user right-clicks on an element. 
          The full implementation of this component is coming soon.
        </p>
        <div class="mt-8 p-12 border-2 border-dashed border-border-theme/20 rounded-2xl flex items-center justify-center">
          <span class="text-muted/40 font-medium italic">Interactive Context Menu Space</span>
        </div>
      </Card>
    </PageWrapper>
  );
}
