import mongoose from 'mongoose';
import env from '@/core/constant/env'

let isConnected = false; // Track connection status

export async function connectToDatabase() {
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        const db = await mongoose.connect(env.mongodb_uri);

        isConnected = db.connections[0].readyState === 1;
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw error;
    }
}