from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
DB_NAME = "database.db"

def Jazzyard():
    app = Flask(__name__)
    db.init_app(app)