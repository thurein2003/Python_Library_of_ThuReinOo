#19.Nov.2023
'''
-----------    -----------  
| Range   |    | Tuple   |
-----------    -----------

In range there have a upper bound and lower bound.
Upper bound is inclusive and lower bound is exclusive.

In range there have 3 parameters (Lower bound, upper bound and step)

-----------
| List fun |
-----------
list.append() --> add the item in the last of the list.
list.extend() --> extend can only add the same length like if original is list and there have a index, extend value also should have index.
list.index()
list.insert(i,x) --> insert x at i position
list.remove(x) --> remove all occurrence of x from the list.
list.sort() --> sort the list in ascending order.
list.reverse() --> reverse the list.
list.pop() --> delete the last words



'''
l = [3,23,54,24,435,2]
l.append(99)
l.extend([3,2])


print(l)
'''

-----------
| Code    |
-----------

l = range(20)

for i in range(4,20,2):
    print(i)
    
name =['Mg Mg', 'Ma Ma', 'Kyaw Kyaw',"Ga Ga"]

for i in range(4):
    print(name[i])
    
print("\n")
    
for a in range(len(name)):
    print(name[a])
    
-----------    -----------  
| List    |    | Tuple   |
-----------    -----------

t = ()
print(type(t)) #tuple
l = []
print(type(l)) #list

-----------
| Tuple   |
-----------

name =('Mg Mg', 'Ma Ma', 'Kyaw Kyaw',"Ga Ga")
f, s, t,f = name
print(f)
print(s)

t = (3,3,23,4,24235,3)
a, b , *c = t # c will be the list data type
print(type(a,b,c))


#--------------------------

''' 