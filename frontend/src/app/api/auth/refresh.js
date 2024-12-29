import jwt from "jsonwebtoken";
import connectDB from "@/backend/lib/mongodb";
import User from "@/backend/models/user.model";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        await connectDB(); // Connect to the database
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newAccessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
        return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}