age = [12,334,23235,4,234,54,23,652,2345]
print(age)
max_index = age.index(max(age))
min_index = age.index(min(age))

age.pop(min_index)
age.pop(max_index)
print(age)