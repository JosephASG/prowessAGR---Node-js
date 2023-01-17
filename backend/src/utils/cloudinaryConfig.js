import { v2 as cloudinary } from "cloudinary";

// Path: backend\src\utils\cloudinaryConfig.js
export async function uploadImage(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: "prowess",
  }); 
}

export async function deleteImage(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}

export async function updateImage(publicId, filePath) {
  return await cloudinary.uploader.update_metadata(filePath, {
    folder: "prowess",
    public_id: publicId,
  });
}
