import mongoose from "mongoose"

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on("connected", function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
})

// Why dont we need to export this when we access it from server.js

// Do we need this console.log to check for connection