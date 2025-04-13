import React from "react";
import { Line } from "react-chartjs-2";

// Import Chart.js components
function LineChart({ weightData, weightLabels }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
        Weight Progress
      </h2>
      <div className="h-64"> {/* Ensure consistent height */}
        <Line
          data={{
            labels: weightLabels,
            datasets: [
              {
                label: "Weight Progress (lbs)",
                data: weightData,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
                fill: true,
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

export default LineChart;