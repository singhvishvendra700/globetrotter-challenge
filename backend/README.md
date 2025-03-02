# The Globetrotter Challenge - Backend

## Tech Stack

- **Flask**: Lightweight Python framework for API development.
- **PostgreSQL**: Relational database for structured storage.

## Dataset

A starter dataset was provided, and I expanded it to over 100 destinations using AI tools like ChatGPT. The extended dataset is stored in `destinations.json`. To populate the database, I created a script `insert_data.py`, which inserts the data into the `destinations` table.et

## Database Schema

The backend uses PostgreSQL with SQLAlchemy to manage the database.

**Destination Table**: Stores information about various destinations, including the city, country, clues for guessing, fun facts, and trivia.
**User Table**: Stores player details, including their username and score.

These tables ensure structured storage for the game, making it easier to fetch quiz-related data and track user progress.

## Setup Instructions

```sh
git clone git@github.com:singhvishvendra700/globetrotter-challenge.git
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask run
```

## API Endpoints

### Get a Random Clue

```http
GET /clues/random
```

**Response:**

```json
{
  "id": 1,
  "clues": ["Capital city of France", "Famous for Eiffel Tower"],
  "options": ["Paris", "London", "Berlin", "Rome"]
}
```

### Check Answer

```http
GET /clues/check-answer/<int:id>/<string:answer>
```

**Response:**

```json
{
  "correct": true,
  "correctAnswer": "Paris",
  "funFact": "Paris is known as the City of Light.",
  "trivia": "Paris has over 130 museums."
}
```

### Get User Score

```http
GET /get-user-score/<string:username>
```

**Response:**

```json
{
  "username": "player1",
  "score": 42
}
```

### Register User

```http
POST /register
```

**Request Body:**

```json
{
  "username": "player1",
  "score": 0
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": { "username": "player1", "score": 0 }
}
```

### Generate Invite Link

```http
GET /generate-invite/<string:username>
```

**Response:**

```json
{
  "invite_link": "https://globetrotter-challenge-4tcs.vercel.app/?invite=player1",
  "score": 42
}
```
