import { mode, setMode, color, setColor, bg, setBg, lang, setLang, view, setView, windowMode, setWindowMode } from "~/lib/store";
import { text, LANGUAGES } from "~/lib/i18n";
import { HeadingText } from "~/components/display/Heading";
import { Card } from "~/components/display/Card";
import { Dropdown } from "~/components/input/Dropdown";
import { SegmentedToggle } from "~/components/input/SegmentedToggle";
import { Icon } from "@iconify-icon/solid";
import { ICON_SUN, ICON_MOON, ICON_SWATCH, ICON_PAINT_BRUSH, ICON_ARROWS_RIGHT_LEFT, ICON_VIEW_COLUMNS, ICON_WINDOW, ICON_ARROWS_EXPAND } from "~/lib/icons";
import { COLORS, BGS, getButtonBg } from "~/lib/constants";
import { PageWrapper } from "~/components/layout/PageWrapper";

export default function ProfileAppearance() {
  const renderColorIcon = (v: string) => (
    <div class="h-5 w-5 rounded-full shadow-lg shadow-black/10 border border-white/20" style={{ background: getButtonBg(v) }} />
  );

  const renderBgIcon = (v: string) => {
    const icon = BGS.find(b => b.value === v)?.icon || ICON_PAINT_BRUSH;
    return <span class="text-theme opacity-80 group-hover:text-white transition-colors"><Icon icon={icon} width={20} height={20} /></span>;
  };

  const renderLangIcon = (v: string) => {
    const icon = (LANGUAGES as any[]).find(l => l.value === v)?.icon;
    return icon ? <Icon icon={icon} width={20} height={20} /> : <div class="h-5 w-5 rounded-full bg-theme" />;
  };

  return (
    <PageWrapper class="flex flex-col space-y-6 pb-20">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_SWATCH} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl">{text("appearance.title")}</HeadingText>
      </div>

      <Card class="p-8 border-none shadow-sm" overflowVisible={true}>
        <div class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {/* Theme Mode Toggle (Matches TopNav design) */}
            <div class="space-y-4">
              <h4 class="text-xs font-bold text-muted ml-1 uppercase tracking-widest">{text("appearance.themeMode")}</h4>
              <SegmentedToggle
                value={mode()}
                onChange={setMode}
                options={[
                  { id: 'light', label: text("appearance.light"), icon: () => <Icon icon={ICON_SUN} width={20} height={20} /> },
                  { id: 'dark', label: text("appearance.dark"), icon: () => <Icon icon={ICON_MOON} width={20} height={20} /> }
                ]}
              />
            </div>

            {/* Layout Type Toggle (Matches TopNav design) */}
            <div class="space-y-4">
              <h4 class="text-xs font-bold text-muted ml-1 uppercase tracking-widest">{text("appearance.layoutType")}</h4>
              <SegmentedToggle
                value={view()}
                onChange={(v) => setView(v)}
                options={[
                  { id: 'center', label: text("appearance.center"), icon: () => <Icon icon={ICON_VIEW_COLUMNS} width={20} height={20} /> },
                  { id: 'wide', label: text("appearance.wide"), icon: () => <Icon icon={ICON_ARROWS_RIGHT_LEFT} width={20} height={20} /> }
                ]}
              />
            </div>

            {/* Window Mode Toggle */}
            <div class="space-y-4">
              <h4 class="text-xs font-bold text-muted ml-1 uppercase tracking-widest">{text("appearance.windowMode")}</h4>
              <SegmentedToggle
                value={windowMode()}
                onChange={(v) => setWindowMode(v as "windowed" | "fullscreen")}
                options={[
                  { id: 'windowed', label: text("appearance.windowed"), icon: () => <Icon icon={ICON_WINDOW} width={20} height={20} /> },
                  { id: 'fullscreen', label: text("appearance.fullscreen"), icon: () => <Icon icon={ICON_ARROWS_EXPAND} width={20} height={20} /> }
                ]}
              />
            </div>

            <div class="space-y-4">
              <h4 class="text-xs font-bold text-muted ml-1 uppercase tracking-widest">{text("appearance.accentColor")}</h4>
              <Dropdown
                value={color()}
                options={COLORS}
                onChange={setColor}
                renderIcon={renderColorIcon}
              />
            </div>
            <div class="space-y-4">
              <h4 class="text-xs font-bold text-muted ml-1 uppercase tracking-widest">{text("appearance.background")}</h4>
              <Dropdown
                value={bg()}
                options={BGS}
                onChange={setBg}
                renderIcon={renderBgIcon}
              />
            </div>
            <div class="space-y-4">
              <h4 class="text-xs font-bold text-muted ml-1 uppercase tracking-widest">{text("appearance.language")}</h4>
              <Dropdown
                value={lang()}
                options={LANGUAGES}
                onChange={setLang}
                renderIcon={renderLangIcon}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Footer spacer */}
      <div class="h-32 w-full" />
    </PageWrapper>
  );
}
