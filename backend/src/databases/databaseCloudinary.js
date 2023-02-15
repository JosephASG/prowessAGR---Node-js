//Almacenamiento de imagenes base de datos en la nube
import cloudinary from "cloudinary";

try {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });
  console.log("Connected to Cloudinary");
} catch (error) {
  console.log("Error connecting to Cloudinary");
}
