import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import LoginCard from "./LoginCardsup/LoginCard";
import SuperVisor from "./SuperVisor/Supervisor";
import LoginCardwar from "./LoginCardWar/LoginCard";

import WardenDashboard from "./Warden/Warden";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/supervisor" element={<LoginCard />} />
          <Route path="/warden" element={<LoginCardwar />} />
          <Route path="/SupervisorDash/:messId" element={<SuperVisor />} />
          <Route path="/WardenDash" element={<WardenDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
