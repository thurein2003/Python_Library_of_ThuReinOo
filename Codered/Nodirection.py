import turtle as turtle
import random
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