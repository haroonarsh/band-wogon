import { verifyToken } from "@/backend/utils/auth";
import connectDB from "@/backend/lib/mongodb";
import User from "@/backend/models/user.model";
import jwt from "jsonwebtoken";

export async function PATCH(req) {
    if (req.method !== "PATCH") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
    }

    // Parse the JSON body
    const body = await req.json(); // Use req.json() to parse the body
    console.log("body", body);
    
    const { username, email, profileImage } = body;

    if (!username || !email) {
        return new Response(JSON.stringify({ error: "Username and email are required" }), { status: 400 });
    }

    // Parse the Authorization header
    const token =  req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized: No token provided" }), { status: 401 });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id;

        // Connect to the database
        await connectDB();

        // Update the user information including profile image
        const updatedFields = { username, email };
        if (profileImage) {
            updatedFields.profileImage = profileImage;
        }

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: updatedFields
            },
            { new: true }
        ).select("-password");

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ user, token , message: "User profile updated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return new Response(JSON.stringify({ error: "Error updating profile" }), { status: 500 });
    }
}


// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const upload = multer();

// export default async function handler(req, res) {
//     if (req.method !== "PUT") {
//         return res.status(405).json({ error: "Method not allowed" });
//     }

//     try {
//         const user = verifyToken(req.headers.authorization);
//         if (!user) {
//             return res.status(401).json({ error: "Unauthorized" });
//         }

//         const { username, email } = req.body;
//         let profileImageUrl = user.profileImage;

//         if (req.file) {
//             const result = await cloudinary.v2.uploader.upload_stream(req.file.buffer, {
//                 folder: "user-profiles",
//             })
//             profileImageUrl = result.secure_url;
//         }

//         const db = await connectDB();
//         const updatedUser = await db.collection("users").findOneAndUpdate(
//             { _id: user._id },
//             { $set: { username, email, profileImage: profileImageUrl } },
//             { returnDocument: "after" }
//         )

//         const newAccessToken = generateAccessToken(updatedUser.value);
//         const newRefreshToken = generateRefreshToken(updatedUser.value);

//         res.status(200).json({
//             user: updatedUser.value,
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken,
//             message: "Profile updated successfully",
//         });
//     } catch (error) {
//         console.error("Error updating profile:", error);
//         res.status(500).json({ error: "Error updating profile" });
//     }
// }

// export const config = {
//     api: {
//         bodyParser: false,
//     }
// }

                                    // /=========================

// import connectDB from "@/backend/lib/mongodb";
// import User from "@/backend/models/user.model";
// import { ObjectId } from "mongodb";

// export const PUT = async function (req, { params }) {
//     const { id } = params;

//     try {
//         const {username, location, profileImage, role,email } = await req.json();
//         console.log( username, location, profileImage, role,  email);

//         await connectDB();

//         let user;
//         if (ObjectId.isValid(id)) {
//             user = await User.findByIdAndUpdate(_id);
//         }

//         if (!user) {
//             return new Response(JSON.stringify({ message: 'User not found' }), {
//                 status: 404,
//             });
//         }

//         // user.name = name || user.name;
//         user.username = username || user.username;
//         // user.location = location || user.location;
//         user.email = email || user.email;
//         user.profileImage = profileImage || user.profileImage;
//         // user.role = role || user.role;

//         if (email) {
//             user.email = email
//         }


//         // if (password && confirmPassword) {
//         //     if (password === confirmPassword) {
//         //         user.password = password
//         //     } else {
//         //         return new Response(JSON.stringify({ message: 'Passwords do not match' }), {
//         //             status: 400,
//         //         });
//         //     }
//         // }

//         await user.save();


//         return new Response(
//             JSON.stringify({
//                 message: 'User updated successfully',
//                 id: user._id,
//                 username: user.username,
//                 email: user.email,
//                 profileImage: user.profileImage,
//             }),
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error('Error updating user:', error.message);
//         return new Response(JSON.stringify({ message: 'Internal server error' }), {
//             status: 500,
//         });
//     }
// }


                        // ===========================



// import formidable from "formidable";
// import connectDB from "@/backend/lib/mongodb";
// import User from "@/backend/models/user.model";
// import { uploadToCloudinary } from "@/backend/middlewares/upload";

// // Disable Next.js body parsing for this API route
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export const PUT = async (req) => {
//   try {
//     // Initialize formidable for file parsing
//     const form = new formidable.IncomingForm({
//       keepExtensions: true,
//     });

//     // Parse the incoming request
//     const data = await new Promise((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) reject(err);
//         resolve({ fields, files });
//       });
//     });

//     const { fields, files } = data;

//     if (!fields || !files) {
//       return new Response(JSON.stringify({ error: "Invalid request" }), {
//         status: 400,
//       });
//     }
//     const { username, email, userId } = fields;
//     if (!userId) {
//         return new Response(JSON.stringify({ error: "User ID is required" }), {
//             status: 400,
//         });
//     }    

//     // Validate required fields
//     if (!userId) {
//       return new Response(JSON.stringify({ error: "User ID is required" }), {
//         status: 400,
//       });
//     }

//     // Connect to the database
//     await connectDB();

//     // Find the user in the database
//     const user = await User.findById(userId);
//     if (!user) {
//       return new Response(JSON.stringify({ error: "User not found" }), {
//         status: 404,
//       });
//     }

//     // Upload the profile image if provided
//     let uploadedImage = user.profileImage;
//     if (files.profileImage) {
//       const uploadResult = await uploadToCloudinary(files.profileImage.filepath);
//       if (uploadResult.error) {
//         return new Response(
//           JSON.stringify({
//             error: "Image upload failed",
//             details: uploadResult.error.message,
//           }),
//           { status: 500 }
//         );
//       }
//       uploadedImage = uploadResult.secure_url; // Ensure you're returning `secure_url` from your upload middleware
//     }

//     // Update the user fields
//     user.username = username || user.username;
//     user.email = email || user.email;
//     user.profileImage = uploadedImage;
//     await user.save();

//     // Send the updated user data in the response
//     return new Response(
//       JSON.stringify({
//         message: "Profile updated successfully",
//         user: {
//           id: user._id,
//           username: user.username,
//           email: user.email,
//           profileImage: user.profileImage,
//         },
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return new Response(
//       JSON.stringify({
//         error: "Error updating profile",
//         details: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// };





                //   ===================================

 


// import connectDB from "@/backend/lib/mongodb.js";
// import upload from "@/backend/middlewares/upload.js";
// import User from "@/backend/models/user.model.js";

// export const POST = async (req, res) => {
//     try {
//                 // Parse the form data (handling file uploads)
//         const formData = await new Promise((resolve, reject) => {
//             upload.single("profileImage")(req, {}, (err) => {
//             if (err) return reject(err);
//             resolve(req);
//             });
//         });

//         const { username, email, userId, _id } = formData.body; // Extract data from form body
//         const file = formData.file; // Extract uploaded file

//                 // Check if user ID is existing
//         if (!_id) {
//             return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
            
//         }

//         await connectDB(); // Connect to the database

//                 // Find user by ID
//         const user = await User.findById(userId || _id);
//         if (!user) {
//             return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
//         }

//         // Update the user's profile image if a file is uploaded
//         let uploadedImage = user.profileImage;
//         if (file && file.path) {
//             uploadedImage = file.path; // Cloudinary automatically provides this in multer-storage
//         }

//         // Update user profile
//         user.username = username || user.username;
//         user.email = email || user.email;
//         user.profileImage = uploadedImage;

//         await user.save(); // Save the updated user

//                 // Return success response
//         return new Response(
//             JSON.stringify({
//                 message: "User profile updated successfully",
//                 user: {
//                     id: user._id,
//                     username: user.username,
//                     email: user.email,
//                     profileImage: user.profileImage,
//                 },
//             }),
//             { status: 200 }
//         );

//     } catch (error) {
//         console.error("Error updating user profile:", error);
//         return new Response(JSON.stringify({ error: "Error updating profile", details: error.message }), {
//             status: 500,
//         });
//     }
// };


//         //    ============================

// // import connectDB from "@/backend/lib/mongodb";
// export const PATCH = async (req, res) => {
//     try {
//       const { userId } = req.params;
//       const { username, email } = req.body;
//       const file = req.file;
  
//       // Validate input data
//       if (!userId) {
//         return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
//       }
  
//       if (username && typeof username !== "string") {
//         return new Response(JSON.stringify({ error: "Username must be a string" }), { status: 400 });
//       }
  
//       if (email && typeof email !== "string") {
//         return new Response(JSON.stringify({ error: "Email must be a string" }), { status: 400 });
//       }
  
//       // Connect to the database
//       await connectDB();
  
//       // Find the user by ID
//       const user = await User.findById(userId);
//       if (!user) {
//         return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
//       }
  
//       // Update the user's profile
//       if (username) {
//         user.username = username;
//       }
  
//       if (email) {
//         user.email = email;
//       }
  
//       if (file) {
//         // Update the user's profile image
//         const uploadedImage = await uploadImage(file);
//         user.profileImage = uploadedImage;
//       }
  
//       // Save the updated user
//       await user.save();
  
//       // Return the updated user data
//       return new Response(
//         JSON.stringify({
//           message: "User profile updated successfully",
//           user: {
//             id: user._id,
//             username: user.username,
//             email: user.email,
//             profileImage: user.profileImage,
//           },
//         }),
//         { status: 200 }
//       );
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//       return new Response(JSON.stringify({ error: "Error updating profile", details: error.message }), {
//         status: 500,
//       });
//     }
//   };
  
//   // Helper function to upload an image
//   const uploadImage = async (file) => {
//     // Implement your image upload logic here
//     const cloudinary = require("cloudinary").v2;
//     const multer = require("multer");
//     const { CloudinaryStorage } = require("multer-storage-cloudinary2");
    
//     // Configure Cloudinary
//     cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });
    
//     // Create a Cloudinary storage engine
//     const storage = new CloudinaryStorage({
//       cloudinary: cloudinary,
//       params: {
//         folder: "user_profiles", // Specify the folder where the images will be stored
//         allowed_formats: ["jpg", "png", "jpeg"], // Specify the allowed image formats
//       },
//     });
    
//     // Create a Multer instance with the Cloudinary storage engine
//     const upload = multer({ storage });
    
//     // Helper function to upload an image
//     const uploadImage = async (file) => {
//       const uploadedImage = await new Promise((resolve, reject) => {
//         upload.single("profileImage")(file, (err, uploadedFile) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(uploadedFile);
//           }
//         });
//       });
    
//       return uploadedImage.path;
//     };
//     // For example, using Cloudinary:
//     const uploadedImage = await cloudinary.uploader.upload(file.path);
//     return uploadedImage.url;
//   };