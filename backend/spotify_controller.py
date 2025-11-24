import requests
import os
from dotenv import load_dotenv


class SpotifyController:
    def __init__(self):
        load_dotenv()
        self.TOKEN = self.getToken()

    def getToken(self):
        clientId = os.getenv('SPOTIFY_CLIENT_ID')
        clientSecret = os.getenv('SPOTIFY_CLIENT_SECRET')
        body = {
            'grant_type': "client_credentials",
            'client_id': clientId,
            'client_secret': clientSecret
        }
        headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        }
        r =  requests.post("https://accounts.spotify.com/api/token",data=body,headers=headers)

        if r.status_code != 200:
            print("ERRO NO REQUEST")
            print("Status:", r.status_code)
            print("Resposta:", r)
            print(r.headers)
            return None
        
        data = r.json()

        return data['access_token']

    def getCovers(self,ids):

        headers = {
        "Authorization": f'Bearer {self.TOKEN}',
        }

        params = {
            'ids': ids
        }

        r = requests.get(f'https://api.spotify.com/v1/tracks',headers=headers,params=params)

        if r.status_code == 401:
            self.TOKEN = self.getToken()
            return self.getCovers()
        if r.status_code != 200:
            print("ERRO NO REQUEST")
            print("Status:", r.status_code)
            print("Resposta:", r.text)
            print(r.headers.get('Retry-After'))
            return None

        data = r.json()

        try:
            covers = [
                t['album']['images'][0]['url'] 
                if t['album']['images'] != [] else 
                'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'
                for t in data['tracks']
            ]
        except Exception as e:
            [print(t['album'] ) for t in data['tracks']]
            return
        
        return covers

