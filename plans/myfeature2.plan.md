# Implementation Plan: Dark Mode + Unicorn Mode Compatibility

## Goal
Allow dark mode and unicorn mode to be enabled simultaneously (without one forcibly disabling the other), while preserving existing preferences and UI behavior.

---

## 1) Audit current behavior (baseline)
- JS logic currently prevents combining modes:
  - `applyTheme()` skips toggling when `body` has `unicorn`.
  - `applyUnicornMode()` removes `dark` when unicorn is enabled.
- CSS is mutually exclusive:
  - `body.dark` and `body.unicorn` both set CSS variables and backgrounds.
- Touchpoints:
  - [script.js](../script.js): `applyTheme()`, `applyUnicornMode()`, `handleThemeToggle()`, `handleUnicornToggle()`, `initTheme()`, `initUnicornMode()`
  - [styles.css](../styles.css): `:root`, `body.dark`, `body.unicorn`, `body.unicorn` gradient background

---

## 2) Define combined visual spec (design decision)
- Introduce a combined state: `body.unicorn.dark`.
- Override strategy:
  - Dark mode controls base surface/background/typography contrast.
  - Unicorn mode keeps accent colors, gradients, and effects.
- Example approach:
  - In `body.unicorn.dark`, use dark background tokens with unicorn accent tokens.
  - Ensure text/contrast is readable (primary/secondary text from dark palette).

---

## 3) Update CSS variables for combined state
- Add a `body.unicorn.dark` block in [styles.css](../styles.css) that overrides:
  - `--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--text-primary`, `--text-secondary`, `--border-color`, shadows
  - Keep unicorn palette for `--primary-color`, `--secondary-color`, etc.
- Update unicorn-only gradients that assume light background:
  - `body.unicorn` background should have a dark variant for `body.unicorn.dark`.
- Touchpoints in [styles.css](../styles.css):
  - `body.unicorn`
  - `body.unicorn .app-header h1`
  - Add `body.unicorn.dark` after both for higher specificity.

---

## 4) Adjust theme/unicorn toggle logic (JS)
- Allow both toggles to set their own class independently.
- Update [script.js](../script.js):
  - `applyTheme()` should always toggle `body.dark`, regardless of unicorn.
  - `applyUnicornMode()` should not remove `body.dark`.
  - Ensure ghost icon selection respects combined state (e.g., unicorn + dark = 🦄).
- Keep `aria-pressed`, labels, and icon text behavior intact.

---

## 5) Persistence & backward compatibility
- Keep existing keys:
  - `theme-preference` (`dark`/`light`)
  - `unicorn-mode` (`true`/`false`)
- Migration behavior:
  - If `unicorn-mode` is `true` and `theme-preference` is `dark`, enable both classes at startup.
  - Do not overwrite stored values during migration.
- Verify `initTheme()` and `initUnicornMode()` run order does not conflict; both should apply their class without undoing the other.

---

## 6) Update UI feedback text (optional refinement)
- Optional: add a tooltip or small helper text stating both modes can be active.
- If needed, add i18n strings in [script.js](../script.js) for any new label text.

---

## 7) Acceptance criteria
- ✅ User can enable dark mode and unicorn mode at the same time (both toggles can be pressed).
- ✅ Enabling unicorn mode no longer disables dark mode, and vice versa.
- ✅ The combined state has readable text and accessible contrast.
- ✅ Ghost icon and cursor remain unicorn-themed when unicorn mode is on.
- ✅ Preferences persist across reloads with existing localStorage keys.
- ✅ No regressions to light-only, dark-only, or unicorn-only visuals.

---

## 8) Files & functions to touch
- [script.js](../script.js)
  - `applyTheme()`, `applyUnicornMode()`
  - `handleThemeToggle()`, `handleUnicornToggle()`
  - `initTheme()`, `initUnicornMode()`
- [styles.css](../styles.css)
  - Add `body.unicorn.dark` overrides
  - Adjust `body.unicorn` background handling for dark variant
