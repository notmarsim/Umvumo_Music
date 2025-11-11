import pandas as pd
import numpy as np
import random
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score
import warnings
warnings.filterwarnings("ignore")


data = pd.read_csv("csv/data_with_genres_normalized.csv")


random.seed(42)


rock_mask = data['genres'].str.contains("rock", case=False, na=False)
data['like'] = 0

rock_indexes = data[rock_mask].index.tolist()
num_likes = int(0.7 * len(rock_indexes))
liked_indexes = random.sample(rock_indexes, num_likes)

data.loc[liked_indexes, 'like'] = 1

print(f"Coluna 'like' criada — {len(liked_indexes)} músicas de rock marcadas como curtidas "
      f"({100 * len(liked_indexes) / len(rock_indexes):.1f}% do total de rock).")


features = [
    'valence', 'acousticness', 'danceability', 'duration_ms', 'energy',
    'instrumentalness', 'liveness', 'loudness', 'speechiness', 'tempo'
]

data = data.dropna(subset=features)

X = data[features]
y = data['like']

df = data[features].copy()
df['like'] = y.values

lst_results = []

for i in range(2):
    sd = i
    random.seed(sd)


    rand_indexes = list(np.random.choice(len(df), len(df), replace=False))
    X_shuff = df.iloc[rand_indexes, :]


    train_ratio = 0.6
    valid_ratio = 0.2

    train_i = int(train_ratio * len(X_shuff))
    valid_i = int(valid_ratio * len(X_shuff))

    train_input = X_shuff.iloc[:train_i, :-1]
    train_target = X_shuff.iloc[:train_i, -1]

    valid_input = X_shuff.iloc[train_i:train_i + valid_i, :-1]
    valid_target = X_shuff.iloc[train_i:train_i + valid_i, -1]

    test_input = X_shuff.iloc[train_i + valid_i:, :-1]
    test_target = X_shuff.iloc[train_i + valid_i:, -1]


    hidden_neurons = [10, 20, 30, 40]
    learning_rates = [0.1, 0.01, 0.001]
    activations = ['logistic', 'tanh', 'relu']

    best_acc = 0.0
    best_model = None

    for h in hidden_neurons:
        for lr in learning_rates:
            for act in activations:
                rna = MLPClassifier(
                    hidden_layer_sizes=(h,),
                    learning_rate_init=lr,
                    activation=act,
                    solver='adam',
                    max_iter=500,
                    shuffle=False,
                    random_state=sd
                )
                rna.fit(train_input, train_target)
                preds = rna.predict(valid_input)
                acc = accuracy_score(valid_target, preds)

                if acc > best_acc:
                    best_acc = acc
                    best_model = rna

    preds_test = best_model.predict(test_input)
    acc_test = accuracy_score(test_target, preds_test)
    lst_results.append(acc_test)
    print(f"Execução {i+1} concluída — Acurácia de teste: {acc_test:.4f}")

print("\nResultados finais:")
print(f"Média da acurácia: {np.mean(lst_results):.4f}")
print(f"Desvio padrão: {np.std(lst_results):.4f}")


probs = best_model.predict_proba(X)[:, 1]  # probabilidade de like = 1

data_pred = data.copy()
data_pred['like_prob'] = probs

# --- Ordena pelas músicas mais prováveis de o usuário gostar ---
top_musicas = data_pred.sort_values('like_prob', ascending=False)

print("\n🎧 Top 10 músicas que o modelo acha que o usuário vai gostar:")
print(top_musicas[['name', 'artists', 'genres', 'like_prob']].head(10))


top_musicas.to_csv('csv/music_predictions.csv', index=False)
print("\nResultados salvos em csv/music_predictions.csv")
