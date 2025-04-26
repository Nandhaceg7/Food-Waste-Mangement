// dbconnect.js
const postgres = require('postgres')

const connectionString = 'postgresql://postgres.owdvsxzxjevpcmeupxfz:nandha@123nandha@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres'
const sql = postgres(connectionString, { ssl: 'require' })

module.exports = sql