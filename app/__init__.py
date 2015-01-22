from flask import Flask
import random

app = Flask(__name__)
app.secret_key = str(random.SystemRandom().random())
from app import views
