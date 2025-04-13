from pymongo import MongoClient

# Replace with your actual MongoDB Atlas connection string
uri = "mongodb+srv://tubermucas:npBRMnKt9rqqNvpw@cluster.dnqkulb.mongodb.net/?retryWrites=true&w=majority"

# Connect to MongoDB Atlas
client = MongoClient(uri)

# Create or access a database
db = client["nutrition_db"]

# Create or access a collection
collection = db["food_items"]

# Insert one document into the collection
food_item = {
    "userId": 1,
    "id": 1,
    "date": "2025-04-12",
    "fat": 56,
    "protein": 34,
    "carbs": 134,
    "calIn": 2000,
    "calOut": 2500,
}
result = collection.insert_one(food_item)

print("Inserted document ID:", result.inserted_id)