import pandas as pd

pd.set_option("display.max_columns", None)
pd.set_option("display.width", 200)
pd.set_option("display.max_colwidth", 50)

df = pd.read_csv("data/tmdb_movie_details_clean.csv")

preview = df[[
    "tmdb_id",
    "title",
    "release_date",
    "genres",
    "vote_average",
    "vote_count",
    "popularity"
]].head(30)

print(preview.to_string(index=False))