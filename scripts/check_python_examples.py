#!/usr/bin/env python3
"""Parse active Python source files without executing their code."""

import ast
import os
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED = {".git", "archive", "docs", "learning-site", "node_modules", "venv", ".venv", "__pycache__"}


def main() -> int:
    checked = 0
    errors = []
    for directory, subdirectories, filenames in os.walk(ROOT):
        subdirectories[:] = sorted(name for name in subdirectories if name not in EXCLUDED)
        for filename in filenames:
            if not filename.endswith(".py"):
                continue
            path = Path(directory) / filename
            checked += 1
            try:
                ast.parse(path.read_text(encoding="utf-8", errors="replace"), filename=str(path.relative_to(ROOT)))
            except SyntaxError as error:
                errors.append(f"{path.relative_to(ROOT)}:{error.lineno}: {error.msg}")

    if errors:
        print("Python syntax review failed:", file=sys.stderr)
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"Parsed {checked} active Python files; no syntax errors found. Files were not executed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
