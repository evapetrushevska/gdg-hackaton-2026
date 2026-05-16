from pathlib import Path
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer


PROJECT_ROOT = Path(__file__).resolve().parents[1]

MOVIE_DATA_PATH = PROJECT_ROOT / "data" / "tmdb_movie_details_clean.csv"
USER_DATA_FOLDER = PROJECT_ROOT / "user_data"
OUTPUT_FOLDER = PROJECT_ROOT / "output"


def load_movies():
    movies_df = pd.read_csv(MOVIE_DATA_PATH)

    movies_df["imdb_id"] = movies_df["imdb_id"].fillna("").astype(str).str.strip()
    movies_df["overview"] = movies_df["overview"].fillna("")
    movies_df["genres"] = movies_df["genres"].fillna("")
    movies_df["keywords"] = movies_df["keywords"].fillna("")
    movies_df["cast"] = movies_df["cast"].fillna("")
    movies_df["director"] = movies_df["director"].fillna("")

    movies_df["vote_average"] = pd.to_numeric(movies_df["vote_average"], errors="coerce").fillna(0)
    movies_df["vote_count"] = pd.to_numeric(movies_df["vote_count"], errors="coerce").fillna(0)
    movies_df["popularity"] = pd.to_numeric(movies_df["popularity"], errors="coerce").fillna(0)

    return movies_df


def create_feature_text(row):
    return (
        str(row["genres"]) + " "
        + str(row["keywords"]) + " "
        + str(row["cast"]) + " "
        + str(row["director"]) + " "
    )


def build_movie_matrix(movies_df):
    movies_df["features"] = movies_df.apply(create_feature_text, axis=1)

    vectorizer = TfidfVectorizer(stop_words="english")
    movie_matrix = vectorizer.fit_transform(movies_df["features"])

    return movie_matrix


def load_user_data(user_name):
    watched_path = USER_DATA_FOLDER / user_name / "watched.csv"
    watchlist_path = USER_DATA_FOLDER / user_name / "watchlist.csv"

    if not watched_path.exists():
        raise FileNotFoundError(f"Missing watched file: {watched_path}")

    if not watchlist_path.exists():
        raise FileNotFoundError(f"Missing watchlist file: {watchlist_path}")

    watched_df = pd.read_csv(watched_path)
    watchlist_df = pd.read_csv(watchlist_path)

    watched_df["Const"] = watched_df["Const"].fillna("").astype(str).str.strip()
    watchlist_df["Const"] = watchlist_df["Const"].fillna("").astype(str).str.strip()

    return watched_df, watchlist_df


def get_watched_weight(row):
    rating = row.get("Your Rating")

    if pd.isna(rating) or rating == "":
        return 0.5

    rating = float(rating)

    return (rating - 5.5) / 4.5


def get_watchlist_weight():
    return 1.0


def build_user_profile(user_name, movies_df, movie_matrix):
    watched_df, watchlist_df = load_user_data(user_name)

    user_profile_vector = None
    known_imdb_ids = set()

    matched_watched = 0
    skipped_watched = 0
    matched_watchlist = 0
    skipped_watchlist = 0

    print(f"\nBuilding taste profile for {user_name}...\n")

    for _, row in watched_df.iterrows():
        imdb_id = str(row["Const"]).strip()

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

    for _, row in watchlist_df.iterrows():
        imdb_id = str(row["Const"]).strip()

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

    print(f"{user_name} match summary:")
    print(f"Matched watched/rated movies: {matched_watched}")
    print(f"Skipped watched/rated movies: {skipped_watched}")
    print(f"Matched watchlist movies: {matched_watchlist}")
    print(f"Skipped watchlist movies: {skipped_watchlist}")

    return user_profile_vector, known_imdb_ids


def normalize_column(series):
    min_value = series.min()
    max_value = series.max()

    if max_value == min_value:
        return series * 0

    return (series - min_value) / (max_value - min_value)


def add_quality_score(recommendations, similarity_column, final_column):
    recommendations = recommendations.copy()

    recommendations["rating_norm"] = recommendations["vote_average"] / 10
    recommendations["popularity_norm"] = normalize_column(recommendations["popularity"])
    recommendations["vote_count_norm"] = normalize_column(recommendations["vote_count"])

    recommendations[final_column] = (
        recommendations[similarity_column] * 0.85
        + recommendations["rating_norm"] * 0.10
        + recommendations["popularity_norm"] * 0.03
        + recommendations["vote_count_norm"] * 0.02
    )

    return recommendations

def build_user_profile_from_data(user_data, movies_df, movie_matrix):
    user_profile_vector = None
    known_imdb_ids = set()

    watched = user_data.get("watched", [])
    watchlist = user_data.get("watchlist", [])

    # Watched movies are stronger because the user already watched them
    watched_weight = 0.6

    # Watchlist movies are weaker because they only show interest
    watchlist_weight = 0.2

    for movie in watched:
        imdb_id = str(movie.get("imdb_id", "")).strip()

        if imdb_id == "":
            continue

        known_imdb_ids.add(imdb_id)

        matches = movies_df[movies_df["imdb_id"] == imdb_id]

        if matches.empty:
            continue

        movie_index = matches.index[0]
        movie_vector = movie_matrix[movie_index] * watched_weight

        if user_profile_vector is None:
            user_profile_vector = movie_vector
        else:
            user_profile_vector = user_profile_vector + movie_vector

    for movie in watchlist:
        imdb_id = str(movie.get("imdb_id", "")).strip()

        if imdb_id == "":
            continue

        known_imdb_ids.add(imdb_id)

        matches = movies_df[movies_df["imdb_id"] == imdb_id]

        if matches.empty:
            continue

        movie_index = matches.index[0]
        movie_vector = movie_matrix[movie_index] * watchlist_weight

        if user_profile_vector is None:
            user_profile_vector = movie_vector
        else:
            user_profile_vector = user_profile_vector + movie_vector

    return user_profile_vector, known_imdb_ids