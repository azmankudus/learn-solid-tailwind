
import { describe, it, expect } from "vitest";
import { getCountryLocation, getContinentForSubcontinent, filterCountriesBySubcontinent } from "./geoUtils";
import { COUNTRY_OPTIONS } from "./geoLoaders";

describe("geoUtils", () => {
  describe("getCountryLocation", () => {
    it("should return correct location for known countries", () => {
      expect(getCountryLocation("Malaysia")).toEqual({
        continent: "Asia",
        subcontinent: "South-Eastern Asia"
      });
      expect(getCountryLocation("Germany")).toEqual({
        continent: "Europe",
        subcontinent: "Western Europe"
      });
    });

    it("should return Other for unknown countries", () => {
      expect(getCountryLocation("UnknownLand")).toEqual({
        continent: "Other",
        subcontinent: "Other"
      });
    });
  });

  describe("getContinentForSubcontinent", () => {
    it("should return parent continent", () => {
      expect(getContinentForSubcontinent("South-Eastern Asia")).toBe("Asia");
      expect(getContinentForSubcontinent("Western Europe")).toBe("Europe");
    });

    it("should return All for 'All'", () => {
      expect(getContinentForSubcontinent("All")).toBe("All");
    });
  });

  describe("filterCountriesBySubcontinent", () => {
    it("should filter countries correctly", () => {
      const results = filterCountriesBySubcontinent(COUNTRY_OPTIONS, "South-Eastern Asia");
      const names = results.map(r => r.value);
      expect(names).toContain("Malaysia");
      expect(names).toContain("Thailand");
      expect(names).not.toContain("Germany");
    });

    it("should always include 'world' if present", () => {
      const results = filterCountriesBySubcontinent(COUNTRY_OPTIONS, "Western Europe");
      expect(results.some(r => r.value === "world")).toBe(true);
    });
  });
});
