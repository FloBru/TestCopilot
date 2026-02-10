# Plan: Enable Dark Mode + Unicorn Mode Together

## Goals
- Allow dark theme to apply while unicorn mode is enabled.
- Keep existing toggles and localStorage preferences intact.

## Step 1: Define combined styling in CSS
- Update selectors to support both classes on `body`: `body.unicorn.dark`.
- Touchpoints:
  - [styles.css](../styles.css) (CSS custom properties and unicorn styles)
- Actions:
  - Keep `body.unicorn` for unicorn palette overrides.
  - Add `body.unicorn.dark` overrides for dark-friendly unicorn palette (text, backgrounds, borders, shadows).
  - Add a dark-version unicorn gradient for `body.unicorn.dark` background.
  - Ensure component-specific overrides (e.g., `body.unicorn .app-header h1`, `.btn-primary`) look good in the dark unicorn variant.

## Step 2: Allow both modes in JS
- Remove the mutual exclusion in theme application and unicorn application.
- Touchpoints:
  - `applyTheme()` in [script.js](../script.js)
  - `applyUnicornMode()` in [script.js](../script.js)
  - `handleThemeToggle()` / `handleUnicornToggle()` in [script.js](../script.js)
- Actions:
  - Let `applyTheme()` always toggle `body.dark` (even if unicorn is active).
  - Let `applyUnicornMode()` stop removing `body.dark`.
  - Update ghost icon logic to pick the correct icon for the three states:
    - light default → `🐇`
    - dark only → `👻`
    - unicorn only → `🦄`
    - unicorn + dark → keep `🦄` (or a distinct dark unicorn if desired).

## Step 3: Localize unicorn toggle labels
- Move hardcoded unicorn toggle text/labels into i18n like the theme toggle.
- Touchpoints:
  - `STRINGS` in [script.js](../script.js)
  - `applyUnicornMode()` in [script.js](../script.js)
  - Unicorn toggle markup in [index.html](../index.html)
- Actions:
  - Add `unicorn.ariaEnable` / `unicorn.ariaDisable` and button text strings per language.
  - Update `applyUnicornMode()` to use `t()` for aria label and text.

## Step 4: Visual regression review
- Manually verify styles in both modes and both together.
- Touchpoints:
  - [styles.css](../styles.css)
  - [enhanced-styles.css](../enhanced-styles.css)

## Migration / Backward Compatibility
- Keep storage keys and boolean values as-is:
  - `theme-preference` (`dark`/`light`)
  - `unicorn-mode` (`true`/`false`)
- Existing users will keep preferences; now both can be active simultaneously with no migration.

## Acceptance Criteria
- Toggling dark mode while unicorn mode is enabled keeps unicorn visuals but switches to a dark palette.
- `body` can have both `dark` and `unicorn` classes concurrently.
- Theme toggle and unicorn toggle both reflect correct aria labels and text for all languages.
- No regressions in non-unicorn light/dark themes.
- Ghost icon and background gradient look correct in all four combinations.
