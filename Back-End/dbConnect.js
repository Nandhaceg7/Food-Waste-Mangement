// dbconnect.js
const postgres = require("postgres");

const connectionString =
  "postgresql://postgres.wxeilypnbdnvfecmtwpc:@Kishore123@@aws-1-ap-south-1.pooler.supabase.com:5432/postgres";
const sql = postgres(connectionString, { ssl: "require" });

module.exports = sql;

// // dbconnect.js
// const postgres = require("postgres");

// // URL-encode the password to handle special characters
// const encodedPassword = encodeURIComponent("@Kishore123@");

// const connectionString = `postgresql://postgres:${encodedPassword}@db.wxeilypnbdnvfecmtwpc.supabase.co:5432/postgres`;
// const sql = postgres(connectionString, { ssl: "require" });

// module.exports = sql;

// // dbconnect.js
// const postgres = require("postgres");

// // URL-encode the password to handle special characters
// const encodedPassword = encodeURIComponent("Kishore123@");

// const connectionString = `postgresql://postgres:${encodedPassword}@db.wxeilypnbdnvfecmtwpc.supabase.co:5432/postgres`;
// const sql = postgres(connectionString, { ssl: "require" });

// module.exports = sql;
