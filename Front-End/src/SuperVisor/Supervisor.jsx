import React, { useState } from "react";
import "./SuperVisor.css";

const defaultMenu = {
  Sunday: {
    breakfast: "Idli & Sambar",
    lunch: "Veg Biryani",
    dinner: "Chapati & Aloo Curry",
  },
  Monday: {
    breakfast: "Poha",
    lunch: "Dal Rice",
    dinner: "Pulao & Raita",
  },
  Tuesday: {
    breakfast: "Paratha",
    lunch: "Rajma Rice",
    dinner: "Dosa & Chutney",
  },
  Wednesday: {
    breakfast: "Upma",
    lunch: "Sambar Rice",
    dinner: "Chapati & Veg Korma",
  },
  Thursday: {
    breakfast: "Bread & Jam",
    lunch: "Chole Rice",
    dinner: "Pasta",
  },
  Friday: {
    breakfast: "Dhokla",
    lunch: "Curd Rice",
    dinner: "Fried Rice",
  },
  Saturday: {
    breakfast: "Vada & Chutney",
    lunch: "Paneer Rice",
    dinner: "Maggi",
  },
};

const WeeklyMealPlanner = () => {
  const days = Object.keys(defaultMenu);
  const [selectedWeek, setSelectedWeek] = useState("April - Week 1");

  const [attendance, setAttendance] = useState(
    days.map((day) => ({
      day,
      breakfast: "",
      lunch: "",
      dinner: "",
    }))
  );

  const handleChange = (index, mealType, value) => {
    const updated = [...attendance];
    updated[index][mealType] = value;
    setAttendance(updated);
  };

  const handleSubmit = () => {
    const isFilled = attendance.every(
      (entry) => entry.breakfast && entry.lunch && entry.dinner
    );

    if (!isFilled) {
      alert("Please enter attendance for all fields.");
      return;
    }

    console.log("Weekly Attendance Submitted:", attendance);
    alert("Attendance submitted!");
  };

  return (
    <div className="container12">
      <div className="week-header">
        <h1 className="heading12">Weekly Mess Menu & Attendance</h1>
        <select
          className="week-dropdown"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
        >
          <option>April - Week 1</option>
          <option>April - Week 2</option>
          <option>April - Week 3</option>
          <option>April - Week 4</option>
        </select>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Breakfast Menu</th>
            <th>Lunch Menu</th>
            <th>Dinner Menu</th>
            <th>Breakfast Attendance</th>
            <th>Lunch Attendance</th>
            <th>Dinner Attendance</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, index) => (
            <tr key={day}>
              <td>{day}</td>
              <td>{defaultMenu[day].breakfast}</td>
              <td>{defaultMenu[day].lunch}</td>
              <td>{defaultMenu[day].dinner}</td>
              <td>
                <input
                  type="number"
                  value={attendance[index].breakfast}
                  onChange={(e) => handleChange(index, "breakfast", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={attendance[index].lunch}
                  onChange={(e) => handleChange(index, "lunch", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={attendance[index].dinner}
                  onChange={(e) => handleChange(index, "dinner", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="button" onClick={handleSubmit}>
        Submit Attendance
      </button>

      <footer className="announcement-footer">
        <h3>📢 Official Announcement</h3>
        <p>
          All students are requested to fill attendance before Sunday 6 PM.
          Menu may change based on availability. Contact the mess warden for assistance.
        </p>
      </footer>
    </div>
  );
};

export default WeeklyMealPlanner;
