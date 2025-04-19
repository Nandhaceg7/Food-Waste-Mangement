import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <h1 className="Heading">Hostel Mess Waste Management System</h1>
        <div className="navbar-menu">
          <li>
            <a href="/">Home</a>
          </li>
        </div>
      </div>
    </>
  );
}
