import numpy as np 
import  pandas as pd 
'''l = [   [1,2,3,4,5,6],
     [1,2,3,4,5,6],
     [1,2,3,4,5,6],
     [1,2,3,4,5,6],
     ]
a = np.array(l)
print(a[2,3])
print(a[1:4,2:4])
'''

# Data frame
#Pandas

'''
Creating pasdas have series and data frame


'''

s = pd.Series([43,23,45,2], name = 'Total')
a = pd.Series(['B1','B2','B3','B4'], name = 'Batch')
df = pd.concat([a,s], axis = 1)
df.index = ['a','b','c','d']
print(df)










''''
Code 
import pandas as pd

s = pd.Series([11,2,23,45,221],index = ['a','b','c','d','e'])
print(s)

print(s['a':'c'])



s = pd.Series({'B1':45,'B2':23,'B3':45})
print(s)
print(s['B1':'B3'])


s = pd.Series([11,2,23,45,221],index = range(2))
print(s)


Data Frame
ct = {'Name' : ['Mg Bo','Ma hine','Mg Kyaw','Mg Aung','My myat'],
      'Age' : [2,3,4,4,5],
      'Marks' : [23,34,234,56,45]
      }
s = pd.DataFrame(ct)
print(s)
print(s.head(2))

s = pd.Series([43,23,45,2])
a = pd.Series(['B1','B2','B3','B4'])
df = pd.concat([a,s], axis = 1)
print(df)

'''