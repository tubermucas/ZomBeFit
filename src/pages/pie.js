import React from "react";
import { Pie } from "react-chartjs-2";

// Import Chart.js components
function APPLEPIE({ protein, carbs, fats }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
        Daily Macronutrient Distribution
      </h2>
      <div className="h-64"> {/* Ensure consistent height */}
        <Pie
          data={{
            labels: ["Protein", "Carbs", "Fats"],
            datasets: [
              {
                data: [protein, carbs, fats],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default APPLEPIE;