import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { test } from 'node:test';
import { lessons } from '../lessons.js';
import { additionalLessons } from '../additional-lessons.js';
import { solutions } from '../solutions.js';
import { copy } from '../i18n.js';

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
