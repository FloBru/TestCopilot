# Plan: Dark Mode + Unicorn Mode Compatibility

## Scope summary
Enable dark mode to coexist with unicorn mode by allowing both classes on `body` and defining combined theme overrides (CSS variables + visuals). Keep existing toggles and storage keys, but update logic to avoid mutual exclusion.

## Steps (codebase-specific)

1. **Audit current theme/unicorn behavior**
   - JS: `applyTheme()`, `applyUnicornMode()`, `handleThemeToggle()`, `handleUnicornToggle()`, `initTheme()`, `initUnicornMode()` in [script.js](../script.js).
   - CSS: theme variables in [styles.css](../styles.css) under `:root`, `body.dark`, `body.unicorn`.
   - UI toggles: buttons in [index.html](../index.html) with `#themeToggle`, `#unicornToggle`.

2. **Allow simultaneous classes on `body`**
   - Update `applyTheme()` to always toggle `body.dark`, even if unicorn is active.
   - Update `applyUnicornMode()` to no longer remove `body.dark` when enabling unicorn.
   - Ensure icon logic (ghost emoji) reflects combined state (e.g., unicorn + dark → themed ghost or unicorn).

   **Touchpoints**
   - `applyTheme()` in [script.js](../script.js)
   - `applyUnicornMode()` in [script.js](../script.js)

3. **Define combined theme tokens**
   - Add a new rule block `body.unicorn.dark` (or `.dark.unicorn`) that overrides `--bg-*`, `--text-*`, `--border-color`, and other key variables for a “dark unicorn” palette.
   - Adjust gradient handling so the unicorn background has a darker variant when `.dark.unicorn` is present.

   **Touchpoints**
   - `body.unicorn` and `body.dark` blocks in [styles.css](../styles.css)
   - New combined selector: `body.unicorn.dark` in [styles.css](../styles.css)

4. **Update ghost cursor visuals**
   - Update ghost icon logic to handle four states:
     - light only → 🐇
     - dark only → 👻
     - unicorn only → 🦄
     - dark + unicorn → 🦄 (or a distinct dark unicorn icon)
   - Optionally add a `body.unicorn.dark .ghost` glow tweak for visibility.

   **Touchpoints**
   - Ghost icon updates in [script.js](../script.js)
   - `body.unicorn .ghost` styles in [styles.css](../styles.css)

5. **Ensure toggle labels stay correct**
   - Keep `aria-pressed` and `aria-label` logic correct when toggles are used independently.
   - Avoid any side effects that flip the other toggle’s UI state.

   **Touchpoints**
   - Toggle UI updates in [script.js](../script.js)

6. **Verify rendering and accessibility**
   - Check contrast for text, buttons, and focus outlines in the combined palette.
   - Ensure gradients and shadows do not reduce legibility.

   **Touchpoints**
   - Theme variables and focus styles in [styles.css](../styles.css)

## Migration / backward compatibility
- Keep storage keys unchanged: `theme-preference` and `unicorn-mode`.
- Existing values continue to load; combined state is derived by applying both classes independently.
- Default behavior: if unicorn is on, dark preference still applies.

## Acceptance criteria
- Dark mode can be enabled/disabled while unicorn mode is active, without turning unicorn mode off.
- Unicorn mode can be enabled/disabled while dark mode is active, without turning dark mode off.
- Combined state restores correctly from localStorage after reload.
- Dark+unicorn palette maintains readable text and visible focus outlines.
- Ghost cursor updates correctly for all four states.
