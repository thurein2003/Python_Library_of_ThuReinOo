import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

async function startLearning(page, learnerName = 'Browser learner') {
  await page.goto('/');
  await page.locator('#learner-name-input').fill(learnerName);
  await page.locator('#save-learner').click();
  await expect(page.locator('#learner-dialog')).not.toBeVisible();
  await expect(page.locator('#code-editor')).toBeVisible();
}

test('course paths, language switching, and mobile layout work', async ({ page }) => {
  await startLearning(page);
  await expect(page.locator('.lesson-item')).toHaveCount(20);
  await expect(page.locator('.track-title span')).toHaveText([
    'Foundations',
    'Functions and data',
    'Files and structured data',
    'Applications',
    'Testing and capstone'
  ]);

  await page.locator('#language-select').selectOption('th');
  await expect(page.locator('html')).toHaveAttribute('lang', 'th');
  await expect(page.locator('.track-title span').first()).toHaveText('พื้นฐาน');

  await page.setViewportSize({ width: 390, height: 844 });
  const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(pageWidth).toBeLessThanOrEqual(390);

  await page.locator('#skip-to-lesson').focus();
  await expect(page.locator('#skip-to-lesson')).toBeFocused();
  await page.locator('#skip-to-lesson').click();
  await expect(page).toHaveURL(/#lesson-content$/);
});

test('browser runner executes edited Python code', async ({ page }) => {
  await startLearning(page);
  await page.locator('#code-editor').fill('print("browser runtime works")');
  await page.locator('#run-code').click();
  await expect(page.locator('#output-status')).toHaveText('Finished', { timeout: 110_000 });
  await expect(page.locator('#output')).toContainText('browser runtime works');
});

test('all lesson starters and solutions run in the browser Python runtime', async ({ page }) => {
  test.setTimeout(180_000);
  await page.goto('/');
  const outcomes = await page.evaluate(async () => {
    const [{ lessons }, { solutions }] = await Promise.all([
      import('./lessons.js'),
      import('./solutions.js')
    ]);
    const worker = new Worker('./python-worker.js', { type: 'module' });
    const results = [];
    const run = code => new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Python snippet timed out')), 90_000);
      const receive = event => {
        if (event.data.type === 'ready') return;
        clearTimeout(timeout);
        worker.removeEventListener('message', receive);
        resolve(event.data);
      };
      worker.addEventListener('message', receive);
      worker.postMessage({ type: 'run', code });
    });

    try {
      for (const lesson of lessons) {
        for (const [kind, code] of [['starter', lesson.code], ['solution', solutions[lesson.id]]]) {
          const result = await run(code);
          results.push({ id: lesson.id, kind, type: result.type, output: result.output });
        }
      }
    } finally {
      worker.terminate();
    }
    return results;
  });

  expect(outcomes).toHaveLength(40);
  for (const result of outcomes) {
    const expectedBug = result.id === 'debug-empty-scores' && result.kind === 'starter';
    expect(result.type, `${result.id} ${result.kind}: ${result.output}`).toBe(expectedBug ? 'error' : 'done');
    if (expectedBug) expect(result.output).toContain('ZeroDivisionError');
  }
});

test('progress backup exports and restores the learner profile and draft', async ({ page }) => {
  await startLearning(page, 'Backup learner');
  const draft = 'print("restored draft")';
  await page.locator('#code-editor').fill(draft);
  await page.locator('#progress-menu-button').click();
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#export-progress').click();
  const download = await downloadPromise;
  const backup = JSON.parse(await readFile(await download.path(), 'utf8'));
  expect(backup.learnerName).toBe('Backup learner');
  expect(backup.drafts['tip-calculator']).toBe(draft);

  await page.locator('#code-editor').fill('print("temporary edit")');
  page.on('dialog', dialog => dialog.accept());
  await page.locator('#import-progress-file').setInputFiles({
    name: 'learning-progress.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(backup))
  });
  await expect(page.locator('#learner-name-display')).toHaveText('Backup learner');
  await expect(page.locator('#code-editor')).toHaveValue(draft);
});

test('main learner screen has no automated accessibility violations', async ({ page }) => {
  await startLearning(page);
  for (const [language, theme] of [['en', 'light'], ['en', 'dark'], ['my', 'dark'], ['th', 'light']]) {
    await page.locator('#language-select').selectOption(language);
    await page.locator(`#${theme}-mode`).click();
    const results = await new AxeBuilder({ page }).analyze();
    const violations = results.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) }));
    expect(violations, `${language} ${theme} theme`).toEqual([]);
  }
});
