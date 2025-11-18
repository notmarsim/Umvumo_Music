from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import ast
from spotify_controller import SpotifyController

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://localhost",
    "http://127.0.0.1:8080"  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
def root():
    return {'test':'fastapi'}

@app.get('/popular-tracks/{amount}')
def getTracks(amount:int):
    spotify = SpotifyController()
    df = pd.read_csv('csv/data.csv').sort_values(by='popularity',ascending=False).iloc[0:amount]
    df['artist'] = df['artists'].apply(lambda x: ast.literal_eval(x)[0])
    df['coverUrl'] = spotify.getCovers(','.join(df['id'].to_list()))
    df['title'] = df['name']
    df.index = list(range(amount))
    df = df[['id','title','artist','coverUrl']]

    tracks = [df.iloc[i].to_dict() for i in range(amount)]

    return tracks
