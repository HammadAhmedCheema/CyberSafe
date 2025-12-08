const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const customMongoSanitize = require('./middleware/sanitizationMiddleware');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// --- GLOBAL MIDDLEWARE ---
// The order here is important!

// 1. Enable Cross-Origin Resource Sharing
app.use(cors());

// 2. Body Parser for JSON
app.use(express.json());

// 3. Custom Security Middleware
app.use(customMongoSanitize);

// 4. Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again after 10 minutes',
});
app.use(limiter);


// --- ROUTE DEFINITIONS ---
// THIS IS THE MOST LIKELY LOCATION OF THE PROBLEM.
// These lines connect your route files to your application.
// They MUST come AFTER the global middleware and BEFORE the error handlers.

// Test route
app.get('/', (req, res) => {
    res.send('API is running successfully.');
});

// Serve the static 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// API routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/incidents', require('./routes/incidentRoutes'));


// --- ERROR HANDLING MIDDLEWARE ---
// These MUST be the LAST pieces of middleware in the file.
app.use(notFound);
app.use(errorHandler);


// --- START THE SERVER ---
const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV !== 'test') {
    app.listen(
        PORT,
        console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );
}

module.exports = app;