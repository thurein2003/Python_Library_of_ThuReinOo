import { lessons } from './lessons.js';
import { solutions } from './solutions.js';

const STORAGE_KEY = 'python-project-library-progress-v1';
const lessonList = document.querySelector('#lesson-list');
const lessonContent = document.querySelector('#lesson-content');
const filter = document.querySelector('#level-filter');
const search = document.querySelector('#project-search');
const progressCount = document.querySelector('#progress-count');
const confirmDialog = document.querySelector('#confirm-dialog');
let activeId = localStorage.getItem('python-project-library-active') || lessons[0].id;
let completed = loadProgress();
let worker;
let runTimer;
let currentOutput;

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return new Set(Array.isArray(saved) ? saved.filter(id => lessons.some(lesson => lesson.id === id)) : []);
  } catch {
    return new Set();
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  progressCount.textContent = `${completed.size} / ${lessons.length} complete`;
}

function visibleLessons() {
  const level = filter.value;
  const query = search.value.trim().toLowerCase();
  return lessons.filter(lesson => (level === 'all' || lesson.level === level)
    && `${lesson.title} ${lesson.topic} ${lesson.summary}`.toLowerCase().includes(query));
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
    heading.innerHTML = `<span>${level} projects</span><small>${groupLessons.length}</small>`;
    group.append(heading);
    groupLessons.forEach(lesson => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'lesson-item';
      button.setAttribute('aria-current', lesson.id === activeId ? 'page' : 'false');
      button.innerHTML = `<span class="lesson-number">${String(lessons.indexOf(lesson) + 1).padStart(2, '0')}</span><span class="lesson-name"></span><span class="lesson-check">${completed.has(lesson.id) ? '✓' : ''}</span>`;
      button.querySelector('.lesson-name').textContent = lesson.title;
      button.addEventListener('click', () => selectLesson(lesson.id));
      group.append(button);
    });
    lessonList.append(group);
  }
  if (!visible.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No projects match that search.';
    lessonList.append(empty);
  }
}

function renderLesson() {
  const lesson = lessons.find(item => item.id === activeId) || lessons[0];
  activeId = lesson.id;
  localStorage.setItem('python-project-library-active', activeId);
  document.querySelector('#crumb-title').textContent = lesson.title;
  const goals = lesson.goals.map(goal => `<li>${escapeHtml(goal)}</li>`).join('');
  lessonContent.innerHTML = `
    <header class="lesson-header">
      <div><h2>${escapeHtml(lesson.title)}</h2><p>${escapeHtml(lesson.summary)}</p></div>
      <div class="lesson-badges"><span class="badge level-${lesson.level.toLowerCase()}">${lesson.level} project</span><span class="badge">${lesson.duration}</span><span class="badge">${escapeHtml(lesson.topic)}</span></div>
    </header>
    <div class="learning-grid">
      <div class="brief-panel">
        <section class="brief-section"><h3>What you will practice</h3><ul>${goals}</ul></section>
        <section class="brief-section"><h3>Your challenge</h3><p>${escapeHtml(lesson.task)}</p></section>
        <section class="brief-section coach-note"><h3>Hint</h3><p>${escapeHtml(lesson.hint)}</p></section>
      </div>
      <section class="editor-panel" aria-label="Python code editor">
        <div class="editor-head"><span class="file-name">main.py</span><div class="editor-controls"><button type="button" class="editor-button" id="reset-code">Reset</button><button type="button" class="editor-button run" id="run-code">▶ Run</button></div></div>
        <label class="sr-only" for="code-editor">Python code</label><textarea class="editor" id="code-editor" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"></textarea>
        <div class="output-head"><span>OUTPUT</span><span class="output-status" id="output-status">Ready</span></div>
        <pre class="output empty" id="output">Run your program to see the result.</pre>
      </section>
    </div>
    <details class="solution-panel">
      <summary>Show solution</summary>
      <pre class="solution-code"></pre>
    </details>
    <div class="lesson-navigation"><button type="button" class="button" id="previous-project">← Previous</button><span class="lesson-position">${lessons.indexOf(lesson) + 1} of ${lessons.length}</span><button type="button" class="button primary" id="next-project">Next project →</button></div>`;

  document.querySelector('.solution-code').textContent = solutions[lesson.id];
  const editor = document.querySelector('#code-editor');
  const savedDraft = localStorage.getItem(`python-project-draft-${lesson.id}`);
  editor.value = savedDraft ?? lesson.code;
  currentOutput = document.querySelector('#output');
  const runButton = document.querySelector('#run-code');

  editor.addEventListener('input', () => localStorage.setItem(`python-project-draft-${lesson.id}`, editor.value));
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
    showOutput('Ready', 'Run your program to see the result.', false);
  });
  runButton.addEventListener('click', () => runCode(editor.value, runButton));
  document.querySelector('#previous-project').disabled = lessons.indexOf(lesson) === 0;
  document.querySelector('#next-project').textContent = completed.has(lesson.id) ? 'Completed ✓' : 'Mark complete →';
  document.querySelector('#previous-project').addEventListener('click', () => navigate(-1));
  document.querySelector('#next-project').addEventListener('click', () => {
    completed.add(lesson.id);
    saveProgress();
    renderList();
    if (lessons.indexOf(lesson) < lessons.length - 1) navigate(1);
    else document.querySelector('#next-project').textContent = 'All projects complete ✓';
  });
  renderList();
}

function selectLesson(id) {
  if (worker) worker.terminate();
  worker = null;
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
  worker = new Worker('./python-worker.js');
  worker.addEventListener('message', event => {
    const { type, output } = event.data;
    if (type === 'ready') {
      clearTimeout(runTimer);
      showOutput('Running…', 'Python is ready. Your code is running in this browser tab.', false);
      runTimer = setTimeout(() => {
        worker?.terminate();
        worker = null;
        showOutput('Stopped', 'This run took too long and was stopped. Check for an infinite loop, then try again.', true);
        document.querySelector('#run-code').disabled = false;
      }, 12000);
      return;
    }
    clearTimeout(runTimer);
    showOutput(type === 'error' ? 'Error' : 'Finished', output, type === 'error');
    document.querySelector('#run-code').disabled = false;
  });
  worker.addEventListener('error', event => {
    clearTimeout(runTimer);
    showOutput('Error', event.message || 'The Python runtime could not start. Check your connection and try again.', true);
    worker?.terminate();
    worker = null;
    document.querySelector('#run-code').disabled = false;
  });
}

function runCode(code, button) {
  if (!worker) createWorker();
  button.disabled = true;
  showOutput('Starting Python…', 'Loading the browser Python runtime. The first run may take a moment.', false);
  worker.postMessage({ type: 'run', code });
  clearTimeout(runTimer);
  runTimer = setTimeout(() => {
    worker?.terminate();
    worker = null;
    showOutput('Timed out', 'The Python runtime took too long to start. Check your connection and try again.', true);
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
document.querySelector('#reset-progress').addEventListener('click', async () => {
  if (!confirmDialog.showModal) {
    if (window.confirm('Clear completed-project marks saved in this browser?')) clearProgress();
    return;
  }
  confirmDialog.showModal();
  const result = await new Promise(resolve => confirmDialog.addEventListener('close', () => resolve(confirmDialog.returnValue), { once: true }));
  if (result === 'confirm') clearProgress();
});

function clearProgress() {
  completed = new Set();
  localStorage.removeItem(STORAGE_KEY);
  saveProgress();
  renderList();
  renderLesson();
}

saveProgress();
renderLesson();
