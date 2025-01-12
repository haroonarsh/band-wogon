import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });
export default upload;



// import cloudinary from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const uploadToCloudinary = async (filePath) => {
//   try {
//     const result = await cloudinary.v2.uploader.upload(filePath, {
//       folder: "user-profile-images",
//     });
//     return result; // Returns the full response, including `secure_url`
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     return { error };
//   }
// };







// backend/middlewares/upload.js
// import cloudinary from "../lib/cloudinary";

// export const uploadToCloudinary = async (file) => {
//     try {
//         const result = await cloudinary.uploader.upload(file.filepath, {
//             folder: "user-profiles", // Folder in Cloudinary
//         });
//         return result.secure_url; // Return the secure URL of the uploaded image
//     } catch (error) {
//         throw new Error("Failed to upload image to Cloudinary: " + error.message);
//     }
// };


// import multer from "multer";
// import cloudinary from "../lib/cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "user-profiles", // The name of the folder in cloudinary
//         allowed_formats: ["jpg", "png", "jpeg"], // Formats allowed
//     },
// })

// const upload = multer({ storage });

// export default upload;