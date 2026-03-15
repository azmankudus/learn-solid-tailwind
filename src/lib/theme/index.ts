import * as echarts from "echarts";
import { lightTheme } from "./light";
import { darkTheme } from "./dark";

export { lightTheme, darkTheme };

// 9 Balanced Multi-color Palettes
const PALETTES = {
    standard: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6", "#EC4899", "#06B6D4"],
    macarons: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3", "#e5cf0d", "#97b552"],
    vintage: ["#d87c7c", "#919e8b", "#d7ab82", "#6e7074", "#61a0a8", "#efa18d", "#787464", "#cc7e63"],
    shine: ["#c1232b", "#27727b", "#fcce10", "#e87c25", "#b5c334", "#fe8463", "#9bca63", "#fad860"],
    roma: ["#e01f54", "#0014ff", "#000000", "#0b1ed6", "#cf032e", "#c12c53", "#761726", "#d4d4d4"],
    royal: ["#722ed1", "#eb2f96", "#fa541c", "#fadb14", "#52c41a", "#13c2c2", "#1890ff", "#2f54eb"],
    mint: ["#13c2c2", "#52c41a", "#bae637", "#fadb14", "#ff4d4f", "#0050b3", "#597ef7", "#722ed1"],
    cosmic: ["#6366F1", "#EC4899", "#8B5CF6", "#F43F5E", "#F59E0B", "#10B981", "#06B6D4", "#3B82F6"],
    garden: ["#86efac", "#93c5fd", "#f9a8d4", "#fde047", "#67e8f9", "#c084fc", "#fda4af", "#a5f3fc"]
};

export const THEMES = PALETTES;

export const THEME_OPTIONS = [
    { value: "standard", label: "Standard" },
    { value: "macarons", label: "Macarons" },
    { value: "vintage", label: "Vintage" },
    { value: "shine", label: "Shine" },
    { value: "roma", label: "Roma" },
    { value: "royal", label: "Royal" },
    { value: "mint", label: "Mint" },
    { value: "cosmic", label: "Cosmic" },
    { value: "garden", label: "Garden" },
    { value: "accent", label: "Theme" }
];

// Helper to register double themes (light/dark) for each palette
export function registerThemes() {
    Object.entries(PALETTES).forEach(([name, colors]) => {
        const primary = colors[0];
        // Parse hex to rgb
        const r = parseInt(primary.slice(1, 3), 16);
        const g = parseInt(primary.slice(3, 5), 16);
        const b = parseInt(primary.slice(5, 7), 16);

        // Register light version
        echarts.registerTheme(`${name}-light`, {
            ...lightTheme,
            color: colors,
            geo: {
                ...(lightTheme as any).geo,
                itemStyle: { 
                    ...(lightTheme as any).geo?.itemStyle, 
                    areaColor: `rgba(${r}, ${g}, ${b}, 0.35)`, 
                    borderColor: `rgba(${r}, ${g}, ${b}, 0.6)` 
                },
                emphasis: {
                    ...(lightTheme as any).geo?.emphasis,
                    itemStyle: {
                        ...(lightTheme as any).geo?.emphasis?.itemStyle,
                        areaColor: `rgba(${r}, ${g}, ${b}, 0.55)`,
                        borderColor: primary
                    }
                }
            },
            map: {
                ...(lightTheme as any).map,
                itemStyle: { 
                    ...(lightTheme as any).map?.itemStyle, 
                    areaColor: `rgba(${r}, ${g}, ${b}, 0.35)`, 
                    borderColor: `rgba(${r}, ${g}, ${b}, 0.6)` 
                },
                emphasis: {
                    ...(lightTheme as any).map?.emphasis,
                    itemStyle: {
                        ...(lightTheme as any).map?.emphasis?.itemStyle,
                        areaColor: `rgba(${r}, ${g}, ${b}, 0.55)`,
                        borderColor: primary
                    }
                }
            }
        });
        // Register dark version
        echarts.registerTheme(`${name}-dark`, {
            ...darkTheme,
            color: colors,
            geo: {
                ...(darkTheme as any).geo,
                itemStyle: { 
                    ...(darkTheme as any).geo?.itemStyle, 
                    areaColor: `rgba(${r}, ${g}, ${b}, 0.28)`, 
                    borderColor: `rgba(${r}, ${g}, ${b}, 0.5)` 
                },
                emphasis: {
                    ...(darkTheme as any).geo?.emphasis,
                    itemStyle: {
                        ...(darkTheme as any).geo?.emphasis?.itemStyle,
                        areaColor: `rgba(${r}, ${g}, ${b}, 0.45)`,
                        borderColor: primary
                    }
                }
            },
            map: {
                ...(darkTheme as any).map,
                itemStyle: { 
                    ...(darkTheme as any).map?.itemStyle, 
                    areaColor: `rgba(${r}, ${g}, ${b}, 0.28)`, 
                    borderColor: `rgba(${r}, ${g}, ${b}, 0.5)` 
                },
                emphasis: {
                    ...(darkTheme as any).map?.emphasis,
                    itemStyle: {
                        ...(darkTheme as any).map?.emphasis?.itemStyle,
                        areaColor: `rgba(${r}, ${g}, ${b}, 0.45)`,
                        borderColor: primary
                    }
                }
            }
        });
    });

    // Register base themes with decent Indigo-based map colors as default
    const defaultR = 79, defaultG = 70, defaultB = 229; // Indigo-600

    echarts.registerTheme('light', {
        ...lightTheme,
        map: {
            itemStyle: { areaColor: `rgba(${defaultR}, ${defaultG}, ${defaultB}, 0.3)`, borderColor: `rgba(${defaultR}, ${defaultG}, ${defaultB}, 0.5)` }
        },
        geo: {
            itemStyle: { areaColor: `rgba(${defaultR}, ${defaultG}, ${defaultB}, 0.3)`, borderColor: `rgba(${defaultR}, ${defaultG}, ${defaultB}, 0.5)` }
        }
    });
    echarts.registerTheme('dark', {
        ...darkTheme,
        map: {
            itemStyle: { areaColor: `rgba(${defaultR}, ${defaultG}, ${defaultB}, 0.25)`, borderColor: `rgba(${defaultR}, ${defaultG}, ${defaultB}, 0.45)` }
        },
        geo: {
            itemStyle: { areaColor: `rgba(${defaultR}, ${defaultG}, ${defaultB}, 0.25)`, borderColor: `rgba(${defaultR}, ${defaultG}, ${defaultB}, 0.45)` }
        }
    });
}

// Function to generate accent palette dynamically
export function getAccentPalette(baseColor: string) {
    const colorMap: Record<string, string[]> = {
        indigo: ["#6366f1", "#4f46e5", "#4338ca", "#3730a3", "#818cf8", "#a5b4fc"],
        blue: ["#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#60a5fa", "#93c5fd"],
        sky: ["#0ea5e9", "#0284c7", "#0369a1", "#075985", "#38bdf8", "#7dd3fc"],
        teal: ["#14b8a6", "#0d9488", "#0f766e", "#115e59", "#2dd4bf", "#5eead4"],
        emerald: ["#10b981", "#059669", "#047857", "#065f46", "#34d399", "#6ee7b7"],
        yellow: ["#eab308", "#ca8a04", "#a16207", "#854d0e", "#facc15", "#fde047"],
        orange: ["#f97316", "#ea580c", "#c2410c", "#9a3412", "#fb923c", "#fdba74"],
        red: ["#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#f87171", "#fca5a5"],
        pink: ["#ec4899", "#db2777", "#be185d", "#9d174d", "#f472b6", "#f9a8d4"],
        slate: ["#64748b", "#475569", "#334155", "#1e293b", "#94a3b8", "#cbd5e1"],
        sunset: ["#f87171", "#fbbf24", "#ea580c", "#4f46e5", "#10b981", "#3b82f6"],
        ocean: ["#06b6d4", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#60a5fa"],
        forest: ["#10b981", "#059669", "#047857", "#065f46", "#34d399", "#6ee7b7"],
        midnight: ["#6366f1", "#a855f7", "#7c3aed", "#4f46e5", "#8b5cf6", "#c084fc"],
        cherry: ["#ec4899", "#f43f5e", "#db2777", "#be185d", "#9d174d", "#f9a8d4"],
        lemon: ["#fbbf24", "#facc15", "#eab308", "#ca8a04", "#a16207", "#fde047"],
        aqua: ["#2dd4bf", "#06b6d4", "#0891b2", "#0e7490", "#14b8a6", "#5eead4"],
        nebula: ["#8b5cf6", "#ec4899", "#d946ef", "#a855f7", "#7c3aed", "#e879f9"],
        lava: ["#ef4444", "#f97316", "#ea580c", "#c2410c", "#dc2626", "#fb923c"],
        cosmic: ["#3b82f6", "#8b5cf6", "#6366f1", "#4f46e5", "#7c3aed", "#a5b4fc"]
    };

    return colorMap[baseColor] || ["#6366f1", "#4f46e5", "#4338ca", "#3730a3", "#818cf8", "#a5b4fc"];
}
