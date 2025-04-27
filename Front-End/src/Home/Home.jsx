import React, { useState, useEffect } from "react";
import "./Home.css";
import MessWasteManagementInfo from "../MessWasteManagementInfo/MessWasteManagementInfo";
import { Link } from "react-router-dom";

export default function Home() {
  const [menu, setMenu] = useState({});
  const [information, setInformation] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-menu");
        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenuData();
  }, []);

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
    <>
      <MessWasteManagementInfo />

      <div className="button-home">
        <Link to="/supervisor">
          <button className="but-home">Mess Supervisor</button>
        </Link>
        <Link to="/warden">
          <button className="but-home">Warden</button>
        </Link>
      </div>

      <div className="off">
        <h1>Official Information</h1>

        {information.map((item, index) => (
          <div className="info-data">
            <p key={index}>{item.data}</p>
          </div>
        ))}

        <h3 style={{ textAlign: "center", marginTop: "20px" }}>Weekly Menu</h3>
        <div className="menu-table-container">
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
              {Object.entries(menu).map(([day, meals]) => (
                <tr key={day}>
                  <td>{day}</td>
                  <td>{meals.breakfast}</td>
                  <td>{meals.lunch}</td>
                  <td>{meals.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
