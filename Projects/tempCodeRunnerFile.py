from colorama import Fore 
import pyfiglet
name = input("Write your name : ")
font = pyfiglet.figlet_format(name)
print(Fore.RED + font)