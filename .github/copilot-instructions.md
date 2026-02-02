# Copilot Instructions for TestCopilot

## Project Overview
**Task Manager** — A vanilla JavaScript SPA (Single Page Application) with persistent local storage. Fully client-side with no backend, framework dependencies, or build system. Includes accessibility-first design, modular CSS patterns, and decorative animations.

## Architecture

### Core Structure
- **[index.html](index.html)**: Single HTML document with semantic structure (header, main, footer) + modal for task notes
- **[script.js](script.js)**: `TaskManager` class (502 lines) + `GhostCursor` + `CherryBlossoms` animations
- **[styles.css](styles.css)**: CSS custom properties + accessibility patterns + decorative animations (834 lines)

### Data Flow
1. **User Input** → Form submission (task-input-form) validated for: empty check, 100-char limit, duplicate detection
2. **State Management** → `TaskManager.tasks` array (each task has: `id`, `text`, `notes`, `completed`, `createdAt`)
3. **Persistence** → `localStorage` with key `'tasks'` (JSON serialization, error handling for quota exceeded)
4. **Rendering** → DOM reconstruction via `render()` → `createTaskElement()` (filtered by `currentFilter`)
5. **Analytics** → Stats auto-update: total, completed, remaining tasks

## Key Patterns & Conventions

### JavaScript: Single Class Pattern
- All logic in `TaskManager` class; DOM cache all refs in constructor; event delegation on task list
- **Task Actions**: Checkbox (complete toggle), Notes button (modal open), Delete button (with confirmation for bulk clear)
- **XSS Prevention**: All user text runs through `escapeHtml()` before HTML insertion
- **Accessibility**: `aria-*` attributes, screen reader announcements, live regions, modal focus management

### Filtering Logic
```javascript
currentFilter: 'all' | 'active' | 'completed'  // Button state synced via aria-pressed
getFilteredTasks()  // Returns filtered view; render() respects this
```

### CSS: CSS Custom Properties (Root Variables)
Located at `:root` scope. Primary workflow: indigo/purple gradient (`--primary-color: #6366f1`), green for success, red for danger. Layout uses flexbox. Animations: cherry blossoms (falling), ghost cursor (easing follow).

### Event Flow
- **Form Submit** → `handleAddTask()` → validation → `tasks.unshift()` → `saveTasks()` → `render()` → input reset + focus + screen reader announce
- **Checkbox Click** → `handleCompleteTask()` → toggle `task.completed` → `saveTasks()` → `render()`
- **Modal (Notes)** → `handleOpenNotes()` → populate textarea → `openNotesModal()` (sets `aria-hidden=false`, `body.overflow=hidden`) → `handleSaveNotes()` → save to `task.notes` → close

## Developer Workflows

### Starting/Testing
- Open `index.html` in browser (no server needed)
- Check browser console for localStorage errors
- Open DevTools > Application > LocalStorage to inspect persisted tasks

### Debugging
- **Empty state logic**: Render checks if `tasks.length === 0` AND `currentFilter === 'all'`; otherwise shows "No [filter] tasks."
- **Modal state**: Check `currentEditingTaskId` is set; modal overlay click or Escape key closes (must update `aria-hidden`)
- **Accessibility**: Verify screen reader announcements use `announce()` helper; all buttons have `aria-label`

### Adding Features
1. **New task property**: Add field to task object creation (`handleAddTask`), localStorage schema survives (JSON), update render/createTaskElement
2. **New filter**: Add button with `data-filter`, extend `getFilteredTasks()` switch case
3. **UI Enhancement**: Update CSS custom properties or add `.scss` equivalent (currently vanilla CSS)

## Critical Implementation Details

- **Validation**: Length > 100 chars, empty string, case-insensitive duplicate check
- **Storage Error Handling**: Catches quota-exceeded with user feedback "Failed to save tasks..."
- **Modal Accessibility**: Traps focus semantically; `aria-hidden` toggled; overlay click closes (prevents accidental dismissal from button clicks inside modal-content)
- **Animation**: Cherry blossoms spawn every 50ms, fall 3–8s; ghost cursor eases at 15% speed (lower = slower)

## Common Edits
| Task | File | Example |
|------|------|---------|
| Add task property | script.js | `const newTask = { ..., myField: initialValue }` |
| Change primary color | styles.css | `--primary-color: #new-hex` (all UI updates automatically) |
| Adjust spawn rate | script.js | `this.spawnRate = 50` → increase for fewer blossoms |
| Add validation rule | script.js | Extend `handleAddTask()` if conditions |

## Testing Checklist
- [ ] Create task, refresh page → persists in localStorage
- [ ] Complete task, toggle back → state updates, stats recalculate
- [ ] Clear completed → confirmation dialog, multiple delete, stats refresh
- [ ] Add long note, save → displays "📝" on task, modal closes, notes persist
- [ ] Filter 'active'/'completed' → correct view shown, empty state text matches
- [ ] Keyboard: Enter to submit, Escape to close modal, Tab through buttons

# Copilot Instructions for TestCopilot

[... existing content ...]

## Testing Checklist
- [ ] Create task, refresh page → persists in localStorage
- [ ] Complete task, toggle back → state updates, stats recalculate
- [ ] Clear completed → confirmation dialog, multiple delete, stats refresh
- [ ] Add long note, save → displays "📝" on task, modal closes, notes persist
- [ ] Filter 'active'/'completed' → correct view shown, empty state text matches
- [ ] Keyboard: Enter to submit, Escape to close modal, Tab through buttons

# Project General Coding Guidelines

## Code Style
- Use semantic HTML5 elements (header, main, section, article, etc.)
- Prefer modern JavaScript (ES6+) features like const/let, arrow functions, and template literals

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Code Quality
- Use meaningful variable and function names that clearly describe their purpose
- Include helpful comments for complex logic
- Add error handling for user inputs and API calls