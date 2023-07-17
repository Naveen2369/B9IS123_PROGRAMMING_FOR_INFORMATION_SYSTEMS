from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])

def login():
     if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash('You are logged in', category='success')
                login_user(user, remember=True)
                return redirect(url_for('views.home'))
            else:
                flash('Password enetered is incorrect, please try again.', category='error')
        else:
            flash('This email address does not exist.', category='error')

    return render_template("login.html", user=current_user)

@auth.route('/logout')

def logout():
    pass

@auth.route('/signup', methods=['GET', 'POST'])

def signup():
    pass
