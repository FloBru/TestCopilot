# Implementation plan: Dark mode + Unicorn mode compatibility

## 1) Clarify desired behavior and state model
- Allow `dark` and `unicorn` to be active simultaneously (composable).
- Keep existing localStorage keys (`theme-preference`, `unicorn-mode`) for backward compatibility.
- Treat the effective theme as a combination of `dark` + `unicorn` flags.

## 2) Update theme/unicorn state handling in JS
- Touchpoints: [script.js](../script.js) — `applyTheme()`, `applyUnicornMode()`, `handleThemeToggle()`, `handleUnicornToggle()`, `initTheme()`, `initUnicornMode()`.
- Update `applyTheme()` to always toggle `body.dark` even if `body.unicorn` is present.
- Update `applyUnicornMode()` to stop removing `body.dark` when unicorn mode activates; only toggle `body.unicorn`.
- Ensure ghost icon logic respects both states (e.g., unicorn icon when unicorn is on; otherwise moon/sun logic).
- Keep toggle text/aria labels accurate for each mode.

## 3) Introduce composable CSS variables for unicorn-dark
- Touchpoints: [styles.css](../styles.css) (and optionally [enhanced-styles.css](../enhanced-styles.css)).
- Add a `body.unicorn.dark` (or `.dark.unicorn`) selector that overrides the unicorn palette to a darker variant.
- Keep `body.unicorn` as the light unicorn palette.
- Ensure contrast for text, borders, and background gradients in unicorn-dark.

## 4) Update unicorn-specific component styles to support dark variant
- Touchpoints: [styles.css](../styles.css) — `body.unicorn .app-header h1`, `.btn-primary`, `.task-item`, `.task-item.completed`, `.ghost`.
- Add `body.unicorn.dark` overrides where current unicorn styles assume light backgrounds.
- Confirm gradients and glow effects remain readable in dark unicorn mode.

## 5) Ensure toggle UI remains consistent
- Touchpoints: [index.html](../index.html) (toggle buttons), [script.js](../script.js) for label updates.
- Verify `themeToggle` and `unicornToggle` stay independent and their `aria-pressed` states reflect only their own mode.
- Confirm `applyTheme()` updates toggle text/icons even when unicorn mode is on.

## 6) Migration and backward-compatibility
- Preserve existing localStorage schema:
  - `theme-preference`: `"dark"`/`"light"`
  - `unicorn-mode`: `"true"`/`"false"`
- On load, apply both flags without forcing one off.
- Do not modify stored values for existing users; just allow stacking.

## 7) Acceptance criteria
- Dark mode can be enabled while unicorn mode is on; both apply together.
- Toggling unicorn mode does not disable dark mode (and vice versa).
- Visuals look correct in all four combinations:
  - Light + non-unicorn
  - Dark + non-unicorn
  - Light + unicorn
  - Dark + unicorn
- Toggle buttons remain accurate (`aria-pressed`, labels, icons).
- Ghost cursor behavior and modal styles are not regressed under combined mode.
