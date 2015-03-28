from flask import Flask
import random
from elasticsearch import Elasticsearch
from config import es_url, es_port, admin_username, admin_password, db_conn_str
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.bcrypt import Bcrypt
from flask.ext.login import LoginManager

app = Flask(__name__)
app.secret_key = str(random.SystemRandom().random())

app.config['SQLALCHEMY_DATABASE_URI'] = db_conn_str

db = SQLAlchemy(app)
flask_bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)

es = Elasticsearch(es_url, port=es_port)

from app.models import *
from app import views
