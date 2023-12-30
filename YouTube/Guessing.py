import random 
from colorama import Fore 
import pyfiglet

name = ("Hello User! \nYou Get 5 times to Guess")

font = pyfiglet.figlet_format(name)
print(Fore.BLUE + font)


listWords = ["hello","thu rein oo", "thar pu"]
secretwords = random.choice(listWords)


display = []
for letter in secretwords:
    display += [ "_" ]
print(display)
num = 0
game_over = False
while not game_over:
    guess = input("Guess a Letter: ").lower()
    for position in range(len(secretwords)):
        letter = secretwords[position]
        if letter == guess:
            display[position] = letter  
    print(display) 
    if guess not in secretwords:
        num += 1
        guess_left = 5 - num
        print(f"You have only left {guess_left} times")
        if num >= 5:
            print("Game Over")
            game_over = True   
   
    
    if "_" not in display:
        print("You Win")
        game_over = True