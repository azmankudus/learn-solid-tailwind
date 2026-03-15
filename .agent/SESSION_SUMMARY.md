# Session Context & Progress Tracker

This document should be updated at the end of every significant session to provide a "handoff" for the next agent.

## Current State (2026-03-15)
- **i18n**: 10 languages supported.
- **Geographical Module**: Refactored to a headless `useGeoFilter` hook with deep URL state synchronization.
- **Dropdown Search**: Added wildcard support (`*`) and optimized sticky search header UI.
- **QA**: Introduced Vitest for geographical utility functions (`geoUtils.test.ts`).

## Recent Architectural Decisions
- **Headless Logic Extraction**: Moved geographical selection logic and hierarchy prediction out of the view layer into a reusable hook.
- **Universal URL Syncing**: Selection state is now "URL-first", ensuring every map filter change is reflected in the address bar for shareability.
- **Lazy GeoJSON Fetching**: Implemented a dynamic `GEO_LOADERS` pattern to prevent large world/country GeoJSON files from bloating the initial bundle.

## Pending Tasks / Roadmap
- [ ] RTL Support check for Arabic (ar-SA).
- [ ] Implement E2E tests for the full geographical hierarchy flow.
- [ ] Add "Export to Image" feature for the Map component.

## Agent Notes
- When adding a route, remember to add it to `SIDE_NAV_ITEMS` in `src/lib/navigation.tsx` if it's part of the dashboard.
- Always check `isLoaded()` in the store before saving to `localStorage` to prevent default state from overwriting saved user data.
