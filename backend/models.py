from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

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

class Session(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()))
    destination_id = db.Column(db.Integer, db.ForeignKey('destination.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    destination = db.relationship('Destination', backref='sessions', lazy=True)
    user = db.relationship('User', backref='sessions', lazy=True)

    def __init__(self, destination_id, user_id=None):
        self.destination_id = destination_id
        self.user_id = user_id
