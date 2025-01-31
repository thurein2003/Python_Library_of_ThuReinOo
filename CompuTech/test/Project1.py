print("This is a movement Game for print the star")
print("Developed by Thu Rein Oo")
        
def square():
    x = int(input("Enter a number : "))
    def Print_square(x):
        for i in range(x):
            for k in range(x):
                print("* ", end="")
            print()
    Print_square(x)

def triangle():
    x = int(input("Enter a number : "))
    for a in range(x + 1):
        for v in range(a):
            print("*", end = "")
        print()

def notTriangle():
    x = int(input("Enter a number: "))
    for l in range(x, 0, -1):
        spaces = x - l
        for _ in range(spaces):
            print(" ", end="")
        for _ in range(l):
            print("*", end="")
        for _ in range(spaces):
            print(" ", end="")
        print()

def start_Game():
    while True:
        userChoice = input("Do you want to start the game?(yes/no)")
        if userChoice == "yes":
            print("You just need to choose the options:")
            print("1 : print the square * ")
            print("2 : print the triangle *")
            print("3 : opposive side of triangle")
            x = int(input("Enter your options : "))
            if x == 1:
                print("Thanks for choosing the number 1! \n That is on process...")
                square()
            elif x == 2:
                print("Thanks for choosing the number 2! \n That is on process...")
                triangle()
            elif x == 3:
                print("Thanks for choosing the number 3! \n That is on process...")
                
                notTriangle()
            else:
                print("Please run again")
        elif userChoice == "no":
            print("Thanks you for playing")
            break
        else:
            print("Please write a number correctly.")

start_Game()      
        
