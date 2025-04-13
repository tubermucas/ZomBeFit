import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

// Sample data for the chart
const data = [
  { day: "Sunday", CaloriesIn: 2000, CaloriesOut: 1800 },
  { day: "Monday", CaloriesIn: 2200, CaloriesOut: 2000 },
  { day: "Tuesday", CaloriesIn: 2100, CaloriesOut: 1900 },
  { day: "Wednesday", CaloriesIn: 2300, CaloriesOut: 2100 },
  { day: "Thursday", CaloriesIn: 2500, CaloriesOut: 2300 },
  { day: "Friday", CaloriesIn: 2400, CaloriesOut: 2200 },
  { day: "Saturday", CaloriesIn: 2600, CaloriesOut: 2400 },
];

// Function to calculate the total calories burned
function CalChart() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
        Weekly Caloric Intake vs Burn
      </h2>
      <div className="h-64"> {/* Ensure consistent height */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day">
              <Label value="Days of the Week" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis>
              <Label
                value="Calories"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar dataKey="CaloriesIn" fill="#8884d8" name="Calories In" />
            <Bar dataKey="CaloriesOut" fill="#82ca9d" name="Calories Out" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CalChart;