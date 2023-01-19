import { v2 as cloudinary } from "cloudinary";
// Path: backend\src\utils\cloudinaryConfig.js

// upload image to cloudinary and return the image url
export async function uploadImage(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: "prowess",
  }); 
} 
//delete image from cloudinary 
export async function deleteImage(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}

