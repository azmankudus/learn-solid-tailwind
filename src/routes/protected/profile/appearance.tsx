import { mode, setMode, color, setColor, bg, setBg, lang, setLang, view, setView } from "~/lib/store";
import { t, LANGUAGES } from "~/lib/i18n";
import { HeadingText, Card, Dropdown, Toggle, SegmentedToggle } from "~/components/Components";
import {
  HiSolidSun, HiSolidMoon, HiSolidSwatch, HiSolidPaintBrush, HiSolidArrowsRightLeft, HiSolidViewColumns
} from "solid-icons/hi";
import { COLORS, BGS, getButtonBg } from "~/lib/constants";

export default function ProfileAppearance() {
  const renderColorIcon = (v: string) => (
    <div class="h-5 w-5 rounded-full shadow-lg shadow-black/10 border border-white/20" style={{ background: getButtonBg(v) }} />
  );

  const renderBgIcon = (v: string) => {
    const Icon = BGS.find(b => b.value === v)?.icon || HiSolidPaintBrush;
    return <span class="text-theme opacity-80 group-hover:text-white transition-colors"><Icon size={20} /></span>;
  };

  const toggleMode = () => setMode(mode() === 'dark' ? 'light' : 'dark');
  const toggleView = () => setView(view() === 'wide' ? 'center' : 'wide');

  return (
    <div class="flex flex-col space-y-6 pb-20">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <HiSolidSwatch size={24} />
        </div>
        <HeadingText level={2} class="text-3xl">{t("appearance.title")}</HeadingText>
      </div>

      <Card class="p-8 border-none shadow-sm" overflowVisible={true}>
        <div class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {/* Theme Mode Toggle (Matches TopNav design) */}
            <div class="space-y-4">
              <h4 class="text-xs font-bold text-muted ml-1 uppercase tracking-widest">{t("appearance.themeMode")}</h4>
              <SegmentedToggle 
                value={mode()}
                onChange={setMode}
                options={[
                  { id: 'light', label: t("appearance.light"), icon: (props) => <HiSolidSun {...props} /> },
                  { id: 'dark', label: t("appearance.dark"), icon: (props) => <HiSolidMoon {...props} /> }
                ]}
              />
            </div>

            {/* Layout Type Toggle (Matches TopNav design) */}
            <div class="space-y-4">
              <h4 class="text-xs font-bold text-muted ml-1 uppercase tracking-widest">{t("appearance.layoutType")}</h4>
              <SegmentedToggle 
                value={view()}
                onChange={(v) => setView(v)}
                options={[
                  { id: 'center', label: t("appearance.center"), icon: (props) => <HiSolidViewColumns {...props} /> },
                  { id: 'wide', label: t("appearance.wide"), icon: (props) => <HiSolidArrowsRightLeft {...props} /> }
                ]}
              />
            </div>

            <div class="space-y-4">
              <h4 class="text-xs font-bold text-muted ml-1 uppercase tracking-widest">{t("appearance.accentColor")}</h4>
              <Dropdown
                value={color()}
                options={COLORS}
                onChange={setColor}
                renderIcon={renderColorIcon}
              />
            </div>
            <div class="space-y-4">
              <h4 class="text-xs font-bold text-muted ml-1 uppercase tracking-widest">{t("appearance.background")}</h4>
              <Dropdown
                value={bg()}
                options={BGS}
                onChange={setBg}
                renderIcon={renderBgIcon}
              />
            </div>
            <div class="space-y-4">
              <h4 class="text-xs font-bold text-muted ml-1 uppercase tracking-widest">{t("appearance.language")}</h4>
              <Dropdown
                value={lang()}
                options={LANGUAGES}
                onChange={setLang}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Footer spacer */}
      <div class="h-32 w-full" />
    </div>
  );
}
