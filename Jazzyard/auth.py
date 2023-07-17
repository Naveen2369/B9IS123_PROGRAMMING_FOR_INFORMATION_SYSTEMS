from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from . import db

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
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth.route('/signup', methods=['GET', 'POST'])

def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        mainpassword = request.form.get('mainpassword')
        confirmpassword = request.form.get('confirmpassword')
        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email address already exists.', category='error')
        elif len(email) < 4:
            flash('Email must be greater than 3 characters.', category='error')
        elif len(first_name) < 5:
            flash('First name must have a minimum of four characters.', category='error')
        elif mainpassword != confirmpassword:
            flash('Passwords are not matching.', category='error')
        elif len(mainpassword) < 7:
            flash('Password must be of at least seven characters.', category='error')
        else:
            new_user = User(email=email, first_name=first_name, password=generate_password_hash(
                mainpassword, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created successfully!', category='success')
            return redirect(url_for('views.home'))

    return render_template("registration.html", user=current_user)

@auth.route('/productdetails', methods=['GET', 'POST'])
def view_productdetails():
    return render_template("productdetails.html", user=current_user)