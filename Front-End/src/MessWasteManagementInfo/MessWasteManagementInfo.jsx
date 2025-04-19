import React from "react";
import "./MessWasteManagementInfo.css"; // Import the CSS file

const MessWasteManagementInfo = () => {
  return (
    <div className="mess-info-container">
      <h2 className="mess-info-title">Mess Food Waste Management System</h2>
      <p className="mess-info-text">
        The Mess Food Waste Management System is designed to minimize food
        wastage in hostel messes through monitoring, analysis, and awareness.
        The system tracks daily food preparation and consumption, helping staff
        adjust quantities based on actual demand.
        <br />
        <br />
        Residents can log their meal plans in advance, allowing the kitchen to
        prepare food more efficiently. Unused food is categorized — edible
        surplus is safely donated, while non-edible waste is directed to
        composting units or biogas plants.
        <br />
        <br />
        Real-time reports and analytics help mess managers identify waste
        patterns and optimize future meal planning. The system also promotes
        student awareness through regular updates, encouraging responsible
        consumption and zero-waste practices.
      </p>
    </div>
  );
};

export default MessWasteManagementInfo;
