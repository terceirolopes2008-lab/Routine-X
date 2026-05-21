import {
  criarConta,
  entrar,
  sair,
  criarTarefa as criarTarefaFirebase,
  observarUsuarioLogado,
  observarPerfilUsuario,
  salvarPerfilUsuario,
  observarTarefas,
  atualizarTarefa,
  excluirTarefa,
} from "./backend.js";

const APP_KEY = "routinex:app-state";
const LEGACY_TASKS_KEY = "routinex:dated-tasks";
const LEGACY_THEME_KEY = "routinex:theme";
const LEGACY_USER_NAME_KEY = "routinex:user-name";
const DEFAULT_TASK_COLOR = "#00b4d8";
const DEVIL_MODE_KEY = "routinex:devil-mode";
const DEVIL_POSITION_KEY = "routinex:devil-position";

const authTitle = document.getElementById("auth-title");
const authSubtitle = document.getElementById("auth-subtitle");
const authFeedback = document.getElementById("auth-feedback");
const authScreen = document.getElementById("auth-screen");
const dashboardScreen = document.getElementById("dashboard-screen");
const dashboardUserName = document.getElementById("dashboard-user-name");
const dashboardLogout = document.getElementById("dashboard-logout");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const footer = document.getElementById("auth-footer");
const footerText = document.getElementById("auth-footer-text");
const modeButton = document.getElementById("auth-mode-button");
const signupName = document.getElementById("signup-name");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const passwordToggles = document.querySelectorAll("[data-password-toggle]");

const selectedDate = document.getElementById("selected-date");
const priorityFilter = document.getElementById("priority-filter");
const taskSearch = document.getElementById("task-search");
const sortFilter = document.getElementById("sort-filter");
const dailyTitle = document.getElementById("daily-title");
const currentDate = document.getElementById("current-date");
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");
const taskCounter = document.getElementById("task-counter");
const statTotal = document.getElementById("stat-total");
const statCompleted = document.getElementById("stat-completed");
const statProgress = document.getElementById("stat-progress");
const statFolders = document.getElementById("stat-folders");
const statProgressRing = document.getElementById("stat-progress-ring");
const resetFilters = document.getElementById("reset-filters");
const timelineList = document.getElementById("timeline-list");
const filterLabel = document.getElementById("filter-label");
const categoryList = document.getElementById("category-list");
const openTaskModal = document.getElementById("open-task-modal");
const closeTaskModal = document.getElementById("close-task-modal");
const taskModal = document.getElementById("task-modal");
const taskForm = document.getElementById("task-form");
const taskEditorModal = document.getElementById("task-editor-modal");
const closeTaskEditorModal = document.getElementById("close-task-editor-modal");
const taskEditorTitle = document.getElementById("task-editor-title");
const taskEditorMeta = document.getElementById("task-editor-meta");
const taskEditorContent = document.getElementById("task-editor-content");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskDate = document.getElementById("task-date");
const taskTime = document.getElementById("task-time");
const taskCategoryName = document.getElementById("task-category-name");
const taskCategoryColor = document.getElementById("task-category-color");
const taskIconChoice = document.getElementById("task-icon-choice");
const taskTempo = document.getElementById("task-tempo");
const taskPriority = document.getElementById("task-priority");
const taskStatus = document.getElementById("task-status");
const taskNotes = document.getElementById("task-notes");
const taskCreatePreview = document.getElementById("task-create-preview");
const taskCreatePreviewIcon = document.getElementById("task-create-preview-icon");
const taskCreatePreviewTitle = document.getElementById("task-create-preview-title");
const taskCreatePreviewMeta = document.getElementById("task-create-preview-meta");
const taskIconSuggestions = document.getElementById("task-icon-suggestions");
const createChoiceModal = document.getElementById("create-choice-modal");
const closeCreateChoiceModal = document.getElementById("close-create-choice-modal");
const createCardOption = document.getElementById("create-card-option");
const createFolderOption = document.getElementById("create-folder-option");
const cancelCreateChoice = document.getElementById("cancel-create-choice");
const folderModal = document.getElementById("folder-modal");
const closeFolderModal = document.getElementById("close-folder-modal");
const folderForm = document.getElementById("folder-form");
const folderName = document.getElementById("folder-name");
const folderColor = document.getElementById("folder-color");
const folderPreviewName = document.getElementById("folder-preview-name");
const folderCreatePreview = document.querySelector(".folder-create-preview");
const folderViewModal = document.getElementById("folder-view-modal");
const closeFolderViewModal = document.getElementById("close-folder-view-modal");
const folderViewTitle = document.getElementById("folder-view-title");
const folderViewContent = document.getElementById("folder-view-content");
const themeToggle = document.getElementById("theme-toggle");
const notificationToggle = themeToggle;
const notificationBadge = document.getElementById("notification-badge");
const notificationPanel = document.getElementById("notification-panel");
const notificationList = document.getElementById("notification-list");
const markNotificationsRead = document.getElementById("mark-notifications-read");
const toastRegion = document.getElementById("toast-region");
const confirmModal = document.getElementById("confirm-modal");
const confirmIcon = document.getElementById("confirm-icon");
const confirmKicker = document.getElementById("confirm-kicker");
const confirmTitle = document.getElementById("confirm-title");
const confirmMessage = document.getElementById("confirm-message");
const confirmInput = document.getElementById("confirm-input");
const confirmCancel = document.getElementById("confirm-cancel");
const confirmAccept = document.getElementById("confirm-accept");
const sidebarThemeToggle = document.getElementById("sidebar-theme-toggle");
const sidebarThemeIcon = document.getElementById("sidebar-theme-icon");
const sidebarThemeLabel = document.getElementById("sidebar-theme-label");
const sidebarThemeCaption = document.getElementById("sidebar-theme-caption");
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebarNotificationToggle = document.getElementById("sidebar-notification-toggle");
const workspaceMenu = document.getElementById("workspace-menu");
const routinesMenu = document.getElementById("routines-menu");
const dailyHeader = document.getElementById("daily-header");
const dailyTimeline = document.getElementById("daily-timeline");
const routinesView = document.getElementById("routines-view");
const routinePrevWeek = document.getElementById("routine-prev-week");
const routineNextWeek = document.getElementById("routine-next-week");
const routineToday = document.getElementById("routine-today");
const routineCalendarToggle = document.getElementById("routine-calendar-toggle");
const routineCalendarPanel = document.getElementById("routine-calendar-panel");
const routineCalendarClose = document.getElementById("routine-calendar-close");
const routineMonthLabel = document.getElementById("routine-month-label");
const routineMonthGrid = document.getElementById("routine-month-grid");
const routineCalendarTooltip = document.getElementById("routine-calendar-tooltip");
const routineDayTabs = document.getElementById("routine-day-tabs");
const routineWeekGrid = document.getElementById("routine-week-grid");
const routineDetailPanel = document.getElementById("routine-detail-panel");
const routineDetailClose = document.getElementById("routine-detail-close");
const routineDetailType = document.getElementById("routine-detail-type");
const routineDetailTitle = document.getElementById("routine-detail-title");
const routineDetailContent = document.getElementById("routine-detail-content");

const sidebarUserTrigger = document.getElementById("sidebar-user-trigger");
const sidebarAvatar = document.querySelector(".sidebar-avatar");
const settingsModal = document.getElementById("settings-modal");
const closeSettingsModal = document.getElementById("close-settings-modal");
const settingsForm = document.getElementById("settings-form");
const settingsName = document.getElementById("settings-name");
const settingsEmail = document.getElementById("settings-email");
const settingsPassword = document.getElementById("settings-password");
const settingsTheme = document.getElementById("settings-theme");
const settingsAvatar = document.getElementById("settings-avatar");
const settingsNotifications = document.getElementById("settings-notifications");
const clearUserTasks = document.getElementById("clear-user-tasks");
const settingsProfileCard = document.getElementById("settings-profile-card");
const settingsProfileOrb = document.querySelector(".settings-profile-orb");
const devilModeToggle = document.getElementById("devil-mode-toggle");
const devilCompanion = document.getElementById("devil-companion");
const devilSprite = document.getElementById("devil-sprite");
const devilSpriteImage = document.querySelector(".devil-sprite-image");
const devilSpeech = document.getElementById("devil-speech");

const defaultState = {
  users: [],
  currentUserId: null,
};

let appState = readAppState();
let currentMode = "login";
let activeCategory = "all";
let activePriority = "all";
let activeSearch = "";
let activeSort = "chronological";
let expandedTaskId = null;
let pendingAvatarImage = "";
let activeView = "workspace";
let routineWeekStart = getStartOfWeek(new Date(`${getTodayDate()}T12:00:00`));
let selectedRoutineDate = getTodayDate();
let highlightedRoutineDate = "";
let activeRoutineId = "";
let isCreatingTask = false;
let activeFolderId = "";
let activeSidebarFolderId = "";
let pendingTargetFolderId = "";
let suppressCalendarClickUntil = 0;
let usuarioLogado = null;
let pararDeObservarPerfil = null;
let pararDeObservarTarefas = null;
let isApplyingRemoteData = false;
let profileSyncTimer = null;
let pendingThemeOverride = "";
let pendingThemeOverrideTimer = null;
let pendingSidebarOverride = null;
let pendingSidebarOverrideTimer = null;
let pendingCollapsedFoldersOverride = null;
let pendingCollapsedFoldersOverrideTimer = null;
let pendingFoldersOverride = null;
let pendingFoldersOverrideTimer = null;
let folderViewAnimationTimer = null;
let folderCollapseRenderTimer = null;
let devilModeEnabled = localStorage.getItem(DEVIL_MODE_KEY) === "true";
let devilSpeechTimer = null;
let devilIdleTimer = null;
let devilMoodTimer = null;
let devilSleepTimer = null;
let devilSleepSpeechTimer = null;
let devilIsSleeping = false;
let devilDragState = null;
let devilReactionCooldownUntil = 0;
const collapsedFolderIds = new Set();
const customSelects = new Map();
let customSelectDocumentBound = false;

const holidays = {
  "01-01": "Confraternização Universal",
  "04-21": "Tiradentes",
  "05-01": "Dia do Trabalho",
  "06-12": "Dia dos Namorados",
  "09-07": "Independência do Brasil",
  "10-12": "Nossa Senhora Aparecida",
  "11-02": "Finados",
  "11-15": "Proclamação da República",
  "12-25": "Natal",
};

const tempoOptions = [
  "Apagar após a data",
  "Deixar marcado",
  "Relembrar até desativar manualmente",
];

const screenCopy = {
  login: {
    title: "Entrar",
    subtitle: "Acesse seu painel de rotina e produtividade.",
    footer: "Novo por aqui?",
    action: "Criar conta",
  },
  signup: {
    title: "Criar conta",
    subtitle: "Preencha seus dados para preparar seu perfil visual.",
    footer: "Já tem conta?",
    action: "Já tenho conta",
  },
};

const devilLines = [
  "VAI TRABALHAR.",
  "PARA DE ENROLAR.",
  "VOCÊ CHAMA ISSO DE PRODUTIVIDADE?",
  "ABRE O KANBAN AGORA.",
  "SEU CÓDIGO NÃO VAI SE ESCREVER SOZINHO.",
  "FOCO.",
  "VOCÊ TÁ PROCRASTINANDO.",
  "BORA.",
  "FAZ A TASK.",
  "SEM PREGUIÇA.",
];

const devilDragLines = [
  "ME SOLTA.",
  "EI.",
  "PARA.",
  "SOCORRO.",
  "ISSO É SEQUESTRO.",
  "AAAAAAAA.",
  "EU VOU DENUNCIAR ISSO.",
];

function confirmAction(message = "Essa ação precisa da sua confirmação para continuar.", options = {}) {
  if (!confirmModal || !confirmAccept || !confirmCancel) {
    return Promise.resolve(confirm(message));
  }

  const {
    title = "Tem certeza?",
    kicker = "Confirmar ação",
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    tone = "danger",
    icon = tone === "danger" ? "alert" : "checkCircle",
  } = options;

  confirmKicker.textContent = kicker;
  confirmTitle.textContent = title;
  confirmMessage.textContent = message;
  confirmAccept.textContent = confirmLabel;
  confirmCancel.textContent = cancelLabel;
  confirmIcon.innerHTML = uiIcon(icon);
  if (confirmInput) {
    confirmInput.hidden = true;
    confirmInput.value = "";
  }
  confirmModal.dataset.tone = tone;
  confirmModal.hidden = false;
  confirmModal.classList.remove("is-closing");
  confirmModal.classList.add("is-open");
  confirmAccept.focus();

  return new Promise((resolve) => {
    const cleanup = (result) => {
      confirmModal.classList.add("is-closing");
      confirmModal.classList.remove("is-open");
      window.setTimeout(() => {
        confirmModal.hidden = true;
        confirmModal.classList.remove("is-closing");
      }, 180);
      confirmAccept.removeEventListener("click", onAccept);
      confirmCancel.removeEventListener("click", onCancel);
      confirmModal.removeEventListener("click", onBackdrop);
      document.removeEventListener("keydown", onKeydown);
      resolve(result);
    };
    const onAccept = () => cleanup(true);
    const onCancel = () => cleanup(false);
    const onBackdrop = (event) => {
      if (event.target === confirmModal) cleanup(false);
    };
    const onKeydown = (event) => {
      if (event.key === "Escape") cleanup(false);
    };

    confirmAccept.addEventListener("click", onAccept);
    confirmCancel.addEventListener("click", onCancel);
    confirmModal.addEventListener("click", onBackdrop);
    document.addEventListener("keydown", onKeydown);
  });
}

function promptAction({
  title = "Editar informação",
  message = "Informe o novo valor.",
  initialValue = "",
  kicker = "Campo obrigatório",
  confirmLabel = "Salvar",
  cancelLabel = "Cancelar",
  tone = "default",
  icon = "edit",
} = {}) {
  if (!confirmModal || !confirmAccept || !confirmCancel || !confirmInput) {
    return Promise.resolve(prompt(message, initialValue));
  }

  confirmKicker.textContent = kicker;
  confirmTitle.textContent = title;
  confirmMessage.textContent = message;
  confirmAccept.textContent = confirmLabel;
  confirmCancel.textContent = cancelLabel;
  confirmIcon.innerHTML = uiIcon(icon);
  confirmInput.hidden = false;
  confirmInput.value = initialValue;
  confirmInput.setAttribute("aria-label", message);
  confirmModal.dataset.tone = tone;
  confirmModal.hidden = false;
  confirmModal.classList.remove("is-closing");
  confirmModal.classList.add("is-open");
  confirmInput.focus();
  confirmInput.select();

  return new Promise((resolve) => {
    const cleanup = (result) => {
      confirmModal.classList.add("is-closing");
      confirmModal.classList.remove("is-open");
      window.setTimeout(() => {
        confirmModal.hidden = true;
        confirmModal.classList.remove("is-closing");
        confirmInput.hidden = true;
        confirmInput.value = "";
      }, 180);
      confirmAccept.removeEventListener("click", onAccept);
      confirmCancel.removeEventListener("click", onCancel);
      confirmModal.removeEventListener("click", onBackdrop);
      confirmInput.removeEventListener("keydown", onInputKeydown);
      document.removeEventListener("keydown", onKeydown);
      resolve(result);
    };
    const onAccept = () => cleanup(confirmInput.value);
    const onCancel = () => cleanup(null);
    const onBackdrop = (event) => {
      if (event.target === confirmModal) cleanup(null);
    };
    const onInputKeydown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        cleanup(confirmInput.value);
      }
    };
    const onKeydown = (event) => {
      if (event.key === "Escape") cleanup(null);
    };

    confirmAccept.addEventListener("click", onAccept);
    confirmCancel.addEventListener("click", onCancel);
    confirmModal.addEventListener("click", onBackdrop);
    confirmInput.addEventListener("keydown", onInputKeydown);
    document.addEventListener("keydown", onKeydown);
  });
}

function readAppState() {
  const rawState = localStorage.getItem(APP_KEY);

  if (!rawState) {
    return migrateLegacyState();
  }

  try {
    return normalizeAppState({
      ...cloneDefaultState(),
      ...JSON.parse(rawState),
    });
  } catch {
    return cloneDefaultState();
  }
}

function migrateLegacyState() {
  const legacyTasks = localStorage.getItem(LEGACY_TASKS_KEY);
  const legacyName = localStorage.getItem(LEGACY_USER_NAME_KEY);
  const legacyTheme = localStorage.getItem(LEGACY_THEME_KEY);

  if (!legacyTasks && !legacyName) {
    return cloneDefaultState();
  }

  let tasks = [];

  try {
    tasks = JSON.parse(legacyTasks || "[]").map(normalizeTask);
  } catch {
    tasks = [];
  }

  const user = {
    id: createId(),
    name: legacyName || "Usuário",
    email: "usuario@local.app",
    password: "123456",
    settings: {
      theme: legacyTheme || "dark",
      defaultViewDate: "today",
      notificationsEnabled: true,
      sidebarCollapsed: false,
      collapsedFolders: {},
    },
    avatarImage: "",
    tasks,
    folders: [],
    notifications: [],
  };

  return {
    users: [user],
    currentUserId: null,
  };
}

function saveAppState() {
  localStorage.setItem(APP_KEY, JSON.stringify(appState));
}

function getProfilePayload(user = getCurrentUser()) {
  if (!user) return null;

  return {
    nome: user.name,
    email: user.email,
    avatarImage: user.avatarImage || "",
    folders: user.folders || [],
    estatisticas: calcularEstatisticas(user),
    configuracoes: {
      tema: user.settings.theme,
      notificacoesAtivadas: user.settings.notificationsEnabled,
      sidebarCollapsed: user.settings.sidebarCollapsed,
      collapsedFolders: user.settings.collapsedFolders || {},
    },
    notifications: user.notifications || [],
  };
}

function calcularEstatisticas(user = getCurrentUser()) {
  const tasks = user?.tasks || [];
  const folders = user?.folders || [];
  const total = tasks.length;
  const concluidas = tasks.filter((task) => task.isCompleted).length;
  const pendentes = tasks.filter((task) => task.status === "Pendente").length;
  const emAndamento = tasks.filter((task) => task.status === "Em andamento").length;
  const progresso = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  const porPrioridade = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});

  const porCategoria = tasks.reduce((acc, task) => {
    acc[task.categoryName] = (acc[task.categoryName] || 0) + 1;
    return acc;
  }, {});

  const porData = tasks.reduce((acc, task) => {
    acc[task.date] = (acc[task.date] || 0) + 1;
    return acc;
  }, {});

  return {
    totalTarefas: total,
    tarefasConcluidas: concluidas,
    tarefasPendentes: pendentes,
    tarefasEmAndamento: emAndamento,
    progressoPercentual: progresso,
    totalPastas: folders.length,
    porPrioridade,
    porCategoria,
    porData,
  };
}

function salvarEstatisticasUsuario() {
  if (!usuarioLogado || isApplyingRemoteData) return;

  const user = getCurrentUser();
  if (!user) return;

  salvarPerfilUsuario(usuarioLogado.uid, {
    estatisticas: calcularEstatisticas(user),
  }).catch((error) => {
    console.error("Erro ao salvar estatisticas do usuario.", error);
  });
}

async function syncUserProfileNow() {
  if (!usuarioLogado || isApplyingRemoteData) return false;

  const payload = getProfilePayload();
  if (!payload) return false;

  try {
    await salvarPerfilUsuario(usuarioLogado.uid, payload);
    return true;
  } catch (error) {
    console.error("Erro ao salvar perfil do usuario.", error);
    return false;
  }
}

function scheduleProfileSync() {
  if (!usuarioLogado || isApplyingRemoteData) return;

  clearTimeout(profileSyncTimer);
  profileSyncTimer = setTimeout(syncUserProfileNow, 300);
}

function normalizeAppState(state) {
  const users = Array.isArray(state.users) ? state.users.map(normalizeUser) : [];
  const currentUserExists = users.some((user) => user.id === state.currentUserId);

  return {
    users,
    currentUserId: currentUserExists ? state.currentUserId : null,
  };
}

function cloneDefaultState() {
  if (typeof structuredClone === "function") {
    return structuredClone(defaultState);
  }

  return JSON.parse(JSON.stringify(defaultState));
}

function createId() {
  if (globalThis.crypto?.randomUUID) {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getCurrentUser() {
  const user = appState.users.find((item) => item.id === appState.currentUserId);
  return user ? normalizeUser(user) : null;
}

function updateCurrentUser(updater) {
  appState.users = appState.users.map((user) => {
    if (user.id !== appState.currentUserId) {
      return user;
    }

    return normalizeUser(updater(normalizeUser(user)));
  });

  saveAppState();
  scheduleProfileSync();
}

function resetSessionViewState() {
  activeCategory = "all";
  activePriority = "all";
  activeSearch = "";
  activeSort = "chronological";
  expandedTaskId = null;
  highlightedRoutineDate = "";
  activeRoutineId = "";
  activeView = "workspace";
  selectedRoutineDate = getTodayDate();
  routineWeekStart = getStartOfWeek(new Date(`${selectedRoutineDate}T12:00:00`));

  if (priorityFilter) {
    priorityFilter.value = "all";
    syncPriorityFilterColor();
  }

  if (taskSearch) taskSearch.value = "";
  if (sortFilter) sortFilter.value = "chronological";
  if (selectedDate) selectedDate.value = getTodayDate();
  if (taskDate) taskDate.value = selectedDate.value;
}

function uiIcon(name) {
  const icons = {
    bell: '<path d="M10 21a2 2 0 0 0 4 0"></path><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"></path><path d="M19 4h.01"></path>',
    calendar: '<path d="M8 2v4"></path><path d="M16 2v4"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M3 10h18"></path>',
    checkCircle: '<path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="9"></circle>',
    clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
    edit: '<path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"></path>',
    alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>',
    trash: '<path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path>',
    moon: '<path d="M12 3a6 6 0 0 0 9 7.5A9 9 0 1 1 12 3Z"></path>',
    plus: '<path d="M12 5v14"></path><path d="M5 12h14"></path>',
    sun: '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>',
    tag: '<path d="M12.6 2H4a2 2 0 0 0-2 2v8.6a2 2 0 0 0 .6 1.4l7.4 7.4a2 2 0 0 0 2.8 0l8.6-8.6a2 2 0 0 0 0-2.8L14 2.6A2 2 0 0 0 12.6 2Z"></path><path d="M7.5 7.5h.01"></path>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V4s-1 1-4 1-5-2-8-2-4 1-4 1v17"></path>',
    chevronDown: '<path d="m6 9 6 6 6-6"></path>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5Z"></path>',
    dumbbell: '<path d="M6.5 6.5 17.5 17.5"></path><path d="m21 14-7 7"></path><path d="m3 10 7-7"></path><path d="m18 11 3 3"></path><path d="m3 10 3 3"></path><path d="m14 3 7 7"></path><path d="m3 14 7 7"></path>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M3 13h18"></path>',
    gamepad: '<path d="M6 12h4"></path><path d="M8 10v4"></path><path d="M15 13h.01"></path><path d="M18 11h.01"></path><path d="M17.3 5H6.7A4.7 4.7 0 0 0 2 9.7v3.6A4.7 4.7 0 0 0 6.7 18h.6a3 3 0 0 0 2.1-.9L11 15.5h2l1.6 1.6a3 3 0 0 0 2.1.9h.6a4.7 4.7 0 0 0 4.7-4.7V9.7A4.7 4.7 0 0 0 17.3 5Z"></path>',
    brain: '<path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v.2A3.5 3.5 0 0 0 5 8v1a3 3 0 0 0-1 5.6V16a4 4 0 0 0 4 4h1.5V2Z"></path><path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v.2A3.5 3.5 0 0 1 19 8v1a3 3 0 0 1 1 5.6V16a4 4 0 0 1-4 4h-1.5V2Z"></path><path d="M9.5 7H8"></path><path d="M14.5 7H16"></path><path d="M9.5 13H7"></path><path d="M14.5 13H17"></path>',
    target: '<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1"></circle>',
    rocket: '<path d="M4.5 16.5c-1 1-1.5 3-1.5 4.5 1.5 0 3.5-.5 4.5-1.5"></path><path d="M9 15 7 17"></path><path d="M14 10 12 12"></path><path d="M8 16s-1.5-2-1-4c.7-3.2 4.5-7.3 11-9 1.7 6.5-5.8 10.3-9 11-.7.2-1 2-1 2Z"></path><path d="M14 6h.01"></path>',
    heartPulse: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1"></path><path d="M4 13h3l2-3 3 7 2-4h6"></path><path d="m20 13-8 8-3-3"></path>',
    apple: '<path d="M12 6.5c1.5-2.5 3.3-3.5 5-3.5-.2 2-1.6 3.7-4 4.5"></path><path d="M12 8c-4-3-8 0-8 5 0 4 3 9 6 9 1 0 1.5-.5 2-.5s1 .5 2 .5c3 0 6-5 6-9 0-5-4-8-8-5Z"></path>',
    monitor: '<rect x="3" y="4" width="18" height="13" rx="2"></rect><path d="M8 21h8"></path><path d="M12 17v4"></path>',
    music: '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>',
    medal: '<path d="m7.5 2 3 5"></path><path d="m16.5 2-3 5"></path><path d="M12 14l1.2 2.4 2.6.4-1.9 1.8.4 2.6-2.3-1.2-2.3 1.2.4-2.6-1.9-1.8 2.6-.4Z"></path><circle cx="12" cy="14" r="7"></circle>',
    sparkle: '<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Z"></path><path d="M19 16v4"></path><path d="M21 18h-4"></path>',
    pencil: '<path d="M12 20h9"></path><path d="m16.5 3.5 4 4L7 21l-4 1 1-4Z"></path>',
    graduationCap: '<path d="m22 10-10-5-10 5 10 5 10-5Z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path><path d="M22 10v6"></path>',
    activity: '<path d="M22 12h-4l-3 8L9 4l-3 8H2"></path>',
    chart: '<path d="M3 3v18h18"></path><path d="M7 16v-5"></path><path d="M12 16V8"></path><path d="M17 16v-9"></path>',
    building: '<rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M9 7h1"></path><path d="M14 7h1"></path><path d="M9 12h1"></path><path d="M14 12h1"></path><path d="M10 21v-4h4v4"></path>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3L5.8 21 7 14.2 2 9.3l6.9-1Z"></path>',
    listChecks: '<path d="m3 7 2 2 4-4"></path><path d="M11 7h10"></path><path d="m3 17 2 2 4-4"></path><path d="M11 17h10"></path>',
    cross: '<path d="M8 3h8v5h5v8h-5v5H8v-5H3V8h5Z"></path>',
  };

  return `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.tag}</svg>`;
}

function resetWorkspaceFilters() {
  activeCategory = "all";
  activePriority = "all";
  activeSearch = "";
  activeSort = "chronological";
  expandedTaskId = null;
  priorityFilter.value = "all";
  taskSearch.value = "";
  sortFilter.value = "chronological";
  syncPriorityFilterColor();
  renderDashboard();
}

function getTaskDateTime(task) {
  if (!task?.date) return null;

  const date = new Date(`${task.date}T${task.time || "00:00"}:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getRelativeTime(value) {
  const date = new Date(value);
  const diffMs = date.getTime() - Date.now();
  const absMs = Math.abs(diffMs);
  const units = [
    ["dia", 86400000],
    ["hora", 3600000],
    ["min", 60000],
  ];

  for (const [label, size] of units) {
    if (absMs >= size) {
      const amount = Math.round(absMs / size);
      return diffMs < 0 ? `há ${amount} ${label}${amount > 1 && label !== "min" ? "s" : ""}` : `em ${amount} ${label}${amount > 1 && label !== "min" ? "s" : ""}`;
    }
  }

  return "agora";
}

function getNotificationMeta(type) {
  const meta = {
    overdue: { icon: "alert", colorClass: "is-danger", label: "Atrasada" },
    upcoming: { icon: "clock", colorClass: "is-warning", label: "Próxima" },
    completed: { icon: "checkCircle", colorClass: "is-success", label: "Concluída" },
    folder: { icon: "folder", colorClass: "is-folder", label: "Pasta" },
    edited: { icon: "edit", colorClass: "is-info", label: "Editada" },
  };

  return meta[type] || { icon: "bell", colorClass: "is-info", label: "Sistema" };
}

function buildTaskNotification(task, type) {
  const dueDate = getTaskDateTime(task);
  const meta = getNotificationMeta(type);

  return normalizeNotification({
    key: `${type}:${task.id}:${task.date}:${task.time}`,
    type,
    taskId: task.id,
    title: type === "overdue" ? "Tarefa atrasada" : "Tarefa próxima do horário",
    description: `${task.title} • ${formatDate(task.date)} às ${task.time}`,
    priority: task.priority || "Média",
    createdAt: dueDate?.toISOString() || new Date().toISOString(),
    readAt: "",
    meta,
  });
}

function syncSmartNotifications() {
  const user = getCurrentUser();
  if (!user) return;

  if (!user.settings.notificationsEnabled) {
    renderNotifications();
    return;
  }

  const now = new Date();
  const existingKeys = new Set((user.notifications || []).map((notification) => notification.key));
  const generated = [];

  (user.tasks || []).forEach((task) => {
    const dueDate = getTaskDateTime(task);
    if (!dueDate || task.isCompleted) return;

    const overdueKey = `overdue:${task.id}:${task.date}:${task.time}`;
    if (dueDate < now && !existingKeys.has(overdueKey)) {
      generated.push(buildTaskNotification(task, "overdue"));
      existingKeys.add(overdueKey);
      return;
    }

    const upcomingKey = `upcoming:${task.id}:${task.date}:${task.time}`;
    const minutesUntilDue = (dueDate.getTime() - now.getTime()) / 60000;
    if (minutesUntilDue >= 0 && minutesUntilDue <= 30 && !existingKeys.has(upcomingKey)) {
      generated.push(buildTaskNotification(task, "upcoming"));
      existingKeys.add(upcomingKey);
    }
  });

  if (generated.length) {
    updateCurrentUser((currentUser) => ({
      ...currentUser,
      notifications: normalizeNotificationList([...generated, ...(currentUser.notifications || [])]).slice(0, 80),
    }));
  }

  renderNotifications();
}

function addNotification(notification) {
  const normalizedNotification = normalizeNotification(notification);
  const user = getCurrentUser();
  if (!user?.settings.notificationsEnabled) return;

  updateCurrentUser((currentUser) => {
    const notifications = currentUser.notifications || [];
    if (notifications.some((item) => item.key === normalizedNotification.key)) return currentUser;

    return {
      ...currentUser,
      notifications: normalizeNotificationList([normalizedNotification, ...notifications]).slice(0, 80),
    };
  });

  renderNotifications();
}

function getUnreadNotifications() {
  return (getCurrentUser()?.notifications || []).filter((notification) => !notification.readAt);
}

function renderNotifications() {
  const notifications = getCurrentUser()?.notifications || [];
  const unreadCount = getUnreadNotifications().length;
  const hasUnread = unreadCount > 0;

  if (notificationBadge) {
    notificationBadge.hidden = !hasUnread;
    notificationBadge.textContent = unreadCount > 99 ? "99+" : String(unreadCount);
  }

  notificationToggle?.classList.toggle("has-unread", hasUnread);
  notificationToggle?.classList.toggle("is-open", !notificationPanel?.hidden);
  sidebarNotificationToggle?.classList.toggle("has-unread", hasUnread);
  sidebarNotificationToggle?.classList.toggle("is-active", !notificationPanel?.hidden);

  if (!notificationList) return;

  if (!notifications.length) {
    notificationList.innerHTML = `
      <div class="notification-empty">
        <span>${uiIcon("bell")}</span>
        <strong>Tudo em dia</strong>
        <p>Quando uma tarefa atrasar ou algo importante acontecer, aparece aqui.</p>
      </div>
    `;
    return;
  }

  notificationList.innerHTML = notifications.map(renderNotificationItem).join("");
}

function renderNotificationItem(notification) {
  const meta = getNotificationMeta(notification.type);
  const readClass = notification.readAt ? " is-read" : " is-unread";

  return `
    <button class="notification-item${readClass}" type="button" data-notification-id="${notification.id}">
      <span class="notification-icon ${meta.colorClass}" aria-hidden="true">${uiIcon(meta.icon)}</span>
      <span class="notification-content">
        <span class="notification-item-head">
          <strong>${escapeHtml(notification.title)}</strong>
          <time>${getRelativeTime(notification.createdAt)}</time>
        </span>
        <span class="notification-description">${escapeHtml(notification.description)}</span>
        <span class="notification-meta">
          <span class="task-pill ${getPriorityBadgeClass(notification.priority)}">${escapeHtml(notification.priority)}</span>
          <span>${escapeHtml(meta.label)}</span>
        </span>
      </span>
    </button>
  `;
}

function toggleNotificationPanel() {
  const shouldOpen = notificationPanel.hidden;
  notificationPanel.hidden = !shouldOpen;
  notificationToggle.setAttribute("aria-expanded", String(shouldOpen));
  notificationToggle.classList.toggle("is-open", shouldOpen);
  renderNotifications();
}

function closeNotificationPanel() {
  if (!notificationPanel || notificationPanel.hidden) return;

  notificationPanel.hidden = true;
  notificationToggle.setAttribute("aria-expanded", "false");
  notificationToggle.classList.remove("is-open");
}

function markAllNotificationsRead() {
  const readAt = new Date().toISOString();

  updateCurrentUser((user) => ({
    ...user,
    notifications: (user.notifications || []).map((notification) => ({
      ...notification,
      readAt: notification.readAt || readAt,
    })),
  }));

  renderNotifications();
  showToast("Notificações marcadas como lidas.");
}

function openNotificationTarget(notificationId) {
  const notification = getCurrentUser()?.notifications.find((item) => item.id === notificationId);
  if (!notification) return;

  updateCurrentUser((user) => ({
    ...user,
    notifications: (user.notifications || []).map((item) => (
      item.id === notificationId ? { ...item, readAt: item.readAt || new Date().toISOString() } : item
    )),
  }));

  closeNotificationPanel();
  renderNotifications();

  if (notification.taskId) {
    openTaskEditor(notification.taskId);
  }
}

function showToast(message, type = "success") {
  if (!toastRegion) return;

  const toast = document.createElement("div");
  toast.className = `app-toast is-${type}`;
  toast.innerHTML = `
    <span>${uiIcon(type === "success" ? "checkCircle" : "bell")}</span>
    <strong>${escapeHtml(message)}</strong>
  `;
  toastRegion.append(toast);

  window.setTimeout(() => {
    toast.classList.add("is-leaving");
    window.setTimeout(() => toast.remove(), 220);
  }, 2600);
}

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function syncDevilSpriteAsset() {
  if (!devilSpriteImage?.dataset.spriteSrc) return;

  const preferredSprite = devilSpriteImage.dataset.spriteSrc;
  const fallbackSprite = "assets/devil-pixel.svg";
  const tester = new Image();

  tester.onload = () => {
    devilSpriteImage.src = tester.naturalWidth > 0 ? preferredSprite : fallbackSprite;
  };
  tester.onerror = () => {
    devilSpriteImage.src = fallbackSprite;
  };
  tester.src = `${preferredSprite}?t=${Date.now()}`;
}

function setDevilSpriteImage(state = "idle") {
  if (!devilSpriteImage) return;

  const idleSprite = devilSpriteImage.dataset.spriteSrc || "assets/img/Hades.png";
  const dragSprite = devilSpriteImage.dataset.dragSrc || idleSprite;
  const sleepSprite = devilSpriteImage.dataset.sleepSrc || idleSprite;

  if (state === "drag") {
    devilSpriteImage.src = dragSprite;
    return;
  }

  devilSpriteImage.src = state === "sleep" ? sleepSprite : idleSprite;
}

function getSavedDevilPosition() {
  try {
    const position = JSON.parse(localStorage.getItem(DEVIL_POSITION_KEY) || "{}");
    return {
      x: Number.isFinite(position.x) ? position.x : window.innerWidth - 180,
      y: Number.isFinite(position.y) ? position.y : window.innerHeight - 220,
    };
  } catch {
    return { x: window.innerWidth - 180, y: window.innerHeight - 220 };
  }
}

function clampDevilPosition(x, y) {
  const width = devilCompanion?.offsetWidth || 126;
  const height = devilCompanion?.offsetHeight || 152;
  const padding = 12;

  return {
    x: Math.min(Math.max(padding, x), Math.max(padding, window.innerWidth - width - padding)),
    y: Math.min(Math.max(padding, y), Math.max(padding, window.innerHeight - height - padding)),
  };
}

function setDevilPosition(x, y, save = true) {
  if (!devilCompanion) return;

  const position = clampDevilPosition(x, y);
  devilCompanion.style.left = `${position.x}px`;
  devilCompanion.style.top = `${position.y}px`;

  if (save) localStorage.setItem(DEVIL_POSITION_KEY, JSON.stringify(position));
}

function setDevilMood(mood = "idle", duration = 1400) {
  if (!devilCompanion) return;

  clearTimeout(devilMoodTimer);
  devilCompanion.dataset.mood = mood;
  if (mood !== "idle" && duration) {
    devilMoodTimer = window.setTimeout(() => {
      devilCompanion.dataset.mood = "idle";
    }, duration);
  }
}

function enterDevilSleep() {
  if (!devilModeEnabled || devilDragState || !devilCompanion || !devilSpeech) return;

  devilIsSleeping = true;
  clearTimeout(devilIdleTimer);
  clearTimeout(devilMoodTimer);
  clearTimeout(devilSpeechTimer);
  clearInterval(devilSleepSpeechTimer);
  setDevilSpriteImage("sleep");
  devilCompanion.dataset.mood = "sleep";
  let sleepFrame = 0;
  const sleepLines = ["Z", "ZZ", "ZZZ", "ZZZZ"];
  devilSpeech.textContent = sleepLines[sleepFrame];
  devilSpeech.classList.add("is-visible");
  devilSleepSpeechTimer = window.setInterval(() => {
    sleepFrame = (sleepFrame + 1) % sleepLines.length;
    devilSpeech.textContent = sleepLines[sleepFrame];
  }, 650);
}

function scheduleDevilSleep() {
  clearTimeout(devilSleepTimer);
  if (!devilModeEnabled || devilDragState) return;

  devilSleepTimer = window.setTimeout(enterDevilSleep, 120000);
}

function wakeDevil() {
  if (!devilModeEnabled || !devilIsSleeping) {
    scheduleDevilSleep();
    return false;
  }

  devilIsSleeping = false;
  clearTimeout(devilSleepTimer);
  clearInterval(devilSleepSpeechTimer);
  devilSpeech?.classList.remove("is-visible");
  setDevilMood("idle", 0);
  setDevilSpriteImage("idle");
  scheduleDevilSleep();
  return true;
}

function devilSay(line = getRandomItem(devilLines), mood = "angry", duration = 2600) {
  if (!devilModeEnabled || !devilSpeech || devilIsSleeping) return;

  clearTimeout(devilSpeechTimer);
  scheduleDevilSleep();
  devilSpeech.textContent = line;
  devilSpeech.classList.add("is-visible");
  setDevilMood(mood, duration);
  devilSpeechTimer = window.setTimeout(() => {
    devilSpeech.classList.remove("is-visible");
  }, duration);
}

function devilReact(lines, mood = "angry", duration = 2400, cooldown = 2800) {
  if (!devilModeEnabled || devilIsSleeping || devilDragState) return;
  if (Date.now() < devilReactionCooldownUntil) return;

  devilReactionCooldownUntil = Date.now() + cooldown;
  devilSay(Array.isArray(lines) ? getRandomItem(lines) : lines, mood, duration);
}

function scheduleDevilIdle() {
  clearTimeout(devilIdleTimer);
  if (!devilModeEnabled) return;

  devilIdleTimer = window.setTimeout(() => {
    if (!devilModeEnabled || devilDragState || devilIsSleeping) return;

    const current = getSavedDevilPosition();
    const jitterX = (Math.random() - 0.5) * 260;
    const jitterY = (Math.random() - 0.5) * 160;
    setDevilPosition(current.x + jitterX, current.y + jitterY);
    devilSay(getRandomItem(devilLines), Math.random() > 0.7 ? "angry" : "idle");
    scheduleDevilIdle();
  }, 7000 + Math.random() * 8000);
}

function syncDevilToggle() {
  if (!devilModeToggle) return;

  devilModeToggle.classList.toggle("is-active", devilModeEnabled);
  devilModeToggle.setAttribute("aria-pressed", String(devilModeEnabled));
  devilModeToggle.querySelector("small").textContent = devilModeEnabled
    ? "Ativo. O mascote está patrulhando sua produtividade."
    : "Ativa um mini mascote caótico na tela.";
}

function setDevilMode(enabled) {
  devilModeEnabled = Boolean(enabled);
  localStorage.setItem(DEVIL_MODE_KEY, String(devilModeEnabled));
  syncDevilToggle();

  if (!devilCompanion) return;

  devilCompanion.hidden = !devilModeEnabled;
  if (!devilModeEnabled) {
    clearTimeout(devilSpeechTimer);
    clearTimeout(devilIdleTimer);
    clearTimeout(devilMoodTimer);
    clearTimeout(devilSleepTimer);
    clearInterval(devilSleepSpeechTimer);
    devilSpeech?.classList.remove("is-visible");
    devilIsSleeping = false;
    devilDragState = null;
    return;
  }

  const position = getSavedDevilPosition();
  setDevilPosition(position.x, position.y, false);
  syncDevilSpriteAsset();
  setDevilSpriteImage("idle");
  devilSay("MODO DIABO ATIVADO. BORA.", "angry", 2800);
  scheduleDevilSleep();
}

function toggleDevilMode() {
  setDevilMode(!devilModeEnabled);
}

function handleDevilPointerDown(event) {
  if (!devilModeEnabled || !devilCompanion) return;

  wakeDevil();
  clearTimeout(devilSleepTimer);
  const rect = devilCompanion.getBoundingClientRect();
  devilDragState = {
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
  };
  devilSprite.setPointerCapture?.(event.pointerId);
  devilCompanion.classList.add("is-dragging");
  setDevilSpriteImage("drag");
  setDevilMood("drag", 0);
  devilSay(getRandomItem(devilDragLines), "drag", 2200);
}

function handleDevilPointerMove(event) {
  if (!devilDragState) return;

  event.preventDefault();
  clearTimeout(devilSleepTimer);
  setDevilPosition(event.clientX - devilDragState.offsetX, event.clientY - devilDragState.offsetY);
}

function handleDevilPointerUp(event) {
  if (!devilDragState) return;

  devilSprite.releasePointerCapture?.(event.pointerId);
  devilDragState = null;
  devilCompanion?.classList.remove("is-dragging");
  setDevilSpriteImage("idle");
  setDevilMood("fallen", 1200);
  devilSay("DRAMÁTICO. MAS VOLTA AO TRABALHO.", "fallen", 2400);
  scheduleDevilSleep();
}

function normalizeUser(user) {
  const tasks = normalizeTaskList(user.tasks || []);

  return {
    ...user,
    avatarImage: user.avatarImage || "",
    settings: {
      theme: "dark",
      defaultViewDate: "today",
      notificationsEnabled: true,
      sidebarCollapsed: false,
      collapsedFolders: {},
      ...(user.settings || {}),
    },
    tasks,
    folders: normalizeFolderList(user.folders || [], tasks),
    notifications: normalizeNotificationList(user.notifications || []),
  };
}

function normalizeNotificationList(notifications) {
  const usedKeys = new Set();

  return (notifications || [])
    .map(normalizeNotification)
    .filter((notification) => {
      if (usedKeys.has(notification.key)) return false;
      usedKeys.add(notification.key);
      return true;
    })
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

function normalizeNotification(notification) {
  const type = notification.type || "system";

  return {
    id: notification.id || createId(),
    key: notification.key || `${type}:${notification.taskId || notification.folderId || createId()}`,
    type,
    title: notification.title || "Notificação",
    description: notification.description || "",
    priority: notification.priority || "Média",
    taskId: notification.taskId || "",
    folderId: notification.folderId || "",
    createdAt: notification.createdAt || new Date().toISOString(),
    readAt: notification.readAt || "",
  };
}

function normalizeFolderList(folders, tasks = []) {
  const taskIds = new Set((tasks || []).map((task) => task.id).filter(Boolean));
  const usedIds = new Set();

  const normalizedFolders = (folders || []).map((folder) => {
    const normalizedFolder = normalizeFolder(folder, taskIds);

    if (!usedIds.has(normalizedFolder.id)) {
      usedIds.add(normalizedFolder.id);
      return normalizedFolder;
    }

    const uniqueFolder = {
      ...normalizedFolder,
      id: createId(),
      createdAt: normalizedFolder.createdAt || new Date().toISOString(),
    };

    usedIds.add(uniqueFolder.id);
    return uniqueFolder;
  });

  const folderMap = new Map(normalizedFolders.map((folder) => [folder.id, folder]));

  (tasks || []).forEach((task) => {
    if (!task?.id || !task.folderBindingKnown) return;

    normalizedFolders.forEach((folder) => {
      folder.taskIds = folder.taskIds.filter((id) => id !== task.id);
    });

    if (!task.folderId || !folderMap.has(task.folderId)) return;

    const targetFolder = folderMap.get(task.folderId);
    targetFolder.taskIds = [...targetFolder.taskIds, task.id];
  });

  return normalizedFolders.map((folder) => ({
    ...folder,
    taskIds: Array.from(new Set(folder.taskIds)),
  }));
}

function normalizeFolder(folder, taskIds = new Set()) {
  const ids = Array.isArray(folder.taskIds) ? folder.taskIds : [];
  const uniqueTaskIds = Array.from(new Set(ids)).filter((id) => !taskIds.size || taskIds.has(id));

  return {
    id: folder.id || createId(),
    name: folder.name || "Nova pasta",
    color: folder.color || "#00b4d8",
    createdAt: folder.createdAt || new Date().toISOString(),
    taskIds: uniqueTaskIds,
  };
}

function normalizeTaskList(tasks) {
  const usedIds = new Set();

  return tasks.map((task) => {
    const normalizedTask = normalizeTask(task);

    if (!usedIds.has(normalizedTask.id)) {
      usedIds.add(normalizedTask.id);
      return normalizedTask;
    }

    const uniqueTask = {
      ...normalizedTask,
      id: createId(),
      createdAt: normalizedTask.createdAt || new Date().toISOString(),
    };

    usedIds.add(uniqueTask.id);
    return uniqueTask;
  });
}

function normalizeTask(task) {
  const status = task.status || (task.isCompleted ? "Concluída" : "Pendente");
  const tempo = task.tempo || task.etiqueta || "Deixar marcado";

  return {
    id: task.id || createId(),
    createdAt: task.createdAt || task.id || new Date().toISOString(),
    title: task.title || "Sem título",
    description: task.description || "",
    date: task.date || getTodayDate(),
    time: task.time || "09:00",
    categoryName: task.categoryName || "Geral",
    categoryColor: task.categoryColor || "#00b4d8",
    tempo,
    etiqueta: task.etiqueta || tempo,
    priority: task.priority || "Média",
    status,
    notes: task.notes || "",
    routineChecklist: task.routineChecklist || [],
    folderId: typeof task.folderId === "string" ? task.folderId : "",
    folderBindingKnown: Object.prototype.hasOwnProperty.call(task, "folderId")
      ? true
      : Boolean(task.folderBindingKnown),
    iconName: typeof task.iconName === "string" ? task.iconName : "",
    visualGlow: task.visualGlow || "",
    visualBadge: task.visualBadge || "",
    visualStyle: task.visualStyle || "",
    isCompleted: status === "Concluída" || Boolean(task.isCompleted),
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getTodayDate() {
  return formatIsoDate(new Date());
}

function formatDate(dateValue) {
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-");
  return `${day}/${month}/${year}`;
}

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getStartOfWeek(date) {
  const result = new Date(date);
  const dayOffset = (result.getDay() + 6) % 7;
  result.setDate(result.getDate() - dayOffset);
  result.setHours(12, 0, 0, 0);
  return result;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  result.setHours(12, 0, 0, 0);
  return result;
}

function getRoutineWeekDates() {
  return Array.from({ length: 7 }, (_, index) => addDays(routineWeekStart, index));
}

function getRoutineMonthLabel(date) {
  const month = new Intl.DateTimeFormat("pt-BR", { month: "short" })
    .format(date)
    .replace(".", "")
    .toUpperCase();
  return `${month} ${String(date.getFullYear()).slice(-2)}`;
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getHolidayName(dateValue) {
  const monthDay = dateValue?.slice(5);
  return holidays[monthDay] || null;
}

function getHolidayText(dateValue) {
  const holidayName = getHolidayName(dateValue);
  return holidayName ? `Feriado: ${holidayName}` : "Sem feriado nesta data";
}

function setFeedback(message = "", type = "default") {
  authFeedback.textContent = message;
  authFeedback.classList.toggle("is-success", type === "success");
}

function showAuthMode(mode) {
  currentMode = mode;
  const isSignup = currentMode === "signup";
  loginForm.hidden = isSignup;
  signupForm.hidden = !isSignup;
  footer.hidden = false;

  authTitle.textContent = screenCopy[currentMode].title;
  authSubtitle.textContent = screenCopy[currentMode].subtitle;
  footerText.textContent = screenCopy[currentMode].footer;
  modeButton.textContent = screenCopy[currentMode].action;

  resetAllPasswordVisibility();
  setFeedback();
}

function applyTheme() {
  const user = getCurrentUser();
  const theme = user?.settings.theme || "dark";
  document.documentElement.classList.add("is-theme-changing");
  document.documentElement.dataset.theme = theme;
  notificationToggle.setAttribute("aria-label", "Abrir notificações");
  sidebarThemeIcon.innerHTML = uiIcon(theme === "dark" ? "moon" : "sun");
  sidebarThemeLabel.textContent = theme === "dark" ? "Tema Escuro" : "Tema Claro";
  sidebarThemeCaption.textContent = theme === "dark" ? "Visual noturno" : "Visual claro";
  sidebarThemeToggle.classList.toggle("is-light", theme === "light");
  sidebarThemeToggle.setAttribute("aria-pressed", String(theme === "light"));
  sidebarThemeToggle.setAttribute("aria-label", theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
  sidebarThemeToggle.dataset.tooltip = theme === "dark" ? "Tema claro" : "Tema escuro";
  window.setTimeout(() => document.documentElement.classList.remove("is-theme-changing"), 260);
}

function toggleTheme() {
  const nextTheme = (getCurrentUser()?.settings.theme || "dark") === "dark" ? "light" : "dark";
  pendingThemeOverride = nextTheme;
  clearTimeout(pendingThemeOverrideTimer);
  pendingThemeOverrideTimer = window.setTimeout(() => {
    pendingThemeOverride = "";
  }, 30000);

  updateCurrentUser((user) => ({
    ...user,
    settings: {
      ...user.settings,
      theme: nextTheme,
    },
  }));
  applyTheme();
  syncUserProfileNow();
}

function setCurrentDate() {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  currentDate.textContent = `Vamos organizar sua rotina hoje • ${formatter.format(new Date(`${selectedDate.value}T12:00:00`))}`;
}

function syncPriorityFilterColor() {
  priorityFilter.classList.remove("is-low", "is-medium", "is-high");

  if (priorityFilter.value === "Baixa") {
    priorityFilter.classList.add("is-low");
  }

  if (priorityFilter.value === "Média") {
    priorityFilter.classList.add("is-medium");
  }

  if (priorityFilter.value === "Alta") {
    priorityFilter.classList.add("is-high");
  }

  syncCustomSelects();
}

function enhanceFilterSelects(root = document) {
  root.querySelectorAll("select").forEach((select) => {
    if (!select || customSelects.has(select)) return;

    const control = document.createElement("button");
    control.className = "custom-select-control";
    control.type = "button";
    control.setAttribute("aria-haspopup", "listbox");
    control.setAttribute("aria-expanded", "false");

    const value = document.createElement("span");
    value.className = "custom-select-value";
    const chevron = document.createElement("span");
    chevron.className = "custom-select-chevron";
    chevron.innerHTML = uiIcon("chevronDown");
    control.append(value, chevron);

    const menu = document.createElement("div");
    menu.className = "custom-select-menu";
    menu.hidden = true;
    menu.setAttribute("role", "listbox");

    Array.from(select.options).forEach((option) => {
      const item = document.createElement("button");
      item.className = "custom-select-option";
      item.type = "button";
      item.dataset.value = option.value;
      item.setAttribute("role", "option");
      item.textContent = option.textContent;
      menu.append(item);
    });

    select.classList.add("is-visually-hidden-select");
    select.insertAdjacentElement("afterend", menu);
    select.insertAdjacentElement("afterend", control);

    const instance = { control, value, menu };
    customSelects.set(select, instance);

    control.addEventListener("click", (event) => {
      event.stopPropagation();
      const shouldOpen = menu.hidden;
      closeCustomSelects();
      menu.hidden = !shouldOpen;
      control.setAttribute("aria-expanded", String(shouldOpen));
      control.classList.toggle("is-open", shouldOpen);
    });

    menu.addEventListener("click", (event) => {
      const item = event.target.closest("[data-value]");
      if (!item) return;
      select.value = item.dataset.value;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      closeCustomSelects();
    });

    select.addEventListener("change", () => syncCustomSelect(select));
    syncCustomSelect(select);
  });

  if (!customSelectDocumentBound) {
    document.addEventListener("click", closeCustomSelects);
    customSelectDocumentBound = true;
  }
}

function syncCustomSelect(select) {
  const instance = customSelects.get(select);
  if (!instance) return;

  const selectedOption = select.options[select.selectedIndex];
  instance.value.textContent = selectedOption?.textContent || "";
  instance.menu.querySelectorAll("[data-value]").forEach((item) => {
    const isSelected = item.dataset.value === select.value;
    item.classList.toggle("is-selected", isSelected);
    item.setAttribute("aria-selected", String(isSelected));
  });
}

function syncCustomSelects() {
  customSelects.forEach((_, select) => syncCustomSelect(select));
}

function closeCustomSelects() {
  customSelects.forEach(({ control, menu }) => {
    menu.hidden = true;
    control.classList.remove("is-open");
    control.setAttribute("aria-expanded", "false");
  });
}

function applySidebarState() {
  const user = getCurrentUser();
  const isCollapsed = Boolean(user?.settings.sidebarCollapsed);

  dashboardScreen.classList.toggle("is-sidebar-collapsed", isCollapsed);
  sidebarToggle.setAttribute("aria-pressed", String(isCollapsed));
  sidebarToggle.setAttribute("aria-label", isCollapsed ? "Expandir menu lateral" : "Recolher menu lateral");
}

function syncCollapsedFoldersFromUser() {
  const user = getCurrentUser();
  const collapsedFolders = user?.settings.collapsedFolders || {};

  collapsedFolderIds.clear();
  Object.entries(collapsedFolders).forEach(([folderId, isCollapsed]) => {
    if (isCollapsed) collapsedFolderIds.add(folderId);
  });
}

function toggleSidebar() {
  const nextCollapsed = !Boolean(getCurrentUser()?.settings.sidebarCollapsed);
  pendingSidebarOverride = nextCollapsed;
  clearTimeout(pendingSidebarOverrideTimer);
  pendingSidebarOverrideTimer = window.setTimeout(() => {
    pendingSidebarOverride = null;
  }, 30000);

  updateCurrentUser((user) => ({
    ...user,
    settings: {
      ...user.settings,
      sidebarCollapsed: nextCollapsed,
    },
  }));

  applySidebarState();
  syncUserProfileNow();
}

function renderUserAvatar(user) {
  sidebarAvatar.innerHTML = "";

  if (user?.avatarImage) {
    const image = document.createElement("img");
    image.src = user.avatarImage;
    image.alt = "";
    sidebarAvatar.append(image);
    return;
  }

  sidebarAvatar.textContent = user?.name ? getInitials(user.name) : "";
}

function sortTasks(tasks) {
  const priorityRanking = {
    alta: 0,
    alto: 0,
    media: 1,
    média: 1,
    medio: 1,
    médio: 1,
    baixa: 2,
    baixo: 2,
  };

  const normalizeText = (value) => String(value || "")
    .trim()
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const getPriorityRank = (priority) => priorityRanking[normalizeText(priority)] ?? 3;
  const getChronologicalValue = (task) => `${task.date || ""}T${task.time || "00:00"}`;
  const getAlphabeticalValue = (task) => normalizeText(task.title);
  const getCreationValue = (task) => `${task.createdAt || ""}-${task.id || ""}`;

  return [...tasks].sort((a, b) => {
    if (activeSort === "priority") {
      return getPriorityRank(a.priority) - getPriorityRank(b.priority)
        || getChronologicalValue(a).localeCompare(getChronologicalValue(b))
        || getCreationValue(a).localeCompare(getCreationValue(b));
    }

    if (activeSort === "alphabetical") {
      return getAlphabeticalValue(a).localeCompare(getAlphabeticalValue(b), "pt-BR")
        || getChronologicalValue(a).localeCompare(getChronologicalValue(b))
        || getCreationValue(a).localeCompare(getCreationValue(b));
    }

    return getChronologicalValue(a).localeCompare(getChronologicalValue(b))
      || getCreationValue(a).localeCompare(getCreationValue(b));
  });
}

function sortFolderTasks(tasks) {
  if (activeSort === "chronological") {
    return [...tasks];
  }

  const priorityRanking = {
    alta: 0,
    alto: 0,
    media: 1,
    média: 1,
    medio: 1,
    médio: 1,
    baixa: 2,
    baixo: 2,
  };
  const normalizeText = (value) => String(value || "")
    .trim()
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const getPriorityRank = (priority) => priorityRanking[normalizeText(priority)] ?? 3;

  const getChronologicalValue = (task) => `${task.date || ""}T${task.time || "00:00"}`;
  const getAlphabeticalValue = (task) => normalizeText(task.title);
  const getCreationValue = (task) => `${task.createdAt || ""}-${task.id || ""}`;

  return [...tasks].sort((a, b) => {
    if (activeSort === "priority") {
      return getPriorityRank(a.priority) - getPriorityRank(b.priority)
        || getChronologicalValue(a).localeCompare(getChronologicalValue(b))
        || getCreationValue(a).localeCompare(getCreationValue(b));
    }

    if (activeSort === "alphabetical") {
      return getAlphabeticalValue(a).localeCompare(getAlphabeticalValue(b), "pt-BR")
        || getChronologicalValue(a).localeCompare(getChronologicalValue(b))
        || getCreationValue(a).localeCompare(getCreationValue(b));
    }

    return getChronologicalValue(a).localeCompare(getChronologicalValue(b))
      || getCreationValue(a).localeCompare(getCreationValue(b));
  });
}

function isGeneralCategory(name) {
  return String(name || "").trim().toLocaleLowerCase("pt-BR") === "geral";
}

function taskMatchesActiveFilters(task) {
  return (activeCategory === "all" || task.categoryName === activeCategory)
    && (activePriority === "all" || task.priority === activePriority)
    && task.title.toLowerCase().includes(activeSearch);
}

function getVisibleTasks() {
  const user = getCurrentUser();
  const tasks = user?.tasks || [];

  const filteredTasks = tasks.filter(taskMatchesActiveFilters);

  return sortTasks(filteredTasks);
}

function getFolderTasks(folder, options = {}) {
  const user = getCurrentUser();
  const taskMap = new Map((user?.tasks || []).map((task) => [task.id, task]));
  const folderTaskIds = new Set(folder.taskIds || []);
  (user?.tasks || []).forEach((task) => {
    if (task.folderId === folder.id) folderTaskIds.add(task.id);
  });

  const tasks = Array.from(folderTaskIds)
    .map((taskId) => taskMap.get(taskId))
    .filter(Boolean);

  return sortFolderTasks(options.applyFilters ? tasks.filter(taskMatchesActiveFilters) : tasks);
}

function getVisibleFolders() {
  const user = getCurrentUser();
  const folders = user?.folders || [];

  if (activeCategory === "all" && activePriority === "all" && !activeSearch) {
    return folders;
  }

  return folders.filter((folder) => {
    const matchesName = folder.name.toLowerCase().includes(activeSearch);
    const hasMatchingTask = getFolderTasks(folder, { applyFilters: true }).length > 0;
    return matchesName || hasMatchingTask;
  });
}

function captureBoardScrollState() {
  if (!timelineList) return null;

  return {
    left: timelineList.scrollLeft,
    stacks: Array.from(timelineList.querySelectorAll("[data-folder-drop-id]")).map((column) => ({
      id: column.dataset.folderDropId,
      top: column.querySelector(".board-card-stack")?.scrollTop || 0,
    })),
  };
}

function restoreBoardScrollState(state) {
  if (!state || !timelineList) return;

  timelineList.scrollLeft = state.left || 0;
  state.stacks.forEach(({ id, top }) => {
    const stack = timelineList
      .querySelector(`[data-folder-drop-id="${CSS.escape(id)}"] .board-card-stack`);
    if (stack) stack.scrollTop = top || 0;
  });
}

function getFolderedTaskIds(user = getCurrentUser()) {
  return new Set([
    ...(user?.folders || []).flatMap((folder) => folder.taskIds || []),
    ...(user?.tasks || []).filter((task) => task.folderId).map((task) => task.id),
  ]);
}

function getUnfolderedTasks() {
  const folderedTaskIds = getFolderedTaskIds();
  return getVisibleTasks().filter((task) => !folderedTaskIds.has(task.id));
}

function normalizeLabelText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const categoryVisuals = [
  {
    key: "studies",
    label: "Estudos",
    icon: "book",
    color: "#2f80ff",
    glow: "soft",
    badge: "Acadêmica",
    style: "Foco limpo",
    icons: ["book", "pencil", "graduationCap"],
    keywords: ["estudo", "estudos", "faculdade", "escola", "aula", "prova", "livro", "curso", "matematica", "enem"],
  },
  {
    key: "training",
    label: "Treino",
    icon: "dumbbell",
    color: "#ff5a5f",
    glow: "energy",
    badge: "Energia",
    style: "Ativo",
    icons: ["dumbbell", "activity", "heartPulse"],
    keywords: ["treino", "academia", "crossfit", "corrida", "exercicio", "musculacao", "fitness", "cardio"],
  },
  {
    key: "work",
    label: "Trabalho",
    icon: "briefcase",
    color: "#8b5cf6",
    glow: "premium",
    badge: "Profissional",
    style: "Corporativo",
    icons: ["briefcase", "monitor", "chart", "building"],
    keywords: ["trabalho", "job", "reuniao", "projeto", "cliente", "office", "empresa", "freela", "relatorio"],
  },
  {
    key: "leisure",
    label: "Lazer",
    icon: "gamepad",
    color: "#f6c445",
    glow: "playful",
    badge: "Criativa",
    style: "Leve",
    icons: ["gamepad", "star", "music"],
    keywords: ["lazer", "jogo", "game", "musica", "filme", "serie", "descanso", "hobby", "passeio"],
  },
  {
    key: "growth",
    label: "Desenvolvimento",
    icon: "brain",
    color: "#a855f7",
    glow: "neon",
    badge: "Evolução",
    style: "Futurista",
    icons: ["brain", "target", "rocket", "medal"],
    keywords: ["desenvolvimento", "pessoal", "meta", "habito", "foco", "meditacao", "leitura", "mindset", "objetivo"],
  },
  {
    key: "routine",
    label: "Rotina",
    icon: "calendar",
    color: "#14b8a6",
    glow: "soft",
    badge: "Organizada",
    style: "Produtivo",
    icons: ["calendar", "listChecks", "clock"],
    keywords: ["rotina", "tarefa", "agenda", "calendario", "checklist", "organizar", "compromisso"],
  },
  {
    key: "health",
    label: "Saúde",
    icon: "heartPulse",
    color: "#22c55e",
    glow: "clean",
    badge: "Wellness",
    style: "Calmo",
    icons: ["apple", "heartPulse", "cross"],
    keywords: ["saude", "medico", "remedio", "consulta", "alimentacao", "agua", "sono", "terapia", "nutricao"],
  },
];

function getAllVisualIconNames() {
  return new Set(categoryVisuals.flatMap((visual) => visual.icons || [visual.icon]));
}

function isVisualIconName(name) {
  return getAllVisualIconNames().has(name);
}

function getCategoryVisual(...values) {
  const combined = normalizeLabelText(values.filter(Boolean).join(" "));
  const matched = categoryVisuals.find((visual) => (
    visual.keywords.some((keyword) => combined.includes(normalizeLabelText(keyword)))
  ));

  return matched || {
    key: "default",
    label: "Tarefa",
    icon: "checkCircle",
    color: "#2f80ff",
    glow: "soft",
    badge: "Geral",
    style: "Minimalista",
    icons: ["checkCircle", "tag", "sparkle"],
    keywords: [],
  };
}

function getTaskVisual(task) {
  const visual = getCategoryVisual(task?.categoryName, task?.title, task?.description, task?.notes);
  const icon = isVisualIconName(task?.iconName) ? task.iconName : visual.icon;

  return {
    ...visual,
    icon,
    color: task?.categoryColor || visual.color,
    label: task?.categoryName || visual.label,
    glow: task?.visualGlow || visual.glow,
    badge: task?.visualBadge || visual.badge,
    style: task?.visualStyle || visual.style,
  };
}

function getRoutineVisual(routine) {
  const visual = getCategoryVisual(routine?.category, routine?.title, routine?.description, routine?.location, routine?.notes);
  return {
    ...visual,
    color: routine?.categoryColor || visual.color,
    label: routine?.category || visual.label,
  };
}

function renderIconSuggestions() {
  if (!taskIconSuggestions) return;

  const renderSuggestionGroup = (visual) => {
    const iconButtons = (visual.icons || [visual.icon]).map((iconName) => `
      <button class="icon-pick-button" type="button" data-visual-key="${visual.key}" data-icon-name="${iconName}" aria-label="${escapeHtml(visual.label)} - ${escapeHtml(iconName)}">
        ${uiIcon(iconName)}
      </button>
    `).join("");

    return `
      <div class="icon-suggestion-group" style="--visual-color: ${visual.color}">
        <button class="icon-suggestion-button" type="button" data-visual-key="${visual.key}" data-icon-name="${visual.icon}">
          <span class="icon-suggestion-art" aria-hidden="true">
            <span class="icon-suggestion-orb">${uiIcon(visual.icon)}</span>
            <span class="icon-suggestion-palette">
              <i></i>
              <i></i>
              <i></i>
            </span>
          </span>
          <span class="icon-suggestion-content">
            <span class="icon-suggestion-topline">
              <strong>${escapeHtml(visual.label)}</strong>
              <em>${escapeHtml(visual.badge)}</em>
            </span>
            <small>${escapeHtml(visual.style)} para leitura rápida</small>
          </span>
        </button>
        <details class="icon-symbols-disclosure">
          <summary>${uiIcon("sparkle")} Trocar símbolo</summary>
          <div class="icon-picker-row">
            ${iconButtons}
          </div>
        </details>
      </div>
    `;
  };

  const primaryVisuals = categoryVisuals.slice(0, 4);
  const secondaryVisuals = categoryVisuals.slice(4);

  taskIconSuggestions.innerHTML = `
    <div class="icon-suggestion-primary">
      ${primaryVisuals.map(renderSuggestionGroup).join("")}
    </div>
    <details class="identity-more-disclosure">
      <summary>
        <span>${uiIcon("plus")} Mais identidades</span>
        ${uiIcon("chevronDown")}
      </summary>
      <div class="icon-suggestion-secondary">
        ${secondaryVisuals.map(renderSuggestionGroup).join("")}
      </div>
    </details>
  `;
}

function updateTaskVisualPreview() {
  if (!taskCreatePreview) return;

  const visual = getCategoryVisual(taskCategoryName.value, taskTitle.value, taskDescription.value, taskNotes.value);
  const currentIcons = visual.icons || [visual.icon];
  const selectedIcon = taskIconChoice?.value || "";
  const iconName = currentIcons.includes(selectedIcon) ? selectedIcon : visual.icon;
  const title = taskTitle.value.trim() || `${visual.label} inteligente`;
  const color = taskCategoryColor.value === DEFAULT_TASK_COLOR ? visual.color : taskCategoryColor.value || visual.color;

  if (taskIconChoice && taskIconChoice.value && !currentIcons.includes(taskIconChoice.value)) {
    taskIconChoice.value = "";
  }
  taskCreatePreview.style.setProperty("--visual-color", color);
  taskCreatePreviewIcon.innerHTML = uiIcon(iconName);
  taskCreatePreviewTitle.textContent = title;
  taskCreatePreviewMeta.textContent = `${visual.label} com identidade visual automática para leitura rápida.`;
  taskIconSuggestions?.querySelectorAll("[data-icon-name]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.iconName === iconName && button.dataset.visualKey === visual.key);
  });
}

function updateProgress() {
  const user = getCurrentUser();
  const tasks = user?.tasks || [];
  const folders = user?.folders || [];
  const total = tasks.length;
  const completed = tasks.filter((task) => task.isCompleted).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  progressLabel.textContent = `${completed}/${total} Concluídas - ${percent}%`;
  taskCounter.textContent = `${total} ${total === 1 ? "tarefa" : "tarefas"} no total`;
  progressFill.style.width = `${percent}%`;
  statTotal.textContent = String(total);
  statCompleted.textContent = String(completed);
  statProgress.textContent = `${percent}%`;
  statFolders.textContent = String(folders.length);
  statProgressRing.style.setProperty("--progress-value", `${percent}%`);
}

function renderCategoryFilters() {
  const user = getCurrentUser();
  const folders = user?.folders || [];
  const categories = Array.from(
    new Map((user?.tasks || [])
      .filter((task) => !isGeneralCategory(task.categoryName))
      .map((task) => [task.categoryName, task.categoryColor])),
  );

  categoryList.innerHTML = [
    `<button class="category-filter ${activeCategory === "all" ? "is-active" : ""}" type="button" data-category="all" data-tooltip="Todas">
      <span class="category-dot" style="--dot-color: #a0aec0"></span>
      Todas
    </button>`,
    folders.length ? `<span class="sidebar-inline-label">Pastas</span>` : "",
    ...folders.map((folder) => {
      const tasks = getFolderTasks(folder);
      const isOpen = activeSidebarFolderId === folder.id;
      return `
        <div class="sidebar-folder-group">
          <button class="category-filter sidebar-folder-filter ${isOpen ? "is-active" : ""}" type="button" data-sidebar-folder="${folder.id}" data-tooltip="${escapeHtml(folder.name)}">
            <span class="nav-icon" aria-hidden="true">${uiIcon("folder")}</span>
            <span class="sidebar-folder-name">${escapeHtml(folder.name)}</span>
            <span class="sidebar-folder-count">${tasks.length}</span>
          </button>
          <div class="sidebar-folder-popover" ${isOpen ? "" : "hidden"}>
            ${
              tasks.length
                ? tasks.map((task) => `
                  <button type="button" data-sidebar-task="${task.id}">
                    <span aria-hidden="true">→</span>
                    ${escapeHtml(task.title)}
                  </button>
                `).join("")
                : `<span class="sidebar-folder-empty">Sem cartões</span>`
            }
          </div>
        </div>
      `;
    }),
    categories.length ? `<span class="sidebar-inline-label">Categorias</span>` : "",
    ...categories.map(([name, color]) => {
      const visual = getCategoryVisual(name);
      return `
      <button class="category-filter ${activeCategory === name ? "is-active" : ""}" type="button" data-category="${encodeURIComponent(name)}" data-tooltip="${escapeHtml(name)}">
        <span class="category-visual-icon" style="--dot-color: ${color || visual.color}" aria-hidden="true">${uiIcon(visual.icon)}</span>
        ${escapeHtml(name)}
      </button>
    `;
    }),
  ].join("");
}

function renderExpandedPanel(task) {
  const holidayText = getHolidayText(task.date);

  return `
    <form class="task-expand-panel" data-edit-form="${task.id}">
      <label>
        <span>Título</span>
        <input type="text" name="title" value="${escapeHtml(task.title)}" required>
      </label>
      <label>
        <span>Descrição</span>
        <input type="text" name="description" value="${escapeHtml(task.description)}">
      </label>
      <label>
        <span>Data</span>
        <input type="date" name="date" value="${task.date}" required>
      </label>
      <label>
        <span>Horário</span>
        <input type="time" name="time" value="${task.time}" required>
      </label>
      <label>
        <span>Categoria</span>
        <input type="text" name="categoryName" value="${escapeHtml(task.categoryName)}">
      </label>
      <label>
        <span>Cor</span>
        <input class="color-input" type="color" name="categoryColor" value="${task.categoryColor}">
      </label>
      <label>
        <span>Tempo</span>
        <select name="tempo">
          ${tempoOptions.map((option) => `
            <option value="${escapeHtml(option)}" ${task.tempo === option ? "selected" : ""}>${escapeHtml(option)}</option>
          `).join("")}
        </select>
      </label>
      <label>
        <span>Prioridade</span>
        <select name="priority">
          <option value="Baixa" ${task.priority === "Baixa" ? "selected" : ""}>Baixa</option>
          <option value="Média" ${task.priority === "Média" ? "selected" : ""}>Média</option>
          <option value="Alta" ${task.priority === "Alta" ? "selected" : ""}>Alta</option>
        </select>
      </label>
      <label>
        <span>Status</span>
        <select name="status">
          <option value="Pendente" ${task.status === "Pendente" ? "selected" : ""}>Pendente</option>
          <option value="Em andamento" ${task.status === "Em andamento" ? "selected" : ""}>Em andamento</option>
          <option value="Concluída" ${task.status === "Concluída" ? "selected" : ""}>Concluída</option>
        </select>
      </label>
      <label>
        <span>Observações</span>
        <input type="text" name="notes" value="${escapeHtml(task.notes)}">
      </label>
      <div class="task-holiday-panel" aria-label="Informação de feriado">
        <span>Feriado</span>
        <strong>${escapeHtml(holidayText)}</strong>
      </div>

      <div class="task-panel-actions">
        <button class="task-save-button" type="submit">Salvar Alterações</button>
        <button class="task-delete-button" type="button" data-delete-task="${task.id}">Excluir</button>
      </div>
    </form>
  `;
}

function getTaskFolderId(taskId) {
  const user = getCurrentUser();
  const task = user?.tasks.find((item) => item.id === taskId);
  if (task?.folderId && user?.folders.some((folder) => folder.id === task.folderId)) {
    return task.folderId;
  }

  return user?.folders.find((folder) => folder.taskIds.includes(taskId))?.id || "";
}

function holdFolderStateForRemoteSync() {
  pendingFoldersOverride = getCurrentUser()?.folders || null;
  clearTimeout(pendingFoldersOverrideTimer);
  pendingFoldersOverrideTimer = window.setTimeout(() => {
    pendingFoldersOverride = null;
  }, 30000);
  syncUserProfileNow();
}

function renderFolderOptions(selectedFolderId = "") {
  const user = getCurrentUser();
  return [
    `<option value="" ${selectedFolderId ? "" : "selected"}>Nenhuma pasta</option>`,
    ...(user?.folders || []).map((folder) => `
      <option value="${folder.id}" ${selectedFolderId === folder.id ? "selected" : ""}>${escapeHtml(folder.name)}</option>
    `),
  ].join("");
}

function renderVisualIconPicker(visual, selectedIcon) {
  const icons = visual.icons || [visual.icon];
  const presetCards = categoryVisuals.map((preset) => `
    <button class="identity-preset-card ${preset.key === visual.key ? "is-selected" : ""}" type="button" data-identity-preset="${preset.key}" style="--preset-color: ${preset.color}">
      <span aria-hidden="true">${uiIcon(preset.icon)}</span>
      <strong>${escapeHtml(preset.label)}</strong>
      <small>${escapeHtml(preset.badge)}</small>
    </button>
  `).join("");

  return `
    <div class="editor-icon-picker" style="--visual-color: ${visual.color}">
      <input type="hidden" name="iconName" value="${escapeHtml(selectedIcon)}">
      <input type="hidden" name="visualGlow" value="${escapeHtml(visual.glow || "soft")}">
      <input type="hidden" name="visualBadge" value="${escapeHtml(visual.badge || "Geral")}">
      <input type="hidden" name="visualStyle" value="${escapeHtml(visual.style || "Minimalista")}">
      <button class="identity-edit-button" type="button" data-toggle-icon-editor>
        ${uiIcon("edit")}
        Editar
      </button>
      <div class="identity-editor-panel" hidden>
        <div class="identity-panel-header">
          <div>
            <span>Editar identidade</span>
            <strong>Personalize o visual do card</strong>
          </div>
          <button class="identity-panel-close" type="button" data-close-identity-editor aria-label="Fechar">${uiIcon("chevronDown")}</button>
        </div>

        <div class="identity-live-preview" style="--visual-color: ${visual.color}">
          <span class="identity-live-icon" aria-hidden="true">${uiIcon(selectedIcon)}</span>
          <div>
            <span data-identity-preview-badge>${escapeHtml(visual.badge || "Geral")}</span>
            <strong data-identity-preview-label>${escapeHtml(visual.label)}</strong>
            <small data-identity-preview-style>${escapeHtml(visual.style || "Minimalista")}</small>
          </div>
        </div>

        <div class="identity-panel-section">
          <span>Identidades prontas</span>
          <div class="identity-preset-grid">
            ${presetCards}
          </div>
        </div>

        <div class="identity-panel-section">
          <span>Ícone</span>
          <div class="editor-icon-options">
            ${icons.map((iconName) => `
              <button class="icon-pick-button ${iconName === selectedIcon ? "is-selected" : ""}" type="button" data-editor-icon="${iconName}" aria-label="Alterar símbolo">
                ${uiIcon(iconName)}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="identity-panel-grid">
          <label>
            <span>Categoria</span>
            <input type="text" data-identity-category value="${escapeHtml(visual.label)}">
          </label>
          <label>
            <span>Cor principal</span>
            <input class="color-input" type="color" data-identity-color value="${visual.color}">
          </label>
          <label>
            <span>Glow</span>
            <select data-identity-glow>
              <option value="soft" ${visual.glow === "soft" ? "selected" : ""}>Suave</option>
              <option value="premium" ${visual.glow === "premium" ? "selected" : ""}>Premium</option>
              <option value="energy" ${visual.glow === "energy" ? "selected" : ""}>Energia</option>
              <option value="neon" ${visual.glow === "neon" ? "selected" : ""}>Neon discreto</option>
              <option value="clean" ${visual.glow === "clean" ? "selected" : ""}>Clean</option>
              <option value="playful" ${visual.glow === "playful" ? "selected" : ""}>Criativo</option>
            </select>
          </label>
          <label>
            <span>Badge</span>
            <input type="text" data-identity-badge value="${escapeHtml(visual.badge || "Geral")}">
          </label>
          <label class="identity-panel-wide">
            <span>Estilo visual</span>
            <input type="text" data-identity-style value="${escapeHtml(visual.style || "Minimalista")}">
          </label>
        </div>
      </div>
    </div>
  `;
}

function getEditorIdentityElements(root) {
  return {
    form: root?.closest("form"),
    picker: root?.querySelector(".editor-icon-picker"),
    panel: root?.querySelector(".identity-editor-panel"),
    mainIcon: root?.querySelector(".task-identity-icon"),
    label: root?.querySelector("[data-current-identity-label]"),
    caption: root?.querySelector("[data-current-identity-caption]"),
    preview: root?.querySelector(".identity-live-preview"),
    previewIcon: root?.querySelector(".identity-live-icon"),
    previewBadge: root?.querySelector("[data-identity-preview-badge]"),
    previewLabel: root?.querySelector("[data-identity-preview-label]"),
    previewStyle: root?.querySelector("[data-identity-preview-style]"),
    iconInput: root?.querySelector('input[name="iconName"]'),
    glowInput: root?.querySelector('input[name="visualGlow"]'),
    badgeInput: root?.querySelector('input[name="visualBadge"]'),
    styleInput: root?.querySelector('input[name="visualStyle"]'),
    categoryEditor: root?.querySelector("[data-identity-category]"),
    colorEditor: root?.querySelector("[data-identity-color]"),
    glowEditor: root?.querySelector("[data-identity-glow]"),
    badgeEditor: root?.querySelector("[data-identity-badge]"),
    styleEditor: root?.querySelector("[data-identity-style]"),
  };
}

function syncIdentityEditor(root, updates = {}) {
  const elements = getEditorIdentityElements(root);
  if (!root || !elements.form) return;

  const categoryField = elements.form.querySelector('input[name="categoryName"]');
  const colorField = elements.form.querySelector('input[name="categoryColor"]');
  const iconName = updates.iconName || elements.iconInput?.value || "checkCircle";
  const category = updates.category ?? elements.categoryEditor?.value ?? categoryField?.value ?? "Geral";
  const color = updates.color || elements.colorEditor?.value || colorField?.value || "#2f80ff";
  const glow = updates.glow || elements.glowEditor?.value || elements.glowInput?.value || "soft";
  const badge = updates.badge ?? elements.badgeEditor?.value ?? elements.badgeInput?.value ?? "Geral";
  const style = updates.style ?? elements.styleEditor?.value ?? elements.styleInput?.value ?? "Minimalista";

  root.style.setProperty("--visual-color", color);
  root.dataset.visualGlow = glow;
  elements.preview?.style.setProperty("--visual-color", color);
  elements.mainIcon.innerHTML = uiIcon(iconName);
  elements.previewIcon.innerHTML = uiIcon(iconName);
  elements.label.textContent = category || "Geral";
  elements.caption.textContent = `${badge || "Geral"} • ${style || "Minimalista"}`;
  elements.previewBadge.textContent = badge || "Geral";
  elements.previewLabel.textContent = category || "Geral";
  elements.previewStyle.textContent = style || "Minimalista";

  if (elements.iconInput) elements.iconInput.value = iconName;
  if (elements.glowInput) elements.glowInput.value = glow;
  if (elements.badgeInput) elements.badgeInput.value = badge;
  if (elements.styleInput) elements.styleInput.value = style;
  if (elements.categoryEditor) elements.categoryEditor.value = category;
  if (elements.colorEditor) elements.colorEditor.value = color;
  if (elements.glowEditor) elements.glowEditor.value = glow;
  if (elements.badgeEditor) elements.badgeEditor.value = badge;
  if (elements.styleEditor) elements.styleEditor.value = style;
  if (categoryField) categoryField.value = category;
  if (colorField) colorField.value = color;

  root.querySelectorAll("[data-editor-icon]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.editorIcon === iconName);
  });
}

function applyIdentityPreset(root, presetKey) {
  const preset = categoryVisuals.find((item) => item.key === presetKey);
  if (!preset) return;

  const options = root.querySelector(".editor-icon-options");
  options.innerHTML = (preset.icons || [preset.icon]).map((iconName) => `
    <button class="icon-pick-button ${iconName === preset.icon ? "is-selected" : ""}" type="button" data-editor-icon="${iconName}" aria-label="Alterar símbolo">
      ${uiIcon(iconName)}
    </button>
  `).join("");

  root.querySelectorAll("[data-identity-preset]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.identityPreset === presetKey);
  });

  syncIdentityEditor(root, {
    iconName: preset.icon,
    category: preset.label,
    color: preset.color,
    glow: preset.glow,
    badge: preset.badge,
    style: preset.style,
  });
}

function renderTaskEditorForm(task) {
  const folderId = getTaskFolderId(task.id);
  const holidayText = getHolidayText(task.date);
  const priorityClass = getPriorityBadgeClass(task.priority);
  const statusClass = getStatusBadgeClass(task.status);
  const visual = getTaskVisual(task);

  return `
    <form class="task-editor-form" data-edit-form="${task.id}">
      <section class="editor-section editor-section-wide task-identity-preview" style="--visual-color: ${visual.color}" data-identity-root data-visual-glow="${escapeHtml(visual.glow)}">
        <span class="task-identity-icon" aria-hidden="true">${uiIcon(visual.icon)}</span>
        <div>
          <span>Identidade visual</span>
          <strong data-current-identity-label>${escapeHtml(visual.label)}</strong>
          <small data-current-identity-caption>${escapeHtml(visual.badge)} • ${escapeHtml(visual.style)}</small>
        </div>
        ${renderVisualIconPicker(visual, visual.icon)}
      </section>

      <section class="editor-section editor-section-wide">
        <div class="editor-section-title">
          <span>${uiIcon("tag")} Informações principais</span>
          <small>${escapeHtml(holidayText)}</small>
        </div>
        <label>
          <span>Título</span>
          <input type="text" name="title" value="${escapeHtml(task.title)}" required>
        </label>
        <label>
          <span>Descrição</span>
          <textarea name="description" rows="4">${escapeHtml(task.description)}</textarea>
        </label>
      </section>

      <section class="editor-section">
        <div class="editor-section-title">
          <span>${uiIcon("clock")} Data e horário</span>
        </div>
        <label>
          <span>Data</span>
          <input type="date" name="date" value="${task.date}" required>
        </label>
        <label>
          <span>Horário</span>
          <input type="time" name="time" value="${task.time}" required>
        </label>
      </section>

      <section class="editor-section">
        <div class="editor-section-title">
          <span>${uiIcon("folder")} Organização</span>
        </div>
        <label>
          <span>Categoria</span>
          <input type="text" name="categoryName" value="${escapeHtml(task.categoryName)}">
        </label>
        <label>
          <span>Pasta</span>
          <select name="folderId">${renderFolderOptions(folderId)}</select>
        </label>
        <label>
          <span>Prioridade</span>
          <select name="priority">
            <option value="Baixa" ${task.priority === "Baixa" ? "selected" : ""}>Baixa</option>
            <option value="Média" ${task.priority === "Média" ? "selected" : ""}>Média</option>
            <option value="Alta" ${task.priority === "Alta" ? "selected" : ""}>Alta</option>
          </select>
        </label>
        <label>
          <span>Status</span>
          <select name="status">
            <option value="Pendente" ${task.status === "Pendente" ? "selected" : ""}>Pendente</option>
            <option value="Em andamento" ${task.status === "Em andamento" ? "selected" : ""}>Em andamento</option>
            <option value="Concluída" ${task.status === "Concluída" ? "selected" : ""}>Concluída</option>
          </select>
        </label>
      </section>

      <section class="editor-section">
        <div class="editor-section-title">
          <span>${uiIcon("flag")} Personalização</span>
          <small class="editor-live-badges">
            <span class="task-pill ${priorityClass}">${escapeHtml(task.priority)}</span>
            <span class="task-pill ${statusClass}">${escapeHtml(task.status)}</span>
          </small>
        </div>
        <label>
          <span>Cor</span>
          <input class="color-input" type="color" name="categoryColor" value="${task.categoryColor}">
        </label>
        <label>
          <span>Tempo</span>
          <select name="tempo">
            ${tempoOptions.map((option) => `
              <option value="${escapeHtml(option)}" ${task.tempo === option ? "selected" : ""}>${escapeHtml(option)}</option>
            `).join("")}
          </select>
        </label>
      </section>

      <section class="editor-section editor-section-wide">
        <div class="editor-section-title">
          <span>${uiIcon("checkCircle")} Observações</span>
        </div>
        <label>
          <span>Anotações</span>
          <textarea name="notes" rows="5">${escapeHtml(task.notes)}</textarea>
        </label>
      </section>

      <div class="task-editor-actions">
        <button class="task-delete-button" type="button" data-delete-task="${task.id}">Excluir cartão</button>
        <button class="task-save-button" type="submit">Salvar alterações</button>
      </div>
    </form>
  `;
}

function openTaskEditor(taskId) {
  const task = getCurrentUser()?.tasks.find((item) => item.id === taskId);
  if (!task) return;

  expandedTaskId = taskId;
  taskEditorTitle.textContent = task.title;
  taskEditorMeta.innerHTML = `
    <span class="editor-meta-chip">${uiIcon("calendar")} ${formatDate(task.date)}</span>
    <span class="editor-meta-chip">${uiIcon("clock")} ${escapeHtml(task.time)}</span>
    <span class="task-pill ${getPriorityBadgeClass(task.priority)}">${escapeHtml(task.priority)}</span>
    <span class="task-pill ${getStatusBadgeClass(task.status)}">${escapeHtml(task.status)}</span>
  `;
  taskEditorContent.innerHTML = renderTaskEditorForm(task);
  taskEditorModal.hidden = false;
  enhanceFilterSelects(taskEditorContent);
  devilReact(["CARD ABERTO. VAMOS VER ESSE CAOS.", "EDITANDO? CAPRICHA.", "OLHA O CARD AÍ. SEM MEDO."], "idle", 2400);
}

function closeTaskEditor() {
  taskEditorModal.hidden = true;
  taskEditorContent.innerHTML = "";
}

function renderTimeline() {
  const looseTasks = getUnfolderedTasks();
  const visibleFolders = getVisibleFolders();
  filterLabel.textContent = activeCategory === "all" ? "Todas as categorias" : activeCategory;

  const createCard = `
    <button class="create-ghost-card" type="button" data-open-create-choice>
      <span aria-hidden="true">${uiIcon("plus")}</span>
      <strong>Criar novo</strong>
      <small>Cartão ou pasta</small>
    </button>
  `;
  const looseColumn = looseTasks.length
    ? renderBoardColumn({
      id: "unfiled",
      title: "Cartões",
      color: "#8b8fa3",
      tasks: looseTasks,
    })
    : "";
  const folderColumns = visibleFolders.map((folder) => renderFolderColumn(folder)).join("");

  timelineList.innerHTML = `
    <div class="workspace-board">
      ${looseColumn}
      ${folderColumns}
      <section class="board-column board-create-column">
        ${createCard}
      </section>
    </div>
  `;

  updateProgress();
}

function getPriorityBadgeClass(priority) {
  const priorityKey = normalizeLabelText(priority);

  if (priorityKey === "alta") return "is-high";
  if (priorityKey === "media") return "is-medium";
  if (priorityKey === "baixa") return "is-low";

  return "is-default";
}

function getStatusBadgeClass(status) {
  const statusKey = normalizeLabelText(status);

  if (statusKey === "concluida") return "is-done";
  if (statusKey === "em andamento") return "is-progress";

  return "is-pending";
}

function renderTaskCard(task) {
  const completedClass = task.isCompleted ? " is-completed" : "";
  const expandedClass = expandedTaskId === task.id ? " is-expanded" : "";
  const checkedMark = task.isCompleted ? uiIcon("checkCircle") : "";
  const holidayText = getHolidayText(task.date);
  const priorityClass = getPriorityBadgeClass(task.priority);
  const statusClass = getStatusBadgeClass(task.status);
  const visual = getTaskVisual(task);

  return `
    <article class="task-card board-task-card${completedClass}${expandedClass}" style="--category-color: ${visual.color}; --visual-color: ${visual.color}" data-visual-glow="${escapeHtml(visual.glow)}" data-card-id="${task.id}" data-task-drag-id="${task.id}" draggable="true">
      <div class="task-card-summary">
        <div class="task-body">
          <div class="task-card-topline">
            <span class="task-category-icon" aria-hidden="true">${uiIcon(visual.icon)}</span>
            <span class="task-context-label">${escapeHtml(visual.label)}</span>
            <span class="task-time">${uiIcon("clock")} ${task.time}</span>
          </div>
          <h3 class="task-title">${escapeHtml(task.title)}</h3>
          <p class="task-date">${uiIcon("calendar")} ${formatDate(task.date)}</p>
          <p class="task-description">${escapeHtml(task.description)}</p>
          <div class="task-badge-row" aria-label="Etiquetas do cartão">
            <span class="task-pill ${priorityClass}">${escapeHtml(task.priority)}</span>
            <span class="task-pill ${statusClass}">${escapeHtml(task.status)}</span>
          </div>
          <p class="task-holiday">${escapeHtml(holidayText)}</p>
          ${task.notes ? `<p class="task-description">${escapeHtml(task.notes)}</p>` : ""}
        </div>
        <div class="task-meta">
          <button class="task-check-button" type="button" data-task-id="${task.id}" aria-label="Alternar conclusão">
            ${checkedMark}
          </button>
        </div>
      </div>
    </article>
  `;
  enhanceFilterSelects(routineDetailContent);
}

function renderBoardColumn({ id, title, color, tasks, actions = "" }) {
  return `
    <section class="board-column" id="board-column-${id}" style="--folder-color: ${color}" data-folder-drop-id="${id}">
      <header class="board-column-header">
        <div>
          <span class="folder-icon" aria-hidden="true">${uiIcon("folder")}</span>
          <strong>${escapeHtml(title)}</strong>
          <small>${tasks.length}</small>
        </div>
      </header>
      <div class="board-card-stack">
        ${
          tasks.length
            ? tasks.map(renderTaskCard).join("")
            : `<div class="board-empty-drop">Arraste cartões para cá</div>`
        }
      </div>
      ${actions ? `<div class="board-column-actions">${actions}</div>` : ""}
    </section>
  `;
}

function renderFolderColumn(folder) {
  const tasks = getFolderTasks(folder, { applyFilters: true });
  const isCollapsed = collapsedFolderIds.has(folder.id);
  return `
    <section class="board-column${isCollapsed ? " is-collapsed" : ""}" id="board-column-${folder.id}" style="--folder-color: ${folder.color}" data-folder-drop-id="${folder.id}">
      <header class="board-column-header">
        <button class="board-column-title" type="button" data-toggle-folder="${folder.id}" aria-expanded="${String(!isCollapsed)}">
          <span class="folder-toggle-icon" aria-hidden="true">${isCollapsed ? "▸" : "▾"}</span>
          <span class="folder-icon" aria-hidden="true">${uiIcon("folder")}</span>
          <strong>${escapeHtml(folder.name)}</strong>
          <small>${tasks.length}</small>
        </button>
        <div class="folder-actions" aria-label="Ações da pasta">
          <button type="button" data-rename-folder="${folder.id}" aria-label="Renomear pasta" data-action-label="Renomear">${uiIcon("edit")}</button>
          <button type="button" data-delete-folder="${folder.id}" aria-label="Excluir pasta" data-action-label="Excluir">${uiIcon("trash")}</button>
        </div>
      </header>
      <div class="board-card-stack">
        ${
          tasks.length
            ? tasks.map(renderTaskCard).join("")
            : `<div class="board-empty-drop">Solte cartões nesta pasta</div>`
        }
      </div>
      <button class="board-add-card" type="button" data-add-card-folder="${folder.id}">+ Adicionar cartão</button>
    </section>
  `;
}

function renderDashboard() {
  const scrollState = captureBoardScrollState();
  renderCategoryFilters();
  renderTimeline();
  restoreBoardScrollState(scrollState);
}

function setActiveSidebarView(view) {
  activeView = view;
  workspaceMenu.classList.toggle("is-active", view === "workspace");
  routinesMenu.classList.toggle("is-active", view === "routines");
  dailyHeader.hidden = view !== "workspace";
  dailyTimeline.hidden = view !== "workspace";
  routinesView.hidden = view !== "routines";
  openTaskModal.hidden = true;
}

function showWorkspaceView() {
  setActiveSidebarView("workspace");
  closeRoutineDetail();
  routineCalendarPanel.hidden = true;
  renderDashboard();
  devilReact(["KANBAN ABERTO. SEM DESCULPA.", "QUADRO NA TELA. TASK NA MÃO.", "VOLTOU PRO CAMPO DE BATALHA."], "angry", 2400);
}

function showRoutinesView() {
  setActiveSidebarView("routines");
  renderRoutineWeek();
  renderRoutineCalendar();
  devilReact(["OLHANDO ROTINA? AGORA CUMPRE.", "DATAS NA MESA. SEM FUGIR.", "CALENDÁRIO NÃO MENTE."], "idle", 2400);
}

function getRoutinesByDate(dateValue) {
  return getUserRoutineItems().filter((routine) => routine.date === dateValue);
}

function getRoutineColor(routine) {
  return routine.categoryColor || "#14b8a6";
}

function getUserRoutineItems() {
  const user = getCurrentUser();
  return (user?.tasks || []).map((task) => {
    const visual = getTaskVisual(task);

    return {
      id: task.id,
      date: task.date,
      type: task.status || "Pendente",
      time: task.time || "09:00",
      title: task.title,
      category: task.categoryName || visual.label,
      categoryColor: task.categoryColor || visual.color,
      location: task.description || "Sem descrição",
      responsible: task.notes || task.priority || "Sem observação",
      priority: task.priority || "Média",
      status: task.status || "Pendente",
      description: task.description || "",
      notes: task.notes || "",
      checklist: task.routineChecklist.length ? task.routineChecklist : [
        `Prioridade: ${task.priority || "Média"}`,
        `Status: ${task.status || "Pendente"}`,
        `Tempo: ${task.tempo || "Deixar marcado"}`,
      ],
      tempo: task.tempo || "Deixar marcado",
      icon: task.isCompleted ? "checkCircle" : visual.icon,
    };
  });
}

function renderRoutineWeek() {
  const weekDates = getRoutineWeekDates();
  routineMonthLabel.textContent = getRoutineMonthLabel(routineWeekStart);

  routineDayTabs.innerHTML = weekDates
    .map((date) => {
      const dateValue = formatIsoDate(date);
      const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(date).slice(0, 1).toUpperCase();
      const selectedClass = selectedRoutineDate === dateValue ? " is-selected" : "";
      return `
        <button class="routine-day-tab${selectedClass}" type="button" data-routine-date="${dateValue}">
          ${weekday} ${date.getDate()}
        </button>
      `;
    })
    .join("");

  routineWeekGrid.innerHTML = weekDates
    .map((date) => {
      const dateValue = formatIsoDate(date);
      const routines = getRoutinesByDate(dateValue);
      const firstRoutine = routines[0];
      const color = firstRoutine ? getRoutineColor(firstRoutine) : "#cbd5e1";
      const hasRoutineClass = routines.length ? " has-routine" : "";
      const highlightClass = highlightedRoutineDate === dateValue ? " is-highlighted" : "";
      const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date);

      return `
        <article class="routine-day-card${hasRoutineClass}${highlightClass}" id="routine-day-${dateValue}" style="--routine-color: ${color}">
          <div class="routine-day-heading">
            <span>${weekday}</span>
            <strong>${formatDate(dateValue)}</strong>
          </div>
          ${
            routines.length
              ? routines.map(renderRoutineCard).join("")
              : `<div class="routine-empty">Nenhuma rotina marcada para este dia.</div>`
          }
        </article>
      `;
    })
    .join("");
}

function renderRoutineCard(routine) {
  const priorityClass = getPriorityBadgeClass(routine.priority);
  const statusClass = getStatusBadgeClass(routine.status);
  const visual = getRoutineVisual(routine);

  return `
    <button class="routine-item-card" type="button" data-routine-id="${routine.id}" style="--routine-color: ${visual.color}; --visual-color: ${visual.color}">
      <div class="routine-item-top">
        <span class="routine-status-chip ${statusClass}">${escapeHtml(routine.type)}</span>
        <span class="routine-item-icon" aria-hidden="true">${uiIcon(routine.icon || visual.icon)}</span>
      </div>
      <span class="routine-category-chip">${uiIcon(visual.icon)} ${escapeHtml(visual.label)}</span>
      <span class="routine-item-time">${uiIcon("clock")} ${escapeHtml(routine.time)}</span>
      <h3 class="routine-item-title">${escapeHtml(routine.title)}</h3>
      <p>${escapeHtml(routine.location)}</p>
      <div class="routine-card-meta">
        <span class="task-pill ${priorityClass}">${escapeHtml(routine.priority)}</span>
        <span>${escapeHtml(routine.tempo)}</span>
      </div>
    </button>
  `;
}

function renderRoutineCalendar() {
  const year = routineWeekStart.getFullYear();
  const monthNames = Array.from({ length: 12 }, (_, index) => (
    new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(new Date(year, index, 1)).replace(".", "")
  ));

  routineMonthGrid.innerHTML = monthNames
    .map((monthName, monthIndex) => {
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      const firstDay = new Date(year, monthIndex, 1).getDay();
      const blanks = Array.from({ length: firstDay }, () => `<span class="routine-mini-day" aria-hidden="true"></span>`).join("");
      const days = Array.from({ length: daysInMonth }, (_, dayIndex) => {
        const dateValue = formatIsoDate(new Date(year, monthIndex, dayIndex + 1, 12));
        const routines = getRoutinesByDate(dateValue);
        const holidayName = getHolidayName(dateValue);
        const routine = routines[0];
        const hasRoutineClass = routines.length ? " has-routine" : "";
        const holidayClass = holidayName ? " has-holiday" : "";
        const multipleClass = routines.length > 1 || (routines.length && holidayName) ? " has-multiple" : "";
        const color = routine ? getRoutineColor(routine) : "#f59e0b";
        const isMarked = routines.length || holidayName;
        const disabled = isMarked ? "" : "disabled";
        const labelParts = [
          formatDate(dateValue),
          routines.length ? `${routines.length} evento${routines.length > 1 ? "s" : ""}` : "",
          holidayName ? `Feriado: ${holidayName}` : "",
        ].filter(Boolean);

        return `
          <button class="routine-mini-day${hasRoutineClass}${holidayClass}${multipleClass}" type="button" data-calendar-date="${dateValue}" data-calendar-marked="${isMarked ? "true" : "false"}" aria-describedby="${isMarked ? "routine-calendar-tooltip" : ""}" aria-label="${escapeHtml(labelParts.join(". "))}" style="--routine-color: ${color}" ${disabled}>
            ${dayIndex + 1}
          </button>
        `;
      }).join("");

      return `
        <section class="routine-month-card">
          <h3>${monthName}</h3>
          <div class="routine-mini-days">${blanks}${days}</div>
        </section>
      `;
    })
    .join("");
}

function renderCalendarTooltipContent(dateValue) {
  const routines = getRoutinesByDate(dateValue);
  const holidayName = getHolidayName(dateValue);
  const visibleRoutines = routines.slice(0, 3);
  const extraCount = Math.max(routines.length - visibleRoutines.length, 0);

  return `
    <div class="calendar-tooltip-heading">
      <span>${formatDate(dateValue)}</span>
      ${holidayName ? `<strong>Feriado: ${escapeHtml(holidayName)}</strong>` : ""}
    </div>
    <div class="calendar-tooltip-list">
      ${
        visibleRoutines.length
          ? visibleRoutines.map((routine) => `
            <div class="calendar-tooltip-item" style="--routine-color: ${getRoutineColor(routine)}">
              <span class="calendar-tooltip-color" aria-hidden="true"></span>
              <div>
                <time>${escapeHtml(routine.time)}</time>
                <strong>${escapeHtml(routine.title)}</strong>
                <small>${escapeHtml(routine.priority || "Média")} prioridade • ${escapeHtml(routine.status || "Pendente")}</small>
              </div>
            </div>
          `).join("")
          : `<div class="calendar-tooltip-empty">Nenhum evento cadastrado.</div>`
      }
      ${extraCount ? `<div class="calendar-tooltip-more">+${extraCount} eventos</div>` : ""}
    </div>
  `;
}

function positionCalendarTooltip(target) {
  const targetRect = target.getBoundingClientRect();
  const tooltipRect = routineCalendarTooltip.getBoundingClientRect();
  const gap = 12;
  const viewportPadding = 12;
  let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
  let top = targetRect.top - tooltipRect.height - gap;

  if (left < viewportPadding) left = viewportPadding;
  if (left + tooltipRect.width > window.innerWidth - viewportPadding) {
    left = window.innerWidth - tooltipRect.width - viewportPadding;
  }

  if (top < viewportPadding) {
    top = targetRect.bottom + gap;
  }

  routineCalendarTooltip.style.left = `${left}px`;
  routineCalendarTooltip.style.top = `${top}px`;
}

function showCalendarTooltip(target) {
  const dateValue = target?.dataset.calendarDate;
  if (!dateValue || target.dataset.calendarMarked !== "true") return;

  routineCalendarTooltip.innerHTML = renderCalendarTooltipContent(dateValue);
  routineCalendarTooltip.hidden = false;
  routineCalendarTooltip.classList.remove("is-visible");
  positionCalendarTooltip(target);

  window.requestAnimationFrame(() => {
    routineCalendarTooltip.classList.add("is-visible");
  });
}

function hideCalendarTooltip() {
  routineCalendarTooltip.classList.remove("is-visible");
  window.setTimeout(() => {
    if (!routineCalendarTooltip.classList.contains("is-visible")) {
      routineCalendarTooltip.hidden = true;
      routineCalendarTooltip.innerHTML = "";
    }
  }, 180);
}

function goToRoutineDate(dateValue) {
  selectedRoutineDate = dateValue;
  highlightedRoutineDate = dateValue;
  routineWeekStart = getStartOfWeek(new Date(`${dateValue}T12:00:00`));
  routineCalendarPanel.hidden = true;
  renderRoutineWeek();

  document.getElementById(`routine-day-${dateValue}`)?.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });

  window.setTimeout(() => {
    highlightedRoutineDate = "";
    renderRoutineWeek();
  }, 1400);
}

function openRoutineDetail(routineId) {
  const routine = getUserRoutineItems().find((item) => item.id === routineId);
  if (!routine) return;

  activeRoutineId = routineId;
  routineDetailType.textContent = routine.type;
  routineDetailTitle.textContent = routine.title;
  routineDetailContent.innerHTML = `
    <div class="routine-detail-list">
      ${renderRoutineDetailRow("Data", formatDate(routine.date))}
      ${renderRoutineDetailRow("Horário", routine.time)}
      ${renderRoutineDetailRow("Categoria", routine.category)}
      ${renderRoutineDetailRow("Tipo", routine.type)}
      ${renderRoutineDetailRow("Tempo", routine.tempo)}
      ${renderRoutineDetailRow("Descrição", routine.description)}
      ${renderRoutineDetailRow("Local", routine.location)}
      ${renderRoutineDetailRow("Observações", routine.notes)}
      <div class="routine-detail-row">
        <span>Checklist</span>
        <ul class="routine-checklist">
          ${routine.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
    </div>
    <div class="routine-detail-actions">
      <button class="routine-edit-button" type="button" data-routine-edit="${routine.id}">Editar</button>
      <button class="routine-delete-button" type="button" data-routine-delete="${routine.id}">Excluir</button>
    </div>
  `;
  routineDetailPanel.hidden = false;
}

function renderRoutineDetailRow(label, value) {
  return `
    <div class="routine-detail-row">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function closeRoutineDetail() {
  routineDetailPanel.hidden = true;
  activeRoutineId = "";
}

function aplicarPerfilRemoto(usuario, perfil) {
  isApplyingRemoteData = true;

  const currentUser = getCurrentUser();
  const configuracoes = perfil?.configuracoes || {};

  appState.users = [
    normalizeUser({
      ...(currentUser || {}),
      id: usuario.uid,
      name: perfil?.nome || currentUser?.name || usuario.email.split("@")[0],
      email: perfil?.email || usuario.email,
      avatarImage: perfil?.avatarImage || currentUser?.avatarImage || "",
      settings: {
        ...(currentUser?.settings || {}),
        theme: pendingThemeOverride || configuracoes.tema || currentUser?.settings.theme || "dark",
        notificationsEnabled: configuracoes.notificacoesAtivadas ?? currentUser?.settings.notificationsEnabled ?? true,
        sidebarCollapsed: pendingSidebarOverride ?? configuracoes.sidebarCollapsed ?? currentUser?.settings.sidebarCollapsed ?? false,
        collapsedFolders: pendingCollapsedFoldersOverride || configuracoes.collapsedFolders || currentUser?.settings.collapsedFolders || {},
      },
      tasks: currentUser?.tasks || [],
      folders: pendingFoldersOverride || perfil?.folders || currentUser?.folders || [],
      notifications: perfil?.notifications || currentUser?.notifications || [],
    }),
  ];
  appState.currentUserId = usuario.uid;
  saveAppState();
  isApplyingRemoteData = false;

  showDashboard();
}

function aplicarTarefasRemotas(tarefas) {
  isApplyingRemoteData = true;
  const normalizedTasks = tarefas.map(normalizeTask);

  updateCurrentUser((user) => ({
    ...user,
    tasks: normalizedTasks,
    folders: pendingFoldersOverride || normalizeFolderList(user.folders, normalizedTasks),
  }));

  isApplyingRemoteData = false;
  salvarEstatisticasUsuario();
  renderDashboard();
  renderRoutineWeek();
  renderRoutineCalendar();
  syncSmartNotifications();
}

function iniciarEscutasFirebase(usuario) {
  if (!usuario) return;

  if (pararDeObservarPerfil) pararDeObservarPerfil();
  if (pararDeObservarTarefas) pararDeObservarTarefas();

  pararDeObservarPerfil = observarPerfilUsuario(usuario.uid, (perfil) => {
    aplicarPerfilRemoto(usuario, perfil);
  });

  pararDeObservarTarefas = observarTarefas(usuario.uid, aplicarTarefasRemotas);
}

function openRoutineEdit(routineId) {
  const routine = getUserRoutineItems().find((item) => item.id === routineId);
  if (!routine) return;

  routineDetailType.textContent = "Editar";
  routineDetailTitle.textContent = "Editar rotina";
  routineDetailContent.innerHTML = `
    <form class="routine-edit-form" data-routine-edit-form="${routine.id}">
      <label>
        <span>Título</span>
        <input name="title" type="text" value="${escapeHtml(routine.title)}" required>
      </label>
      <label>
        <span>Data</span>
        <input name="date" type="date" value="${escapeHtml(routine.date)}" required>
      </label>
      <label>
        <span>Horário</span>
        <input name="time" type="text" value="${escapeHtml(routine.time)}" required>
      </label>
      <label>
        <span>Categoria</span>
        <input name="category" type="text" value="${escapeHtml(routine.category)}">
      </label>
      <label>
        <span>Tipo</span>
        <select name="status">
          ${["Pendente", "Em andamento", "Concluída"].map((status) => `
            <option value="${escapeHtml(status)}" ${routine.type === status ? "selected" : ""}>${escapeHtml(status)}</option>
          `).join("")}
        </select>
      </label>
      <label>
        <span>Tempo</span>
        <select name="tempo">
          ${tempoOptions.map((option) => `
            <option value="${escapeHtml(option)}" ${routine.tempo === option ? "selected" : ""}>${escapeHtml(option)}</option>
          `).join("")}
        </select>
      </label>
      <label>
        <span>Descrição</span>
        <textarea name="description">${escapeHtml(routine.description)}</textarea>
      </label>
      <label>
        <span>Local</span>
        <input name="location" type="text" value="${escapeHtml(routine.location)}">
      </label>
      <label>
        <span>Observações</span>
        <textarea name="notes">${escapeHtml(routine.notes)}</textarea>
      </label>
      <label>
        <span>Checklist</span>
        <textarea name="checklist">${escapeHtml(routine.checklist.join("\n"))}</textarea>
      </label>
      <div class="routine-edit-actions">
        <button class="task-save-button" type="submit">Salvar alterações</button>
        <button class="routine-cancel-button" type="button" data-routine-cancel-edit="${routine.id}">Cancelar</button>
      </div>
    </form>
  `;
}

async function saveRoutineEdit(form) {
  const formData = new FormData(form);
  const routineId = form.dataset.routineEditForm;

  if (!await confirmAction("Salvar as alterações desta rotina?", { title: "Salvar rotina", confirmLabel: "Salvar" })) return;

  if (!usuarioLogado) return;

  const tempo = formData.get("tempo");

  try {
    await atualizarTarefa(usuarioLogado.uid, routineId, {
      title: formData.get("title").trim(),
      date: formData.get("date"),
      time: formData.get("time").trim(),
      categoryName: formData.get("category").trim(),
      status: formData.get("status"),
      tempo,
      etiqueta: tempo,
      description: formData.get("description").trim(),
      notes: formData.get("notes").trim(),
      routineChecklist: formData.get("checklist")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      isCompleted: formData.get("status") === "Concluída",
    });
  } catch (error) {
    console.error(error);
    alert("Erro ao editar rotina.");
    return;
  }

  selectedRoutineDate = formData.get("date");
  routineWeekStart = getStartOfWeek(new Date(`${selectedRoutineDate}T12:00:00`));

  renderRoutineWeek();
  renderRoutineCalendar();
  renderDashboard();
  openRoutineDetail(routineId);

  return;

  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.map((task) => {
      if (task.id !== routineId) return task;
      const tempo = formData.get("tempo");

      return normalizeTask({
        ...task,
        title: formData.get("title").trim(),
        date: formData.get("date"),
        time: formData.get("time").trim(),
        categoryName: formData.get("category").trim(),
        status: formData.get("status"),
        tempo,
        etiqueta: tempo,
        description: formData.get("description").trim(),
        notes: formData.get("notes").trim(),
        routineChecklist: formData.get("checklist")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      });
    }),
  }));

  selectedRoutineDate = formData.get("date");
  routineWeekStart = getStartOfWeek(new Date(`${selectedRoutineDate}T12:00:00`));

  renderRoutineWeek();
  renderRoutineCalendar();
  renderDashboard();
  openRoutineDetail(routineId);
}

function showDashboard() {
  const user = getCurrentUser();
  authScreen.hidden = true;
  dashboardScreen.hidden = false;
  dashboardUserName.textContent = user?.name || "Usuário";
  dailyTitle.textContent = `Olá, ${user?.name || "Usuário"}!`;
  renderUserAvatar(user);
  setCurrentDate();
  applyTheme();
  applySidebarState();
  syncCollapsedFoldersFromUser();
  setActiveSidebarView(activeView);
  if (activeView === "routines") {
    renderRoutineWeek();
    renderRoutineCalendar();
  } else {
    renderDashboard();
  }
  syncSmartNotifications();
  setFeedback();
  devilReact(["OLHA ELE VOLTANDO.", "LOGIN FEITO. AGORA PRODUZ.", "BEM-VINDO AO CAOS ORGANIZADO."], "idle", 2200, 6000);
}

function showLogin() {
  appState.currentUserId = null;
  saveAppState();
  dashboardScreen.hidden = true;
  authScreen.hidden = false;
  loginForm.reset();
  showAuthMode("login");
}

function openCreateChoice() {
  createChoiceModal.hidden = false;
}

function closeCreateChoice() {
  createChoiceModal.hidden = true;
}

function openModal(targetFolderId = "") {
  pendingTargetFolderId = targetFolderId;
  taskForm.reset();
  taskCategoryColor.value = DEFAULT_TASK_COLOR;
  taskTempo.value = "Deixar marcado";
  taskPriority.value = "Média";
  taskStatus.value = "Pendente";
  if (taskIconChoice) taskIconChoice.value = "";
  taskModal.hidden = false;
  taskDate.value = getTodayDate();
  renderIconSuggestions();
  updateTaskVisualPreview();
  enhanceFilterSelects(taskModal);
  syncCustomSelects();
  taskTitle.focus();
}

function closeModal() {
  taskModal.hidden = true;
  pendingTargetFolderId = "";
  taskForm.reset();
  taskCategoryColor.value = DEFAULT_TASK_COLOR;
  taskTempo.value = "Deixar marcado";
  taskPriority.value = "Média";
  taskStatus.value = "Pendente";
  if (taskIconChoice) taskIconChoice.value = "";
  updateTaskVisualPreview();
}

function updateFolderPreview() {
  const previewColor = folderColor.value || "#00b4d8";
  const previewName = folderName.value.trim() || "Nova pasta";

  if (folderPreviewName) folderPreviewName.textContent = previewName;
  if (folderCreatePreview) folderCreatePreview.style.setProperty("--folder-preview-color", previewColor);
}

function openFolderModal() {
  folderForm.reset();
  folderColor.value = "#00b4d8";
  updateFolderPreview();
  folderModal.hidden = false;
  folderName.focus();
}

function closeFolderDialog() {
  folderModal.hidden = true;
  folderForm.reset();
  folderColor.value = "#00b4d8";
}

function closeFolderView({ immediate = false } = {}) {
  clearTimeout(folderViewAnimationTimer);

  if (immediate || folderViewModal.hidden) {
    folderViewModal.hidden = true;
    folderViewModal.classList.remove("is-open", "is-opening", "is-closing");
    activeFolderId = "";
    return;
  }

  folderViewModal.classList.remove("is-opening");
  folderViewModal.classList.add("is-closing");
  activeFolderId = "";

  folderViewAnimationTimer = window.setTimeout(() => {
    folderViewModal.hidden = true;
    folderViewModal.classList.remove("is-open", "is-closing");
  }, 280);
}

async function createFolder() {
  if (!usuarioLogado) {
    alert("Voce precisa entrar na conta antes de criar pastas.");
    return;
  }

  if (!await confirmAction("Criar esta pasta no seu quadro?", { title: "Criar pasta", confirmLabel: "Criar", tone: "default", icon: "folder" })) return;

  const folder = normalizeFolder({
    id: createId(),
    name: folderName.value.trim(),
    color: folderColor.value,
    createdAt: new Date().toISOString(),
    taskIds: [],
  });

  updateCurrentUser((user) => ({
    ...user,
    folders: [...user.folders, folder],
  }));

  addNotification({
    key: `folder:${folder.id}`,
    type: "folder",
    folderId: folder.id,
    title: "Pasta criada",
    description: `${folder.name} foi adicionada ao seu board.`,
    priority: "Baixa",
    createdAt: new Date().toISOString(),
  });
  showToast("Pasta criada com sucesso.");
  closeFolderDialog();
  renderDashboard();
  devilReact(["PASTA CRIADA. AGORA NÃO VIRA DEPÓSITO.", "ORGANIZAÇÃO NASCEU.", "UMA PASTA NOVA PRA GUARDAR SEUS PROBLEMAS."], "idle", 2400);
}

async function createTask() {
  if (isCreatingTask) return;

  isCreatingTask = true;

  try {
    if (!usuarioLogado) {
      alert("Voce precisa entrar na conta antes de salvar tarefas.");
      return;
    }

    if (!await confirmAction("Criar esta tarefa com os dados preenchidos?", { title: "Criar tarefa", confirmLabel: "Criar", tone: "default", icon: "checkCircle" })) return;

    const visual = getCategoryVisual(
      taskCategoryName.value,
      taskTitle.value,
      taskDescription.value,
      taskNotes.value,
    );
    const categoryColor = taskCategoryColor.value === DEFAULT_TASK_COLOR ? visual.color : taskCategoryColor.value;
    const targetFolderId = pendingTargetFolderId;

    const newTask = normalizeTask({
      createdAt: new Date().toISOString(),
      title: taskTitle.value.trim(),
      description: taskDescription.value.trim(),
      date: taskDate.value,
      time: taskTime.value,
      categoryName: taskCategoryName.value.trim() || visual.label,
      categoryColor,
      iconName: isVisualIconName(taskIconChoice?.value) ? taskIconChoice.value : visual.icon,
      visualGlow: visual.glow,
      visualBadge: visual.badge,
      visualStyle: visual.style,
      tempo: taskTempo.value,
      etiqueta: taskTempo.value,
      priority: taskPriority.value,
      status: taskStatus.value,
      notes: taskNotes.value.trim(),
      folderId: targetFolderId || "",
      folderBindingKnown: true,
      isCompleted: taskStatus.value === "Concluída",
    });

    const firebaseTaskId = await criarTarefaFirebase(usuarioLogado.uid, newTask);

    updateCurrentUser((user) => ({
      ...user,
      tasks: [...user.tasks, { ...newTask, id: firebaseTaskId }],
      folders: targetFolderId
        ? user.folders.map((folder) => (
          folder.id === targetFolderId
            ? { ...folder, taskIds: [...folder.taskIds.filter((id) => id !== firebaseTaskId), firebaseTaskId] }
            : folder
        ))
        : user.folders,
    }));
    holdFolderStateForRemoteSync();

    activeCategory = "all";
    activePriority = "all";
    activeSearch = "";
    priorityFilter.value = "all";
    taskSearch.value = "";
    syncPriorityFilterColor();
    pendingTargetFolderId = "";
    closeModal();
    renderDashboard();
    renderRoutineWeek();
    renderRoutineCalendar();
    syncSmartNotifications();
    showToast("Tarefa criada com sucesso.");
    devilReact(["CARD CRIADO. MILAGRE.", "UMA TASK NASCEU. CUIDA DELA.", "AGORA NÃO ABANDONA ESSE CARD."], "angry", 2600);
  } finally {
    pendingTargetFolderId = "";
    isCreatingTask = false;
  }
}

async function toggleTask(taskId) {
  if (!usuarioLogado) return;

  const currentUser = getCurrentUser();
  const currentTask = currentUser?.tasks.find((task) => task.id === taskId);
  if (!currentTask) return;

  const nextCompleted = !currentTask.isCompleted;

  try {
    await atualizarTarefa(usuarioLogado.uid, taskId, {
      isCompleted: nextCompleted,
      status: nextCompleted ? "Concluída" : "Pendente",
    });
    if (nextCompleted) {
      addNotification({
        key: `completed:${taskId}:${Date.now()}`,
        type: "completed",
        taskId,
        title: "Tarefa concluída",
        description: `${currentTask.title} foi marcada como concluída.`,
        priority: currentTask.priority,
        createdAt: new Date().toISOString(),
      });
      showToast("Tarefa concluída.");
      devilReact(["OK, PONTO PRA VOCÊ.", "CONCLUIU? PRINTA ESSE MOMENTO.", "FINALMENTE UMA TASK CAIU."], "idle", 2400);
    } else {
      devilReact(["DESMARCOU? SUSPEITO.", "VOLTOU PRA PENDENTE? EU VI.", "ESSA TASK RESSUSCITOU."], "angry", 2400);
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao atualizar tarefa.");
    return;
  }

  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.map((task) => {
      if (task.id !== taskId) return task;
      const nextCompleted = !task.isCompleted;
      return {
        ...task,
        isCompleted: nextCompleted,
        status: nextCompleted ? "Concluída" : "Pendente",
      };
    }),
  }));

  renderDashboard();
  renderRoutineWeek();
  renderRoutineCalendar();
}

async function updateTask(form) {
  if (!usuarioLogado) return;

  const formData = new FormData(form);
  const taskId = form.dataset.editForm;
  let updatedTask = null;

  if (!await confirmAction("Salvar as alterações desta tarefa?", { title: "Salvar tarefa", confirmLabel: "Salvar" })) return;

  const status = formData.get("status");
  const folderId = formData.get("folderId");

  try {
    await atualizarTarefa(usuarioLogado.uid, taskId, {
      title: formData.get("title").trim(),
      description: formData.get("description").trim(),
      date: formData.get("date"),
      time: formData.get("time"),
      categoryName: formData.get("categoryName").trim(),
      categoryColor: formData.get("categoryColor"),
      iconName: formData.get("iconName"),
      visualGlow: formData.get("visualGlow"),
      visualBadge: formData.get("visualBadge"),
      visualStyle: formData.get("visualStyle"),
      folderId,
      folderBindingKnown: true,
      tempo: formData.get("tempo"),
      etiqueta: formData.get("tempo"),
      priority: formData.get("priority"),
      status,
      notes: formData.get("notes").trim(),
      isCompleted: status === "Concluída",
    });

    updateCurrentUser((user) => ({
      ...user,
      tasks: user.tasks.map((task) => {
        if (task.id !== taskId) return task;

        return normalizeTask({
          ...task,
          title: formData.get("title").trim(),
          description: formData.get("description").trim(),
          date: formData.get("date"),
          time: formData.get("time"),
          categoryName: formData.get("categoryName").trim(),
          categoryColor: formData.get("categoryColor"),
          iconName: formData.get("iconName"),
          visualGlow: formData.get("visualGlow"),
          visualBadge: formData.get("visualBadge"),
          visualStyle: formData.get("visualStyle"),
          folderId,
          folderBindingKnown: true,
          tempo: formData.get("tempo"),
          etiqueta: formData.get("tempo"),
          priority: formData.get("priority"),
          status,
          notes: formData.get("notes").trim(),
          isCompleted: status === "Concluída",
        });
      }),
    }));

    if (formData.has("folderId")) {
      updateCurrentUser((user) => ({
        ...user,
        folders: user.folders.map((folder) => {
          const nextTaskIds = folder.taskIds.filter((id) => id !== taskId);

          if (folder.id !== folderId) {
            return {
              ...folder,
              taskIds: nextTaskIds,
            };
          }

          return {
            ...folder,
            taskIds: [...nextTaskIds, taskId],
          };
        }),
      }));
      holdFolderStateForRemoteSync();
    }

    activeCategory = "all";
    activePriority = "all";
    activeSearch = "";
    priorityFilter.value = "all";
    taskSearch.value = "";
    syncPriorityFilterColor();
    renderDashboard();
    renderRoutineWeek();
    renderRoutineCalendar();
    syncSmartNotifications();
    addNotification({
      key: `edited:${taskId}:${Date.now()}`,
      type: status === "Concluída" ? "completed" : "edited",
      taskId,
      title: status === "Concluída" ? "Tarefa concluída" : "Cartão atualizado",
      description: `${formData.get("title").trim()} foi salvo com sucesso.`,
      priority: formData.get("priority"),
      createdAt: new Date().toISOString(),
    });
    closeTaskEditor();
    showToast("Cartão salvo com sucesso.");
    devilReact(["CARD EDITADO. MENOS BAGUNÇA.", "AJUSTOU O CARD. CIVILIZADO.", "OLHA SÓ, ORGANIZAÇÃO."], "idle", 2400);
  } catch (error) {
    console.error(error);
    alert("Erro ao editar tarefa.");
  }

  return;

  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.map((task) => {
      if (task.id !== taskId) return task;
      const status = formData.get("status");
      updatedTask = normalizeTask({
        ...task,
        title: formData.get("title").trim(),
        description: formData.get("description").trim(),
        date: formData.get("date"),
        time: formData.get("time"),
        categoryName: formData.get("categoryName").trim(),
        categoryColor: formData.get("categoryColor"),
        tempo: formData.get("tempo"),
        etiqueta: formData.get("tempo"),
        priority: formData.get("priority"),
        status,
        notes: formData.get("notes").trim(),
        isCompleted: status === "Concluída",
      });
      return updatedTask;
    }),
    folders: formData.has("folderId")
      ? user.folders.map((folder) => {
        const nextTaskIds = folder.taskIds.filter((id) => id !== taskId);
        const selectedFolderId = formData.get("folderId");

        if (folder.id !== selectedFolderId) {
          return {
            ...folder,
            taskIds: nextTaskIds,
          };
        }

        return {
          ...folder,
          taskIds: [...nextTaskIds, taskId],
        };
      })
      : user.folders,
  }));

  if (updatedTask) {
    activeCategory = "all";
    activePriority = "all";
    activeSearch = "";
    priorityFilter.value = "all";
    taskSearch.value = "";
    syncPriorityFilterColor();
  }

  renderDashboard();
  renderRoutineWeek();
  renderRoutineCalendar();
  if (!taskEditorModal.hidden) openTaskEditor(taskId);
}

async function deleteTask(taskId) {
  if (!await confirmAction("Excluir esta tarefa definitivamente?", { title: "Excluir tarefa", confirmLabel: "Excluir" })) return;

  if (!usuarioLogado) return;

  try {
    await excluirTarefa(usuarioLogado.uid, taskId);
  } catch (error) {
    console.error(error);
    alert("Erro ao excluir tarefa.");
    return;
  }

  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.filter((task) => task.id !== taskId),
    folders: user.folders.map((folder) => ({
      ...folder,
      taskIds: folder.taskIds.filter((id) => id !== taskId),
    })),
    notifications: (user.notifications || []).filter((notification) => notification.taskId !== taskId),
  }));

  if (expandedTaskId === taskId) expandedTaskId = null;
  if (activeRoutineId === taskId) closeRoutineDetail();
  if (!taskEditorModal.hidden) closeTaskEditor();
  renderDashboard();
  renderRoutineWeek();
  renderRoutineCalendar();
  renderNotifications();
  devilReact(["APAGOU SEM DÓ.", "LIXEIRA ALIMENTADA.", "MENOS UM CARD PRA TE JULGAR."], "fallen", 2400);
}

function moveTaskToFolder(taskId, folderId) {
  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.map((task) => (
      task.id === taskId
        ? normalizeTask({ ...task, folderId: folderId === "unfiled" ? "" : folderId, folderBindingKnown: true })
        : task
    )),
    folders: user.folders.map((folder) => {
      const nextTaskIds = folder.taskIds.filter((id) => id !== taskId);

      if (folderId === "unfiled") {
        return {
          ...folder,
          taskIds: nextTaskIds,
        };
      }

      if (folder.id !== folderId) {
        return {
          ...folder,
          taskIds: nextTaskIds,
        };
      }

      return {
        ...folder,
        taskIds: [...nextTaskIds, taskId],
      };
    }),
  }));

  renderDashboard();
  if (activeFolderId) openFolderView(activeFolderId);
  holdFolderStateForRemoteSync();
  devilReact(["MUDOU DE PASTA. PELO MENOS TEM MÉTODO.", "ARRUMANDO AS COISAS? ANOTADO.", "CARD REALOCADO. NÃO PERDE AGORA."], "idle", 2400);
  if (usuarioLogado) {
    atualizarTarefa(usuarioLogado.uid, taskId, {
      folderId: folderId === "unfiled" ? "" : folderId,
      folderBindingKnown: true,
    }).catch((error) => {
      console.error("Erro ao atualizar pasta da tarefa.", error);
    });
  }
}

function getTaskContainerId(taskId) {
  const folder = getCurrentUser()?.folders.find((item) => item.taskIds.includes(taskId));
  return folder?.id || "unfiled";
}

function reorderTaskInFolder(taskId, folderId, targetTaskId, placement = "before") {
  if (!taskId || taskId === targetTaskId) return;

  updateCurrentUser((user) => {
    if (folderId === "unfiled") {
      const folderedTaskIds = new Set((user.folders || []).flatMap((folder) => folder.taskIds || []));
      const unfiledIds = user.tasks
        .filter((task) => !folderedTaskIds.has(task.id))
        .map((task) => task.id)
        .filter((id) => id !== taskId);
      const targetIndex = targetTaskId ? unfiledIds.indexOf(targetTaskId) : -1;
      const nextUnfiledIds = [...unfiledIds];

      const insertIndex = targetIndex >= 0
        ? targetIndex + (placement === "after" ? 1 : 0)
        : nextUnfiledIds.length;
      nextUnfiledIds.splice(insertIndex, 0, taskId);

      const unfiledOrder = new Map(nextUnfiledIds.map((id, index) => [id, index]));
      const folderedTasks = user.tasks.filter((task) => folderedTaskIds.has(task.id));
      const orderedUnfiledTasks = user.tasks
        .filter((task) => unfiledOrder.has(task.id))
        .sort((a, b) => unfiledOrder.get(a.id) - unfiledOrder.get(b.id));

      return {
        ...user,
        tasks: [...folderedTasks, ...orderedUnfiledTasks],
      };
    }

    return {
      ...user,
      folders: user.folders.map((folder) => {
        const nextTaskIds = folder.taskIds.filter((id) => id !== taskId);

        if (folder.id !== folderId) {
          return {
            ...folder,
            taskIds: nextTaskIds,
          };
        }

        const targetIndex = targetTaskId ? nextTaskIds.indexOf(targetTaskId) : -1;
        const insertIndex = targetIndex >= 0
          ? targetIndex + (placement === "after" ? 1 : 0)
          : nextTaskIds.length;
        nextTaskIds.splice(insertIndex, 0, taskId);

        return {
          ...folder,
          taskIds: nextTaskIds,
        };
      }),
    };
  });

  renderDashboard();
  if (activeFolderId) openFolderView(activeFolderId);
  holdFolderStateForRemoteSync();
  devilReact(["REORDENOU. QUASE UM GERENTE.", "KANBAN MEXIDO. EU TÔ DE OLHO.", "DRAG AND DROP COM RESPONSABILIDADE."], "angry", 2400);
}

function focusBoardColumn(folderId) {
  const column = document.getElementById(`board-column-${folderId}`);
  column?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
}

function toggleFolderCollapse(folderId) {
  const shouldCollapse = !collapsedFolderIds.has(folderId);
  const column = document.getElementById(`board-column-${folderId}`);
  const toggleButton = column?.querySelector("[data-toggle-folder]");
  const toggleIcon = column?.querySelector(".folder-toggle-icon");

  if (shouldCollapse) collapsedFolderIds.add(folderId);
  else collapsedFolderIds.delete(folderId);

  if (column) {
    column.classList.add("is-folder-animating");
    column.classList.toggle("is-collapsed", shouldCollapse);
    toggleButton?.setAttribute("aria-expanded", String(!shouldCollapse));
    if (toggleIcon) toggleIcon.textContent = shouldCollapse ? "▸" : "▾";
  }

  const nextCollapsedFolders = {
    ...(getCurrentUser()?.settings.collapsedFolders || {}),
    [folderId]: shouldCollapse,
  };

  pendingCollapsedFoldersOverride = nextCollapsedFolders;
  clearTimeout(pendingCollapsedFoldersOverrideTimer);
  pendingCollapsedFoldersOverrideTimer = window.setTimeout(() => {
    pendingCollapsedFoldersOverride = null;
  }, 30000);

  updateCurrentUser((user) => ({
    ...user,
    settings: {
      ...user.settings,
      collapsedFolders: nextCollapsedFolders,
    },
  }));

  clearTimeout(folderCollapseRenderTimer);
  folderCollapseRenderTimer = window.setTimeout(() => {
    renderDashboard();
  }, 330);
  focusBoardColumn(folderId);
  syncUserProfileNow();
  devilReact(shouldCollapse ? ["FECHOU A PASTA. SEGREDOS?", "ESCONDEU A BAGUNÇA, NÉ?", "PASTA FECHADA. SUSPEITO."] : ["ABRIU A PASTA. ENFRENTE O CAOS.", "OLHA AS TASKS AÍ.", "PASTA ABERTA. SEM FUGIR."], "angry", 2400);
}

function removeTaskFromFolder(taskId, folderId) {
  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.map((task) => (
      task.id === taskId
        ? normalizeTask({ ...task, folderId: "", folderBindingKnown: true })
        : task
    )),
    folders: user.folders.map((folder) => (
      folder.id === folderId
        ? { ...folder, taskIds: folder.taskIds.filter((id) => id !== taskId) }
        : folder
    )),
  }));

  renderDashboard();
  openFolderView(folderId);
  holdFolderStateForRemoteSync();
  devilReact(["TIROU DA PASTA. CARD SOLTO NO MUNDO.", "DESARQUIVOU O PROBLEMA.", "CARD REMOVIDO DA PASTA. CORAGEM."], "angry", 2400);
  if (usuarioLogado) {
    atualizarTarefa(usuarioLogado.uid, taskId, {
      folderId: "",
      folderBindingKnown: true,
    }).catch((error) => {
      console.error("Erro ao remover pasta da tarefa.", error);
    });
  }
}

async function renameFolder(folderId) {
  const user = getCurrentUser();
  const folder = user?.folders.find((item) => item.id === folderId);
  if (!folder) return;

  const nextName = await promptAction({
    title: "Renomear pasta",
    message: "Novo nome da pasta",
    initialValue: folder.name,
    confirmLabel: "Renomear",
    icon: "folder",
  });
  if (!nextName?.trim()) return;

  updateCurrentUser((currentUser) => ({
    ...currentUser,
    folders: currentUser.folders.map((item) => (
      item.id === folderId ? { ...item, name: nextName.trim() } : item
    )),
  }));

  renderDashboard();
  if (activeFolderId === folderId) openFolderView(folderId);
  devilReact(["RENOMEOU A PASTA. IDENTIDADE NOVA.", "PASTA COM NOME NOVO. CHIQUE.", "AGORA ESSA PASTA TEM PERSONALIDADE."], "idle", 2400);
}

async function deleteFolder(folderId) {
  const user = getCurrentUser();
  const folder = user?.folders.find((item) => item.id === folderId);
  const taskIdsToDelete = new Set(folder?.taskIds || []);
  const { [folderId]: removedCollapsedFolder, ...nextCollapsedFolders } = user?.settings.collapsedFolders || {};

  if (!await confirmAction("Excluir esta pasta e todos os cartões dentro dela?", { title: "Excluir pasta", confirmLabel: "Excluir pasta", icon: "trash" })) return;

  if (usuarioLogado) {
    try {
      await Promise.all(Array.from(taskIdsToDelete).map((taskId) => excluirTarefa(usuarioLogado.uid, taskId)));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir tarefas da pasta.");
      return;
    }
  }

  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.filter((task) => !taskIdsToDelete.has(task.id)),
    folders: user.folders.filter((folder) => folder.id !== folderId),
    settings: {
      ...user.settings,
      collapsedFolders: nextCollapsedFolders,
    },
  }));

  collapsedFolderIds.delete(folderId);
  if (activeFolderId === folderId) closeFolderView();
  if (taskIdsToDelete.has(expandedTaskId)) {
    expandedTaskId = null;
    closeTaskEditor();
  }
  if (taskIdsToDelete.has(activeRoutineId)) closeRoutineDetail();
  renderDashboard();
  renderRoutineWeek();
  renderRoutineCalendar();
  devilReact(["PASTA EXCLUÍDA. FOI DE BASE.", "LIMPEZA PESADA DETECTADA.", "SUMIU UMA PASTA INTEIRA. BRABO."], "fallen", 2600);
}

function openFolderView(folderId) {
  const user = getCurrentUser();
  const folder = user?.folders.find((item) => item.id === folderId);
  if (!folder) return;

  activeFolderId = folderId;
  const tasks = getFolderTasks(folder);
  folderViewTitle.textContent = folder.name;
  folderViewContent.innerHTML = `
    <div class="folder-view-summary" style="--folder-color: ${folder.color}">
      <span class="folder-icon" aria-hidden="true">${uiIcon("folder")}</span>
      <strong>${tasks.length} ${tasks.length === 1 ? "cartão acumulado" : "cartões acumulados"}</strong>
    </div>
    <div class="folder-view-actions">
      <button type="button" class="routine-edit-button" data-rename-folder="${folder.id}">Renomear</button>
      <button type="button" class="routine-delete-button" data-delete-folder="${folder.id}">Excluir pasta</button>
    </div>
    <div class="folder-task-list">
      ${
        tasks.length
          ? tasks.map((task) => `
            <article class="folder-task-row" style="--category-color: ${task.categoryColor}" data-folder-view-card="${task.id}">
              <div>
                <span>${escapeHtml(task.time)} • ${formatDate(task.date)}</span>
                <strong>${escapeHtml(task.title)}</strong>
                <small>${escapeHtml(task.priority)} • ${escapeHtml(task.status)}</small>
              </div>
              <button type="button" data-remove-folder-task="${task.id}" data-folder-id="${folder.id}">Remover da pasta</button>
            </article>
          `).join("")
          : `<div class="empty-state">Nenhum cartão dentro desta pasta.</div>`
      }
    </div>
  `;
  folderViewModal.hidden = false;
  folderViewModal.classList.remove("is-closing");
  folderViewModal.classList.add("is-opening");
  requestAnimationFrame(() => {
    folderViewModal.classList.add("is-open");
  });

  clearTimeout(folderViewAnimationTimer);
  folderViewAnimationTimer = window.setTimeout(() => {
    folderViewModal.classList.remove("is-opening");
  }, 320);
}

async function createAccount() {
  const email = signupEmail.value.trim().toLowerCase();
  const senha = signupPassword.value;
  const nome = signupName.value.trim();

  try {
    const usuario = await criarConta(nome, email, senha);

    usuarioLogado = usuario;
    appState.users = [
      normalizeUser({
        id: usuario.uid,
        name: nome,
        email,
        settings: {
          theme: "dark",
          defaultViewDate: "today",
          notificationsEnabled: true,
          sidebarCollapsed: false,
        },
        avatarImage: "",
        tasks: [],
        folders: [],
      }),
    ];
    appState.currentUserId = usuario.uid;
    saveAppState();
    syncUserProfileNow();
    resetSessionViewState();
    signupForm.reset();
    showDashboard();
    iniciarEscutasFirebase(usuario);
  } catch (error) {
    console.error(error);

    if (error.code === "auth/email-already-in-use") {
      setFeedback("Este email ja esta cadastrado. Tente entrar na conta.");
      return;
    }

    if (error.code === "auth/weak-password") {
      setFeedback("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (error.code === "auth/invalid-email") {
      setFeedback("Digite um email valido.");
      return;
    }

    setFeedback(`Erro ao criar conta: ${error.code || error.message}`);
  }

  return;

  const exists = appState.users.some((user) => user.email === email);

  if (exists) {
    setFeedback("Este email já está cadastrado.");
    return;
  }

  const user = {
    id: createId(),
    name: signupName.value.trim(),
    email,
    password: signupPassword.value,
    settings: {
      theme: "dark",
      defaultViewDate: "today",
      notificationsEnabled: true,
      sidebarCollapsed: false,
    },
    avatarImage: "",
    tasks: [],
    folders: [],
  };

  appState.users = [...appState.users, user];
  appState.currentUserId = user.id;
  saveAppState();
  resetSessionViewState();
  signupForm.reset();
  showDashboard();
}

async function login() {
  const email = loginEmail.value.trim().toLowerCase();
  const senha = loginPassword.value;

  try {
    const usuario = await entrar(email, senha);

    usuarioLogado = usuario;
    appState.users = [
      normalizeUser({
        id: usuario.uid,
        name: usuario.email.split("@")[0],
        email: usuario.email,
        settings: {
          theme: "dark",
          defaultViewDate: "today",
          notificationsEnabled: true,
          sidebarCollapsed: false,
        },
        avatarImage: "",
        tasks: [],
        folders: [],
      }),
    ];
    appState.currentUserId = usuario.uid;
    saveAppState();
    resetSessionViewState();
    loginForm.reset();
    showDashboard();
    iniciarEscutasFirebase(usuario);
  } catch (error) {
    console.error(error);
    setFeedback("Email ou senha invalidos.");
  }

  return;

  const password = loginPassword.value;
  const user = appState.users.find((item) => item.email === email && item.password === password);

  if (!user) {
    setFeedback("Email ou senha inválidos.");
    return;
  }

  appState.currentUserId = user.id;
  saveAppState();
  resetSessionViewState();
  loginForm.reset();
  showDashboard();
}

function openSettings() {
  const user = getCurrentUser();
  if (!user) return;

  updateSettingsAvatarPreview(user.avatarImage || "");
  settingsName.value = user.name;
  settingsEmail.value = user.email;
  settingsPassword.value = "";
  settingsTheme.value = user.settings.theme;
  settingsNotifications.checked = user.settings.notificationsEnabled;
  pendingAvatarImage = "";
  settingsAvatar.value = "";
  syncDevilToggle();
  settingsModal.hidden = false;
  enhanceFilterSelects(settingsModal);
  syncCustomSelects();
  settingsProfileCard.focus();
}

function closeSettings() {
  settingsModal.hidden = true;
  settingsForm.reset();
  pendingAvatarImage = "";
  updateSettingsAvatarPreview("");
  resetPasswordVisibility(settingsPassword);
}

function updateSettingsAvatarPreview(image = pendingAvatarImage || getCurrentUser()?.avatarImage || "") {
  if (!settingsProfileOrb) return;

  settingsProfileOrb.innerHTML = image
    ? `<img src="${image}" alt="">`
    : uiIcon("tag");
  settingsProfileOrb.classList.toggle("has-image", Boolean(image));
}

async function saveSettings() {
  const email = settingsEmail.value.trim().toLowerCase();
  const currentUser = getCurrentUser();
  const duplicate = appState.users.some(
    (user) => user.email === email && user.id !== appState.currentUserId,
  );

  if (duplicate) {
    setFeedback("Este email já pertence a outro usuário.");
    return;
  }

  if (!await confirmAction("Salvar as alterações da sua conta?", { title: "Salvar configurações", confirmLabel: "Salvar", tone: "default", icon: "checkCircle" })) return;

  const selectedAvatarFile = settingsAvatar.files?.[0];
  const loadedAvatarImage = selectedAvatarFile ? await readAvatarFile(selectedAvatarFile) : "";
  const avatarImage = selectedAvatarFile
    ? loadedAvatarImage || currentUser?.avatarImage || ""
    : pendingAvatarImage || currentUser?.avatarImage || "";

  updateCurrentUser((user) => ({
    ...user,
    name: settingsName.value.trim(),
    email,
    password: settingsPassword.value || user.password,
    avatarImage,
    settings: {
      ...user.settings,
      theme: settingsTheme.value,
      notificationsEnabled: settingsNotifications.checked,
    },
  }));
  clearTimeout(profileSyncTimer);
  await syncUserProfileNow();

  closeSettings();
  showDashboard();
}

async function handleAvatarSelection() {
  const file = settingsAvatar.files?.[0];
  if (!file) {
    pendingAvatarImage = "";
    return;
  }

  pendingAvatarImage = await readAvatarFile(file);
  updateSettingsAvatarPreview(pendingAvatarImage);
}

function readAvatarFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", async () => {
      const imageData = String(reader.result || "");
      resolve(await compactAvatarImage(imageData));
    });
    reader.addEventListener("error", () => resolve(""));
    reader.readAsDataURL(file);
  });
}

function compactAvatarImage(imageData) {
  return new Promise((resolve) => {
    if (!imageData) {
      resolve("");
      return;
    }

    const image = new Image();
    image.onload = () => {
      const maxSize = 320;
      const ratio = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
      const width = Math.max(1, Math.round(image.naturalWidth * ratio));
      const height = Math.max(1, Math.round(image.naturalHeight * ratio));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");

      if (!context) {
        resolve(imageData);
        return;
      }

      context.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL("image/webp", 0.82));
    };
    image.onerror = () => resolve(imageData);
    image.src = imageData;
  });
}

async function clearCurrentUserTasks() {
  if (!await confirmAction("Limpar todas as suas tarefas? Essa ação não pode ser desfeita.", { title: "Limpar tarefas", confirmLabel: "Limpar tudo" })) return;

  if (usuarioLogado) {
    const user = getCurrentUser();

    try {
      await Promise.all((user?.tasks || []).map((task) => excluirTarefa(usuarioLogado.uid, task.id)));
    } catch (error) {
      console.error(error);
      alert("Erro ao limpar tarefas.");
      return;
    }
  }

  updateCurrentUser((user) => ({
    ...user,
    tasks: [],
    folders: user.folders.map((folder) => ({ ...folder, taskIds: [] })),
    notifications: (user.notifications || []).filter((notification) => !notification.taskId),
  }));
  closeSettings();
  closeRoutineDetail();
  closeFolderView();
  renderDashboard();
  renderRoutineWeek();
  renderRoutineCalendar();
}

async function confirmLogout() {
  if (await confirmAction("Deseja sair da sua conta agora?", { title: "Sair da conta", confirmLabel: "Sair", tone: "default", icon: "folder" })) {
    clearTimeout(profileSyncTimer);
    await syncUserProfileNow();
    await sair();
    usuarioLogado = null;

    if (pararDeObservarPerfil) {
      pararDeObservarPerfil();
      pararDeObservarPerfil = null;
    }

    if (pararDeObservarTarefas) {
      pararDeObservarTarefas();
      pararDeObservarTarefas = null;
    }

    showLogin();
  }
}

function bindEvents() {
  passwordToggles.forEach((button) => {
    button.addEventListener("click", () => togglePasswordVisibility(button));
  });

  modeButton.addEventListener("click", () => {
    showAuthMode(currentMode === "login" ? "signup" : "login");
  });

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createAccount();
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    login();
  });

  dashboardLogout.addEventListener("click", confirmLogout);
  notificationToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    syncSmartNotifications();
    toggleNotificationPanel();
  });
  markNotificationsRead.addEventListener("click", markAllNotificationsRead);
  notificationList.addEventListener("click", (event) => {
    const item = event.target.closest("[data-notification-id]");
    if (!item) return;
    openNotificationTarget(item.dataset.notificationId);
  });
  document.addEventListener("click", (event) => {
    if (
      notificationPanel.hidden
      || notificationPanel.contains(event.target)
      || notificationToggle.contains(event.target)
    ) {
      return;
    }

    closeNotificationPanel();
  });
  sidebarThemeToggle.addEventListener("click", toggleTheme);
  resetFilters.addEventListener("click", resetWorkspaceFilters);
  sidebarToggle.addEventListener("click", toggleSidebar);
  sidebarNotificationToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    syncSmartNotifications();
    toggleNotificationPanel();
  });
  workspaceMenu.addEventListener("click", showWorkspaceView);
  routinesMenu.addEventListener("click", showRoutinesView);
  sidebarUserTrigger.addEventListener("click", openSettings);
  closeSettingsModal.addEventListener("click", closeSettings);
  clearUserTasks.addEventListener("click", clearCurrentUserTasks);
  devilModeToggle?.addEventListener("click", toggleDevilMode);
  devilSprite?.addEventListener("pointerdown", handleDevilPointerDown);
  window.addEventListener("pointermove", handleDevilPointerMove);
  window.addEventListener("pointerup", handleDevilPointerUp);
  devilSprite?.addEventListener("mouseenter", () => {
    if (!devilModeEnabled || devilDragState) return;
    if (wakeDevil()) return;
    devilSay("TÁ ME OLHANDO POR QUÊ? TASK.", "angry", 2200);
  });
  devilSprite?.addEventListener("click", () => {
    if (!devilModeEnabled || devilDragState) return;
    if (wakeDevil()) return;
    devilSay(getRandomItem(devilLines), "angry", 2200);
  });
  settingsProfileCard.addEventListener("click", () => settingsAvatar.click());
  settingsProfileCard.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    settingsAvatar.click();
  });
  settingsAvatar.addEventListener("change", handleAvatarSelection);
  settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSettings();
  });

  settingsModal.addEventListener("click", (event) => {
    if (event.target === settingsModal) closeSettings();
  });
  closeTaskEditorModal.addEventListener("click", closeTaskEditor);
  taskEditorModal.addEventListener("click", (event) => {
    if (event.target === taskEditorModal) closeTaskEditor();
  });
  taskEditorContent.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-task]");
    const toggleIconEditor = event.target.closest("[data-toggle-icon-editor]");
    const closeIdentityEditor = event.target.closest("[data-close-identity-editor]");
    const presetButton = event.target.closest("[data-identity-preset]");
    const iconButton = event.target.closest("[data-editor-icon]");

    if (toggleIconEditor) {
      const picker = toggleIconEditor.closest(".editor-icon-picker");
      const panel = picker?.querySelector(".identity-editor-panel");
      const shouldOpen = panel?.hidden;

      if (!panel) return;
      panel.hidden = !shouldOpen;
      picker.classList.toggle("is-open", Boolean(shouldOpen));
      toggleIconEditor.setAttribute("aria-expanded", String(Boolean(shouldOpen)));
      if (shouldOpen) devilReact(["MEXENDO NA IDENTIDADE VISUAL? ESTILOSO.", "TROCAR ÍCONE NÃO CONCLUI TASK, MAS AJUDA.", "DESIGN DE CARD. APROVO COM RESSALVAS."], "idle", 2400);
      return;
    }

    if (closeIdentityEditor) {
      const picker = closeIdentityEditor.closest(".editor-icon-picker");
      const panel = picker?.querySelector(".identity-editor-panel");
      if (panel) panel.hidden = true;
      picker?.classList.remove("is-open");
      picker?.querySelector("[data-toggle-icon-editor]")?.setAttribute("aria-expanded", "false");
      return;
    }

    if (presetButton) {
      applyIdentityPreset(presetButton.closest("[data-identity-root]"), presetButton.dataset.identityPreset);
      devilReact(["PRESET APLICADO. FICOU MENOS TRISTE.", "IDENTIDADE NOVA NO CARD.", "AGORA ESSE CARD TEM PRESENÇA."], "idle", 2400);
      return;
    }

    if (iconButton) {
      const preview = iconButton.closest(".task-identity-preview");
      const iconName = iconButton.dataset.editorIcon;

      if (!isVisualIconName(iconName)) return;
      syncIdentityEditor(preview, { iconName });
      devilReact(["ÍCONE TROCADO. EU VI.", "SÍMBOLO NOVO, MESMA RESPONSABILIDADE.", "BONITINHO. AGORA FAZ A TASK."], "angry", 2400);
      return;
    }

    if (!deleteButton) return;
    deleteTask(deleteButton.dataset.deleteTask);
  });
  taskEditorContent.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-edit-form]");
    if (!form) return;
    event.preventDefault();
    updateTask(form);
  });
  taskEditorContent.addEventListener("input", (event) => {
    const identityRoot = event.target.closest("[data-identity-root]");
    if (!identityRoot) return;
    if (!event.target.matches("[data-identity-category], [data-identity-color], [data-identity-badge], [data-identity-style]")) return;
    syncIdentityEditor(identityRoot);
  });
  taskEditorContent.addEventListener("change", (event) => {
    const identityRoot = event.target.closest("[data-identity-root]");
    if (!identityRoot || !event.target.matches("[data-identity-glow]")) return;
    syncIdentityEditor(identityRoot);
  });

  openTaskModal.addEventListener("click", openModal);
  closeCreateChoiceModal.addEventListener("click", closeCreateChoice);
  cancelCreateChoice.addEventListener("click", closeCreateChoice);
  createChoiceModal.addEventListener("click", (event) => {
    if (event.target === createChoiceModal) closeCreateChoice();
  });
  createCardOption.addEventListener("click", () => {
    closeCreateChoice();
    openModal();
  });
  createFolderOption.addEventListener("click", () => {
    closeCreateChoice();
    openFolderModal();
  });
  closeFolderModal.addEventListener("click", closeFolderDialog);
  folderModal.addEventListener("click", (event) => {
    if (event.target === folderModal) closeFolderDialog();
  });
  folderName.addEventListener("input", updateFolderPreview);
  folderColor.addEventListener("input", updateFolderPreview);
  folderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createFolder();
  });
  closeFolderViewModal.addEventListener("click", closeFolderView);
  folderViewModal.addEventListener("click", (event) => {
    if (event.target === folderViewModal) closeFolderView();
  });
  folderViewContent.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-folder-task]");
    const renameButton = event.target.closest("[data-rename-folder]");
    const deleteButton = event.target.closest("[data-delete-folder]");
    const folderViewCard = event.target.closest("[data-folder-view-card]");

    if (removeButton) {
      removeTaskFromFolder(removeButton.dataset.removeFolderTask, removeButton.dataset.folderId);
      return;
    }

    if (renameButton) {
      renameFolder(renameButton.dataset.renameFolder);
      return;
    }

    if (deleteButton) {
      deleteFolder(deleteButton.dataset.deleteFolder);
      return;
    }

    if (folderViewCard) {
      closeFolderView();
      openTaskEditor(folderViewCard.dataset.folderViewCard);
    }
  });
  closeTaskModal.addEventListener("click", closeModal);
  taskModal.addEventListener("click", (event) => {
    const suggestionButton = event.target.closest("[data-visual-key]");
    if (suggestionButton) {
      const visual = categoryVisuals.find((item) => item.key === suggestionButton.dataset.visualKey);
      if (!visual) return;
      taskCategoryName.value = visual.label;
      taskCategoryColor.value = visual.color;
      if (taskIconChoice) taskIconChoice.value = suggestionButton.dataset.iconName || visual.icon;
      taskIconSuggestions.querySelectorAll("[data-icon-name]").forEach((button) => {
        button.classList.toggle("is-selected", button === suggestionButton);
      });
      updateTaskVisualPreview();
      return;
    }

    if (event.target === taskModal) closeModal();
  });

  [taskTitle, taskDescription, taskCategoryName, taskCategoryColor, taskNotes].forEach((field) => {
    field.addEventListener("input", updateTaskVisualPreview);
  });

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createTask();
  });

  selectedDate.addEventListener("change", () => {
    expandedTaskId = null;
    setCurrentDate();
    renderDashboard();
    devilReact(["TROCOU A DATA. O PASSADO TE JULGA.", "NOVA DATA, NOVA COBRANÇA.", "ESCOLHEU O DIA. AGORA ENCARA."], "angry", 2400);
  });

  priorityFilter.addEventListener("change", () => {
    activePriority = priorityFilter.value;
    syncPriorityFilterColor();
    expandedTaskId = null;
    renderDashboard();
    devilReact(["FILTRANDO PRIORIDADE? FINALMENTE.", "OLHA AS PRIORIDADES AÍ.", "FOCO NO QUE IMPORTA, TALVEZ."], "idle", 2400);
  });

  taskSearch.addEventListener("input", () => {
    activeSearch = taskSearch.value.trim().toLowerCase();
    expandedTaskId = null;
    renderDashboard();
    devilReact(["PROCURANDO A TASK PERDIDA?", "DIGITA AÍ, DETETIVE.", "BUSCA ATIVA. PRODUTIVIDADE PASSIVA."], "angry", 2200, 5000);
  });

  sortFilter.addEventListener("change", () => {
    activeSort = sortFilter.value;
    expandedTaskId = null;
    renderDashboard();
    devilReact(["ORDENOU. AGORA EXECUTA.", "ARRUMAR LISTA NÃO É FAZER LISTA.", "SORT BONITO. MÃOS À OBRA."], "angry", 2400);
  });

  routinePrevWeek.addEventListener("click", () => {
    routineWeekStart = addDays(routineWeekStart, -7);
    selectedRoutineDate = formatIsoDate(routineWeekStart);
    renderRoutineWeek();
    renderRoutineCalendar();
    devilReact(["FUÇANDO SEMANAS PASSADAS?", "VIAGEM NO TEMPO NÃO ENTREGA TASK.", "SEMANA ANTERIOR. HISTÓRICO DE CULPA."], "angry", 2400);
  });

  routineNextWeek.addEventListener("click", () => {
    routineWeekStart = addDays(routineWeekStart, 7);
    selectedRoutineDate = formatIsoDate(routineWeekStart);
    renderRoutineWeek();
    renderRoutineCalendar();
    devilReact(["PLANEJANDO O FUTURO? OUSADO.", "SEMANA QUE VEM TAMBÉM TE COBRA.", "FUTURO ABERTO. PROMESSAS PERIGOSAS."], "idle", 2400);
  });

  routineToday.addEventListener("click", () => {
    selectedRoutineDate = getTodayDate();
    routineWeekStart = getStartOfWeek(new Date(`${selectedRoutineDate}T12:00:00`));
    renderRoutineWeek();
    renderRoutineCalendar();
    devilReact(["HOJE. O DIA DO JULGAMENTO.", "VOLTOU PRO HOJE. BOA.", "AGORA É COM VOCÊ E O PRESENTE."], "angry", 2400);
  });

  routineCalendarToggle.addEventListener("click", () => {
    routineCalendarPanel.hidden = !routineCalendarPanel.hidden;
    hideCalendarTooltip();
    if (!routineCalendarPanel.hidden) renderRoutineCalendar();
    devilReact(routineCalendarPanel.hidden ? ["FECHOU O CALENDÁRIO. MEDO DAS DATAS?", "ESCONDEU AS DATAS, NÉ?"] : ["CALENDÁRIO ABERTO. AS DATAS ACORDARAM.", "OLHA A AGENDA TE ENCARANDO."], "idle", 2400);
  });

  routineCalendarClose.addEventListener("click", () => {
    hideCalendarTooltip();
    routineCalendarPanel.hidden = true;
  });

  routineDayTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-routine-date]");
    if (!button) return;
    selectedRoutineDate = button.dataset.routineDate;
    renderRoutineWeek();
    devilReact(["DIA TROCADO. TASKS TAMBÉM.", "ESCOLHEU O DIA. SEM SUMIR.", "RODANDO A SEMANA IGUAL PLANILHA VIVA."], "idle", 2200);
  });

  routineWeekGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-routine-id]");
    if (!card) return;
    openRoutineDetail(card.dataset.routineId);
    devilReact(["ABRIU DETALHES. AGORA LÊ.", "CARD INSPECIONADO. SEM PASSAR PANO.", "OLHANDO A ROTINA DE PERTO, HEIN."], "angry", 2400);
  });

  routineMonthGrid.addEventListener("click", (event) => {
    const dayButton = event.target.closest("[data-calendar-date]");
    if (!dayButton) return;
    if (Date.now() < suppressCalendarClickUntil) return;
    if (!getRoutinesByDate(dayButton.dataset.calendarDate).length) return;
    goToRoutineDate(dayButton.dataset.calendarDate);
    devilReact(["PULOU PRA DATA MARCADA.", "DIA COM ROTINA. NÃO IGNORA.", "CALENDÁRIO TE LEVOU PRO PROBLEMA."], "idle", 2400);
  });

  routineMonthGrid.addEventListener("mouseover", (event) => {
    const dayButton = event.target.closest("[data-calendar-date]");
    if (!dayButton) return;
    showCalendarTooltip(dayButton);
  });

  routineMonthGrid.addEventListener("mouseout", (event) => {
    const dayButton = event.target.closest("[data-calendar-date]");
    if (!dayButton || dayButton.contains(event.relatedTarget)) return;
    hideCalendarTooltip();
  });

  routineMonthGrid.addEventListener("focusin", (event) => {
    const dayButton = event.target.closest("[data-calendar-date]");
    if (!dayButton) return;
    showCalendarTooltip(dayButton);
  });

  routineMonthGrid.addEventListener("focusout", (event) => {
    const dayButton = event.target.closest("[data-calendar-date]");
    if (!dayButton) return;
    hideCalendarTooltip();
  });

  routineMonthGrid.addEventListener("touchstart", (event) => {
    const dayButton = event.target.closest("[data-calendar-date]");
    if (!dayButton || dayButton.dataset.calendarMarked !== "true") return;
    event.preventDefault();
    suppressCalendarClickUntil = Date.now() + 450;
    showCalendarTooltip(dayButton);
  }, { passive: false });

  document.addEventListener("pointerdown", (event) => {
    if (
      routineCalendarTooltip.hidden
      || routineCalendarTooltip.contains(event.target)
      || event.target.closest("[data-calendar-date]")
    ) {
      return;
    }

    hideCalendarTooltip();
  });

  window.addEventListener("resize", hideCalendarTooltip);
  window.addEventListener("scroll", hideCalendarTooltip, true);

  routineDetailClose.addEventListener("click", closeRoutineDetail);
  routineDetailContent.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-routine-edit]");
    const deleteButton = event.target.closest("[data-routine-delete]");
    const cancelButton = event.target.closest("[data-routine-cancel-edit]");

    if (editButton) {
      openRoutineEdit(editButton.dataset.routineEdit);
      return;
    }

    if (deleteButton) {
      deleteTask(deleteButton.dataset.routineDelete);
      return;
    }

    if (cancelButton) {
      openRoutineDetail(cancelButton.dataset.routineCancelEdit);
    }
  });

  routineDetailContent.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-routine-edit-form]");
    if (!form) return;
    event.preventDefault();
    saveRoutineEdit(form);
  });

  timelineList.addEventListener("click", (event) => {
    const createButton = event.target.closest("[data-open-create-choice]");
    const addCardFolderButton = event.target.closest("[data-add-card-folder]");
    const toggleFolderButton = event.target.closest("[data-toggle-folder]");
    const openFolderButton = event.target.closest("[data-open-folder]");
    const renameFolderButton = event.target.closest("[data-rename-folder]");
    const deleteFolderButton = event.target.closest("[data-delete-folder]");
    const checkButton = event.target.closest("[data-task-id]");
    const deleteButton = event.target.closest("[data-delete-task]");
    const card = event.target.closest("[data-card-id]");
    const interactive = event.target.closest("input, button, textarea, select, label");

    if (addCardFolderButton) {
      openModal(addCardFolderButton.dataset.addCardFolder);
      return;
    }
    if (createButton) {
      pendingTargetFolderId = "";
      openCreateChoice();
      return;
    }
    if (openFolderButton) {
      openFolderView(openFolderButton.dataset.openFolder);
      return;
    }
    if (renameFolderButton) {
      renameFolder(renameFolderButton.dataset.renameFolder);
      return;
    }
    if (deleteFolderButton) {
      deleteFolder(deleteFolderButton.dataset.deleteFolder);
      return;
    }
    if (toggleFolderButton) {
      toggleFolderCollapse(toggleFolderButton.dataset.toggleFolder);
      return;
    }
    if (checkButton) {
      toggleTask(checkButton.dataset.taskId);
      return;
    }
    if (deleteButton) {
      deleteTask(deleteButton.dataset.deleteTask);
      return;
    }
    if (card && !interactive) {
      openTaskEditor(card.dataset.cardId);
    }
  });

  timelineList.addEventListener("wheel", (event) => {
    const stack = event.target.closest(".board-card-stack");
    const canScrollStack = stack && stack.scrollHeight > stack.clientHeight;

    if (canScrollStack && Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      const atTop = stack.scrollTop <= 0;
      const atBottom = stack.scrollTop + stack.clientHeight >= stack.scrollHeight - 1;
      const scrollingUp = event.deltaY < 0;
      const scrollingDown = event.deltaY > 0;

      if (!(scrollingUp && atTop) && !(scrollingDown && atBottom)) {
        return;
      }
    }

    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    if (timelineList.scrollWidth <= timelineList.clientWidth) return;

    event.preventDefault();
    timelineList.scrollLeft += event.deltaY;
  }, { passive: false });

  timelineList.addEventListener("dragstart", (event) => {
    const card = event.target.closest("[data-task-drag-id]");
    if (!card) return;
    event.dataTransfer.setData("text/plain", card.dataset.taskDragId);
    event.dataTransfer.effectAllowed = "move";
    card.classList.add("is-dragging");
  });

  timelineList.addEventListener("dragover", (event) => {
    const folder = event.target.closest("[data-folder-drop-id]");
    if (!folder) return;
    event.preventDefault();
    folder.classList.add("is-drag-over");

    const targetCard = event.target.closest("[data-task-drag-id]");
    folder.querySelectorAll(".is-drop-target").forEach((card) => card.classList.remove("is-drop-target", "is-drop-after"));
    if (targetCard && targetCard.dataset.taskDragId !== event.dataTransfer.getData("text/plain")) {
      const targetRect = targetCard.getBoundingClientRect();
      const placement = event.clientY > targetRect.top + targetRect.height / 2 ? "after" : "before";
      targetCard.classList.add("is-drop-target");
      targetCard.classList.toggle("is-drop-after", placement === "after");
    }

    if (folder.classList.contains("is-collapsed")) {
      folder.classList.add("is-drag-preview");
    }
  });

  timelineList.addEventListener("dragleave", (event) => {
    const folder = event.target.closest("[data-folder-drop-id]");
    if (!folder || folder.contains(event.relatedTarget)) return;
    folder.classList.remove("is-drag-over");
    folder.classList.remove("is-drag-preview");
    folder.querySelectorAll(".is-drop-target").forEach((card) => card.classList.remove("is-drop-target", "is-drop-after"));
  });

  timelineList.addEventListener("drop", (event) => {
    const folder = event.target.closest("[data-folder-drop-id]");
    if (!folder) return;
    event.preventDefault();
    folder.classList.remove("is-drag-over");
    folder.classList.remove("is-drag-preview");
    folder.querySelectorAll(".is-drop-target").forEach((card) => card.classList.remove("is-drop-target", "is-drop-after"));
    const taskId = event.dataTransfer.getData("text/plain");
    const targetCard = event.target.closest("[data-task-drag-id]");
    const targetTaskId = targetCard?.dataset.taskDragId || "";
    const targetRect = targetCard?.getBoundingClientRect();
    const placement = targetRect && event.clientY > targetRect.top + targetRect.height / 2 ? "after" : "before";

    if (!taskId) return;

    if (targetTaskId) {
      const sourceFolderId = getTaskContainerId(taskId);
      const targetFolderId = folder.dataset.folderDropId;

      if (sourceFolderId === targetFolderId) {
        reorderTaskInFolder(taskId, targetFolderId, targetTaskId, placement);
      } else {
        moveTaskToFolder(taskId, targetFolderId);
      }
      return;
    }

    moveTaskToFolder(taskId, folder.dataset.folderDropId);
  });

  timelineList.addEventListener("dragend", () => {
    timelineList.querySelectorAll(".is-dragging, .is-drop-target").forEach((item) => {
      item.classList.remove("is-dragging", "is-drop-target", "is-drop-after");
    });
  });

  timelineList.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-edit-form]");
    if (!form) return;
    event.preventDefault();
    updateTask(form);
  });

  categoryList.addEventListener("click", (event) => {
    const folderButton = event.target.closest("[data-sidebar-folder]");
    const sidebarTaskButton = event.target.closest("[data-sidebar-task]");
    if (sidebarTaskButton) {
      openTaskEditor(sidebarTaskButton.dataset.sidebarTask);
      expandedTaskId = sidebarTaskButton.dataset.sidebarTask;
      activeSidebarFolderId = "";
      renderDashboard();
      document.querySelector(`[data-card-id="${expandedTaskId}"]`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      return;
    }
    if (folderButton) {
      activeSidebarFolderId = activeSidebarFolderId === folderButton.dataset.sidebarFolder
        ? ""
        : folderButton.dataset.sidebarFolder;
      renderCategoryFilters();
      focusBoardColumn(folderButton.dataset.sidebarFolder);
      return;
    }

    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category === "all" ? "all" : decodeURIComponent(button.dataset.category);
    expandedTaskId = null;
    renderDashboard();
  });

}

function togglePasswordVisibility(button) {
  const input = document.getElementById(button.dataset.passwordToggle);
  if (!input) return;

  const shouldShow = input.type === "password";
  input.type = shouldShow ? "text" : "password";
  button.classList.toggle("is-visible", shouldShow);
  button.setAttribute("aria-pressed", String(shouldShow));
  button.setAttribute("aria-label", shouldShow ? "Ocultar senha" : "Revelar senha");
}

function resetPasswordVisibility(input) {
  if (!input) return;

  input.type = "password";
  const button = document.querySelector(`[data-password-toggle="${input.id}"]`);
  if (!button) return;
  button.classList.remove("is-visible");
  button.setAttribute("aria-pressed", "false");
  button.setAttribute("aria-label", "Revelar senha");
}

function resetAllPasswordVisibility() {
  [loginPassword, signupPassword, settingsPassword].forEach(resetPasswordVisibility);
}

function init() {
  selectedDate.value = getTodayDate();
  taskDate.value = selectedDate.value;
  syncPriorityFilterColor();
  setCurrentDate();
  bindEvents();
  enhanceFilterSelects();
  setDevilMode(devilModeEnabled);
  window.setInterval(syncSmartNotifications, 60000);

  observarUsuarioLogado((usuario) => {
    if (!usuario) {
      usuarioLogado = null;

      if (pararDeObservarPerfil) {
        pararDeObservarPerfil();
        pararDeObservarPerfil = null;
      }

      if (pararDeObservarTarefas) {
        pararDeObservarTarefas();
        pararDeObservarTarefas = null;
      }

      showLogin();
      return;
    }

    usuarioLogado = usuario;
    appState.currentUserId = usuario.uid;

    if (!getCurrentUser()) {
      appState.users = [
        normalizeUser({
          id: usuario.uid,
          name: usuario.email.split("@")[0],
          email: usuario.email,
          settings: {
            theme: "dark",
            defaultViewDate: "today",
            notificationsEnabled: true,
            sidebarCollapsed: false,
          },
          avatarImage: "",
          tasks: [],
          folders: [],
        }),
      ];
      saveAppState();
    }

    iniciarEscutasFirebase(usuario);
  });

  if (!getCurrentUser()) {
    authScreen.hidden = false;
    dashboardScreen.hidden = true;
    applyTheme();
  }
}

init();
