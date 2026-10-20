# Learning Site

Static Python project lessons, served free through GitHub Pages. The deployment workflow publishes only this directory, leaving the existing repository folders and virtual environment untouched.

## Preview

From the repository root:

```bash
python3 -m http.server 8000 --directory learning-site
```

Open <http://localhost:8000>. The first run loads Pyodide `314.0.7` from jsDelivr and needs an internet connection. Code runs in a Web Worker in the learner's browser; each run is time-limited, drafts and progress are stored in local browser storage, and code is not sent to a project server.

## Add a lesson

Add a unique lesson object to `lessons.js`. Include a track (`Small`, `Medium`, or `Large`), an accurate duration, topic, short summary, learning goals, task, hint, and code that runs with the Python standard library. Keep examples educational and safe. Try the lesson in the browser at mobile and desktop sizes.

GitHub Pages deploys on pushes to `main` that change this directory. The repository owner may need to choose **Settings → Pages → GitHub Actions** once before the first deployment.
