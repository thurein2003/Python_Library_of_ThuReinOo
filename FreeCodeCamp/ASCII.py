#13 Nov 2023

'''
This is just a note of the ASCII with example
ASCII stands for American Standard Code For Information Interchange. It was developed by IBM in the late 1960s and early 7


'''
# print(ord('H'))
#-------------------------------------------

import urllib.request
fhand  = urllib.request.urlopen('http://data.pr4e.org/romeo.txt')
for line in fhand:
    print(line.decode().strip())