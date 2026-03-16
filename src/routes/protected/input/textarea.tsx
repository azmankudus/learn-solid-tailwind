import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_DOCUMENT_TEXT, ICON_ADJUSTMENTS_HORIZONTAL, ICON_BOLT } from '~/lib/icons';
import { TextArea } from '~/components/input/TextArea';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function TextAreaPage() {
  const [text1, setText1] = createSignal("");
  const [text2, setText2] = createSignal("This is a sample text for the summary...");
  const [text3, setText3] = createSignal("");

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_DOCUMENT_TEXT} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Text Area</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Basic Text Area"
          icon={<Icon icon={ICON_DOCUMENT_TEXT} />}
          description="A multi-line text input field for longer descriptions or comments."
          code={`
<TextArea 
  label="Message"
  value={text()} 
  onChange={setText} 
  placeholder="Type your message here..."
/>
          `}
        >
          <TextArea 
            label="Feedback"
            value={text1()} 
            onChange={setText1} 
            placeholder="Tell us what you think..."
            class="max-w-xl"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Validation"
          icon={<Icon icon={ICON_ADJUSTMENTS_HORIZONTAL} />}
          description="Define minimum and maximum character limits for the input."
          code={`
<TextArea 
  label="Summary"
  value={text()} 
  onChange={setText} 
  min={20}
  max={100}
/>
          `}
        >
          <TextArea 
            label="Short Biography"
            value={text2()} 
            onChange={setText2} 
            min={20}
            max={100}
            class="max-w-xl"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Disabled State"
          icon={<Icon icon={ICON_BOLT} />}
          description="Render the text area in a read-only or inactive state."
          code={`
<TextArea 
  label="Terms of Service"
  value="..." 
  disabled={true}
/>
          `}
        >
          <TextArea 
            label="System Logs"
            value={text3()} 
            onChange={setText3} 
            placeholder="No logs available at this time."
            disabled={true}
            class="max-w-xl"
          />
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
