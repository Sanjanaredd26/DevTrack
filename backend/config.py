import os
from dotenv import load_dotenv
from datetime import timedelta
import psycopg2
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')  # Optional for Flask's session system
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')  # Required for JWT
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=60)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
   