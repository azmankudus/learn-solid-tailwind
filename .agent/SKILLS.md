# Agent Skills Index

Skills are specialized knowledge packs and design principles that agents must follow to maintain project integrity.

## 🛠️ Available Skills

### 1. [Premium UI Design (UI-DEN Style)](./skills/ui-design/SKILL.md)
*   **Purpose**: Maintaining the professional dashboard aesthetic.
*   **Key Patterns**: Glassmorphism, specific micro-animations, and type-safe layout signals.
*   **Usage**: Should be "Active" for any task involving `src/components/` or `src/routes/`.

### 2. [Geographical Hierarchy Management](./ARCHITECTURE.md#地理位置与层级)
*   **Purpose**: Ensuring complex map data remains consistent and synchronized.
*   **Key Patterns**: `useGeoFilter` usage, lazy-load loaders, and Vitest-backed utility functions.
*   **Usage**: Required for map features, data optimization, or regional filtering updates.

### 3. [Advanced Internationalization (i18n)](./ARCHITECTURE.md#国际化)
*   **Purpose**: Managing a multi-lingual interface with reactive updates.
*   **Key Patterns**: Dictionary-based translations, reactive `text()` helper, and dynamic flag integration.
*   **Usage**: Required when adding new features that contain user-facing strings.

---

## 🏗️ Registering a New Skill
To add a new skill to the ecosystem:
1. Create a directory: `.agent/skills/[skill-name]/`.
2. Create `SKILL.md` inside that directory with detailed instructions.
3. Update this index file.
