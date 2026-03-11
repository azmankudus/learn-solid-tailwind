import { describe, it, expect } from "vitest";
import { TOP_NAV_ITEMS, SIDE_NAV_ITEMS } from "../../src/lib/navigation";

describe("Navigation Structure", () => {
  it("should define top-level site navigation", () => {
    expect(TOP_NAV_ITEMS).toBeInstanceOf(Array);
    expect(TOP_NAV_ITEMS.length).toBeGreaterThan(0);
    
    // Check for essential properties
    const homeItem = TOP_NAV_ITEMS.find(i => i.href === "/");
    expect(homeItem).toBeDefined();
    expect(homeItem?.label).toBeDefined();
  });

  it("should define a deep sidebar hierarchy", () => {
    expect(SIDE_NAV_ITEMS).toBeInstanceOf(Array);
    expect(SIDE_NAV_ITEMS.length).toBeGreaterThan(0);
    
    // Check nested structures
    const managementItem = SIDE_NAV_ITEMS.find(i => i.label === "Management");
    if (managementItem) {
      expect(managementItem.children).toBeDefined();
      expect(managementItem.children?.length).toBeGreaterThan(0);
    }
  });

  it("should have all icons properly defined", () => {
    TOP_NAV_ITEMS.forEach(item => {
      expect(item.icon).toBeDefined();
    });
    
    SIDE_NAV_ITEMS.forEach(item => {
      expect(item.icon).toBeDefined();
    });
  });
});
