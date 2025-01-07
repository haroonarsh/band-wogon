import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const authenticate = (handler) => async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "Unauthorized request. User not found." });
        }
        req.user = user;
        return handler(req, res);
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}