import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_ADJUSTMENTS_HORIZONTAL, ICON_SWATCH, ICON_BOLT } from '~/lib/icons';
import { Slider } from '~/components/input/Slider';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function SliderPage() {
  const [val1, setVal1] = createSignal(50);
  const [val2, setVal2] = createSignal(25);
  const [rangeVal, setRangeVal] = createSignal<[number, number]>([20, 80]);

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_ADJUSTMENTS_HORIZONTAL} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Slider</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Basic Slider"
          icon={<Icon icon={ICON_SWATCH} />}
          description="A standard slider for selecting a single numeric value from a range."
          code={`
<Slider 
  label="Volume"
  value={val()} 
  onChange={setVal} 
  min={0}
  max={100}
/>
          `}
        >
          <div class="flex flex-col gap-4 w-full max-w-sm">
             <Slider 
              label="Volume Level"
              value={val1()} 
              onChange={setVal1} 
              min={0}
              max={100}
              class="w-full"
            />
            <div class="flex justify-between px-1">
               <span class="text-[10px] font-bold text-muted uppercase">Min</span>
               <span class="text-[10px] font-bold text-theme">{val1()}%</span>
               <span class="text-[10px] font-bold text-muted uppercase">Max</span>
            </div>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Range Slider"
          icon={<Icon icon={ICON_BOLT} />}
          description="A slider with two handles for selecting a start and end value."
          code={`
<Slider 
  label="Price Range"
  value={range()} 
  onChange={setRange} 
  min={0}
  max={100}
/>
          `}
        >
          <div class="flex flex-col gap-6 w-full max-w-sm">
            <Slider 
              label="Select Price Range"
              value={rangeVal()} 
              onChange={setRangeVal} 
              min={0}
              max={100}
              class="w-full"
            />
            
            <div class="grid grid-cols-2 gap-4">
               <div class="p-4 bg-surface rounded-2xl border border-input-border">
                  <span class="text-[9px] font-bold text-muted uppercase tracking-wider mb-1 block">Minimum</span>
                  <span class="text-lg font-bold text-main">${rangeVal()[0]}</span>
               </div>
               <div class="p-4 bg-surface rounded-2xl border border-input-border text-right">
                  <span class="text-[9px] font-bold text-muted uppercase tracking-wider mb-1 block">Maximum</span>
                  <span class="text-lg font-bold text-main">${rangeVal()[1]}</span>
               </div>
            </div>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Custom Bounds"
          icon={<Icon icon={ICON_ADJUSTMENTS_HORIZONTAL} />}
          description="Adjust the min, max, and label of the slider to fit your needs."
          code={`
<Slider 
  label="Brightness"
  value={val()} 
  onChange={setVal} 
  min={0}
  max={50}
/>
          `}
        >
          <Slider 
            label="LCD Brightness"
            value={val2()} 
            onChange={setVal2} 
            min={0}
            max={50}
            class="w-full max-w-sm"
          />
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
