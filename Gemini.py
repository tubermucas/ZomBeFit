from google import genai
from google.genai import types

GEMINI_API_KEY= "AIzaSyDYwC1ZSauaI6r6RuxXLNc8zn42gVkynwI"
#genai.configure(api_key=GEMINI_API_KEY)
#model = genai.GenerativeModel("gemini-pro")

client = genai.Client(api_key=GEMINI_API_KEY)
MODEL_ID = "gemini-2.0-flash"


height = 180 #cm
weight = 500 #lbs
age = 20 #years
gender = "male"

option = "gainWeight" #edit this based on the exercise plan they want generated
basicPrompt = f"My height is {height} cm, my weight is {weight} lbs, I'm {age} years old, and my gender is {gender}" # edit this for  to include user input
if option == "loseWeight":
    prompt = basicPrompt + "Give me a fitness plan to help me lose weight."
elif option == "gainWeight":
    prompt = basicPrompt + "Give me a fitness plan to help me gain weight."
elif option == "maintainWeight":
    prompt = basicPrompt + "Give me a fitness plan to help maintain my weight."
else:
    pass

#response = client.models.generate_content(
#    model=MODEL_ID,
#    contents=prompt
#)


# system_instruction - might need to add more context, Might want to follow the US Health Guidlines
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


chat_config =types.GenerateContentConfig(
    system_instruction=system_instruction,
    temperature=0.5,  #Creativity of the response
    safety_settings=safety_settings,
    #max_output_tokens=200,    #Length of the response
    #top_p=0.95,
    #top_k=20,
)
chat = client.chats.create(
    model=MODEL_ID,
    config = chat_config
    #history = ______
)
response = chat.send_message(prompt)
print(response.text)

#   %pip install -U -q 'google-genai'

"""
config=types.GenerateContentConfig(
    temperature=0.4,      
    top_p=0.95,
    top_k=20,
    candidate_count=1,
    seed=5,
    max_output_tokens=100,
    stop_sequences=["STOP!"],
    presence_penalty=0.0,
    frequency_penalty=0.0,
)
"""
