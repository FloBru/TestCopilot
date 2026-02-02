# Copilot Instructions for TestCopilot

## Project Overview
TestCopilot is a minimal mixed-language project containing:
- **Python scripts**: Simple standalone executables (`halloworld.py`, `heydude.py`)
- **HTML template**: Basic web page structure (`index.html`)

This appears to be a learning/test project with no complex architecture or external dependencies.

## Architecture & Component Structure
**No microservices or complex architecture.** 

Files operate independently:
- `halloworld.py` - Prints "hello yo"
- `heydude.py` - Prints "Hey Dude" + a narrative about a sheep
- `index.html` - Static HTML page with 3-section layout and navigation (references missing `styles.css`)

**Note**: The HTML file references an external stylesheet (`styles.css`) that doesn't exist—add if styling is needed.

## Development Workflow
No build system, tests, or special commands detected. Python scripts run directly:
```bash
python halloworld.py
python heydude.py
```

For HTML: Open `index.html` in a browser.

## Key Patterns & Conventions
- **Python style**: Simple print statements, no complex logic
- **HTML structure**: Semantic HTML (header, nav, main, footer, sections)
- **No dependencies**: Plain Python and HTML—no external packages or frameworks

## When Adding Code
1. Keep Python scripts simple and self-contained
2. Maintain semantic HTML structure with proper heading hierarchy
3. If adding styles, create the referenced `styles.css` or update the stylesheet link
4. No database, API, or external service integration present

## What's Missing
- `.gitignore` (consider adding for Python: `__pycache__/`, `*.pyc`, `.venv/`)
- Stylesheet for HTML (`styles.css`)
- Project documentation (README.md)
