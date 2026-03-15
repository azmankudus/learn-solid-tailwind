import { createSignal, createEffect, createMemo, onCleanup, For, Show, JSX } from "solid-js";
import { PageWrapper } from "~/components/layout/PageWrapper";
import { MapChart } from "~/components/content/chart/MapChart";
import { Icon } from "@iconify-icon/solid";
import { ICON_MAP, ICON_ARROW_PATH } from "~/lib/icons";
import { Dropdown } from "~/components/input/Dropdown";
import { Radio } from "~/components/input/Radio";
import { THEMES, getAccentPalette } from "~/lib/theme";
import { chartTheme, color } from "~/lib/store";
import { CONTINENT_MAP, CONTINENTS, CENTROIDS } from "~/lib/geoData";
import { useGeoFilter } from "~/lib/hooks/useGeoFilter";
import { GEO_LOADERS, COUNTRY_OPTIONS } from "~/lib/geoLoaders";

// Comprehensive country list removed, now in geoLoaders.ts

export default function MapPage() {
  const {
    selectedCountry, setSelectedCountry,
    worldMode, setWorldMode,
    selectedContinent, setSelectedContinent,
    selectedSubcontinent, setSelectedSubcontinent,
    selectedState, setSelectedState,
    selectedDistrict, setSelectedDistrict,
    isLoading,
    currentCountryData,
    continentOptions,
    subContinentOptions,
    stateOptions,
    districtOptions,
    filteredCountryOptions,
    resetAll
  } = useGeoFilter();

  const [isMapRefreshing, setIsMapRefreshing] = createSignal(false);
  const [currentGeoJSON, setCurrentGeoJSON] = createSignal<any>(null);
  const [currentMapId, setCurrentMapId] = createSignal("map-world");

  const registerAndComposeMap = () => {
    const country = selectedCountry();
    const mode = worldMode();
    const continent = selectedContinent();
    const subcontinent = selectedSubcontinent();
    const state = selectedState();
    const district = selectedDistrict();
    const data = currentCountryData();

    if (!data.states) return;

    let mapId = `map-${country}`;
    if (country === "world" && mode === "continents") {
      mapId = "map-continents";
    }

    let features: any[] = [];

    // HIERARCHY LOGIC
    if (country === "world") {
      const allFeatures = (data.states as any).features
        .filter((f: any) => f.properties && f.properties.name && !f.properties.name.includes("ne_10m") && !f.properties.name.includes("urn:"));

      if (mode === "continents") {
        if (continent === "All") {
          // Show World Map with Continents as segments
          features = allFeatures.map((f: any) => {
            const p = f.properties;
            const info = CONTINENT_MAP[p.name] || CONTINENT_MAP[p["ISO3166-1-Alpha-3"]] || { continent: "Other", subcontinent: "Other" };
            
            let finalCont = info.continent;
            if (finalCont === "Other") {
              // Fallback heuristic based on longitude
              let lon = 0;
              if (f.geometry.type === 'Point') lon = f.geometry.coordinates[0];
              else if (f.geometry.type === 'Polygon') lon = f.geometry.coordinates[0][0][0];
              else if (f.geometry.type === 'MultiPolygon') lon = f.geometry.coordinates[0][0][0][0];
              
              if (lon > 60 && lon < 150) finalCont = "Asia";
              else if (lon > -20 && lon < 45) finalCont = "Africa";
              else if (lon >= 45 && lon < 60) finalCont = "Asia"; // Middle East edge
              else if (lon > -180 && lon < -30) finalCont = "North America"; // Broad coverage
              else if (lon >= -30 && lon < 60) finalCont = "Europe";
            }

            return {
              ...f,
              properties: { ...f.properties, name: finalCont }
            };
          });
        } else if (subcontinent === "All") {
          // Show Continent Map with Subcontinents as segments
          mapId = `map-continent-${continent}`;
          features = allFeatures
            .map((f: any) => {
              const p = f.properties;
              const info = CONTINENT_MAP[p.name] || CONTINENT_MAP[p["ISO3166-1-Alpha-3"]] || { continent: "Other", subcontinent: "Other" };
              return { ...f, properties: { ...f.properties, continent: info.continent, subcontinent: info.subcontinent } };
            })
            .filter((f: any) => f.properties.continent === continent)
            .map((f: any) => ({
              ...f,
              properties: { ...f.properties, name: f.properties.subcontinent }
            }));
        } else {
          // Show Subcontinent with Countries as segments
          mapId = `map-subcontinent-${subcontinent}`;
          features = allFeatures
            .map((f: any) => {
              const p = f.properties;
              const info = CONTINENT_MAP[p.name] || CONTINENT_MAP[p["ISO3166-1-Alpha-3"]] || { continent: "Other", subcontinent: "Other" };
              return { ...f, properties: { ...f.properties, name: p.name, subcontinent: info.subcontinent } };
            })
            .filter((f: any) => f.properties.subcontinent === subcontinent);
        }
      } else {
        // World Countries mode
        features = allFeatures.map((f: any) => ({ ...f, properties: { ...f.properties, name: f.properties.name } }));
      }
    } else {
      // Standard Country -> State -> District levels
      if (state === "All") {
        features = (data.states as any).features;
      } else if (district === "All" && data.districts) {
        mapId = `map-${country}-${state}`;
        features = (data.districts as any).features.filter((f: any) => {
          const p = f.properties;
          const fState = p.parent_state || p.state || p.STATE || p.STATE_NAME || p.NAME_1 || p.NAME;
          return fState === state || (typeof fState === 'string' && state.includes(fState));
        });
      } else if (district !== "All" && data.districts) {
        mapId = `map-${country}-${state}-${district}`;
        features = (data.districts.features || []).filter((f: any) => {
          const p = f.properties;
          const fName = p.name || p.NAME || p.district || p.COUNTY || p.shapeName;
          return fName === district;
        });
      } else {
        features = (data.states as any).features.filter((f: any) => {
          const p = f.properties;
          const fName = p.NAME_1 || p.name || p.NAME || p.STATE;
          return fName === state;
        });
      }
    }

    if (features.length === 0) return;

    // Final GeoJSON assembly
    const geoJSON = {
      type: 'FeatureCollection',
      features: features.map((f: any) => ({
        ...f,
        properties: {
          ...f.properties,
          name: (f.properties.name === "Other" ? "Unmapped" : f.properties.name) || f.properties.NAME_1 || f.properties.NAME || f.properties.district
        }
      }))
    };

    setCurrentMapId(mapId);
    setCurrentGeoJSON(geoJSON);
  };

  createEffect(() => {
    selectedCountry();
    worldMode();
    selectedContinent();
    selectedSubcontinent();
    selectedState();
    selectedDistrict();
    currentCountryData();

    setIsMapRefreshing(true);
    registerAndComposeMap();
    const timer = setTimeout(() => setIsMapRefreshing(false), 200);
    onCleanup(() => clearTimeout(timer));
  });

  const mapOption = createMemo(() => {
    const theme = chartTheme();
    const activeColor = color();
    const palette = theme === "accent" ? getAccentPalette(activeColor) : (THEMES[theme as keyof typeof THEMES] || THEMES.standard);
    const geo = currentGeoJSON();
    const mode = worldMode();
    const country = selectedCountry();

    const dataMap = new Map();
    const labels: any[] = [];

    geo?.features?.forEach((f: any) => {
      const name = f.properties.name;
      if (!name || name === "Unmapped") return;

      if (!dataMap.has(name)) {
        dataMap.set(name, {
          name,
          value: dataMap.size,
          itemStyle: {
            areaColor: palette[dataMap.size % palette.length]
          }
        });

        // Add static label for continent/subcontinent if centroid exists
        if (country === 'world' && mode === 'continents' && (selectedSubcontinent() === 'All')) {
          const pos = CENTROIDS[name];
          if (pos) {
            labels.push({ name, value: [...pos, 1] });
          }
        }
      }
    });

    const data = Array.from(dataMap.values());
    const mapId = currentMapId();
    const mapBorderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';

    const showStaticLabels = labels.length > 0;

    return {
      tooltip: { trigger: 'item', formatter: '{b}' },
      geo: {
        map: mapId,
        roam: true,
        silent: false, // Must be false to allow zoom/pan events to reach the geo component
        label: { show: false },
        itemStyle: { areaColor: 'transparent', borderColor: 'transparent' }
      },
      series: [
        {
          name: 'Spatial Data',
          type: 'map',
          map: mapId,
          roam: true,
          itemStyle: {
            borderColor: mapBorderColor,
            borderWidth: 0.5
          },
          emphasis: {
            focus: 'self',
            itemStyle: {
              borderColor: mapBorderColor,
              borderWidth: 0.8,
              shadowColor: 'rgba(0,0,0,0.3)',
              shadowBlur: 10,
              areaColor: 'inherit'
            },
            label: {
              show: !showStaticLabels, // Only show hover label if no static label
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: 14,
              textShadowColor: 'rgba(0,0,0,0.5)',
              textShadowBlur: 4
            }
          },
          blur: {
            itemStyle: { opacity: 0.2 },
            label: { show: false }
          },
          data: data
        },
        // Static labels series
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
          label: {
            show: true,
            formatter: '{b}',
            position: 'top',
            color: '#fff',
            fontWeight: '900',
            fontSize: 13,
            textShadowColor: 'rgba(0,0,0,0.8)',
            textShadowBlur: 8,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: [4, 8],
            borderRadius: 6
          },
          itemStyle: { opacity: 0 },
          silent: true,
          data: labels
        }
      ]
    };
  });

  const onChartClick = (params: any) => {
    if (params.componentType !== 'series' || params.seriesType !== 'map') return;
    const clickedName = params.name;
    const country = selectedCountry();
    const mode = worldMode();

    if (country === "world") {
      if (mode === "continents") {
        if (selectedContinent() === "All") {
          if (CONTINENTS.includes(clickedName)) setSelectedContinent(clickedName);
        } else if (selectedSubcontinent() === "All") {
          setSelectedSubcontinent(clickedName);
        }
      } else {
        const found = COUNTRY_OPTIONS.find((c: any) => c.label === (clickedName === "United States of America" ? "United States" : clickedName));
        if (found) setSelectedCountry(found.value);
      }
    } else if (selectedState() === "All") {
      setSelectedState(clickedName);
    } else if (selectedDistrict() === "All" && currentCountryData().districts) {
      setSelectedDistrict(clickedName);
    }
  };

  return (
    <PageWrapper>
      <div class="mb-8 flex items-center justify-between">
        <div class="flex items-center space-x-3 text-3xl font-black tracking-tight">
          <div class="h-10 w-10 bg-theme/10 rounded-xl flex items-center justify-center text-theme">
            <Icon icon={ICON_MAP} width={24} height={24} />
          </div>
          <h1 class="text-main">Geographical Insights</h1>
        </div>
        <button
          onClick={resetAll}
          class="group flex items-center gap-2 px-5 h-11 rounded-2xl bg-theme text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95 font-black text-xs uppercase tracking-widest"
        >
          <Icon icon={ICON_ARROW_PATH} class="group-hover:rotate-180 transition-transform duration-700" />
          Reset View
        </button>
      </div>

      {/* Flexible Multi-Line Controls */}
      <div class="flex flex-col gap-6 mb-10">
        {/* Row 1: Mode Selection */}
        <div class="flex flex-col gap-2">
          <span class="text-[10px] font-black uppercase tracking-widest text-main/40 ml-1">View Mode</span>
          <Radio
            value={worldMode()}
            options={[
              { id: 'countries', label: 'Countries' },
              { id: 'continents', label: 'Continents' }
            ]}
            onChange={(v) => {
              if (v === 'countries') {
                setWorldMode("countries");
                setSelectedContinent("All");
                setSelectedSubcontinent("All");
              } else {
                setWorldMode("continents");
              }
            }}
            class="h-12 w-fit min-w-[320px]"
          />
        </div>

        {/* Row 2: Geographical Filters (Continents only) */}
        <Show when={worldMode() === "continents"}>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div class="flex flex-col gap-2">
              <span class="text-[10px] font-black uppercase tracking-widest text-main/40 ml-1">Continent</span>
              <Dropdown 
                value={selectedContinent()} 
                options={continentOptions()} 
                onChange={(v) => { 
                  setSelectedContinent(v); 
                  setSelectedSubcontinent("All"); 
                }} 
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-[10px] font-black uppercase tracking-widest text-main/40 ml-1">Subcontinent</span>
              <Dropdown 
                value={selectedSubcontinent()} 
                options={subContinentOptions()} 
                onChange={(v) => {
                  setSelectedSubcontinent(v);
                }} 
              />
            </div>
          </div>
        </Show>

        {/* Row 3: Administrative Filters (Always visible, position changes) */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-400">
          <div class="flex flex-col gap-2">
            <span class="text-[10px] font-black uppercase tracking-widest text-main/40 ml-1">Country</span>
            <Dropdown 
              value={selectedCountry()} 
              options={filteredCountryOptions()} 
              searchable={true}
              onChange={(v) => { 
                setSelectedCountry(v); 
              }} 
            />
          </div>

          <div class="flex flex-col gap-2">
            <span class="text-[10px] font-black uppercase tracking-widest text-main/40 ml-1">State / Region</span>
            <Dropdown 
              value={selectedState()} 
              options={stateOptions()} 
              disabled={selectedCountry() === "world"}
              onChange={(v) => { 
                setSelectedState(v); 
                setSelectedDistrict("All"); 
              }} 
            />
          </div>

          <div class="flex flex-col gap-2">
            <span class="text-[10px] font-black uppercase tracking-widest text-main/40 ml-1">District</span>
            <Dropdown 
              value={selectedDistrict()} 
              options={districtOptions()} 
              disabled={selectedCountry() === "world" || selectedState() === "All" || !currentCountryData().districts}
              onChange={setSelectedDistrict} 
            />
          </div>
        </div>
      </div>

      <MapChart
        title={
          selectedDistrict() !== "All" ? selectedDistrict() :
            selectedState() !== "All" ? selectedState() :
              selectedSubcontinent() !== "All" ? selectedSubcontinent() :
                selectedContinent() !== "All" ? selectedContinent() :
                  COUNTRY_OPTIONS.find((c: any) => c.value === selectedCountry())?.label
        }
        subtitle={`${worldMode() === 'continents' ? 'Continental Analytics' : 'Administrative Visualization'} • Fully Offline`}
        option={mapOption()}
        mapId={currentMapId()}
        geoJSON={currentGeoJSON()}
        loading={isLoading()}
        refreshing={isMapRefreshing()}
        onEvents={{ 'click': onChartClick }}
        headerExtra={
          <div class="flex items-center gap-2 text-emerald-500 font-black text-[10px] tracking-[0.2em] uppercase bg-emerald-500/10 px-3 py-1 rounded-full">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Node
          </div>
        }
      />
    </PageWrapper>
  );
}

