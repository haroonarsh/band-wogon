import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Artist from "../models/artist.model.js";
import Show from "../models/show.model.js";
import mongoose from "mongoose";

        // utility functions to generate tokens
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};

          //Signup user
const signup = asyncHandler(async (req, res) => {
  // get user detail from frontend
    // validation - not empty or empty
    // check if user already exists: username, email
    // check for images, avatar
    // upload then to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { username, email, password} = req.body;

    if (!username || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    try {
      const existingUser= await User.findOne({ email });
      if (existingUser) {
        throw new ApiError(400, "User already exists");
      }

          // create new user
      const user = new User({
        username,
        email,
        password,
      })

     
      await user.save();

      const createUser = {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        show: user.show,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      res
      .status(201)
      .json(new ApiResponse(201, { user: createUser }, "User created successfully"));
    } catch (error) {
      throw new ApiError(400, error.message);
    }
})

          //Login user
const login = asyncHandler(async (req, res) => {
    
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "Invalid email or password");
    }
           // compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid email or password");
    }

          // generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

          // set tokens in cookie 
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === "production",  // set to true in production
      sameSite: "strict",
    });

    res
    .status(200)
    .json(new ApiResponse(200, { user, accessToken, refreshToken},"User logged in successfully"));
  } catch (error) {
    throw new ApiError(400, error.message || "Error logging in user");
  }
})

        // Update user
const updateUser = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    throw new ApiError(400, "All fields are required");
  }

  const userId = req.user.id; // Ensure `req.user` is set by middleware
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  let profileImage = user.profileImage;

  // console.log("Uploaded file:", req.file);

  if (req.file) {
    try {
      // console.log("File path:", req.file);
      
      const uploadPresponse = await uploadOnCloudinary(req.file.path);
      if (uploadPresponse && uploadPresponse.secure_url) {
        profileImage = uploadPresponse.secure_url;
      } else {
        throw new ApiError(400, "Error uplaoding image to cloudinary");
      }
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }
  

  try {
    // Check if the email is already in use by another user
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      throw new ApiError(400, "Email is already in use");
    }

    // Check if the username is already in use by another user
    // const existingUsername = await User.findOne({ username });
    // if (existingUsername && existingUsername._id.toString() !== userId) {
    //   throw new ApiError(400, "Username is already in use");
    // }
    const accessToken = generateAccessToken(userId);

    // Update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, profileImage },
      { new: true, runValidators: true } // `runValidators` ensures schema validation
    );

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, { user: updatedUser , accessToken }, "User updated successfully"));
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw new ApiError(400, error.message);
  }
});

          // Logout user
const logout = asyncHandler(async (req, res) => {

  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  // set to true in production
      sameSite: "strict",
    });

    res
    .status(200)
    .json(new ApiResponse(200, {}, "Logout successful"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
})

          // update password
const updatePassword = asyncHandler(async (req, res) => {
  const { password, newPassword, confirmPassword } = req.body;

  if (!password || !newPassword || !confirmPassword) {
    throw new ApiError(400, "All fields are required");
  }

  const userId = req.user.id; // Ensure `req.user` is set by middleware

  try {
     const user = await User.findById(userId);
     if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid password");
    }

    if (newPassword !== confirmPassword) {
      throw new ApiError(400, "Passwords do not match");
    }

    user.password = newPassword;
    await user.save();

    res
    .status(200)
    .json(new ApiResponse(200, { user }, "Password updated successfully"));
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || "Internal server error" });
  }
})

                  // delete user
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Ensure `req.user` is set by middleware
  const { password } = req.body;

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid password");
    }

    await User.findByIdAndDelete(userId);

    res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || "Internal server error" });
  }
})

                  // Become a Artist
const createShow = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { artistName, location, bio, startDate, showPerformed, genres } = req.body;

    if (!artistName || !location || !bio || !startDate || !showPerformed || !genres) {
      throw new ApiError(400, "All fields are required");
    }

    if (req.user.role !== "artist") {
      throw new ApiError(400, "User is not an artist");
    }

    const user = await User.findById(userId);

    // Image handling
    let artistImage = "" || req.body.artistImage; // Default empty string or set a placeholder URL
    if (req.file) {
      try {
        // console.log("File path:", req.file);
        
        const uploadPresponse = await uploadOnCloudinary(req.file.path);
        if (uploadPresponse && uploadPresponse?.secure_url) {
          artistImage = uploadPresponse.secure_url;
        } else {
          throw new ApiError(400, "Error uplaoding image to cloudinary");
        }
      } catch (error) {
        throw new ApiError(400, error.message);
      }
    }
    
      // Create a new artist
    const newArtist = new Artist({
      artistName, 
      location, 
      bio,
      artistImage: artistImage,
      startDate: new Date(startDate), 
      showPerformed: parseInt(showPerformed, 10), 
      genres: Array.isArray(genres) ? genres : genres.split(','),
    })

      // Save the artist
    const artist = await newArtist.save();

    if (!artist) {
      throw new ApiError(404, "Artist not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { artistProfile: artist._id },
      } ,
      { new: true }
    );

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    res
    .status(200)
    .json(new ApiResponse(200, { artist }, "Show created successfully"));
  } catch (error) {
    console.error("Error creating show:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
})

        // become a artist
const becomeArtist =  asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id; // Ensure `req.user` is set by middleware
  
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.role === "user") {
    throw new ApiError(403, "user are already a artist");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      role: "artist",
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }
  res
  .status(200)
  .json(new ApiResponse(200, { user: updatedUser }, "User updated successfully"));
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
}) 

        // Become a User

const becomeUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        role: "user",
      },
      { new: true }
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res
    .status(200)
    .json(new ApiResponse(200, { user : user }, "User updated successfully"));
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
})

        // Change email
const changeEmail = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { email, newEmail, password } = req.body;

    if (!email || !newEmail || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.email !== email) {
      throw new ApiError(400, "Invalid email");
    }

    if (!(await user.comparePassword(password))) {
      throw new ApiError(400, "Invalid password");
    }

    user.email = newEmail;
    await user.save();

    res
    .status(200)
    .json(new ApiResponse(200, { user }, "Email updated successfully"));
  } catch (error) {
    console.error("Error updating email:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
})

        // create shows
const shows = asyncHandler(async (req, res) => {
  try {
    const { name, date, startTime, endTime, latitude, longitude, location, bio, genres } = req.body;

    if (!name || !date || !startTime || !endTime || !location || !bio || !genres) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    let artistImage = "" || req.body.image; // Default empty string or set a placeholder URL
    if (req.file) {
      try {
        // console.log("File path:", req.file);
        
        const uploadPresponse = await uploadOnCloudinary(req.file.path);
        if (uploadPresponse && uploadPresponse?.secure_url) {
          artistImage = uploadPresponse.secure_url;
        } else {
          throw new ApiError(400, "Error uplaoding image to cloudinary");
        }
      } catch (error) {
        throw new ApiError(400, error.message);
      }
    }

    const newShow = new Show({
      name,
      date,
      startTime,
      endTime,
      location,
      bio,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      image: artistImage,
      genres: Array.isArray(genres) ? genres : genres.split(','),
      artist: user._id,
    })

          // Save the show 
    const show = await newShow.save();

    if (!show) {
      throw new ApiError(400, "Error creating show");
    }

        // Add the show to the user's shows array
    user.shows.push(show._id);

        // Save the user
    await user.save({ validateBeforeSave: false }); // Skip validation if not needed

    res
    .status(200)
    .json(new ApiResponse(200, { show, user: user }, "Show created successfully"));
  } catch (error) {
    console.error("Error creating show:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
});

      // get all shows
const getShows = asyncHandler(async (req, res) => {
  try {
      // Get authenticated user
    const user = await User.findById(req.user._id).select("shows");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

     // Get all shows for the authenticated user ID
    const shows = await Show.find({ 
      _id: { $in: user.shows } 
    });

    if (!shows.length) {
      throw new ApiError(404, "No shows found for this user");
    }

    res
    .status(200)
    .json(new ApiResponse(200, { shows }, "User shows retrieved successfully"));
  } catch (error) {
    console.error("Error retrieving user shows:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
});

        // get Artist
const getArtist = asyncHandler(async (req, res) => {
    try {
        // Get authenticated user
        const user = await User.findById(req.user._id).select("artistProfile");
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Check if artist profile exists
        if (!user.artistProfile || user.artistProfile.length === 0) {
            throw new ApiError(404, "Artist profile not found");
        }

        // Get artist profile data
        const artistProfile = await Artist.find({
            _id: { $in: user.artistProfile }
        });

        res.status(200).json(
            new ApiResponse(200, artistProfile, "Artist profile retrieved successfully")
        );

    } catch (error) {
        throw new ApiError(500, error?.message || "Error fetching artist profile");
    }
});

        // get single artist
const getSingleArtist = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query;

    const artist = await Artist.findById(id);

    if (!artist) {
      throw new ApiError(404, "Artist not found");
    }

    res
    .status(200)
    .json(new ApiResponse(200, artist, "Artist retrieved successfully"));
  } catch (error) {
    console.error("Error retrieving artist:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
})

        // get all users and their shows
const getAllUsersWithShows = asyncHandler(async (req, res) => {
  try {
        // Get all users with populated shows
    const users = await User.find({})
    .select("-password -refreshToken") // Exclude sensitive fields
    .populate({
      path: "shows",
      select: "name date startTime endTime location bio latitude longitude image genres", // Select specific show fields
      options: { sort: { createdAt: -1 } }, // Sort shows by latest first
    })
    .populate({
      path: "artistProfile",
      select: "artistName location bio startDate showPerformed genres",
    });

    if (!users || users.length === 0) {
      throw new ApiError(404, "No users found");
    }

              // Transform data for better frontend consumption
    const transformedUsers = users.map(user => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
      createdAt: user.createdAt,
      shows: user.shows,
      artistProfile: user.artistProfile
    }));

    res
    .status(200)
    .json(new ApiResponse(200, transformedUsers, "Users retrieved successfully"));

  } catch (error) {
    console.error("Error retrieving users:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
});

          // get upcoming and past shows
const getArtistsShows = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.query;

    console.log('Received artist ID:', id);

    // Validate input
    if (!['upcoming', 'past'].includes(type)) {
      throw new ApiError(400, "Invalid type");
    }

    // Convert string ID to ObjectId
    const artistId = new mongoose.Types.ObjectId(id);

    const shows = await Show.find({ artist: artistId })
    .sort({ date: type === 'upcoming' ? 1 : -1 })
    .lean();

    console.log("shows", shows);
    

    const currentDate = new Date();

    const filteredShows = shows.filter(show => {
      // Create date object in UTC
      const showDate = new Date(show.date);
      
      // If endTime exists, create full datetime
      if (show.endTime) {
        const [hours, minutes] = show.endTime.split(':');
        const endDateTime = new Date(show.date);
        endDateTime.setUTCHours(parseInt(hours, 10));
        endDateTime.setUTCMinutes(parseInt(minutes, 10));
        return type === 'upcoming' 
          ? endDateTime > currentDate
          : endDateTime <= currentDate;
      }
      
      // For shows without endTime, compare dates only
      const showDateOnly = new Date(show.date);
      showDateOnly.setUTCHours(0, 0, 0, 0);
      const currentDateOnly = new Date();
      currentDateOnly.setUTCHours(0, 0, 0, 0);

      return type === 'upcoming'
        ? showDateOnly >= currentDateOnly
        : showDateOnly < currentDateOnly;
    });

    console.log("filteredShows", filteredShows);
    

    res
    .status(200)
    .json(new ApiResponse(200, { shows: filteredShows }, "Shows retrieved successfully"));

  } catch (error) {
    console.error("Error retrieving shows:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
})


export { signup, login, updateUser, logout, updatePassword, deleteUser, createShow, becomeUser, becomeArtist, changeEmail, shows, getShows, getArtist, getSingleArtist, getAllUsersWithShows, getArtistsShows };