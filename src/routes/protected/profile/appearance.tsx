import { createSignal } from "solid-js";
import { mode, setMode, color, setColor, bg, setBg, lang, setLang } from "~/lib/store";
import { t, LANGUAGES } from "~/lib/i18n";
import { HeadingText, Card, CustomDropdown } from "~/components/ThemeComponents";
import { 
  HiSolidSun, HiSolidMoon, HiSolidSwatch, HiSolidPaintBrush 
} from "solid-icons/hi";
import { COLORS, BGS, getButtonBg } from "~/lib/constants";



export default function ProfileAppearance() {
  const renderColorIcon = (v: string) => (
    <div class="h-5 w-5 rounded-full shadow-lg border border-white/20" style={{ background: getButtonBg(v) }} />
  );

  const renderBgIcon = (v: string) => {
    const Icon = BGS.find(b => b.value === v)?.icon || HiSolidPaintBrush;
    return <span class="text-xs text-theme-solid opacity-80"><Icon /></span>;
  };

  return (
    <div class="space-y-6">
      <div class="flex items-center space-x-3 mb-8">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <HiSolidSwatch size={24} />
        </div>
        <HeadingText level={2} class="text-3xl">{t("appearance.title")}</HeadingText>
      </div>

      <Card class="p-8 max-w-2xl" overflowVisible={true}>
        <div class="space-y-8">
          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-muted mb-4 ml-1">{t("appearance.themeMode")}</h4>
            <button
              onClick={() => setMode(mode() === "light" ? "dark" : "light")}
              class="w-full flex items-center justify-between p-4 rounded-xl bg-surface hover:bg-black/5 transition-all group border border-border-theme shadow-sm"
            >
              <div class="flex items-center space-x-3">
                <div class="text-theme">
                  {mode() === 'dark' ? <HiSolidMoon size={24} /> : <HiSolidSun size={24} />}
                </div>
                <span class="text-xs font-semibold text-main tracking-widest">
                  {mode() === 'dark' ? t("appearance.darkMode") : t("appearance.lightMode")}
                </span>
              </div>
              <div class={`h-7 w-12 rounded-full relative p-1.5 transition-colors ${mode() === 'dark' ? 'bg-theme' : 'bg-black/10 shadow-inner'}`}>
                <div class={`h-4 w-4 rounded-full transition-all duration-300 shadow-md bg-white border-none ${mode() === 'dark' ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </button>
          </div>

          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-muted mb-4 ml-1">{t("appearance.themePalette")}</h4>
            <CustomDropdown
              value={color()}
              options={COLORS}
              onChange={setColor}
              renderIcon={renderColorIcon}
            />
          </div>

          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-muted mb-4 ml-1">{t("appearance.backdropArt")}</h4>
            <CustomDropdown
              value={bg()}
              options={BGS}
              onChange={setBg}
              renderIcon={renderBgIcon}
            />
          </div>

          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-muted mb-4 ml-1">{t("appearance.language")}</h4>
            <CustomDropdown
              value={lang()}
              options={LANGUAGES}
              onChange={setLang}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
