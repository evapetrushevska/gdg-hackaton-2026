from pathlib import Path
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


PROJECT_ROOT = Path(__file__).resolve().parents[1]

MOVIE_DATA_PATH = PROJECT_ROOT / "data" / "tmdb_movie_details_clean.csv"
WATCHED_PATH = PROJECT_ROOT / "user_data" / "user1" / "watched.csv"
WATCHLIST_PATH = PROJECT_ROOT / "user_data" / "user1" / "watchlist.csv"

OUTPUT_PATH = PROJECT_ROOT / "output" / "user1_personal_recommendations.csv"

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


def load_user_data():
    print("Looking for watched file here:")
    print(WATCHED_PATH)

    print("\nLooking for watchlist file here:")
    print(WATCHLIST_PATH)

    if not WATCHED_PATH.exists():
        print("\nERROR: watched.csv was not found.")
        exit()

    if not WATCHLIST_PATH.exists():
        print("\nERROR: watchlist.csv was not found.")
        exit()

    watched_df = pd.read_csv(WATCHED_PATH)
    watchlist_df = pd.read_csv(WATCHLIST_PATH)

    watched_df["Const"] = watched_df["Const"].fillna("").astype(str).str.strip()
    watchlist_df["Const"] = watchlist_df["Const"].fillna("").astype(str).str.strip()

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
    # Want-to-watch means interest, but weaker than actual rating
    return 1.0


def build_user_profile(movies_df, watched_df, watchlist_df, movie_matrix):
    user_profile_vector = None
    known_imdb_ids = set()

    matched_watched = 0
    skipped_watched = 0
    matched_watchlist = 0
    skipped_watchlist = 0

    print("\nBuilding user1 taste profile...\n")

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
        print(f"Watched: {title} | Rating: {row.get('Your Rating')} | Weight: {weight}")

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


def normalize_column(series):
    min_value = series.min()
    max_value = series.max()

    if max_value == min_value:
        return series * 0

    return (series - min_value) / (max_value - min_value)


def add_final_ranking_score(recommendations):
    recommendations = recommendations.copy()

    recommendations["rating_norm"] = recommendations["vote_average"] / 10
    recommendations["popularity_norm"] = normalize_column(recommendations["popularity"])
    recommendations["vote_count_norm"] = normalize_column(recommendations["vote_count"])

    # Main importance is still similarity.
    # Rating/popularity/vote_count only help rank better movies slightly higher.
    recommendations["final_score"] = (
    recommendations["recommendation_score"] * 0.85
    + recommendations["rating_norm"] * 0.10
    + recommendations["popularity_norm"] * 0.03
    + recommendations["vote_count_norm"] * 0.02
)

    return recommendations


def recommend_movies(
    movies_df,
    user_profile_vector,
    known_imdb_ids,
    movie_matrix,
    number_of_recommendations=15
):
    if user_profile_vector is None:
        print("\nNo matching movies found.")
        return

    similarity_scores = cosine_similarity(user_profile_vector, movie_matrix).flatten()

    movies_df = movies_df.copy()
    movies_df["recommendation_score"] = similarity_scores

    recommendations = movies_df[
        ~movies_df["imdb_id"].isin(known_imdb_ids)
    ].copy()

    # Optional quality filter: avoid very obscure movies
    recommendations = recommendations[recommendations["vote_count"] >= 100]

    recommendations = add_final_ranking_score(recommendations)

    recommendations = recommendations.sort_values(
        by="final_score",
        ascending=False
    )
    OUTPUT_PATH.parent.mkdir(exist_ok=True)

    recommendations.to_csv(OUTPUT_PATH, index=False)

    print(f"\nSaved recommendations to: {OUTPUT_PATH}")

    print("\nPersonal recommendations for user1:\n")

    for _, row in recommendations.head(number_of_recommendations).iterrows():
        print(
            f"{row['title']} | "
            f"Final Score: {row['final_score']:.3f} | "
            f"Similarity: {row['recommendation_score']:.3f} | "
            f"TMDb Rating: {row['vote_average']} | "
            f"Votes: {int(row['vote_count'])} | "
            f"Genres: {row['genres']}"
        )


def main():
    movies_df = load_movies()
    watched_df, watchlist_df = load_user_data()

    print("\nTMDb movies loaded:", len(movies_df))
    print("User1 watched/rated movies loaded:", len(watched_df))
    print("User1 watchlist movies loaded:", len(watchlist_df))

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