import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


MOVIE_DATA_PATH = "data/tmdb_movie_details_clean.csv"
WATCHED_PATH = "user_data/watched.csv"
WATCHLIST_PATH = "user_data/watchlist.csv"


def load_movies():
    movies_df = pd.read_csv(MOVIE_DATA_PATH)

    movies_df["imdb_id"] = movies_df["imdb_id"].fillna("")
    movies_df["overview"] = movies_df["overview"].fillna("")
    movies_df["genres"] = movies_df["genres"].fillna("")
    movies_df["keywords"] = movies_df["keywords"].fillna("")
    movies_df["cast"] = movies_df["cast"].fillna("")
    movies_df["director"] = movies_df["director"].fillna("")

    return movies_df


def load_user_data():
    watched_df = pd.read_csv(WATCHED_PATH)
    watchlist_df = pd.read_csv(WATCHLIST_PATH)

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
    rating = row.get("Your Rating")

    if pd.isna(rating):
        return 0.5

    rating = float(rating)

    # IMDb rating scale:
    # 10 -> +5
    # 8  -> +3
    # 5  -> 0
    # 3  -> -2
    return rating - 5


def get_watchlist_weight():
    # Want-to-watch means interest, but weaker than an actual high rating
    return 1.0


def build_user_profile(movies_df, watched_df, watchlist_df, movie_matrix):
    user_profile_vector = None
    known_imdb_ids = set()

    print("\nBuilding personal taste profile...\n")

    # Watched/rated movies
    for _, row in watched_df.iterrows():
        imdb_id = str(row["Const"]).strip()
        known_imdb_ids.add(imdb_id)

        matches = movies_df[movies_df["imdb_id"] == imdb_id]

        if matches.empty:
            print(f"Skipped watched movie, not found in TMDb database: {row['Title']} ({imdb_id})")
            continue

        movie_index = matches.index[0]
        weight = get_watched_weight(row)

        movie_vector = movie_matrix[movie_index] * weight

        if user_profile_vector is None:
            user_profile_vector = movie_vector
        else:
            user_profile_vector = user_profile_vector + movie_vector

        print(f"Watched: {row['Title']} | Your rating: {row['Your Rating']} | Weight: {weight}")

    # Watchlist movies
    for _, row in watchlist_df.iterrows():
        imdb_id = str(row["Const"]).strip()
        known_imdb_ids.add(imdb_id)

        matches = movies_df[movies_df["imdb_id"] == imdb_id]

        if matches.empty:
            print(f"Skipped watchlist movie, not found in TMDb database: {row['Title']} ({imdb_id})")
            continue

        movie_index = matches.index[0]
        weight = get_watchlist_weight()

        movie_vector = movie_matrix[movie_index] * weight

        if user_profile_vector is None:
            user_profile_vector = movie_vector
        else:
            user_profile_vector = user_profile_vector + movie_vector

        print(f"Want to watch: {row['Title']} | Weight: {weight}")

    return user_profile_vector, known_imdb_ids


def recommend_movies(movies_df, user_profile_vector, known_imdb_ids, movie_matrix, number_of_recommendations=10):
    if user_profile_vector is None:
        print("\nNo matching movies found between your IMDb files and the TMDb database.")
        print("This probably means your TMDb database is too small.")
        return

    similarity_scores = cosine_similarity(user_profile_vector, movie_matrix).flatten()

    movies_df["recommendation_score"] = similarity_scores

    recommendations = movies_df[
        ~movies_df["imdb_id"].isin(known_imdb_ids)
    ].copy()

    recommendations = recommendations.sort_values(
        by="recommendation_score",
        ascending=False
    )

    print("\nPersonal recommendations:\n")

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

    print("TMDb movies loaded:", len(movies_df))
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