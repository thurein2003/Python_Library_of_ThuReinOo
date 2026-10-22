export const beginnerLessons = [
  {
    id: 'beginner-hello', level: 'Beginner', title: 'Your first Python program', duration: '10 min', topic: 'Print and output',
    summary: 'Run a small program and show a message on the screen.',
    goals: ['Use print() to display text.', 'Recognize text inside quotation marks.', 'Run a Python program and read its output.'],
    task: 'Change the message to introduce yourself, then print a second line with something you want to learn.',
    hint: 'Put each print() call on its own line and place text inside quotes.',
    code: `print("Hello, Python!")`
  },
  {
    id: 'beginner-variables', level: 'Beginner', title: 'Save information in variables', duration: '12 min', topic: 'Variables and values',
    summary: 'Give names to pieces of information so your program can use them again.',
    goals: ['Create a variable with the = sign.', 'Store text in a string.', 'Use a variable inside print().'],
    task: 'Change the learner name and favorite color, then add one more variable for a favorite food.',
    hint: 'A variable name goes on the left of = and its value goes on the right.',
    code: `learner_name = "Maya"\nfavorite_color = "blue"\n\nprint("Hello, " + learner_name)\nprint("Favorite color: " + favorite_color)`
  },
  {
    id: 'beginner-numbers', level: 'Beginner', title: 'Use numbers and simple math', duration: '12 min', topic: 'Numbers and arithmetic',
    summary: 'Store whole numbers and use addition, subtraction, and multiplication.',
    goals: ['Store numbers without quotation marks.', 'Use +, -, and * for arithmetic.', 'Print a calculation result.'],
    task: 'Choose two new numbers and print their sum and product.',
    hint: 'Use + for the sum and * for the product.',
    code: `apples = 8\nshared_with_friends = 3\nleft = apples - shared_with_friends\n\nprint("Apples left:", left)`
  },
  {
    id: 'beginner-strings', level: 'Beginner', title: 'Work with words', duration: '15 min', topic: 'Text and f-strings',
    summary: 'Join words and place a variable inside a sentence with an f-string.',
    goals: ['Join strings with +.', 'Use an f-string to include a variable.', 'Count characters with len().'],
    task: 'Change the first and last name, then print the full name and its character count.',
    hint: 'Start an f-string with f before the quote and put a variable inside {braces}.',
    code: `first_name = "Aye"\nlast_name = "Thandar"\nfull_name = first_name + " " + last_name\n\nprint(f"Hello, {full_name}!")\nprint("Name length:", len(full_name))`
  },
  {
    id: 'beginner-choices', level: 'Beginner', title: 'Make a choice with if', duration: '15 min', topic: 'Conditions',
    summary: 'Let a program choose what to say by checking a true-or-false condition.',
    goals: ['Compare numbers with >=.', 'Write an if and else block.', 'Indent the lines that belong to each choice.'],
    task: 'Change the score and the passing score, then add a message for a perfect score.',
    hint: 'Use if score == 100 before the passing check, and indent its print() line.',
    code: `score = 72\npassing_score = 60\n\nif score >= passing_score:\n    print("You passed!")\nelse:\n    print("Keep practicing.")`
  },
  {
    id: 'beginner-lists', level: 'Beginner', title: 'Keep a list of items', duration: '15 min', topic: 'Lists',
    summary: 'Put several related values in one list and visit them one at a time.',
    goals: ['Create a list with square brackets.', 'Add an item with append().', 'Read the first item by its position.'],
    task: 'Add two fruits to the list and print how many items it contains.',
    hint: 'Use len(fruits) to count the items.',
    code: `fruits = ["apple", "banana"]\nfruits.append("mango")\n\nprint("First fruit:", fruits[0])\nprint("Fruit list:", fruits)`
  },
  {
    id: 'beginner-loops', level: 'Beginner', title: 'Repeat steps with a loop', duration: '15 min', topic: 'For loops',
    summary: 'Use a for loop to repeat the same instruction for each item in a list.',
    goals: ['Start a for loop with for and in.', 'Indent the repeated instruction.', 'Use each item from a list.'],
    task: 'Add two more study topics and print a welcome sentence for each one.',
    hint: 'The loop variable topic holds one list item at a time.',
    code: `topics = ["variables", "lists", "loops"]\n\nfor topic in topics:\n    print("Today I will practice", topic)`
  },
  {
    id: 'beginner-functions', level: 'Beginner', title: 'Make a reusable function', duration: '18 min', topic: 'Functions',
    summary: 'Put a few instructions in a function and call it whenever you need them.',
    goals: ['Define a function with def.', 'Pass a value into a parameter.', 'Call the function by its name.'],
    task: 'Call greet() with two different names and change the greeting it prints.',
    hint: 'Write the function once, then make a separate call for each name.',
    code: `def greet(name):\n    print(f"Welcome, {name}!")\n\ngreet("Mina")`
  },
  {
    id: 'beginner-dictionaries', level: 'Beginner', title: 'Label values with a dictionary', duration: '18 min', topic: 'Dictionaries',
    summary: 'Store details as named key-and-value pairs in a dictionary.',
    goals: ['Create a dictionary with curly braces.', 'Read a value by its key.', 'Add or change a key-and-value pair.'],
    task: 'Add a favorite subject, then print the learner name and subject.',
    hint: 'Use profile["subject"] = "Python" to add a new detail.',
    code: `profile = {\n    "name": "Mina",\n    "level": "beginner"\n}\n\nprint("Learner:", profile["name"])\nprint("Level:", profile["level"])`
  },
  {
    id: 'beginner-study-plan', level: 'Beginner', title: 'Mini project: a study plan', duration: '20 min', topic: 'Beginner practice',
    summary: 'Combine variables, a list, and a loop to print a short plan for the day.',
    goals: ['Choose a learner name with a variable.', 'Store study steps in a list.', 'Use a loop to print each step.'],
    task: 'Add a study step and print a final message that encourages the learner.',
    hint: 'Put the new step inside the list, then print your final message after the loop.',
    code: `learner = "Mina"\nsteps = ["Practice print()", "Try a list", "Review loops"]\n\nprint(f"{learner}'s Python plan:")\nfor step in steps:\n    print("-", step)`
  }
];
