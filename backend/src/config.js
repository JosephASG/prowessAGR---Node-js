import { config } from "dotenv";
config();

// Configure the environment variables
export default {
  MONGODB_URI: process.env.MONGODB_URI,
  API_PREFIX: process.env.API_PREFIX,
  LOG_FORMAT: process.env.LOG_FORMAT,
  PORT: process.env.PORT,
};
