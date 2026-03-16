import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Accordion } from '~/components/content/Accordion';
import { Icon } from '@iconify-icon/solid';
import { ICON_SQUARE_3_STACK, ICON_SPARKLES, ICON_BOLT, ICON_SHIELD_CHECK } from '~/lib/icons';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function AccordionPage() {
  const faqItems = [
    {
      id: "faq-01",
      title: "What is this library?",
      icon: ICON_SPARKLES,
      content: "This is a comprehensive UI library built using SolidJS and Tailwind CSS, designed to help developers build beautiful applications faster."
    },
    {
      id: "faq-02",
      title: "How do I install it?",
      icon: ICON_BOLT,
      content: "You can install the core package via npm or yarn. Detailed instructions are available in the integration guide."
    },
    {
      id: "faq-03",
      title: "Is it open source?",
      icon: ICON_SHIELD_CHECK,
      content: "Yes, the library is fully open source under the MIT license. Feel free to contribute or use it in your personal and commercial projects."
    }
  ];

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_SQUARE_3_STACK} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Accordion</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Single Expansion"
          icon={<Icon icon={ICON_SPARKLES} />}
          description="Only one item can be expanded at a time. Expanding a new item collapses the previous one."
          code={`
<Accordion items={faqItems} allowMultiple={false} />
          `}
        >
          <div class="max-w-2xl">
            <Accordion items={faqItems} />
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Multiple Expansion"
          icon={<Icon icon={ICON_BOLT} />}
          description="Allows multiple items to be expanded simultaneously."
          code={`
<Accordion items={faqItems} allowMultiple={true} />
          `}
        >
          <div class="max-w-2xl">
            <Accordion items={faqItems} allowMultiple={true} />
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
