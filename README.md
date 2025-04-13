# ZomBeFit

# Contributors:
Jesse Simmons, Logan Pinel, Temirzhan Mukhambet, Tommy Le :)

# Inspiration
You ever seen those zombie movies where the zombies are just to slow at chasing people or just too fat from eating too many people. Well, we thought zombies could be so much better if they actually started exercise. That's why we made ZomBefit. Whether you’re alive or… not-so-alive, ZomBeFit is here to help you track progress, stay motivated, and resurrect your routine.

# What it does
Our fitness application tracks a user’s height, weight, age, and macronutrient intake, storing this information within a database. Using this data, our AI assistant — Zombie Daddy — analyzes macro trends and provides personalized health recommendations. In addition to insights on nutrition, the assistant also generates customized fitness and diet plans, tailored to the user’s age, weight, and height to help them reach their health goals efficiently.

# How we built it
When developing the ZombieDaddy AI fitness trainer, we integrated Google’s Gemini model ("gemini-2.5-pro-exp-03-25"), which offers advanced reasoning capabilities and is better suited for handling complex tasks. This model was essential for our use case, as it allowed us to configure safety settings—ensuring the AI provides effective workouts without putting the user at risk.

# Challenges we ran into
The data structures in MongoDB did not align with the naming conventions used in our API. The main challenge stemmed from the initial MongoDB implementation being written with TypeScript-based tools, a language none of us were familiar with. To resolve this, we restructured our database interaction using Python, which better matched our team's skill set and integrated more smoothly with our FastAPI backend.

# Accomplishments that we're proud of
Since this was our second hackathon, we aimed to improve on our previous experience. To stay organized and focused, we structured the project into sprints. One accomplishment we’re proud of is how our team consistently completed each set of deliverables on time. It was rewarding to see every member contribute and hit the goals within each sprint.

# What we learned
We gained hands-on experience with database management and CRUD operations using MongoDB, as well as implementing those operations through FastAPI. Additionally, we learned the fundamentals of integrating and using the Google Gemini API within our application

# What's next for ZomBeFit
At ZombeFit, we recognize that health monitoring is essential — even in the afterlife. That’s why we’re introducing two upcoming tools designed to work seamlessly with our platform: Fitbitten, our motion tracker tailored for undead movement, and FlatlineFlex, a heart monitor built for zombies whose hearts may have stopped, but their gains haven't

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

Dashborad design inspired by Flowbite
