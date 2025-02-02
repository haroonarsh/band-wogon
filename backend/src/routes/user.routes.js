import express from "express";
import { signup, login, updateUser, logout, updatePassword, deleteUser, becomeArtist, createShow, becomeUser } from "../controllers/user.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.js";
import { roleAuth } from "../middlewares/roleAuth.middleware.js";
// import passport from "passport";

const router = express.Router();

        // User routes
router.post("/signup", signup);
router.post("/login", login);
router.put("/edit-profile", authenticate, upload.single("profileImage"), updateUser);
router.post("/logout", authenticate, logout);
router.put("/update-password", authenticate, updatePassword);
router.delete("/delete-user", authenticate, deleteUser);
router.post("/create-show", authenticate, createShow);
router.put("/become-artist", authenticate, becomeArtist);
router.put("/become-user", authenticate, becomeUser);


export default router;