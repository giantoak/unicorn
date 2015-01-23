from flask import Flask
import random
from elasticsearch import Elasticsearch

app = Flask(__name__)
app.secret_key = str(random.SystemRandom().random())

es = Elasticsearch()

from app import views
