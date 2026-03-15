import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_ADJUSTMENTS_HORIZONTAL, ICON_SPARKLES } from '~/lib/icons';
import { Slider } from '~/components/input/Slider';

export default function SliderPage() {
  const [val1, setVal1] = createSignal(50);
  const [val2, setVal2] = createSignal(20);
  const [val3, setVal3] = createSignal(75);

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_ADJUSTMENTS_HORIZONTAL} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">Sliders</HeadingText>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Slider */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-8">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Standard Range</HeadingText>
          <Slider 
            label="System Volume"
            value={val1()}
            onChange={setVal1}
          />
        </Card>

        {/* Discrete Slider */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-8">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Discrete Steps</HeadingText>
          <Slider 
            label="Brightness Level"
            value={val2()}
            min={0}
            max={100}
            step={10}
            onChange={setVal2}
          />
          <p class="text-[10px] text-muted text-center italic">* Increments of 10%</p>
        </Card>

        {/* Large Range */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-8 md:col-span-2">
          <div class="flex items-center gap-3 mb-2">
            <Icon icon={ICON_SPARKLES} class="text-theme" />
            <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Wide Range Control</HeadingText>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <Slider 
              label="Zoom Percentage"
              min={10}
              max={400}
              value={val3()}
              onChange={setVal3}
            />
            <div class="p-6 bg-surface rounded-2xl border border-input-border flex flex-col justify-center items-center gap-2">
              <span class="text-xs font-bold text-muted uppercase tracking-tighter">Current Output</span>
              <span class="text-4xl font-black text-theme">{val3()}%</span>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
