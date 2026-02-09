// ==========================================
// Task Manager Application
// ==========================================

const CONFIG = {
    MAX_TASK_LENGTH: 100,
    ANIMATION_DELAY: 2000,
    GHOST_SPEED: 0.15,
};

const STRINGS = {
    en: {
        'meta.title': 'Task Manager - Stay Organized',
        'meta.description': 'A simple and elegant task manager application',
        'app.title': 'Task Manager',
        'app.subtitle': 'Keep track of your daily tasks',
        'addTask.heading': 'Add a new task',
        'form.placeholder': 'Add a new task...',
        'form.ariaLabel': 'Task description',
        'form.addButtonText': 'Add Task',
        'form.addButtonAria': 'Add task',
        'stats.heading': 'Task statistics',
        'stats.total': 'Total Tasks',
        'stats.completed': 'Completed',
        'stats.remaining': 'Remaining',
        'filter.heading': 'Filter tasks',
        'filters.all': 'All',
        'filters.active': 'Active',
        'filters.completed': 'Completed',
        'tasks.heading': 'Your tasks',
        'empty.noTasks': 'No tasks yet. Add one to get started! 🚀',
        'empty.noFilterTasks': 'No {filter} tasks.',
        'actions.heading': 'Bulk actions',
        'actions.clearCompleted': 'Clear Completed',
        'actions.clearCompletedAria': 'Clear all completed tasks',
        'footer.text': '© 2025 Task Manager. Built with care.',
        'modal.title': 'Task Notes',
        'modal.closeAria': 'Close notes',
        'modal.notesFor': 'Notes for: "{task}"',
        'modal.taskNotesPlaceholder': 'Add your notes here...',
        'modal.taskNotesAria': 'Task notes',
        'modal.save': 'Save Notes',
        'modal.cancel': 'Cancel',
        'language.toggleToEnglish': 'Switch language to English',
        'language.toggleToGerman': 'Switch language to German',
        'language.toggleToSpanish': 'Switch language to Spanish',
        'theme.ariaEnable': 'Enable dark mode',
        'theme.ariaDisable': 'Disable dark mode',
        'validation.empty': 'Please enter a task description',
        'validation.length': 'Task description must be {max} characters or less',
        'validation.duplicate': 'This task already exists',
        'announce.taskAdded': 'Task "{task}" added successfully',
        'announce.taskDeleted': 'Task "{task}" deleted',
        'announce.taskStatusChanged': 'Task "{task}" {status}',
        'announce.notesSaved': 'Notes saved for task "{task}"',
        'announce.completedDeleted': '{count} completed task(s) deleted',
        'confirm.deleteTask': 'Delete task "{task}"?',
        'confirm.deleteCompleted': 'Delete {count} completed task(s)?',
        'task.markComplete': 'Mark task as complete',
        'task.markIncomplete': 'Mark task as incomplete',
        'task.editNotesAria': 'Edit notes for: {task}',
        'task.deleteAria': 'Delete task: {task}',
        'task.notesButton': 'Notes',
        'task.deleteButton': 'Delete',
        'status.completed': 'marked as completed',
        'status.incomplete': 'marked as incomplete',
        'feedback.notesSaved': 'Notes saved successfully!',
        'storage.saveFailed': 'Failed to save tasks. Storage might be full.',
        'storage.saveFailedRetries': 'Failed to save tasks after multiple attempts. Please check your storage.',
    },
    de: {
        'meta.title': 'Aufgabenmanager – organisiert bleiben',
        'meta.description': 'Eine einfache und elegante Aufgabenverwaltung',
        'app.title': 'Aufgabenmanager',
        'app.subtitle': 'Behalte deine täglichen Aufgaben im Blick',
        'addTask.heading': 'Neue Aufgabe hinzufügen',
        'form.placeholder': 'Neue Aufgabe hinzufügen...',
        'form.ariaLabel': 'Aufgabenbeschreibung',
        'form.addButtonText': 'Aufgabe hinzufügen',
        'form.addButtonAria': 'Aufgabe hinzufügen',
        'stats.heading': 'Aufgabenstatistik',
        'stats.total': 'Gesamt',
        'stats.completed': 'Erledigt',
        'stats.remaining': 'Offen',
        'filter.heading': 'Aufgaben filtern',
        'filters.all': 'Alle',
        'filters.active': 'Aktiv',
        'filters.completed': 'Erledigt',
        'tasks.heading': 'Deine Aufgaben',
        'empty.noTasks': 'Noch keine Aufgaben. Füge eine hinzu, um zu starten! 🚀',
        'empty.noFilterTasks': 'Keine {filter}-Aufgaben.',
        'actions.heading': 'Sammelaktionen',
        'actions.clearCompleted': 'Erledigte löschen',
        'actions.clearCompletedAria': 'Alle erledigten Aufgaben löschen',
        'footer.text': '© 2025 Aufgabenmanager. Mit Sorgfalt erstellt.',
        'modal.title': 'Aufgabennotizen',
        'modal.closeAria': 'Notizen schließen',
        'modal.notesFor': 'Notizen zu: "{task}"',
        'modal.taskNotesPlaceholder': 'Notizen hier hinzufügen...',
        'modal.taskNotesAria': 'Aufgabennotizen',
        'modal.save': 'Notizen speichern',
        'modal.cancel': 'Abbrechen',
        'language.toggleToEnglish': 'Sprache auf Englisch umstellen',
        'language.toggleToGerman': 'Sprache auf Deutsch umstellen',
        'language.toggleToSpanish': 'Sprache auf Spanisch umstellen',
        'theme.ariaEnable': 'Dunklen Modus aktivieren',
        'theme.ariaDisable': 'Dunklen Modus deaktivieren',
        'validation.empty': 'Bitte eine Aufgabenbeschreibung eingeben',
        'validation.length': 'Die Aufgabenbeschreibung darf höchstens {max} Zeichen lang sein',
        'validation.duplicate': 'Diese Aufgabe existiert bereits',
        'announce.taskAdded': 'Aufgabe "{task}" hinzugefügt',
        'announce.taskDeleted': 'Aufgabe "{task}" gelöscht',
        'announce.taskStatusChanged': 'Aufgabe "{task}" {status}',
        'announce.notesSaved': 'Notizen für Aufgabe "{task}" gespeichert',
        'announce.completedDeleted': '{count} erledigte Aufgabe(n) gelöscht',
        'confirm.deleteTask': 'Aufgabe "{task}" löschen?',
        'confirm.deleteCompleted': '{count} erledigte Aufgabe(n) löschen?',
        'task.markComplete': 'Aufgabe als erledigt markieren',
        'task.markIncomplete': 'Aufgabe als nicht erledigt markieren',
        'task.editNotesAria': 'Notizen bearbeiten für: {task}',
        'task.deleteAria': 'Aufgabe löschen: {task}',
        'task.notesButton': 'Notizen',
        'task.deleteButton': 'Löschen',
        'status.completed': 'als erledigt markiert',
        'status.incomplete': 'als nicht erledigt markiert',
        'feedback.notesSaved': 'Notizen erfolgreich gespeichert!',
        'storage.saveFailed': 'Aufgaben konnten nicht gespeichert werden. Der Speicher ist möglicherweise voll.',
        'storage.saveFailedRetries': 'Aufgaben konnten nach mehreren Versuchen nicht gespeichert werden. Bitte Speicher prüfen.',
    },
    es: {
        'meta.title': 'Gestor de tareas - Mantente organizado',
        'meta.description': 'Una aplicación de gestión de tareas sencilla y elegante',
        'app.title': 'Gestor de tareas',
        'app.subtitle': 'Lleva el control de tus tareas diarias',
        'addTask.heading': 'Agregar una nueva tarea',
        'form.placeholder': 'Agrega una nueva tarea...',
        'form.ariaLabel': 'Descripción de la tarea',
        'form.addButtonText': 'Agregar tarea',
        'form.addButtonAria': 'Agregar tarea',
        'stats.heading': 'Estadísticas de tareas',
        'stats.total': 'Total',
        'stats.completed': 'Completadas',
        'stats.remaining': 'Pendientes',
        'filter.heading': 'Filtrar tareas',
        'filters.all': 'Todas',
        'filters.active': 'Activas',
        'filters.completed': 'Completadas',
        'tasks.heading': 'Tus tareas',
        'empty.noTasks': 'Aún no hay tareas. ¡Agrega una para comenzar! 🚀',
        'empty.noFilterTasks': 'No hay tareas {filter}.',
        'actions.heading': 'Acciones masivas',
        'actions.clearCompleted': 'Borrar completadas',
        'actions.clearCompletedAria': 'Borrar todas las tareas completadas',
        'footer.text': '© 2025 Gestor de tareas. Hecho con cuidado.',
        'modal.title': 'Notas de la tarea',
        'modal.closeAria': 'Cerrar notas',
        'modal.notesFor': 'Notas para: "{task}"',
        'modal.taskNotesPlaceholder': 'Agrega tus notas aquí...',
        'modal.taskNotesAria': 'Notas de la tarea',
        'modal.save': 'Guardar notas',
        'modal.cancel': 'Cancelar',
        'language.toggleToEnglish': 'Cambiar el idioma a inglés',
        'language.toggleToGerman': 'Cambiar el idioma a alemán',
        'language.toggleToSpanish': 'Cambiar el idioma a español',
        'theme.ariaEnable': 'Activar modo oscuro',
        'theme.ariaDisable': 'Desactivar modo oscuro',
        'validation.empty': 'Ingresa una descripción de la tarea',
        'validation.length': 'La descripción debe tener {max} caracteres o menos',
        'validation.duplicate': 'Esta tarea ya existe',
        'announce.taskAdded': 'Tarea "{task}" agregada correctamente',
        'announce.taskDeleted': 'Tarea "{task}" eliminada',
        'announce.taskStatusChanged': 'Tarea "{task}" {status}',
        'announce.notesSaved': 'Notas guardadas para la tarea "{task}"',
        'announce.completedDeleted': '{count} tarea(s) completada(s) eliminada(s)',
        'confirm.deleteTask': '¿Eliminar la tarea "{task}"?',
        'confirm.deleteCompleted': '¿Eliminar {count} tarea(s) completada(s)?',
        'task.markComplete': 'Marcar tarea como completada',
        'task.markIncomplete': 'Marcar tarea como incompleta',
        'task.editNotesAria': 'Editar notas para: {task}',
        'task.deleteAria': 'Eliminar tarea: {task}',
        'task.notesButton': 'Notas',
        'task.deleteButton': 'Eliminar',
        'status.completed': 'marcada como completada',
        'status.incomplete': 'marcada como incompleta',
        'feedback.notesSaved': '¡Notas guardadas correctamente!',
        'storage.saveFailed': 'No se pudieron guardar las tareas. Es posible que el almacenamiento esté lleno.',
        'storage.saveFailedRetries': 'No se pudieron guardar las tareas tras varios intentos. Revisa el almacenamiento.',
    },
};

const interpolate = (template, variables = {}) =>
    template.replace(/\{(\w+)\}/g, (match, key) =>
        Object.prototype.hasOwnProperty.call(variables, key) ? variables[key] : match
    );

class TaskManager {
    constructor() {
        // DOM Elements
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskInput');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.emptyStateText = document.getElementById('emptyStateText');
        this.clearBtn = document.getElementById('clearBtn');
        this.formFeedback = document.getElementById('formFeedback');
        this.filterButtons = document.querySelectorAll('.filter-btn');




        this.languageToggleGroup = document.getElementById('languageToggleGroup');
        this.languageButtons = document.querySelectorAll('[data-language]');
        this.themeToggle = document.getElementById('themeToggle');
        this.themeToggleIcon = this.themeToggle?.querySelector('.theme-toggle-icon');
        this.themeToggleText = this.themeToggle?.querySelector('.theme-toggle-text');
        this.unicornToggle = document.getElementById('unicornToggle');

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
        this.languageStorageKey = 'language-preference';
        this.themeStorageKey = 'theme-preference';
        this.unicornStorageKey = 'unicorn-mode';

        // Initialize
        this.loadTasks();
        this.initLanguage();
        this.initTheme();
        this.initUnicornMode();
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

        if (this.languageButtons.length > 0) {
            this.languageButtons.forEach((btn) => {
                btn.addEventListener('click', (e) => this.handleLanguageChange(e));
            });
        }

        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.handleThemeToggle());
        }

        // Unicorn mode toggle
        if (this.unicornToggle) {
            this.unicornToggle.addEventListener('click', () => this.handleUnicornToggle());
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

        // Close modal on Escape key and implement focus trap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.notesModal.classList.contains('show')) {
                this.closeNotesModal();
            }
            
            // Focus trap for modal
            if (this.notesModal.classList.contains('show') && e.key === 'Tab') {
                this.handleModalFocusTrap(e);
            }
        });
    }

    /**
     * Translate a key for the current language
     */
    t(key, variables = {}) {
        const dictionary = STRINGS[this.currentLanguage] || STRINGS.en;
        const fallback = STRINGS.en || {};
        const template = dictionary[key] || fallback[key] || key;
        return interpolate(template, variables);
    }

    /**
     * Initialize language preference
     */
    initLanguage() {
        let storedLanguage = null;

        try {
            storedLanguage = localStorage.getItem(this.languageStorageKey);
        } catch (error) {
            console.error('Failed to load language preference:', error);
        }

        if (storedLanguage && STRINGS[storedLanguage]) {
            this.currentLanguage = storedLanguage;
        } else {
            const browserLanguage = navigator.language || '';
            const normalized = browserLanguage.toLowerCase();
            if (normalized.startsWith('de')) {
                this.currentLanguage = 'de';
            } else if (normalized.startsWith('es')) {
                this.currentLanguage = 'es';
            } else {
                this.currentLanguage = 'en';
            }
        }

        this.applyLanguage(false);
    }

    /**
     * Apply language to UI and persist changes
     */
    applyLanguage(shouldRender = true) {
        document.documentElement.lang = this.currentLanguage;
        this.localizeStaticUI();
        this.updateLanguageToggle();
        this.applyTheme(document.body.classList.contains('dark'));

        if (shouldRender) {
            this.render();
        }
    }

    /**
     * Update the language toggle UI
     */
    updateLanguageToggle() {
        if (!this.languageButtons || this.languageButtons.length === 0) {
            return;
        }

        this.languageButtons.forEach((button) => {
            const language = button.getAttribute('data-language');
            const isActive = language === this.currentLanguage;
            button.setAttribute('aria-pressed', String(isActive));

            if (language === 'en') {
                button.setAttribute('aria-label', this.t('language.toggleToEnglish'));
            } else if (language === 'de') {
                button.setAttribute('aria-label', this.t('language.toggleToGerman'));
            } else if (language === 'es') {
                button.setAttribute('aria-label', this.t('language.toggleToSpanish'));
            }
        });
    }

    /**
     * Localize static UI text and attributes
     */
    localizeStaticUI() {
        const textNodes = document.querySelectorAll('[data-i18n]');
        textNodes.forEach((node) => {
            const key = node.getAttribute('data-i18n');
            if (!key) return;
            node.textContent = this.t(key);
        });

        const nodesWithAttributes = document.querySelectorAll('[data-i18n-attr-content], [data-i18n-attr-placeholder], [data-i18n-attr-aria-label]');
        nodesWithAttributes.forEach((node) => {
            Array.from(node.attributes).forEach((attr) => {
                if (!attr.name.startsWith('data-i18n-attr-')) {
                    return;
                }

                const attrName = attr.name.replace('data-i18n-attr-', '');
                const key = attr.value;
                if (!key) return;
                node.setAttribute(attrName, this.t(key));
            });
        });
    }

    /**
     * Toggle language and persist preference
     */
    handleLanguageChange(event) {
        const language = event.currentTarget?.getAttribute('data-language');

        if (!language || !STRINGS[language] || language === this.currentLanguage) {
            return;
        }

        this.currentLanguage = language;

        try {
            localStorage.setItem(this.languageStorageKey, this.currentLanguage);
        } catch (error) {
            console.error('Failed to save language preference:', error);
        }

        this.applyLanguage();
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
        const isUnicorn = document.body.classList.contains('unicorn');
        if (!isUnicorn) {
            document.body.classList.toggle('dark', useDark);
        }

        const ghostElement = document.getElementById('ghost');
        if (ghostElement && !isUnicorn) {
            ghostElement.textContent = useDark ? '👻' : '🐇';
        }

        if (this.themeToggle) {
            this.themeToggle.setAttribute('aria-pressed', useDark);
            this.themeToggle.setAttribute(
                'aria-label',
                this.t(useDark ? 'theme.ariaDisable' : 'theme.ariaEnable')
            );
        }

        if (this.themeToggleIcon) {
            this.themeToggleIcon.textContent = useDark ? '☀️' : '🌙';
        }

        if (this.themeToggleText) {
            this.themeToggleText.textContent = useDark ? 'Light mode' : 'Dark mode';
        }
    }

    /**
     * Initialize unicorn mode based on stored preference
     */
    initUnicornMode() {
        let storedUnicorn = null;

        try {
            storedUnicorn = localStorage.getItem(this.unicornStorageKey);
        } catch (error) {
            console.error('Failed to load unicorn mode preference:', error);
        }

        const useUnicorn = storedUnicorn === 'true';
        this.applyUnicornMode(useUnicorn);
    }

    /**
     * Toggle unicorn mode and persist preference
     */
    handleUnicornToggle() {
        const useUnicorn = !document.body.classList.contains('unicorn');
        this.applyUnicornMode(useUnicorn);

        try {
            localStorage.setItem(this.unicornStorageKey, useUnicorn);
        } catch (error) {
            console.error('Failed to save unicorn mode preference:', error);
        }
    }

    /**
     * Apply unicorn mode to document and update toggle UI
     */
    applyUnicornMode(useUnicorn) {
        if (useUnicorn) {
            document.body.classList.remove('dark');
            document.body.classList.add('unicorn');
        } else {
            document.body.classList.remove('unicorn');
        }

        const ghostElement = document.getElementById('ghost');
        if (ghostElement) {
            ghostElement.textContent = useUnicorn ? '🦄' : (document.body.classList.contains('dark') ? '👻' : '🐇');
        }

        if (this.unicornToggle) {
            this.unicornToggle.setAttribute('aria-pressed', useUnicorn);
            this.unicornToggle.setAttribute('aria-label', useUnicorn ? 'Disable unicorn mode' : 'Enable unicorn mode');
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
            this.showFeedback(this.t('validation.empty'));
            return;
        }

        if (taskText.length > CONFIG.MAX_TASK_LENGTH) {
            this.showFeedback(this.t('validation.length', { max: CONFIG.MAX_TASK_LENGTH }));
            return;
        }

        // Check for duplicates
        if (this.tasks.some((task) => task.text.toLowerCase() === taskText.toLowerCase())) {
            this.showFeedback(this.t('validation.duplicate'));
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
        this.announce(this.t('announce.taskAdded', { task: taskText }));
    }

    /**
     * Handle opening notes modal
     */
    handleOpenNotes(event) {
        const taskId = parseInt(event.target.dataset.taskId, 10);
        const task = this.tasks.find((t) => t.id === taskId);

        if (task) {
            this.currentEditingTaskId = taskId;
            this.previousFocusElement = event.target; // Store reference to triggering button
            this.modalTaskTitle.textContent = this.t('modal.notesFor', { task: this.escapeHtml(task.text) });
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
            this.announce(this.t('announce.notesSaved', { task: task.text }));
            this.showTempFeedback(this.t('feedback.notesSaved'), 'success');
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
        
        // Restore focus to the triggering element
        if (this.previousFocusElement && this.previousFocusElement.isConnected) {
            this.previousFocusElement.focus();
        }
        this.previousFocusElement = null;
    }

    /**
     * Handle deleting a task
     */
    handleDeleteTask(event) {
        const taskId = parseInt(event.target.dataset.taskId, 10);
        const taskText = event.target.dataset.taskText;

        // Add confirmation for consistency with bulk delete
        if (confirm(this.t('confirm.deleteTask', { task: taskText }))) {
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
            this.saveTasks();
            this.render();
            this.announce(this.t('announce.taskDeleted', { task: taskText }));
        }
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

            const status = task.completed ? this.t('status.completed') : this.t('status.incomplete');
            this.announce(this.t('announce.taskStatusChanged', { task: task.text, status }));
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

        if (confirm(this.t('confirm.deleteCompleted', { count: completedCount }))) {
            this.tasks = this.tasks.filter((task) => !task.completed);
            this.saveTasks();
            this.render();
            this.announce(this.t('announce.completedDeleted', { count: completedCount }));
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
        if (filteredTasks.length === 0) {
            const emptyMessage = this.tasks.length === 0
                ? this.t('empty.noTasks')
                : this.t('empty.noFilterTasks', { filter: this.t(`filters.${this.currentFilter}`) });
            const emptyTarget = this.emptyStateText || this.emptyState;
            emptyTarget.textContent = emptyMessage;
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
        const checkboxLabel = task.completed ? this.t('task.markIncomplete') : this.t('task.markComplete');

        return `
            <li class="${className}" role="listitem">
                <input
                    type="checkbox"
                    class="task-checkbox"
                    data-task-id="${task.id}"
                    ${task.completed ? 'checked' : ''}
                    aria-label="${checkboxLabel}"
                >
                <div class="task-content">
                    <span class="task-text">${this.escapeHtml(task.text)}${notesIndicator}</span>
                </div>
                <div class="task-actions">
                    <button
                        class="task-btn notes"
                        data-task-id="${task.id}"
                        aria-label="${this.t('task.editNotesAria', { task: this.escapeHtml(task.text) })}"
                    >
                        ${this.t('task.notesButton')}
                    </button>
                    <button
                        class="task-btn delete"
                        data-task-id="${task.id}"
                        data-task-text="${this.escapeHtml(task.text)}"
                        aria-label="${this.t('task.deleteAria', { task: this.escapeHtml(task.text) })}"
                    >
                        ${this.t('task.deleteButton')}
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
     * Save tasks to localStorage with retry mechanism
     */
    saveTasks() {
        const maxRetries = 3;
        let retryCount = 0;
        
        const attemptSave = () => {
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
            } catch (error) {
                console.error('Failed to save tasks:', error);
                retryCount++;
                
                if (retryCount < maxRetries && error.name === 'QuotaExceededError') {
                    // Try to clear some space and retry
                    this.cleanupLocalStorage();
                    setTimeout(attemptSave, 100);
                } else {
                    this.showFeedback(
                        retryCount >= maxRetries 
                            ? this.t('storage.saveFailedRetries')
                            : this.t('storage.saveFailed')
                    );
                }
            }
        };
        
        attemptSave();
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
     * Handle focus trap within modal
     */
    handleModalFocusTrap(event) {
        const focusableElements = this.notesModal.querySelectorAll(
            'button, textarea, input, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey) {
            // Shift + Tab (backward)
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab (forward)
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    /**
     * Show temporary feedback message with optional type
     */
    showTempFeedback(message, type = 'info') {
        const feedback = document.createElement('div');
        feedback.className = `temp-feedback temp-feedback-${type}`;
        feedback.textContent = message;
        feedback.setAttribute('role', 'status');
        feedback.setAttribute('aria-live', 'polite');
        
        document.body.appendChild(feedback);
        
        // Animate in
        setTimeout(() => feedback.classList.add('show'), 10);
        
        // Remove after delay
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, CONFIG.ANIMATION_DELAY);
    }

    /**
     * Clean up localStorage to free space
     */
    cleanupLocalStorage() {
        try {
            // Remove old or unnecessary items (extend as needed)
            const keysToCheck = Object.keys(localStorage);
            keysToCheck.forEach(key => {
                if (key.startsWith('temp-') || key.includes('cache')) {
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.error('Failed to cleanup localStorage:', error);
        }
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

// Ghost cursor follower with smart device detection
class GhostCursor {
    constructor() {
        this.ghost = document.getElementById('ghost');
        this.ghostX = 0;
        this.ghostY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.speed = CONFIG.GHOST_SPEED;
        this.isEnabled = this.shouldEnableGhost();

        if (this.isEnabled && this.ghost) {
            document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            this.animateGhost();
        } else if (this.ghost) {
            this.ghost.style.display = 'none';
        }
    }

    /**
     * Determine if ghost cursor should be enabled based on device capabilities
     */
    shouldEnableGhost() {
        // Disable on touch-only devices
        return window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
               !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

        // Continue animation if enabled
        if (this.isEnabled) {
            requestAnimationFrame(() => this.animateGhost());
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GhostCursor();
    new TaskManager();
});
