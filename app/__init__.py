from flask import Flask
import random
from elasticsearch import Elasticsearch
from config import es_url

app = Flask(__name__)
app.secret_key = str(random.SystemRandom().random())

es = Elasticsearch(es_url)

from app import views
