#Operator
'''
int, float, str, bool, None, list, 

List 
List can contain various data types:

'''

l = [3,4.5, 'hi', True, [33,44], ('Mg Mg',4), {3,4,5}, {3:"Ma Ma"}]
# print (l[3]) #to call the specipic word we use "index []"
# print (type(l[3]))

# print(len(l))

#---------------------------------------------------------------------------

#Operator
'''
1. Unary operator, binary operator, ternary operator
2. Arithmetic Operator +,-,*,/,%,//,** 
3. Comparison operators ==, !=, <>, >, >=, <=, in, not in
    They will only return the result in True and False only 

'''
#Logical Operator
'''
And OR NOT ^
'''
#-----------------------------------------------------------------------------

#In / Not in 
'''
if - is in the list that will return True #in
if - is in the list that will return False #not in
'''
a = [2,3,2,12,3324,21,3]
b = 3 in a
c = 2 not in a
#print(b)
#print(c)

#------------------------------------------------
#Input Function
'''
Input results will be always "String"
int()
float()
str()
list()
'''
a = int(input("Enter first : "))
b = int(input("Enter second : "))
c = a + b
#print(c)

#-----------------------------------------------