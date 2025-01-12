import express from "express";
import { signup, login, updateUser, logout, updatePassword } from "../controllers/user.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

        // User routes
router.post("/signup", signup);
router.post("/login", login);
router.put("/edit-profile", authenticate, upload.single("profileImage"), updateUser);
router.post("/logout", authenticate, logout);
router.put("/update-password", authenticate, updatePassword);

export default router;