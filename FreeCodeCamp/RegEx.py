#Take a line which start with 'From'
import re

hand = open('sample.txt')
for line in hand:
    line = line.rstrip()
    if re.search('^From',line): #if we add ^ that, that will show all sentances which start with that
        print(line)
        
#--------------------------------------------
'''
- The 'dot' character matches any character
- if you add asterisk character, the character is "any number of times"
'''
#findall()

import re
#re.search() returns True/False depending on whether the string matches
#if we actually want matching strings to be extracted, we use re.findall()

x = "My 2 favorite numbers are 19 and 42"
y = re.findall('[0-9]+', x)
#print(y)
z = re.findall('[A-Z]+',x)
#print(z)
#---------------------------------------------------------------------------
#Exam Question
s = 'A message from csrv@umich.edu to cwen@iupui.edu about meeting@2PM'
lst = re.findall('\\S+@\\S+',s)
#print(lst) 

#--------------------------------------------------------------------------
words = line.split()
email = words[1]
pieces = email.split('@')
print(pieces[1])