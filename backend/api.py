from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import ast
from spotify_controller import SpotifyController
from mlp_controller import MLP
from elm_controller import ELM
from typing import List, Optional

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://localhost",
    "http://127.0.0.1:8080"  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],#origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

genres = pd.read_csv('csv/data_by_genres.csv')
spotify = SpotifyController()
mlp = MLP()
#elm = ELM()

def formatTracks(df: pd.DataFrame):
    df['artist'] = df['artists'].apply(lambda x: ast.literal_eval(x)[0])
    df['coverUrl'] = spotify.getCovers(','.join(df['id'].to_list()))
    df['title'] = df['name']
    df['genre'] = df['id_genre'].apply(lambda x: genres.iloc[x]['genres'])
    df = df[['id','title','artist','coverUrl','genre']]
    return df

@app.get('/')
def root():
    return {'test':'fastapi'}

@app.get('/popular-tracks/{amount}')
def getTracks(amount:int):
    df = pd.read_csv('csv/data_with_genres_id.csv').sort_values(by='popularity',ascending=False).iloc[0:amount]
    df = formatTracks(df)
    tracks = [df.iloc[i].to_dict() for i in range(amount)]
    return tracks


@app.get('/recommended-tracks/{amount}')
async def getRecommendedTracks(
    amount:int,
    liked:Optional[List[str]] = Query(None),
    disliked:Optional[List[str]] = Query(None),
    preferences:Optional[List[str]] = Query(None)
): # MLP
    print('LIKED:',liked)
    print('DISLIKED:',disliked)
    print('PREFS',preferences)
    liked = liked if liked else []
    disliked = disliked if disliked else []
    df = mlp.run(liked,disliked,preferences)[0:amount]
    df = formatTracks(df)
    tracks = [df.iloc[i].to_dict() for i in range(amount)]
    return tracks
