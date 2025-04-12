from fastapi import FastAPI, Request
from pydantic import BaseModel
from google import genai
from google.genai import types

GEMINI_API_KEY= #"AIzaSyDYwC1ZSauaI6r6RuxXLNc8zn42gVkynwI"
#genai.configure(api_key=GEMINI_API_KEY)
#model = genai.GenerativeModel("gemini-pro")
client = genai.Client(api_key=GEMINI_API_KEY)
MODEL_ID = "gemini-2.0-flash"

app = FastAPI()

#Whenever the user accesss the AI or endpoint, the user will be required to input their height, weight, age, gender, or option
#option will always be a available, while the other fields could be empty
class UserInput(BaseModel):
    height: int
    weight: int
    age: int
    gender: str
    option: str   # This can be "loseWeight", "gainWeight", or "maintainWeight"
    # Add more fields as needed

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
    funny_instruction = """
    Your a smart fitness trainer, who able to generate a workout plan only if they have an appropriate body type.
    You are still training a human but you need to talk as if they are zombie, to keep them engaged. 
    """
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
    return response.text

