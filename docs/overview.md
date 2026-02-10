# Task App Documentation

## Overview
A single-page, no-build task manager that runs by opening the HTML file in a browser. It focuses on quick task entry, filtering, and lightweight personalization.

## Features
- Add, complete, and delete tasks with inline controls.
- Filter views: All, Active, Completed.
- Per-task notes with a modal editor and notes indicator.
- Task stats (total, completed, remaining).
- Language toggle: English, German, Spanish.
- Theme modes: Dark mode and Unicorn mode.
- Ghost cursor follower (disabled on touch devices and reduced-motion settings).

## Usage
- Type a task and submit with the Add button or Enter.
- Toggle completion via the checkbox.
- Use Notes to add or edit per-task notes.
- Switch filters to narrow the list.
- Clear Completed removes finished tasks in bulk.
- Toggle language and theme options from the header.

## Storage & Persistence
- Tasks (including notes, completion state, and timestamps) are stored in `localStorage` under `tasks`.
- Theme preference is stored under `theme-preference`.
- Unicorn mode preference is stored under `unicorn-mode`.
- Language preference is stored under `language-preference`.
- Save retries handle quota errors with user feedback.

## Accessibility
- ARIA labels on controls and modal elements.
- Live announcements for key actions (add, delete, status change, notes saved).
- Notes modal supports focus trapping and Escape/overlay dismissal.
- Keyboard-friendly form submission.

## Project structure
- [index.html](../index.html): App markup and modal.
- [styles.css](../styles.css): Base styles and theme variables.
- [styles-language-toggle.css](../styles-language-toggle.css): Language selector styles.
- [enhanced-styles.css](../enhanced-styles.css): Enhanced effects and motion handling.
- [script.js](../script.js): State, rendering, storage, i18n, and UI behavior.
