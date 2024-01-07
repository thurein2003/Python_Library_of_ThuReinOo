#String Functions
#7.1.2024

#Capitalize
st = "thureinoo"
al = "THUREINOO"
a = al.capitalize()
s = st.capitalize()
#print(f'Original string: {st}\nCapitalized string: {s}')
#print(f'Original string of al : {al} \n Capitalized string of al : {a}')

#Casefold() = lower()
#find() / rfind() reverse find

txt = "{} = {:x}"
print(txt.format(10,10))
print(txt.format(256,256))

bina = "{} = {:b}"
print(bina.format(10,10))
print(bina.format(256,256))

octo = "{} = {:o}"
print(octo.format(10,10))
print(octo.format(256,256))