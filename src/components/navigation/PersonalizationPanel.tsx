import { mode, setMode, bg, setBg, color, setColor, lang, setLang, view, setView } from "~/lib/store";
import { text, LANGUAGES } from "~/lib/i18n";
import { Dropdown } from "../input/Dropdown";
import { SegmentedToggle } from "../input/SegmentedToggle";
import { HiSolidSun, HiSolidMoon, HiSolidPaintBrush, HiSolidArrowsRightLeft, HiSolidViewColumns } from "solid-icons/hi";
import { COLORS, BGS, getButtonBg } from "~/lib/constants";

export function PersonalizationPanel() {
  const renderColorIcon = (v: string) => (
    <div class="h-5 w-5 rounded-full shadow-lg shadow-black/10 border border-white/20" style={{ background: getButtonBg(v) }} />
  );

  const renderBgIcon = (v: string) => {
    const Icon = BGS.find(b => b.value === v)?.icon || HiSolidPaintBrush;
    return <span class="text-theme-solid opacity-80"><Icon size={20} /></span>;
  };

  return (
    <div class="space-y-4">
      <div class="flex flex-col gap-2">
        <SegmentedToggle
          value={mode()}
          onChange={setMode}
          options={[
            { id: 'light', label: text("appearance.light"), icon: (props) => <HiSolidSun {...props} /> },
            { id: 'dark', label: text("appearance.dark"), icon: (props) => <HiSolidMoon {...props} /> }
          ]}
        />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-[10px] font-bold uppercase tracking-widest text-muted pl-1">
          {text("appearance.layout")}
        </span>
        <SegmentedToggle
          value={view()}
          onChange={(v) => setView(v)}
          options={[
            { id: 'center', label: text("appearance.center"), icon: (props) => <HiSolidViewColumns {...props} /> },
            { id: 'wide', label: text("appearance.wide"), icon: (props) => <HiSolidArrowsRightLeft {...props} /> }
          ]}
        />
      </div>

      <Dropdown
        value={color()}
        options={COLORS}
        onChange={setColor}
        renderIcon={renderColorIcon}
        class="border border-border-theme"
      />

      <Dropdown
        value={bg()}
        options={BGS}
        onChange={setBg}
        renderIcon={renderBgIcon}
        class="border border-border-theme"
      />

      <Dropdown
        value={lang()}
        options={LANGUAGES}
        onChange={setLang}
        class="border border-border-theme"
      />
    </div>
  );
}
