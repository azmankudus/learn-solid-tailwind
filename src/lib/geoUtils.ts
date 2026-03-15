
import { CONTINENT_MAP, CONTINENTS } from "./geoData";
import { COUNTRY_OPTIONS } from "./geoLoaders";

/**
 * Returns the continent and subcontinent for a given country.
 */
export function getCountryLocation(country: string) {
  return CONTINENT_MAP[country] || { continent: "Other", subcontinent: "Other" };
}

/**
 * Finds the parent continent for a given subcontinent.
 */
export function getContinentForSubcontinent(subcontinent: string) {
  if (subcontinent === "All") return "All";
  const info = Object.values(CONTINENT_MAP).find(i => i.subcontinent === subcontinent);
  return info ? info.continent : "All";
}

/**
 * Filters a list of country options by subcontinent.
 */
export function filterCountriesBySubcontinent(options: typeof COUNTRY_OPTIONS, subcontinent: string) {
  if (subcontinent === "All") return options;
  return options.filter(opt => {
    if (opt.value === "world") return true;
    return CONTINENT_MAP[opt.value]?.subcontinent === subcontinent;
  });
}
