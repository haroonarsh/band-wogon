import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

        // utility functions to generate tokens
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};

          //Signup user
const singup = asyncHandler(async (req, res) => {
  // get user detail from frontend
    // validation - not empty or empty
    // check if user already exists: username, email
    // check for images, avatar
    // upload then to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { username, email, password, location } = req.body;

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
        location
      })
      const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
      )
      if (!createUser) {
        throw new ApiError(400, "Something went wrong while creating user");
      }
     
      await createUser.save();

      res
      .status(201)
      .json(new ApiResponse(201, createUser, "User created successfully"));
    } catch (error) {
      throw new ApiError(400, error.message);
      console.error("Error creating user:", error);
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

    res
    .status(200)
    .json(new ApiResponse(200, { user, accessToken, refreshToken }, "User logged in successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
})

        // Update user
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { username, email } = req.body;

  try {
        // Find and update a user
    const updatedUser = await User.findOneAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      throw new ApiError(400, "User not found");
    }

    res
    .status(200)
    .json(new ApiResponse(200, { user: updatedUser}, "User updated successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
})

export { singup, login, updateUser };