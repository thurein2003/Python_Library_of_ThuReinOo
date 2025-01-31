import pandas as pd

df = pd.DataFrame(columns = ['C1','C2','C3','C4'])
df.loc['a'] = ['Win','Cs1', 23,45]
df.loc['b'] = ['May','Cs2',23,45]
df.loc[2] = ['Ma','Cs3',23,45]
df.loc[3] = ['My','Cs4',23,45]

print(df['C1'])
print(df[['C1']])


'''
Code
s = pd.Series([27,38,18,33], name = 'total')
a = pd.Series(['B1','B2','B3','B4'], name = 'Batch')
b = pd.Series([77,99,44,22], name = 'Mark')
df = pd.concat([a,s,b], axis=1)
print(df)






ct = {'Name' : ['Mg Bo','Ma Khine','Mg Kyaw', 'Mg Aung','Mg myat'],
      'Age' : [23,34,23,24,23],
        'Mark':[23,243,12,56,23],
        }
s = pd.DataFrame(ct)
print(s)


df = pd.DataFrame(columns = ['C1','C2','C3','C4'])
df.loc['a'] = ['Win','Cs1', 23,45]
df.loc['b'] = ['May','Cs2',23,45]
df.loc[2] = ['Ma','Cs3',23,45]
df.loc[3] = ['My','Cs4',23,45]

print(df)
print(df.loc['b','C2'])
print(df.iloc[2,1])
print(df.iloc[1,2])
print(df.iloc[1])
print(df.loc['b'])

'''