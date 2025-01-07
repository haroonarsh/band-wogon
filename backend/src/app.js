import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

const app = express();

        // Middleware
app.use(cors());
app.use(bodyParser.json());

        // Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongdoDB"))
.catch((error) => console.error("Error connecting to MongoDB:", error));

        // Routes
const userRoutes = require("./routers/user.routes");
app.use("/api/user", userRoutes);

        // Default route
app.get("/", (req, res) => {
    res.send("Backend is running...");
})

        // Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
