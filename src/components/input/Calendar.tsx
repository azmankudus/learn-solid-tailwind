import { createSignal, For, Show, createMemo, createEffect, on } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_CHEVRON_LEFT, ICON_CHEVRON_RIGHT, ICON_CALENDAR, ICON_CLOCK, ICON_CHEVRON_DOWN } from "~/lib/icons";
import { Dropdown } from "./Dropdown";

export interface CalendarProps {
  type?: 'date' | 'time' | 'datetime' | 'date-range' | 'time-range' | 'datetime-range';
  label?: string;
  value?: string | string[];
  onChange?: (val: any) => void;
  showSeconds?: boolean;
  use12Hours?: boolean;
  defaultToNow?: boolean;
  class?: string;
}

function TimePickerPart(props: {
  label: string,
  value: string | string[],
  type: CalendarProps['type'],
  showSeconds?: boolean,
  use12Hours?: boolean,
  isEnd?: boolean,
  onChange: (val: any) => void
}) {
  const getInitialTime = () => {
    let date = new Date();
    if (props.type?.includes('range')) {
      const idx = props.isEnd ? 1 : 0;
      if (Array.isArray(props.value) && props.value[idx]) {
        date = new Date(props.value[idx]);
      }
    } else if (typeof props.value === 'string' && props.value !== "") {
      date = new Date(props.value);
    }
    return date;
  };

  const initialDate = getInitialTime();
  const [hours, setHours] = createSignal(props.use12Hours ? (initialDate.getHours() % 12 || 12) : initialDate.getHours());
  const [minutes, setMinutes] = createSignal(initialDate.getMinutes());
  const [seconds, setSeconds] = createSignal(initialDate.getSeconds());
  const [ampm, setAmpm] = createSignal(initialDate.getHours() >= 12 ? 'PM' : 'AM');

  createEffect(() => {
    const d = getInitialTime();
    setHours(props.use12Hours ? (d.getHours() % 12 || 12) : d.getHours());
    setMinutes(d.getMinutes());
    setSeconds(d.getSeconds());
    setAmpm(d.getHours() >= 12 ? 'PM' : 'AM');
  });

  const updateTime = () => {
    let h = hours();
    if (props.use12Hours) {
      if (ampm() === 'PM' && h < 12) h += 12;
      if (ampm() === 'AM' && h === 12) h = 0;
    }

    let date = getInitialTime();
    date.setHours(h);
    date.setMinutes(minutes());
    date.setSeconds(seconds());

    if (props.type?.includes('range')) {
      const current = Array.isArray(props.value) ? [...props.value] : ["", ""];
      current[props.isEnd ? 1 : 0] = date.toISOString();
      props.onChange(current);
    } else {
      props.onChange(date.toISOString());
    }
  };

  const hourOptions = createMemo(() => {
    const range = props.use12Hours ? 12 : 24;
    return Array.from({ length: range }, (_, i) => props.use12Hours ? i + 1 : i);
  });

  return (
    <div class="flex flex-col gap-1 w-full">
      <Show when={props.label}>
        <span class="text-xs font-black text-muted uppercase tracking-tighter ml-1">{props.label}</span>
      </Show>
      <div class="flex items-center gap-1.5 h-9">
        <div class="min-w-[55px] h-full font-bold text-xs uppercase tracking-tighter">
          <Dropdown
            value={hours().toString()}
            options={hourOptions().map(h => ({ value: h.toString(), label: h.toString().padStart(2, '0') }))}
            onChange={(val) => { setHours(parseInt(val)); updateTime(); }}
            textAlign="right"
            class="h-full"
          />
        </div>

        <span class="text-muted font-bold">:</span>

        <div class="min-w-[55px] h-full">
          <Dropdown
            value={minutes().toString()}
            options={Array.from({ length: 60 }, (_, i) => ({ value: i.toString(), label: i.toString().padStart(2, '0') }))}
            onChange={(val) => { setMinutes(parseInt(val)); updateTime(); }}
            textAlign="right"
            class="h-full"
          />
        </div>

        <Show when={props.showSeconds}>
          <span class="text-muted font-bold">:</span>
          <div class="min-w-[55px] h-full">
            <Dropdown
              value={seconds().toString()}
              options={Array.from({ length: 60 }, (_, i) => ({ value: i.toString(), label: i.toString().padStart(2, '0') }))}
              onChange={(val) => { setSeconds(parseInt(val)); updateTime(); }}
              textAlign="right"
              class="h-full"
            />
          </div>
        </Show>

        <Show when={props.use12Hours}>
          <div class="min-w-[65px] h-full">
            <Dropdown
              value={ampm()}
              options={[{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }]}
              onChange={(val) => { setAmpm(val); updateTime(); }}
              textAlign="left"
              class="h-full !text-theme-solid !text-[11px]"
            />
          </div>
        </Show>
      </div>
    </div>
  );
}

export function Calendar(props: CalendarProps) {
  const [currentDate, setCurrentDate] = createSignal(new Date());
  const [viewMode, setViewMode] = createSignal<'days' | 'months' | 'years'>('days');
  const [selectedDate, setSelectedDate] = createSignal<Date | null>(null);
  const [rangeStart, setRangeStart] = createSignal<Date | null>(null);
  const [rangeEnd, setRangeEnd] = createSignal<Date | null>(null);
  const [navDir, setNavDir] = createSignal<'left' | 'right' | 'fade'>('fade');
  const [animKey, setAnimKey] = createSignal(0);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthData = createMemo(() => {
    const year = currentDate().getFullYear();
    const month = currentDate().getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevMonthDays = new Date(year, month, 0).getDate();
    const prevDays = Array.from({ length: firstDay }, (_, i) => ({
      day: prevMonthDays - firstDay + i + 1,
      currentMonth: false,
      date: new Date(year, month - 1, prevMonthDays - firstDay + i + 1)
    }));

    const currentDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      currentMonth: true,
      date: new Date(year, month, i + 1)
    }));

    const nextDays = Array.from({ length: 42 - prevDays.length - currentDays.length }, (_, i) => ({
      day: i + 1,
      currentMonth: false,
      date: new Date(year, month + 1, i + 1)
    }));

    return [...prevDays, ...currentDays, ...nextDays];
  });

  const yearRange = createMemo(() => {
    const start = Math.floor(currentDate().getFullYear() / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => start + i);
  });

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date): boolean => {
    if (props.type?.includes('range')) {
      if (Array.isArray(props.value) && props.value.length === 2) {
        const s = props.value[0] ? new Date(props.value[0]) : null;
        const e = props.value[1] ? new Date(props.value[1]) : null;
        return !!(s && date.toDateString() === s.toDateString()) || !!(e && date.toDateString() === e.toDateString());
      }
      return !!(rangeStart() && date.toDateString() === rangeStart()!.toDateString()) ||
        !!(rangeEnd() && date.toDateString() === rangeEnd()!.toDateString());
    }

    if (props.value && typeof props.value === 'string' && props.value !== "") {
      const d = new Date(props.value);
      return date.toDateString() === d.toDateString();
    }
    return !!(selectedDate() && date.toDateString() === selectedDate()!.toDateString());
  };

  const isInRange = (date: Date) => {
    let s: Date | null = rangeStart();
    let e: Date | null = rangeEnd();

    if (Array.isArray(props.value) && props.value.length === 2) {
      s = props.value[0] ? new Date(props.value[0]) : s;
      e = props.value[1] ? new Date(props.value[1]) : e;
    }

    if (!s || !e) return false;
    const d = new Date(date); d.setHours(0, 0, 0, 0);
    const start = new Date(s); start.setHours(0, 0, 0, 0);
    const end = new Date(e); end.setHours(0, 0, 0, 0);
    return d > start && d < end;
  };

  const isRangeStart = (date: Date) => {
    if (!props.type?.includes('range')) return false;
    let s: Date | null = rangeStart();
    if (Array.isArray(props.value) && props.value[0]) s = new Date(props.value[0]);
    return s ? date.toDateString() === s.toDateString() : false;
  };

  const isRangeEnd = (date: Date) => {
    if (!props.type?.includes('range')) return false;
    let e: Date | null = rangeEnd();
    if (Array.isArray(props.value) && props.value[1]) e = new Date(props.value[1]);
    return e ? date.toDateString() === e.toDateString() : false;
  };

  const handleDateClick = (date: Date) => {
    if (props.type?.includes('range')) {
      if (!rangeStart() || (rangeStart() && rangeEnd())) {
        setRangeStart(date);
        setRangeEnd(null);
        // Emit partial range (start only)
        props.onChange?.([date.toISOString(), ""]);
      } else {
        if (date < rangeStart()!) {
          setRangeEnd(rangeStart());
          setRangeStart(date);
        } else {
          setRangeEnd(date);
        }
        props.onChange?.([rangeStart()!.toISOString(), rangeEnd()!.toISOString()]);
      }
    } else {
      const newDate = new Date(date);
      if (props.value && typeof props.value === 'string') {
        const old = new Date(props.value);
        newDate.setHours(old.getHours(), old.getMinutes(), old.getSeconds());
      }
      setSelectedDate(newDate);
      props.onChange?.(newDate.toISOString());
    }
  };

  createEffect(on(viewMode, () => {
    setNavDir('fade');
    setAnimKey(k => k + 1);
  }, { defer: true }));

  const nextHeader = () => {
    setNavDir('right');
    setAnimKey(k => k + 1);
    if (viewMode() === 'days') setCurrentDate(new Date(currentDate().getFullYear(), currentDate().getMonth() + 1, 1));
    else if (viewMode() === 'months') setCurrentDate(new Date(currentDate().getFullYear() + 1, currentDate().getMonth(), 1));
    else if (viewMode() === 'years') setCurrentDate(new Date(currentDate().getFullYear() + 12, currentDate().getMonth(), 1));
  };

  const prevHeader = () => {
    setNavDir('left');
    setAnimKey(k => k + 1);
    if (viewMode() === 'days') setCurrentDate(new Date(currentDate().getFullYear(), currentDate().getMonth() - 1, 1));
    else if (viewMode() === 'months') setCurrentDate(new Date(currentDate().getFullYear() - 1, currentDate().getMonth(), 1));
    else if (viewMode() === 'years') setCurrentDate(new Date(currentDate().getFullYear() - 12, currentDate().getMonth(), 1));
  };

  const isTimeOnly = () => props.type === 'time' || props.type === 'time-range';

  return (
    <div class={`flex flex-col gap-2 ${props.class || ""}`}>
      <Show when={props.label}>
        <label class="text-[0.8rem] font-bold text-main ml-1 tracking-wide">{props.label}</label>
      </Show>

      <div
        class="bg-solid rounded-2xl p-3 shadow-xl flex flex-col transition-all duration-300 overflow-visible"
        classList={{
          "min-h-[310px] min-w-[340px]": !isTimeOnly(),
          "min-h-0": isTimeOnly(),
          "w-max": isTimeOnly(),
          "w-full": !isTimeOnly()
        }}
      >
        <Show when={!isTimeOnly()}>
          {/* Header */}
          <div class="flex items-center justify-between mb-3 px-1 shrink-0">
            <div class="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode() === 'months' ? 'days' : 'months')}
                class="text-lg font-black text-main hover:text-theme transition-colors leading-none"
              >
                {months[currentDate().getMonth()]}
              </button>
              <button
                onClick={() => setViewMode(viewMode() === 'years' ? 'days' : 'years')}
                class="text-lg font-black text-theme hover:scale-110 transition-transform leading-none"
              >
                {currentDate().getFullYear()}
              </button>
            </div>
            <div class="flex items-center gap-1">
              <button onClick={prevHeader} class="p-1 rounded-xl hover:bg-hover text-muted hover:text-main transition-colors">
                <Icon icon={ICON_CHEVRON_LEFT} width={18} height={18} />
              </button>
              <button onClick={nextHeader} class="p-1 rounded-xl hover:bg-hover text-muted hover:text-main transition-colors">
                <Icon icon={ICON_CHEVRON_RIGHT} width={18} height={18} />
              </button>
            </div>
          </div>

          <div class="flex-1 min-h-[200px] relative overflow-hidden">
            <For each={[animKey()]}>{(key) => (
              <div 
                class="w-full h-full"
                classList={{
                  "animate-slide-in-right": navDir() === 'right',
                  "animate-slide-in-left": navDir() === 'left',
                  "animate-fade-in": navDir() === 'fade'
                }}
              >
            <Show when={viewMode() === 'days'}>
              <div>
                <div class="grid grid-cols-7 mb-0.5 px-1 border-b border-input-border/50 pb-1.5">
                  <For each={days}>{(day) => <span class="flex items-center justify-center text-[10px] font-black text-muted uppercase tracking-tighter h-5">{day}</span>}</For>
                </div>
                <div class="grid grid-cols-7 gap-0.5 mt-2">
                  <For each={monthData()}>{(item) => (
                    <button
                      onClick={() => handleDateClick(item.date)}
                      class="relative h-8 w-full flex items-center justify-center text-sm font-bold transition-all duration-200"
                      classList={{
                        "text-muted/20": !item.currentMonth && !isSelected(item.date) && !isInRange(item.date),
                        "text-main": item.currentMonth && !isSelected(item.date) && !isInRange(item.date),
                        "ring-2 ring-theme/40 text-theme-solid font-black": isToday(item.date) && !isSelected(item.date),
                        "bg-theme !text-white shadow-md z-10 rounded-xl": isSelected(item.date),
                        "hover:bg-hover active:scale-95": !isSelected(item.date) && !isInRange(item.date),
                        "rounded-xl": (!isInRange(item.date) && !isRangeStart(item.date) && !isRangeEnd(item.date)) || (isRangeStart(item.date) && isRangeEnd(item.date)),
                        "rounded-l-xl": isRangeStart(item.date) && !isRangeEnd(item.date),
                        "rounded-r-xl": isRangeEnd(item.date) && !isRangeStart(item.date),
                      }}
                      style={isInRange(item.date) || (isSelected(item.date) && (props.type?.includes('range') || false)) ? { "background-color": isSelected(item.date) ? undefined : "color-mix(in srgb, var(--primary), transparent 80%)", "color": isSelected(item.date) ? undefined : "var(--primary)" } : {}}
                    >
                      {item.day}
                    </button>
                  )}</For>
                </div>
              </div>
            </Show>

            <Show when={viewMode() === 'months'}>
              <div>
                <div class="grid grid-cols-3 gap-2 py-4">
                  <For each={months}>{(m, i) => (
                    <button
                      onClick={() => { setCurrentDate(new Date(currentDate().getFullYear(), i(), 1)); setViewMode('days'); }}
                      class="h-12 flex items-center justify-center text-sm font-bold rounded-2xl transition-all border border-transparent hover:border-theme/30 hover:bg-theme/5 hover:text-theme"
                      classList={{ "bg-theme !text-white !border-theme shadow-lg": currentDate().getMonth() === i() }}
                    >
                      {m.substring(0, 3)}
                    </button>
                  )}</For>
                </div>
              </div>
            </Show>

            <Show when={viewMode() === 'years'}>
              <div>
                <div class="grid grid-cols-3 gap-2 py-4">
                  <For each={yearRange()}>{(y) => (
                    <button
                      onClick={() => { setCurrentDate(new Date(y, currentDate().getMonth(), 1)); setViewMode('days'); }}
                      class="h-12 flex items-center justify-center text-xs font-bold rounded-2xl transition-all border border-transparent hover:border-theme/30 hover:bg-theme/5 hover:text-theme"
                      classList={{ "bg-theme !text-white !border-theme shadow-lg": currentDate().getFullYear() === y }}
                    >
                      {y}
                    </button>
                  )}</For>
                </div>
              </div>
            </Show>
          </div>
        )}</For>
          </div>
        </Show>

        {/* Time Selection */}
        <Show when={props.type?.includes('time')}>
          <div class="mt-auto flex flex-col gap-3" classList={{ "pt-4 border-t border-input-border": !isTimeOnly() }}>
            <Show when={props.type?.includes('range')}>
              {/* Side-by-side From / To layout for ranges */}
              <div class="flex gap-4">
                <div class="flex-1">
                  <TimePickerPart
                    label="From"
                    value={props.value || ""}
                    type={props.type}
                    showSeconds={props.showSeconds}
                    use12Hours={props.use12Hours}
                    onChange={props.onChange || (() => { })}
                  />
                </div>
                <div class="flex-1">
                  <TimePickerPart
                    label="To"
                    value={props.value || ""}
                    type={props.type}
                    isEnd={true}
                    showSeconds={props.showSeconds}
                    use12Hours={props.use12Hours}
                    onChange={props.onChange || (() => { })}
                  />
                </div>
              </div>
            </Show>
            <Show when={!props.type?.includes('range')}>
              <TimePickerPart
                label=""
                value={props.value || ""}
                type={props.type}
                showSeconds={props.showSeconds}
                use12Hours={props.use12Hours}
                onChange={props.onChange || (() => { })}
              />
            </Show>
          </div>
        </Show>

        {/* Now Button */}
        <div class="flex justify-end pt-2 px-1">
          <button
            onClick={() => {
              const now = new Date();
              setCurrentDate(now);
              setSelectedDate(now);
              if (props.type?.includes('range')) {
                const iso = now.toISOString();
                setRangeStart(now);
                setRangeEnd(now);
                props.onChange?.([iso, iso]);
              } else {
                props.onChange?.(now.toISOString());
              }
            }}
            class="px-4 py-1.5 rounded-xl bg-theme text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md"
          >
            Now
          </button>
        </div>
      </div>
    </div>
  );
}
