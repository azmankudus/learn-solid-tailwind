import { createSignal, createEffect, createRoot } from "solid-js";

const STORAGE_KEY = "antigravity-settings";

const defaultSettings = {
  isLoggedIn: false,
  isSidebarCollapsed: true,
  mode: "light",
  bg: "solid",
  color: "indigo",
  lang: "en-US"
};

// Initialize with default settings to ensure Server-Side Rendering (SSR)
// matches the initial client hydration exactly, preventing Hydration Mismatches.
export const [isLoggedIn, setIsLoggedIn] = createSignal(defaultSettings.isLoggedIn);
export const [isSidebarCollapsed, setIsSidebarCollapsed] = createSignal(defaultSettings.isSidebarCollapsed);
export const [mode, setMode] = createSignal<"light" | "dark">(defaultSettings.mode as "light" | "dark");
export const [bg, setBg] = createSignal(defaultSettings.bg);
export const [color, setColor] = createSignal(defaultSettings.color);
export const [lang, setLang] = createSignal(defaultSettings.lang);
export const [isLoginModalOpen, setIsLoginModalOpen] = createSignal(false);
export const [redirectUrl, setRedirectUrl] = createSignal("");
export const [isLoaded, setIsLoaded] = createSignal(false);

if (typeof window !== "undefined") {
  createRoot(() => {
    // Load from local storage safely
    try {
      const savedString = localStorage.getItem(STORAGE_KEY);
      if (savedString) {
        const saved = JSON.parse(savedString);
        
        // Defer the application of saved state to the next tick.
        // This guarantees that the initial client hydration uses defaultSettings,
        // eliminating the "Hydration Mismatch" error, while still restoring user preferences immediately after.
        setTimeout(() => {
          if (saved.isLoggedIn !== undefined) setIsLoggedIn(saved.isLoggedIn);
          if (saved.isSidebarCollapsed !== undefined) setIsSidebarCollapsed(saved.isSidebarCollapsed);
          if (saved.mode !== undefined) setMode(saved.mode);
          if (saved.bg !== undefined) setBg(saved.bg);
          if (saved.color !== undefined) setColor(saved.color);
          if (saved.lang !== undefined) setLang(saved.lang);
          setIsLoaded(true);
        }, 0);
      } else {
        setIsLoaded(true);
      }
    } catch (e) {
      console.error("Failed to load settings from localStorage", e);
    }

    // Effect to sync state changes back to localStorage and update HTML attributes.
    // Wrapped in createRoot to prevent "computations created outside a createRoot" warning.
    createEffect(() => {
      const settings = {
        isLoggedIn: isLoggedIn(),
        isSidebarCollapsed: isSidebarCollapsed(),
        mode: mode(),
        bg: bg(),
        color: color(),
        lang: lang(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

      const html = document.documentElement;
      if (mode() === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
      
      html.setAttribute("data-theme", color());
      html.setAttribute("data-bg", bg());
    });
  });
}
