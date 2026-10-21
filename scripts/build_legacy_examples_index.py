#!/usr/bin/env python3
"""Regenerate the table of standalone Python examples in docs/LEGACY_EXAMPLES.md."""

from __future__ import annotations

import ast
import argparse
import os
from pathlib import Path
import re
import shlex
import sys
from typing import Optional
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "docs" / "LEGACY_EXAMPLES.md"
EXCLUDED = {".git", "archive", "docs", "learning-site", "node_modules", "venv", ".venv"}
DISTRIBUTIONS = {
    "bs4": "beautifulsoup4",
    "ip2geotools": "ip2geotools",
    "matplotlib": "matplotlib",
    "nmap": "python-nmap",
    "numpy": "numpy",
    "pandas": "pandas",
    "pyfiglet": "pyfiglet",
    "colorama": "colorama",
    "geopy": "geopy",
    "requests": "requests",
    "streamlit": "streamlit",
    "streamlit_lottie": "streamlit-lottie",
    "tabulate": "tabulate",
}
REQUIREMENTS = {
    "CompuTech/DayLessons": "CompuTech/DayLessons/requirements.txt",
    "FreeCodeCamp": "FreeCodeCamp/requirements.txt",
    "National cybercity": "National cybercity/requirements.txt",
    "Projects/GoogleForm": "Projects/GoogleForm/requirements.txt",
    "Projects/WebTest": "Projects/WebTest/requirements.txt",
    "Projects": "Projects/requirements.txt",
    "Tools": "Tools/requirements.txt",
    "YouTube": "YouTube/requirements.txt",
}


def requirement_file(path: Path) -> Optional[str]:
    relative = path.relative_to(ROOT).as_posix()
    for prefix in sorted(REQUIREMENTS, key=len, reverse=True):
        if relative.startswith(f"{prefix}/"):
            candidate = ROOT / REQUIREMENTS[prefix]
            return REQUIREMENTS[prefix] if candidate.exists() else None
    return None


def imports_for(path: Path) -> tuple[set[str], Optional[str]]:
    source = path.read_text(encoding="utf-8", errors="replace")
    try:
        tree = ast.parse(source)
    except SyntaxError as error:
        return set(), f"Syntax needs review ({error.msg})"
    modules: set[str] = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            modules.update(alias.name.split(".", 1)[0] for alias in node.names)
        elif isinstance(node, ast.ImportFrom) and node.module:
            modules.add(node.module.split(".", 1)[0])
    if "urllib2" in modules:
        return modules, "Uses urllib2; Python 2 import"
    return modules, None


def topic_for(path: Path) -> str:
    name = path.stem.replace("_", " ").replace("-", " ")
    if re.fullmatch(r"(?:test)?\d+", name, re.IGNORECASE) or name.lower() in {"test", "test001"}:
        return f"Learning exercise ({name})"
    return name[:1].upper() + name[1:]


def dependency_summary(modules: set[str], path: Path) -> tuple[str, str]:
    external = sorted({DISTRIBUTIONS[module] for module in modules if module in DISTRIBUTIONS})
    notes = []
    if "tkinter" in modules:
        notes.append("Tkinter GUI support (system Python component)")
    if "turtle" in modules:
        notes.append("Tkinter GUI support for turtle")
    if not external:
        summary = "Standard library" if not notes else "; ".join(notes)
    else:
        summary = ", ".join(external)
        if notes:
            summary += "; " + "; ".join(notes)
    req = requirement_file(path)
    if req and external:
        link = f"[`{req}`](../{quote(req)})"
        summary += f" — install: `python3 -m pip install -r {shlex.quote(req)}`"
        return summary, link
    return summary, "—"


def run_review(path: Path, modules: set[str], syntax_note: Optional[str]) -> str:
    notes = ["Python 3 syntax parsed" if not syntax_note else syntax_note]
    try:
        tree = ast.parse(path.read_text(encoding="utf-8", errors="replace"))
    except SyntaxError:
        return "; ".join(notes)

    calls = set()
    writes_files = False
    changes_files = False
    for node in ast.walk(tree):
        if isinstance(node, ast.Call):
            if isinstance(node.func, ast.Name):
                calls.add(node.func.id)
                if node.func.id == "open":
                    mode = node.args[1] if len(node.args) > 1 else next(
                        (keyword.value for keyword in node.keywords if keyword.arg == "mode"), None
                    )
                    if isinstance(mode, ast.Constant) and isinstance(mode.value, str) and any(flag in mode.value for flag in "wax"):
                        writes_files = True
            elif isinstance(node.func, ast.Attribute):
                if node.func.attr in {"write_text", "write_bytes", "touch", "mkdir"}:
                    writes_files = True
                if node.func.attr in {"unlink", "rmdir", "remove", "rmtree"}:
                    changes_files = True

    if "input" in calls:
        notes.append("prompts for input")
    if modules.intersection({"tkinter", "turtle"}):
        notes.append("opens a GUI")
    if modules.intersection({"requests", "urllib", "http", "socket", "ftplib", "nmap", "geopy", "ip2geotools"}):
        notes.append("may access the network")
    if writes_files:
        notes.append("writes local files")
    if changes_files:
        notes.append("may change or remove local files")
    return "; ".join(notes)


def render() -> str:
    lines = [
        "# Standalone Python examples",
        "",
        "These are standalone study projects, not an installable package. The static notes below flag common runtime needs; they do not prove a script is safe or fully working. Read each script before running it. Most examples print their result in the terminal, but exact output can depend on the input, installed packages, and external services.",
        "",
        "Run a script from the repository root with Python 3. For example, `python3 'National cybercity/KKZfinal.py'`. Install only the listed project dependencies; standard-library examples need no pip install.",
        "",
        "Regenerate this index after adding or moving examples with `python3 scripts/build_legacy_examples_index.py`.",
        "",
    ]
    paths = []
    for directory, subdirectories, filenames in os.walk(ROOT):
        subdirectories[:] = sorted(name for name in subdirectories if name not in EXCLUDED)
        paths.extend(Path(directory) / filename for filename in filenames if filename.endswith(".py"))
    groups: dict[str, list[Path]] = {}
    for path in paths:
        groups.setdefault(path.relative_to(ROOT).parts[0], []).append(path)
    for group, group_paths in sorted(groups.items(), key=lambda item: item[0].casefold()):
        lines.extend([
            f"## {group}",
            "",
            "| Topic | Example | Dependencies | Requirements file | Run from repository root | Static checks and run notes |",
            "| --- | --- | --- | --- | --- | --- |",
        ])
        for path in sorted(group_paths, key=lambda item: item.relative_to(ROOT).as_posix().casefold()):
            relative = path.relative_to(ROOT)
            modules, note = imports_for(path)
            deps, requirements_link = dependency_summary(modules, path)
            review = run_review(path, modules, note)
            command = f"python3 {shlex.quote(relative.as_posix())}"
            link = f"[`{relative.as_posix()}`](../{quote(relative.as_posix())})"
            lines.append(f"| {topic_for(path)} | {link} | {deps} | {requirements_link} | `{command}` | {review} |")
        lines.append("")
    return "\n".join(lines)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="fail if the generated index is out of date")
    args = parser.parse_args()
    generated = render()
    if args.check:
        if not OUTPUT.exists() or OUTPUT.read_text(encoding="utf-8") != generated:
            print(f"{OUTPUT.relative_to(ROOT)} is out of date; run python3 scripts/build_legacy_examples_index.py", file=sys.stderr)
            raise SystemExit(1)
        print(f"Checked {OUTPUT.relative_to(ROOT)}")
    else:
        OUTPUT.write_text(generated, encoding="utf-8")
        print(f"Updated {OUTPUT.relative_to(ROOT)}")
