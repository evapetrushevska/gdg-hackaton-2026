import gzip
import json
import requests
import pandas as pd
from datetime import datetime

today = datetime.today()
date_str = today.strftime("%m_%d_%Y")

url = f"https://files.tmdb.org/p/exports/movie_ids_{date_str}.json.gz"

print("Downloading:", url)

response = requests.get(url)

if response.status_code != 200:
    print("Failed to download file.")
    print("Status code:", response.status_code)
    print("Try again tomorrow or check the date format.")
    exit()

gz_path = "data/tmdb_movie_ids.json.gz"

with open(gz_path, "wb") as file:
    file.write(response.content)

movies = []

with gzip.open(gz_path, "rt", encoding="utf-8") as file:
    for line in file:
        movies.append(json.loads(line))

df = pd.DataFrame(movies)

print(df.head())
print("Total movies:", len(df))

df.to_csv("data/tmdb_movie_ids.csv", index=False)

print("Saved to data/tmdb_movie_ids.csv")