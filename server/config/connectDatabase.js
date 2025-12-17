// This assumes this code is in a file like './config/connectDatabase.js'
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");
        
    } catch (error) {
        console.log("Database connection failed", error.message);
        throw error;
    }
};
