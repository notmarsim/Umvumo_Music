import pandas as pd


import pandas as pd
# Creating DataFrame from a dictionary
data = {'Name': ['Tom', 'Nick', 'Krish', 'Jack'], 'Age': [20, 20, 18, 18]}
df = pd.DataFrame(data)
l = [20]


print(df[~df['Age'].isin(l)])