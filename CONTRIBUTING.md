# Contributing

Bug reports, lesson ideas, fixes, and translation improvements are welcome. Open an issue in the GitHub repository with the **Issues** tab, or submit a pull request with a short description of the change.

## Add or edit a site lesson

1. Add the starter and lesson details in `learning-site/additional-lessons.js`.
2. Add one solution in `learning-site/solutions.js`.
3. Place the lesson in the right stage in `learning-site/learning-path.js`.
4. Translate the title, topic, summary, goals, task, and hint in English, Myanmar, and Thai in `learning-site/additional-copy.js`.
5. Prefer local data fixtures over network calls. Never require a learner's password, token, or API key.
6. Have a fluent speaker review new Myanmar or Thai text before merging.

## Check changes locally

The site uses Node.js 22 or newer for its test tools and Python 3 for its local static server. From `learning-site/`:

```bash
npm ci
npm run check
npm test
npx playwright install chromium
npm run test:e2e
```

From the repository root, check the legacy examples and their generated index:

```bash
python3 scripts/check_python_examples.py
python3 scripts/build_legacy_examples_index.py --check
```

The legacy syntax check parses files but does not execute them. Read each example before running it; some prompt for input, open a GUI, use the network, or change local files. Install dependencies only from the requirements file listed for that example.

## Keep contributions reviewable

- Include the expected output or a short example of how to check a new lesson.
- Keep code examples small enough to understand and safe to run in a browser or a local practice folder.
- Update the tests and generated example index when their source changes.
- Do not commit credentials, personal learner data, or progress backup files.
