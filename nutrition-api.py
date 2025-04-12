#REST API that will store information for nutrition such as 
#Fat (grams) - Protein (grams) - Carbs (grams) Calories In - Calories Out (TDEE)
#Logan Pinel

#imports
from fastapi import FastAPI, HTTPException, Path
from pydantic import BaseModel
import uvicorn #web server that allows API to run

#create the FastAPI App
app = FastAPI()

#create a class to track the users information for using in the charts
class NutritionLog(BaseModel):
    date: str
    id: int
    fat: float
    protein: float
    carbs: float
    calIn: float
    calOut: float

#In-memory storage (replace with a database in a real application)
nutrition_logs = [
    {"date": "2025-04-12", "id": 1, "fat": 24, "protein": 55, "carbs": 124, "calIn": 2000, "calOut": 2500},
    {"date": "2025-04-12", "id": 2, "fat": 34, "protein": 45, "carbs": 128, "calIn": 2250, "calOut": 2750}
]

#create a variable for the log id counter so it is separate from the list and remains unique
logIdCounter = len(nutrition_logs) + 1 #to auto increment ids

#main function to get all the logs
@app.get("/logs")
def readAllLogs():
    #return python dictionary which FastAPI translates to JSON automatically
    return nutrition_logs

#get a specific log by its id
@app.get("/logs/{log_id}") 
def readLog(log_id: int = Path(..., description="The ID of the item you'd like to get", le=len(nutrition_logs))): #use a type hint and Path()
    #loop through each log (dict) in the list of nutrition_logs
    for log in nutrition_logs:
        #if the id matches the http route then return that log
        if log["id"] == log_id:
            return log
    #error if not found
    raise HTTPException(status_code=404, detail="Log not found") #If the log id is not found, return a 404 error.

#route to add data to the API
@app.post("/logs")
def addLog(log: NutritionLog):
    #call the global id counter
    global logIdCounter
    #give the new data the proper index which correlates to the id
    log.id = logIdCounter
    #append the new log to the list of dicts (nutrition_logs)
    nutrition_logs.append(log)
    #increment the logIdCounter because we addd new data
    logIdCounter += 1
    #return the new log
    return log

#route to update data in the API
@app.put("/logs/{log_id}")
def updateLog(log_id: int, updatedLog: NutritionLog):
    #loop through an enumerated version of the list with index and log pairs
    for index, log in enumerate(nutrition_logs):
        #check if the log id equals the http routes log_id
        if log["id"] == log_id:
            #give the updatedLog dict the prexisiting log id
            updatedLog.id = log_id
            #update the log in nutrition_logs at the index
            nutrition_logs[index] = updatedLog
            #return the updated log
            return updatedLog
    #error if not found
    raise HTTPException(status_code=404, detail="Log not found") #If the log id is not found, return a 404 error.

#route to delete data in the API
@app.delete("/logs/{log_id}")
def deleteLog(log_id: int):
    #loop through similarly to put request to find the log to delete
    for index, log in enumerate(nutrition_logs):
        #check if the log id equals the http routes log_id
        if log["id"] == log_id:
            #delete the log from the nutrition_logs list
            del nutrition_logs[index]
            #return a message that the log was deleted
            return {"message": "Log deleted"}
    #error if not found
    raise HTTPException(status_code=404, detail="Log not found") #If the log id is not found, return a 404 error.


#run the api
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
