#Date 11.Nov.2023
'''
# Note
A list is a sequence and collection data type.

A list is a changeable and string is not a changeable data type.

String is a "immutable data type"
List, dictionary, set is a "mutable data type".

In python, we can create lists using the following methods:

index
[1] is start from left side.
[-1] is start form the right side.
#l[inclusive lower bound, exclusive upper bound of a list] return a list

'''
l =[2,3,34,34,23,5421,45,34,34]
st = "Thu rein Oo"
print(st[::-1])
'''
# Code 

st = 'Hello'
print(st)
print(type(st))

st = 1234
print(st)
print(type(st))

#Len()
st = 'hello'
l = [1,2,4,2,"hello"]
n = len(l[4])
print (n)

# Index
l =[2,3,34,34,23,5421,45,34,34]
print(l[-1]) #34
print(l[0]) #2
print(l[1:5]) #[3, 34, 34, 23]
print(l[5:2]) # []
print(l[2:-3]) # [34, 34, 23, 5421]

For string
st = "Thu rein Oo"
print(st[::-1]) #oO nier uhT
'''
