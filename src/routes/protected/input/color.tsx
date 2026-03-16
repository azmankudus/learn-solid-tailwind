import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_PAINT_BRUSH, ICON_SWATCH } from '~/lib/icons';
import { ColorField } from '~/components/input/ColorField';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function ColorPage() {
  const [color, setColor] = createSignal("#4f46e5");

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_PAINT_BRUSH} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Color Picker</HeadingText>
      </div>

      <div class="flex flex-col gap-6 pb-12">
        <ComponentViewer 
          title="Color Selection"
          icon={<Icon icon={ICON_SWATCH} />}
          description="A standard color picker for selecting HEX and RGB colors."
          code={`
<ColorField 
  label="Accent Color"
  value={color()}
  onChange={setColor}
/>
          `}
        >
          <div class="flex flex-col gap-8 w-full max-w-sm">
            <ColorField 
              label="Selected Interface Color"
              value={color()}
              onChange={setColor}
              class="w-full"
            />
            
            <div class="p-6 bg-surface rounded-2xl border border-input-border flex flex-col gap-4 shadow-sm">
               <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-muted uppercase tracking-wider">Preview Surface</span>
                  <span class="text-[10px] font-mono font-bold text-theme">{color()}</span>
               </div>
               <div class="grid grid-cols-2 gap-3">
                  <div class="h-20 rounded-xl shadow-inner border border-black/5 flex items-center justify-center relative overflow-hidden">
                    <div class="absolute inset-0 opacity-10" style={{ "background-color": color() }} />
                    <div class="relative z-10 w-8 h-8 rounded-lg shadow-lg" style={{ "background-color": color() }} />
                  </div>
                  <div class="h-20 rounded-xl border border-input-border flex items-center justify-center bg-hover">
                    <Icon icon={ICON_PAINT_BRUSH} width={24} style={{ "color": color() }} />
                  </div>
               </div>
               <div class="h-2 w-full rounded-full bg-hover overflow-hidden">
                  <div class="h-full transition-all duration-300" style={{ "width": "75%", "background-color": color() }} />
               </div>
            </div>
          </div>
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
