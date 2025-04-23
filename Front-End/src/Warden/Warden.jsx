import React, { useState } from "react";
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
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekOptions = ["April - Week 1", "April - Week 2", "April - Week 3"];
  const [selectedWeek, setSelectedWeek] = useState("April - Week 1");

  const breakfastDataPoints = [80, 85, 78, 90, 88, 92, 75];
  const lunchDataPoints = [95, 100, 90, 110, 105, 108, 92];
  const dinnerDataPoints = [70, 75, 68, 80, 78, 85, 60];

  const initialMenu = days.map((day) => ({
    day,
    breakfast: "Eggs, Toast, Fruit",
    lunch: "Rice, Dal, Vegetables, Roti",
    dinner: "Rice, Dal, Chapati, Salad",
  }));

  const [menu, setMenu] = useState(initialMenu);

  const createChartData = (label, data, color) => ({
    labels: days,
    datasets: [
      {
        label,
        data,
        backgroundColor: color,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleMenuChange = (day, meal, e) => {
    const newMenu = menu.map((item) =>
      item.day === day ? { ...item, [meal]: e.target.value } : item
    );
    setMenu(newMenu);
  };

  return (
    <div className="warden-container">
      <h2 className="warden-title">Warden Weekly Attendance Dashboard</h2>

      {/* Week Selector */}
      <div className="week-selector-container">
        <label>Select Week: </label>
        <select
          className="week-selector"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
        >
          {weekOptions.map((week) => (
            <option key={week} value={week}>{week}</option>
          ))}
        </select>
      </div>

      {/* Attendance Graphs */}
      <div className="chart-container">
        <h3>Breakfast Attendance</h3>
        <Bar data={createChartData("Breakfast", breakfastDataPoints, "#ffb74d")} options={options} />
      </div>

      <div className="chart-container">
        <h3>Lunch Attendance</h3>
        <Bar data={createChartData("Lunch", lunchDataPoints, "#64b5f6")} options={options} />
      </div>

      <div className="chart-container">
        <h3>Dinner Attendance</h3>
        <Bar data={createChartData("Dinner", dinnerDataPoints, "#81c784")} options={options} />
      </div>
<br/><br/>
      {/* Weekly Menu Table */}
      <div className="menu-container">
        <h3>Modify Weekly Menu</h3>
        <table className="menu-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item.day}>
                <td>{item.day}</td>
                <td>
                  <input
                    type="text"
                    value={item.breakfast}
                    onChange={(e) => handleMenuChange(item.day, "breakfast", e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.lunch}
                    onChange={(e) => handleMenuChange(item.day, "lunch", e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.dinner}
                    onChange={(e) => handleMenuChange(item.day, "dinner", e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transfer Section */}
      <div className="transfer-section">
        <h3>Transfer Information</h3>
        <textarea placeholder="Type notes, observations or instructions..."></textarea>
        <button>Send Report</button>
      </div>
    </div>
  );
};

export default WardenDashboard;
