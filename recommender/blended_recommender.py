from pathlib import Path
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


PROJECT_ROOT = Path(__file__).resolve().parents[1]

MOVIE_DATA_PATH = PROJECT_ROOT / "data" / "tmdb_movie_details_clean.csv"
USER_DATA_FOLDER = PROJECT_ROOT / "user_data"

OUTPUT_PATH = PROJECT_ROOT / "output" / "blended_recommendations.csv"

USERS = ["user1", "user2", "user3"]


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
        + str(row["overview"])
    )


def load_user_data(user_name):
    watched_path = USER_DATA_FOLDER / user_name / "watched.csv"
    watchlist_path = USER_DATA_FOLDER / user_name / "watchlist.csv"

    if not watched_path.exists():
        print(f"ERROR: Missing file: {watched_path}")
        return None, None

    if not watchlist_path.exists():
        print(f"ERROR: Missing file: {watchlist_path}")
        return None, None

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

    # 10 -> +5
    # 8  -> +3
    # 5  -> 0
    # 3  -> -2
    # 1  -> -4
    return rating - 5


def get_watchlist_weight():
    return 1.0


def build_single_user_profile(user_name, movies_df, movie_matrix):
    watched_df, watchlist_df = load_user_data(user_name)

    if watched_df is None or watchlist_df is None:
        return None, set()

    user_profile_vector = None
    known_imdb_ids = set()

    matched_watched = 0
    skipped_watched = 0
    matched_watchlist = 0
    skipped_watchlist = 0

    print(f"\nBuilding taste profile for {user_name}...\n")

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
        print(f"{user_name} watched: {title} | Rating: {row.get('Your Rating')} | Weight: {weight}")

    # Want-to-watch movies
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
        print(f"{user_name} wants to watch: {title} | Weight: {weight}")

    print(f"\n{user_name} match summary:")
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


def build_blended_recommendations(movies_df, movie_matrix, number_of_recommendations=20):
    user_scores = []
    all_known_imdb_ids = set()
    active_users = []

    for user_name in USERS:
        user_profile_vector, known_imdb_ids = build_single_user_profile(
            user_name,
            movies_df,
            movie_matrix
        )

        if user_profile_vector is None:
            print(f"\nSkipping {user_name} because no profile could be built.")
            continue

        similarity_scores = cosine_similarity(user_profile_vector, movie_matrix).flatten()

        user_scores.append(similarity_scores)
        all_known_imdb_ids.update(known_imdb_ids)
        active_users.append(user_name)

    if len(user_scores) < 2:
        print("\nNeed at least 2 users for blended recommendations.")
        return

    score_df = movies_df.copy()

    for index, user_name in enumerate(active_users):
        score_df[f"{user_name}_score"] = user_scores[index]

    user_score_columns = [f"{user_name}_score" for user_name in active_users]

    score_df["average_user_score"] = score_df[user_score_columns].mean(axis=1)
    score_df["minimum_user_score"] = score_df[user_score_columns].min(axis=1)

    # Quality signals
    score_df["rating_norm"] = score_df["vote_average"] / 10
    score_df["popularity_norm"] = normalize_column(score_df["popularity"])
    score_df["vote_count_norm"] = normalize_column(score_df["vote_count"])

    # Blended recommendation formula:
    # average_user_score = overall group taste
    # minimum_user_score = fairness, avoids movies one user probably dislikes
    # rating/popularity/vote_count = small quality boost
    score_df["group_score"] = (
        score_df["average_user_score"] * 0.65
        + score_df["minimum_user_score"] * 0.20
        + score_df["rating_norm"] * 0.10
        + score_df["popularity_norm"] * 0.03
        + score_df["vote_count_norm"] * 0.02
    )

    # Do not recommend anything already watched or already watchlisted by any user
    recommendations = score_df[
        ~score_df["imdb_id"].isin(all_known_imdb_ids)
    ].copy()

    # Avoid very obscure movies
    recommendations = recommendations[recommendations["vote_count"] >= 100]
    
    # Fairness filter: avoid movies that one user probably will not like
    recommendations = recommendations[recommendations["minimum_user_score"] >= 0.08]

    recommendations = recommendations.sort_values(
        by="group_score",
        ascending=False
    )

    OUTPUT_PATH.parent.mkdir(exist_ok=True)

    recommendations.to_csv(OUTPUT_PATH, index=False)

    print(f"\nSaved blended recommendations to: {OUTPUT_PATH}")

    print("\n==============================")
    print("Blended group recommendations")
    print("==============================")
    print("Users included:", ", ".join(active_users))
    print()

    for _, row in recommendations.head(number_of_recommendations).iterrows():
        user_score_text = " | ".join(
            [f"{user}: {row[f'{user}_score']:.3f}" for user in active_users]
        )

        print(
            f"{row['title']} | "
            f"Group Score: {row['group_score']:.3f} | "
            f"Avg: {row['average_user_score']:.3f} | "
            f"Min: {row['minimum_user_score']:.3f} | "
            f"TMDb Rating: {row['vote_average']} | "
            f"Genres: {row['genres']}"
        )
        print(f"User scores -> {user_score_text}")
        print()


def main():
    movies_df = load_movies()

    print("TMDb movies loaded:", len(movies_df))

    movies_df["features"] = movies_df.apply(create_feature_text, axis=1)

    vectorizer = TfidfVectorizer(stop_words="english")
    movie_matrix = vectorizer.fit_transform(movies_df["features"])

    build_blended_recommendations(
        movies_df,
        movie_matrix
    )


if __name__ == "__main__":
    main()