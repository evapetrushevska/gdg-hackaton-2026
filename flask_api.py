from flask import Flask, jsonify, request

from recommender.engine import (
    recommend_personal,
    recommend_blended,
    recommend_personal_from_data,
    recommend_blended_from_data,
    recommend_opposite_personal_from_data
)

app = Flask(__name__)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Movie recommender API is running"
    })


# -------------------------
# TEST MODE: uses local CSV folders
# -------------------------

@app.route("/recommend/test/personal/<user_name>", methods=["GET"])
def test_personal_recommendations(user_name):
    recommendations = recommend_personal(
        user_name,
        number_of_recommendations=15,
        save_to_csv=False
    )

    return jsonify({
        "user": user_name,
        "recommendations": recommendations
    })


@app.route("/recommend/test/blended", methods=["POST"])
def test_blended_recommendations():
    data = request.get_json() or {}

    users = data.get("users", ["user1", "user2", "user3"])

    recommendations = recommend_blended(
        users,
        number_of_recommendations=20,
        save_to_csv=False
    )

    return jsonify({
        "users": users,
        "recommendations": recommendations
    })


# -------------------------
# REAL MODE: Express/database sends JSON
# -------------------------

@app.route("/recommend/personal", methods=["POST"])
def personal_recommendations():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Missing request body."
        }), 400

    user_id = data.get("user_id")

    if user_id is None:
        return jsonify({
            "error": "Missing user_id."
        }), 400

    recommendations = recommend_personal_from_data(
        data,
        number_of_recommendations=15
    )

    return jsonify({
        "user_id": user_id,
        "recommendations": recommendations
    })


@app.route("/recommend/blended", methods=["POST"])
def blended_recommendations():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Missing request body."
        }), 400

    users = data.get("users", [])

    if len(users) < 2:
        return jsonify({
            "error": "At least 2 users are required for blended recommendations."
        }), 400

    recommendations = recommend_blended_from_data(
        users,
        number_of_recommendations=50,
        save_to_csv=False
    )

    return jsonify({
        "users": [user.get("user_id") for user in users],
        "recommendations": recommendations
    })


@app.route("/recommend/opposite/personal", methods=["POST"])
def opposite_personal_recommendations():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Missing request body."
        }), 400

    user_id = data.get("user_id")

    if user_id is None:
        return jsonify({
            "error": "Missing user_id."
        }), 400

    recommendations = recommend_opposite_personal_from_data(
        data,
        number_of_recommendations=15
    )

    return jsonify({
        "user_id": user_id,
        "type": "opposite_personal",
        "recommendations": recommendations
    })

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


if __name__ == "__main__":
    app.run(debug=True, port=5001)