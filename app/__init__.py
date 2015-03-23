from flask import Flask
import random
from elasticsearch import Elasticsearch
from config import es_url, admin_username, admin_password
from flask.ext.basicauth import BasicAuth

app = Flask(__name__)
app.secret_key = str(random.SystemRandom().random())

app.config['BASIC_AUTH_USERNAME'] = admin_username
app.config['BASIC_AUTH_PASSWORD'] = admin_password
app.config['BASIC_AUTH_FORCE'] = True

basic_auth = BasicAuth(app)
es = Elasticsearch(es_url)

from app import views
