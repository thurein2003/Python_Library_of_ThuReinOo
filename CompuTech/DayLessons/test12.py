#16.Dec.2023

'''
Format() || ljust()
'''

a = 7
b = ++a # the ++ will not work because in the python ++ function isn't  exsist
print(a)

a = 3
b = 5
c = a!=b
print(c) # True in python but true in C,C++,c# and also TRUE in R

false = True
print(not false) # False because of the false is a variable

para = "Hello world thureinoo".format()
print(para)

age = 45
birth = 38

'''par = "He is {} old and birth is {}.".format(age,birth) # those will put the order by
print(par)

par = "He is {} old and birth is {}.".format(age,birth,haha) # that can be more, they will repace with order by
print(par)

par = "He is {} old and birth is {}.".format(age) # that can not be less, there will be an error in that 
print(par)
'''
num1 = 12
num2 = 17
num3 = "{} + {} = {}".format(num1, num2, num1+num2)
print(num3)
num3 = "{} = {} + {}".format ( num1+num2, num1 , num2)
print(num3)

a = 58
b = 19
c = "{1} + {0} = {2}".format(a,b,a+b) #that will depend on the index numbers order
print(c)

#left justifie
print("Daw mya".ljust(25),53)
print("Daw mya mya won kyaw".ljust(25),40)
print("U thu rein oo".ljust(25),50)
print("U U".ljust(25),56)

#Right justifie
print("Daw mya".rjust(25),53)
print("Daw mya mya won kyaw".rjust(25),40)
print("U thu rein oo".rjust(25),50)
print("U U".rjust(25),56)

#center justify
print("{:^25}".format("Daw Aye"),53)
print("{:^25}".format("Daw mya mya won kyaw"),40)
print("{:^25}".format("U thu rein oo"),53)
print("{:^25}".format("U U"),53)

#right side
print("{:>25}".format("Daw Aye"),53)
print("{:>25}".format("Daw mya mya won kyaw"),40)
print("{:>25}".format("U thu rein oo"),53)
print("{:>25}".format("U U"),53)


d1 = {"name":"Daw Mya", "age":44,"Address":"Mon"}
d2 = {"name":"Daw Ma", "age":34,"Address":"Mon"}
d3 = {"name":"Daw My", "age":24,"Address":"Mon"}
d4 = {"name":"Daw ya", "age":54,"Address":"Mon"}

l = [d1,d2,d3,d4]
for p in l:
    print("{:<15} {} {}".format(p['name'],p['age'],p['Address']))


n = 10
i = 1
while i <= 10:
    n += 1
    i += 1
print(n)
print(i)

b = 10
i = 1
while i < 10:
    b = i * i
    i += 1
print(b,"\n")

print("Quiz, ")
n = 543
while n != 0:
    print(n)
    n //=10
    n = 543

n = 543
r = 0
while n!= 0:
    r = r*10 + n % 10
    n//=10
print(r)

