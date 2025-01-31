import turtle as turtle
turtle.speed(100)
turtle.bgcolor("Black")

colors = ["Red","White","Pink","Blue","Purple","Orange"]

for x in range(1000):
    turtle.forward(x) 
    # we can use circles also "turtle.circles(x)"
    turtle.color(colors[x%6])
    turtle.left(89)