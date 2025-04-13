#Algorithms for fitness caluclations
#Logan Pinel
#NOTES:
#BMR IS IN IMPERIAL
#WEIGHT = LBS | HEIGHT = INCHES
#TDEE Body Fat is optional
#TDEE ACTIVITY MULTIPLIER:
#Sedentary = 1.2, Light(1-2 days a week) = 1.375, Moderate(3-5 days/week) = 1.55, Heavy(6-7 days/week) = 1.725, Athlete(2x a day) = 1.9

#create an algorithm to calculate the users BMR (Basal Metabolism Rate) which is used for TDEE
#returns in (calories per day)
def bmr(gender, weight, height, age):
    #check if the gender is a male or female
    #male
    if gender == "male":
        #return the BMR calculation for men
        return((4.536 * weight) + (15.88 * height) - (5 * age) + 5)
    #female
    elif gender == "female":
        #return the BMR calculation for women
        return((4.536 * weight) + (15.88 * height) - (5 * age) - 161)
    #else raise a value error as the gender is not appropriate
    else:
        raise ValueError("Invalid value provided")
    
#create an algorithm to calculate the users TDEE (Total Daily Energy Expenditure)
def tdee(gender, age, weight, height, activityLvl):
    #get the bmr
    bmrValue = bmr(gender, weight, height, age)
    #check the activity and give its a multiplier value
    #Sedentary (none)
    if activityLvl.lower() == "sedentary":
        activityMultiplier = 1.2
    #Light (1-2 days a week)
    elif activityLvl.lower() == "light":
        activityMultiplier = 1.375
    #Moderate (3-5 days a week)
    elif activityLvl.lower() == "moderate":
        activityMultiplier = 1.55
    #Heavy (6-7 days a week)
    elif activityLvl.lower() == "heavy":
        activityMultiplier = 1.725
    #Athlete (2x a day)
    elif activityLvl.lower() == "athlete":
        activityMultiplier = 1.9
    #else raise a value error as the activity level is not appropriate
    else:
        raise ValueError("Invalid value provided")
    #return the calculated TDEE value
    #calculated by multiplying BMR by a physical activity mulitplier
    return (bmrValue * activityMultiplier)