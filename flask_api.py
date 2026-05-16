from flask import Flask, jsonify, request

from recommender.engine import (
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


if __name__ == "__main__":
    app.run(debug=True, port=5001)