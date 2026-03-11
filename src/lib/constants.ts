import { text } from "./i18n";
import {
  HiSolidPaintBrush, HiSolidStop, HiSolidTableCells, HiSolidQueueList,
  HiSolidCloud, HiSolidSparkles, HiSolidSun, HiSolidMoon, HiSolidGlobeAlt,
  HiSolidArrowPath, HiSolidInboxStack, HiSolidSquare2Stack, HiSolidFire,
  HiSolidViewfinderCircle, HiSolidArrowTrendingUp, HiSolidEye, HiSolidCube,
  HiSolidCheckCircle, HiSolidBolt
} from "solid-icons/hi";

export const COLORS = [
  { value: "indigo", get label() { return text("color.indigo"); } },
  { value: "blue", get label() { return text("color.blue"); } },
  { value: "sky", get label() { return text("color.sky"); } },
  { value: "teal", get label() { return text("color.teal"); } },
  { value: "emerald", get label() { return text("color.emerald"); } },
  { value: "yellow", get label() { return text("color.yellow"); } },
  { value: "orange", get label() { return text("color.orange"); } },
  { value: "red", get label() { return text("color.red"); } },
  { value: "pink", get label() { return text("color.pink"); } },
  { value: "slate", get label() { return text("color.slate"); } },
  { value: "sunset", get label() { return text("color.sunset"); } },
  { value: "ocean", get label() { return text("color.ocean"); } },
  { value: "forest", get label() { return text("color.forest"); } },
  { value: "midnight", get label() { return text("color.midnight"); } },
  { value: "cherry", get label() { return text("color.cherry"); } },
  { value: "lemon", get label() { return text("color.lemon"); } },
  { value: "aqua", get label() { return text("color.aqua"); } },
  { value: "nebula", get label() { return text("color.nebula"); } },
  { value: "lava", get label() { return text("color.lava"); } },
  { value: "cosmic", get label() { return text("color.cosmic"); } }
];

export const BGS = [
  { value: "solid", get label() { return text("bg.solid"); }, icon: HiSolidPaintBrush },
  { value: "dots", get label() { return text("bg.dots"); }, icon: HiSolidStop },
  { value: "grid", get label() { return text("bg.grid"); }, icon: HiSolidTableCells },
  { value: "diagonal", get label() { return text("bg.diagonal"); }, icon: HiSolidQueueList },
  { value: "soft", get label() { return text("bg.soft"); }, icon: HiSolidCloud },
  { value: "aurora", get label() { return text("bg.aurora"); }, icon: HiSolidSparkles },
  { value: "glow", get label() { return text("bg.glow"); }, icon: HiSolidSun },
  { value: "twilight", get label() { return text("bg.twilight"); }, icon: HiSolidMoon },
  { value: "mesh", get label() { return text("bg.mesh"); }, icon: HiSolidGlobeAlt },
  { value: "float", get label() { return text("bg.float"); }, icon: HiSolidArrowPath },
  { value: "depth", get label() { return text("bg.depth"); }, icon: HiSolidInboxStack },
  { value: "glass", get label() { return text("bg.glass"); }, icon: HiSolidSquare2Stack },
  { value: "flare", get label() { return text("bg.flare"); }, icon: HiSolidFire },
  { value: "horizon", get label() { return text("bg.horizon"); }, icon: HiSolidViewfinderCircle },
  { value: "mist", get label() { return text("bg.mist"); }, icon: HiSolidCloud },
  { value: "elevate", get label() { return text("bg.elevate"); }, icon: HiSolidArrowTrendingUp },
  { value: "focus", get label() { return text("bg.focus"); }, icon: HiSolidEye },
  { value: "sweep", get label() { return text("bg.sweep"); }, icon: HiSolidCube },
  { value: "calm", get label() { return text("bg.calm"); }, icon: HiSolidCheckCircle },
  { value: "active", get label() { return text("bg.active"); }, icon: HiSolidBolt }
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
