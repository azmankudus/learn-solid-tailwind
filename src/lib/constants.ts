import { text } from "./i18n";
import {
  ICON_PAINT_BRUSH, ICON_STOP, ICON_TABLE_CELLS, ICON_QUEUE_LIST,
  ICON_CLOUD, ICON_SPARKLES, ICON_SUN, ICON_MOON, ICON_GLOBE_ALT,
  ICON_ARROW_PATH, ICON_INBOX_STACK, ICON_SQUARE_2_STACK, ICON_FIRE,
  ICON_VIEWFINDER_CIRCLE, ICON_TRENDING_UP, ICON_EYE, ICON_CUBE,
  ICON_CHECK_CIRCLE, ICON_BOLT
} from "./icons";

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
  { value: "solid", get label() { return text("bg.solid"); }, icon: ICON_PAINT_BRUSH },
  { value: "dots", get label() { return text("bg.dots"); }, icon: ICON_STOP },
  { value: "grid", get label() { return text("bg.grid"); }, icon: ICON_TABLE_CELLS },
  { value: "diagonal", get label() { return text("bg.diagonal"); }, icon: ICON_QUEUE_LIST },
  { value: "soft", get label() { return text("bg.soft"); }, icon: ICON_CLOUD },
  { value: "aurora", get label() { return text("bg.aurora"); }, icon: ICON_SPARKLES },
  { value: "glow", get label() { return text("bg.glow"); }, icon: ICON_SUN },
  { value: "twilight", get label() { return text("bg.twilight"); }, icon: ICON_MOON },
  { value: "mesh", get label() { return text("bg.mesh"); }, icon: ICON_GLOBE_ALT },
  { value: "float", get label() { return text("bg.float"); }, icon: ICON_ARROW_PATH },
  { value: "depth", get label() { return text("bg.depth"); }, icon: ICON_INBOX_STACK },
  { value: "glass", get label() { return text("bg.glass"); }, icon: ICON_SQUARE_2_STACK },
  { value: "flare", get label() { return text("bg.flare"); }, icon: ICON_FIRE },
  { value: "horizon", get label() { return text("bg.horizon"); }, icon: ICON_VIEWFINDER_CIRCLE },
  { value: "mist", get label() { return text("bg.mist"); }, icon: ICON_CLOUD },
  { value: "elevate", get label() { return text("bg.elevate"); }, icon: ICON_TRENDING_UP },
  { value: "focus", get label() { return text("bg.focus"); }, icon: ICON_EYE },
  { value: "sweep", get label() { return text("bg.sweep"); }, icon: ICON_CUBE },
  { value: "calm", get label() { return text("bg.calm"); }, icon: ICON_CHECK_CIRCLE },
  { value: "active", get label() { return text("bg.active"); }, icon: ICON_BOLT }
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
