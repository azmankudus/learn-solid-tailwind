import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_CALENDAR } from '~/lib/icons';
import { DatePicker } from '~/components/input/DatePicker';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function DateTimePage() {
  const [date1, setDate1] = createSignal(new Date().toISOString().split('T')[0]);
  const [date2, setDate2] = createSignal("");

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_CALENDAR} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">Date & Time</HeadingText>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <ComponentViewer 
          title="Standard Date"
          code={`
<DatePicker 
  label="Birth Date"
  value={date()}
  onChange={setDate}
/>
          `}
        >
          <DatePicker 
            label="Select Birth Date"
            value={date1()}
            onChange={setDate1}
            class="w-full"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Scheduling"
          code={`
<DatePicker 
  label="Deadline"
  value={date()}
  onChange={setDate}
/>
          `}
        >
          <DatePicker 
            label="Schedule Deadline"
            value={date2()}
            onChange={setDate2}
            class="w-full"
          />
        </ComponentViewer>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        <Card class="p-8 border-none shadow-sm md:col-span-2 bg-theme/5 border border-theme/10">
           <p class="text-xs text-muted leading-relaxed">
             Our Date Picker component utilizes the native browser API for maximum compatibility and accessibility, 
             wrapped in a premium UI shell that ensures consistency with your design language.
           </p>
        </Card>
      </div>
    </PageWrapper>
  );
}
