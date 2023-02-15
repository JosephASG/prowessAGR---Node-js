import { config } from "dotenv";    // import module dotenv
config();                            // initialize dotenv

// Configurar variables de entorno
export default {
  MONGODB_URI: process.env.MONGODB_URI,   // MongoDB URI
  API_PREFIX: process.env.API_PREFIX,     // API prefix
  LOG_FORMAT: process.env.LOG_FORMAT,     // Log format
  PORT: process.env.PORT,                 // Port
};
