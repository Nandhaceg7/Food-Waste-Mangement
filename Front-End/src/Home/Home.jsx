import "./Home.css";
import MessWasteManagementInfo from "../MessWasteManagementInfo/MessWasteManagementInfo";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <MessWasteManagementInfo />
      <div className="button-home">
        <Link to="/supervisor">
          <button className="but-home">Mess supervisor</button>
        </Link>
        <Link to="/warden">
          <button className="but-home">Warden</button>
        </Link>
      </div>
      <div className="off">
        <h1>Official Information </h1>
        <div className="info"></div>
      </div>
    </>
  );
}
