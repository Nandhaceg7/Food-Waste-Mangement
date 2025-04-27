import React, { useState, useEffect } from "react";
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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekOptions = [
    "April - Week 1",
    "April - Week 2",
    "April - Week 3",
    "April - Week 4",
    "May - Week 1",
    "May - Week 2",
    "May - Week 3",
    "May - Week 4",
  ];
  const messOptions = [
    "Pg-non-veg-mess",
    "veg-mess",
    "mega-mess",
    "ug-non-veg-mess",
    "ug-veg-mess",
  ];
  const [selectedWeek, setSelectedWeek] = useState("April - Week 1");
  const [selectedMess, setSelectedMess] = useState("Mess 1");

  // 🔥 State for Attendance Data from Backend
  const [breakfastDataPoints, setBreakfastDataPoints] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [lunchDataPoints, setLunchDataPoints] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [dinnerDataPoints, setDinnerDataPoints] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);

  const defaultMenu = days.map((day) => ({
    day,
    breakfast: "Eggs, Toast, Fruit",
    lunch: "Rice, Dal, Vegetables, Roti",
    dinner: "Rice, Dal, Chapati, Salad",
  }));

  const [menu, setMenu] = useState(defaultMenu);

  // State for Official Information
  const [officialInfo, setOfficialInfo] = useState("");

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
        max: 100,
      },
    },
  };

  const handleMenuChange = (day, meal, e) => {
    const newMenu = menu.map((item) =>
      item.day === day ? { ...item, [meal]: e.target.value } : item
    );
    setMenu(newMenu);
  };

  const handleMessChange = (e) => {
    const mess = e.target.value;
    setSelectedMess(mess);
    setMenu(defaultMenu);
  };

  const handleWeekChange = (e) => {
    const week = e.target.value;
    setSelectedWeek(week);
    setMenu(defaultMenu);
  };

  const handleOfficialInfoChange = (e) => {
    setOfficialInfo(e.target.value);
  };

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/attendance?mess=${selectedMess}&week=${selectedWeek}`
        );
        console.log("response data ", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("data retrieved");

        const data = await response.json();

        console.log(data);

        const breakfast = data.map((item) =>
          Math.round((item.breakfast / 200) * 100)
        );
        const lunch = data.map((item) => Math.round((item.lunch / 200) * 100));
        const dinner = data.map((item) =>
          Math.round((item.dinner / 200) * 100)
        );

        setBreakfastDataPoints(breakfast);
        setLunchDataPoints(lunch);
        setDinnerDataPoints(dinner);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, [selectedMess, selectedWeek]);

  const handleUpdateMenu = async () => {
    try {
      // POST the menu array to backend
      const response = await fetch("http://localhost:5000/api/updateMenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menu: menu, // sending the modified menu
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Menu updated successfully:", result);
      alert("Menu updated successfully!");
    } catch (error) {
      console.error("Error updating menu:", error);
      alert("Failed to update menu.");
    }
  };

  // Handle Official Information Save
  const handleSaveOfficialInfo = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/saveOfficialInfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: officialInfo,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Official Information saved successfully:", result);
      alert("Official Information saved successfully!");
    } catch (error) {
      console.error("Error saving official information:", error);
      alert("Already Information sent");
    }
  };

  return (
    <div className="warden-container">
      <h2 className="warden-title">Warden Weekly Attendance Dashboard</h2>

      <div className="week-selector-container">
        <label>Select Mess: </label>
        <select
          className="week-selector"
          value={selectedMess}
          onChange={handleMessChange}
        >
          {messOptions.map((mess) => (
            <option key={mess} value={mess}>
              {mess}
            </option>
          ))}
        </select>

        <label>Select Week: </label>
        <select
          className="week-selector"
          value={selectedWeek}
          onChange={handleWeekChange}
        >
          {weekOptions.map((week) => (
            <option key={week} value={week}>
              {week}
            </option>
          ))}
        </select>
      </div>

      {/* Attendance Graphs */}
      <div className="chart-container">
        <h3>Breakfast Attendance (%)</h3>
        <Bar
          data={createChartData("Breakfast", breakfastDataPoints, "#ffb74d")}
          options={options}
        />
      </div>

      <div className="chart-container">
        <h3>Lunch Attendance (%)</h3>
        <Bar
          data={createChartData("Lunch", lunchDataPoints, "#64b5f6")}
          options={options}
        />
      </div>

      <div className="chart-container">
        <h3>Dinner Attendance (%)</h3>
        <Bar
          data={createChartData("Dinner", dinnerDataPoints, "#81c784")}
          options={options}
        />
      </div>

      <br />
      <br />

      {/* Menu Section */}
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

        {/* Update Button */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button className="update-button" onClick={handleUpdateMenu}>
            Update Menu
          </button>
        </div>
      </div>

      {/* Official Information Section */}
      <div className="official-info-container">
        <h3>Official Information</h3>
        <textarea
          className="official-info-textbox"
          value={officialInfo}
          onChange={handleOfficialInfoChange}
          placeholder="Enter official information here"
        ></textarea>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button className="update-button" onClick={handleSaveOfficialInfo}>
            Save Official Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;
