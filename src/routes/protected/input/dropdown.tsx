import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { 
  ICON_CHART_BAR, ICON_FLAG_US, ICON_FLAG_MY, 
  ICON_FLAG_CN, ICON_FLAG_JP, ICON_BOLT,
  ICON_LIST_BULLET, ICON_X_MARK
} from '~/lib/icons';
import { Dropdown } from '~/components/input/Dropdown';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function DropdownPage() {
  const [selected1, setSelected1] = createSignal("option1");
  const [selected2, setSelected2] = createSignal("us");
  const [selectedMulti, setSelectedMulti] = createSignal(["us", "my"]);
  const [selectedSearch, setSelectedSearch] = createSignal("item1");

  const options1 = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "my", label: "Malaysia" },
    { value: "cn", label: "China" },
    { value: "jp", label: "Japan" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
  ];

  const renderCountryIcon = (val: string) => {
    const iconMap: Record<string, any> = {
      us: ICON_FLAG_US,
      my: ICON_FLAG_MY,
      cn: ICON_FLAG_CN,
      jp: ICON_FLAG_JP
    };
    return <Icon icon={iconMap[val] || ICON_BOLT} width={18} height={18} />;
  };

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_LIST_BULLET} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Dropdown</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Multi-Select"
          icon={<Icon icon={ICON_LIST_BULLET} />}
          description="Allows users to select multiple options from the list, displayed as tags."
          code={`
<Dropdown 
  multiple={true}
  value={selected()} 
  options={options} 
  onChange={setSelected} 
/>
          `}
        >
          <div class="flex flex-col gap-4 w-full max-w-sm">
            <Dropdown 
              multiple={true}
              value={selectedMulti()} 
              options={countryOptions} 
              onChange={setSelectedMulti} 
              renderIcon={renderCountryIcon}
              placeholder="Select Countries"
              class="w-full"
            />
            <div class="p-4 rounded-xl bg-surface border border-input-border">
               <span class="text-[9px] font-bold text-muted uppercase tracking-wider mb-2 block">Selected Values</span>
               <code class="text-[10px] font-mono text-theme">
                 {JSON.stringify(selectedMulti())}
               </code>
            </div>
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Searchable Dropdown"
          icon={<Icon icon={ICON_BOLT} />}
          description="Enable users to search through a long list of options."
          code={`
<Dropdown 
  searchable={true}
  value={selected()} 
  options={options} 
  onChange={setSelected} 
/>
          `}
        >
          <div class="flex flex-col gap-4 w-full max-w-sm">
            <Dropdown 
              searchable={true}
              value={selectedSearch()} 
              options={[
                { value: "item1", label: "Dashboard" },
                { value: "item2", label: "Settings" },
                { value: "item3", label: "Analytics" },
                { value: "item4", label: "Database" },
                { value: "item5", label: "Cloud Storage" },
              ]} 
              onChange={setSelectedSearch} 
              placeholder="Search items..."
              class="w-full"
            />
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Basic Dropdown"
          icon={<Icon icon={ICON_FLAG_US} />}
          description="A standard dropdown for single option selection."
          code={`
<Dropdown 
  value={selected()} 
  options={options} 
  onChange={setSelected} 
/>
          `}
        >
          <Dropdown 
            value={selected2()} 
            options={countryOptions.slice(0, 4)} 
            onChange={setSelected2} 
            renderIcon={renderCountryIcon}
            class="max-w-xs w-full"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Disabled State"
          icon={<Icon icon={ICON_X_MARK} />}
          description="Prevent user interaction for inactive dropdowns."
          code={`
<Dropdown 
  value="disabled" 
  options={options} 
  disabled={true}
/>
          `}
        >
          <Dropdown 
            value="disabled" 
            options={[{ value: "disabled", label: "Option Locked" }]} 
            onChange={() => {}} 
            disabled={true}
            class="max-w-xs w-full"
          />
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
