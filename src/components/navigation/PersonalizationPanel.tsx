import { mode, setMode, bg, setBg, color, setColor, lang, setLang, view, setView, windowMode, setWindowMode } from "~/lib/store";
import { text, LANGUAGES } from "~/lib/i18n";
import { Dropdown } from "../input/Dropdown";
import { SegmentedToggle } from "../input/SegmentedToggle";
import { Icon } from "@iconify-icon/solid";
import { ICON_SUN, ICON_MOON, ICON_PAINT_BRUSH, ICON_ARROWS_RIGHT_LEFT, ICON_VIEW_COLUMNS, ICON_WINDOW, ICON_ARROWS_EXPAND } from "~/lib/icons";
import { COLORS, BGS, getButtonBg } from "~/lib/constants";

export interface PersonalizationPanelProps {
  dropdownVariant?: "absolute" | "inline";
}

export function PersonalizationPanel(props: PersonalizationPanelProps) {
  const renderColorIcon = (v: string) => (
    <div class="h-5 w-5 rounded-full shadow-lg shadow-black/10 border border-white/20" style={{ background: getButtonBg(v) }} />
  );

  const renderBgIcon = (v: string) => {
    const icon = BGS.find(b => b.value === v)?.icon || ICON_PAINT_BRUSH;
    return <span class="text-theme-solid opacity-80"><Icon icon={icon} width={20} height={20} /></span>;
  };

  const renderLangIcon = (v: string) => {
    const icon = (LANGUAGES as any[]).find(l => l.value === v)?.icon;
    return icon ? <Icon icon={icon} width={20} height={20} /> : <div class="h-5 w-5 rounded-full bg-theme" />;
  };

  return (
    <div class="space-y-4">
      <SegmentedToggle
        value={mode()}
        onChange={setMode}
        options={[
          { id: 'light', label: text("appearance.light"), icon: () => <Icon icon={ICON_SUN} width={20} height={20} /> },
          { id: 'dark', label: text("appearance.dark"), icon: () => <Icon icon={ICON_MOON} width={20} height={20} /> }
        ]}
      />

      <SegmentedToggle
        value={view()}
        onChange={(v) => setView(v)}
        options={[
          { id: 'center', label: text("appearance.center"), icon: () => <Icon icon={ICON_VIEW_COLUMNS} width={20} height={20} /> },
          { id: 'wide', label: text("appearance.wide"), icon: () => <Icon icon={ICON_ARROWS_RIGHT_LEFT} width={20} height={20} /> }
        ]}
      />

      <SegmentedToggle
        value={windowMode()}
        onChange={(v) => setWindowMode(v as "windowed" | "fullscreen")}
        options={[
          { id: 'windowed', label: text("appearance.windowed"), icon: () => <Icon icon={ICON_WINDOW} width={20} height={20} /> },
          { id: 'fullscreen', label: text("appearance.fullscreen"), icon: () => <Icon icon={ICON_ARROWS_EXPAND} width={20} height={20} /> }
        ]}
      />

      <Dropdown
        value={color()}
        options={COLORS}
        onChange={setColor}
        renderIcon={renderColorIcon}
        variant={props.dropdownVariant}
      />

      <Dropdown
        value={bg()}
        options={BGS}
        onChange={setBg}
        renderIcon={renderBgIcon}
        variant={props.dropdownVariant}
      />

      <Dropdown
        value={lang()}
        options={LANGUAGES}
        onChange={setLang}
        renderIcon={renderLangIcon}
        variant={props.dropdownVariant}
      />
    </div>
  );
}
