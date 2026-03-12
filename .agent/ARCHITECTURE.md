# UI-DEN Architecture & Patterns

This document serves as the primary technical context for agents working on the UI-DEN project. Following these patterns ensures consistency and prevents architectural fragmentation.

## 核心技术栈 (Core Tech Stack)
- **Framework**: SolidJS (Fine-grained reactivity)
- **Meta-framework**: SolidStart (SSG + CSR hybrid)
- **Styling**: Tailwind CSS v4.0 (Custom configuration in `index.css`)
- **State**: Solid Signals with `localStorage` persistence
- **Icons**: Iconify (Icon data as JSON to minimize bundle size)

## 状态管理 (State Management)
File: `src/lib/store.ts`
- **Pattern**: Signals are exported directly from the store file.
- **Persistence**: A `createEffect` syncs settings to `localStorage`.
- **Hydration**: Uses a 50ms timeout for setting saved state to avoid SSR hydration mismatches.
- **Global Root**: Logic is wrapped in `createRoot` for cross-tab synchronization.

## 国际化 (Internationalization - i18n)
File: `src/lib/i18n.ts` & `src/lib/messages/`
- **Pattern**: Custom reactive `text()` function.
- **Adding a Language**:
  1. Create `src/lib/messages/[lang-CODE].ts`.
  2. Register in `src/lib/i18n.ts` (Import, add to `messages` object, and `LANGUAGES` array).
  3. Ensure flag icon exists in `src/lib/icons.ts`.

## 导航系统 (Navigation System)
File: `src/lib/navigation.tsx`
- **Pattern**: Centralized `TOP_NAV_ITEMS` and `SIDE_NAV_ITEMS` arrays.
- **Protected Routes**: Navigation items often check `isLoggedIn()` state (managed via standard routing if needed, but UI lists are static).

## 说明 (Layout & Components)
- **PageWrapper**: Every route should be wrapped in `PageWrapper` for consistent transitions and padding.
- **ProtectedLayout**: Injects `SideNav` and handles redirect if not logged in.
- **Design Aesthetic**: Premium glassmorphism. Use `backdrop-blur`, `bg-surface/50`, and `shadow-md` frequently.

## 样式规范 (Styling Rules)
- Use **Tailwind v4** variables (e.g., `text-main`, `bg-nav`, `bg-surface`).
- Avoid hardcoded colors; use the theme-aware classes defined in `index.css`.
- Transitions should use `cubic-bezier(0.4, 0, 0.2, 1)` and `duration-300` for the premium feel.
