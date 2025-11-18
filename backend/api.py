from fastapi import FastAPI, Form, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import ast
from spotify_controller import SpotifyController
from mlp_controller import MLP
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

spotify = SpotifyController()
mlp = MLP()

def formatTracks(df):
    df['artist'] = df['artists'].apply(lambda x: ast.literal_eval(x)[0])
    df['coverUrl'] = spotify.getCovers(','.join(df['id'].to_list()))
    df['title'] = df['name']
    df = df[['id','title','artist','coverUrl']]
    return df

@app.get('/')
def root():
    return {'test':'fastapi'}

@app.get('/popular-tracks/{amount}')
def getTracks(amount:int):
    df = pd.read_csv('csv/data.csv').sort_values(by='popularity',ascending=False).iloc[0:amount]
    df = formatTracks(df)
    df.index = list(range(amount))
    tracks = [df.iloc[i].to_dict() for i in range(amount)]
    return tracks

@app.get('/recommended-tracks/{amount}')
async def getRecommendedTracks(amount:int,liked:List[str] = Query(...)): # MLP
    print(liked)
    df = mlp.run(liked).sort_values(by='like_prob',ascending=False).iloc[0:amount]
    df = formatTracks(df)
    df.index = list(range(amount))
    tracks = [df.iloc[i].to_dict() for i in range(amount)]
    return tracks
