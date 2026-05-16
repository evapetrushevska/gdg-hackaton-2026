import pandas as pd

df = pd.read_csv("data/tmdb_movie_details.csv")

# Convert release_date to real date
df["release_date"] = pd.to_datetime(df["release_date"], errors="coerce")

# Keep only movies that have already been released
today = pd.Timestamp.today()
df = df[df["release_date"] <= today]

# Remove movies with missing overview
df = df.dropna(subset=["overview"])

# Remove movies with very low vote count
# This helps avoid strange/unreliable movies
df = df[df["vote_count"] >= 50]

# Sort by popularity
df = df.sort_values(by="popularity", ascending=False)

df.to_csv("data/tmdb_movie_details_clean.csv", index=False)

print("Clean movies:", len(df))
print(df[["tmdb_id", "title", "release_date", "vote_average", "vote_count", "popularity"]].head(20))