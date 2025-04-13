//Placeholder data for the nutrition log in case the backend is down for demo
//EXPORTS:
//johnWeeklyData: list of all days for john
//sarahWeeklyData: list of all days for sarah

//create dictionaryies for each entry for john
//sunday
const johnSunday = {
    "userId": "john1",
    "email": "john@test.com",
    "password": "password",
    "gender": "male",
    "age": 22,
    "bodyFat": 20,
    "weight": 165,
    "height": 71,
    "activityLvl": "moderate",
    "fatLogs": [{"date": "2024-01-01", "fat": 20}],
    "proteinLogs": [{"date": "2024-01-01", "protein": 100}],
    "carbsLogs": [{"date": "2024-01-01", "carbs": 100}],
    "calInLogs": [{"date": "2024-01-01", "calories": 2000}],
    "calOutLogs": [{"date": "2024-01-01", "calories": 2300}],
    "dateCreated": "2024-01-01",

    "fitnessGoals": {
        "targetWeight": 160,
        "targetBodyFat": 15,
        "currentGoal": "Lose weight",
        "targetCalories": 2000,
        "targetProtein": 150,
        "targetCarbs": 200,
        "targetFat": 50
    }, 
}

//monday
const johnMonday = {
    "userId": "john1",
    "email": "john@test.com",
    "password": "password",
    "gender": "male",
    "age": 22,
    "weight": 164.5,
    "height": 71,
    "activityLvl": "moderate",
    "fatLogs": [{"date": "2024-01-02", "fat": 19.5}],
    "proteinLogs": [{"date": "2024-01-03", "protein": 88}],
    "carbsLogs": [{"date": "2024-01-03", "carbs": 112}],
    "calInLogs": [{"date": "2024-01-03", "calories": 1800}],
    "calOutLogs": [{"date": "2024-01-03", "calories": 2000}],
    "dateCreated": "2024-01-03"
}

//tuesday
const johnTuesday = {
    "userId": "john1",
    "email": "john@test.com",
    "password": "password",
    "gender": "male",
    "age": 22,
    "weight": 164,
    "height": 71,
    "activityLvl": "moderate",
    "fatLogs": [{"date": "2024-01-04", "fat": 19}],
    "proteinLogs": [{"date": "2024-01-04", "protein": 98}],
    "carbsLogs": [{"date": "2024-01-04", "carbs": 124}],
    "calInLogs": [{"date": "2024-01-04", "calories": 2000}],
    "calOutLogs": [{"date": "2024-01-04", "calories": 2100}],
    "dateCreated": "2024-01-04"
}

//wednesday
const johnWednesday = {
    "userId": "john1",
    "email": "john@test.com",
    "password": "password",
    "gender": "male",
    "age": 22,
    "weight": 163,
    "height": 71,
    "activityLvl": "moderate",
    "fatLogs": [{"date": "2024-01-05", "fat": 19}],
    "proteinLogs": [{"date": "2024-01-05", "protein": 99}],
    "carbsLogs": [{"date": "2024-01-05", "carbs": 100}],
    "calInLogs": [{"date": "2024-01-05", "calories": 1800}],
    "calOutLogs": [{"date": "2024-01-05", "calories": 2000}],
    "dateCreated": "2024-01-05"
}

//thursday
const johnThursday = {
    "userId": "john1",
    "email": "john@test.com",
    "password": "password",
    "gender": "male",
    "age": 22,
    "weight": 164,
    "height": 71,
    "activityLvl": "moderate",
    "fatLogs": [{"date": "2024-01-06", "fat": 19}],
    "proteinLogs": [{"date": "2024-01-06", "protein": 130}],
    "carbsLogs": [{"date": "2024-01-06", "carbs": 200}],
    "calInLogs": [{"date": "2024-01-06", "calories": 2400}],
    "calOutLogs": [{"date": "2024-01-06", "calories": 2400}],
    "dateCreated": "2024-01-06"
}

//friday
const johnFriday = {
    "userId": "john1",
    "email": "john@test.com",
    "password": "password",
    "gender": "male",
    "age": 22,
    "weight": 163.5,
    "height": 71,
    "activityLvl": "moderate",
    "fatLogs": [{"date": "2024-01-07", "fat": 18}],
    "proteinLogs": [{"date": "2024-01-07", "protein": 88}],
    "carbsLogs": [{"date": "2024-01-07", "carbs": 120}],
    "calInLogs": [{"date": "2024-01-07", "calories": 1800}],
    "calOutLogs": [{"date": "2024-01-07", "calories": 1900}],
    "dateCreated": "2024-01-07"
}

//saturday
const johnSaturday = {
    "userId": "john1",
    "email": "john@test.com",
    "password": "password",
    "gender": "male",
    "age": 22,
    "weight": 162.5,
    "height": 71,
    "activityLvl": "moderate",
    "fatLogs": [{"date": "2024-01-08", "fat": 18}],
    "proteinLogs": [{"date": "2024-01-08", "protein": 92}],
    "carbsLogs": [{"date": "2024-01-08", "carbs": 112}],
    "calInLogs": [{"date": "2024-01-08", "calories": 2000}],
    "calOutLogs": [{"date": "2024-01-08", "calories": 2400}],
    "dateCreated": "2024-01-08"
}

// Create a list of all days for john
const johnWeeklyData = [johnSunday, johnMonday, johnTuesday, johnWednesday, johnThursday, johnFriday, johnSaturday];

//create dictionaryies for each entry for sarah
//sunday
const sarahSunday = {
    "userId": "sarah1",
    "email": "sarah@test.com",
    "password": "password",
    "gender": "female",
    "age": 20,
    "weight": 130,
    "height": 66,
    "activityLvl": "light",
    "fatLogs": [{"date": "2024-01-01", "fat": 10}],
    "proteinLogs": [{"date": "2024-01-01", "protein": 80}],
    "carbsLogs": [{"date": "2024-01-01", "carbs": 100}],
    "calInLogs": [{"date": "2024-01-01", "calories": 1700}],
    "calOutLogs": [{"date": "2024-01-01", "calories": 1800}],
    "dateCreated": "2024-01-01",
    
    "fitnessGoals": {
        "targetWeight": 125,
        "targetBodyFat": 8,
        "currentGoal": "Lose weight",
        "targetCalories": 1700,
        "targetProtein": 80,
        "targetCarbs": 120,
        "targetFat": 20
    }, 
}

//monday
const sarahMonday = {
    "userId": "sarah1",
    "email": "sarah@test.com",
    "password": "password",
    "gender": "female",
    "age": 20,
    "weight": 129,
    "height": 66,
    "activityLvl": "light",
    "fatLogs": [{"date": "2024-01-02", "fat": 10}],
    "proteinLogs": [{"date": "2024-01-02", "protein": 95}],
    "carbsLogs": [{"date": "2024-01-02", "carbs": 110}],
    "calInLogs": [{"date": "2024-01-02", "calories": 1600}],
    "calOutLogs": [{"date": "2024-01-02", "calories": 1900}],
    "dateCreated": "2024-01-02",
}           

//tuesday
const sarahTuesday = {
    "userId": "sarah1",
    "email": "sarah@test.com",
    "password": "password",
    "gender": "female",
    "age": 20,
    "weight": 128.5,
    "height": 66,
    "activityLvl": "light",
    "fatLogs": [{"date": "2024-01-03", "fat": 10}],
    "proteinLogs": [{"date": "2024-01-03", "protein": 90}],
    "carbsLogs": [{"date": "2024-01-03", "carbs": 105}],
    "calInLogs": [{"date": "2024-01-03", "calories": 1800}],
    "calOutLogs": [{"date": "2024-01-03", "calories": 2000}],
    "dateCreated": "2024-01-03"
}               

//wednesday
const sarahWednesday = {
    "userId": "sarah1",
    "email": "sarah@test.com",
    "password": "password",
    "gender": "female",
    "age": 20,
    "weight": 127.5,
    "height": 66,
    "activityLvl": "light",
    "fatLogs": [{"date": "2024-01-04", "fat": 9.5}],
    "proteinLogs": [{"date": "2024-01-04", "protein": 85}],
    "carbsLogs": [{"date": "2024-01-04", "carbs": 120}],
    "calInLogs": [{"date": "2024-01-04", "calories": 1850}],
    "calOutLogs": [{"date": "2024-01-04", "calories": 2100}],
    "dateCreated": "2024-01-04"
}   

//thursday
const sarahThursday = {
    "userId": "sarah1",
    "email": "sarah@test.com",
    "password": "password",
    "gender": "female",
    "age": 20,
    "weight": 127,
    "height": 66,
    "activityLvl": "light",
    "fatLogs": [{"date": "2024-01-05", "fat": 9}],
    "proteinLogs": [{"date": "2024-01-05", "protein": 80}],
    "carbsLogs": [{"date": "2024-01-05", "carbs": 115}],
    "calInLogs": [{"date": "2024-01-05", "calories": 1800}],
    "calOutLogs": [{"date": "2024-01-05", "calories": 1950}],
    "dateCreated": "2024-01-05"
}                   

//friday
const sarahFriday = {
    "userId": "sarah1",
    "email": "sarah@test.com",
    "password": "password",
    "gender": "female",
    "age": 20,
    "weight": 126,
    "height": 66,
    "activityLvl": "light",
    "fatLogs": [{"date": "2024-01-06", "fat": 8}],
    "proteinLogs": [{"date": "2024-01-06", "protein": 100}],
    "carbsLogs": [{"date": "2024-01-06", "carbs": 90}],
    "calInLogs": [{"date": "2024-01-06", "calories": 1750}],
    "calOutLogs": [{"date": "2024-01-06", "calories": 1925}],
    "dateCreated": "2024-01-06"
}       

//saturday
const sarahSaturday = {
    "userId": "sarah1",
    "email": "sarah@test.com",
    "password": "password",
    "gender": "female",
    "age": 20,
    "weight": 125.5,
    "height": 66,
    "activityLvl": "light",
    "fatLogs": [{"date": "2024-01-07", "fat": 8}],
    "proteinLogs": [{"date": "2024-01-07", "protein": 82}],
    "carbsLogs": [{"date": "2024-01-07", "carbs": 112}],
    "calInLogs": [{"date": "2024-01-07", "calories": 1850}],
    "calOutLogs": [{"date": "2024-01-07", "calories": 2100}],
    "dateCreated": "2024-01-07"
}                       

//Create a list of all days for sarah
const sarahWeeklyData = [sarahSunday, sarahMonday, sarahTuesday, sarahWednesday, sarahThursday, sarahFriday, sarahSaturday];

//Export the lists
export {johnWeeklyData, sarahWeeklyData};