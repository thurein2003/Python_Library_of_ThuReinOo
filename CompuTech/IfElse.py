import subprocess
import turtle as turtle
import random
import turtle
import time


answer = "Yes"
ques = input("Are you painter?Yes : ")
ques = len(ques) == len(answer)
yeap = "Yeap"
No = "no"
try:
    if ques:
        print("Hello Painter")

        print("Okay, Sound good We can have more fun! \n")

        painter = input("Can I call you 'Painter' : Yes : ")
        painter = len(painter) == len(answer)

        try:
            if painter:
                print("Thanks for accept!")

                cir = input("Do you like circle? Yeap/no : ")
                if len(cir) == len(yeap):
                   turtle.shape("turtle")
                   turtle.speed(10)
                   turtle.color("black")
                   for angle in range(0,360,10):
                       turtle.seth(angle)
                       turtle.circle(100)
                else:
                    turtle.speed(1000)
                    turtle.bgcolor("Black")
                    turns = 100000
                    distance = 10
                    for x in range(turns):
                        right = turtle.right(random.randint(0,360))
                        left =turtle.left(random.randint(0,360))
                        turtle.color(random.choice(['Blue', 'Red', 'Yellow', "Pink"]))
    
                    random.choice([right,left])
                    turtle.forward(distance)

            else:
                raise Exception("")
        except:
            print("Please Let me call you")

    else:
        raise Exception("")

except:
    print("Only write Yes") 







#subprocess.run(["python", "cricle.py"])