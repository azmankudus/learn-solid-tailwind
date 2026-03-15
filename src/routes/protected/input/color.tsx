import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_PAINT_BRUSH } from '~/lib/icons';
import { ColorPicker } from '~/components/input/ColorPicker';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function ColorPage() {
  const [color1, setColor1] = createSignal("#4f46e5");
  const [color2, setColor2] = createSignal("#10b981");

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_PAINT_BRUSH} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">Color Pickers</HeadingText>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <ComponentViewer 
          title="Brand Identity"
          code={`
<ColorPicker 
  label="Theme Color"
  value={color()}
  onChange={setColor}
/>
          `}
        >
          <div class="flex flex-col gap-4 w-full">
            <ColorPicker 
              label="Primary Theme Color"
              value={color1()}
              onChange={setColor1}
              class="w-full"
            />
            <div 
              class="h-8 w-full rounded-xl shadow-inner border border-black/5" 
              style={{ "background-color": color1() }} 
            />
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="UI Accents"
          code={`
<ColorPicker 
  label="Accent Color"
  value={color()}
  onChange={setColor}
/>
          `}
        >
          <div class="flex flex-col gap-4 w-full">
            <ColorPicker 
              label="Secondary Success Color"
              value={color2()}
              onChange={setColor2}
              class="w-full"
            />
            <div class="p-3 bg-surface rounded-xl border border-input-border flex items-center gap-3">
               <div class="h-6 w-6 rounded-full shadow-inner border border-black/5" style={{ "background-color": color2() }} />
               <span class="text-[10px] font-bold text-main uppercase italic">Accent Preview</span>
            </div>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
