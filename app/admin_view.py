from flask import Flask
# from flask_admin.base import Admin
from flask_admin.base import AdminIndexView
# from flask_admin.base import BaseView
from flask_admin.base import expose
from flask_admin.contrib.sqla import ModelView
from wtforms.fields import PasswordField
from flask.ext.login import current_user
from flask import redirect

from app import flask_bcrypt
from app.models import User, Organization

# Flask and Flask-SQLAlchemy initialization here


def check_admin_login():
    u = current_user
    return u.is_authenticated() and current_user.admin == True


class AuthMixin(object):
    def is_accessible(self):
        return check_admin_login()


class OrgView(AuthMixin, ModelView):
    can_create = True

    # Override displayed fields
    column_searchable_list = ('organization', )
    column_list = ('organization', 'domain')

    def __init__(self, session, **kwargs):
        # You can pass name and other parameters if you want to
        super(OrgView, self).__init__(Organization, session, **kwargs)


class UserView(AuthMixin, ModelView):
    # Disable model creation
    can_create = True

    # Override displayed fields
    column_searchable_list = ('email', )
    column_list = ('email', 'organization', 'moderator', 'admin')
    form_excluded_columns = ('password', )
    
    def on_model_change(self, form, model, is_created=False):
        """If the password exists, hash it, otherwise leave it alone"""
        if len(form.new_password.data):
            model.password = flask_bcrypt.generate_password_hash(form.new_password.data)

    def scaffold_form(self):
        form_class = super(UserView, self).scaffold_form()
        form_class.new_password = PasswordField('New Password')
        return form_class

    def __init__(self, session, **kwargs):
        # You can pass name and other parameters if you want to
        super(UserView, self).__init__(User, session, **kwargs)


class AdminView(AdminIndexView):
    @expose('/')
    def index(self):
        if check_admin_login():
            return self.render('admin/index.html')
        else:
            return redirect('/login')
