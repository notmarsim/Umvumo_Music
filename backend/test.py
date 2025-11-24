import pandas as pd
import numpy as np
import random
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler
import warnings

# df = pd.read_csv('csv/data_with_genres.csv')

# genre = pd.read_csv('csv/data_by_genres.csv')

# genre.index = genre['genres']
# df['id_genre'] = [0]*170653
# i = 2
# def create_genre_ids(genres):
#     global i
#     print(i)
#     i+=1
#     artist1_genres = eval(genres)
#     if artist1_genres != []: artist1_genres = artist1_genres[0]
#     if artist1_genres in ['[]',[]]:
#         return genre.loc['[]']['id_genre']
#     else:
#         artist1_main_genre = eval(artist1_genres)[0]
#         return genre.loc[artist1_main_genre]['id_genre']
    

# print('genres')
# df['id_genre'] = df['genres'].apply(create_genre_ids)
# df.to_csv('csv/data_with_genres_id.csv')






# artist = pd.read_csv('csv/data_w_genres.csv').sort_values('id_artist')
# artist.index = artist['artists']
# df = pd.read_csv('csv/data_with_genres_id.csv')

# def create_artist_id(artists):
#     global i
#     main_artist = eval(artists)[0]
#     if main_artist == 'n/a':
#         return -1 
#     return artist.loc[main_artist]['id_artist']


# print('artists')
# df['id_artist'] = df['artists'].apply(create_artist_id)

# df.to_csv('csv/data_with_genres_id.csv')







# g = {   
#     0:{ 'id': "pop", 'name': "Pop", 'keywords': ['pop','reggaeton'] },
#     1:{ 'id': "rock", 'name': "Rock", 'keywords': ["rock", "metal", "punk", "nwobhm",'black','death','hardcore'] },
#     2:{ 'id': "hip-hop", 'name': "Hip-Hop/Rap", 'keywords': ['hip hop','drill','rap','crunk'] },
#     3:{ 'id': "edm", 'name': "Eletrônica", 'keywords': ['edm','step','house','techno','electro','dance','phonk','synth','hardstyle'] },
#     4:{ 'id': "mpb", 'name': "MPB", 'keywords': ['mpb','samba','forro','bossa'] },
#     5:{ 'id': "sertanejo", 'name': "Sertanejo", 'keywords': ['sertanejo','brega'] },
#     6:{ 'id': "funk", 'name': "Funk", 'keywords': ['funk'] },
#     7:{ 'id': "indie", 'name': "Indie", 'keywords': ['indie','bedroom','shoegaze'] },
#     8:{ 'id': "jazz", 'name': "Jazz", 'keywords': ['jazz','blues'] },
#     9:{ 'id': "classical", 'name': "Clássica", 'keywords': ['classical','baroque'] },
#     10:{ 'id': "folk", 'name': "Folk", 'keywords': ['folk','country','bard'] },
#     11:{ 'id': "rnb", 'name': "R&B", 'keywords': ['R&B'] }
# }
# df = pd.read_csv('csv/data_by_genres.csv')

# def setPref(genre):
#     for _,pref in g.items():
        
#         if any(key in genre for key in pref['keywords']):
#             return pref['id']
#     return 'other'

# df['keyword'] = df['genres'].apply(setPref)

# df.to_csv('csv/data_by_genres.csv')


df = pd.read_csv('csv/data_with_genres_id.csv')

genres = pd.read_csv('csv/data_by_genres.csv')

def setPrefs(genId):
    
    return genres.iloc[genId]['keyword']

df['keyword'] = df['id_genre'].apply(setPrefs)

df.to_csv('csv/data_with_genres_id.csv')


