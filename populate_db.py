from api import app, db, NutritionLog
from datetime import datetime, timedelta

def create_sample_data():
    # Sample nutrition logs
    sample_logs = [
        #user1
        {
            'user_id': 'user1',
            'gender': 'male',
            'age': 25,
            'weight': 75.5,
            'height': 180,
            'activity_level': 'moderate',
            'fat_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 65 + i}
                for i in range(7)
            ],
            'protein_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 150 + i}
                for i in range(7)
            ],
            'carbs_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 200 + i}
                for i in range(7)
            ],
            'cal_in_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 2200 + i}
                for i in range(7)
            ],
            'cal_out_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 2500 + i}
                for i in range(7)
            ],
            'email': 'user1@example.com',
            'password': 'password123'
        },
        #user2
        { 
            'user_id': 'user2',
            'gender': 'female',
            'age': 30,
            'weight': 62.0,
            'height': 165,
            'activity_level': 'active',
            'fat_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 55 + i}
                for i in range(7)
            ],
            'protein_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 120 + i}
                for i in range(7)
            ],
            'carbs_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 180 + i}
                for i in range(7)
            ],
            'cal_in_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 1800 + i}
                for i in range(7)
            ],
            'cal_out_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 2000 + i}
                for i in range(7)
            ],
            'email': 'user2@example.com',
            'password': 'password456'
        },
        #user3
        {
            'user_id': 'user3',
            'gender': 'male',
            'age': 35,
            'weight': 85.0,
            'height': 175,
            'activity_level': 'sedentary',
            'fat_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 70 + i}
                for i in range(7)
            ],
            'protein_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 140 + i}
                for i in range(7)
            ],
            'carbs_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 220 + i}
                for i in range(7)
            ],
            'cal_in_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 2500 + i}
                for i in range(7)
            ],
            'cal_out_logs': [
                {'date': (datetime.now() - timedelta(days=i)).isoformat(), 'value': 2300 + i}
                for i in range(7)
            ],
            'email': 'user3@example.com',
            'password': 'password789'
        }
    ]

    # Create database tables
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        # Add sample data
        for log_data in sample_logs:
            log = NutritionLog(**log_data)
            db.session.add(log)

        # Commit the changes
        db.session.commit()
        print("Database populated with sample data!")

if __name__ == '__main__':
    create_sample_data() 