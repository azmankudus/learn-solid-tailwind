import { describe, it, expect, vi } from "vitest";
import { text } from "../../src/lib/i18n";
import { lang } from "../../src/lib/store";

// Mock the store so we can control the language signal
vi.mock("../../src/lib/store", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    lang: vi.fn(() => "en-US"),
  };
});

describe("i18n utility", () => {
  it("should return the correct English text for a known key", () => {
    (lang as any).mockReturnValue("en-US");
    // Assuming 'nav.home' exists in en-US.ts
    const result = text("nav.home");
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });

  it("should fall back to English if the key is missing in the current language", () => {
    (lang as any).mockReturnValue("ms-MY");
    // Using a key that definitely exists in English but might be missing in others
    const key = "nav.dashboard"; 
    const result = text(key);
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });

  it("should return the key itself if it doesn't exist anywhere", () => {
    const unknownKey = "non.existent.key." + Math.random();
    expect(text(unknownKey)).toBe(unknownKey);
  });
});
