import os
import traceback

from flask import Flask, jsonify, request
from flask_cors import CORS

from recommender.engine import (
    recommend_personal,
    recommend_blended,
    recommend_personal_from_data,
    recommend_blended_from_data,
    recommend_opposite_personal_from_data,
)

from recommender.utils import load_movies, load_user_data


app = Flask(__name__)

# Allows your deployed Express backend / frontend to call this Flask API.
# For hackathon/testing this is okay. Later you can restrict origins.
CORS(app)


# -------------------------
# BASIC ROUTES
# -------------------------

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Movie recommender API is running",
        "service": "flask-recommender-api",
        "status": "ok"
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "service": "flask-recommender-api"
    })


# -------------------------
# HELPER FUNCTIONS
# -------------------------

def safe_value(value):
    if value is None:
        return None

    try:
        if str(value).lower() == "nan":
            return None
    except Exception:
        pass

    # Converts pandas/numpy values like int64, float64 into normal Python values
    try:
        if hasattr(value, "item"):
            return value.item()
    except Exception:
        pass

    return value


def build_user_movie_list(user_rows, movies_df, source_type):
    results = []

    for _, row in user_rows.iterrows():
        imdb_id = str(row.get("Const", "")).strip()

        if imdb_id == "":
            continue

        matches = movies_df[movies_df["imdb_id"] == imdb_id]

        if matches.empty:
            continue

        movie = matches.iloc[0]

        # User rating from IMDb watched file
        rating = None

        if "Your Rating" in row:
            raw_rating = row.get("Your Rating")

            if safe_value(raw_rating) is not None and str(raw_rating).strip() != "":
                try:
                    rating = float(raw_rating)
                except Exception:
                    rating = None

        tmdb_id = safe_value(movie.get("tmdb_id"))
        poster_path = safe_value(movie.get("poster_path"))
        vote_average = safe_value(movie.get("vote_average"))
        vote_count = safe_value(movie.get("vote_count"))

        try:
            tmdb_id = int(tmdb_id) if tmdb_id is not None else None
        except Exception:
            tmdb_id = None

        try:
            vote_average = float(vote_average) if vote_average is not None else 0
        except Exception:
            vote_average = 0

        try:
            vote_count = int(float(vote_count)) if vote_count is not None else 0
        except Exception:
            vote_count = 0

        poster_path_string = str(poster_path) if poster_path else None

        results.append({
            "tmdb_id": tmdb_id,
            "imdb_id": str(safe_value(movie.get("imdb_id")) or ""),
            "title": str(safe_value(movie.get("title")) or ""),
            "overview": str(safe_value(movie.get("overview")) or ""),
            "release_date": str(safe_value(movie.get("release_date")) or ""),
            "genres": str(safe_value(movie.get("genres")) or ""),
            "poster_path": poster_path_string,
            "poster_url": (
                f"https://image.tmdb.org/t/p/w500{poster_path_string}"
                if poster_path_string else None
            ),
            "vote_average": vote_average,
            "vote_count": vote_count,
            "user_rating": rating,
            "source_type": source_type
        })

    return results


def error_response(message, error, status_code=500):
    print(message)
    print(str(error))
    traceback.print_exc()

    return jsonify({
        "error": message,
        "details": str(error)
    }), status_code


# -------------------------
# TEST MODE: uses local CSV folders
# -------------------------

@app.route("/recommend/test/personal/<user_name>", methods=["GET"])
def test_personal_recommendations(user_name):
    try:
        recommendations = recommend_personal(
            user_name,
            number_of_recommendations=15,
            save_to_csv=False
        )

        return jsonify({
            "user": user_name,
            "recommendations": recommendations
        })

    except Exception as error:
        return error_response(
            "Failed to get test personal recommendations",
            error
        )


@app.route("/recommend/test/blended", methods=["POST"])
def test_blended_recommendations():
    try:
        data = request.get_json(silent=True) or {}

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

    except Exception as error:
        return error_response(
            "Failed to get test blended recommendations",
            error
        )


@app.route("/movies/test/user/<user_name>", methods=["GET"])
def test_user_movie_database(user_name):
    try:
        watched_df, watchlist_df = load_user_data(user_name)
        movies_df = load_movies()

        watched_movies = build_user_movie_list(
            watched_df,
            movies_df,
            "watched"
        )

        watchlist_movies = build_user_movie_list(
            watchlist_df,
            movies_df,
            "watchlist"
        )

        return jsonify({
            "user": user_name,
            "watched": watched_movies,
            "watchlist": watchlist_movies
        })

    except Exception as error:
        return error_response(
            "Failed to load user movie database",
            error
        )


# -------------------------
# REAL MODE: Express/database sends JSON
# -------------------------

@app.route("/recommend/personal", methods=["POST"])
def personal_recommendations():
    try:
        data = request.get_json(silent=True)

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

    except Exception as error:
        return error_response(
            "Failed to get personal recommendations",
            error
        )


@app.route("/recommend/blended", methods=["POST"])
def blended_recommendations():
    try:
        data = request.get_json(silent=True)

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

    except Exception as error:
        return error_response(
            "Failed to get blended recommendations",
            error
        )


@app.route("/recommend/opposite/personal", methods=["POST"])
def opposite_personal_recommendations():
    try:
        data = request.get_json(silent=True)

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

    except Exception as error:
        return error_response(
            "Failed to get opposite personal recommendations",
            error
        )


# -------------------------
# START SERVER
# -------------------------

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )