# elm_controller.py

import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

class ELM:
    def __init__(self, hidden_neurons=40):
        self.hidden_neurons = hidden_neurons
        self.tracks_full = pd.read_csv("csv/data_with_genres_id.csv")
        self.tracks = self.setTracks()#pd.read_csv("csv/normalized_data.csv")  # já normalizados
        self.minmax = None
        self.target_min = None
        self.target_max = None
        self.pesos = None
        self.bias = None
        self.pesos_out = None

    def setTracks(self):

        features = [
            'valence', 'acousticness', 'danceability', 'duration_ms', 'energy',
            'instrumentalness', 'liveness', 'loudness', 'speechiness', 'popularity', 
            'id_genre', 'id_artist'
        ]
        data = self.tracks_full[features]
        scaler = StandardScaler()
        data_scaled = scaler.fit_transform(data)
        tracks = pd.DataFrame(data_scaled, columns=features)
        return tracks
    
    def setTrainData(self,liked,disliked):
        ### cria coluna "like" igual ao MLP
        tracks_likes = self.setTracks() #tracks.copy()
        tracks_likes['like'] = (
            100*self.tracks_full['id'].isin(liked).astype(int)
            - 1*self.tracks_full['id'].isin(disliked).astype(int)
        )
        tracks_likes['order'] = tracks_likes['like'].apply(lambda x: 1 if x == 0 else 0)
        tracks_likes = tracks_likes.sort_values('order').drop('order',axis=1)
        #tracks_likes = tracks_likes[tracks_likes['like'] != 0]

        X = tracks_likes.iloc[:, :-1].values
        y = tracks_likes.iloc[:, -1].values.reshape(-1, 1)

        return (X,y)

    # ----- Ativação -----
    def sigmoid(self, X):
        return 1 / (1 + np.exp(-X))

    # ----- Treinamento -----
    def train(self, liked, disliked):

        
        
        X,y = self.setTrainData(liked,disliked)


        # guarda min/max para reescalar depois
        self.target_min = y.min()
        self.target_max = y.max()

        y_scaled = (y - self.target_min) / (self.target_max - self.target_min)

        N, D = X.shape

        # gera pesos aleatórios
        self.pesos = np.random.rand(D, self.hidden_neurons)
        self.bias = np.random.rand(1, self.hidden_neurons)
        bias_expandido = np.ones((N, 1)).dot(self.bias)

        # Hidden layer
        H = self.sigmoid(X.dot(self.pesos) + bias_expandido)

        # pesos de saída = pseudoinversa
        H_inv = np.linalg.pinv(H)
        self.pesos_out = H_inv.dot(y_scaled)

        print('h',y.min())

    # ----- Predição -----
    def predict(self):
        X = self.setTracks().values #self.tracks.copy().values
        N = X.shape[0]

        bias_expandido = np.ones((N, 1)).dot(self.bias)
        H = self.sigmoid(X.dot(self.pesos) + bias_expandido)
        y_pred = H.dot(self.pesos_out)
        
        unscaled = y_pred*(self.target_max - self.target_min) + self.target_min

        return unscaled.reshape(-1)

    # ----- Execução completa -----
    def run(self, liked, disliked):
        self.train(liked, disliked)
        scores = self.predict()

        df = self.tracks_full.copy()
        df['like_prob'] = scores #+ np.array( [1  if np.random.randint(1,100) == 99 else 0 for _ in range(len(scores))]  )
        print(type(scores),scores)
        return df.sort_values("like_prob", ascending=False)[~df['id'].isin(liked)]