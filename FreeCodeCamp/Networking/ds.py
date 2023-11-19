import re
hand = open('sample.txt')
numlist = list()
for line in hand:
    line = line.rstrip()
    stuff = re.findall('^From : ([0-9.]+)',line)
    if len(stuff) != 1: continue
    num = float(stuff[0])
    numlist.append(num)
print('Maximum : ', max(numlist))