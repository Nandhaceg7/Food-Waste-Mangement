// sampleQuery.js
const sql = require("./dbConnect");

async function fetchFaculty() {
  try {
    const result = await sql`SELECT * FROM messdata`;
    console.log("Faculty data:", result);
  } catch (err) {
    console.error("Database query failed:", err);
  }
}

fetchFaculty();
