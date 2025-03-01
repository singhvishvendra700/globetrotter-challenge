import json
from models import db, Destination
from app import app

# Load JSON data
with open("destinations.json", "r") as f:
    destinations = json.load(f)

# Insert into database
with app.app_context():
    for dest in destinations:
        new_dest = Destination(
            city=dest["city"],
            country=dest["country"],
            clues=dest["clues"],
            fun_facts=dest["fun_fact"],
            trivia=dest["trivia"]
        )
        db.session.add(new_dest)
    db.session.commit()

print("✅ Data successfully inserted!")
