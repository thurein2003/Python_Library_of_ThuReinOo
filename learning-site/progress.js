const MAX_DRAFT_CHARS = 1_000_000;

export function createProgressBackup(progress) {
  return {
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    learnerName: progress.learnerName,
    completed: [...progress.completed],
    verifiedRuns: [...progress.verifiedRuns],
    solutionClicks: progress.solutionClicks,
    drafts: { ...progress.drafts },
    activeId: progress.activeId,
    language: progress.language,
    theme: progress.theme
  };
}

export function validateProgressBackup(value, lessonIds) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || value.schemaVersion !== 1) {
    throw new Error('Unsupported progress file.');
  }
  const learnerName = typeof value.learnerName === 'string' ? value.learnerName.trim() : '';
  if (!learnerName || learnerName.length > 80) throw new Error('The learner name is invalid.');
  if (!Array.isArray(value.completed) || !Array.isArray(value.verifiedRuns)) {
    throw new Error('Progress lists are invalid.');
  }
  if (!Number.isSafeInteger(value.solutionClicks) || value.solutionClicks < 0) {
    throw new Error('The solution count is invalid.');
  }

  const knownIds = new Set(lessonIds);
  const cleanIds = list => [...new Set(list.filter(id => typeof id === 'string' && knownIds.has(id)))];
  const drafts = {};
  if (value.drafts !== undefined && (!value.drafts || typeof value.drafts !== 'object' || Array.isArray(value.drafts))) {
    throw new Error('Saved code drafts are invalid.');
  }
  let draftChars = 0;
  for (const [id, code] of Object.entries(value.drafts || {})) {
    if (!knownIds.has(id) || typeof code !== 'string') continue;
    draftChars += code.length;
    if (draftChars > MAX_DRAFT_CHARS) throw new Error('Saved code is too large.');
    drafts[id] = code;
  }

  return {
    learnerName,
    completed: cleanIds(value.completed),
    verifiedRuns: cleanIds(value.verifiedRuns),
    solutionClicks: value.solutionClicks,
    drafts,
    activeId: knownIds.has(value.activeId) ? value.activeId : lessonIds[0],
    language: ['en', 'my', 'th'].includes(value.language) ? value.language : 'en',
    theme: ['light', 'dark'].includes(value.theme) ? value.theme : 'light'
  };
}
