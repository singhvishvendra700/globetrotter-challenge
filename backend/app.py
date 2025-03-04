from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from config import DATABASE_URL
from models import db
from routes import api 

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

migrate = Migrate(app, db)

CORS(app, supports_credentials=True)

app.register_blueprint(api, url_prefix="/api")

with app.app_context():
    db.create_all()  

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
