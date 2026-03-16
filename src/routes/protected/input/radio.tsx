import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_LIST_BULLET, ICON_PALETTE, ICON_SWATCH, ICON_X_MARK } from '~/lib/icons';
import { Radio } from '~/components/input/Radio';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function RadioPage() {
  const [val1, setVal1] = createSignal("light");
  const [val2, setVal2] = createSignal("weekly");
  const [val3, setVal3] = createSignal("disabled");

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_LIST_BULLET} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Radio</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-12">
        <ComponentViewer 
          title="Basic Radio"
          icon={<Icon icon={ICON_PALETTE} />}
          description="Allows users to select a single option from a list of mutual exclusive choices."
          code={`
<Radio
  value={val()}
  onChange={setVal}
  options={[
    { id: "light", label: "Light" },
    { id: "dark", label: "Dark" },
    { id: "system", label: "System" }
  ]}
/>
          `}
        >
          <Radio
            class="w-full max-w-sm"
            value={val1()}
            onChange={setVal1}
            options={[
              { id: "light", label: "Light Mode" },
              { id: "dark", label: "Dark Mode" },
              { id: "system", label: "System Default" }
            ]}
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Selection Options"
          icon={<Icon icon={ICON_SWATCH} />}
          description="Use descriptive labels for each radio option to guide the user."
          code={`
<Radio
  value={val()}
  onChange={setVal}
  options={[
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" }
  ]}
/>
          `}
        >
          <Radio
            class="w-full max-w-sm"
            value={val2()}
            onChange={setVal2}
            options={[
              { id: "daily", label: "Daily" },
              { id: "weekly", label: "Weekly" },
              { id: "monthly", label: "Monthly" }
            ]}
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Disabled State"
          icon={<Icon icon={ICON_X_MARK} />}
          description="Prevent selection of specific options when they are unavailable."
          code={`
<Radio
  value="locked"
  disabled={true}
  options={[{ id: "locked", label: "Unavailable" }]}
/>
          `}
        >
          <Radio
            class="w-full max-w-sm"
            value={val3()}
            onChange={() => {}}
            disabled={true}
            options={[
              { id: "disabled", label: "Option Disabled" },
              { id: "restricted", label: "Premium Only" }
            ]}
          />
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
