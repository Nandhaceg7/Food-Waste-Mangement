import React, { useState } from "react";
import "./SuperVisor.css"; // Use external CSS

const InventoryAndAttendanceManager = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Rice", quantity: 50 },
    { id: 2, name: "Wheat", quantity: 30 },
    { id: 3, name: "Pulses", quantity: 20 },
  ]);

  const [attendance, setAttendance] = useState([]);

  const [newAttendance, setNewAttendance] = useState({
    date: "",
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  const handleInventoryChange = (id, delta) => {
    const updated = inventory.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + delta } : item
    );
    setInventory(updated);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAttendance((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAttendance = () => {
    const { date, breakfast, lunch, dinner } = newAttendance;
    if (!date || !breakfast || !lunch || !dinner) {
      alert("Please fill in all fields.");
      return;
    }

    const newRecord = {
      date,
      breakfast: parseInt(breakfast, 10),
      lunch: parseInt(lunch, 10),
      dinner: parseInt(dinner, 10),
    };

    setAttendance((prev) => [...prev, newRecord]);
    setNewAttendance({ date: "", breakfast: "", lunch: "", dinner: "" });
  };

  return (
    <div className="container12">
      <h1 className="heading12">Mess Management System</h1>

      <div className="combined-section">
        {/* Inventory Management */}
        <div className="section">
          <h2 className="section-title">Inventory Management</h2>
          <ul>
            {inventory.map((item) => (
              <li key={item.id} className="inventory-item">
                {item.name}: {item.quantity} units
                <div>
                  <button
                    className="button"
                    onClick={() => handleInventoryChange(item.id, 1)}
                  >
                    Add
                  </button>
                  <button
                    className="button"
                    onClick={() => handleInventoryChange(item.id, -1)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <hr />

        {/* Attendance Management */}
        <div className="section">
          <h2 className="section-title">Attendance Tracking</h2>
          <div className="attendance-form">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={newAttendance.date}
              onChange={handleInputChange}
            />

            <label>Breakfast Attendance:</label>
            <input
              type="number"
              name="breakfast"
              value={newAttendance.breakfast}
              onChange={handleInputChange}
            />

            <label>Lunch Attendance:</label>
            <input
              type="number"
              name="lunch"
              value={newAttendance.lunch}
              onChange={handleInputChange}
            />

            <label>Dinner Attendance:</label>
            <input
              type="number"
              name="dinner"
              value={newAttendance.dinner}
              onChange={handleInputChange}
            />

            <button className="button" onClick={handleAddAttendance}>
              Add Attendance
            </button>
          </div>

          <ul>
            {attendance.map((entry, i) => (
              <li key={i}>
                <strong>{entry.date}</strong> - 🍳 Breakfast: {entry.breakfast},
                🍛 Lunch: {entry.lunch}, 🍽️ Dinner: {entry.dinner}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InventoryAndAttendanceManager;
