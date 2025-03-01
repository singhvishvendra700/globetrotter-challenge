from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Destination(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    clues = db.Column(db.ARRAY(db.String), nullable=False)
    fun_facts = db.Column(db.ARRAY(db.String), nullable=False)
    trivia = db.Column(db.ARRAY(db.String), nullable=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    score = db.Column(db.Integer, default=0)
