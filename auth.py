#imports for the auth
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from functools import wraps
from models import db, NutritionLog
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create auth blueprint
auth = Blueprint('auth', __name__)

# JWT secret key from environment variable
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key')

#create a token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Get token from Authorization header
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        #if the token is not found return a message
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        #try to decode the token
        try:
            # Decode the token
            data = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
            #get the user id from the token
            current_user = NutritionLog.query.filter_by(user_id=data['user_id']).first()
            #if the user is not found return a message
            if not current_user:
                return jsonify({'message': 'User not found!'}), 401
            #if the token is invalid return a message
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401
        #return the decorated function
        return f(current_user, *args, **kwargs)
    #return the decorated function
    return decorated

#create a register route
@auth.route('/register', methods=['POST'])
def register():
    #get the data from the request
    data = request.get_json()
    #check if the user already exists
    if NutritionLog.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered!'}), 400
    #check if the user id already exists
    if NutritionLog.query.filter_by(user_id=data['user_id']).first():
        return jsonify({'message': 'User ID already exists!'}), 400
    #create a new user with the data        
    new_user = NutritionLog(
        user_id=data['user_id'],
        email=data['email'],
        password=generate_password_hash(data['password']),
        gender=data['gender'],
        age=data['age'],
        weight=data['weight'],
        height=data['height'],
        activity_level=data['activity_level'],
        fat_logs=[],
        protein_logs=[],
        carbs_logs=[],
        cal_in_logs=[],
        cal_out_logs=[]
    )
    #add the new user to the database
    db.session.add(new_user)
    #commit the changes to the database
    db.session.commit()
    #return a message
    return jsonify({'message': 'User registered successfully!'}), 201

#create a login route
@auth.route('/login', methods=['POST'])
def login():
    #get the data from the request
    data = request.get_json()
    #find the user by email
    user = NutritionLog.query.filter_by(email=data['email']).first()
    #if the user is not found or the password is incorrect return a message
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid email or password!'}), 401
    #generate a token
    token = jwt.encode({
        'user_id': user.user_id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }, JWT_SECRET_KEY, algorithm="HS256")
    #return the token and the user
    return jsonify({
        'token': token,
        'user': user.to_dict()
    }) 