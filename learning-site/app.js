import { lessons } from './lessons.js';
import { solutions } from './solutions.js';
import { copy } from './i18n.js?v=learner-profile-3';

const STORAGE_KEY = 'python-project-library-progress-v1';
const SOLUTION_CLICKS_KEY = 'python-project-library-solution-clicks-v1';
const CERTIFICATE_NAME_KEY = 'python-project-library-certificate-name-v1';
const VERIFIED_RUNS_KEY = 'python-project-library-verified-runs-v1';
const LEARNER_NAME_KEY = 'python-project-library-learner-name-v1';
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
    if (key.startsWith('python-project-draft-')) storage.removeItem(key);
  }
  storage.removeItem(STORAGE_KEY);
  storage.removeItem(VERIFIED_RUNS_KEY);
  storage.removeItem(SOLUTION_CLICKS_KEY);
  storage.removeItem(CERTIFICATE_NAME_KEY);
  storage.removeItem('python-project-library-active');
}
let activeId = storage.getItem('python-project-library-active') || lessons[0].id;
let language = storage.getItem('python-project-library-language') || 'en';
if (!copy[language]) language = 'en';
let theme = storage.getItem('python-project-library-theme') || 'light';
if (!['light', 'dark'].includes(theme)) theme = 'light';
let completed = loadProgress();
let verifiedRuns = loadVerifiedRuns();
let solutionClicks = Math.max(0, Number.parseInt(storage.getItem(SOLUTION_CLICKS_KEY) || '0', 10) || 0);
let worker;
let runTimer;
let currentOutput;
let activeRun;

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
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#121b17' : '#f4f7f3';
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
    '#brand-title': 'title', '#brand-tagline': 'tagline', '#browser-note': 'browserNote',
    '#workshop-label': 'workshop', '#project-paths-title': 'projectPaths', '#filter-label': 'filter', '#all-levels-option': 'allLevels',
    '#small-level-option': 'small', '#medium-level-option': 'medium', '#large-level-option': 'large', '#search-label': 'search',
    '#local-python-label': 'runsLocally', '#breadcrumb-label': 'projectLibrary', '#clear-progress-title': 'clearTitle',
    '#clear-progress-description': 'clearDescription', '#cancel-clear': 'cancel', '#confirm-clear': 'clear',
    '#footer-made': 'footerMade', '#footer-safety': 'footerSafety', '#certificate-unlocked': 'certificateReady',
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
  search.placeholder = strings.findProject;
  document.querySelector('#lesson-list').setAttribute('aria-label', strings.projectList);
  document.querySelector('#level-filter').setAttribute('aria-label', strings.filter);
  const reset = document.querySelector('#reset-progress');
  reset.title = strings.clearProgress;
  reset.setAttribute('aria-label', strings.clearProgress);
  document.querySelector('#learner-name-display').textContent = learnerName;
  document.querySelector('#change-learner').hidden = !learnerName;
  saveProgress();
  document.querySelector('#browser-note').textContent = sessionOnly ? strings.sessionOnlyNotice : strings.browserNote;
  renderCertificate();
}

function loadProgress() {
  try {
    const saved = JSON.parse(storage.getItem(STORAGE_KEY) || '[]');
    return new Set(Array.isArray(saved) ? saved.filter(id => lessons.some(lesson => lesson.id === id)) : []);
  } catch {
    return new Set();
  }
}

function loadVerifiedRuns() {
  try {
    const saved = JSON.parse(storage.getItem(VERIFIED_RUNS_KEY) || '[]');
    return new Set(Array.isArray(saved) ? saved.filter(id => lessons.some(lesson => lesson.id === id)) : []);
  } catch {
    return new Set();
  }
}

function saveProgress() {
  storage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  progressCount.textContent = t('progress', { done: completed.size, total: lessons.length });
  updateCertificateAccess();
}

function saveVerifiedRuns() {
  storage.setItem(VERIFIED_RUNS_KEY, JSON.stringify([...verifiedRuns]));
  updateCertificateAccess();
  renderCertificate();
}

function updateCertificateAccess() {
  const allCompleted = completed.size === lessons.length;
  const allVerified = verifiedRuns.size === lessons.length;
  document.querySelector('#certificate-access').hidden = !allCompleted;
  document.querySelector('#certificate-unlocked').textContent = allVerified ? t('certificateReady') : t('certificateVerificationPending');
  document.querySelector('#certificate-button').disabled = !allVerified;
}

function renderCertificate() {
  document.querySelector('#certificate-recipient').textContent = learnerName || t('certificateRecipientPlaceholder');
  document.querySelector('#certificate-completed-copy').textContent = t('certificateCompleted', { total: lessons.length });
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
  document.querySelector('#completion-requirement').textContent = verified ? t('readyToComplete') : t('editRunToComplete');
}

function visibleLessons() {
  const level = filter.value;
  const query = search.value.trim().toLowerCase();
  return lessons.filter(lesson => {
    const text = localizedLesson(lesson);
    return (level === 'all' || lesson.level === level)
      && `${text.title} ${text.topic} ${text.summary}`.toLowerCase().includes(query);
  });
}

function renderList() {
  lessonList.replaceChildren();
  const visible = visibleLessons();
  for (const level of ['Small', 'Medium', 'Large']) {
    const groupLessons = visible.filter(lesson => lesson.level === level);
    if (!groupLessons.length) continue;
    const group = document.createElement('div');
    group.className = 'track-group';
    const heading = document.createElement('div');
    heading.className = 'track-title';
    heading.innerHTML = `<span>${t(level.toLowerCase())} ${t('projects')}</span><small>${groupLessons.length}</small>`;
    group.append(heading);
    groupLessons.forEach(lesson => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'lesson-item';
      button.setAttribute('aria-current', lesson.id === activeId ? 'page' : 'false');
      button.innerHTML = `<span class="lesson-number">${String(lessons.indexOf(lesson) + 1).padStart(2, '0')}</span><span class="lesson-name"></span><span class="lesson-check">${completed.has(lesson.id) ? '✓' : ''}</span>`;
      button.querySelector('.lesson-name').textContent = localizedLesson(lesson).title;
      button.addEventListener('click', () => selectLesson(lesson.id));
      group.append(button);
    });
    lessonList.append(group);
  }
  if (!visible.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = t('noMatches');
    lessonList.append(empty);
  }
}

function renderLesson() {
  const sourceLesson = lessons.find(item => item.id === activeId) || lessons[0];
  const lesson = localizedLesson(sourceLesson);
  activeId = lesson.id;
  storage.setItem('python-project-library-active', activeId);
  document.querySelector('#crumb-title').textContent = lesson.title;
  const goals = lesson.goals.map(goal => `<li>${escapeHtml(goal)}</li>`).join('');
  lessonContent.innerHTML = `
    <header class="lesson-header">
      <div><h2>${escapeHtml(lesson.title)}</h2><p>${escapeHtml(lesson.summary)}</p></div>
      <div class="lesson-badges"><span class="badge level-${lesson.level.toLowerCase()}">${t(lesson.level.toLowerCase())} ${t('project')}</span><span class="badge">${lesson.duration}</span><span class="badge">${escapeHtml(lesson.topic)}</span></div>
    </header>
    <div class="learning-grid">
      <div class="brief-panel">
        <section class="brief-section"><h3>${t('practice')}</h3><ul>${goals}</ul></section>
        <section class="brief-section"><h3>${t('challenge')}</h3><p>${escapeHtml(lesson.task)}</p></section>
        <section class="brief-section coach-note"><h3>${t('hint')}</h3><p>${escapeHtml(lesson.hint)}</p></section>
      </div>
      <section class="editor-panel" aria-label="${t('editor')}">
        <div class="editor-head"><span class="file-name">main.py</span><div class="editor-controls"><button type="button" class="editor-button" id="reset-code">${t('reset')}</button><button type="button" class="editor-button run" id="run-code">▶ ${t('run')}</button></div></div>
        <label class="sr-only" for="code-editor">${t('editor')}</label><textarea class="editor" id="code-editor" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"></textarea>
        <div class="output-head"><span>${t('output')}</span><span class="output-status" id="output-status">${t('ready')}</span></div>
        <pre class="output empty" id="output">${t('runToOutput')}</pre>
      </section>
    </div>
    <details class="solution-panel">
      <summary>${t('showSolution')}</summary>
      <pre class="solution-code"></pre>
    </details>
    <div class="lesson-navigation"><button type="button" class="button" id="previous-project">${t('previous')}</button><span class="lesson-position">${lessons.indexOf(sourceLesson) + 1} ${t('of')} ${lessons.length}</span><button type="button" class="button primary" id="next-project"></button></div>
    <p class="completion-requirement" id="completion-requirement" aria-live="polite"></p>`;

  document.querySelector('.solution-code').textContent = solutions[lesson.id];
  const solutionPanel = document.querySelector('.solution-panel');
  solutionPanel.querySelector('summary').addEventListener('click', () => {
    solutionClicks += 1;
    storage.setItem(SOLUTION_CLICKS_KEY, String(solutionClicks));
    renderCertificate();
  });
  solutionPanel.addEventListener('toggle', () => {
    solutionPanel.querySelector('summary').textContent = t(solutionPanel.open ? 'hideSolution' : 'showSolution');
  });
  const editor = document.querySelector('#code-editor');
  const savedDraft = storage.getItem(`python-project-draft-${lesson.id}`);
  editor.value = savedDraft ?? lesson.code;
  syncCompletionControl(sourceLesson, editor);
  currentOutput = document.querySelector('#output');
  const runButton = document.querySelector('#run-code');

  editor.addEventListener('input', () => {
    storage.setItem(`python-project-draft-${lesson.id}`, editor.value);
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
  runButton.addEventListener('click', () => runCode(editor.value, runButton));
  document.querySelector('#previous-project').disabled = lessons.indexOf(sourceLesson) === 0;
  document.querySelector('#previous-project').addEventListener('click', () => navigate(-1));
  document.querySelector('#next-project').addEventListener('click', () => {
    if (!verifiedRuns.has(sourceLesson.id) || !hasChangedStarter(sourceLesson, editor)) return;
    completed.add(lesson.id);
    saveProgress();
    renderList();
    if (lessons.indexOf(sourceLesson) < lessons.length - 1) navigate(1);
    else document.querySelector('#next-project').textContent = t('allComplete');
  });
  renderList();
}

function selectLesson(id) {
  if (worker) worker.terminate();
  worker = null;
  activeRun = null;
  clearTimeout(runTimer);
  activeId = id;
  renderLesson();
}

function navigate(offset) {
  const index = lessons.findIndex(lesson => lesson.id === activeId);
  const next = lessons[Math.max(0, Math.min(lessons.length - 1, index + offset))];
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
    if (type === 'done' && activeRun?.lessonId === activeId && activeRun.changed
      && document.querySelector('#code-editor')?.value === activeRun.code) {
      verifiedRuns.add(activeRun.lessonId);
      saveVerifiedRuns();
      const sourceLesson = lessons.find(lesson => lesson.id === activeRun.lessonId);
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
  const sourceLesson = lessons.find(lesson => lesson.id === activeId);
  activeRun = { lessonId: activeId, code, changed: code.trim().length > 0 && code.trim() !== sourceLesson.code.trim() };
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

filter.addEventListener('change', renderList);
search.addEventListener('input', renderList);
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
  theme = nextTheme;
  storage.setItem('python-project-library-theme', theme);
  applyPreferences();
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
  storage.removeItem(STORAGE_KEY);
  storage.removeItem(VERIFIED_RUNS_KEY);
  saveProgress();
  renderList();
  renderLesson();
}

function resetLearnerData() {
  for (const key of storage.keys()) {
    if (key.startsWith('python-project-draft-')) storage.removeItem(key);
  }
  storage.removeItem(STORAGE_KEY);
  storage.removeItem(VERIFIED_RUNS_KEY);
  storage.removeItem(SOLUTION_CLICKS_KEY);
  storage.removeItem(CERTIFICATE_NAME_KEY);
  storage.removeItem('python-project-library-active');
  completed = new Set();
  verifiedRuns = new Set();
  solutionClicks = 0;
  activeId = lessons[0].id;
}

applyPreferences();
renderLesson();
if (!learnerName) {
  document.querySelector('#cancel-learner').hidden = true;
  learnerDialog.showModal();
  learnerNameInput.focus();
}
