// console.log("Cloudinary config file LOADED");
// import cloudinary from "cloudinary";

// cloudinary.v2.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// })

// console.log("ENV CHECK:", {
//   name: process.env.CLOUD_NAME,
//   key: process.env.CLOUD_API_KEY,
//   secret: process.env.CLOUD_API_SECRET
// });


// const uploadToCloudinary= (filepath)=>{
//     return new Promise((resolve,reject)=>{
//         cloudinary.v2.uploader.upload(
//             filepath,
//             {folder:"user-profiles"},
//             (error,result)=>{
//                 if(error) return reject(error)
//                     resolve(result.secure_url)
//             }
//         )
//     })
// }

// export default uploadToCloudinary;

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from "dotenv";

dotenv.config()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'users/profiles',
    format: async (req, file) => 'webp', // Convert to webp for better compression
    public_id: (req, file) => {
      return `user-${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    },
    transformation: [
      { width: 500, height: 500, crop: 'limit' }, // Resize image
      { quality: 'auto' }, // Auto optimize quality
      { format: 'webp' } // Convert to webp
    ]
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Utility function to delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

// Utility function to extract public ID from Cloudinary URL
const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  
  try {
    const matches = url.match(/\/v\d+\/([^/]+)\.\w+$/);
    return matches ? matches[1] : null;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
};

export {
  cloudinary,
  upload,
  deleteFromCloudinary,
  getPublicIdFromUrl
};