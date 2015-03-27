from flask import Flask
import random
from elasticsearch import Elasticsearch
from config import es_url, es_port, admin_username, admin_password
from flask.ext.basicauth import BasicAuth

app = Flask(__name__)
app.secret_key = str(random.SystemRandom().random())

app.config['BASIC_AUTH_USERNAME'] = admin_username
app.config['BASIC_AUTH_PASSWORD'] = admin_password
app.config['BASIC_AUTH_FORCE'] = True

basic_auth = BasicAuth(app)
es = Elasticsearch(es_url, port=es_port)

from app import views
