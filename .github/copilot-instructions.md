# Copilot Instructions for TestCopilot

## Big picture
- Single-page, no-build app: [index.html](index.html) loads [styles.css](styles.css) then [enhanced-styles.css](enhanced-styles.css), and bootstraps [script.js](script.js).
- Core logic lives in `TaskManager` (state, persistence, rendering) with one UI helper class `GhostCursor`.

## Data flow & state
- `TaskManager.tasks` is the source of truth; each task has `id`, `text`, `notes`, `completed`, `createdAt`.
- Persistence is `localStorage` under `storageKey` = `tasks`; theme preference under `themeStorageKey` = `theme-preference`.
- Render pipeline: `render()` → `getFilteredTasks()` → `createTaskElement()` (HTML string) → `taskList.innerHTML`.

## UI behavior patterns (keep consistent)
- Event delegation on `#taskList` for `.task-checkbox`, `.notes`, `.delete` actions.
- Modal notes: `openNotesModal()` sets `aria-hidden=false` and locks body scroll; `closeNotesModal()` restores focus.
- Accessibility: `announce()` injects a transient `role="status"` node; controls use `aria-*` and focus styles.
- Validation in `handleAddTask()`: empty, length limit via `CONFIG.MAX_TASK_LENGTH`, duplicate (case-insensitive).

## Styling conventions
- Theming is via CSS custom properties in `:root` with overrides under `body.dark` (toggled by `applyTheme()`).
- Visual effects live in [styles.css](styles.css); [enhanced-styles.css](enhanced-styles.css) duplicates temp feedback + reduced-motion/hover rules (loaded last to override).
- Ghost cursor is conditionally hidden by media queries (`prefers-reduced-motion`, `hover: none`).

## Developer workflows
- Run by opening [index.html](index.html) directly in a browser (no build/test commands).
- Debug persistence in DevTools → Application → Local Storage; watch console for quota errors from `saveTasks()`.

## Common extension points
- New task fields: update task object in `handleAddTask()`, storage schema, and `createTaskElement()`.
- New filter: add button in [index.html](index.html) with `data-filter` and extend `getFilteredTasks()`.
- Theme changes: update CSS variables in [styles.css](styles.css); dark mode overrides live under `body.dark`.