/** @format */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database is Connected");
  } catch (e) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};

module.exports = { connectDb };
