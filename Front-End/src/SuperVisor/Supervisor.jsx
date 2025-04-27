import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // added
import "./SuperVisor.css";

const WeeklyMealPlanner = () => {
  const { messId } = useParams(); // added
  const [menu, setMenu] = useState({});
  const [selectedWeek, setSelectedWeek] = useState("April - Week 1");
  const [attendance, setAttendance] = useState([]);
  const days = Object.keys(menu);
  const [information, setInformation] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-menu");
        const fetchedMenu = response.data;
        setMenu(fetchedMenu);
        console.log(fetchedMenu);
        const initialAttendance = Object.keys(fetchedMenu).map((day) => ({
          day,
          breakfast: "",
          lunch: "",
          dinner: "",
        }));
        setAttendance(initialAttendance);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  const handleChange = (index, mealType, value) => {
    const updated = [...attendance];
    updated[index][mealType] = value;
    setAttendance(updated);
  };

  const handleSubmit = async () => {
    const isFilled = attendance.every(
      (entry) => entry.breakfast && entry.lunch && entry.dinner
    );

    if (!isFilled) {
      alert("Please enter attendance for all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/submit-attendance/${messId}`, // messId used here
        {
          selectedWeek,
          attendance,
        }
      );
      console.log(response.data);
      alert("Attendance submitted!");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Already Submitted Attendance for this week !");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/getInformation");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setInformation(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching information:", error.message);
      }
    };

    fetchData();
  }, []);

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
          <option>May - Week 1</option>
          <option>May - Week 2</option>
          <option>May - Week 3</option>
          <option>May- Week 4</option>
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
              <td>{menu[day]?.breakfast || "-"}</td>
              <td>{menu[day]?.lunch || "-"}</td>
              <td>{menu[day]?.dinner || "-"}</td>
              <td>
                <input
                  type="number"
                  value={attendance[index]?.breakfast || ""}
                  onChange={(e) =>
                    handleChange(index, "breakfast", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={attendance[index]?.lunch || ""}
                  onChange={(e) => handleChange(index, "lunch", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={attendance[index]?.dinner || ""}
                  onChange={(e) =>
                    handleChange(index, "dinner", e.target.value)
                  }
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
          {information.map((item, index) => (
            <div className="info-data">
              <p key={index}>{item.data}</p>
            </div>
          ))}
        </p>
      </footer>
    </div>
  );
};

export default WeeklyMealPlanner;
