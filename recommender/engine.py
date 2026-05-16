from sklearn.metrics.pairwise import cosine_similarity

from recommender.utils import (
    OUTPUT_FOLDER,
    load_movies,
    build_movie_matrix,
    build_user_profile,
    build_user_profile_from_data,
    add_quality_score,
    normalize_column,
)


def recommend_personal(user_name, number_of_recommendations=15, save_to_csv=True):
    movies_df = load_movies()
    movie_matrix = build_movie_matrix(movies_df)

    user_profile_vector, known_imdb_ids = build_user_profile(
        user_name,
        movies_df,
        movie_matrix
    )

    if user_profile_vector is None:
        return []

    similarity_scores = cosine_similarity(
        user_profile_vector,
        movie_matrix
    ).flatten()

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

    recommendations = recommendations.head(number_of_recommendations)

    if save_to_csv:
        OUTPUT_FOLDER.mkdir(exist_ok=True)
        output_path = OUTPUT_FOLDER / f"{user_name}_personal_recommendations.csv"
        recommendations.to_csv(output_path, index=False)

    return recommendations_to_dict(
        recommendations,
        score_column="final_score"
    )


def recommend_blended(users, number_of_recommendations=20, save_to_csv=True):
    movies_df = load_movies()
    movie_matrix = build_movie_matrix(movies_df)

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
            print(f"Skipping {user_name}: {error}")

    if len(user_scores) < 2:
        return []

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

    recommendations = recommendations[recommendations["vote_count"] >= 100]
    recommendations = recommendations[recommendations["minimum_user_score"] >= 0.08]

    recommendations = recommendations.sort_values(
        by="group_score",
        ascending=False
    )

    recommendations = recommendations.head(number_of_recommendations)

    if save_to_csv:
        OUTPUT_FOLDER.mkdir(exist_ok=True)
        output_path = OUTPUT_FOLDER / "blended_recommendations.csv"
        recommendations.to_csv(output_path, index=False)

    return recommendations_to_dict(
        recommendations,
        score_column="group_score",
        extra_columns=[
            "average_user_score",
            "minimum_user_score",
            *[f"{user}_score" for user in active_users]
        ]
    )


def recommend_personal_from_data(user_data, number_of_recommendations=15):
    movies_df = load_movies()
    movie_matrix = build_movie_matrix(movies_df)

    user_profile_vector, known_imdb_ids = build_user_profile_from_data(
        user_data,
        movies_df,
        movie_matrix
    )

    if user_profile_vector is None:
        return []

    similarity_scores = cosine_similarity(
        user_profile_vector,
        movie_matrix
    ).flatten()

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

    recommendations = recommendations.head(number_of_recommendations)

    return recommendations_to_dict(
        recommendations,
        score_column="final_score"
    )


def recommend_blended_from_data(users_data, number_of_recommendations=20, save_to_csv=True):
    movies_df = load_movies()
    movie_matrix = build_movie_matrix(movies_df)

    user_scores = []
    all_known_imdb_ids = []
    active_user_ids = []

    for user_data in users_data:
        try:
            user_id = user_data.get("user_id")

            user_profile_vector, known_imdb_ids = build_user_profile_from_data(
                user_data,
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
            active_user_ids.append(str(user_id))

        except Exception as error:
            print(f"Skipping user data: {error}")

    if len(user_scores) < 2:
        return []

    score_df = movies_df.copy()

    for index, user_id in enumerate(active_user_ids):
        score_df[f"user_{user_id}_score"] = user_scores[index]

    user_score_columns = [
        f"user_{user_id}_score"
        for user_id in active_user_ids
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

    recommendations = recommendations[recommendations["vote_count"] >= 100]

    filtered_recommendations = recommendations[
        recommendations["minimum_user_score"] >= 0.08
    ]

    if filtered_recommendations.empty:
        filtered_recommendations = recommendations[
            recommendations["minimum_user_score"] >= 0.05
        ]

    if filtered_recommendations.empty:
        filtered_recommendations = recommendations[
            recommendations["minimum_user_score"] >= 0.03
        ]

    if filtered_recommendations.empty:
        filtered_recommendations = recommendations[
            recommendations["minimum_user_score"] >= 0.01
        ]

    if filtered_recommendations.empty:
        filtered_recommendations = recommendations

    recommendations = filtered_recommendations.sort_values(
        by="group_score",
        ascending=False
    )

    recommendations = recommendations.head(number_of_recommendations)

    if save_to_csv:
        OUTPUT_FOLDER.mkdir(exist_ok=True)
        output_path = OUTPUT_FOLDER / "blended_recommendations_from_data.csv"
        recommendations.to_csv(output_path, index=False)

    return recommendations_to_dict(
        recommendations,
        score_column="group_score",
        extra_columns=[
            "average_user_score",
            "minimum_user_score",
            *[f"user_{user_id}_score" for user_id in active_user_ids]
        ]
    )


def recommend_opposite_personal_from_data(user_data, number_of_recommendations=15):
    movies_df = load_movies()
    movie_matrix = build_movie_matrix(movies_df)

    user_profile_vector, known_imdb_ids = build_user_profile_from_data(
        user_data,
        movies_df,
        movie_matrix
    )

    if user_profile_vector is None:
        return []

    similarity_scores = cosine_similarity(
        user_profile_vector,
        movie_matrix
    ).flatten()

    movies_df = movies_df.copy()
    movies_df["opposite_score"] = similarity_scores

    recommendations = movies_df[
        ~movies_df["imdb_id"].isin(known_imdb_ids)
    ].copy()

    recommendations = recommendations[recommendations["vote_count"] >= 100]

    recommendations["rating_norm"] = recommendations["vote_average"] / 10
    recommendations["vote_count_norm"] = normalize_column(recommendations["vote_count"])

    recommendations["opposite_final_score"] = (
        (1 - recommendations["opposite_score"]) * 0.80
        + recommendations["rating_norm"] * 0.15
        + recommendations["vote_count_norm"] * 0.05
    )

    recommendations = recommendations.sort_values(
        by="opposite_final_score",
        ascending=False
    )

    recommendations = recommendations.head(number_of_recommendations)

    return recommendations_to_dict(
        recommendations,
        score_column="opposite_final_score",
        extra_columns=["opposite_score"]
    )


def recommendations_to_dict(recommendations, score_column, extra_columns=None):
    if extra_columns is None:
        extra_columns = []

    results = []

    for _, row in recommendations.iterrows():
        item = {
            "tmdb_id": row.get("tmdb_id"),
            "imdb_id": row.get("imdb_id"),
            "title": row.get("title"),
            "overview": row.get("overview"),
            "release_date": row.get("release_date"),
            "genres": row.get("genres"),
            "poster_path": row.get("poster_path"),
            "poster_url": (
                f"https://image.tmdb.org/t/p/w500{row.get('poster_path')}"
                if row.get("poster_path") else None
            ),
            "vote_average": float(row.get("vote_average", 0)),
            "vote_count": int(row.get("vote_count", 0)),
            "score": float(row.get(score_column, 0)),
        }

        for column in extra_columns:
            if column in row:
                item[column] = float(row[column])

        results.append(item)

    return results