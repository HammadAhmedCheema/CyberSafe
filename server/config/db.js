const mongoose = require('mongoose');

// The logic to connect to MongoDB
const connectDB = async () => {
    try {
        // Mongoose.connect returns a promise, so we use await
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // If the connection is successful, log it to the console
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If there's an error, log it and exit the process with failure
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;