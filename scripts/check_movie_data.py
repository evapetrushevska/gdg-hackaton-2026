import pandas as pd

df = pd.read_csv("data/tmdb_movie_details_clean.csv")

print("Rows:", len(df))
print("Columns:")
print(df.columns)

print("\nFirst 5 movies:")
print(df[["tmdb_id", "imdb_id", "title", "genres", "vote_average", "popularity"]].head())