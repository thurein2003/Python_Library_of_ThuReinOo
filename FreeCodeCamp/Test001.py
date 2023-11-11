words = 'His e-mail is q-lar@freecodecamp.org'
pieces = words.split()
parts = pieces[3].split('-')
n = parts[1]
#print(n)



#Find n values exercises

#-----------------------------------------------------
#Dictionary

counts = dict()
names = ['thu','rein','Oo','Thar','pu','thu']

for name in names:
    if name not in counts:
        counts[name] = 1
    else :
        counts[name] = counts[name] + 1
print(counts)

#---------------------------------------------------------

counts ={'quincy' : 1,'mrugesh' : 42,'beau':100,'0':10}
print(counts.get('kris',0))