from sklearn.metrics.pairwise import cosine_similarity

from utils import (
    OUTPUT_FOLDER,
    load_movies,
    build_movie_matrix,
    build_user_profile,
    add_quality_score,
)


def recommend_personal(user_name, number_of_recommendations=15):
    movies_df = load_movies()
    movie_matrix = build_movie_matrix(movies_df)

    print("TMDb movies loaded:", len(movies_df))

    user_profile_vector, known_imdb_ids = build_user_profile(
        user_name,
        movies_df,
        movie_matrix
    )

    if user_profile_vector is None:
        print(f"\nNo matching movies found for {user_name}.")
        return

    similarity_scores = cosine_similarity(user_profile_vector, movie_matrix).flatten()

    movies_df = movies_df.copy()
    movies_df["recommendation_score"] = similarity_scores

    recommendations = movies_df[
        ~movies_df["imdb_id"].isin(known_imdb_ids)
    ].copy()

    recommendations = recommendations[recommendations["vote_count"] >= 100]

    recommendations = add_quality_score(
        recommendations,
        similarity_column="recommendation_score",
        final_column="final_score"
    )

    recommendations = recommendations.sort_values(
        by="final_score",
        ascending=False
    )

    output_path = OUTPUT_FOLDER / f"{user_name}_personal_recommendations.csv"
    OUTPUT_FOLDER.mkdir(exist_ok=True)

    recommendations.to_csv(output_path, index=False)

    print(f"\nSaved recommendations to: {output_path}")

    print(f"\nPersonal recommendations for {user_name}:\n")

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
    user_name = input("Which user? Example: user1, user2, user3: ").strip()

    recommend_personal(user_name)


if __name__ == "__main__":
    main()