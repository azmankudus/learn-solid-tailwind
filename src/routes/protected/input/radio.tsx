import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_MOON, ICON_SUN, ICON_BOOK_OPEN, ICON_COG } from '~/lib/icons';
import { Radio } from '~/components/input/Radio';

export default function RadioPage() {
  const [selected1, setSelected1] = createSignal("light");
  const [selected2, setSelected2] = createSignal("monthly");

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_COG} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">Radio Buttons</HeadingText>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Theme Selection */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Theme Mode</HeadingText>
          <div class="w-full max-w-xs">
            <Radio 
              value={selected1()} 
              options={[
                { id: "light", label: "Light", icon: () => <Icon icon={ICON_SUN} />, tooltip: "Switch to light mode" },
                { id: "dark", label: "Dark", icon: () => <Icon icon={ICON_MOON} />, tooltip: "Switch to dark mode" }
              ]} 
              onChange={setSelected1} 
            />
          </div>
          <p class="text-[10px] text-muted font-medium italic">Active mode: <span class="capitalize text-theme">{selected1()}</span></p>
        </Card>

        {/* Subscription Plan */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Billing Cycle</HeadingText>
          <div class="w-full max-w-xs">
            <Radio 
              value={selected2()} 
              options={[
                { id: "monthly", label: "Monthly", tooltip: "Pay month to month" },
                { id: "yearly", label: "Yearly", tooltip: "Save 20% with annual billing" }
              ]} 
              onChange={setSelected2} 
            />
          </div>
          <p class="text-[10px] text-muted font-medium italic">Selected cycle: <span class="capitalize text-theme">{selected2()}</span></p>
        </Card>

        {/* Informational Card */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-4 md:col-span-2 bg-theme/5 border-theme/10">
          <div class="flex items-center gap-3 text-theme">
            <Icon icon={ICON_BOOK_OPEN} width={20} height={20} />
            <HeadingText level={4} class="text-sm font-bold">Component Details</HeadingText>
          </div>
          <p class="text-xs text-muted leading-relaxed">
            The Radio component featured here is a custom-built toggle switch designed for binary choices. 
            It features smooth sliding animations, support for icons, and integrated tooltips for enhanced accessibility.
          </p>
        </Card>
      </div>
    </PageWrapper>
  );
}
