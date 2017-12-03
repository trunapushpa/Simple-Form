from flask import Blueprint, request, session, jsonify
from sqlalchemy.exc import IntegrityError
from app import db
from .models import User

mod_user = Blueprint('user', __name__, url_prefix='/api')


@mod_user.route('/submit', methods=['POST'])
def check_and_submit():
    email = str(request.form['email'])
    name = str(request.form['name'])
    number = str(request.form['number'])
    if name.__len__() <= 1:
        return jsonify(success=False, message="Please Enter a valid Name")
    if '@' not in email:
        return jsonify(success=False, message="Please Enter a valid E-Mail Address")
    if not number.isdigit():
        return jsonify(success=False, message="Please Enter a valid Phone Number")
    u = User(name, email, number)
    db.session.add(u)
    try:
        db.session.commit()
    except IntegrityError as e:
        return jsonify(success=False, message="This email already exists")
    return jsonify(success=True, message="Successfully Submitted")
