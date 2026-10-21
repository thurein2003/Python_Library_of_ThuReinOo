import { additionalLessons } from './additional-lessons.js';

export const lessons = [
  {
    id: 'tip-calculator', level: 'Small', title: 'Tip calculator', duration: '15 min', topic: 'Numbers and input',
    summary: 'Turn a bill amount and tip percentage into a clear total for a table.',
    goals: ['Convert text input into numbers.', 'Use arithmetic and f-strings.', 'Handle a simple invalid value.'],
    task: 'Change the bill and tip values. Add a second result that shows the amount each of three people should pay.',
    hint: 'Split the total with / and format the result to two decimal places.',
    code: `bill = 48.50\ntip_percent = 18\n\ntip = bill * tip_percent / 100\ntotal = bill + tip\nper_person = total / 3\n\nprint(f"Tip: {tip:.2f}")\nprint(f"Total: {total:.2f}")\nprint(f"Each person: {per_person:.2f}")`
  },
  {
    id: 'number-game', level: 'Small', title: 'Number challenge', duration: '20 min', topic: 'Conditionals and loops',
    summary: 'Build a repeatable guessing game with useful hints and a limited number of tries.',
    goals: ['Use while loops and if/elif/else.', 'Track attempts with a counter.', 'Keep game rules in one place.'],
    task: 'Change the secret number and try count. Extend the program to tell the player whether a guess is even or odd.',
    hint: 'Use guess % 2 to check whether a number is even.',
    code: `secret = 17\ntries_left = 4\nguesses = [8, 22, 17]\n\nfor guess in guesses:\n    if tries_left == 0:\n        print("No tries left.")\n        break\n\n    print(f"You guessed {guess}.")\n    if guess == secret:\n        print("You found it!")\n        break\n    elif guess < secret:\n        print("Try higher.")\n    else:\n        print("Try lower.")\n\n    tries_left -= 1\nelse:\n    print(f"The number was {secret}.")`
  },
  {
    id: 'word-counter', level: 'Small', title: 'Word counter', duration: '20 min', topic: 'Strings and lists',
    summary: 'Analyze a short passage and report its words, characters, and most common word.',
    goals: ['Clean text with lower() and strip().', 'Split strings into lists.', 'Count items with a dictionary.'],
    task: 'Try a different passage. Ignore punctuation when counting words, then show the three most common words.',
    hint: 'The string module has punctuation characters you can remove with translate().',
    code: `passage = "Python helps us solve problems. We can build useful things with Python."\nwords = passage.lower().replace(".", "").split()\ncounts = {}\n\nfor word in words:\n    counts[word] = counts.get(word, 0) + 1\n\nprint(f"Words: {len(words)}")\nprint(f"Characters: {len(passage)}")\nprint("Most common:")\nfor word, count in sorted(counts.items(), key=lambda item: item[1], reverse=True)[:3]:\n    print(f"  {word}: {count}")`
  },
  {
    id: 'quiz', level: 'Small', title: 'Mini quiz', duration: '25 min', topic: 'Functions and collections',
    summary: 'Create a small quiz from question data and calculate a final score.',
    goals: ['Represent related data with dictionaries.', 'Write reusable functions.', 'Calculate a percentage.'],
    task: 'Add two questions to the list and make the quiz show a different message for a perfect score.',
    hint: 'A question can be a dictionary with question, options, and answer keys.',
    code: `questions = [\n    {"question": "What does len() return?", "options": ["A. An item's size", "B. Its type"], "answer": "A"},\n    {"question": "Which type stores key/value pairs?", "options": ["A. tuple", "B. dict"], "answer": "B"},\n]\n\ndef ask(question):\n    print(question["question"])\n    for option in question["options"]:\n        print(" ", option)\n    return question["answer"]\n\nscore = sum(ask(question) == question["answer"] for question in questions)\npercent = score / len(questions) * 100\nprint(f"Score: {score}/{len(questions)} ({percent:.0f}%)")`
  },
  {
    id: 'expense-tracker', level: 'Medium', title: 'Expense tracker', duration: '35 min', topic: 'Functions and data',
    summary: 'Summarize expenses by category and find where the largest amount went.',
    goals: ['Design functions with parameters.', 'Aggregate values in dictionaries.', 'Sort structured data.'],
    task: 'Add expenses, then write a function that returns only expenses over a limit you choose.',
    hint: 'Use a list comprehension and keep the limit as a function parameter.',
    code: `expenses = [\n    {"item": "Lunch", "category": "Food", "amount": 8.75},\n    {"item": "Bus pass", "category": "Travel", "amount": 24.00},\n    {"item": "Groceries", "category": "Food", "amount": 36.20},\n    {"item": "Notebook", "category": "Study", "amount": 5.50},\n]\n\ndef total_by_category(records):\n    totals = {}\n    for record in records:\n        category = record["category"]\n        totals[category] = totals.get(category, 0) + record["amount"]\n    return totals\n\nfor category, total in sorted(total_by_category(expenses).items()):\n    print(f"{category:8} {total:.2f}")\n\nlargest = max(expenses, key=lambda expense: expense["amount"])\nprint(f"Largest: {largest['item']} ({largest['amount']:.2f})")`
  },
  {
    id: 'library-catalog', level: 'Medium', title: 'Library catalog', duration: '40 min', topic: 'Classes and objects',
    summary: 'Model books as objects and build a catalog with search and checkout rules.',
    goals: ['Create a class with attributes and methods.', 'Keep object state consistent.', 'Filter a collection.'],
    task: 'Add a return_book() method. It should mark a checked-out book as available again.',
    hint: 'A method changes self.available only when the book is currently checked out.',
    code: `class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n        self.available = True\n\n    def checkout(self):\n        if not self.available:\n            return False\n        self.available = False\n        return True\n\nbooks = [\n    Book("A Study in Scarlet", "Arthur Conan Doyle"),\n    Book("Little Women", "Louisa May Alcott"),\n    Book("The Time Machine", "H. G. Wells"),\n]\n\nfor book in books:\n    if "the" in book.title.lower() or book.author.startswith("A"):\n        state = "available" if book.available else "checked out"\n        print(f"{book.title} by {book.author} ({state})")\n\nprint("Checked out:", books[0].checkout())\nprint("Try again:", books[0].checkout())`
  },
  {
    id: 'gradebook', level: 'Medium', title: 'Gradebook report', duration: '35 min', topic: 'Data processing',
    summary: 'Turn student records into averages, letter grades, and a class summary.',
    goals: ['Separate calculation from display.', 'Use comprehensions and sorting.', 'Handle useful summary statistics.'],
    task: 'Add a student and calculate the class median. Try a student with an empty score list and decide how to handle it.',
    hint: 'Sort the averages. For an odd count use the middle value; for an even count average the two middle values.',
    code: `students = {\n    "Ari": [84, 91, 88],\n    "Bo": [72, 78, 81],\n    "Kim": [95, 93, 98],\n    "Lee": [66, 74, 70],\n}\n\ndef average(scores):\n    return sum(scores) / len(scores)\n\ndef letter_grade(score):\n    if score >= 90: return "A"\n    if score >= 80: return "B"\n    if score >= 70: return "C"\n    if score >= 60: return "D"\n    return "F"\n\nresults = [(name, average(scores)) for name, scores in students.items()]\nfor name, score in sorted(results, key=lambda row: row[1], reverse=True):\n    print(f"{name:5} {score:5.1f}  {letter_grade(score)}")\n\nclass_average = sum(score for _, score in results) / len(results)\nprint(f"Class average: {class_average:.1f}")`
  },
  {
    id: 'text-adventure', level: 'Medium', title: 'Text adventure', duration: '45 min', topic: 'State and game loops',
    summary: 'Build a branching story where player choices update the world state.',
    goals: ['Represent locations with dictionaries.', 'Change state from player actions.', 'Structure a simple turn loop.'],
    task: 'Add a third room and a key item. The locked gate should open only after the player finds the key.',
    hint: 'Store inventory in a set and check whether "key" is in that set.',
    code: `rooms = {\n    "camp": {"text": "A quiet camp. Paths lead north and east.", "paths": {"north": "bridge", "east": "cave"}},\n    "bridge": {"text": "A wooden bridge crosses the river.", "paths": {"south": "camp", "east": "tower"}},\n    "cave": {"text": "A cool cave. You find a lantern.", "paths": {"west": "camp", "north": "tower"}},\n    "tower": {"text": "An old tower looks over the valley.", "paths": {"west": "bridge", "south": "cave"}},\n}\n\nlocation = "camp"\nroute = [location]\nchoices = ["north", "east", "north"]\n\nfor direction in choices:\n    room = rooms[location]\n    print(f"\\n{location.title()}: {room['text']}")\n    if direction in room["paths"]:\n        location = room["paths"][direction]\n        route.append(location)\n    else:\n        print("There is no path that way.")\n\nprint("\\nRoute:", " -> ".join(route))`
  },
  {
    id: 'study-planner', level: 'Large', title: 'Study planner', duration: '55 min', topic: 'Composition and scheduling',
    summary: 'Prioritize study tasks, estimate workload, and create a manageable weekly plan.',
    goals: ['Combine small functions into a workflow.', 'Sort by priority and effort.', 'Validate capacity before planning.'],
    task: 'Add a maximum-hours limit and move overflow tasks into a backlog instead of scheduling everything.',
    hint: 'Track used_hours and compare it with the weekly limit before adding each task.',
    code: `tasks = [\n    {"name": "Review loops", "hours": 2, "priority": 1, "day": "Monday"},\n    {"name": "Build quiz project", "hours": 3, "priority": 2, "day": "Tuesday"},\n    {"name": "Practice functions", "hours": 2, "priority": 1, "day": "Thursday"},\n    {"name": "Read about classes", "hours": 1, "priority": 3, "day": "Friday"},\n]\n\ndef plan_week(items):\n    schedule = {}\n    for task in sorted(items, key=lambda item: (item["priority"], item["day"])):\n        schedule.setdefault(task["day"], []).append(task)\n    return schedule\n\ndef print_plan(schedule):\n    for day, day_tasks in schedule.items():\n        hours = sum(task["hours"] for task in day_tasks)\n        print(f"\\n{day} - {hours} hour(s)")\n        for task in day_tasks:\n            print(f"  [{task['priority']}] {task['name']} ({task['hours']}h)")\n\nprint_plan(plan_week(tasks))\nprint(f"\\nWeekly total: {sum(task['hours'] for task in tasks)}h")`
  },
  {
    id: 'budget-dashboard', level: 'Large', title: 'Budget dashboard', duration: '60 min', topic: 'Data models and reporting',
    summary: 'Build a small personal budget report with category limits and clear warnings.',
    goals: ['Design reusable report functions.', 'Compare actual and target amounts.', 'Format a readable text dashboard.'],
    task: 'Add a savings target and calculate the amount remaining after spending.',
    hint: 'Keep income separate from expenses, then subtract expenses from income.',
    code: `budget = {\n    "Food": {"limit": 180, "spent": 142.50},\n    "Travel": {"limit": 90, "spent": 76.00},\n    "Books": {"limit": 50, "spent": 61.25},\n    "Fun": {"limit": 70, "spent": 33.00},\n}\n\ndef status(spent, limit):\n    if spent > limit:\n        return "OVER BUDGET"\n    remaining = limit - spent\n    return f"{remaining:.2f} left"\n\ndef print_dashboard(categories):\n    print(f"{'CATEGORY':12} {'SPENT':>10} {'LIMIT':>10}  STATUS")\n    print("-" * 54)\n    for name, amounts in categories.items():\n        print(f"{name:12} {amounts['spent']:>9.2f} {amounts['limit']:>9.2f}  {status(**amounts)}")\n    total = sum(item["spent"] for item in categories.values())\n    print("-" * 54)\n    print(f"Total spent: {total:.2f}")\n\nprint_dashboard(budget)`
  },
  {
    id: 'inventory-system', level: 'Large', title: 'Inventory system', duration: '65 min', topic: 'Classes and business rules',
    summary: 'Model a small shop inventory and apply restock, sale, and reorder rules.',
    goals: ['Use classes to keep data and behavior together.', 'Validate state changes.', 'Generate an actionable report.'],
    task: 'Add a remove_stock(quantity) method that rejects sales larger than available stock.',
    hint: 'Check the requested quantity before subtracting it. Return True for success and False otherwise.',
    code: `class Product:\n    def __init__(self, name, quantity, reorder_at):\n        self.name = name\n        self.quantity = quantity\n        self.reorder_at = reorder_at\n\n    def restock(self, amount):\n        if amount <= 0:\n            raise ValueError("Restock amount must be positive")\n        self.quantity += amount\n\n    def needs_reorder(self):\n        return self.quantity <= self.reorder_at\n\nproducts = [\n    Product("Notebook", 8, 10),\n    Product("Pencil", 42, 20),\n    Product("Folder", 6, 8),\n]\nproducts[0].restock(12)\n\nfor product in products:\n    action = "RESTOCK" if product.needs_reorder() else "OK"\n    print(f"{product.name:10} stock={product.quantity:3}  {action}")`
  },
  {
    id: 'project-blueprint', level: 'Large', title: 'Your capstone blueprint', duration: '90+ min', topic: 'Planning and architecture',
    summary: 'Plan a complete Python project, split it into modules, and build a tested first milestone.',
    goals: ['Turn a broad idea into small features.', 'Choose data structures deliberately.', 'Define tests before implementation.'],
    task: 'Pick a project you care about: a habit tracker, recipe organizer, study planner, or another useful tool. Replace the sample functions with your own first vertical slice.',
    hint: 'Start with one user action, one data model, and one test. Add persistence and a user interface only after that works.',
    code: `def add_task(tasks, title):\n    """Add a non-empty task and return the updated task list."""\n    title = title.strip()\n    if not title:\n        raise ValueError("Task title cannot be empty")\n    tasks.append({"title": title, "done": False})\n    return tasks\n\ndef complete_task(tasks, index):\n    if index < 0 or index >= len(tasks):\n        raise IndexError("No task at that position")\n    tasks[index]["done"] = True\n    return tasks[index]\n\n# Milestone 1: create and complete an item.\ntasks = []\nadd_task(tasks, "Write project requirements")\ncomplete_task(tasks, 0)\n\nassert len(tasks) == 1\nassert tasks[0]["done"] is True\nprint("Milestone 1 passed:", tasks)`
  },
  ...additionalLessons
];
