from pathlib import Path
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


PROJECT_ROOT = Path(__file__).resolve().parents[1]

MOVIE_DATA_PATH = PROJECT_ROOT / "data" / "tmdb_movie_details_clean.csv"

USER_NAME = "user1"
WATCHED_PATH = PROJECT_ROOT / "user_data" / USER_NAME / "watched.csv"
WATCHLIST_PATH = PROJECT_ROOT / "user_data" / USER_NAME / "watchlist.csv"


def load_movies():
    if not MOVIE_DATA_PATH.exists():
        print(f"ERROR: Could not find movie data file: {MOVIE_DATA_PATH}")
        exit()

    movies_df = pd.read_csv(MOVIE_DATA_PATH)

    required_columns = [
        "imdb_id",
        "overview",
        "genres",
        "keywords",
        "cast",
        "director",
        "title",
        "vote_average",
    ]

    for column in required_columns:
        if column not in movies_df.columns:
            print(f"ERROR: Missing column in movie data: {column}")
            exit()

    movies_df["imdb_id"] = movies_df["imdb_id"].fillna("").astype(str).str.strip()
    movies_df["overview"] = movies_df["overview"].fillna("")
    movies_df["genres"] = movies_df["genres"].fillna("")
    movies_df["keywords"] = movies_df["keywords"].fillna("")
    movies_df["cast"] = movies_df["cast"].fillna("")
    movies_df["director"] = movies_df["director"].fillna("")

    return movies_df


def load_user_data():
    if not WATCHED_PATH.exists():
        print(f"ERROR: Could not find watched file: {WATCHED_PATH}")
        exit()

    if not WATCHLIST_PATH.exists():
        print(f"ERROR: Could not find watchlist file: {WATCHLIST_PATH}")
        exit()

    watched_df = pd.read_csv(WATCHED_PATH)
    watchlist_df = pd.read_csv(WATCHLIST_PATH)

    required_columns = ["Const", "Title"]

    for column in required_columns:
        if column not in watched_df.columns:
            print(f"ERROR: Missing column in watched.csv: {column}")
            exit()

        if column not in watchlist_df.columns:
            print(f"ERROR: Missing column in watchlist.csv: {column}")
            exit()

    watched_df["Const"] = watched_df["Const"].fillna("").astype(str).str.strip()
    watchlist_df["Const"] = watchlist_df["Const"].fillna("").astype(str).str.strip()

    watched_df["status"] = "watched"
    watchlist_df["status"] = "want_to_watch"

    return watched_df, watchlist_df


def create_feature_text(row):
    return (
        str(row["genres"]) + " "
        + str(row["keywords"]) + " "
        + str(row["cast"]) + " "
        + str(row["director"]) + " "
        + str(row["overview"])
    )


def get_watched_weight(row):
    if "Your Rating" not in row:
        return 0.5

    rating = row.get("Your Rating")

    if pd.isna(rating) or rating == "":
        return 0.5

    rating = float(rating)

    # Rating logic:
    # 10 -> +5
    # 8  -> +3
    # 5  -> 0
    # 3  -> -2
    # 1  -> -4
    return rating - 5


def get_watchlist_weight():
    # Want-to-watch means interest, but weaker than an actual high rating
    return 1.0


def build_user_profile(movies_df, watched_df, watchlist_df, movie_matrix):
    user_profile_vector = None
    known_imdb_ids = set()

    matched_watched = 0
    matched_watchlist = 0
    skipped_watched = 0
    skipped_watchlist = 0

    print("\nBuilding personal taste profile for user1...\n")

    # Watched/rated movies
    for _, row in watched_df.iterrows():
        imdb_id = str(row["Const"]).strip()
        title = row["Title"]

        if imdb_id == "":
            skipped_watched += 1
            continue

        known_imdb_ids.add(imdb_id)

        matches = movies_df[movies_df["imdb_id"] == imdb_id]

        if matches.empty:
            skipped_watched += 1
            continue

        movie_index = matches.index[0]
        weight = get_watched_weight(row)

        movie_vector = movie_matrix[movie_index] * weight

        if user_profile_vector is None:
            user_profile_vector = movie_vector
        else:
            user_profile_vector = user_profile_vector + movie_vector

        matched_watched += 1
        print(f"Watched: {title} | Your rating: {row.get('Your Rating')} | Weight: {weight}")

    # Watchlist movies
    for _, row in watchlist_df.iterrows():
        imdb_id = str(row["Const"]).strip()
        title = row["Title"]

        if imdb_id == "":
            skipped_watchlist += 1
            continue

        known_imdb_ids.add(imdb_id)

        matches = movies_df[movies_df["imdb_id"] == imdb_id]

        if matches.empty:
            skipped_watchlist += 1
            continue

        movie_index = matches.index[0]
        weight = get_watchlist_weight()

        movie_vector = movie_matrix[movie_index] * weight

        if user_profile_vector is None:
            user_profile_vector = movie_vector
        else:
            user_profile_vector = user_profile_vector + movie_vector

        matched_watchlist += 1
        print(f"Want to watch: {title} | Weight: {weight}")

    print("\nMatch summary:")
    print(f"Matched watched/rated movies: {matched_watched}")
    print(f"Skipped watched/rated movies: {skipped_watched}")
    print(f"Matched watchlist movies: {matched_watchlist}")
    print(f"Skipped watchlist movies: {skipped_watchlist}")

    return user_profile_vector, known_imdb_ids


def recommend_movies(
    movies_df,
    user_profile_vector,
    known_imdb_ids,
    movie_matrix,
    number_of_recommendations=15
):
    if user_profile_vector is None:
        print("\nNo matching movies found between user1 IMDb files and the TMDb database.")
        print("This probably means the TMDb movie database is too small or the imdb_id column is missing.")
        return

    similarity_scores = cosine_similarity(user_profile_vector, movie_matrix).flatten()

    movies_df = movies_df.copy()
    movies_df["recommendation_score"] = similarity_scores

    # Do not recommend movies already watched or already in watchlist
    recommendations = movies_df[
        ~movies_df["imdb_id"].isin(known_imdb_ids)
    ].copy()

    recommendations = recommendations.sort_values(
        by="recommendation_score",
        ascending=False
    )

    print("\nPersonal recommendations for user1:\n")

    for _, row in recommendations.head(number_of_recommendations).iterrows():
        print(
            f"{row['title']} | "
            f"Score: {row['recommendation_score']:.3f} | "
            f"TMDb Rating: {row['vote_average']} | "
            f"Genres: {row['genres']}"
        )


def main():
    movies_df = load_movies()
    watched_df, watchlist_df = load_user_data()

    print(f"\nSelected user: {USER_NAME}")
    print("Movie data path:", MOVIE_DATA_PATH)
    print("Watched file:", WATCHED_PATH)
    print("Watchlist file:", WATCHLIST_PATH)

    print("\nTMDb movies loaded:", len(movies_df))
    print("Watched/rated IMDb movies loaded:", len(watched_df))
    print("Watchlist IMDb movies loaded:", len(watchlist_df))

    movies_df["features"] = movies_df.apply(create_feature_text, axis=1)

    vectorizer = TfidfVectorizer(stop_words="english")
    movie_matrix = vectorizer.fit_transform(movies_df["features"])

    user_profile_vector, known_imdb_ids = build_user_profile(
        movies_df,
        watched_df,
        watchlist_df,
        movie_matrix
    )

    recommend_movies(
        movies_df,
        user_profile_vector,
        known_imdb_ids,
        movie_matrix
    )


if __name__ == "__main__":
    main()