import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_ADJUSTMENTS_HORIZONTAL } from '~/lib/icons';
import { Slider } from '~/components/input/Slider';
import { ComponentViewer } from '~/components/content/ComponentViewer';

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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <ComponentViewer 
          title="Standard Range"
          code={`
<Slider 
  label="System Volume"
  value={val()}
  onChange={setVal}
/>
          `}
        >
          <Slider 
            label="System Volume"
            value={val1()}
            onChange={setVal1}
            class="w-full"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Discrete Steps"
          code={`
<Slider 
  label="Brightness Level"
  value={val()}
  min={0}
  max={100}
  step={10}
  onChange={setVal}
/>
          `}
        >
          <Slider 
            label="Brightness Level"
            value={val2()}
            min={0}
            max={100}
            step={10}
            onChange={setVal2}
            class="w-full"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Wide Range Control"
          code={`
<Slider 
  label="Zoom Percentage"
  min={10}
  max={400}
  value={val()}
  onChange={setVal}
/>
          `}
        >
          <Slider 
            label="Zoom Percentage"
            min={10}
            max={400}
            value={val3()}
            onChange={setVal3}
            class="w-full"
          />
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
