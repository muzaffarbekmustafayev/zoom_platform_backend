const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        if (process.env.NODE_ENV === 'production') {
            console.error('FATAL: MONGO_URI is not set');
            process.exit(1);
        }
        console.warn('MONGO_URI not set, falling back to localhost (development only)');
    }

    try {
        const conn = await mongoose.connect(uri || 'mongodb://localhost:27017/zoom-clone', {
            serverSelectionTimeoutMS: 10000
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Mongo connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
