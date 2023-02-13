import mongoose from "mongoose";
import config from "../config.js";

// Connect to MongoDB
(async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Connected to database MongoDB: name ${conn.connection.name} at host port ${conn.connection.host}`
    );
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
})();
