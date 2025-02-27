import { connect } from 'mongoose';
const connectDB = async () => {
    console.log(process.env.DATABASE_URL);
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL is not defined in environment variables');
        }
        await connect(process.env.DATABASE_URL);
        console.log('✅ MongoDB connected');
    }
    catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
};
export default connectDB;
