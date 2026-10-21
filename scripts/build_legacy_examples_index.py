#!/usr/bin/env python3
"""Regenerate the table of standalone Python examples in docs/LEGACY_EXAMPLES.md."""

from __future__ import annotations

import ast
from pathlib import Path
import re
import shlex
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "docs" / "LEGACY_EXAMPLES.md"
EXCLUDED = {".git", "archive", "docs", "learning-site", "scripts"}
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


def requirement_file(path: Path) -> str | None:
    relative = path.relative_to(ROOT).as_posix()
    for prefix in sorted(REQUIREMENTS, key=len, reverse=True):
        if relative.startswith(f"{prefix}/"):
            candidate = ROOT / REQUIREMENTS[prefix]
            return REQUIREMENTS[prefix] if candidate.exists() else None
    return None


def imports_for(path: Path) -> tuple[set[str], str | None]:
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


def render() -> str:
    lines = [
        "# Standalone Python examples",
        "",
        "These are older study projects kept as source examples. They are not an installable Python package and are not all maintained. Read a script before running it: some prompt for input, open a GUI, access the network, or write a report file.",
        "",
        "Run a script from the repository root with Python 3. For example, `python3 'National cybercity/KKZfinal.py'`. Install only the listed project dependencies; standard-library examples need no pip install.",
        "",
        "Regenerate this index after adding or moving examples with `python3 scripts/build_legacy_examples_index.py`.",
        "",
    ]
    paths = [
        path for path in ROOT.rglob("*.py")
        if not any(part in EXCLUDED for part in path.relative_to(ROOT).parts)
    ]
    groups: dict[str, list[Path]] = {}
    for path in paths:
        groups.setdefault(path.relative_to(ROOT).parts[0], []).append(path)
    for group, group_paths in sorted(groups.items(), key=lambda item: item[0].casefold()):
        lines.extend([
            f"## {group}",
            "",
            "| Topic | Example | Dependencies | Requirements file | Run from repository root |",
            "| --- | --- | --- | --- | --- |",
        ])
        for path in sorted(group_paths, key=lambda item: item.relative_to(ROOT).as_posix().casefold()):
            relative = path.relative_to(ROOT)
            modules, note = imports_for(path)
            deps, requirements_link = dependency_summary(modules, path)
            command = f"python3 {shlex.quote(relative.as_posix())}"
            link = f"[`{relative.as_posix()}`](../{quote(relative.as_posix())})"
            lines.append(f"| {topic_for(path)}{f' ({note})' if note else ''} | {link} | {deps} | {requirements_link} | `{command}` |")
        lines.append("")
    return "\n".join(lines)


if __name__ == "__main__":
    OUTPUT.write_text(render(), encoding="utf-8")
    print(f"Updated {OUTPUT.relative_to(ROOT)}")
