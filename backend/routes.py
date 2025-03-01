from flask import Blueprint, jsonify, request
from models import db, Destination, User
import random

api = Blueprint("api", __name__)

@api.route("/random-destination", methods=["GET"])
def get_random_destination():
    destinations = Destination.query.all()
    if not destinations:
        return jsonify({"error": "No destinations found"}), 404
    
    destination = random.choice(destinations)
    return jsonify({
        "id": destination.id,
        "city": destination.city,
        "country": destination.country,
        "clues": random.sample(destination.clues, min(2, len(destination.clues))),
        "fun_fact": random.choice(destination.fun_facts),
        "trivia": random.sample(destination.trivia, min(2, len(destination.trivia)))
    })

@api.route("/clues/random", methods=["GET"])
def get_random_clue():
    destination = Destination.query.order_by(db.func.random()).first()
    if not destination:
        return jsonify({"error": "No destinations found"}), 404
    
    clues = random.sample(destination.clues, min(2, len(destination.clues)))
    options = [destination.city]
    all_cities = [d.city for d in Destination.query.all() if d.city != destination.city]
    options.extend(random.sample(all_cities, min(3, len(all_cities))))
    random.shuffle(options)

    return jsonify({
        "clues": clues,
        "options": options,
        "correctAnswer": destination.city,
        "funFact": random.choice(destination.fun_facts),
        "trivia": random.choice(destination.trivia),
    })


@api.route("/submit-answer/<int:id>/<string:answer>", methods=["GET"])
def check_answer(id, answer):
    destination = Destination.query.get(id)
    if not destination:
        return jsonify({"error": "Destination not found"}), 404
    
    correct = answer.lower() == destination.city.lower()
    return jsonify({"correct": correct, "fun_fact": random.choice(destination.fun_facts)})

@api.route("/update-score/<string:username>/<int:score>", methods=["POST"])
def update_score(username, score):
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.score = score
    db.session.commit()
    return jsonify({"message": "Score updated", "score": user.score})

@api.route("/get-user-score/<string:username>", methods=["GET"])
def get_user_score(username):
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"username": user.username, "score": user.score})


@api.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    username = data.get("username")
    score = data.get("score", 0)  # Default score to 0 if not provided

    if not username:
        return jsonify({"error": "Username is required to register."}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Please enter a new username. This username is already registered."}), 400

    # Create a new user with the provided score
    new_user = User(username=username, score=score)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user": {"username": username, "score": score}
    }), 201

@api.route("/generate-invite/<string:username>", methods=["GET"])
def generate_invite(username):
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found. Please register first."}), 404

    invite_link = f"http://localhost:5173/?invite={username}"
    return jsonify({"invite_link": invite_link, "score": user.score})
