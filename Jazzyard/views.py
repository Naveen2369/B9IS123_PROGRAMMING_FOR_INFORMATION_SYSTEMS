from flask import render_template
from flask import Blueprint

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])

def homepage():
    return render_template("home.html", user=current_user)