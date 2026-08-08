import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'jazan_specialist_hospital_secret_key_2026')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///nursing_admin.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
