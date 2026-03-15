import { createSignal, Show } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_CALENDAR, ICON_SPARKLES } from '~/lib/icons';
import { DatePicker } from '~/components/input/DatePicker';

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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Date Selection */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Standard Date</HeadingText>
          <DatePicker 
            label="Select Birth Date"
            value={date1()}
            onChange={setDate1}
          />
          <div class="p-4 bg-surface rounded-xl border border-input-border text-xs text-center">
            Currently: <span class="font-bold text-theme">{date1()}</span>
          </div>
        </Card>

        {/* Schedule Task */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Scheduling</HeadingText>
          <DatePicker 
            label="Schedule Deadline"
            value={date2()}
            onChange={setDate2}
          />
          <Show when={date2()}>
            <div class="flex items-center gap-2 p-3 bg-emerald-500/5 text-emerald-500 rounded-xl border border-emerald-500/10 text-xs font-bold animate-fade-in">
              <Icon icon={ICON_SPARKLES} />
              Task scheduled for {date2()}
            </div>
          </Show>
        </Card>

        {/* Info Card */}
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
