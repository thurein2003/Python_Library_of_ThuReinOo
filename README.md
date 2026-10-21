# Python Project Library

Learn Python by building projects, from small exercises to larger applications.

**Live site (GitHub Pages):** https://thurein2003.github.io/Python_Library_of_ThuReinOo/

[![GitHub stars](https://img.shields.io/github/stars/thurein2003/Python_Library_of_ThuReinOo?style=social)](https://github.com/thurein2003/Python_Library_of_ThuReinOo)

After earning a certificate, learners can star the repository. This live total counts GitHub stars, not verified certificate recipients.

## Try it

1. Choose a project and read its challenge.
2. Edit the Python code and select **Run**.
3. Save progress in this browser and move to the next project.

Enter a learner name before starting. Changing the name resets the saved learning history. Progress stays in this browser and is not included in the site link.
If browser storage is blocked, the site uses temporary tab-only storage and warns you that progress will not persist.

Solutions stay hidden until **Show solution** is selected.

Choose English, Myanmar, or Thai, and switch between light and dark themes. Python runs in your browser with Pyodide; the first run needs an internet connection.

Edit and successfully run all 17 projects before marking them complete to unlock a printable certificate. The certificate is self-reported from progress saved in this browser; it is not independently verified.

The new lessons cover text files, JSON, CSV reports, debugging edge cases, and `unittest`.

Use **Transfer progress** in the project toolbar to export a JSON backup or import it on another browser. The backup includes the learner name, saved code, and progress, so keep it private.

## Quick guides

**Edit and run a project**

![Choose a project, edit the Python code, and press Run](docs/media/first-project.gif)

**Choose a larger project and track progress**

![Filter for a larger project, run it, and mark it complete](docs/media/capstone-path.gif)

## Run locally

```bash
python3 -m http.server 8000 --directory learning-site
```

Open http://localhost:8000.

The interactive site is in `learning-site/`. The older standalone Python scripts are indexed in [docs/LEGACY_EXAMPLES.md](docs/LEGACY_EXAMPLES.md); they are examples, not an installable Python package. The root `requirements.txt` is intentionally empty of packages because the site has no pip dependencies. Install optional packages from the requirement file for the example you want to run.

GitHub Pages is the primary deployment. The workflow checks site content before publishing. Vercel can be used as an optional alternative; see [learning-site/README.md](learning-site/README.md).
