from sklearn.metrics.pairwise import cosine_similarity

from utils import (
    OUTPUT_FOLDER,
    load_movies,
    build_movie_matrix,
    build_user_profile,
    normalize_column,
)


USERS = ["user1", "user2", "user3"]


def recommend_blended(users, number_of_recommendations=20):
    movies_df = load_movies()
    movie_matrix = build_movie_matrix(movies_df)

    print("TMDb movies loaded:", len(movies_df))

    user_scores = []
    all_known_imdb_ids = []
    active_users = []

    for user_name in users:
        try:
            user_profile_vector, known_imdb_ids = build_user_profile(
                user_name,
                movies_df,
                movie_matrix
            )

            if user_profile_vector is None:
                continue

            similarity_scores = cosine_similarity(
                user_profile_vector,
                movie_matrix
            ).flatten()

            user_scores.append(similarity_scores)
            all_known_imdb_ids.extend(list(known_imdb_ids))
            active_users.append(user_name)

        except Exception as error:
            print(f"\nSkipping {user_name}: {error}")

    if len(user_scores) < 2:
        print("\nNeed at least 2 users.")
        return

    score_df = movies_df.copy()

    for index, user_name in enumerate(active_users):
        score_df[f"{user_name}_score"] = user_scores[index]

    user_score_columns = [
        f"{user_name}_score"
        for user_name in active_users
    ]

    score_df["average_user_score"] = score_df[user_score_columns].mean(axis=1)
    score_df["minimum_user_score"] = score_df[user_score_columns].min(axis=1)

    score_df["rating_norm"] = score_df["vote_average"] / 10
    score_df["popularity_norm"] = normalize_column(score_df["popularity"])
    score_df["vote_count_norm"] = normalize_column(score_df["vote_count"])

    score_df["group_score"] = (
        score_df["average_user_score"] * 0.65
        + score_df["minimum_user_score"] * 0.20
        + score_df["rating_norm"] * 0.10
        + score_df["popularity_norm"] * 0.03
        + score_df["vote_count_norm"] * 0.02
    )

    recommendations = score_df[
        ~score_df["imdb_id"].isin(all_known_imdb_ids)
    ].copy()

    recommendations = recommendations[
        recommendations["vote_count"] >= 100
    ]

    recommendations = recommendations[
        recommendations["minimum_user_score"] >= 0.08
    ]

    recommendations = recommendations.sort_values(
        by="group_score",
        ascending=False
    )

    output_path = OUTPUT_FOLDER / "blended_recommendations.csv"
    OUTPUT_FOLDER.mkdir(exist_ok=True)

    recommendations.to_csv(output_path, index=False)

    print(f"\nSaved blended recommendations to: {output_path}")

    print("\n==============================")
    print("Blended group recommendations")
    print("==============================")
    print("Users included:", ", ".join(active_users))
    print()

    for _, row in recommendations.head(number_of_recommendations).iterrows():

        user_score_text = " | ".join(
            [
                f"{user}: {row[f'{user}_score']:.3f}"
                for user in active_users
            ]
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
    recommend_blended(USERS)


if __name__ == "__main__":
    main()