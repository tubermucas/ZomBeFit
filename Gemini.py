from google import genai
from google.genai import types

GEMINI_API_KEY= #"AIzaSyDYwC1ZSauaI6r6RuxXLNc8zn42gVkynwI"
#genai.configure(api_key=GEMINI_API_KEY)
#model = genai.GenerativeModel("gemini-pro")

client = genai.Client(api_key=GEMINI_API_KEY)
MODEL_ID = "gemini-2.0-flash"



option = "loseWeight" #edit this based on the exercise plan they want generated
basicPrompt = "My height is 180 cm, my weight is 150 lbs, I'm 25 years old, and my gender is male" # edit this for  to include user input
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
Your a well known fitness trainer, who is able to generate a fitness plan given all the person's measurements
"""
chat_config =types.GenerateContentConfig(
    system_instruction=system_instruction,
    temperature=0.5,
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
