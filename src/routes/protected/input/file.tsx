import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_ARROW_DOWN_TRAY, ICON_SPARKLES } from '~/lib/icons';
import { FilePicker } from '~/components/input/FilePicker';

export default function FilePage() {
  const [log, setLog] = createSignal<string>("No files selected");

  const handleUpload = (files: FileList) => {
    setLog(`${files.length} file(s) ready for processing: ${Array.from(files).map(f => f.name).join(', ')}`);
  };

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_ARROW_DOWN_TRAY} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">File Pickers</HeadingText>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Picture */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Single Upload</HeadingText>
          <FilePicker 
            label="Profile Picture"
            accept="image/*"
            onFilesSelected={(f) => setLog(`Selected image: ${f[0].name}`)}
          />
        </Card>

        {/* Documents */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Multi Batch</HeadingText>
          <FilePicker 
            label="Supporting Documents"
            multiple={true}
            accept=".pdf,.doc,.docx"
            onFilesSelected={handleUpload}
          />
        </Card>

        {/* Global Space */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6 md:col-span-2">
          <div class="flex items-center gap-2">
            <Icon icon={ICON_SPARKLES} class="text-theme" />
            <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Large Drop Space</HeadingText>
          </div>
          <FilePicker 
            class="h-64"
            onFilesSelected={handleUpload}
          />
          <div class="p-4 bg-surface rounded-2xl border border-input-border">
            <div class="text-[10px] font-bold text-muted uppercase mb-1">Session Log</div>
            <p class="text-xs font-mono text-theme break-all">{log()}</p>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
