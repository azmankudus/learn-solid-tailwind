---
description: How to add a new language to UI-DEN
---

Follow these steps precisely to register a new locale in the system:

1. **Verify Flag Icon**:
   - Check `src/lib/icons.ts`.
   - If the country flag isn't there, add it using `getIcon(flagIcons, "[cc]-4x3")`.

2. **Create Message Bundle**:
   - Create a new file `src/lib/messages/[locale].ts` (e.g., `fr-FR.ts`).
   - Copy content from `en-US.ts` and translate all keys.
   - **Crucial**: Ensure keys like `appearance.windowed` and `appearance.fullscreen` are included.

3. **Register in i18n Core**:
   - Open `src/lib/i18n.ts`.
   - Import the new bundle.
   - Add to the `messages` record.
   - Add to the `LANGUAGES` array with the appropriate `value`, `label`, and `icon`.

4. **Update Store Types (Optional)**:
   - If you need strict typing for the new locale, update the `lang` signal in `src/lib/store.ts`.

5. **Verify UI**:
   - Check the **Appearance** settings page and the **Personalization** popup in the TopNav.
