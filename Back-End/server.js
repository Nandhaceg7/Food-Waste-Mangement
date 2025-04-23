const { Client } = require('pg');

// Create a new client with the Supabase connection details
const client = new Client({
  user: 'postgres', // Supabase username (postgres)
  host: 'db.owdvsxzxjevpcmeupxfz.supabase.co', // Supabase host
  database: 'postgres', // Database name (usually 'postgres')
  password: '@Dbms_project123', // Replace with your actual password
  port: 5432, // PostgreSQL port (default: 5432)
});

// Connect to the database
client.connect()
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });
