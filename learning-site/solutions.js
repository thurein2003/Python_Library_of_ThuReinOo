export const solutions = {
  'tip-calculator': `bill = 64.50
tip_percent = 18
people = 3

if people < 1:
    raise ValueError("People must be at least one")

tip = bill * tip_percent / 100
total = bill + tip
per_person = total / people

print(f"Tip: {tip:.2f}")
print(f"Total: {total:.2f}")
print(f"Each person: {per_person:.2f}")`,

  'number-game': `secret = 17
tries_left = 4
guesses = [8, 22, 17]

for guess in guesses:
    if tries_left <= 0:
        print("No tries left.")
        break

    parity = "even" if guess % 2 == 0 else "odd"
    print(f"You guessed {guess}, which is {parity}.")
    if guess == secret:
        print("You found it!")
        break
    elif guess < secret:
        print("Try higher.")
    else:
        print("Try lower.")
    tries_left -= 1
else:
    print(f"The number was {secret}.")`,

  'word-counter': `import string

passage = "Python helps us solve problems. We can build useful things with Python!"
cleaned = passage.lower().translate(str.maketrans("", "", string.punctuation))
words = cleaned.split()
counts = {}

for word in words:
    counts[word] = counts.get(word, 0) + 1

print(f"Words: {len(words)}")
print(f"Characters: {len(passage)}")
print("Most common:")
for word, count in sorted(counts.items(), key=lambda item: (-item[1], item[0]))[:3]:
    print(f"  {word}: {count}")`,

  quiz: `questions = [
    {"question": "What does len() return?", "options": ["A. An item's size", "B. Its type"], "answer": "A"},
    {"question": "Which type stores key/value pairs?", "options": ["A. tuple", "B. dict"], "answer": "B"},
    {"question": "Which keyword defines a function?", "options": ["A. def", "B. class"], "answer": "A"},
    {"question": "Which type is immutable?", "options": ["A. tuple", "B. list"], "answer": "A"},
]
responses = ["A", "B", "A", "A"]
score = 0

for question, response in zip(questions, responses):
    print(question["question"])
    for option in question["options"]:
        print(" ", option)
    if response == question["answer"]:
        score += 1

percent = score / len(questions) * 100
print(f"Score: {score}/{len(questions)} ({percent:.0f}%)")
if score == len(questions):
    print("Perfect score!")`,

  'expense-tracker': `expenses = [
    {"item": "Lunch", "category": "Food", "amount": 8.75},
    {"item": "Bus pass", "category": "Travel", "amount": 24.00},
    {"item": "Groceries", "category": "Food", "amount": 36.20},
    {"item": "Notebook", "category": "Study", "amount": 5.50},
]

def total_by_category(records):
    totals = {}
    for record in records:
        category = record["category"]
        totals[category] = totals.get(category, 0) + record["amount"]
    return totals

def over_limit(records, limit):
    return [record for record in records if record["amount"] > limit]

for category, total in sorted(total_by_category(expenses).items()):
    print(f"{category:8} {total:.2f}")

print("Over 10.00:")
for expense in over_limit(expenses, 10):
    print(f"  {expense['item']}: {expense['amount']:.2f}")`,

  'library-catalog': `class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.available = True

    def checkout(self):
        if not self.available:
            return False
        self.available = False
        return True

    def return_book(self):
        if self.available:
            return False
        self.available = True
        return True

books = [
    Book("A Study in Scarlet", "Arthur Conan Doyle"),
    Book("Little Women", "Louisa May Alcott"),
    Book("The Time Machine", "H. G. Wells"),
]

book = books[0]
print("Checked out:", book.checkout())
print("Try again:", book.checkout())
print("Returned:", book.return_book())
print("Available again:", book.available)`,

  gradebook: `from statistics import median

students = {
    "Ari": [84, 91, 88],
    "Bo": [72, 78, 81],
    "Kim": [95, 93, 98],
    "Lee": [66, 74, 70],
    "Sam": [89, 92, 90],
    "Pat": [],
}

def average(scores):
    return sum(scores) / len(scores) if scores else None

def letter_grade(score):
    if score >= 90: return "A"
    if score >= 80: return "B"
    if score >= 70: return "C"
    if score >= 60: return "D"
    return "F"

results = [(name, average(scores)) for name, scores in students.items()]
graded = [(name, score) for name, score in results if score is not None]

for name, score in sorted(graded, key=lambda row: row[1], reverse=True):
    print(f"{name:5} {score:5.1f}  {letter_grade(score)}")

scores = [score for _, score in graded]
print(f"Class average: {sum(scores) / len(scores):.1f}")
print(f"Median: {median(scores):.1f}")
print("Skipped students with no scores:", [name for name, score in results if score is None])`,

  'text-adventure': `rooms = {
    "camp": {"text": "A quiet camp. Paths lead north and east.", "paths": {"east": "cave"}},
    "cave": {"text": "A cool cave. A brass key rests here.", "paths": {"west": "camp"}, "item": "key"},
    "gate": {"text": "A locked gate blocks the northern path.", "paths": {"south": "camp"}},
}
inventory = set()
location = "camp"
route = [location]
choices = ["north", "east", "west", "north"]

for direction in choices:
    if location == "camp" and direction == "north":
        if "key" in inventory:
            location = "gate"
            print("The key opens the gate!")
        else:
            print("The gate is locked. Find a key first.")
            continue
    elif direction in rooms[location]["paths"]:
        location = rooms[location]["paths"][direction]
    else:
        print("There is no path that way.")
        continue

    route.append(location)
    item = rooms[location].get("item")
    if item:
        inventory.add(item)
        print(f"You found a {item}.")

print("Inventory:", sorted(inventory))
print("Route:", " -> ".join(route))`,

  'study-planner': `tasks = [
    {"name": "Review loops", "hours": 2, "priority": 1, "day": "Monday"},
    {"name": "Build quiz project", "hours": 3, "priority": 2, "day": "Tuesday"},
    {"name": "Practice functions", "hours": 2, "priority": 1, "day": "Thursday"},
    {"name": "Read about classes", "hours": 1, "priority": 3, "day": "Friday"},
]

def plan_week(items, max_hours):
    schedule = {}
    backlog = []
    used_hours = 0
    for task in sorted(items, key=lambda item: (item["priority"], item["day"])):
        if used_hours + task["hours"] <= max_hours:
            schedule.setdefault(task["day"], []).append(task)
            used_hours += task["hours"]
        else:
            backlog.append(task)
    return schedule, backlog

schedule, backlog = plan_week(tasks, max_hours=6)
for day, day_tasks in schedule.items():
    print(f"\\n{day}")
    for task in day_tasks:
        print(f"  [{task['priority']}] {task['name']} ({task['hours']}h)")
print("Backlog:", [task["name"] for task in backlog])
print(f"Scheduled hours: {sum(task['hours'] for day in schedule.values() for task in day)}")`,

  'budget-dashboard': `budget = {
    "Food": {"limit": 180, "spent": 142.50},
    "Travel": {"limit": 90, "spent": 76.00},
    "Books": {"limit": 50, "spent": 61.25},
    "Fun": {"limit": 70, "spent": 33.00},
}
income = 900.00
savings_target = 200.00

def status(spent, limit):
    if spent > limit:
        return f"OVER by {spent - limit:.2f}"
    return f"{limit - spent:.2f} left"

def print_dashboard(categories):
    print(f"{'CATEGORY':12} {'SPENT':>10} {'LIMIT':>10}  STATUS")
    print("-" * 54)
    for name, amounts in categories.items():
        print(f"{name:12} {amounts['spent']:>9.2f} {amounts['limit']:>9.2f}  {status(**amounts)}")
    total = sum(item["spent"] for item in categories.values())
    print("-" * 54)
    print(f"Total spent: {total:.2f}")
    print(f"Remaining after savings: {income - total - savings_target:.2f}")

print_dashboard(budget)`,

  'inventory-system': `class Product:
    def __init__(self, name, quantity, reorder_at):
        self.name = name
        self.quantity = quantity
        self.reorder_at = reorder_at

    def restock(self, amount):
        if amount <= 0:
            raise ValueError("Restock amount must be positive")
        self.quantity += amount

    def remove_stock(self, quantity):
        if quantity <= 0 or quantity > self.quantity:
            return False
        self.quantity -= quantity
        return True

    def needs_reorder(self):
        return self.quantity <= self.reorder_at

products = [Product("Notebook", 8, 10), Product("Pencil", 42, 20), Product("Folder", 6, 8)]
products[0].restock(12)
print("Sell 5 notebooks:", products[0].remove_stock(5))
print("Sell 50 notebooks:", products[0].remove_stock(50))

for product in products:
    action = "RESTOCK" if product.needs_reorder() else "OK"
    print(f"{product.name:10} stock={product.quantity:3}  {action}")`,

  'project-blueprint': `def add_task(tasks, title):
    title = title.strip()
    if not title:
        raise ValueError("Task title cannot be empty")
    tasks.append({"title": title, "done": False})
    return tasks

def complete_task(tasks, index):
    if index < 0 or index >= len(tasks):
        raise IndexError("No task at that position")
    tasks[index]["done"] = True
    return tasks[index]

def pending_tasks(tasks):
    return [task for task in tasks if not task["done"]]

tasks = []
add_task(tasks, "Write project requirements")
add_task(tasks, "Build the first feature")
complete_task(tasks, 0)

assert len(tasks) == 2
assert tasks[0]["done"] is True
assert len(pending_tasks(tasks)) == 1
print("All tests passed")
print("Pending:", pending_tasks(tasks))`,
  'file-journal': `from pathlib import Path

journal = Path("study_log.txt")
entries = ["Practice loops: 20 minutes", "Review functions: 30 minutes"]
journal.write_text("\\n".join(entries) + "\\n", encoding="utf-8")

with journal.open("a", encoding="utf-8") as file:
    file.write("Build a small project: 45 minutes\\n")

saved_text = journal.read_text(encoding="utf-8")
print(saved_text, end="")
print(f"Entries: {len(saved_text.splitlines())}")`,

  'json-contact-book': `import json

contacts = [
    {"name": "Ari", "email": "ari@example.com"},
    {"name": "Bo", "email": "bo@example.com"},
    {"name": "Kim", "email": "kim@example.com"},
]

def find_contact(records, name):
    return next((record for record in records if record["name"].lower() == name.lower()), None)

json_text = json.dumps(contacts, indent=2)
loaded_contacts = json.loads(json_text)
print(json_text)
print("Search result:", find_contact(loaded_contacts, "kim"))
print("Missing result:", find_contact(loaded_contacts, "Lee"))`,

  'csv-sales-report': `import csv
from io import StringIO

csv_text = "product,units,price\\nNotebook,3,2.50\\nPen,5,1.20\\nNotebook,2,2.50\\nPen,2,1.20\\n"
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
    print(f"{product}: {summary['units']} units, {summary['revenue']:.2f}")`,

  'debug-empty-scores': `students = {
    "Ari": [80, 90],
    "Bo": [],
    "Kim": [75, 85],
}

def average(scores):
    if not scores:
        return None
    return sum(scores) / len(scores)

for name, scores in students.items():
    score = average(scores)
    if score is None:
        print(f"{name}: no scores yet; skipped")
    else:
        print(f"{name}: {score:.1f}")`,

  'unit-test-expenses': `import unittest

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

    def test_empty_description_is_rejected(self):
        with self.assertRaises(ValueError):
            make_expense("   ", 5)

unittest.main(argv=[""], exit=False)`
};
