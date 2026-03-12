# Skill: Premium UI Design (UI-DEN Style)

This skill encompasses the design principles required to maintain the "Professional Dashboard" aesthetic of UI-DEN.

## Design Tokens
- **Surface**: `bg-surface` (Semi-transparent, blurred white/gray)
- **Navigation**: `bg-nav` (Glassmorphic backdrop)
- **Primary Color**: `bg-theme` / `text-theme` (Dynamic accent)
- **Text**: `text-main` (High contrast), `text-muted` (Supporting info)

## Component Patterns

### Glassmorphism
Apply this to cards, popups, and side panels:
```tsx
class="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-lg"
```

### Interactive Elements
- **Buttons**: Should have `active:scale-95 transition-all duration-300 transform`.
- **Hover**: Subtle brightness increase or shadow elevation.
- **Toggles**: Use `SegmentedToggle` for mode switching (not generic checkboxes).

### Transitions (Fine-Grained)
Use the `layout-view-transition` class on container elements wraping route content.
Ensure `duration-300` and `ease-[cubic-bezier(0.4,0,0.2,1)]`.

### Layout
- Use `PageWrapper` for route-level padding and fade-in animations.
- Respect the `view()` signal for max-width (`center` vs `wide`).

## Avoid
- No sharp 90-degree corners (use `rounded-xl` or `rounded-2xl`).
- No solid #000 or #FFF backgrounds without blur/transparency.
- No standard browser scrollbars (use the `custom-scrollbar` class).
