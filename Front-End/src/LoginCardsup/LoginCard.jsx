import { useState } from "react";
import axios from "axios";
import "./Logincard.css"; // Import the CSS file

function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.data.redirectUrl) {
        // Redirect to the supervisor dashboard
        window.location.href = response.data.redirectUrl;
      }

      console.log(response.data.message);
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
        setMessage(error.response.data.message);
      } else {
        console.error("Error:", error.message);
        setMessage("Server error");
      }
    }
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      {message && (
        <p
          style={{
            color: message.includes("successful") ? "green" : "red",
            marginTop: "10px",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default LoginCard;
