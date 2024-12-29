import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB Connected !! DB HOST: ${conn.connection.host}`);

        return conn
        
    } catch (error) {
        console.log("Connection Failed", error);
        process.exit(1)
    }
}

export default connectDB;