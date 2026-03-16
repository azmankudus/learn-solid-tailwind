import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_ADJUSTMENTS_HORIZONTAL, ICON_BOLT, ICON_CUBE } from '~/lib/icons';
import { NumberStepper } from '~/components/input/NumberStepper';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function StepperPage() {
  const [val1, setVal1] = createSignal(10);
  const [val2, setVal2] = createSignal(0.5);
  const [val3, setVal3] = createSignal(100);

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_ADJUSTMENTS_HORIZONTAL} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Number Stepper</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Basic Stepper"
          icon={<Icon icon={ICON_CUBE} />}
          description="Adjust a numeric value using increment and decrement buttons."
          code={`
<NumberStepper 
  label="Quantity"
  value={val()} 
  onChange={setVal} 
  min={0}
  max={50}
/>
          `}
        >
          <NumberStepper 
            label="Item Quantity"
            value={val1()} 
            onChange={setVal1} 
            min={0}
            max={50}
            class="max-w-xs"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Step Precision"
          icon={<Icon icon={ICON_BOLT} />}
          description="Control the increment amount, including support for decimal values."
          code={`
<NumberStepper 
  label="Weight"
  value={val()} 
  onChange={setVal} 
  step={0.1}
/>
          `}
        >
          <NumberStepper 
            label="Weight (kg)"
            value={val2()} 
            onChange={setVal2} 
            step={0.1}
            min={0}
            max={5}
            class="max-w-xs"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Disabled State"
          icon={<Icon icon={ICON_ADJUSTMENTS_HORIZONTAL} />}
          description="Prevent changes to the numeric value when the input is disabled."
          code={`
<NumberStepper 
  label="Fixed Price"
  value={100} 
  disabled={true}
/>
          `}
        >
          <NumberStepper 
            label="Remaining Balance"
            value={val3()} 
            onChange={setVal3} 
            disabled={true}
            class="max-w-xs"
          />
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
