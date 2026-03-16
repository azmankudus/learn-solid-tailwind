import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_STAR, ICON_HEART, ICON_BOLT, ICON_SPARKLES } from '~/lib/icons';
import { Rating } from '~/components/input/Rating';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function RatingPage() {
  const [rate1, setRate1] = createSignal(3.5);
  const [rate2, setRate2] = createSignal(8);
  const [rate3, setRate3] = createSignal(4);

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_STAR} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Rating</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-20">
        <ComponentViewer 
          title="Basic Rating"
          icon={<Icon icon={ICON_STAR} />}
          description="A standard 5-star rating system for gathering user feedback."
          code={`
<Rating 
  label="Product Rating"
  value={rate()} 
  onChange={setRate} 
/>
          `}
        >
          <Rating 
            label="Rate our Service"
            value={rate1()} 
            onChange={setRate1} 
            class="max-w-sm"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Custom Scale"
          icon={<Icon icon={ICON_SPARKLES} />}
          description="Support for a different number of items in the rating scale."
          code={`
<Rating 
  label="1 to 10 Scale"
  value={rate()} 
  onChange={setRate} 
  count={10}
/>
          `}
        >
          <Rating 
            label="Overall Experience (1-10)"
            value={rate2()} 
            onChange={setRate2} 
            count={10}
            size={20}
            class="max-w-sm"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Custom Icons"
          icon={<Icon icon={ICON_HEART} />}
          description="Replace the default star icon with custom shapes like hearts or bolts."
          code={`
<Rating 
  label="Satisfaction"
  value={rate()} 
  onChange={setRate}
  icon={ICON_HEART}
/>
          `}
        >
          <Rating 
            label="How much did you like it?"
            value={rate3()} 
            onChange={setRate3} 
            icon={ICON_HEART}
            class="max-w-sm"
          />
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
