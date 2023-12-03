#3 DECEMBER 2023

'''
---------------
| Function    |
---------------

BuildIn functions
len(), type(), sum(), int(), float(), str(), bool(), tuple(), list(), print(), 

1. function definition
2. Function call

Sharing files

=> import fileName                      # need to run====> functionName.function()
=> from fileName import functionName    # only can run specific function
=> from fileName import *               # don't need to run ====> functionName.function() only ===>function()
'''


'''


#----------------------------------------------------------------------
def say():
    print("Hello")
    return "stop" # when this sentences worked other below code will not work!
    print("Thu Rein Oo")
n = say()
print(type(n))
#----------------------------------------------------------------------
def add():
    n1 = int(input("Enter first num : "))
    n2 = int(input("Enter second num : "))
    n3 = n1 + n2
    print("Sum = ",n3)
add()
#----------------------------------------------------------------------
n1 = int(input("Enter first num : "))
n2 = int(input("Enter second num : "))

def add(n1,n2):
    n3 = n1 + n2
    print("Sum = ",n3)
add(n1,n2)
#-----------------------------------------------------------------------
def add(a,b):
    n3 = a + b
                #in this there have no return in that therefore that will not return the result
n = add(33,22)
print(n)
#------------------------------------------------------------------------
'''