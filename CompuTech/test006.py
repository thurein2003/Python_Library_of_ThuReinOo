#18.Nov.2023 
'''
-----------
| Switch   |
-----------

-----------------
| While / For   |
-----------------
We use loop for when we want to use again and again!

While only look for True/False only
    While True/False:
        ---
        ----

'''
code = input("Yes / No : ")

match code:
    case "Yes":
        print ("yes")
    case "No":
        print ("no")
    case _:
        print("Very Good")

'''
-----------
| Code    |
-----------

-----------
| Switch   |
-----------
code = input("Yes / No : ")

match code:
    case "Yes":
        print ("yes")
    case "No":
        print ("no")
    case _:
        print("Very Good)
        
        
-----------------
| While / For   |
-----------------
n = 1

while  n<10:
    print(n, "hi")
    n += 1
    break
----------------------------------------------------------
# name =['Mg Mg', 'Ma Ma', 'Kyaw Kyaw',"Ga Ga"]

st = input(" Enter Name : ")
i = 0
while i < len(name):
    if st == name[i]:
        print("I found that in ", i+1)
        break
    i += 1
if i ==len(name):
    print('Name not Found')
    
name =['Mg Mg', 'Ma Ma', 'Kyaw Kyaw',"Ga Ga"]

for i in name:
    print(i)
'''