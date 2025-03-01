import json
from app import app, db
from models import Destination
import ollama

def generate_destination():
    prompt = """Generate a JSON object strictly in this format:

    {
      "city": "Example City",
      "country": "Example Country",
      "clues": ["Clue 1", "Clue 2"],
      "fun_fact": ["Fact 1", "Fact 2"],
      "trivia": ["Trivia 1", "Trivia 2"]
    }

    Only output valid JSON, nothing else.
    """
    response = ollama.chat(model="llama3.2", messages=[{"role": "user", "content": prompt}])

    print("🔹 Raw response:", response)  # Debugging

    # Ensure response has the correct structure
    if not response or "message" not in response or "content" not in response["message"]:
        raise ValueError("❌ Unexpected Ollama response:", response)

    content = response["message"]["content"].strip()

    # Ensure JSON is valid
    if not content:
        raise ValueError("❌ Empty response from Ollama.")

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        raise ValueError("❌ Invalid JSON response:", content)

def populate_database():
    with app.app_context():
        for _ in range(100):
            data = generate_destination()
            destination = Destination(
                city=data["city"],
                country=data["country"],
                clues=data["clues"],
                fun_facts=data["fun_fact"],
                trivia=data["trivia"]
            )
            db.session.add(destination)
        db.session.commit()
        print("✅ Database populated!")

if __name__ == "__main__":
    populate_database()
