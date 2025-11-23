import pandas as pd
import ast
df = pd.read_csv('csv/data_with_genres.csv')

genre = pd.read_csv('csv/data_by_genres.csv')
genre.index = genre['genres']
df['id_genre'] = [0]*170653

def create_genre_ids(genres):
    
    artist1_genres = eval(genres)
    if artist1_genres != []: artist1_genres = artist1_genres[0]
    if artist1_genres in ['[]',[]]:
        return genre.loc['[]']['id_genre']
    else:
        artist1_main_genre = eval(artist1_genres)[0]
        return genre.loc[artist1_main_genre]['id_genre']

print('genres')
df['id_genre'] = df['genres'].apply(create_genre_ids)

df.to_csv('csv/data_with_genres_id.csv')


artist = pd.read_csv('csv/data_w_genres.csv').sort_values('id_artist')
artist.index = artist['artists']
df = pd.read_csv('csv/data_with_genres_id.csv')

def create_artist_id(artists):
    global i
    main_artist = eval(artists)[0]
    if main_artist == 'n/a':
        return -1 
    return artist.loc[main_artist]['id_artist']


print('artists')
df['id_artist'] = df['artists'].apply(create_artist_id)

df.to_csv('csv/data_with_genres_id.csv')

