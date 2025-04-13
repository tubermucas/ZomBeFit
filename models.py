#imports for the models
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from algorithms import tdee

#initialize the database
db = SQLAlchemy()

#create the nutrition log model
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

    #calculate the cal_out use tdee function
    @property
    def cal_out(self):
        if self.gender and self.age and self.weight and self.height and self.activity_level:
            return tdee(self.gender, self.age, self.weight, self.height, self.activity_level)
        return None
    
    #convert the model to a dictionary
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