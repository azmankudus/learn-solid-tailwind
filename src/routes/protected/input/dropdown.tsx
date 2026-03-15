import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_CHART_BAR, ICON_FLAG_US, ICON_FLAG_MY, ICON_FLAG_CN, ICON_FLAG_JP } from '~/lib/icons';
import { Dropdown } from '~/components/input/Dropdown';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function DropdownPage() {
  const [selected1, setSelected1] = createSignal("option1");
  const [selected2, setSelected2] = createSignal("us");
  const [selected3, setSelected3] = createSignal("item1");

  const options1 = [
    { value: "option1", label: "Option 1 (Default)" },
    { value: "option2", label: "Option 2 (New)" },
    { value: "option3", label: "Option 3 (Archived)" },
  ];

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "my", label: "Malaysia" },
    { value: "cn", label: "China" },
    { value: "jp", label: "Japan" },
  ];

  const renderCountryIcon = (val: string) => {
    const iconMap: Record<string, any> = {
      us: ICON_FLAG_US,
      my: ICON_FLAG_MY,
      cn: ICON_FLAG_CN,
      jp: ICON_FLAG_JP
    };
    return <Icon icon={iconMap[val]} width={20} height={20} />;
  };

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_CHART_BAR} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">Dropdowns</HeadingText>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <ComponentViewer 
          title="Standard Dropdown"
          code={`
<Dropdown 
  value={selected()} 
  options={options} 
  onChange={setSelected} 
/>
          `}
        >
          <Dropdown 
            value={selected1()} 
            options={options1} 
            onChange={setSelected1} 
            class="max-w-xs w-full"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Searchable with Icons"
          code={`
<Dropdown 
  value={selected()} 
  options={options} 
  onChange={setSelected} 
  renderIcon={(val) => <Icon icon={...} />}
  searchable={true}
/>
          `}
        >
          <Dropdown 
            value={selected2()} 
            options={countryOptions} 
            onChange={setSelected2} 
            renderIcon={renderCountryIcon}
            searchable={true}
            class="max-w-xs w-full"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Inline Variant"
          code={`
<Dropdown 
  value={selected()} 
  options={options} 
  onChange={setSelected} 
  variant="inline"
/>
          `}
        >
          <Dropdown 
            value={selected3()} 
            options={[
              { value: "item1", label: "Low Priority" },
              { value: "item2", label: "Medium Priority" },
              { value: "item3", label: "High Priority" },
            ]} 
            onChange={setSelected3} 
            variant="inline"
            class="max-w-xs w-full"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Disabled State"
          code={`
<Dropdown 
  value="locked" 
  options={options} 
  disabled={true}
/>
          `}
        >
          <Dropdown 
            value="disabled" 
            options={[{ value: "disabled", label: "Locked Option" }]} 
            onChange={() => {}} 
            disabled={true}
            class="max-w-xs w-full"
          />
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
