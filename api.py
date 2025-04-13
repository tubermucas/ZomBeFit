#CRUD REST API with flask and sqlalchemy that will store information for nutrition such as 
#Fat (grams) - Protein (grams) - Carbs (grams) Calories In - Calories Out (TDEE)
#Logan Pinel

#imports
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv
from algorithms import tdee

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///nutrition.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define the NutritionLog model
class NutritionLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), unique=True, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    age = db.Column(db.Float, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    height = db.Column(db.Float, nullable=False)
    activity_level = db.Column(db.String(20), nullable=False)
    fat_logs = db.Column(db.JSON)
    protein_logs = db.Column(db.JSON)
    carbs_logs = db.Column(db.JSON)
    cal_in_logs = db.Column(db.JSON)
    cal_out_logs = db.Column(db.JSON)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    @property
    def cal_out(self):
        if self.gender and self.age and self.weight and self.height and self.activity_level:
            return tdee(self.gender, self.age, self.weight, self.height, self.activity_level)
        return None

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'gender': self.gender,
            'age': self.age,
            'weight': self.weight,
            'height': self.height,
            'activity_level': self.activity_level,
            'fat_logs': self.fat_logs,
            'protein_logs': self.protein_logs,
            'carbs_logs': self.carbs_logs,
            'cal_in_logs': self.cal_in_logs,
            'cal_out_logs': self.cal_out_logs,
            'date_created': self.date_created.isoformat() if self.date_created else None,
            'email': self.email
        }

# Create database tables
with app.app_context():
    db.create_all()

# Get all logs
@app.route('/logs', methods=['GET'])
def read_all_logs():
    logs = NutritionLog.query.all()
    return jsonify([log.to_dict() for log in logs])

# Get a specific log by user_id
@app.route('/logs/<string:user_id>', methods=['GET'])
def read_log(user_id):
    log = NutritionLog.query.filter_by(user_id=user_id).first()
    if not log:
        return jsonify({'error': 'Log not found'}), 404
    return jsonify(log.to_dict())

# Add a new log
@app.route('/logs', methods=['POST'])
def add_log():
    data = request.get_json()
    
    # Check if user_id already exists
    existing_log = NutritionLog.query.filter_by(user_id=data['user_id']).first()
    if existing_log:
        return jsonify({'error': 'User ID already exists'}), 400
    
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
        password=data['password']
    )
    
    db.session.add(new_log)
    db.session.commit()
    
    return jsonify(new_log.to_dict()), 201

# Update a log
@app.route('/logs/<string:user_id>', methods=['PUT'])
def update_log(user_id):
    log = NutritionLog.query.filter_by(user_id=user_id).first()
    if not log:
        return jsonify({'error': 'Log not found'}), 404
    
    data = request.get_json()
    
    # Update fields
    for key, value in data.items():
        if hasattr(log, key):
            setattr(log, key, value)
    
    db.session.commit()
    return jsonify(log.to_dict())

# Delete a log
@app.route('/logs/<string:user_id>', methods=['DELETE'])
def delete_log(user_id):
    log = NutritionLog.query.filter_by(user_id=user_id).first()
    if not log:
        return jsonify({'error': 'Log not found'}), 404
    
    db.session.delete(log)
    db.session.commit()
    return jsonify({'message': 'Log deleted'})

if __name__ == '__main__':
    app.run(debug=True)