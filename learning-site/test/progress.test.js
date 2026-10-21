import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createProgressBackup, validateProgressBackup } from '../progress.js';

const ids = ['first-lesson', 'second-lesson'];

test('progress backup preserves profile, drafts, settings, and completion', () => {
  const source = {
    learnerName: 'Rin',
    completed: new Set(['first-lesson']),
    verifiedRuns: new Set(['first-lesson']),
    solutionClicks: 3,
    drafts: { 'first-lesson': 'print("hello")' },
    activeId: 'second-lesson',
    language: 'th',
    theme: 'dark'
  };
  const result = validateProgressBackup(createProgressBackup(source), ids);
  assert.equal(result.learnerName, source.learnerName);
  assert.deepEqual(result.completed, [...source.completed]);
  assert.deepEqual(result.verifiedRuns, [...source.verifiedRuns]);
  assert.deepEqual(result.drafts, source.drafts);
  assert.equal(result.activeId, source.activeId);
  assert.equal(result.language, source.language);
  assert.equal(result.theme, source.theme);
});

test('import drops unknown lesson IDs and falls back to safe settings', () => {
  const result = validateProgressBackup({
    schemaVersion: 1,
    learnerName: 'Rin',
    completed: ['first-lesson', 'removed-lesson'],
    verifiedRuns: ['removed-lesson'],
    solutionClicks: 0,
    drafts: { 'removed-lesson': 'ignored' },
    activeId: 'removed-lesson',
    language: 'xx',
    theme: 'neon'
  }, ids);
  assert.deepEqual(result.completed, ['first-lesson']);
  assert.deepEqual(result.verifiedRuns, []);
  assert.deepEqual(result.drafts, {});
  assert.equal(result.activeId, ids[0]);
  assert.equal(result.language, 'en');
  assert.equal(result.theme, 'light');
});

test('import rejects unsupported schema, empty names, and oversized drafts', () => {
  assert.throws(() => validateProgressBackup({ schemaVersion: 9 }, ids));
  assert.throws(() => validateProgressBackup({ schemaVersion: 1, learnerName: '  ' }, ids));
  assert.throws(() => validateProgressBackup({
    schemaVersion: 1,
    learnerName: 'Rin',
    completed: [],
    verifiedRuns: [],
    solutionClicks: 0,
    drafts: { 'first-lesson': 'x'.repeat(1_000_001) }
  }, ids));
});
