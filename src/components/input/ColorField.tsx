
import { createSignal, createEffect, onCleanup, Show, createMemo, For } from "solid-js";
import { isServer } from "solid-js/web";
import { Icon } from "@iconify-icon/solid";
import { ICON_SWATCH, ICON_PAINT_BRUSH } from "~/lib/icons";

export interface ColorFieldProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  class?: string;
}

export function ColorField(props: ColorFieldProps) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [placement, setPlacement] = createSignal<"bottom" | "top">("bottom");
  const [isDraggingSV, setIsDraggingSV] = createSignal(false);
  const [isDraggingHue, setIsDraggingHue] = createSignal(false);
  
  let containerRef: HTMLDivElement | undefined;
  let popupRef: HTMLDivElement | undefined;
  let svRef: HTMLDivElement | undefined;
  let hueRef: HTMLDivElement | undefined;

  // Helper Functions
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (n: number) => {
      const h = Math.max(0, Math.min(255, n)).toString(16);
      return h.length === 1 ? '0' + h : h;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const rgbToHsv = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max !== min) {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
  };

  const hsvToRgb = (h: number, s: number, v: number) => {
    s /= 100; v /= 100;
    let r = 0, g = 0, b = 0;
    const i = Math.floor(h / 60);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  };

  // Sync HSV with internal value
  const [hsv, setHsv] = createSignal({ h: 0, s: 0, v: 0 });
  
  createEffect(() => {
    const rgb = hexToRgb(props.value);
    const newHsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    // Don't update hue if saturation is 0 (prevents hue jumping to 0 when picking white/black)
    if (newHsv.s > 0 || isDraggingSV()) {
        setHsv(prev => ({ ...newHsv, h: isDraggingHue() ? prev.h : newHsv.h }));
    } else {
        setHsv(prev => ({ ...newHsv, h: prev.h }));
    }
  });

  const updateFromSV = (clientX: number, clientY: number) => {
    if (!svRef) return;
    const rect = svRef.getBoundingClientRect();
    const s = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const v = Math.max(0, Math.min(100, (1 - (clientY - rect.top) / rect.height) * 100));
    const rgb = hsvToRgb(hsv().h, s, v);
    props.onChange(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const updateFromHue = (clientX: number) => {
    if (!hueRef) return;
    const rect = hueRef.getBoundingClientRect();
    const h = Math.max(0, Math.min(360, ((clientX - rect.left) / rect.width) * 360));
    const rgb = hsvToRgb(h, hsv().s, hsv().v);
    props.onChange(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  createEffect(() => {
    if (isServer) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSV()) updateFromSV(e.clientX, e.clientY);
      if (isDraggingHue()) updateFromHue(e.clientX);
    };
    const handleMouseUp = () => {
      setIsDraggingSV(false);
      setIsDraggingHue(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef && !containerRef.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleClickOutside);
    onCleanup(() => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleClickOutside);
    });
  });

  createEffect(() => {
    if (isServer) return;
    if (isOpen() && containerRef) {
      setPlacement("bottom");
      requestAnimationFrame(() => {
        if (!containerRef || !popupRef) return;
        const rect = containerRef.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const popupHeight = popupRef.scrollHeight;
        if (spaceBelow < popupHeight && spaceAbove > popupHeight) {
          setPlacement("top");
        }
      });
    }
  });

  return (
    <div 
      class={`relative w-full ${isOpen() ? 'z-50' : 'z-10'} ${props.class || ""}`} 
      ref={containerRef}
    >
      <Show when={props.label}>
        <label class="text-[0.85rem] font-black text-main ml-1 tracking-wide block mb-2 uppercase">{props.label}</label>
      </Show>
      
      <div 
        onClick={() => !props.disabled && setIsOpen(!isOpen())}
        class="w-full relative flex items-center bg-input border border-input-border rounded-2xl group transition-all duration-300 shadow-sm"
        classList={{
          "hover:border-theme cursor-pointer": !props.disabled,
          "opacity-50 grayscale-[0.5] pointer-events-none": props.disabled
        }}
      >
        <div class="flex items-center gap-3 px-4 py-3.5 flex-1 min-w-0">
          <div 
            class="h-6 w-6 rounded-full border border-black/10 shadow-sm shrink-0" 
            style={{ "background-color": props.value }}
          />
          <span class="text-sm font-bold text-main uppercase font-mono tracking-wider">{props.value}</span>
        </div>
        
        <button
          class="h-full px-2 flex items-center justify-center border-l border-input-border group-hover:border-theme/30 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen());
          }}
        >
          <div 
            class="h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-300"
            classList={{
              "bg-theme text-white shadow-lg scale-110": isOpen(),
              "bg-theme/5 text-theme group-hover:bg-theme/20": !isOpen()
            }}
          >
            <Icon icon={ICON_PAINT_BRUSH} width={20} height={20} />
          </div>
        </button>

        {/* Color Picker Popup */}
        <div 
          ref={popupRef}
          onClick={(e) => e.stopPropagation()}
          classList={{
            "absolute left-0 z-[1000] p-4 bg-surface border border-input-border shadow-2xl rounded-2xl transition-all duration-300 ease-out w-72": true,
            "opacity-100 translate-y-0 scale-100": isOpen(),
            "opacity-0 pointer-events-none -translate-y-2 scale-95": !isOpen()
          }}
          style={placement() === "bottom" ? { top: "calc(100% + 8px)" } : { bottom: "calc(100% + 8px)" }}
        >
          <div class="space-y-4">
            {/* Visual Picker Area */}
            <div 
              ref={svRef}
              class="relative w-full h-40 rounded-xl overflow-hidden cursor-crosshair select-none"
              style={{ "background-color": `hsl(${hsv().h}, 100%, 50%)` }}
              onMouseDown={(e) => {
                setIsDraggingSV(true);
                updateFromSV(e.clientX, e.clientY);
              }}
            >
              <div class="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
              <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div 
                class="absolute h-4 w-4 border-2 border-white rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.5)] -translate-x-1/2 translate-y-1/2 pointer-events-none"
                style={{ 
                  left: `${hsv().s}%`, 
                  bottom: `${hsv().v}%` 
                }}
              />
            </div>

            {/* Hue Slider */}
            <div 
              ref={hueRef}
              class="relative w-full h-3 rounded-full cursor-pointer select-none"
              style={{ background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' }}
              onMouseDown={(e) => {
                setIsDraggingHue(true);
                updateFromHue(e.clientX);
              }}
            >
              <div 
                class="absolute top-1/2 -translate-y-1/2 h-5 w-5 bg-white border-2 border-theme rounded-full shadow-lg -translate-x-1/2 pointer-events-none"
                style={{ left: `${(hsv().h / 360) * 100}%` }}
              />
            </div>

            <div class="h-px bg-input-border" />

            {/* Inputs & Swatches */}
            <div class="space-y-3">
              <div class="flex items-end gap-3">
                <div class="flex-1">
                  <label class="text-[9px] font-black text-muted uppercase tracking-[0.2em] mb-1.5 block">Hex Code</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted font-bold">#</span>
                    <input 
                      type="text" 
                      value={props.value.replace('#', '')}
                      onInput={(e) => {
                        const val = e.currentTarget.value;
                        if (/^[0-9a-fA-F]{3,6}$/.test(val)) {
                            props.onChange(`#${val}`);
                        }
                      }}
                      class="w-full bg-input border border-input-border rounded-xl pl-6 pr-3 py-2 text-xs font-bold font-mono text-main focus:border-theme outline-none uppercase"
                    />
                  </div>
                </div>
                <div 
                  class="h-8 w-12 rounded-xl border border-black/5 shadow-inner"
                  style={{ "background-color": props.value }}
                />
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="grid grid-cols-3 gap-1 col-span-2">
                  <For each={["#ef4444", "#f97316", "#f59e0b", "#10b981", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef", "#000000"]}>
                    {(c: string) => (
                      <button 
                        onClick={() => props.onChange(c)}
                        class="h-6 w-full rounded-lg border border-black/5 hover:scale-110 transition-transform shadow-sm cursor-pointer"
                        style={{ "background-color": c }}
                      />
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
