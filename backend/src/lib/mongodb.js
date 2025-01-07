import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected !! DB HOST: ${conn.connection.host}`);

        return conn
        
    } catch (error) {
        console.log("Connection Failed", error);
        process.exit(1)
    }
}

export default connectDB;

// "@react-google-maps/api": "^2.20.5",
