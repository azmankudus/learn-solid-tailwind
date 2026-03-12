# Session Context & Progress Tracker

This document should be updated at the end of every significant session to provide a "handoff" for the next agent.

## Current State (2026-03-13)
- **i18n**: 10 languages supported (EN, MY, CN, KR, JP, RU, AR, TH, DE, GR).
- **Settings**: Added **Window Mode** (Windowed vs Fullscreen) with native Browser API synchronization.
- **UI Tweaks**: Sidenav arrow icons right-aligned, TopNav personalization panel widened.

## Recent Architectural Decisions
- **Native Fullscreen**: Synced via `fullscreenchange` event in `store.ts` to handle manual ESC exits.
- **Icon Loading**: Icons are retrieved strictly via JSON bundles in `icons.ts` to keep the build light and prevent dynamic import overhead during hydration.

## Pending Tasks / Roadmap
- [ ] RTL Support check for Arabic (ar-SA).
- [ ] Add more "Protected" dummy pages.
- [ ] Implement E2E tests for i18n switching.

## Agent Notes
- When adding a route, remember to add it to `SIDE_NAV_ITEMS` in `src/lib/navigation.tsx` if it's part of the dashboard.
- Always check `isLoaded()` in the store before saving to `localStorage` to prevent default state from overwriting saved user data.
