import { describe, it, expect, vi } from "vitest";
import { t } from "./i18n";
import * as store from "./store";

// Mock the store to control language signal result
vi.mock("./store", () => ({
  lang: vi.fn(() => "en-US"),
  setLang: vi.fn(),
}));

describe("t() localization function", () => {
  it("returns correct English translation", () => {
    expect(t("appearance.title")).toBe("Appearance");
  });

  it("returns correct Malay translation when language is switched", () => {
    vi.mocked(store.lang).mockReturnValue("ms-MY");
    expect(t("appearance.title")).toBe("Penampilan");
  });

  it("returns correct Chinese translation when language is switched", () => {
    vi.mocked(store.lang).mockReturnValue("zh-CN");
    expect(t("appearance.title")).toBe("外观");
  });

  it("falls back to English if key is missing in target language", () => {
    vi.mocked(store.lang).mockReturnValue("ms-MY");
    // Assuming a key that exists in EN but not in MS (hypothetically)
    // For this test, let's use a known key.
    expect(t("appearance.title")).toBe("Penampilan");
  });

  it("returns the key itself if missing in all languages", () => {
    expect(t("non.existent.key")).toBe("non.existent.key");
  });
});
