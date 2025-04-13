//import React from "react";
import React, { useEffect, useRef, useState } from "react";
import AiChat from "./aichat"; // Import AI suggestions component
import Navbar from "./navbar"; // Import Navbar component

function ProfilePage() {
  // Example user data (replace with dynamic data from backend or API)
  const userData = {
    height: "5'8\"",
    weight: 75, // Current weight in kg
    bodyFat: 20, // Current body fat percentage
    targetWeight: 70, // Target weight in kg
    targetBodyFat: 15, // Target body fat percentage
    currentGoal: "Lose weight", // Default goal
  };

  const [currentGoal, setCurrentGoal] = useState(userData.currentGoal);


  // Calculate progress percentages
  const weightProgress = Math.min(
    ((userData.weight - userData.targetWeight) / (userData.weight - userData.targetWeight + 5)) * 100,
    100
  );
  const bodyFatProgress = Math.min(
    ((userData.bodyFat - userData.targetBodyFat) / (userData.bodyFat - userData.targetBodyFat + 5)) *
      100,
    100
  );

  return (
    <Navbar>
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Profile</h1>

        {/* AI Suggestions Section */}
        <AiChat />

      {/* User Information */}
      <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          User Information
        </h2>
        <p className="text-gray-700 dark:text-gray-300">Height: {userData.height}</p>
        <p className="text-gray-700 dark:text-gray-300">Current Weight: {userData.weight} kg</p>
        <p className="text-gray-700 dark:text-gray-300">Body Fat: {userData.bodyFat}%</p>
        <p className="text-gray-700 dark:text-gray-300">
          Target Weight: {userData.targetWeight} kg
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Target Body Fat: {userData.targetBodyFat}%
        </p>

        {/* Current Goal Dropdown */}
        <div className="mt-6">
          <label
            htmlFor="goal"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Current Goal:
          </label>
          <select
            id="goal"
            value={currentGoal}
            onChange={(e) => setCurrentGoal(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="Lose weight">Lose weight</option>
            <option value="Gain muscle">Gain muscle</option>
            <option value="Maintain weight">Maintain weight</option>
          </select>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Progress</h2>

          {/* Weight Progress */}
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300">Weight Progress:</p>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
              <div
                className="bg-green-600 h-4 rounded-full"
                style={{ width: `${weightProgress}%` }}
              ></div>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {weightProgress.toFixed(1)}% to your goal weight
            </p>
          </div>

          {/* Body Fat Progress */}
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300">Body Fat Progress:</p>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${bodyFatProgress}%` }}
              ></div>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {bodyFatProgress.toFixed(1)}% to your goal body fat percentage
            </p>
          </div>
        </div>
      </div>
    </Navbar>

  );
}


export default ProfilePage;
