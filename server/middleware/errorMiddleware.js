// Error handling middleware
// Provides a 404 handler and a centralized error handler

// notFound: catch unmatched routes and forward an error
function notFound(req, res, next) {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

// errorHandler: central error formatting middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack);

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
    }

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        // include stack trace only in non-production for debugging
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}

module.exports = { notFound, errorHandler };