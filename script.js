// ==========================================
// Task Manager Application
// ==========================================

class TaskManager {
    constructor() {
        // DOM Elements
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskInput');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.clearBtn = document.getElementById('clearBtn');
        this.formFeedback = document.getElementById('formFeedback');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.themeToggle = document.getElementById('themeToggle');
        this.themeToggleIcon = this.themeToggle?.querySelector('.theme-toggle-icon');
        this.themeToggleText = this.themeToggle?.querySelector('.theme-toggle-text');

        // Modal elements
        this.notesModal = document.getElementById('notesModal');
        this.modalOverlay = document.querySelector('.modal-overlay');
        this.closeNotesBtn = document.getElementById('closeNotesBtn');
        this.cancelNotesBtn = document.getElementById('cancelNotesBtn');
        this.saveNotesBtn = document.getElementById('saveNotesBtn');
        this.notesTextarea = document.getElementById('notesTextarea');
        this.modalTaskTitle = document.getElementById('modalTaskTitle');

        // Stats elements
        this.totalCount = document.getElementById('totalCount');
        this.completedCount = document.getElementById('completedCount');
        this.remainingCount = document.getElementById('remainingCount');

        // State
        this.tasks = [];
        this.currentFilter = 'all';
        this.currentEditingTaskId = null;
        this.storageKey = 'tasks';
        this.themeStorageKey = 'theme-preference';

        // Initialize
        this.loadTasks();
        this.initTheme();
        this.attachEventListeners();
        this.render();
    }

    /**
     * Attach event listeners to DOM elements
     */
    attachEventListeners() {
        // Form submission
        this.taskForm.addEventListener('submit', (e) => this.handleAddTask(e));

        // Clear completed button
        this.clearBtn.addEventListener('click', () => this.handleClearCompleted());

        // Filter buttons
        this.filterButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e));
        });

        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.handleThemeToggle());
        }

        // Event delegation for task actions (delete, complete, notes)
        this.taskList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete')) {
                this.handleDeleteTask(e);
            } else if (e.target.classList.contains('task-checkbox')) {
                this.handleCompleteTask(e);
            } else if (e.target.classList.contains('notes')) {
                this.handleOpenNotes(e);
            }
        });

        // Modal event listeners
        this.closeNotesBtn.addEventListener('click', () => this.closeNotesModal());
        this.cancelNotesBtn.addEventListener('click', () => this.closeNotesModal());
        this.saveNotesBtn.addEventListener('click', () => this.handleSaveNotes());
        this.modalOverlay.addEventListener('click', () => this.closeNotesModal());

        // Allow Enter key to submit form
        this.taskInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.taskForm.dispatchEvent(new Event('submit'));
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.notesModal.classList.contains('show')) {
                this.closeNotesModal();
            }
        });
    }

    /**
     * Initialize theme based on stored preference or system setting
     */
    initTheme() {
        let storedTheme = null;

        try {
            storedTheme = localStorage.getItem(this.themeStorageKey);
        } catch (error) {
            console.error('Failed to load theme preference:', error);
        }

        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const useDark = storedTheme ? storedTheme === 'dark' : prefersDark;

        this.applyTheme(useDark);
    }

    /**
     * Toggle theme and persist preference
     */
    handleThemeToggle() {
        const useDark = !document.body.classList.contains('dark');
        this.applyTheme(useDark);

        try {
            localStorage.setItem(this.themeStorageKey, useDark ? 'dark' : 'light');
        } catch (error) {
            console.error('Failed to save theme preference:', error);
        }
    }

    /**
     * Apply theme to document and update toggle UI
     */
    applyTheme(useDark) {
        document.body.classList.toggle('dark', useDark);

        if (this.themeToggle) {
            this.themeToggle.setAttribute('aria-pressed', useDark);
            this.themeToggle.setAttribute('aria-label', useDark ? 'Disable dark mode' : 'Enable dark mode');
        }

        if (this.themeToggleIcon) {
            this.themeToggleIcon.textContent = useDark ? '☀️' : '🌙';
        }

        if (this.themeToggleText) {
            this.themeToggleText.textContent = useDark ? 'Light mode' : 'Dark mode';
        }
    }

    /**
     * Handle adding a new task
     */
    handleAddTask(event) {
        event.preventDefault();

        const taskText = this.taskInput.value.trim();

        // Validation
        if (!taskText) {
            this.showFeedback('Please enter a task description');
            return;
        }

        if (taskText.length > 100) {
            this.showFeedback('Task description must be 100 characters or less');
            return;
        }

        // Check for duplicates
        if (this.tasks.some((task) => task.text.toLowerCase() === taskText.toLowerCase())) {
            this.showFeedback('This task already exists');
            return;
        }

        // Clear feedback
        this.clearFeedback();

        // Create new task
        const newTask = {
            id: Date.now(),
            text: taskText,
            notes: '',
            completed: false,
            createdAt: new Date().toISOString(),
        };

        this.tasks.unshift(newTask);
        this.saveTasks();
        this.render();

        // Reset input
        this.taskInput.value = '';
        this.taskInput.focus();

        // Announce to screen readers
        this.announce(`Task "${taskText}" added successfully`);
    }

    /**
     * Handle opening notes modal
     */
    handleOpenNotes(event) {
        const taskId = parseInt(event.target.dataset.taskId, 10);
        const task = this.tasks.find((t) => t.id === taskId);

        if (task) {
            this.currentEditingTaskId = taskId;
            this.modalTaskTitle.textContent = `Notes for: "${this.escapeHtml(task.text)}"`;
            this.notesTextarea.value = task.notes || '';
            this.openNotesModal();
            this.notesTextarea.focus();
        }
    }

    /**
     * Handle saving notes
     */
    handleSaveNotes() {
        const task = this.tasks.find((t) => t.id === this.currentEditingTaskId);

        if (task) {
            task.notes = this.notesTextarea.value.trim();
            this.saveTasks();
            this.render();
            this.closeNotesModal();
            this.announce(`Notes saved for task "${task.text}"`);
        }
    }

    /**
     * Open notes modal
     */
    openNotesModal() {
        this.notesModal.classList.add('show');
        this.notesModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close notes modal
     */
    closeNotesModal() {
        this.notesModal.classList.remove('show');
        this.notesModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        this.currentEditingTaskId = null;
    }

    /**
     * Handle deleting a task
     */
    handleDeleteTask(event) {
        const taskId = parseInt(event.target.dataset.taskId, 10);
        const taskText = event.target.dataset.taskText;

        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        this.saveTasks();
        this.render();

        this.announce(`Task "${taskText}" deleted`);
    }

    /**
     * Handle marking a task as completed
     */
    handleCompleteTask(event) {
        const taskId = parseInt(event.target.dataset.taskId, 10);
        const task = this.tasks.find((t) => t.id === taskId);

        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();

            const status = task.completed ? 'marked as completed' : 'marked as incomplete';
            this.announce(`Task "${task.text}" ${status}`);
        }
    }

    /**
     * Handle clearing completed tasks
     */
    handleClearCompleted() {
        const completedCount = this.tasks.filter((task) => task.completed).length;

        if (completedCount === 0) {
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter((task) => !task.completed);
            this.saveTasks();
            this.render();
            this.announce(`${completedCount} completed task(s) deleted`);
        }
    }

    /**
     * Handle filter button clicks
     */
    handleFilterChange(event) {
        const filter = event.target.dataset.filter;
        this.currentFilter = filter;

        // Update button states
        this.filterButtons.forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
            btn.setAttribute('aria-pressed', btn.dataset.filter === filter);
        });

        this.render();
    }

    /**
     * Get filtered tasks based on current filter
     */
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter((task) => !task.completed);
            case 'completed':
                return this.tasks.filter((task) => task.completed);
            case 'all':
            default:
                return this.tasks;
        }
    }

    /**
     * Update task stats
     */
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter((task) => task.completed).length;
        const remaining = total - completed;

        this.totalCount.textContent = total;
        this.completedCount.textContent = completed;
        this.remainingCount.textContent = remaining;
    }

    /**
     * Render the task list
     */
    render() {
        const filteredTasks = this.getFilteredTasks();

        // Update stats
        this.updateStats();

        // Update clear button state
        const hasCompleted = this.tasks.some((task) => task.completed);
        this.clearBtn.disabled = !hasCompleted;

        // Show/hide empty state
        if (filteredTasks.length === 0 && this.currentFilter === 'all' && this.tasks.length === 0) {
            this.emptyState.style.display = 'block';
            this.taskList.style.display = 'none';
        } else if (filteredTasks.length === 0) {
            this.emptyState.textContent = `No ${this.currentFilter !== 'all' ? this.currentFilter : ''} tasks.`;
            this.emptyState.style.display = 'block';
            this.taskList.style.display = 'none';
        } else {
            this.emptyState.style.display = 'none';
            this.taskList.style.display = 'flex';
        }

        // Render tasks
        this.taskList.innerHTML = filteredTasks
            .map((task) => this.createTaskElement(task))
            .join('');
    }

    /**
     * Create HTML for a single task
     */
    createTaskElement(task) {
        const className = task.completed ? 'task-item completed' : 'task-item';
        const notesIndicator = task.notes ? ' 📝' : '';

        return `
            <li class="${className}" role="listitem">
                <input
                    type="checkbox"
                    class="task-checkbox"
                    data-task-id="${task.id}"
                    ${task.completed ? 'checked' : ''}
                    aria-label="Mark task as ${task.completed ? 'incomplete' : 'complete'}"
                >
                <div class="task-content">
                    <span class="task-text">${this.escapeHtml(task.text)}${notesIndicator}</span>
                </div>
                <div class="task-actions">
                    <button
                        class="task-btn notes"
                        data-task-id="${task.id}"
                        aria-label="Edit notes for: ${this.escapeHtml(task.text)}"
                    >
                        Notes
                    </button>
                    <button
                        class="task-btn delete"
                        data-task-id="${task.id}"
                        data-task-text="${this.escapeHtml(task.text)}"
                        aria-label="Delete task: ${this.escapeHtml(task.text)}"
                    >
                        Delete
                    </button>
                </div>
            </li>
        `;
    }

    /**
     * Load tasks from localStorage
     */
    loadTasks() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.tasks = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load tasks:', error);
            this.tasks = [];
        }
    }

    /**
     * Save tasks to localStorage
     */
    saveTasks() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Failed to save tasks:', error);
            this.showFeedback('Failed to save tasks. Storage might be full.');
        }
    }

    /**
     * Show feedback message
     */
    showFeedback(message) {
        this.formFeedback.textContent = message;
        this.formFeedback.classList.add('show');
    }

    /**
     * Clear feedback message
     */
    clearFeedback() {
        this.formFeedback.textContent = '';
        this.formFeedback.classList.remove('show');
    }

    /**
     * Announce message to screen readers
     */
    announce(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }

    /**
     * Escape HTML special characters to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ==========================================
// Initialize Application
// ==========================================

// Ghost cursor follower
class GhostCursor {
    constructor() {
        this.ghost = document.getElementById('ghost');
        this.ghostX = 0;
        this.ghostY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.speed = 0.15; // Lower = slower, more floaty

        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.animateGhost();
    }

    handleMouseMove(event) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    }

    animateGhost() {
        // Smooth easing towards mouse position
        this.ghostX += (this.mouseX - this.ghostX) * this.speed;
        this.ghostY += (this.mouseY - this.ghostY) * this.speed;

        // Update ghost position
        this.ghost.style.left = this.ghostX + 'px';
        this.ghost.style.top = this.ghostY + 'px';

        // Continue animation
        requestAnimationFrame(() => this.animateGhost());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GhostCursor();
    new TaskManager();
});
