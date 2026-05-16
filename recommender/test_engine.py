from engine import recommend_personal, recommend_blended


def test_personal():
    print("\nPersonal recommendations for user1:\n")

    recommendations = recommend_personal("user1", number_of_recommendations=10)

    for movie in recommendations:
        print(
            movie["title"],
            "| Score:",
            round(movie["score"], 3),
            "| Rating:",
            movie["vote_average"],
            "| Genres:",
            movie["genres"]
        )


def test_blended():
    print("\nBlended recommendations for user1, user2, user3:\n")

    recommendations = recommend_blended(
        ["user1", "user2", "user3"],
        number_of_recommendations=10
    )

    for movie in recommendations:
        print(
            movie["title"],
            "| Score:",
            round(movie["score"], 3),
            "| Avg:",
            round(movie["average_user_score"], 3),
            "| Min:",
            round(movie["minimum_user_score"], 3),
            "| Genres:",
            movie["genres"]
        )


test_personal()
test_blended()