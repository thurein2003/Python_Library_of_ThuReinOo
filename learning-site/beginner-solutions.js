export const beginnerSolutions = {
  'beginner-hello': `print("Hello, Python!")
print("I am learning to code.")`,

  'beginner-variables': `learner_name = "Maya"
favorite_color = "blue"
favorite_food = "mango"

print(f"Hello, {learner_name}!")
print(f"Favorite color: {favorite_color}")
print(f"Favorite food: {favorite_food}")`,

  'beginner-numbers': `first_number = 8
second_number = 3

print("Sum:", first_number + second_number)
print("Product:", first_number * second_number)`,

  'beginner-strings': `first_name = "Aye"
last_name = "Thandar"
full_name = first_name + " " + last_name

print(f"Hello, {full_name}!")
print("Name length:", len(full_name))`,

  'beginner-choices': `score = 100
passing_score = 60

if score == 100:
    print("Perfect score!")
elif score >= passing_score:
    print("You passed!")
else:
    print("Keep practicing.")`,

  'beginner-lists': `fruits = ["apple", "banana"]
fruits.append("mango")
fruits.append("orange")
fruits.append("grape")

print("First fruit:", fruits[0])
print("Fruit list:", fruits)
print("Number of fruits:", len(fruits))`,

  'beginner-loops': `topics = ["variables", "lists", "loops", "functions", "dictionaries"]

for topic in topics:
    print("Today I will practice", topic)`,

  'beginner-functions': `def greet(name):
    print(f"Hello, {name}. Keep learning Python!")

greet("Mina")
greet("Aye")`,

  'beginner-dictionaries': `profile = {
    "name": "Mina",
    "level": "beginner",
    "subject": "Python"
}

print("Learner:", profile["name"])
print("Favorite subject:", profile["subject"])`,

  'beginner-study-plan': `learner = "Mina"
steps = ["Practice print()", "Try a list", "Review loops", "Write a function"]

print(f"{learner}'s Python plan:")
for step in steps:
    print("-", step)
print("Great work. Keep practicing!")`
};
