# Session Context & Progress Tracker

This document should be updated at the end of every significant session to provide a "handoff" for the next agent.

## Current State (2026-03-16)
- **i18n**: 10 languages supported with flag integration.
- **Geographical Module**: Support for multi-country, multi-state, and district-level hierarchies with lazy loading.
- **Input Library**: Fully expanded with `Slider`, `FilePicker`, `ColorPicker`, and `DatePicker`.
- **Button Component**: Enhanced with semantic variants (Success, Error, etc.), icon layouts, and 4-way tooltips (Left/Right/Top/Bottom).
- **Interactive Docs**: Introduced `ComponentViewer` to all input sample pages for live preview/code inspection.
- **Agent Governance**: Created `PROMPTS.md`, `CONTEXT.md`, and `SKILLS.md` to guide future AI assistance.
- **Dropdown Search**: Wildcard support (`*`) and optimized sticky search header UI.
- **QA**: Vitest coverage for geographical utility functions (`geoUtils.test.ts`).
14: - **Workflow Architect**: Completed a high-fidelity n8n-style workflow editor with functional JS execution, infinite canvas, and animated data pulses.

## Recent Architectural Decisions
- **Data Granularity**: Split geographical data from a single country level into state and district files to optimize loading and memory usage.
- **Interactive Documentation Pattern**: Standardized the use of `ComponentViewer` to provide a "story-like" development experience directly in the sample pages.
- **Variant-Based Styling**: Adopted a robust variant system for buttons and inputs to handle semantic states without style leakage.
- **Canvas Interaction Optimization**: Implemented hardware-accelerated SVG animations and transformed coordinate mapping for the infinite designer canvas.
- **Functional Execution Pattern**: Introduced a recursive data-passing engine that allows UI components to behave like functional logical units.
- **Workflow Architect Design**: Adopted an n8n-style architecture for the workflow editor, focusing on functional execution and an infinite canvas.

## Pending Tasks / Roadmap
- [x] Build exactly like n8n workflow editor with all components and functions.
- [ ] Refactor monolithic Chart components into granular atoms (Bar, Pie, Line, Map).
- [ ] Implement `useChart` hook for common ECharts logic (resize, theme, events).
- [ ] Verify RTL Support for Arabic (ar-SA).
- [ ] Add "Export to Image" feature for the Map component.

## Agent Notes
- When adding a route, remember to add it to `SIDE_NAV_ITEMS` in `src/lib/navigation.tsx`.
- Use the `ComponentViewer` for any new UI samples to maintain documentation standards.
- Ensure any new geographical data follow the `country/state/district.json` hierarchy pattern.
