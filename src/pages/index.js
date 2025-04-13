import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";
import CalChart from "./calchart"; 
import AiChat from "./aichat";
import Navbar from "./navbar";
import APPLEPIE from "./pie"; // Import MacroChart
import LineChart from "./linechart"; // Import LineChart
import { johnWeeklyData } from "./placeholderData"; // Import placeholder data

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

function Dashboard() {
  // Extract data from johnWeeklyData
  const todayData = johnWeeklyData[0]; // Use the first day's data for John
  const protein = todayData.proteinLogs[0].protein; // Protein in grams
  const carbs = todayData.carbsLogs[0].carbs; // Carbs in grams
  const fats = todayData.fatLogs[0].fat; // Fats in grams
  const weightData = johnWeeklyData.map((day) => day.weight);
  const weightLabels = johnWeeklyData.map((day) => day.dateCreated);

  const lineChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Weight Progress",
        data: [75, 74, 73, 72],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <Navbar>
      <main className="p-4 min-h-screen pt-20">
        <AiChat />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <CalChart />
          <APPLEPIE protein={protein} carbs={carbs} fats={fats} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          <LineChart weightData={weightData} weightLabels={weightLabels} />
        </div>
      </main>
    </Navbar>
  );
}

export default Dashboard;