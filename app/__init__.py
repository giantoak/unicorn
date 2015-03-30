from flask import Flask
import random
from elasticsearch import Elasticsearch
from config import es_url, es_port, admin_username, admin_password, db_conn_str
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.bcrypt import Bcrypt
from flask.ext.login import LoginManager
from flask.ext.admin import Admin
from flask.ext.admin.contrib.sqla import ModelView

app = Flask(__name__)
app.secret_key = str(random.SystemRandom().random())

app.config['SQLALCHEMY_DATABASE_URI'] = db_conn_str

db = SQLAlchemy(app)
flask_bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)

from app.models import *
from app.admin_view import UserView,OrgView,AdminView
admin = Admin(app, index_view=AdminView())

admin.add_view(UserView(db.session))
admin.add_view(OrgView(db.session))

es = Elasticsearch(es_url, port=es_port)

from app import views
