const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require('dotenv').config();

// Log Cloudinary configuration
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "***" : undefined
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  try {
    console.log("Starting image upload to Cloudinary...");
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    console.log("Image uploaded successfully:", result.secure_url);
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = {
  upload,
  imageUploadUtil,
};
