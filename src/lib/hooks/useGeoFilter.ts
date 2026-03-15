
import { createSignal, createMemo, createEffect } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { CONTINENT_MAP, CONTINENTS } from "~/lib/geoData";
import { COUNTRY_OPTIONS, GEO_LOADERS } from "~/lib/geoLoaders";
import { getCountryLocation, getContinentForSubcontinent, filterCountriesBySubcontinent } from "~/lib/geoUtils";

export interface GeoFilterState {
  country: string;
  mode: "countries" | "continents";
  continent: string;
  subcontinent: string;
  state: string;
  district: string;
}

export function useGeoFilter() {
  const [params, setParams] = useSearchParams();

  // Helper to ensure we get a string from search params
  const getParam = (key: string, def: string) => {
    const val = params[key];
    if (Array.isArray(val)) return val[0] || def;
    return val || def;
  };

  // 1. Initial State from URL or Defaults
  const [selectedCountry, setSelectedCountry] = createSignal(getParam("country", "world"));
  const [worldMode, setWorldMode] = createSignal<"countries" | "continents">(getParam("mode", "countries") as any);
  const [selectedContinent, setSelectedContinent] = createSignal(getParam("continent", "All"));
  const [selectedSubcontinent, setSelectedSubcontinent] = createSignal(getParam("subcontinent", "All"));
  const [selectedState, setSelectedState] = createSignal(getParam("state", "All"));
  const [selectedDistrict, setSelectedDistrict] = createSignal(getParam("district", "All"));

  // 2. Data Loading State
  const [isLoading, setIsLoading] = createSignal(false);
  const [currentCountryData, setCurrentCountryData] = createSignal<{ states: any, districts: any }>({ states: null, districts: null });

  // 3. Sync State to URL
  createEffect(() => {
    setParams({
      country: selectedCountry(),
      mode: worldMode(),
      continent: selectedContinent(),
      subcontinent: selectedSubcontinent(),
      state: selectedState(),
      district: selectedDistrict()
    }, { replace: true });
  });

  // 4. Data Loading Effect
  createEffect(async () => {
    const country = selectedCountry();
    const state = selectedState();
    setIsLoading(true);

    try {
      const config = GEO_LOADERS[country];
      if (config) {
        const statesData = await config.states();
        let districtsData = null;
        
        if (state !== "All" && config.districts) {
          districtsData = await config.districts(state);
        }
        
        setCurrentCountryData({ states: statesData, districts: districtsData });
      } else if (country !== "world") {
        const worldData = (await import("~/lib/countries/world.json")).default as any;
        const feature = worldData.features.find((f: any) => f.properties.name === country);
        if (feature) {
          setCurrentCountryData({
            states: { type: "FeatureCollection", features: [feature] },
            districts: null
          });
        }
      } else {
        const statesData = await GEO_LOADERS.world.states();
        setCurrentCountryData({ states: statesData, districts: null });
      }
    } catch (e) {
      console.error("Failed to load map data in useGeoFilter:", e);
    } finally {
      setIsLoading(false);
    }
  });

  // 5. Derived Options
  const continentOptions = createMemo(() => [
    { value: "All", label: "All Continents" },
    ...CONTINENTS.map(c => ({ value: c, label: c }))
  ]);

  const subContinentOptions = createMemo(() => {
    const continent = selectedContinent();
    const subcontinents = new Set<string>();
    Object.values(CONTINENT_MAP).forEach(info => {
      if (continent === "All" || info.continent === continent) {
        subcontinents.add(info.subcontinent);
      }
    });
    return [
      { value: "All", label: "All Subcontinents" },
      ...Array.from(subcontinents).sort().map(s => ({ value: s, label: s }))
    ];
  });

  const stateOptions = createMemo(() => {
    const country = selectedCountry();
    if (country === "world") return [{ value: "All", label: "All States" }];
    
    const data = currentCountryData().states;
    if (!data) return [{ value: "All", label: "All States" }];
    const names = new Set<string>();
    (data as any).features?.forEach((f: any) => {
      const p = f.properties;
      const name = p.NAME_1 || p.name || p.NAME || p.STATE || p.shapeName;
      if (name) names.add(name);
    });
    return [{ value: "All", label: "All States" }, ...Array.from(names).sort().map(n => ({ value: n, label: n }))];
  });

  const districtOptions = createMemo(() => {
    const country = selectedCountry();
    const state = selectedState();
    if (country === "world" || state === "All") return [{ value: "All", label: "All Districts" }];
    
    const data = currentCountryData().districts;
    if (!data || state === "All") return [{ value: "All", label: "All Districts" }];
    const names = new Set<string>();
    (data as any).features?.forEach((f: any) => {
      const p = f.properties;
      const name = p.name || p.NAME || p.district || p.shapeName;
      const fState = p.parent_state || p.state || p.STATE || p.STATE_NAME || p.NAME_1;
      if (name && (fState === state)) names.add(name);
    });
    return [{ value: "All", label: "All Districts" }, ...Array.from(names).sort().map(n => ({ value: n, label: n }))];
  });

  const filteredCountryOptions = createMemo(() => {
    return filterCountriesBySubcontinent(COUNTRY_OPTIONS, selectedSubcontinent());
  });

  // 6. Helper functions (Resetters & Setters with hierarchy prediction)
  const resetAll = () => {
    setSelectedCountry("world");
    setSelectedContinent("All");
    setSelectedSubcontinent("All");
    setSelectedState("All");
    setSelectedDistrict("All");
  };

  const handleCountryChange = (v: string) => {
    const m = worldMode();
    const c = selectedContinent();
    const s = selectedSubcontinent();
    resetAll();
    setSelectedCountry(v);
    setWorldMode(m);

    if (v !== "world") {
      const info = getCountryLocation(v);
      if (info.continent !== "Other") {
        setSelectedContinent(info.continent);
        setSelectedSubcontinent(info.subcontinent);
      }
    } else {
      setSelectedContinent(c);
      setSelectedSubcontinent(s);
    }
  };

  const handleSubcontinentChange = (v: string) => {
    setSelectedSubcontinent(v);
    const cont = getContinentForSubcontinent(v);
    if (cont !== "All") setSelectedContinent(cont);
  };

  return {
    // Signals
    selectedCountry, setSelectedCountry: handleCountryChange,
    worldMode, setWorldMode,
    selectedContinent, setSelectedContinent,
    selectedSubcontinent, setSelectedSubcontinent: handleSubcontinentChange,
    selectedState, setSelectedState,
    selectedDistrict, setSelectedDistrict,
    isLoading,
    currentCountryData,
    
    // Options
    continentOptions,
    subContinentOptions,
    stateOptions,
    districtOptions,
    filteredCountryOptions,
    
    // Helpers
    resetAll
  };
}
