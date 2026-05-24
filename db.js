const mongoose = require("mongoose");

// MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// Connect to MongoDB
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("DB connected");
});

db.on("error", (err) => {
  console.log("DB connection error:", err);
});

db.on("disconnected", () => {
  console.log("DB disconnected");
});

module.exports = db;