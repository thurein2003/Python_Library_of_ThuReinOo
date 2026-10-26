import { lessons } from './lessons.js';
import { solutions } from './solutions.js';
import { learningPaths } from './learning-path.js';
import { beginnerLessons } from './beginner-lessons.js';
import { beginnerSolutions } from './beginner-solutions.js';
import { beginnerLearningPaths } from './beginner-learning-path.js';
import { createProgressBackup, validateProgressBackup } from './progress.js';
import { copy } from './i18n.js?v=academy-3';

const STORAGE_KEY = 'python-project-library-progress-v1';
const SOLUTION_CLICKS_KEY = 'python-project-library-solution-clicks-v1';
const CERTIFICATE_NAME_KEY = 'python-project-library-certificate-name-v1';
const VERIFIED_RUNS_KEY = 'python-project-library-verified-runs-v1';
const LEARNER_NAME_KEY = 'python-project-library-learner-name-v1';
const ACTIVE_TRACK_KEY = 'python-learning-academy-active-track-v1';
const tracks = {
  beginner: {
    id: 'beginner', titleKey: 'trackBeginner', lessonLabel: 'lessonLabel', lessons: beginnerLessons,
    solutions: beginnerSolutions, paths: beginnerLearningPaths, certificate: false,
    keys: {
      completed: 'python-beginner-progress-v1', verifiedRuns: 'python-beginner-verified-runs-v1',
      solutionClicks: 'python-beginner-solution-clicks-v1', active: 'python-beginner-active-v1'
    }
  },
  project2certificate: {
    id: 'project2certificate', titleKey: 'trackProjectCertificate', lessonLabel: 'project',
    lessons, solutions, paths: learningPaths, certificate: true,
    keys: { completed: STORAGE_KEY, verifiedRuns: VERIFIED_RUNS_KEY, solutionClicks: SOLUTION_CLICKS_KEY, active: 'python-project-library-active' }
  }
};
const trackIds = Object.keys(tracks);
const sessionFallback = new Map();
let sessionOnly = false;
const storage = {
  getItem(key) {
    try { return window.localStorage.getItem(key); }
    catch {
      sessionOnly = true;
      return sessionFallback.get(key) ?? null;
    }
  },
  setItem(key, value) {
    const text = String(value);
    try {
      window.localStorage.setItem(key, text);
      sessionFallback.delete(key);
    } catch {
      sessionOnly = true;
      sessionFallback.set(key, text);
    }
  },
  removeItem(key) {
    sessionFallback.delete(key);
    try { window.localStorage.removeItem(key); }
    catch { sessionOnly = true; }
  },
  keys() {
    try {
      return Array.from({ length: window.localStorage.length }, (_, index) => window.localStorage.key(index)).filter(Boolean);
    } catch {
      sessionOnly = true;
      return [...sessionFallback.keys()];
    }
  }
};
const lessonList = document.querySelector('#lesson-list');
const lessonContent = document.querySelector('#lesson-content');
const mobileLessonMenu = document.querySelector('#mobile-lesson-menu');
const filter = document.querySelector('#level-filter');
const search = document.querySelector('#project-search');
const progressCount = document.querySelector('#progress-count');
const confirmDialog = document.querySelector('#confirm-dialog');
const languageSelect = document.querySelector('#language-select');
const certificateDialog = document.querySelector('#certificate-dialog');
const learnerDialog = document.querySelector('#learner-dialog');
const learnerNameInput = document.querySelector('#learner-name-input');
let learnerName = storage.getItem(LEARNER_NAME_KEY) || '';
if (!learnerName) {
  for (const key of storage.keys()) {
    if (key.startsWith('python-project-draft-') || key.startsWith('python-beginner-draft-')) storage.removeItem(key);
  }
  storage.removeItem(STORAGE_KEY);
  storage.removeItem(VERIFIED_RUNS_KEY);
  storage.removeItem(SOLUTION_CLICKS_KEY);
  storage.removeItem('python-beginner-progress-v1');
  storage.removeItem('python-beginner-verified-runs-v1');
  storage.removeItem('python-beginner-solution-clicks-v1');
  storage.removeItem(CERTIFICATE_NAME_KEY);
  storage.removeItem('python-project-library-active');
  storage.removeItem('python-beginner-active-v1');
  storage.removeItem(ACTIVE_TRACK_KEY);
}
let activeTrackId = trackIds.includes(storage.getItem(ACTIVE_TRACK_KEY)) ? storage.getItem(ACTIVE_TRACK_KEY) : 'project2certificate';
let activeId = storage.getItem(tracks[activeTrackId].keys.active) || tracks[activeTrackId].lessons[0].id;
const expandedPathByTrack = Object.fromEntries(trackIds.map(id => [id, null]));
filter.value = activeTrackId === 'beginner' ? 'Beginner' : 'all';
let language = storage.getItem('python-project-library-language') || 'en';
if (!copy[language]) language = 'en';
let theme = storage.getItem('python-project-library-theme') || 'light';
if (!['light', 'dark'].includes(theme)) theme = 'light';
let completed = loadProgress();
let verifiedRuns = loadVerifiedRuns();
let solutionClicks = Math.max(0, Number.parseInt(storage.getItem(tracks[activeTrackId].keys.solutionClicks) || '0', 10) || 0);
let worker;
let runTimer;
let currentOutput;
let activeRun;

function currentTrack() {
  return tracks[activeTrackId];
}

function currentLessons() {
  return currentTrack().lessons;
}

function currentKeys() {
  return currentTrack().keys;
}

function draftKey(lessonId) {
  return activeTrackId === 'beginner'
    ? `python-beginner-draft-${lessonId}`
    : `python-project-draft-${lessonId}`;
}

function t(key, values = {}) {
  return copy[language][key].replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
}

function localizedLesson(lesson) {
  return { ...lesson, ...(copy[language].lesson?.[lesson.id] || {}) };
}

function applyPreferences() {
  const strings = copy[language];
  document.documentElement.lang = language;
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0d1420' : '#f5f7fb';
  document.title = `${strings.title} | Thu Rein Oo`;
  languageSelect.value = language;
  document.querySelector('#language-label').textContent = strings.language;
  document.querySelector('#theme-toggle').setAttribute('aria-label', strings.theme);
  for (const mode of ['light', 'dark']) {
    const button = document.querySelector(`#${mode}-mode`);
    button.setAttribute('aria-pressed', String(theme === mode));
    button.title = strings[mode];
    button.querySelector('span').textContent = strings[mode];
  }

  const labels = {
    '#skip-to-lesson': 'skipToLesson',
    '#brand-title': 'title', '#brand-tagline': 'tagline', '#browser-note': 'browserNote',
    '#workshop-label': 'workshop', '#project-paths-title': 'projectPaths', '#filter-label': 'filter', '#all-levels-option': 'allLevels',
    '#beginner-level-option': 'beginnerOnly', '#small-level-option': 'small', '#medium-level-option': 'medium', '#large-level-option': 'large', '#search-label': 'search',
    '#local-python-label': 'runsLocally', '#breadcrumb-label': 'projectLibrary', '#clear-progress-title': 'clearTitle',
    '#clear-progress-description': 'clearDescription', '#cancel-clear': 'cancel', '#confirm-clear': 'clear',
    '#footer-made': 'footerMade', '#footer-safety': 'footerSafety', '#certificate-unlocked': 'certificateReady',
    '#progress-menu-label': 'transferProgress', '#export-progress': 'exportProgress', '#import-progress-label': 'importProgress',
    '#progress-export-note': 'progressExportNote',
    '#star-repository-label': 'starRepository',
    '#learner-dialog-title': 'learnerWelcomeTitle', '#learner-dialog-copy': 'learnerWelcomeCopy',
    '#learner-name-label': 'learnerNameLabel', '#learner-privacy-copy': 'learnerPrivacyCopy',
    '#change-learner': 'changeLearner', '#save-learner': 'continueLearning', '#cancel-learner': 'cancel',
    '#certificate-button': 'getCertificate',
    '#certificate-title': 'certificateTitle', '#certificate-issuer': 'certificateIssuer', '#certificate-intro': 'certificateIntro',
    '#certificate-project-label': 'certificateProjectLabel', '#certificate-verified-label': 'certificateVerifiedLabel', '#certificate-solution-label': 'certificateSolutionLabel',
    '#certificate-issued-label': 'certificateIssuedLabel', '#certificate-note': 'certificateNote',
    '#close-certificate': 'closeCertificate', '#print-certificate': 'printCertificate'
  };
  for (const [selector, key] of Object.entries(labels)) document.querySelector(selector).textContent = strings[key];
  document.querySelector('#beginner-track-label').textContent = strings.trackBeginner;
  document.querySelector('#beginner-track-description').textContent = strings.trackBeginnerDescription;
  document.querySelector('#project-track-label').textContent = strings.trackProjectCertificate;
  document.querySelector('#project-track-description').textContent = strings.trackProjectDescription;
  document.querySelector('#mobile-lesson-menu-label').textContent = strings.lessonMenu;
  document.querySelector('#beginner-track-button').setAttribute('aria-pressed', String(activeTrackId === 'beginner'));
  document.querySelector('#project-track-button').setAttribute('aria-pressed', String(activeTrackId === 'project2certificate'));
  document.querySelector('#beginner-track-button').closest('.track-choice').dataset.active = String(activeTrackId === 'beginner');
  document.querySelector('#project-track-button').closest('.track-choice').dataset.active = String(activeTrackId === 'project2certificate');
  document.querySelector('.academy-track-picker').setAttribute('aria-label', strings.projectPaths);
  document.querySelector('.library-panel').setAttribute('aria-label', strings.title);
  document.querySelector('#breadcrumb-label').textContent = strings[currentTrack().titleKey];
  document.querySelector('#filter-label').textContent = activeTrackId === 'beginner' ? strings.filterByLevel : strings.filter;
  document.querySelector('#beginner-level-option').hidden = activeTrackId !== 'beginner';
  document.querySelector('#clear-progress-description').textContent = activeTrackId === 'beginner' ? strings.clearBeginnerDescription : strings.clearDescription;
  search.placeholder = activeTrackId === 'beginner' ? strings.findLesson : strings.findProject;
  document.querySelector('#search-label').textContent = search.placeholder;
  document.querySelector('#lesson-list').setAttribute('aria-label', activeTrackId === 'beginner' ? strings.beginnerList : strings.projectList);
  document.querySelector('#level-filter').setAttribute('aria-label', activeTrackId === 'beginner' ? strings.filterByLevel : strings.filter);
  const reset = document.querySelector('#reset-progress');
  reset.title = strings.clearProgress;
  reset.setAttribute('aria-label', strings.clearProgress);
  const progressMenuButton = document.querySelector('#progress-menu-button');
  progressMenuButton.title = strings.transferProgress;
  progressMenuButton.setAttribute('aria-label', strings.transferProgress);
  document.querySelector('#learner-name-display').textContent = learnerName;
  document.querySelector('#change-learner').hidden = !learnerName;
  saveProgress();
  document.querySelector('#browser-note').textContent = sessionOnly ? strings.sessionOnlyNotice : strings.browserNote;
  renderCertificate();
}

function loadProgress() {
  return loadTrackProgress(currentTrack());
}

function loadTrackProgress(track) {
  try {
    const saved = JSON.parse(storage.getItem(track.keys.completed) || '[]');
    const lessonIds = new Set(track.lessons.map(lesson => lesson.id));
    return new Set(Array.isArray(saved) ? saved.filter(id => lessonIds.has(id)) : []);
  } catch {
    return new Set();
  }
}

function loadVerifiedRuns() {
  try {
    const saved = JSON.parse(storage.getItem(currentKeys().verifiedRuns) || '[]');
    return new Set(Array.isArray(saved) ? saved.filter(id => currentLessons().some(lesson => lesson.id === id)) : []);
  } catch {
    return new Set();
  }
}

function saveProgress() {
  storage.setItem(currentKeys().completed, JSON.stringify([...completed]));
  progressCount.textContent = t('progress', { done: completed.size, total: currentLessons().length });
  renderTrackProgress();
  renderPathProgress();
  updateCertificateAccess();
}

function renderTrackProgress() {
  for (const [trackId, track] of Object.entries(tracks)) {
    const trackCompleted = trackId === activeTrackId ? completed : loadTrackProgress(track);
    const done = trackCompleted.size;
    const total = track.lessons.length;
    const label = t(track.titleKey);
    const progressLabel = t('progress', { done, total });
    const prefix = trackId === 'beginner' ? 'beginner' : 'project';
    const progress = document.querySelector(`#${prefix}-track-progress`);
    const count = document.querySelector(`#${prefix}-track-count`);
    const resumeLesson = getResumeLesson(trackId);
    const resumeTitle = localizedLesson(resumeLesson).title;
    const continueLabel = done === total ? t('reviewCourse') : t('continueLearning');
    progress.max = total;
    progress.value = done;
    progress.setAttribute('aria-label', `${label}: ${progressLabel}`);
    count.textContent = progressLabel;
    document.querySelector(`#${prefix}-continue-label`).textContent = continueLabel;
    document.querySelector(`#${prefix}-next-lesson`).textContent = resumeTitle;
  }
  const currentProgress = t('progress', { done: completed.size, total: currentLessons().length });
  document.querySelector('#mobile-lesson-count').textContent = currentProgress;
  mobileLessonMenu.setAttribute('aria-label', `${t('lessonMenu')}. ${currentProgress}`);
}

function getResumeLesson(trackId) {
  const track = tracks[trackId];
  const trackCompleted = trackId === activeTrackId ? completed : loadTrackProgress(track);
  const lastActiveId = storage.getItem(track.keys.active);
  const lastActive = track.lessons.find(lesson => lesson.id === lastActiveId);
  if (lastActive && !trackCompleted.has(lastActive.id)) return lastActive;
  return track.lessons.find(lesson => !trackCompleted.has(lesson.id)) || track.lessons.at(-1);
}

function renderPathProgress() {
  const progress = document.querySelector('#path-progress');
  if (!progress) return;
  const path = currentTrack().paths.find(item => item.lessonIds.includes(activeId));
  if (!path) return;
  const done = path.lessonIds.filter(id => completed.has(id)).length;
  const total = path.lessonIds.length;
  const pathName = t(path.label);
  const count = t('progress', { done, total });
  document.querySelector('#path-progress-name').textContent = pathName;
  document.querySelector('#path-progress-count').textContent = count;
  progress.max = total;
  progress.value = done;
  progress.setAttribute('aria-label', `${pathName}: ${count}`);
}

function saveVerifiedRuns() {
  storage.setItem(currentKeys().verifiedRuns, JSON.stringify([...verifiedRuns]));
  updateCertificateAccess();
  renderCertificate();
}

function updateCertificateAccess() {
  const certificateAccess = document.querySelector('#certificate-access');
  if (!currentTrack().certificate) {
    certificateAccess.hidden = true;
    return;
  }
  const allCompleted = completed.size === currentLessons().length;
  const allVerified = verifiedRuns.size === currentLessons().length;
  certificateAccess.hidden = !allCompleted;
  document.querySelector('#certificate-unlocked').textContent = allVerified ? t('certificateReady') : t('certificateVerificationPending');
  document.querySelector('#certificate-button').disabled = !allVerified;
  document.querySelector('#star-repository-link').hidden = !allVerified;
}

function renderCertificate() {
  if (!currentTrack().certificate) return;
  document.querySelector('#certificate-recipient').textContent = learnerName || t('certificateRecipientPlaceholder');
  document.querySelector('#certificate-completed-copy').textContent = t('certificateCompleted', { total: currentLessons().length });
  document.querySelector('#certificate-project-count').textContent = String(completed.size);
  document.querySelector('#certificate-verified-count').textContent = String(verifiedRuns.size);
  document.querySelector('#certificate-solution-count').textContent = String(solutionClicks);
  const locales = { en: 'en-US', my: 'my-MM', th: 'th-TH' };
  document.querySelector('#certificate-date').textContent = new Intl.DateTimeFormat(locales[language], {
    year: 'numeric', month: 'long', day: 'numeric'
  }).format(new Date());
  document.querySelector('#print-certificate').disabled = !learnerName.trim();
}

function hasChangedStarter(sourceLesson, editor) {
  const code = editor.value.trim();
  return code.length > 0 && code !== sourceLesson.code.trim();
}

function syncCompletionControl(sourceLesson, editor) {
  const verified = verifiedRuns.has(sourceLesson.id) && hasChangedStarter(sourceLesson, editor);
  const button = document.querySelector('#next-project');
  button.disabled = !verified;
  button.textContent = completed.has(sourceLesson.id)
    ? (verified ? t('completed') : t('verifyFirst'))
    : (verified ? t('markComplete') : t('verifyFirst'));
  const message = currentTrack().certificate ? (verified ? 'readyToComplete' : 'editRunToComplete') : (verified ? 'readyToCompleteLesson' : 'editRunToCompleteLesson');
  document.querySelector('#completion-requirement').textContent = t(message);
}

function visibleLessons() {
  const level = filter.value;
  const query = search.value.trim().toLowerCase();
  return currentLessons().filter(lesson => {
    const text = localizedLesson(lesson);
    return (level === 'all' || lesson.level === level)
      && `${text.title} ${text.topic} ${text.summary}`.toLowerCase().includes(query);
  });
}

function renderList() {
  lessonList.replaceChildren();
  const visible = visibleLessons();
  for (const path of currentTrack().paths) {
    const groupLessons = path.lessonIds.map(id => visible.find(lesson => lesson.id === id)).filter(Boolean);
    if (!groupLessons.length) continue;
    const group = document.createElement('details');
    group.className = 'track-group';
    group.open = expandedPathByTrack[activeTrackId] === path.id;
    const heading = document.createElement('summary');
    heading.className = 'track-title';
    heading.innerHTML = `<span>${t(path.label)}</span><small>${groupLessons.length}</small>`;
    heading.addEventListener('click', () => {
      if (group.open) {
        expandedPathByTrack[activeTrackId] = null;
        return;
      }
      expandedPathByTrack[activeTrackId] = path.id;
      lessonList.querySelectorAll('.track-group[open]').forEach(openGroup => {
        if (openGroup !== group) openGroup.open = false;
      });
    });
    group.append(heading);
    groupLessons.forEach(lesson => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'lesson-item';
      button.setAttribute('aria-current', lesson.id === activeId ? 'page' : 'false');
      button.innerHTML = `<span class="lesson-number">${String(currentLessons().indexOf(lesson) + 1).padStart(2, '0')}</span><span class="lesson-name"></span><span class="lesson-check">${completed.has(lesson.id) ? '✓' : ''}</span>`;
      button.querySelector('.lesson-name').textContent = localizedLesson(lesson).title;
      button.addEventListener('click', () => selectLesson(lesson.id));
      group.append(button);
    });
    lessonList.append(group);
  }
  if (!visible.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = t(activeTrackId === 'beginner' ? 'noBeginnerMatches' : 'noMatches');
    lessonList.append(empty);
  }
}

function renderLesson() {
  setEditorExpanded(false);
  const lessonsForTrack = currentLessons();
  const sourceLesson = lessonsForTrack.find(item => item.id === activeId) || lessonsForTrack[0];
  const lesson = localizedLesson(sourceLesson);
  activeId = lesson.id;
  storage.setItem(currentKeys().active, activeId);
  renderTrackProgress();
  document.querySelector('#crumb-title').textContent = lesson.title;
  const goals = lesson.goals.map(goal => `<li>${escapeHtml(goal)}</li>`).join('');
  lessonContent.innerHTML = `
    <header class="lesson-header">
      <div class="lesson-title-block"><h2>${escapeHtml(lesson.title)}</h2><p>${escapeHtml(lesson.summary)}</p></div>
      <div class="lesson-badges"><span class="badge level-${lesson.level.toLowerCase()}">${t(lesson.level.toLowerCase())} ${t(currentTrack().lessonLabel)}</span><span class="badge">${lesson.duration}</span><span class="badge">${escapeHtml(lesson.topic)}</span></div>
      <div class="lesson-path-progress"><div class="lesson-path-progress-labels"><strong id="path-progress-name"></strong><span id="path-progress-count"></span></div><progress id="path-progress" max="1" value="0" aria-label=""></progress></div>
    </header>
    <div class="learning-grid">
      <div class="brief-panel">
        <section class="brief-section"><h3>${t('practice')}</h3><ul>${goals}</ul></section>
        <section class="brief-section"><h3>${t('challenge')}</h3><p>${escapeHtml(lesson.task)}</p></section>
        <section class="brief-section coach-note"><h3>${t('hint')}</h3><p>${escapeHtml(lesson.hint)}</p></section>
      </div>
      <section class="editor-panel" id="code-editor-panel" aria-label="${t('editor')}">
        <div class="editor-head"><div class="editor-title"><span class="file-name">main.py</span><span class="editor-shortcut">${t('runShortcut')}</span></div><div class="editor-controls"><button type="button" class="editor-button" id="reset-code">${t('reset')}</button><button type="button" class="editor-button" id="expand-editor" aria-label="${t('expandEditor')}" title="${t('expandEditor')}" aria-expanded="false" aria-controls="code-editor-panel"><span class="expand-icon" aria-hidden="true">⛶</span><span class="editor-expand-label">${t('expandEditor')}</span></button><button type="button" class="editor-button run" id="run-code">▶ ${t('run')}</button></div></div>
        <label class="sr-only" for="code-editor">${t('editor')}</label><textarea class="editor" id="code-editor" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"></textarea>
        <div class="output-head"><span>${t('output')}</span><span class="output-status" id="output-status" role="status" aria-live="polite" aria-atomic="true">${t('ready')}</span></div>
        <pre class="output empty" id="output">${t('runToOutput')}</pre>
      </section>
    </div>
    <details class="solution-panel">
      <summary>${t('showSolution')}</summary>
      <pre class="solution-code"></pre>
    </details>
    <div class="lesson-navigation"><button type="button" class="button" id="previous-project">${t('previous')}</button><span class="lesson-position">${lessonsForTrack.indexOf(sourceLesson) + 1} ${t('of')} ${lessonsForTrack.length}</span><button type="button" class="button primary" id="next-project"></button></div>
    <p class="completion-requirement" id="completion-requirement" aria-live="polite"></p>`;

  document.querySelector('.solution-code').textContent = currentTrack().solutions[lesson.id];
  renderPathProgress();
  const solutionPanel = document.querySelector('.solution-panel');
  solutionPanel.querySelector('summary').addEventListener('click', () => {
    solutionClicks += 1;
    storage.setItem(currentKeys().solutionClicks, String(solutionClicks));
    renderCertificate();
  });
  solutionPanel.addEventListener('toggle', () => {
    solutionPanel.querySelector('summary').textContent = t(solutionPanel.open ? 'hideSolution' : 'showSolution');
  });
  const editor = document.querySelector('#code-editor');
  const savedDraft = storage.getItem(draftKey(lesson.id));
  editor.value = savedDraft ?? lesson.code;
  syncCompletionControl(sourceLesson, editor);
  currentOutput = document.querySelector('#output');
  const runButton = document.querySelector('#run-code');

  editor.addEventListener('input', () => {
    storage.setItem(draftKey(lesson.id), editor.value);
    if (verifiedRuns.delete(sourceLesson.id)) saveVerifiedRuns();
    syncCompletionControl(sourceLesson, editor);
  });
  editor.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      editor.setRangeText('    ', start, end, 'end');
      editor.dispatchEvent(new Event('input', { bubbles: true }));
    } else if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      runButton.click();
    }
  });
  document.querySelector('#reset-code').addEventListener('click', () => {
    editor.value = lesson.code;
    editor.dispatchEvent(new Event('input', { bubbles: true }));
    showOutput(t('ready'), t('runToOutput'), false);
  });
  document.querySelector('#expand-editor').addEventListener('click', () => {
    setEditorExpanded(!document.querySelector('#code-editor-panel').classList.contains('is-expanded'));
  });
  runButton.addEventListener('click', () => runCode(editor.value, runButton));
  document.querySelector('#previous-project').disabled = lessonsForTrack.indexOf(sourceLesson) === 0;
  document.querySelector('#previous-project').addEventListener('click', () => navigate(-1));
  document.querySelector('#next-project').addEventListener('click', () => {
    if (!verifiedRuns.has(sourceLesson.id) || !hasChangedStarter(sourceLesson, editor)) return;
    completed.add(lesson.id);
    saveProgress();
    renderList();
    if (lessonsForTrack.indexOf(sourceLesson) < lessonsForTrack.length - 1) navigate(1);
    else document.querySelector('#next-project').textContent = t(currentTrack().certificate ? 'allComplete' : 'allLessonsComplete');
  });
  renderList();
}

function selectLesson(id) {
  if (worker) worker.terminate();
  worker = null;
  activeRun = null;
  clearTimeout(runTimer);
  activeId = id;
  expandedPathByTrack[activeTrackId] = currentTrack().paths.find(path => path.lessonIds.includes(id))?.id || null;
  setMobileLessonMenu(false);
  renderLesson();
  scrollToLessonOnMobile();
}

function selectTrack(id, { fromHistory = false } = {}) {
  if (!tracks[id]) return;
  if (worker) worker.terminate();
  worker = null;
  activeRun = null;
  clearTimeout(runTimer);
  if (id !== activeTrackId) {
    if (!fromHistory) history.pushState({ academyTrackId: id }, '', window.location.href);
    activeTrackId = id;
    storage.setItem(ACTIVE_TRACK_KEY, activeTrackId);
    completed = loadProgress();
    verifiedRuns = loadVerifiedRuns();
    solutionClicks = Math.max(0, Number.parseInt(storage.getItem(currentKeys().solutionClicks) || '0', 10) || 0);
  }
  activeId = getResumeLesson(activeTrackId).id;
  storage.setItem(currentKeys().active, activeId);
  filter.value = activeTrackId === 'beginner' ? 'Beginner' : 'all';
  search.value = '';
  setMobileLessonMenu(false);
  applyPreferences();
  renderList();
  renderLesson();
  scrollToLessonOnMobile();
}

function setMobileLessonMenu(open) {
  mobileLessonMenu.setAttribute('aria-expanded', String(open));
  lessonList.classList.toggle('mobile-open', open);
}

function scrollToLessonOnMobile() {
  if (!window.matchMedia('(max-width: 680px)').matches) return;
  lessonContent.focus({ preventScroll: true });
  lessonContent.scrollIntoView({ block: 'start' });
}

function setEditorExpanded(expanded) {
  const panel = document.querySelector('#code-editor-panel');
  const button = document.querySelector('#expand-editor');
  if (!panel || !button) return;
  panel.classList.toggle('is-expanded', expanded);
  document.body.classList.toggle('editor-expanded', expanded);
  button.setAttribute('aria-expanded', String(expanded));
  const label = t(expanded ? 'collapseEditor' : 'expandEditor');
  button.setAttribute('aria-label', label);
  button.title = label;
  button.querySelector('.editor-expand-label').textContent = label;
}

function navigate(offset) {
  const lessonsForTrack = currentLessons();
  const index = lessonsForTrack.findIndex(lesson => lesson.id === activeId);
  const next = lessonsForTrack[Math.max(0, Math.min(lessonsForTrack.length - 1, index + offset))];
  selectLesson(next.id);
}

function createWorker() {
  worker = new Worker('./python-worker.js', { type: 'module' });
  worker.addEventListener('message', event => {
    const { type, output } = event.data;
    if (type === 'ready') {
      clearTimeout(runTimer);
      showOutput(t('running'), t('pythonRunning'), false);
      runTimer = setTimeout(() => {
        worker?.terminate();
        worker = null;
        activeRun = null;
        showOutput(t('stopped'), t('runStopped'), true);
        document.querySelector('#run-code').disabled = false;
      }, 12000);
      return;
    }
    clearTimeout(runTimer);
    if (type === 'done' && activeRun?.trackId === activeTrackId && activeRun.lessonId === activeId && activeRun.changed
      && document.querySelector('#code-editor')?.value === activeRun.code) {
      verifiedRuns.add(activeRun.lessonId);
      saveVerifiedRuns();
      const sourceLesson = currentLessons().find(lesson => lesson.id === activeRun.lessonId);
      syncCompletionControl(sourceLesson, document.querySelector('#code-editor'));
    }
    activeRun = null;
    showOutput(type === 'error' ? t('error') : t('finished'), output || t('noOutput'), type === 'error');
    document.querySelector('#run-code').disabled = false;
  });
  worker.addEventListener('error', event => {
    clearTimeout(runTimer);
    activeRun = null;
    showOutput(t('error'), t('runtimeError'), true);
    worker?.terminate();
    worker = null;
    document.querySelector('#run-code').disabled = false;
  });
}

function runCode(code, button) {
  if (!worker) createWorker();
  const sourceLesson = currentLessons().find(lesson => lesson.id === activeId);
  activeRun = { trackId: activeTrackId, lessonId: activeId, code, changed: code.trim().length > 0 && code.trim() !== sourceLesson.code.trim() };
  button.disabled = true;
  showOutput(t('startingPython'), t('loadingPython'), false);
  worker.postMessage({ type: 'run', code });
  clearTimeout(runTimer);
  runTimer = setTimeout(() => {
    worker?.terminate();
    worker = null;
    activeRun = null;
    showOutput(t('timedOut'), t('loadTimedOut'), true);
    button.disabled = false;
  }, 90000);
}

function showOutput(status, text, isError) {
  const statusNode = document.querySelector('#output-status');
  if (!statusNode || !currentOutput) return;
  statusNode.textContent = status;
  statusNode.classList.toggle('error', isError);
  currentOutput.textContent = text;
  currentOutput.classList.toggle('empty', !isError && status === 'Ready');
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

filter.addEventListener('change', () => {
  renderList();
  if (window.matchMedia('(max-width: 680px)').matches) setMobileLessonMenu(true);
});
search.addEventListener('input', () => {
  renderList();
  if (search.value.trim() && window.matchMedia('(max-width: 680px)').matches) setMobileLessonMenu(true);
});
mobileLessonMenu.addEventListener('click', () => {
  setMobileLessonMenu(mobileLessonMenu.getAttribute('aria-expanded') !== 'true');
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.body.classList.contains('editor-expanded') && !document.querySelector('dialog[open]')) setEditorExpanded(false);
});
document.querySelector('#beginner-track-button').addEventListener('click', () => selectTrack('beginner'));
document.querySelector('#project-track-button').addEventListener('click', () => selectTrack('project2certificate'));
history.replaceState({ academyTrackId: activeTrackId }, '', window.location.href);
window.addEventListener('popstate', event => {
  const trackId = event.state?.academyTrackId;
  if (tracks[trackId]) selectTrack(trackId, { fromHistory: true });
});
languageSelect.addEventListener('change', () => {
  language = languageSelect.value;
  storage.setItem('python-project-library-language', language);
  if (worker) worker.terminate();
  worker = null;
  clearTimeout(runTimer);
  applyPreferences();
  renderList();
  renderLesson();
});
document.querySelector('#light-mode').addEventListener('click', () => setTheme('light'));
document.querySelector('#dark-mode').addEventListener('click', () => setTheme('dark'));
document.querySelector('#certificate-button').addEventListener('click', () => {
  renderCertificate();
  certificateDialog.showModal();
});
document.querySelector('#close-certificate').addEventListener('click', () => certificateDialog.close());
document.querySelector('#print-certificate').addEventListener('click', () => window.print());

document.querySelector('#change-learner').addEventListener('click', () => {
  learnerNameInput.value = learnerName;
  document.querySelector('#cancel-learner').hidden = false;
  learnerDialog.showModal();
  learnerNameInput.focus();
});

document.querySelector('#export-progress').addEventListener('click', () => {
  const drafts = {};
  for (const lesson of currentLessons()) {
    const draft = storage.getItem(draftKey(lesson.id));
    if (draft !== null) drafts[lesson.id] = draft;
  }
  const backup = createProgressBackup({
    trackId: activeTrackId,
    learnerName,
    completed,
    verifiedRuns,
    solutionClicks,
    drafts,
    activeId,
    language,
    theme
  });
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `python-learning-${activeTrackId}-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#progress-menu').open = false;
});

document.querySelector('#import-progress-file').addEventListener('change', async event => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    if (file.size > 2 * 1024 * 1024) {
      window.alert(t('importTooLarge'));
      return;
    }
    const backup = validateProgressBackup(JSON.parse(await file.text()), currentLessons().map(lesson => lesson.id), activeTrackId);
    if (!window.confirm(t('importConfirm'))) return;

    if (backup.learnerName !== learnerName) resetLearnerData();
    for (const lesson of currentLessons()) storage.removeItem(draftKey(lesson.id));
    learnerName = backup.learnerName;
    completed = new Set(backup.completed);
    verifiedRuns = new Set(backup.verifiedRuns);
    solutionClicks = backup.solutionClicks;
    activeId = backup.activeId;
    language = backup.language;
    theme = backup.theme;
    storage.setItem(LEARNER_NAME_KEY, learnerName);
    storage.setItem(currentKeys().completed, JSON.stringify([...completed]));
    storage.setItem(currentKeys().verifiedRuns, JSON.stringify([...verifiedRuns]));
    storage.setItem(currentKeys().solutionClicks, String(solutionClicks));
    storage.setItem(currentKeys().active, activeId);
    storage.setItem(ACTIVE_TRACK_KEY, activeTrackId);
    storage.setItem('python-project-library-language', language);
    storage.setItem('python-project-library-theme', theme);
    for (const [id, code] of Object.entries(backup.drafts)) {
      storage.setItem(draftKey(id), code);
    }
    applyPreferences();
    renderList();
    renderLesson();
    if (learnerDialog.open) learnerDialog.close();
    window.alert(t('importComplete'));
  } catch {
    window.alert(t('importFailed'));
  } finally {
    event.target.value = '';
    document.querySelector('#progress-menu').open = false;
  }
});

document.querySelector('#cancel-learner').addEventListener('click', () => {
  if (learnerName) learnerDialog.close();
});
document.querySelector('#learner-form').addEventListener('submit', event => {
  event.preventDefault();
  const nextName = learnerNameInput.value.trim();
  if (!nextName) {
    learnerNameInput.reportValidity();
    return;
  }
  if (nextName !== learnerName) resetLearnerData();
  learnerName = nextName;
  storage.setItem(LEARNER_NAME_KEY, learnerName);
  document.querySelector('#cancel-learner').hidden = !learnerName;
  applyPreferences();
  renderList();
  renderLesson();
  learnerDialog.close();
});

function setTheme(nextTheme) {
  const root = document.documentElement;
  root.classList.add('theme-changing');
  theme = nextTheme;
  storage.setItem('python-project-library-theme', theme);
  applyPreferences();
  requestAnimationFrame(() => root.classList.remove('theme-changing'));
}

document.querySelector('#reset-progress').addEventListener('click', async () => {
  if (!confirmDialog.showModal) {
    if (window.confirm(t('clearDescription'))) clearProgress();
    return;
  }
  confirmDialog.showModal();
  const result = await new Promise(resolve => confirmDialog.addEventListener('close', () => resolve(confirmDialog.returnValue), { once: true }));
  if (result === 'confirm') clearProgress();
});

function clearProgress() {
  completed = new Set();
  verifiedRuns = new Set();
  storage.removeItem(currentKeys().completed);
  storage.removeItem(currentKeys().verifiedRuns);
  saveProgress();
  renderList();
  renderLesson();
}

function resetLearnerData() {
  for (const key of storage.keys()) {
    if (key.startsWith('python-project-draft-') || key.startsWith('python-beginner-draft-')) storage.removeItem(key);
  }
  storage.removeItem(STORAGE_KEY);
  storage.removeItem(VERIFIED_RUNS_KEY);
  storage.removeItem(SOLUTION_CLICKS_KEY);
  storage.removeItem('python-beginner-progress-v1');
  storage.removeItem('python-beginner-verified-runs-v1');
  storage.removeItem('python-beginner-solution-clicks-v1');
  storage.removeItem(CERTIFICATE_NAME_KEY);
  storage.removeItem('python-project-library-active');
  storage.removeItem('python-beginner-active-v1');
  completed = new Set();
  verifiedRuns = new Set();
  solutionClicks = 0;
  activeId = currentLessons()[0].id;
}

applyPreferences();
renderLesson();
if (!learnerName) {
  document.querySelector('#cancel-learner').hidden = true;
  learnerDialog.showModal();
  learnerNameInput.focus();
}
