from pymongo import MongoClient
from datetime import datetime

# Replace with your actual MongoDB Atlas connection string
#uri = "mongodb+srv://tubermucas:npBRMnKt9rqqNvpw@cluster.dnqkulb.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient("mongodb+srv://tubermucas:npBRMnKt9rqqNvpw@cluster.dnqkulb.mongodb.net/?retryWrites=true&w=majority")
db = client["all_data"]
users_collection = db["user"]

# Data to insert
new_user_data = {
    "userId": "user123",
    "gender": "male",
    "age": 21,
    "weight": 165,
    "height": 70,
    "activityLvl": "moderate",
    "fatLogs": [{"date": "2025-04-10", "value": 60.0}],
    "proteinLogs": [{"date": "2025-04-10", "value": 120.0}],
    "carbsLogs": [{"date": "2025-04-10", "value": 200.0}],
    "calInLogs": [{"date": "2025-04-10", "value": 1800}],
    "calOutLogs": [{"date": "2025-04-10", "value": 2200}],
    "dateCreated": datetime.utcnow().isoformat()  # Convert datetime to ISO string
}

# Insert the document
result = users_collection.insert_one(new_user_data)
print(f"User inserted with id: {result.inserted_id}")
