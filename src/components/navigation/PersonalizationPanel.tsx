import { mode, setMode, bg, setBg, color, setColor, lang, setLang, view, setView, windowMode, setWindowMode, chartTheme, setChartTheme } from "~/lib/store";
import { text, LANGUAGES } from "~/lib/i18n";
import { Dropdown } from "../input/Dropdown";
import { Radio } from "../input/Radio";
import { Icon } from "@iconify-icon/solid";
import {
  ICON_THEME_MODE_FLUENT,
  ICON_LIGHT_MODE_FLUENT,
  ICON_DARK_MODE_FLUENT,
  ICON_LAYOUT_FLUENT,
  ICON_CENTER_FLUENT,
  ICON_WIDE_FLUENT,
  ICON_WINDOW_MODE_FLUENT,
  ICON_WINDOWED_FLUENT,
  ICON_FULLSCREEN_FLUENT,
  ICON_COLOR_FLUENT,
  ICON_BG_STYLE_FLUENT,
  ICON_CHART_COLOR_FLUENT,
  ICON_LANG_FLUENT
} from "~/lib/icons";
import { COLORS, BGS, getButtonBg } from "~/lib/constants";
import { THEME_OPTIONS } from "~/lib/theme";
import { Tooltip } from "../content/Tooltip";

export interface PersonalizationPanelProps {
  dropdownVariant?: "absolute" | "inline";
}

export function PersonalizationPanel(props: PersonalizationPanelProps) {
  const renderColorIcon = (v: string) => (
    <div class="h-4 w-4 rounded-full shadow-sm border border-white/20" style={{ background: getButtonBg(v) }} />
  );

  const renderBgIcon = (v: string) => {
    return <span class="text-theme-solid opacity-80 flex items-center justify-center"><Icon icon={ICON_BG_STYLE_FLUENT} width={20} height={20} /></span>;
  };

  const renderLangIcon = (v: string) => {
    return <span class="text-theme-solid opacity-80 flex items-center justify-center"><Icon icon={ICON_LANG_FLUENT} width={20} height={20} /></span>;
  };

  const renderChartIcon = () => (
    <span class="text-theme-solid opacity-80 flex items-center justify-center"><Icon icon={ICON_CHART_COLOR_FLUENT} width={20} height={20} /></span>
  );

  return (
    <div class="flex flex-col space-y-4 p-1 overflow-visible">
      {/* Theme Mode */}
      <div class="flex items-center gap-3 w-full">
        <Tooltip text={text("appearance.themeMode")} position="right">
          <div class="flex items-center justify-center w-6 h-6 text-muted">
            <Icon icon={ICON_THEME_MODE_FLUENT} width={20} height={20} />
          </div>
        </Tooltip>
        <div class="flex-1">
          <Radio
            value={mode()}
            onChange={setMode}
            options={[
              { id: 'light', label: "", icon: () => <Icon icon={ICON_LIGHT_MODE_FLUENT} width={20} height={20} />, tooltip: "Light mode" },
              { id: 'dark', label: "", icon: () => <Icon icon={ICON_DARK_MODE_FLUENT} width={20} height={20} />, tooltip: "Dark mode" }
            ]}
            class="w-full h-10"
          />
        </div>
      </div>

      {/* Layout Mode */}
      <div class="flex items-center gap-3 w-full">
        <Tooltip text={text("appearance.layout")} position="right">
          <div class="flex items-center justify-center w-6 h-6 text-muted">
            <Icon icon={ICON_LAYOUT_FLUENT} width={20} height={20} />
          </div>
        </Tooltip>
        <div class="flex-1">
          <Radio
            value={view()}
            onChange={(v) => setView(v)}
            options={[
              { id: 'center', label: "", icon: () => <Icon icon={ICON_CENTER_FLUENT} width={20} height={20} />, tooltip: "Center" },
              { id: 'wide', label: "", icon: () => <Icon icon={ICON_WIDE_FLUENT} width={20} height={20} />, tooltip: "Wide" }
            ]}
            class="w-full h-10"
          />
        </div>
      </div>

      {/* Window Mode */}
      <div class="flex items-center gap-3 w-full">
        <Tooltip text={text("appearance.windowMode")} position="right">
          <div class="flex items-center justify-center w-6 h-6 text-muted">
            <Icon icon={ICON_WINDOW_MODE_FLUENT} width={20} height={20} />
          </div>
        </Tooltip>
        <div class="flex-1">
          <Radio
            value={windowMode()}
            onChange={(v) => setWindowMode(v as "windowed" | "fullscreen")}
            options={[
              { id: 'windowed', label: "", icon: () => <Icon icon={ICON_WINDOWED_FLUENT} width={20} height={20} />, tooltip: "Windowed" },
              { id: 'fullscreen', label: "", icon: () => <Icon icon={ICON_FULLSCREEN_FLUENT} width={20} height={20} />, tooltip: "Full screen" }
            ]}
            class="w-full h-10"
          />
        </div>
      </div>

      {/* Accent Color */}
      <div class="flex items-center gap-3 w-full">
        <Tooltip text={text("appearance.accentColor")} position="right">
          <div class="flex items-center justify-center w-6 h-6 text-muted">
            <Icon icon={ICON_COLOR_FLUENT} width={20} height={20} />
          </div>
        </Tooltip>
        <div class="flex-1">
          <Dropdown
            value={color()}
            options={COLORS}
            onChange={setColor}
            renderIcon={renderColorIcon}
            variant={props.dropdownVariant}
            class="h-10 text-[11px] w-full"
          />
        </div>
      </div>

      {/* Background Style */}
      <div class="flex items-center gap-3 w-full">
        <Tooltip text={text("appearance.background")} position="right">
          <div class="flex items-center justify-center w-6 h-6 text-muted">
            <Icon icon={ICON_BG_STYLE_FLUENT} width={20} height={20} />
          </div>
        </Tooltip>
        <div class="flex-1">
          <Dropdown
            value={bg()}
            options={BGS}
            onChange={setBg}
            renderIcon={renderBgIcon}
            variant={props.dropdownVariant}
            class="h-10 text-[11px] w-full"
          />
        </div>
      </div>

      {/* Chart Theme */}
      <div class="flex items-center gap-3 w-full">
        <Tooltip text={text("appearance.chartTheme") || "Chart Theme"} position="right">
          <div class="flex items-center justify-center w-6 h-6 text-muted">
            <Icon icon={ICON_CHART_COLOR_FLUENT} width={20} height={20} />
          </div>
        </Tooltip>
        <div class="flex-1">
          <Dropdown
            value={chartTheme()}
            options={THEME_OPTIONS}
            onChange={setChartTheme}
            renderIcon={renderChartIcon}
            variant={props.dropdownVariant}
            class="h-10 text-[11px] w-full"
          />
        </div>
      </div>

      {/* Language */}
      <div class="flex items-center gap-3 w-full">
        <Tooltip text={text("appearance.language")} position="right">
          <div class="flex items-center justify-center w-6 h-6 text-muted">
            <Icon icon={ICON_LANG_FLUENT} width={20} height={20} />
          </div>
        </Tooltip>
        <div class="flex-1">
          <Dropdown
            value={lang()}
            options={LANGUAGES}
            onChange={setLang}
            renderIcon={renderLangIcon}
            variant={props.dropdownVariant}
            class="h-10 text-[11px] w-full"
          />
        </div>
      </div>
    </div>
  );
}
