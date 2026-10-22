# Learning Site

The Academy has two separate tracks: **Beginner Python**, a fundamentals-only course, and **Project2Certificate**, the existing 20 guided projects and certificate path. Both tracks are deployed to GitHub Pages. The repository also includes a Vercel configuration for an optional alternative host. Read the [beginner sequence](../docs/BEGINNER_PYTHON.md) and the [Project2Certificate sequence](../docs/LEARNING_PATH.md).

## Preview

From the repository root:

```bash
python3 -m http.server 8000 --directory learning-site
```

Open <http://localhost:8000>. Learners enter a name before starting; changing the name clears both tracks' progress, run checks, drafts, and solution-click counts. Each track saves its progress separately. The name and learning history stay in local browser storage and are never encoded in the shareable URL. Use **Transfer progress** to download or restore a JSON backup for the selected track between browsers. Backups contain the learner name and saved code, so keep them private. If browser storage is blocked, the app falls back to tab-only memory and displays a warning. The first run loads the pinned Pyodide `314.0.7` runtime from jsDelivr and needs an internet connection. Code runs in a time-limited Web Worker and is not sent to a project server.

## Add a lesson

For **Project2Certificate**, add a unique lesson to `additional-lessons.js`, a solution to `solutions.js`, a position in `learning-path.js`, and translations to `additional-copy.js`. For **Beginner Python**, add a beginner-only lesson to `beginner-lessons.js`, its solution to `beginner-solutions.js`, a position in `beginner-learning-path.js`, and translations to `academy-copy.js`. Include duration, topic, summary, goals, task, hint, and runnable Python code. Prefer fixtures over live services so lessons run consistently and do not depend on learner credentials or third-party API availability. Keep examples educational and safe.

## Optional Vercel deployment

Import this repository into Vercel and deploy it. Vercel reads the root `vercel.json`; the output directory is `learning-site/`, so other repository content is not served. GitHub Pages remains the primary deployment described in the root README.

## Validate content

From this directory, run `npm ci`, `npm run check`, and `npm test` for JavaScript syntax, lesson execution, translation, and progress-backup checks. Run `npx playwright install chromium` once, then `npm run test:e2e` for browser flows, responsive layout, and an automated accessibility audit. The browser runner test downloads the pinned Pyodide runtime from jsDelivr.
