import pandas as pd

df = pd.DataFrame(columns = ['C1','C2','C3','C4'])
df.loc['a'] = ['Win','Cs1', 23,45]
df.loc['b'] = ['May','Cs2',23,45]
df.loc[2] = ['Ma','Cs3',23,45]
df.loc[3] = ['My','Cs4',23,45]

df.to_excel("test.xlsx",index= True, header=True)

