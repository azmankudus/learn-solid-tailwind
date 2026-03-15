import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_ARROW_DOWN_TRAY } from '~/lib/icons';
import { FilePicker } from '~/components/input/FilePicker';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function FilePage() {
  const [log, setLog] = createSignal<string>("No files selected");

  const handleUpload = (files: FileList) => {
    setLog(`${files.length} file(s) ready: ${Array.from(files).map(f => f.name).join(', ')}`);
  };

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_ARROW_DOWN_TRAY} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">File Pickers</HeadingText>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <ComponentViewer 
          title="Single Upload"
          code={`
<FilePicker 
  label="Profile Picture"
  accept="image/*"
  onFilesSelected={(files) => handle(files)}
/>
          `}
        >
          <FilePicker 
            label="Profile Picture"
            accept="image/*"
            onFilesSelected={(f) => setLog(`Selected image: ${f[0].name}`)}
            class="w-full"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Multi Batch"
          code={`
<FilePicker 
  label="Documents"
  multiple={true}
  accept=".pdf,.doc"
  onFilesSelected={(files) => handle(files)}
/>
          `}
        >
          <FilePicker 
            label="Supporting Documents"
            multiple={true}
            accept=".pdf,.doc,.docx"
            onFilesSelected={handleUpload}
            class="w-full"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Large Drop Space"
          code={`
<FilePicker 
  class="h-64"
  onFilesSelected={(files) => handle(files)}
/>
          `}
        >
          <div class="flex flex-col gap-4 w-full">
            <FilePicker 
              class="h-64 w-full"
              onFilesSelected={handleUpload}
            />
            <div class="p-3 bg-input rounded-xl border border-input-border">
              <p class="text-[10px] font-mono text-theme break-all">{log()}</p>
            </div>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
