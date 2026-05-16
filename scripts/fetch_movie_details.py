import os
import time
import requests
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")

if not API_KEY:
    print("ERROR: TMDB_API_KEY was not found in .env")
    exit()

ids_df = pd.read_csv("data/tmdb_movie_ids.csv")

ids_df = ids_df[ids_df["adult"] == False]
ids_df = ids_df.sort_values(by="popularity", ascending=False)

movie_ids = ids_df["id"].head(5000).tolist()

movies = []

for index, movie_id in enumerate(movie_ids, start=1):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}"

    params = {
        "api_key": API_KEY,
        "language": "en-US",
        "append_to_response": "credits,keywords"
    }

    try:
        response = requests.get(url, params=params, timeout=20)

        if response.status_code == 200:
            data = response.json()

            director = None
            for person in data.get("credits", {}).get("crew", []):
                if person.get("job") == "Director":
                    director = person.get("name")
                    break

            cast = [
                person.get("name")
                for person in data.get("credits", {}).get("cast", [])[:5]
            ]

            keywords = [
                item.get("name")
                for item in data.get("keywords", {}).get("keywords", [])
            ]

            movies.append({
                "tmdb_id": data.get("id"),
                "imdb_id": data.get("imdb_id"),
                "title": data.get("title"),
                "original_title": data.get("original_title"),
                "overview": data.get("overview"),
                "release_date": data.get("release_date"),
                "genres": [genre["name"] for genre in data.get("genres", [])],
                "keywords": keywords,
                "cast": cast,
                "director": director,
                "vote_average": data.get("vote_average"),
                "vote_count": data.get("vote_count"),
                "popularity": data.get("popularity"),
                "runtime": data.get("runtime"),
                "poster_path": data.get("poster_path"),
            })

            print(f"{index}/{len(movie_ids)} Saved: {data.get('title')}")

        else:
            print(f"{index}/{len(movie_ids)} Failed ID {movie_id}: {response.status_code}")

    except requests.exceptions.RequestException as error:
        print(f"{index}/1000 Connection error for ID {movie_id}")
        print("Skipping this movie and continuing...")

    # Save progress every 50 movies
    if index % 50 == 0:
        temp_df = pd.DataFrame(movies)
        temp_df.to_csv("data/tmdb_movie_details.csv", index=False)
        print("Progress saved.")

    time.sleep(0.3)

df = pd.DataFrame(movies)
df.to_csv("data/tmdb_movie_details.csv", index=False)

print("Done!")
print("Saved to data/tmdb_movie_details.csv")
print("Movies saved:", len(df))