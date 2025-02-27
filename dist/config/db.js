import { connect } from "mongoose";
// Cache the database connection
let isConnected = false;
const connectDB = async () => {
    // If already connected, reuse the connection
    if (isConnected) {
        return;
    }
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not defined in environment variables");
        }
        await connect(process.env.DATABASE_URL);
        isConnected = true;
        console.log("✅ MongoDB connected");
    }
    catch (error) {
        isConnected = false;
        console.error("❌ MongoDB connection error:", error);
        throw error; // Let the error be handled by the route handler
    }
};
export default connectDB;
