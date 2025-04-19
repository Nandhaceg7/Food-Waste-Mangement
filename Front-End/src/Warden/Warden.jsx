import React from "react";
import { Bar } from "react-chartjs-2";
import "./Warden.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const WardenDashboard = () => {
  // Sample data
  const dates = ["April 15", "April 16", "April 17"];
  const inventoryUsed = [100, 120, 110];
  const attendanceAvg = [80, 90, 70];
  const foodWastage = inventoryUsed.map((qty, i) => qty - attendanceAvg[i]);

  // Inventory levels (dummy)
  const inventoryItems = ["Rice", "Dal", "Vegetables", "Milk", "Oil"];
  const inventoryQuantities = [300, 200, 150, 100, 50]; // units

  const wastageData = {
    labels: dates,
    datasets: [
      {
        label: "Food Wastage (units)",
        data: foodWastage,
        backgroundColor: "#ff6f61",
      },
    ],
  };

  const inventoryData = {
    labels: inventoryItems,
    datasets: [
      {
        label: "Current Inventory (units)",
        data: inventoryQuantities,
        backgroundColor: "#42a5f5",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="warden-container">
      <h2 className="warden-title">Warden Dashboard</h2>

      <div className="chart-container">
        <h3>Food Wastage Overview</h3>
        <Bar data={wastageData} options={options} />
      </div>

      <div className="chart-container">
        <h3>Current Inventory Levels</h3>
        <Bar data={inventoryData} options={options} />
      </div>

      <div className="summary-box">
        <p>
          <strong>Total Days:</strong> {dates.length}
        </p>
        <p>
          <strong>Total Wastage:</strong>{" "}
          {foodWastage.reduce((a, b) => a + b, 0)} units
        </p>
        <p>
          <strong>Average Attendance:</strong>{" "}
          {Math.round(
            attendanceAvg.reduce((a, b) => a + b) / attendanceAvg.length
          )}
        </p>
      </div>

      <div className="transfer-section">
        <h3>Transfer Information</h3>
        <textarea placeholder="Type notes, observations or instructions..."></textarea>
        <button>Send Report</button>
      </div>
    </div>
  );
};

export default WardenDashboard;
