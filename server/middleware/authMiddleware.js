const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * @desc Protects routes by verifying the JWT
 */
exports.protect = async (req, res, next) => {
    let token;

    // 1. Check if the token exists in the headers and is a Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Get token from header (Bearer <token>)
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify the token's authenticity
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Attach the user to the request object
            // Find the user by the ID from the token's payload.
            // .select('-password') ensures we don't include the hashed password.
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Proceed to the next middleware or controller
        } catch (error) {
            console.error(error);
            res.status(401);
            return next(new Error('Not authorized, token failed'));
        }
    }

    if (!token) {
        res.status(401);
        return next(new Error('Not authorized, no token'));
    }
};

/**
 * @desc Grants access only to admin users
 */
exports.admin = (req, res, next) => {
    // This middleware should run AFTER the 'protect' middleware.
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403); // Forbidden
        return next(new Error('Not authorized as an admin'));
    }
};