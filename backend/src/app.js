import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./models/user.model.js";
import jwt from "jsonwebtoken";
import authenticate from "./middlewares/auth.middleware.js";
import upload from "./middlewares/upload.js";
// import "./auth/passport.js";

dotenv.config({
    path: "./env"
})

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

const app = express();

        // Middleware
app.use(cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
}));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json());

        // Setup session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

        // Setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
        new GoogleStrategy({
                clientID: clientId,
                clientSecret: clientSecret,
                callbackURL: "/auth/google/callback",
                scope: ["profile", "email"]
        },
        async (accessToken, refreshToken, profile, done) => {
                try {
                        // Find or create user in your database
                        const user = await User.findOne({ googleId: profile.id });

                        if (!user) {
                                const user = new User({
                                    googleId: profile.id,
                                    username: profile.displayName,
                                    email: profile.emails[0].value,
                                    password: profile.displayName,
                                    profileImage: profile.photos[0].value,
                                })
                                await user.save();
                                // return done(null, newUser);
                        }

                        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

                            return done(null, { user, token });
                } catch (error) {
                        done(error, null); 
                }
        }
)
)

passport.serializeUser((data, done) => {
        done(null, data);
})

passport.deserializeUser((data, done) => {
        done(null, data);
})

        // initial google auth login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", { 
        successRedirect: "http://localhost:3000/home",
        failureRedirect: "http://localhost:3000/login", 
        failWithError: "http://localhost:3000/login",
}))

app.get("/login/success", async (req, res) => {
        if (req.user) {
                res.status(200).json({ message: "Login successful", user: req.user, accessToken: req.user.token });
        } else {
                res.status(401).json({ message: "Login failed" });
        }
})

app.get("/logout", (req, res, next) => {
        req.logout(function(err){
                if(err) { return next(err) }
                res.redirect("http://localhost:3000/login");
        })
})

app.put("/update-profile", authenticate, upload.single("profileImage"), async (req, res) => {
        try {
                if (!req.user) {
                        return res.status(401).json({ message: "Unauthorized. Please log in first." });
                }

                const { username, email } = req.body;

                if (!username || !email) {
                        return res.status(400).json({ message: "All fields are required" });
                }

                let profileImage = req.user.profileImage;

                if (req.file) {
                        try {
                                const uploadResponse = await uploadOnCloudinary(req.file.path);
                                if (uploadResponse && uploadResponse.secure_url) {
                                        profileImage = uploadResponse.secure_url;
                                } else {
                                        throw new Error("Error uploading image to Cloudinary");
                                }
                        } catch (error) {
                                throw new Error("Error uploading image to Cloudinary"); 
                        }
                }

                const updatedUser = await User.findByIdAndUpdate(
                        req.user.id,
                        {
                                username,
                                email,
                                profileImage
                        },
                        { new: true }
                )

                if (!updatedUser) {
                        return res.status(404).json({ message: "User not found" });
                }

                res.status(200).json({ message: "User updated successfully", user: updatedUser });
        } catch (error) {
                console.error("Error updating user:", error.message);
                res.status(500).json({ message: "Internal server error" });
        }
})

        // Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Error connecting to MongoDB:", error));

        // Routes
import userRoutes from "./routes/user.routes.js"
import { uploadOnCloudinary } from "./utils/cloudinary.js";
app.use("/api/user", userRoutes);

        // Google routes
// import googleRoutes from "./routes/auth.routes.js"
// import { access } from "fs";
// app.use("/auth", googleRoutes);

        // Default route
app.get("/", (req, res) => {
    res.send("Backend is running...");  
})

        // Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
