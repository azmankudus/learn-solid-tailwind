import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_CALENDAR, ICON_CLOCK, ICON_ARROW_PATH } from '~/lib/icons';
import { CalendarField } from '~/components/input/CalendarField';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function DateTimePage() {
  const [date, setDate] = createSignal<string>("");
  const [time, setTime] = createSignal<string>("");
  const [time12, setTime12] = createSignal<string>("");
  const [timeSec, setTimeSec] = createSignal<string>("");
  const [datetime, setDatetime] = createSignal<string>("");
  const [datetime12, setDatetime12] = createSignal<string>("");
  const [datetimeSec, setDatetimeSec] = createSignal<string>("");
  const [dateRange, setDateRange] = createSignal<string[]>([]);
  const [timeRange, setTimeRange] = createSignal<string[]>([]);
  const [timeRange12, setTimeRange12] = createSignal<string[]>([]);
  const [timeRangeSec, setTimeRangeSec] = createSignal<string[]>([]);
  const [datetimeRange, setDatetimeRange] = createSignal<string[]>([]);
  const [datetimeRange12, setDatetimeRange12] = createSignal<string[]>([]);
  const [datetimeRangeSec, setDatetimeRangeSec] = createSignal<string[]>([]);
  const [dateEarlier, setDateEarlier] = createSignal<string>("");
  const [dateLater, setDateLater] = createSignal<string>("");
  const [dateExact, setDateExact] = createSignal<string>("");
  const [timeEarlier, setTimeEarlier] = createSignal<string>("");
  const [timeLater, setTimeLater] = createSignal<string>("");
  const [timeExact, setTimeExact] = createSignal<string>("");

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_CALENDAR} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Date & Time</HeadingText>
      </div>

      <div class="flex flex-col gap-6 md:gap-8 pb-12">

        <ComponentViewer 
          title="Date Picker"
          icon={<Icon icon={ICON_CALENDAR} />}
          description="Allows users to select a single date from a visual calendar."
          code={`<CalendarField type="date" label="Select Date" defaultToNow />`}
        >
          <CalendarField 
            type="date"
            label="Date"
            placeholder="Select date..."
            defaultToNow={true}
            value={date()}
            onChange={setDate}
            class="w-full max-w-sm"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Time Selection"
          icon={<Icon icon={ICON_CLOCK} />}
          description="Specific time selection with support for 12-hour or 24-hour formats."
          code={`<CalendarField type="time" label="24h Format" />
<CalendarField type="time" use12Hours label="12h AM/PM" />`}
        >
          <div class="flex flex-col gap-4 w-full max-w-sm">
            <CalendarField 
              type="time"
              label="Time (24h)"
              placeholder="Select time..."
              defaultToNow={true}
              value={time()}
              onChange={setTime}
              class="w-full"
            />
            <CalendarField 
              type="time"
              label="Time (12h AM/PM)"
              placeholder="Select time..."
              defaultToNow={true}
              use12Hours={true}
              value={time12()}
              onChange={setTime12}
              class="w-full"
            />
            <CalendarField 
              type="time"
              label="Time (with Seconds)"
              placeholder="Select time..."
              defaultToNow={true}
              showSeconds={true}
              value={timeSec()}
              onChange={setTimeSec}
              class="w-full"
            />
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Date and Time"
          icon={<Icon icon={ICON_ARROW_PATH} />}
          description="Combine date and time selection into a single input field."
          code={`<CalendarField type="datetime" label="Date and Time" />`}
        >
          <div class="flex flex-col gap-4 w-full max-w-sm">
            <CalendarField 
              type="datetime"
              label="DateTime (24h)"
              placeholder="Select date and time..."
              defaultToNow={true}
              value={datetime()}
              onChange={setDatetime}
              class="w-full"
            />
            <CalendarField 
              type="datetime"
              label="DateTime (12h AM/PM)"
              placeholder="Select date and time..."
              defaultToNow={true}
              use12Hours={true}
              value={datetime12()}
              onChange={setDatetime12}
              class="w-full"
            />
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Range Selection"
          icon={<Icon icon={ICON_CALENDAR} />}
          description="Allow users to select a range of dates or times."
          code={`<CalendarField type="date-range" label="Date Range" />`}
        >
          <div class="flex flex-col gap-4 w-full max-w-sm">
            <CalendarField 
              type="date-range"
              label="Date Range"
              placeholder="Select date range..."
              defaultToNow={true}
              value={dateRange()}
              onChange={setDateRange}
              class="w-full"
            />
            <CalendarField 
              type="time-range"
              label="Time Range"
              placeholder="Select time range..."
              defaultToNow={true}
              value={timeRange()}
              onChange={setTimeRange}
              class="w-full"
            />
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Validation"
          icon={<Icon icon={ICON_CALENDAR} />}
          description="Enforce constraints like selecting a date after today or before a specific day."
          code={`<CalendarField type="date" min={tomorrow} label="Future Only" />`}
        >
          <div class="flex flex-col gap-4 w-full max-w-sm">
            <CalendarField 
              type="date"
              label="Past Dates (Before Today)"
              placeholder="Pick a date in the past..."
              max={(() => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString(); })()}
              value={dateEarlier()}
              onChange={setDateEarlier}
              class="w-full"
            />
            <CalendarField 
              type="date"
              label="Future Dates (After Today)"
              placeholder="Pick a date in the future..."
              min={(() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString(); })()}
              value={dateLater()}
              onChange={setDateLater}
              class="w-full"
            />
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Disabled State"
          icon={<Icon icon={ICON_CALENDAR} />}
          description="Read-only display for date and time fields."
          code={`<CalendarField type="date" label="Disabled Date" disabled />`}
        >
          <div class="flex flex-col gap-4 w-full max-w-sm">
            <CalendarField 
              type="date"
              label="Disabled Date"
              defaultToNow={true}
              disabled={true}
              value={new Date().toISOString()}
              class="w-full"
            />
            <CalendarField 
              type="datetime"
              label="Disabled DateTime"
              defaultToNow={true}
              disabled={true}
              value={new Date().toISOString()}
              class="w-full"
            />
          </div>
        </ComponentViewer>

      </div>
    </PageWrapper>
  );
}
