import pandas as pd
import numpy as np
import random
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler
import warnings

class MLP:
    def __init__(self):
        self.rna = None
        self.rna_genres = None
        self.hidden_neurons = 40
        self.learning_rates = 0.001
        self.activation = 'tanh'
        self.tracks_full = pd.read_csv("csv/data_with_genres_id.csv")
        self.genres = pd.read_csv('csv/data_by_genres.csv')
        self.tracks = pd.read_csv("csv/normalized_data.csv")
        

    # def setTracks(self):

    #     features = [
    #         'valence', 'acousticness', 'danceability', 'duration_ms', 'energy',
    #         'instrumentalness', 'liveness', 'loudness', 'speechiness', 'popularity', 'id_genre', 'id_artist'
    #     ]
    #     data = self.tracks_full[features]

    #     scaler = StandardScaler()
    #     data_scaled = scaler.fit_transform(data)

    #     tracks = pd.DataFrame(data_scaled, columns=features)

    #     return tracks

    def run(self,liked,disliked):
        self.train(liked,disliked)
        return self.predict(liked)

    def train(self,liked,disliked):

        tracks_likes = self.tracks.copy().sort_values('popularity', ascending=False)
        # genre_likes = self.genres.copy()

        tracks_likes['like'] = 1*self.tracks_full['id'].isin(liked).astype(int) - 100*self.tracks_full['id'].isin(disliked).astype(int)

        tracks_likes['order'] = tracks_likes['like'].apply(lambda x: 1 if x == 0 else 0)
        tracks_likes = tracks_likes.sort_values('order').drop('order',axis=1)


        
        train_ratio = 0.6
        # valid_ratio = 0.2

        train_i = int(train_ratio * len(tracks_likes))
        # valid_i = int(valid_ratio * len(tracks_likes))

        train_input = tracks_likes.iloc[:train_i, :-1]
        train_target = tracks_likes.iloc[:train_i, -1]

        # genre_train_i = int(train_ratio * len(tracks_likes))

        # genre_train_input = tracks_likes.iloc[:train_i, :-1]
        # genre_train_target = tracks_likes.iloc[:train_i, -1]

        # valid_input = tracks_likes.iloc[train_i:train_i + valid_i, :-1]
        # valid_target = tracks_likes.iloc[train_i:train_i + valid_i, -1]
        
        # rna_genres = MLPClassifier(
        #     hidden_layer_sizes=(self.hidden_neurons,),
        #     learning_rate_init=self.learning_rates,
        #     activation=self.activation,
        #     solver='adam',
        #     max_iter=500,
        #     shuffle=False
        # )

        rna = MLPClassifier(
            hidden_layer_sizes=(self.hidden_neurons,),
            learning_rate_init=self.learning_rates,
            activation=self.activation,
            solver='adam',
            max_iter=500,
            shuffle=False
        )
        rna.fit(train_input, train_target)
        # preds = rna.predict(valid_input)
        # acc = accuracy_score(valid_target, preds)
        self.rna = rna
        
    
    def predict(self,liked):
        probs = self.rna.predict_proba(self.tracks)[:, 1]
        tracks_copy = self.tracks_full.copy()
        tracks_copy['like_prob'] = probs
        recommended_tracks = (
            tracks_copy
            #.sort_values('popularity', ascending=False).iloc[0:1000]
            .sort_values('like_prob', ascending=False)[~tracks_copy['id'].isin(liked)])
        return recommended_tracks