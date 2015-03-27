from app import db, flask_bcrypt
db.create_all()

from app import User, Organization
from app.config import admin_username, admin_password

focus = Organization('Focus Africa', 'focus-africa.co.za')
admin_group = Organization('admins')

admin_pw_hash = flask_bcrypt.generate_password_hash(admin_password)
admin = User(admin_username, admin_pw_hash, organization=admin_group, 
        admin=True)

db.session.add(focus)
db.session.add(admin_group)
db.session.add(admin)
db.session.commit()

