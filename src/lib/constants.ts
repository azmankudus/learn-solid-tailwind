import { t } from "./i18n";
import { 
  HiSolidPaintBrush, HiSolidStop, HiSolidTableCells, HiSolidQueueList, 
  HiSolidCloud, HiSolidSparkles, HiSolidSun, HiSolidMoon, HiSolidGlobeAlt, 
  HiSolidArrowPath, HiSolidInboxStack, HiSolidSquare2Stack, HiSolidFire, 
  HiSolidViewfinderCircle, HiSolidArrowTrendingUp, HiSolidEye, HiSolidCube, 
  HiSolidCheckCircle, HiSolidBolt 
} from "solid-icons/hi";

export const COLORS = [
  { value: "indigo", get label() { return t("color.indigo"); } },
  { value: "blue", get label() { return t("color.blue"); } },
  { value: "sky", get label() { return t("color.sky"); } },
  { value: "teal", get label() { return t("color.teal"); } },
  { value: "emerald", get label() { return t("color.emerald"); } },
  { value: "yellow", get label() { return t("color.yellow"); } },
  { value: "orange", get label() { return t("color.orange"); } },
  { value: "red", get label() { return t("color.red"); } },
  { value: "pink", get label() { return t("color.pink"); } },
  { value: "slate", get label() { return t("color.slate"); } },
  { value: "sunset", get label() { return t("color.sunset"); } },
  { value: "ocean", get label() { return t("color.ocean"); } },
  { value: "forest", get label() { return t("color.forest"); } },
  { value: "midnight", get label() { return t("color.midnight"); } },
  { value: "cherry", get label() { return t("color.cherry"); } },
  { value: "lemon", get label() { return t("color.lemon"); } },
  { value: "aqua", get label() { return t("color.aqua"); } },
  { value: "nebula", get label() { return t("color.nebula"); } },
  { value: "lava", get label() { return t("color.lava"); } },
  { value: "cosmic", get label() { return t("color.cosmic"); } }
];

export const BGS = [
  { value: "solid", get label() { return t("bg.solid"); }, icon: HiSolidPaintBrush },
  { value: "dots", get label() { return t("bg.dots"); }, icon: HiSolidStop },
  { value: "grid", get label() { return t("bg.grid"); }, icon: HiSolidTableCells },
  { value: "diagonal", get label() { return t("bg.diagonal"); }, icon: HiSolidQueueList },
  { value: "soft", get label() { return t("bg.soft"); }, icon: HiSolidCloud },
  { value: "aurora", get label() { return t("bg.aurora"); }, icon: HiSolidSparkles },
  { value: "glow", get label() { return t("bg.glow"); }, icon: HiSolidSun },
  { value: "twilight", get label() { return t("bg.twilight"); }, icon: HiSolidMoon },
  { value: "mesh", get label() { return t("bg.mesh"); }, icon: HiSolidGlobeAlt },
  { value: "float", get label() { return t("bg.float"); }, icon: HiSolidArrowPath },
  { value: "depth", get label() { return t("bg.depth"); }, icon: HiSolidInboxStack },
  { value: "glass", get label() { return t("bg.glass"); }, icon: HiSolidSquare2Stack },
  { value: "flare", get label() { return t("bg.flare"); }, icon: HiSolidFire },
  { value: "horizon", get label() { return t("bg.horizon"); }, icon: HiSolidViewfinderCircle },
  { value: "mist", get label() { return t("bg.mist"); }, icon: HiSolidCloud },
  { value: "elevate", get label() { return t("bg.elevate"); }, icon: HiSolidArrowTrendingUp },
  { value: "focus", get label() { return t("bg.focus"); }, icon: HiSolidEye },
  { value: "sweep", get label() { return t("bg.sweep"); }, icon: HiSolidCube },
  { value: "calm", get label() { return t("bg.calm"); }, icon: HiSolidCheckCircle },
  { value: "active", get label() { return t("bg.active"); }, icon: HiSolidBolt }
];

export function getButtonBg(c: string) {
  const map: Record<string, string> = {
    indigo: "linear-gradient(to bottom right, #4f46e5, #7c3aed)",
    blue: "linear-gradient(to bottom right, #2563eb, #0ea5e9)",
    sky: "linear-gradient(to bottom right, #0ea5e9, #22d3ee)",
    teal: "linear-gradient(to bottom right, #14b8a6, #10b981)",
    emerald: "linear-gradient(to bottom right, #059669, #34d399)",
    yellow: "linear-gradient(to bottom right, #eab308, #facc15)",
    orange: "linear-gradient(to bottom right, #ea580c, #f97316)",
    red: "linear-gradient(to bottom right, #dc2626, #ef4444)",
    pink: "linear-gradient(to bottom right, #db2777, #f43f5e)",
    slate: "linear-gradient(to bottom right, #475569, #64748b)",
    sunset: "linear-gradient(to bottom right, #f87171, #fbbf24)",
    ocean: "linear-gradient(to bottom right, #06b6d4, #3b82f6)",
    forest: "linear-gradient(to bottom right, #10b981, #059669)",
    midnight: "linear-gradient(to bottom right, #6366f1, #a855f7)",
    cherry: "linear-gradient(to bottom right, #ec4899, #f43f5e)",
    lemon: "linear-gradient(to bottom right, #fbbf24, #facc15)",
    aqua: "linear-gradient(to bottom right, #2dd4bf, #06b6d4)",
    nebula: "linear-gradient(to bottom right, #8b5cf6, #ec4899)",
    lava: "linear-gradient(to bottom right, #ef4444, #f97316)",
    cosmic: "linear-gradient(to bottom right, #3b82f6, #8b5cf6)"
  };
  return map[c] || map.indigo;
}
