import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import * as store from "./store";

describe("Global Store", () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("initializes with default values", () => {
    expect(store.isLoggedIn()).toBe(false);
    expect(store.mode()).toBe("light");
    expect(store.lang()).toBe("en-US");
    expect(store.view()).toBe("wide");
  });

  it("updates state correctly", () => {
    store.setIsLoggedIn(true);
    expect(store.isLoggedIn()).toBe(true);
    
    store.setMode("dark");
    expect(store.mode()).toBe("dark");
  });

  it("persists state to localStorage", async () => {
    // In our implementation, side effects are in a createRoot/createEffect
    // We need to wait for the effect to run
    store.setMode("dark");
    
    // Give Solid some time to run effects
    await new Promise(resolve => setTimeout(resolve, 0));
    
    const saved = JSON.parse(localStorage.getItem("ui-den-settings") || "{}");
    expect(saved.mode).toBe("dark");
  });
});
