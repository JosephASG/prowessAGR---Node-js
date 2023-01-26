import { v2 as cloudinary } from "cloudinary";
// Path: backend\src\utils\cloudinaryConfig.js

// upload image to cloudinary and return the image url
export async function uploadImageProduct(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: "prowess/product", // cloudinary folder name
  });
}
//delete image from cloudinary
export async function deleteImageProduct(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}

//upload image user
export async function uploadImageUser(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: "prowess/user",
  });
}

//delete image user
export async function deleteImageUser(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}
