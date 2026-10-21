import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { lessons } from '../lessons.js';
import { additionalLessons } from '../additional-lessons.js';
import { solutions } from '../solutions.js';
import { copy } from '../i18n.js';
import { learningPaths, orderedLessonIds } from '../learning-path.js';

const lessonIds = lessons.map(lesson => lesson.id);

test('lesson IDs and required fields are complete and unique', () => {
  assert.equal(new Set(lessonIds).size, lessonIds.length, 'lesson IDs must be unique');
  for (const lesson of lessons) {
    assert.match(lesson.id, /^[a-z0-9-]+$/);
    assert.ok(['Small', 'Medium', 'Large'].includes(lesson.level), `${lesson.id} has an unknown level`);
    for (const field of ['title', 'duration', 'topic', 'summary', 'task', 'hint', 'code']) {
      assert.equal(typeof lesson[field], 'string', `${lesson.id} is missing ${field}`);
      assert.ok(lesson[field].trim(), `${lesson.id}.${field} must not be empty`);
    }
    assert.ok(Array.isArray(lesson.goals) && lesson.goals.length > 0, `${lesson.id} needs learning goals`);
  }
});

test('every lesson has exactly one non-empty solution', () => {
  assert.deepEqual(Object.keys(solutions).sort(), [...lessonIds].sort());
  for (const [id, solution] of Object.entries(solutions)) {
    assert.ok(solution.trim(), `${id} has an empty solution`);
  }
});

test('lesson starters and solutions parse as Python', () => {
  for (const lesson of lessons) {
    for (const [kind, source] of [['starter', lesson.code], ['solution', solutions[lesson.id]]]) {
      execFileSync('python3', ['-c', 'import ast, sys; ast.parse(sys.stdin.read())'], {
        input: source,
        encoding: 'utf8',
        stdio: ['pipe', 'ignore', 'pipe']
      });
      assert.ok(source, `${lesson.id} ${kind} should contain code`);
    }
  }
});

test('all added lessons are present in the library', () => {
  for (const lesson of additionalLessons) assert.ok(lessonIds.includes(lesson.id));
});

test('learning paths contain every lesson once and define the displayed order', () => {
  const pathIds = learningPaths.flatMap(path => path.lessonIds);
  assert.equal(new Set(pathIds).size, pathIds.length, 'a lesson must not appear in multiple paths');
  assert.deepEqual([...pathIds].sort(), [...lessonIds].sort());
  assert.deepEqual(orderedLessonIds, lessonIds);
  for (const path of learningPaths) {
    assert.ok(path.lessonIds.length > 0, `${path.id} must contain lessons`);
    for (const language of ['en', 'my', 'th']) {
      assert.ok(copy[language][path.label], `${language} is missing the ${path.id} label`);
    }
  }
});

test('all lesson starters and solutions run under Python in a temporary directory', () => {
  const workingDirectory = mkdtempSync(join(tmpdir(), 'python-library-lessons-'));
  try {
    for (const lesson of lessons) {
      for (const [kind, source] of [['starter', lesson.code], ['solution', solutions[lesson.id]]]) {
        if (lesson.id === 'debug-empty-scores' && kind === 'starter') {
          assert.throws(
            () => execFileSync('python3', ['-c', 'import sys; exec(compile(sys.stdin.read(), "<lesson>", "exec"))'], {
              cwd: workingDirectory,
              input: source,
              encoding: 'utf8',
              stdio: ['pipe', 'ignore', 'pipe'],
              timeout: 10_000
            }),
            error => error.stderr.includes('ZeroDivisionError')
          );
          continue;
        }
        execFileSync('python3', ['-c', 'import sys; exec(compile(sys.stdin.read(), "<lesson>", "exec"))'], {
          cwd: workingDirectory,
          input: source,
          encoding: 'utf8',
          stdio: ['pipe', 'ignore', 'pipe'],
          timeout: 10_000
        });
        assert.ok(source, `${lesson.id} ${kind} should run`);
      }
    }
  } finally {
    rmSync(workingDirectory, { recursive: true, force: true });
  }
});

test('all interface translations expose the same labels', () => {
  const englishKeys = Object.keys(copy.en).filter(key => key !== 'lesson').sort();
  for (const language of ['my', 'th']) {
    assert.deepEqual(Object.keys(copy[language]).filter(key => key !== 'lesson').sort(), englishKeys);
  }
});

test('Myanmar and Thai translations cover every lesson field', () => {
  for (const language of ['my', 'th']) {
    for (const lesson of lessons) {
      const localized = copy[language].lesson?.[lesson.id];
      assert.ok(localized, `${language} is missing ${lesson.id}`);
      for (const field of ['title', 'topic', 'summary', 'task', 'hint']) {
        assert.equal(typeof localized[field], 'string', `${language}.${lesson.id} is missing ${field}`);
        assert.ok(localized[field].trim(), `${language}.${lesson.id}.${field} must not be empty`);
      }
      assert.ok(Array.isArray(localized.goals) && localized.goals.length > 0, `${language}.${lesson.id} needs translated goals`);
    }
  }
});
