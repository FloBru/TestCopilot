# Task Manager App

A single-page, no-build task manager with local persistence, theming, and a notes modal.

## Features
- Add, complete, filter, and delete tasks
- Notes per task with modal editor
- Language toggle (EN/DE/ES)
- Dark mode and Unicorn mode
- Local persistence via `localStorage`
- Accessibility helpers (ARIA labels, live announcements, focus trap)

## Getting started
- Open [index.html](index.html) directly in a browser.
- No build tools or dev server required.

## Usage
- Add a task using the input field and **Add Task** button.
- Toggle task completion via the checkbox.
- Use **Notes** to add task notes.
- Use filters to view **All**, **Active**, or **Completed** tasks.
- Use **Clear Completed** to remove finished tasks.
- Toggle themes with **Dark mode** or **Unicorn mode**.

## Data & storage
- Tasks are stored under `localStorage` key `tasks`.
- Theme preference is stored under `theme-preference`.
- Unicorn mode preference is stored under `unicorn-mode`.
- Language preference is stored under `language-preference`.

## Project structure
- [index.html](index.html): App markup
- [styles.css](styles.css): Base styles and theme variables
- [enhanced-styles.css](enhanced-styles.css): Enhanced effects and motion handling
- [styles-language-toggle.css](styles-language-toggle.css): Language toggle styling
- [script.js](script.js): Task logic, rendering, and UI behavior

## Customization
- Update theme colors in [styles.css](styles.css) under `:root` and `body.dark`.
- Unicorn mode styles are in [styles.css](styles.css) under `body.unicorn`.
- Add languages by extending `STRINGS` in [script.js](script.js).

## Accessibility
- Buttons include `aria-*` attributes and live region announcements.
- Notes modal traps focus and supports Escape to close.

## Troubleshooting
- If tasks don’t persist, check browser storage limits in DevTools → Application → Local Storage.
