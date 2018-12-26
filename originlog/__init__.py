import os

from flask import Flask

from originlog.blueprints.admin import admin_bp
from originlog.blueprints.auth import auth_bp
from originlog.blueprints.blog import blog_bp
from originlog.extensions import db
from originlog.settings import config


def create_app():
    app = Flask('originlog')
    config_name = os.getenv('FLASK_CONFIG', 'development')
    app.config.from_object(config[config_name])

    register_blueprints(app)

    register_extensions(app)

    return app


def register_blueprints(app):
    app.register_blueprint(blog_bp)
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(admin_bp, url_prefix='/admin')


def register_extensions(app):
    db.init_app(app)