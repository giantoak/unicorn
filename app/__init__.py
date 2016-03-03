from flask import Flask
from flask import Blueprint
import random
from elasticsearch import Elasticsearch
from config import es_url, es_port, admin_username, admin_password, db_conn_str
# from util.config import es_url, es_port, admin_username, admin_password, db_conn_str
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_admin.base import Admin
from flask_admin.contrib.sqla import ModelView

app = Flask(__name__, static_folder='unicorn/static',
            static_url_path='/unicorn/static')
app.secret_key = str(random.SystemRandom().random())

app.config['SQLALCHEMY_DATABASE_URI'] = db_conn_str

db = SQLAlchemy(app)
flask_bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)

from app.models import *
from app.admin_view import UserView, OrgView, AdminView
admin = Admin(app, index_view=AdminView())

admin.add_view(UserView(db.session))
admin.add_view(OrgView(db.session))

es = Elasticsearch(es_url, port=es_port)

from app import views
from app.views import uni
app.register_blueprint(uni)
