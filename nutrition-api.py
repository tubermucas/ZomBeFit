#CRUD REST API that will store information for nutrition such as 
#Fat (grams) - Protein (grams) - Carbs (grams) Calories In - Calories Out (TDEE)
#Logan Pinel

#imports
from fastapi import FastAPI, HTTPException, Path
from pydantic import BaseModel
import uvicorn #web server that allows API to run
from pymongo import MongoClient #MongoDB client
import os #access environment variables
from dotenv import load_dotenv #load environment variables from .env file

#load the environment variables
load_dotenv()

#connect to the MongoDB database
#create a client object to connect to the MongoDB database
#client object acts as a dictionary where you can use the database name as the key
client = MongoClient(os.getenv("MONGODB_URI"))
#access a specific database in the MongoDB cluster
db = client["database"]
#create a collection object from the selected database
collection = db["userdata"]

#create the FastAPI App
app = FastAPI()

#create a class to track the users information for using in the charts
class NutritionLog(BaseModel):
    userId: int
    id: int
    date: str
    fat: float
    protein: float
    carbs: float
    calIn: float
    calOut: float

    def to_dict(self):
        return {
            "userId": self.userId,
            "id": self.id,
            "date": self.date,
            "fat": self.fat,
            "protein": self.protein,
            "carbs": self.carbs,
            "calIn": self.calIn,
            "calOut": self.calOut,
        }

#main function to get all the logs
@app.get("/logs", response_model=list[NutritionLog])
def readAllLogs():
    #retrieve all the logs from the collection
    logs = list(collection.find({}, {"_id": 0}))
    #return the logs
    return logs

#get a specific log by its id
@app.get("/logs/{log_id}", response_model=NutritionLog) 
def readLog(log_id: int = Path(..., description="The ID of the item you'd like to get")): #use a type hint and Path()
    #gather a specific document by its id
    #This line queries the MongoDB collection to find a single document
    #where the "id" field matches log_id
    #The {"_id": 0} parameter excludes MongoDB's internal _id field from the result
    log = collection.find_one({"id": log_id}, {"_id": 0}) #query filters
    #if there is a log return it
    if log:
        return log
    #no log found return a 404 error
    raise HTTPException(status_code=404, detail="Log not found")

#route to add data to the API
@app.post("/logs", response_model=NutritionLog)
def addLog(log: NutritionLog):
    #get the last log by id
    last_log = collection.find_one(sort=[("id", -1)])
    #create a new id for the new log
    if last_log:
        new_id = last_log["id"] + 1
    else:
        new_id = 1
    #set the new logs id to the new id
    log.id = new_id
    #add the new log to the collection with insert_one
    collection.insert_one(log.to_dict())
    #return the new log
    return log
        
#route to update data in the API
@app.put("/logs/{log_id}", response_model=NutritionLog)
def updateLog(log_id: int, updatedLog: NutritionLog):
    #update the existing log with the new log
    collection.update_one({"id": log_id}, {"$set": updatedLog.to_dict()})
    #check if there are any modified documents
    if collection.modified_count > 0:
        #give the updated log the same id as the log_id
        updatedLog.id = log_id
        #return the updated log
        return updatedLog
    #if no documents are modified return a 404 error
    raise HTTPException(status_code=404, detail="Log not found")

#route to delete data in the API
@app.delete("/logs/{log_id}")
def deleteLog(log_id: int):
    #delete a log by its id
    deleteLog = collection.delete_one({"id": log_id})
    #check if the log was deleted
    if deleteLog.deleted_count > 0:
        #return a message that the log was deleted
        return {"message": "Log deleted"}
    #if no documents are modified return a 404 error
    raise HTTPException(status_code=404, detail="Log not found")

#run the api
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
