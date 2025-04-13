from fastapi import FastAPI
from pydantic import BaseModel
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Middleware to allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Set up the Gemini API client
GEMINI_API_KEY= os.getenv("GEMINI_API_KEY")
#genai.configure(api_key=GEMINI_API_KEY)
#model = genai.GenerativeModel("gemini-pro")
client = genai.Client(api_key=GEMINI_API_KEY)
MODEL_ID = "gemini-2.5-pro-exp-03-25"   #"gemini-2.0-flash"

#Whenever the user accesss the AI or endpoint, the user will be required to input their height, weight, age, gender, or option
#option will always be a available, while the other fields could be empty
class UserInput(BaseModel):
    height: int
    weight: int
    age: int
    gender: str
    option: str   # This can be "loseWeight", "gainWeight", or "maintainWeight"
    # Add more fields as needed
    funny: bool



#when ever tehe the user opens the own user application, there should be a tool which should process all their previous information into arrays
class UserData(BaseModel):
    protein: list[float]
    carbs: list[float]
    fat: list[float]
    calIn: list[float]
    funny: bool


@app.post("/api/ai/automatic")
def analyzeCaloriesTrend(user_data: UserData):
    
    #create a function call which should run for each of the Macronutrient, and return the trend for each of them
    def trendAnalysis(points = list[float], macronutrient = str):
        if len(points) < 2:
            return "Not enough data to analyze trend."
        trends = []
        rates = []
        #Within each Macronutrient, we need to check if the value is increasing, decreasing, or stable
        #Then we need to calculate the rate of change for each step, and then calculate the average rate of change
        for i in range(1, len(points)):
            if points[i] > points[i-1]:
                trends.append("increasing")
                rates.append((points[i] - points[i-1]) / points[i-1]) #the calculation si more based on the Relative Change
            elif points[i] < points[i-1]:
                trends.append("decreasing")
                rates.append((points[i] - points[i-1]) / points[i-1])
            else:
                trends.append("stable")
                rates.append(0)

        trend_str = "".join(trends)   #trend_str = "increasing, decreasing, stable"
        rate_str = ", ".join([f"{'+' if r > 0 else ''}{r}" for r in rates]) #rate_str = "-2, +4, +4"  
        avg_rate = round(sum(rates) / len(rates), 2)

        #Process all the Trends and the Rates into a single string, which will be used to summarize the data
        summary = (
        f"{macronutrient} trend: {trend_str}\n"
        f"Step % changes: {rate_str}\n"
        f"Average % change per step: {avg_rate}%\n"
        f"Start: {points[0]}, End: {points[-1]}"
        )
        return summary

    #We will function call for each of the necessary Macronutrients, so we end up with 4 summaries for all the Macronutrients
    Protein_Summary = trendAnalysis(user_data.protein, "Protein")
    Carbohydrate_Summary = trendAnalysis(user_data.carbs, "Carbs") 
    Fats_Summary = trendAnalysis(user_data.fat, "Fats")
    Calories_Summary = trendAnalysis(user_data.calIn, "Calories")
    #We will combine all the summaries into a single string, which will be used for our prompt when we input into the AI
    prompt = Protein_Summary + "\n" + Carbohydrate_Summary + "\n" + Fats_Summary + "\n" + Calories_Summary
    system_instruction = "Analyze my details and give me suggestions in 2 sentences to stay on track with my goal but less numbers and more description: " + prompt
    #We included a funny instruction, which will be used to make the AI more engaging and fun. To match with our zombie prompt
    if user_data.funny:
        system_instruction = "Analyze my details and give me suggestions in 2 sentences to stay on track with my goal but less numbers and more description: " + prompt + " make it funny, as if you are a zombie talking to a zombie."
    #funny_instruction = "Can you summarize the following details in 5 sentences regarding my health: " + context + " But make it funny, as if you are talking to a zombie."



    chat_config =types.GenerateContentConfig(
        system_instruction=system_instruction,
        temperature=0.5,  #Creativity of the response
    )
    chat = client.chats.create(
        model=MODEL_ID,
        config = chat_config
    )
    response = chat.send_message(prompt)
    return {"response":response.text}  # Return the response as JSON

@app.post("/api/ai")
def generateUserPlan(user: UserInput):
    basicPrompt = f"My height is {user.height} cm, my weight is {user.weight} lbs, I'm {user.age} years old, and my gender is {user.gender}" # edit this for  to include user input
    if user.option == "loseWeight":
        prompt = basicPrompt + "Give me a fitness plan to help me lose weight."
    elif user.option == "gainWeight":
        prompt = basicPrompt + "Give me a fitness plan to help me gain weight."
    elif user.option == "maintainWeight":
        prompt = basicPrompt + "Give me a fitness plan to help maintain my weight."
    else:
        pass

    system_instruction = """
    Your a smart fitness trainer, who able to generate a workout plan only if they have an appropriate body type.
    """
    if user.funny:
        system_instruction = """
        Your a smart fitness trainer, who able to generate a workout plan only if they have an appropriate body type.
        You are still training a human but you need to talk as if they are zombie, to keep them engaged. 
        """
    #funny_instruction = """
    #Your a smart fitness trainer, who able to generate a workout plan only if they have an appropriate body type.
    #You are still training a human but you need to talk as if they are zombie, to keep them engaged. 
    #"""

    safety_settings = [
        types.SafetySetting(
            category="HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold="BLOCK_LOW_AND_ABOVE",
        )
    ]

#Edits the output of the AI or the "Chatbot" to ensure it's safe, but a creative response
    chat_config =types.GenerateContentConfig(
        system_instruction=system_instruction,
        temperature=0.5,  #Creativity of the response
        safety_settings=safety_settings,   #include the safety settings
        #max_output_tokens=200,    #Length of the response
    )

#Generates the chat or response, based on the model and the previous configurations
    chat = client.chats.create(
        model=MODEL_ID,
        config = chat_config
    )

#Chat will be a list of all the previous prompts. "Send_message" will print the latest response from the lastest prompt
    response = chat.send_message(prompt)
    return {"response":response.text}  # Return the response as JSON

