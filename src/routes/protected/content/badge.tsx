import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_SPARKLES, ICON_CHECK_CIRCLE, ICON_EXCLAMATION_TRIANGLE, ICON_BOLT } from '~/lib/icons';
import { Badge } from '~/components/content/Badge';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function BadgePage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_SPARKLES} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-black italic tracking-tighter uppercase">Status Protocol</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Semantic Variants"
          icon={<Icon icon={ICON_CHECK_CIRCLE} />}
          description="Standard system status markers with cinematic color profiles."
          code={`
<div class="flex flex-wrap gap-2">
  <Badge variant="primary">Active</Badge>
  <Badge variant="success">Resolved</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="error">Critical</Badge>
  <Badge variant="info">Diagnostic</Badge>
</div>
          `}
        >
          <div class="flex flex-wrap gap-3">
            <Badge variant="primary">Active Node</Badge>
            <Badge variant="success">Security Pass</Badge>
            <Badge variant="warning">Bandwidth Limit</Badge>
            <Badge variant="error">Breach Detected</Badge>
            <Badge variant="info">Syncing Data</Badge>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Geometric Styles"
          icon={<Icon icon={ICON_SPARKLES} />}
          description="High-resolution scaling and rounding variants for varied information densities."
          code={`
<Badge size="xs" round={true}>New</Badge>
<Badge size="sm">Stable</Badge>
<Badge size="md" variant="outline">Enterprise</Badge>
          `}
        >
          <div class="flex flex-wrap items-center gap-4">
             <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-muted uppercase">Version Control</span>
                <Badge size="xs" round={true} variant="success">v2.4.0</Badge>
             </div>
             <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-muted uppercase">Priority</span>
                <Badge size="md" variant="error">High</Badge>
             </div>
             <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-muted uppercase">Access</span>
                <Badge size="md" variant="outline">Root Privileges</Badge>
             </div>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Ghost Interaction"
          icon={<Icon icon={ICON_BOLT} />}
          description="Subtle, low-contrast markers for secondary metadata and background tasks."
          code={`
<Badge variant="ghost">Audit Log</Badge>
<Badge variant="secondary">System Arch</Badge>
          `}
        >
          <div class="flex flex-wrap gap-3">
             <Badge variant="secondary">Legacy Port</Badge>
             <Badge variant="ghost">Archive Ready</Badge>
             <Badge variant="secondary">Internal-04</Badge>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
