import React, { useEffect, useRef, useState } from "react";

const AiChat = () => {
  const [aiSuggestion, setAiSuggestion] = useState(
    "Stay consistent with your caloric intake and aim for 10,000 steps daily."
  );

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