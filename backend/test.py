import pandas as pd
import ast
df = pd.read_csv('csv/data_with_genres.csv')

genre = pd.read_csv('csv/data_by_genres.csv')
genre.index = genre['genres']
df['id_genre'] = [0]*170653

def create_ids(genres):
    artist1_genres = eval(genres)
    if artist1_genres != []: artist1_genres = artist1_genres[0]
    if artist1_genres in ['[]',[]]:
        return genre.loc['[]']['id_genre']
    else:
        artist1_main_genre = eval(artist1_genres)[0]
        return genre.loc[artist1_main_genre]['id_genre']

df['id_genre'] = df['genres'].apply(create_ids)

# for i in range(170653):

#     artist1_genres = eval(df.iloc[i]['genres'])
#     if artist1_genres != []: artist1_genres = artist1_genres[0]
#     if artist1_genres in ['[]',[]]:
#         df['id_genre'] = genre.loc['[]']['id_genre']
#     else:
#         artist1_main_genre = eval(artist1_genres)[0]
#         df['id_genre'] = genre.loc[artist1_main_genre]['id_genre']
#     print(i)

df.to_csv('csv/data_with_genres_id.csv')

