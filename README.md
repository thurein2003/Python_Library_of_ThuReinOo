# Python Project Library

Learn Python by building projects, from short beginner exercises to larger capstones.

**[Open the learning site](https://thurein2003.github.io/Python_Library_of_ThuReinOo/)**

The interactive site includes 12 guided projects across small, medium, and large tracks. Python runs in your browser with Pyodide; drafts and completion marks stay in that browser. The site deploys from `learning-site/` with GitHub Pages.

## Repository

- `learning-site/`: interactive project lessons and browser editor.
- `CompuTech/`, `FreeCodeCamp/`, `Codered/`, `National cybercity/`, `Projects/`, `Tools/`, and `YouTube/`: existing study notes, examples, and projects. Their directories are preserved.
- `PythonNoteFromPython.pdf`: external reference collected from [The Python Code](https://thepythoncode.com/).

## Run locally

```bash
python3 -m http.server 8000 --directory learning-site
```

Open <http://localhost:8000>. The first code run downloads the pinned Pyodide runtime from jsDelivr, so an internet connection is required.

## Add a project

Add a lesson to `learning-site/lessons.js` with a title, track, learning goals, challenge, hint, and runnable starter code. Test it in the site before opening a pull request.

Contributions and corrections are welcome. Review code before running it; the browser editor is for learning and is not a security boundary.
