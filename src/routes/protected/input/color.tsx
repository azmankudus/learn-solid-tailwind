import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Card } from '~/components/content/Card';
import { Icon } from '@iconify-icon/solid';
import { ICON_PAINT_BRUSH, ICON_SWATCH } from '~/lib/icons';
import { ColorPicker } from '~/components/input/ColorPicker';

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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brand Color */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <div class="flex items-center gap-2">
            <Icon icon={ICON_SWATCH} class="text-theme" />
            <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">Brand Identity</HeadingText>
          </div>
          <ColorPicker 
            label="Primary Theme Color"
            value={color1()}
            onChange={setColor1}
          />
          <div class="flex flex-col gap-2">
            <div 
              class="h-12 w-full rounded-xl shadow-lg transition-colors duration-500" 
              style={{ "background-color": color1() }} 
            />
            <span class="text-[10px] font-mono font-bold text-center text-muted">{color1()}</span>
          </div>
        </Card>

        {/* Accent Color */}
        <Card class="p-8 border-none shadow-sm flex flex-col gap-6">
          <div class="flex items-center gap-2">
            <Icon icon={ICON_PAINT_BRUSH} class="text-theme" />
            <HeadingText level={4} class="text-sm uppercase tracking-widest text-muted font-bold">UI Accents</HeadingText>
          </div>
          <ColorPicker 
            label="Secondary Success Color"
            value={color2()}
            onChange={setColor2}
          />
          <div class="mt-4 p-4 bg-surface rounded-2xl border border-input-border flex items-center gap-4">
             <div class="h-10 w-10 rounded-full shadow-inner" style={{ "background-color": color2() }} />
             <div class="flex flex-col">
               <span class="text-xs font-bold text-main">Accent Preview</span>
               <span class="text-[10px] text-muted">Applied to buttons and links</span>
             </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
