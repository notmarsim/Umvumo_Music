import pandas as pd
import ast
import matplotlib.pyplot as plt


genre_data = pd.read_csv("csv/data_with_genres.csv")

print("formato inicial:", genre_data.shape)


def parse_genres(x):
    try:
        # converte string em lista
        if isinstance(x, str):
            val = ast.literal_eval(x)
        else:
            val = x


        if isinstance(val, list):
            flat = []
            for item in val:
                if isinstance(item, list):
                    flat.extend(item)
                elif isinstance(item, str):

                    try:
                        sub = ast.literal_eval(item)
                        if isinstance(sub, list):
                            flat.extend(sub)
                        else:
                            flat.append(sub)
                    except Exception:
                        flat.append(item)

            return [g.strip() for g in flat if g.strip() not in ("", "[]", "unknown")]
        return []
    except Exception:
        return []


genre_data["genres"] = genre_data["genres"].apply(parse_genres)


genre_exploded = genre_data.explode("genres", ignore_index=True)
genre_exploded = genre_exploded[
    genre_exploded["genres"].notna() & (genre_exploded["genres"] != "")
]


genre_counts = genre_exploded["genres"].value_counts()

print("top 20 gêneros mais frequentes (individualmente):")
print(genre_counts.head(20))


plt.figure(figsize=(12, 6))
genre_counts.head(20).plot(kind='barh', color='lightcoral')
plt.title("Top 20 Gêneros Mais Frequentes", fontsize=14)
plt.xlabel("Frequência")
plt.ylabel("Gênero")
plt.gca().invert_yaxis()  # deixa o mais frequente no topo
plt.tight_layout()
plt.show()
