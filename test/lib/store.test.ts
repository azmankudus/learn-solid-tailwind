import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { isLoggedIn, mode, color, setIsLoggedIn, setMode, setColor } from "../../src/lib/store";

// Mock implementation of localStorage for isolated testing
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; }
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Global Data Store", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize with default guest settings", () => {
    expect(isLoggedIn()).toBe(false);
    expect(mode()).toBe("light");
  });

  it("should persistently update login status", () => {
    setIsLoggedIn(true);
    expect(isLoggedIn()).toBe(true);
  });

  it("should persistently update visual themes", () => {
    setMode("dark");
    expect(mode()).toBe("dark");
    
    setColor("rose");
    expect(color()).toBe("rose");
  });

  it("should have correct side effects on the environment", () => {
    setMode("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    
    setMode("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
