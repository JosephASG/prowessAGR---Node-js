//Almacenamiento de imagenes base de datos en la nube
import cloudinary from "cloudinary";

// 1. Import the cloudinary library
try {
  // 2. Try to access the cloudinary library
  cloudinary.config({
    // 3. Configure the cloudinary library
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });
  console.log("Connected to Cloudinary");
} catch (error) {
  // 4. If there is an error, show a message in the console
  console.log("Error connecting to Cloudinary");
}
