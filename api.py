#CRUD REST API with flask and sqlalchemy that will store information for nutrition such as 
#Fat (grams) - Protein (grams) - Carbs (grams) Calories In - Calories Out (TDEE)
#Logan Pinel

#imports
from flask import Flask, request, jsonify
from datetime import datetime
import os
from dotenv import load_dotenv
from algorithms import tdee
from auth import auth, token_required
from werkzeug.security import generate_password_hash
from models import db, NutritionLog

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Register auth blueprint
app.register_blueprint(auth, url_prefix='/auth')

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///nutrition.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with the app
db.init_app(app)

# Create database tables
with app.app_context():
    db.create_all()

# Get all logs
@app.route('/logs', methods=['GET'])
@token_required
def read_all_logs(current_user):
    logs = NutritionLog.query.all()
    return jsonify([log.to_dict() for log in logs])

# Get a specific log by user_id
@app.route('/logs/<string:user_id>', methods=['GET'])
@token_required
def read_log(current_user, user_id):
    # Only allow users to access their own logs
    if current_user.user_id != user_id:
        return jsonify({'error': 'Unauthorized access'}), 403
        
    log = NutritionLog.query.filter_by(user_id=user_id).first()
    if not log:
        return jsonify({'error': 'Log not found'}), 404
    return jsonify(log.to_dict())

# Add a new log
@app.route('/logs', methods=['POST'])
@token_required
def add_log(current_user):
    data = request.get_json()
    
    # Check if user_id already exists
    existing_log = NutritionLog.query.filter_by(user_id=data['user_id']).first()
    if existing_log:
        return jsonify({'error': 'User ID already exists'}), 400
    
    #create a new log with the data
    new_log = NutritionLog(
        user_id=data['user_id'],
        gender=data['gender'],
        age=data['age'],
        weight=data['weight'],
        height=data['height'],
        activity_level=data['activity_level'],
        fat_logs=data.get('fat_logs', []),
        protein_logs=data.get('protein_logs', []),
        carbs_logs=data.get('carbs_logs', []),
        cal_in_logs=data.get('cal_in_logs', []),
        cal_out_logs=data.get('cal_out_logs', []),
        email=data['email'],
        password=generate_password_hash(data['password'])
    )
    #add the new log to the database    
    db.session.add(new_log)
    #commit the changes to the database
    db.session.commit()
    #return the new log as json
    return jsonify(new_log.to_dict()), 201

# Update a log
@app.route('/logs/<string:user_id>', methods=['PUT'])
@token_required
def update_log(current_user, user_id):
    # Only allow users to update their own logs
    if current_user.user_id != user_id:
        return jsonify({'error': 'Unauthorized access'}), 403
    #get the log from the database
    log = NutritionLog.query.filter_by(user_id=user_id).first()
    #if the log is not found return a message
    if not log:
        return jsonify({'error': 'Log not found'}), 404
    #get the data from the request
    data = request.get_json()
    #update the fields  
    for key, value in data.items():
        if hasattr(log, key):
            setattr(log, key, value)
    #commit the changes to the database
    db.session.commit()
    #return the updated log as json
    return jsonify(log.to_dict())

# Delete a log
@app.route('/logs/<string:user_id>', methods=['DELETE'])
@token_required
def delete_log(current_user, user_id):
    # Only allow users to delete their own logs
    if current_user.user_id != user_id:
        return jsonify({'error': 'Unauthorized access'}), 403
        
    log = NutritionLog.query.filter_by(user_id=user_id).first()
    if not log:
        return jsonify({'error': 'Log not found'}), 404
    #delete the log from the database   
    db.session.delete(log)
    #commit the changes to the database
    db.session.commit()
    #return a message
    return jsonify({'message': 'Log deleted'})

#run the app using a main guard
if __name__ == '__main__':
    app.run(debug=True)