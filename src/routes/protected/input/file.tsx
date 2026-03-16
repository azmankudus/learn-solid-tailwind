import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_ARROW_DOWN_TRAY, ICON_DOCUMENT_TEXT, ICON_SQUARE_2_STACK, ICON_ARROWS_EXPAND } from '~/lib/icons';
import { FilePicker } from '~/components/input/FilePicker';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function FilePage() {
  const [log, setLog] = createSignal<string>("No files selected");

  const handleUpload = (files: FileList) => {
    setLog(`${files.length} file(s) selected: ${Array.from(files).map(f => f.name).join(', ')}`);
  };

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_ARROW_DOWN_TRAY} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">File Picker</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-12">
        <ComponentViewer 
          title="Single File Upload"
          icon={<Icon icon={ICON_DOCUMENT_TEXT} />}
          description="Basic file picker for selecting a single item, such as a profile image."
          code={`
<FilePicker 
  label="Image Upload"
  accept="image/*"
  onFilesSelected={(files) => handle(files)}
/>
          `}
        >
          <FilePicker 
            label="Profile Image"
            accept="image/*"
            onFilesSelected={(f) => setLog(`Selected image: ${f[0].name}`)}
            class="w-full max-w-sm"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Multiple Files"
          icon={<Icon icon={ICON_SQUARE_2_STACK} />}
          description="Enable multiple file selection for batch uploads."
          code={`
<FilePicker 
  label="Attachments"
  multiple={true}
  onFilesSelected={(files) => handle(files)}
/>
          `}
        >
          <FilePicker 
            label="Upload Documents"
            multiple={true}
            accept=".pdf,.doc,.docx"
            onFilesSelected={handleUpload}
            class="w-full max-w-sm"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Drop Zone"
          icon={<Icon icon={ICON_ARROWS_EXPAND} />}
          description="A larger target area for dragging and dropping files from your computer."
          code={`
<FilePicker 
  class="h-64"
  onFilesSelected={(files) => handle(files)}
/>
          `}
        >
          <div class="flex flex-col gap-4 w-full max-w-lg">
            <FilePicker 
              class="h-64 w-full"
              onFilesSelected={handleUpload}
            />
            <div class="p-4 bg-input rounded-xl border border-input-border">
              <span class="text-[10px] uppercase font-bold text-muted block mb-1">Status Log</span>
              <p class="text-[11px] font-mono text-theme break-all font-semibold">{log()}</p>
            </div>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
