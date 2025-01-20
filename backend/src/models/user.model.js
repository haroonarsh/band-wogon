import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: false,
        unique: true
    },
    profileImage: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
    },
    googleId: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "artist"],
    },
    show: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show",
        },
    ],
    location: {
        type: String,
        required: false,
        default: null,
    },
},
   {
    timestamps: true
   } 
);

                // Pre-save hook to hash the password before saving the user
        userSchema.pre("save", async function (next) {
            if (!this.isModified("password")) {
                return next();
            }
            
            try {
                this.password = await bcrypt.hash(this.password, 10);
                this.confirmPassword = undefined;
                // console.log("Password hashed successfully");
                next();
            } catch (error) {
                console.log("Error hashing the password", error);
                next(error);
            }
        })

                // Method to compare password
        userSchema.methods.comparePassword = async function (interedPassword) {
            return await bcrypt.compare(interedPassword, this.password);
        }

                // Method to generate access token

                // Method to generate refresh token

                // Create the user model

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;