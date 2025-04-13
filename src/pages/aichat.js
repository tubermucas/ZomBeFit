import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const AiChat = () => {
const [aiSuggestion, setAiSuggestion] = useState(
"Fetching Zombie Daddy suggestions..."
);

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

// Fetch AI suggestions when the component mounts
useEffect(() => {
fetchAiSuggestion();
}, []);

return (
<div>
{/* AI Suggestions Box */}
<div className="mb-6 bg-blue-100 p-4 rounded-lg shadow-md dark:bg-blue-900">
<h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
AI Suggestions
</h2>
<p className="text-gray-800 dark:text-gray-200">{aiSuggestion}</p>
</div>
</div>
);
};

export default AiChat;