import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; 

// Importing Framer Motion for animations
const AiChat = () => {
const [aiSuggestion, setAiSuggestion] = useState(
"Fetching Zombie Daddy suggestions..."
);

// State to track the explosion animation
const [isExploding, setIsExploding] = useState(false); // State to track explosion
let holdTimeout; // Timeout to detect long press\




// Function to fetch AI suggestions
const fetchAiSuggestion = async () => {
try {
// Replace with your FastAPI backend URL
const response = await axios.post("http://localhost:8000/api/ai/automatic", {
protein: [100, 120, 110, 130],
carbs: [200, 220, 210, 230],
fat: [50, 55, 60, 65],
calIn: [2000, 2100, 2200, 2300],
funny: true, // Boolean value for humor
});

  // Update the state with the AI response
  setAiSuggestion(response.data.response || "No suggestion available.");
} catch (error) {
  console.error("Error fetching AI suggestion:", error);
  setAiSuggestion("Failed to fetch AI suggestions. Please try again.");
}
};


  // Function to handle funny messages when clicked
  const handleFunnyClick = () => {
    const funnyMessages = [
      "Brains are overrated, try protein shakes!",
      "I may be undead, but my humor is alive!",
      "Do zombies eat healthy? Only if it's brain food!",
      "Don't skip leg day, even if you're a zombie!",
      "I recommend 200g of protein... and maybe a brain or two!",
    ];
    const randomMessage =
      funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    setAiSuggestion(randomMessage);
  };

  // Function to handle long press (pop/explode)
  const handlePointerDown = () => {
    holdTimeout = setTimeout(() => {
      setIsExploding(true); // Trigger explosion
      setAiSuggestion("BOOM! Zombie Daddy exploded!");
  
      // Reset the explosion after the animation finishes
      setTimeout(() => {
        setIsExploding(false); // Reset explosion state
        setAiSuggestion("I'LL BE BACK!"); // Reset suggestion
      }, 1000); // Match this duration with the explosion animation duration
    }, 2000); // 2 seconds hold triggers the explosion
  };

  // Function to handle pointer up (release)
  const handlePointerUp = () => {
    clearTimeout(holdTimeout); // Clear the timeout if released early
    setIsExploding(false); // Reset explosion state
  };

// Fetch AI suggestions when the component mounts
useEffect(() => {
 //fetchAiSuggestion();  //UNCOMMENT THIS LINE TO FETCH SUGGESTIONS FROM AI
}, []);

// Cleanup function to clear the timeout if the component unmounts
return (
<div>
{/* AI Suggestions Box */}
<div className="mb-6 bg-blue-100 p-4 rounded-lg shadow-md dark:bg-blue-900">
  {/* Profile Picture */}
  <div className="flex items-center mb-4">
    <motion.img
      src="/make_a_cartoon_fit_zombie_.png"
      alt="ZDaddy"
      className="w-12 h-12 rounded-full mr-4"
      whileHover={{ scale: 1.2, rotate: 10 }} // Scale and rotate on hover
      whileTap={{ scale: 2.0 }} // Slightly shrink on tap
      animate={
        isExploding
          ? { scale: [1, 1.5, 2, 0], opacity: [1, 0.8, 0.5, 0] } // Explosion animation
          : { y: [0, -5, 0] } // Bounce animation
      }
      transition={{
        duration: isExploding ? 0.8 : 7, // Faster transition for explosion
        repeat: isExploding ? 0 : Infinity, // No repeat for explosion
        repeatType: "loop",
      }}
      onClick={handleFunnyClick}
      onPointerDown={handlePointerDown} // Detect long press
      onPointerUp={handlePointerUp} // Reset on release
    />
  <h1 className="text-xl font-bold text-blue-800 dark:text-blue-200">
    Click and hold Zombie Daddy for a surprise!
  </h1>
</div>
  <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
    Z-Daddy's Suggestions
  </h2>
  <p className="text-gray-800 dark:text-gray-200">{aiSuggestion}</p>
</div>
</div>
);
};

export default AiChat;