from app import db
from flask_login import UserMixin


class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    organization = db.Column(db.String(256), unique=True)
    domain = db.Column(db.String(256))

    def __init__(self, name='', domain=None):
        self.organization=name
        self.domain=domain

    def __repr__(self):
        return '<Organization %r>' % self.organization


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(80), unique=True)
    moderator = db.Column(db.Boolean)
    admin = db.Column(db.Boolean)
    organization_id = db.Column(db.Integer, db.ForeignKey('organization.id'))
    organization = db.relationship('Organization')

    def __init__(self, email='', password='', organization=Organization(), moderator=False,
                 admin=False, active=True):
        self.email = email
        self.password = password
        self.organization = organization
        self.moderator = moderator
        self.admin = admin
        self.active = active
    
    def __repr__(self):
        return '<User %r<%r>>' % (self.email, self.organization)

