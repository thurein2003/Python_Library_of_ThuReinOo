# Learning Site

The static Python project lessons are deployed to GitHub Pages. The repository also includes a Vercel configuration for an optional alternative host.

## Preview

From the repository root:

```bash
python3 -m http.server 8000 --directory learning-site
```

Open <http://localhost:8000>. Learners enter a name before starting; changing the name clears that browser's project progress, run checks, drafts, and solution-click count. The name and learning history stay in local browser storage and are never encoded in the shareable URL. Use **Transfer progress** to download or restore a JSON backup between browsers. The backup contains the learner name and saved code, so keep it private. If browser storage is blocked, the app falls back to tab-only memory and displays a warning. The first run loads the pinned Pyodide `314.0.7` runtime from jsDelivr and needs an internet connection. Code runs in a time-limited Web Worker and is not sent to a project server.

## Add a lesson

Add a unique lesson object to `additional-lessons.js`. Include a track (`Small`, `Medium`, or `Large`), duration, topic, summary, learning goals, task, hint, and Python code. Add its solution to `solutions.js` and its English, Myanmar, and Thai text to `additional-copy.js`. Keep examples educational and safe.

## Optional Vercel deployment

Import this repository into Vercel and deploy it. Vercel reads the root `vercel.json`; the output directory is `learning-site/`, so other repository content is not served. GitHub Pages remains the primary deployment described in the root README.

## Validate content

From this directory, run `npm run check` for JavaScript syntax checks and `npm test` for lesson, translation, and progress-backup validation. These checks use Node's built-in tools and install no packages.
