import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler


data = pd.read_csv("csv/data_with_genres.csv")


features = [
    'valence', 'acousticness', 'danceability', 'duration_ms', 'energy',
    'instrumentalness', 'liveness', 'loudness', 'speechiness', 'tempo'
]


data = data.dropna(subset=features)

scaler = MinMaxScaler(feature_range=(0, 1))
X_scaled = scaler.fit_transform(data[features])


df_scaled = pd.DataFrame(X_scaled, columns=features)


for col in data.columns:
    if col not in features:
        df_scaled[col] = data[col].values


output_path = "csv/data_with_genres_normalized.csv"
df_scaled.to_csv(output_path, index=False)

print(f"normalização concluída e salva em: {output_path}")
