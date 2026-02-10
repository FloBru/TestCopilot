# Task App Features (User Documentation)

## Language toggle
- **What it does:** Switches all UI text, labels, and placeholders between English, German, and Spanish.
- **How to use:** Click **EN**, **DE**, or **ES** in the header.
- **Persistence:** Stored in `localStorage` under `language-preference`.
- **Default:** Uses browser language (DE/ES) with English fallback.

## Dark mode
- **What it does:** Applies the dark color theme and changes the ghost icon to 👻 (light mode uses 🐇).
- **How to use:** Click **Dark mode** in the header.
- **Persistence:** Stored in `localStorage` under `theme-preference` (`dark`/`light`).
- **Note:** Disabled while Unicorn mode is active.

## Unicorn mode
- **What it does:** Applies rainbow/unicorn styling, gradient background, unicorn cursor, and sets the ghost icon to 🦄.
- **How to use:** Click **Unicorn mode** in the header.
- **Persistence:** Stored in `localStorage` under `unicorn-mode` (`true`/`false`).
- **Behavior:** Enabling Unicorn mode forces Dark mode off.

## Notes modal
- **What it does:** Lets you add per-task notes in a modal editor with focus trap and keyboard support.
- **How to use:** Click a task’s **Notes** button, edit, then **Save Notes**.
- **Persistence:** Notes are saved inside each task in `localStorage` under `tasks`.
- **Accessibility:** Escape key, overlay click, or **Cancel/Close** will dismiss the modal.

## Task persistence
- **What it does:** Saves tasks, completion state, timestamps, and notes across reloads.
- **How to use:** Add/edit/delete tasks normally.
- **Persistence:** Stored in `localStorage` under `tasks`.
- **Limitation:** Browser storage quota may prevent saving; the app shows feedback on failure.

## Ghost cursor follower
- **What it does:** A floating ghost (or rabbit/unicorn depending on theme) follows the pointer.
- **How to use:** Automatic.
- **Limitation:** Disabled on touch-only devices and when “reduced motion” is enabled.
