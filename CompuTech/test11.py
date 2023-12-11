#10 Dec 2023


'''
Index data type should be "integer".

| Dictionary data type |

Dict is a unindex datatype.

dict { 3: 4, "Name" : "Mg Mg","Age":30,(1,23,4):[7,8,3], 3.4:{3,2,4}}

The words in the first place is the key and last words is the value.

Dict data type is the pare of key and values.
In the key values should be immutable data type.


| Set |

if there have no key value in the { }, that will be a set data type.
myset = set('Hello')
print(myset)



'''
s1 ={1,2,3,53,1}
s2 = {2,2,34,21,32}

s3 = s1.intersection(s2)
print("intersection = ", s3)
s4 = s1.difference(s2)
print("difference = ", s4)

'''
Pop 
s1 = {2,4234,234,346,23,1,6436,2,3,7,2,2}
print(s1)
print(s1.pop())
print(s1.pop())
print(s1.pop())
print(s1.pop())
print(s1.pop())
print(s1)


s1 = {'bbb','sss','aaaa','ccc','ffff','ggggg'}
print(s1)
print(s1.pop())
print(s1.pop())
print(s1.pop())
print(s1.pop())
print(s1.pop())
print(s1)

Union and | have the same function
s1 ={1,2,3,53,1}
s2 = {2,2,34,21,32}

s3 = s1.union(s2)
print("Union = ", s3)
print("S1 | S2 = ", s1 | s2) 
'''