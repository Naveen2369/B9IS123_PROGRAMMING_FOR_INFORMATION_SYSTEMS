from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])

def login():
    pass

@auth.route('/logout')

def logout():
    pass

@auth.route('/signup', methods=['GET', 'POST'])

def signup():
    pass
