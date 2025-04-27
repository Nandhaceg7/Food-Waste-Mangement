// server.js
const express = require("express");
const cors = require("cors");
const sql = require("./dbconnect");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const retr =
      await sql`select * from messdata where mess_name=${username} and password=${password}`;
    console.log(retr);
    if (!retr) {
      console.error("Database error:", error.message);
      return res.status(500).json({ message: "Database error" });
    }

    if (retr) {
      console.log("Login success:");
      // Send the user data and redirect URL as part of the response
      res.status(200).json({
        message: "Login successful",
        retr,
        redirectUrl: `/SupervisorDash/${retr[0].mess_id}`, // Send the URL for client-side redirection
      });
    } else {
      console.log("Login failed: No matching user");
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/get-menu", async (req, res) => {
  const data = await sql`select * from menu`;

  if (!data) {
    console.error("Error fetching menu:", error);
    return res.status(500).json({ error: "Failed to fetch menu" });
  }

  const formattedMenu = {};
  data.forEach((row) => {
    formattedMenu[row.day] = {
      breakfast: row.breakfast,
      lunch: row.lunch,
      dinner: row.dinner,
    };
  });

  res.json(formattedMenu);
});

app.post("/submit-attendance/:messId", async (req, res) => {
  const { messId } = req.params;
  const { selectedWeek, attendance } = req.body;
  console.log(attendance);
  console.log(messId);
  console.log(selectedWeek);

  try {
    for (const entry of attendance) {
      await sql`
        INSERT INTO attendance (messid, day, week, breakfast, lunch, dinner)
        VALUES (${messId}, ${entry.day}, ${selectedWeek}, ${parseInt(
        entry.breakfast
      )}, ${parseInt(entry.lunch)}, ${parseInt(entry.dinner)})
      `;
    }

    res.json({ message: "Attendance submitted successfully!" });
  } catch (error) {
    console.error("Already Submitted Attendance for this week !", error);
    res.status(500).json({ error: "Failed to submit attendance" });
  }
});

app.get("/api/attendance", async (req, res) => {
  const { week, mess } = req.query;
  console.log(week);
  console.log(mess);

  let messId = 101;
  if (mess === "pg-non-veg-mess") messId = 101;
  if (mess === "veg-mess") messId = 102;
  if (mess === "mega-mess") messId = 103;
  if (mess === "ug-non-veg-mess") messId = 104;
  if (mess === "ug-veg-mess") messId = 105;

  try {
    const result = await sql`
      SELECT day, breakfast, lunch, dinner
      FROM attendance
      WHERE  messid = ${messId} AND week=${week}
      ORDER BY
        CASE
          WHEN day = 'Sunday' THEN 1
          WHEN day = 'Monday' THEN 2
          WHEN day = 'Tuesday' THEN 3
          WHEN day = 'Wednesday' THEN 4
          WHEN day = 'Thursday' THEN 5
          WHEN day = 'Friday' THEN 6
          WHEN day = 'Saturday' THEN 7
        END
    `;

    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/api/updateMenu", async (req, res) => {
  const { menu } = req.body;
  console.log(menu);

  try {
    for (const item of menu) {
      const { day, breakfast, lunch, dinner } = item;

      await sql`
      UPDATE menu
      SET breakfast = ${breakfast},
          lunch = ${lunch},
          dinner = ${dinner}
      WHERE day = ${day}
    `;
    }

    res.status(200).json({ message: "Menu updated successfully" });
  } catch (err) {
    console.error("Error updating menu:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getInformation", async (req, res) => {
  try {
    const data = await sql`select * from information`;
    console.log("Fetched Data:", data);
    res.json(data || []);
  } catch (error) {
    console.error("Error fetching information:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/saveOfficialInfo", async (req, res) => {
  const { data } = req.body;
  console.log(data);

  if (!data) {
    return res.status(400).json({ message: "No data provided!" });
  }

  try {
    const result = await sql`insert into information values(${data})`;
    res.status(200).json(result);
  } catch (error) {
    console.error("Error saving official information:", error);
    res.status(500).json({ message: "Failed to save official information." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});










