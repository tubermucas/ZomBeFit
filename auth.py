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

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Get token from Authorization header
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
            
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
            
        try:
            # Decode the token
            data = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
            current_user = NutritionLog.query.filter_by(user_id=data['user_id']).first()
            
            if not current_user:
                return jsonify({'message': 'User not found!'}), 401
                
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401
            
        return f(current_user, *args, **kwargs)
        
    return decorated

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if user already exists
    if NutritionLog.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered!'}), 400
        
    if NutritionLog.query.filter_by(user_id=data['user_id']).first():
        return jsonify({'message': 'User ID already exists!'}), 400
    
    # Create new user
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
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully!'}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Find user by email
    user = NutritionLog.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid email or password!'}), 401
        
    # Generate JWT token
    token = jwt.encode({
        'user_id': user.user_id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }, JWT_SECRET_KEY, algorithm="HS256")
    
    return jsonify({
        'token': token,
        'user': user.to_dict()
    }) 