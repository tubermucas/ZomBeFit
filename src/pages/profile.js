//import React from "react";
import React, { useEffect, useRef, useState } from "react";
import AiChat from "./aichat"; // Import AI suggestions component
import Navbar from "./navbar"; // Import Navbar component

function ProfilePage() {
  // Example user data (replace with dynamic data from backend or API)
  const userData = {
    height: "5'8\"",
    weight: 75, // Current weight in lb
    bodyFat: 20, // Current body fat percentage
    targetWeight: 70, // Target weight in lb
    targetBodyFat: 15, // Target body fat percentage
    currentGoal: "Lose weight", // Default goal
  };
  
  // State variables for user data
  const [currentGoal, setCurrentGoal] = useState(userData.currentGoal);
  const [targetWeight, setTargetWeight] = useState(userData.targetWeight);
  const [targetBodyFat, setTargetBodyFat] = useState(userData.targetBodyFat);
  const [weightProgress, setWeightProgress] = useState(0);
  const [bodyFatProgress, setBodyFatProgress] = useState(0);

  // Function to recalculate progress percentages
  const recalculateProgress = () => {
    let newWeightProgress = 0;

    if (currentGoal === "Lose weight") {
      // Progress moves forward if the user is above their target weight
      newWeightProgress = Math.min(
        ((userData.weight - targetWeight) / userData.weight) * 100,
        100
      );
    } else if (currentGoal === "Gain muscle") {
      // Progress moves forward if the user is below their target weight
      newWeightProgress = Math.min(
        ((targetWeight - userData.weight) / targetWeight) * 100,
        100
      );
    } else if (currentGoal === "Maintain weight") {
      // Progress is based on how close the user is to their current weight
      newWeightProgress = Math.min(
        (1 - Math.abs(userData.weight - targetWeight) / userData.weight) * 100,
        100
      );
    }

    // Body fat progress remains the same regardless of the goal
    const newBodyFatProgress = Math.min(
      ((userData.bodyFat - targetBodyFat) / userData.bodyFat) * 100,
      100
    );

    setWeightProgress(newWeightProgress);
    setBodyFatProgress(newBodyFatProgress);
  };

  // Recalculate progress whenever the current goal, target weight, or target body fat changes
  useEffect(() => {
    recalculateProgress();
  }, [currentGoal, targetWeight, targetBodyFat]);


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
          <p className="text-gray-700 dark:text-gray-300">Current Weight: {userData.weight} lb</p>
          <p className="text-gray-700 dark:text-gray-300">Body Fat: {userData.bodyFat}%</p>
          <p className="text-gray-700 dark:text-gray-300">
            Target Weight: {userData.targetWeight} lb
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Target Body Fat: {userData.targetBodyFat}%
          </p>

{/* Editable Target Weight */}
<div className="mt-4">
            <label
              htmlFor="targetWeight"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Target Weight (lb):
            </label>
            <input
              id="targetWeight"
              type="number"
              value={targetWeight === 0 ? "" : targetWeight}
              onChange={(e) => setTargetWeight(e.target.value === "" ? 0 : parseInt(e.target.value, 10))}
              className="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Editable Target Body Fat */}
          <div className="mt-4">
            <label
              htmlFor="targetBodyFat"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Target Body Fat (%):
            </label>
            <input
              id="targetBodyFat"
              type="number"
              value={targetBodyFat === 0 ? "" : targetBodyFat}
              onChange={(e) => setTargetBodyFat(e.target.value === "" ? 0 : parseInt(e.target.value, 10))}
              className="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

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
