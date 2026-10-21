export const additionalLessons = [
  {
    id: 'file-journal', level: 'Medium', title: 'Study journal file', duration: '35 min', topic: 'Files and paths',
    summary: 'Write a short study log to a text file, then read it back and summarize the entries.',
    goals: ['Use pathlib.Path for a file path.', 'Write and read UTF-8 text.', 'Append new data without replacing the file.'],
    task: 'Append one new study entry with a with block, then print the full journal and its entry count.',
    hint: 'Open the path with mode "a" and encoding="utf-8" to append safely.',
    code: `from pathlib import Path

journal = Path("study_log.txt")
entries = ["Practice loops: 20 minutes", "Review functions: 30 minutes"]
journal.write_text("\\n".join(entries) + "\\n", encoding="utf-8")

saved_text = journal.read_text(encoding="utf-8")
print(saved_text, end="")
print(f"Entries: {len(saved_text.splitlines())}")`
  },
  {
    id: 'json-contact-book', level: 'Medium', title: 'JSON contact book', duration: '40 min', topic: 'JSON and structured data',
    summary: 'Convert contact records to JSON text and load them back as Python data.',
    goals: ['Use json.dumps() and json.loads().', 'Keep records as dictionaries in a list.', 'Find a record by one of its fields.'],
    task: 'Add another contact and write a function that finds a contact by name, returning None when there is no match.',
    hint: 'Loop through the list and compare each record’s name with the search text.',
    code: `import json

contacts = [
    {"name": "Ari", "email": "ari@example.com"},
    {"name": "Bo", "email": "bo@example.com"},
]

json_text = json.dumps(contacts, indent=2)
loaded_contacts = json.loads(json_text)
for contact in loaded_contacts:
    print(f"{contact['name']}: {contact['email']}")`
  },
  {
    id: 'csv-sales-report', level: 'Medium', title: 'CSV sales report', duration: '45 min', topic: 'CSV and data summaries',
    summary: 'Read rows of sales data and calculate totals by product.',
    goals: ['Read rows with csv.DictReader.', 'Convert text amounts to numbers.', 'Aggregate rows in a dictionary.'],
    task: 'Add another sale and report the total units and revenue for each product.',
    hint: 'Store each product’s running total in a dictionary keyed by its name.',
    code: `import csv
from io import StringIO

csv_text = "product,units,price\\nNotebook,3,2.50\\nPen,5,1.20\\nNotebook,2,2.50\\n"
sales = csv.DictReader(StringIO(csv_text))
totals = {}

for sale in sales:
    product = sale["product"]
    units = int(sale["units"])
    revenue = units * float(sale["price"])
    summary = totals.setdefault(product, {"units": 0, "revenue": 0.0})
    summary["units"] += units
    summary["revenue"] += revenue

for product, summary in sorted(totals.items()):
    print(f"{product}: {summary['units']} units, {summary['revenue']:.2f}")`
  },
  {
    id: 'debug-empty-scores', level: 'Medium', title: 'Debug empty scores', duration: '35 min', topic: 'Debugging and edge cases',
    summary: 'Use an error message and a small data set to find and fix an empty-list bug.',
    goals: ['Read a traceback to locate a failing line.', 'Check edge cases before dividing.', 'Choose a clear result for missing data.'],
    task: 'Fix average() so a student with no scores does not crash the report. Skip that student and print a helpful note.',
    hint: 'Check whether scores is empty before calculating sum(scores) / len(scores).',
    code: `students = {
    "Ari": [80, 90],
    "Bo": [],
    "Kim": [75, 85],
}

def average(scores):
    return sum(scores) / len(scores)

for name, scores in students.items():
    print(f"{name}: {average(scores):.1f}")`
  },
  {
    id: 'unit-test-expenses', level: 'Large', title: 'Test an expense helper', duration: '55 min', topic: 'Unit testing',
    summary: 'Write small tests for normal values and boundary cases with unittest.',
    goals: ['Separate a function from its examples.', 'Use unittest assertions.', 'Test invalid and boundary inputs.'],
    task: 'Add tests for a zero amount and an empty description, then extend the function to reject both.',
    hint: 'Use assertRaises(ValueError) for invalid input and assertEqual() for the returned record.',
    code: `import unittest

def make_expense(description, amount):
    description = description.strip()
    if not description:
        raise ValueError("Description is required")
    if amount <= 0:
        raise ValueError("Amount must be positive")
    return {"description": description, "amount": amount}

class ExpenseTests(unittest.TestCase):
    def test_valid_expense(self):
        self.assertEqual(make_expense(" Lunch ", 8.5), {"description": "Lunch", "amount": 8.5})

    def test_non_positive_amount_is_rejected(self):
        with self.assertRaises(ValueError):
            make_expense("Lunch", 0)

unittest.main(argv=[""], exit=False)`
  },
  {
    id: 'api-response-analyzer', level: 'Medium', title: 'API response analyzer', duration: '45 min', topic: 'JSON and API data',
    summary: 'Validate a sample JSON response and turn it into a clear report without relying on a live service.',
    goals: ['Read a JSON response with json.loads().', 'Check required fields before using a record.', 'Separate parsing, validation, and display.'],
    task: 'Add a second response record and report how many tasks are complete. Reject a record with a missing title.',
    hint: 'Compare the record keys with a set of required fields before formatting the output.',
    code: `import json

response_text = '{"userId": 7, "id": 3, "title": "Review Python functions", "completed": false}'
response = json.loads(response_text)
required_fields = {"userId", "id", "title", "completed"}

missing_fields = required_fields - response.keys()
if missing_fields:
    raise ValueError(f"Missing fields: {sorted(missing_fields)}")

state = "complete" if response["completed"] else "still open"
print(f"Task {response['id']}: {response['title']} ({state})")`
  },
  {
    id: 'command-line-task-manager', level: 'Large', title: 'Command-line task manager', duration: '60 min', topic: 'Functions and command-line arguments',
    summary: 'Build a small command-line interface that adds tasks and lists the current task plan.',
    goals: ['Create commands with argparse.', 'Keep command behavior in a function.', 'Try command input without needing a terminal prompt.'],
    task: 'Add a complete command that marks a task done, then print completed and open tasks separately.',
    hint: 'Add a subparser for the new command and update the matching task inside run_command().',
    code: `import argparse

def build_parser():
    parser = argparse.ArgumentParser(prog="tasks")
    commands = parser.add_subparsers(dest="command", required=True)
    add = commands.add_parser("add")
    add.add_argument("title")
    commands.add_parser("list")
    return parser

def run_command(tasks, args):
    if args.command == "add":
        title = args.title.strip()
        if not title:
            raise ValueError("Task title cannot be empty")
        tasks.append({"title": title, "done": False})
        print(f"Added: {title}")
    elif args.command == "list":
        for number, task in enumerate(tasks, start=1):
            marker = "✓" if task["done"] else " "
            print(f"{number}. [{marker}] {task['title']}")

tasks = []
parser = build_parser()
for command_line in [["add", "Read chapter"], ["add", "Practice loops"], ["list"]]:
    run_command(tasks, parser.parse_args(command_line))`
  },
  {
    id: 'sqlite-reading-list', level: 'Large', title: 'SQLite reading list', duration: '65 min', topic: 'SQLite and persistence',
    summary: 'Store books in an in-memory SQLite database and query the reading list with SQL.',
    goals: ['Create a table with sqlite3.', 'Insert and update rows with parameters.', 'Use a query result to build a report.'],
    task: 'Add a query for unread books and print the number of pages remaining in the list.',
    hint: 'Use a WHERE clause for unread rows and SUM(pages) to total their pages.',
    code: `import sqlite3

with sqlite3.connect(":memory:") as connection:
    connection.execute("CREATE TABLE books (title TEXT, pages INTEGER, finished INTEGER)")
    connection.executemany(
        "INSERT INTO books VALUES (?, ?, ?)",
        [("Python Basics", 180, 0), ("Data with Python", 240, 1), ("SQL Notes", 120, 0)],
    )
    connection.execute("UPDATE books SET finished = 1 WHERE title = ?", ("Python Basics",))

    for title, pages, finished in connection.execute("SELECT title, pages, finished FROM books ORDER BY title"):
        state = "finished" if finished else "to read"
        print(f"{title}: {pages} pages, {state}")`
  }
];
