import mongoose from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info(`MongoDB connected`)
    } catch (error) {
        logger.error(`failed to connect db ${error}`)
        process.exit(1);
    }
}

export default connectDB;