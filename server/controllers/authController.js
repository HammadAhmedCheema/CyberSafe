const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// A helper function to generate a JWT
// It takes a user's ID as the payload, signs it with our secret key, and sets an expiration date.
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // The token will be valid for 30 days
    });
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validation: Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400); // Bad Request
            throw new Error('User with this email already exists');
        }

        // 2. Create new user in the database
        // The password will be automatically hashed by the middleware we created in userModel.js
        const user = await User.create({
            name,
            email,
            password,
        });

        // 3. Respond with user data and a token
        if (user) {
            res.status(201).json({ // 201 Created
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {

        next(error); // Pass the error to our custom error handler
    }
};

/**
 * @desc    Authenticate a user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user by email
        const user = await User.findOne({ email });

        // 2. Check if user exists and if the password matches
        // We use the matchPassword method we defined in our userModel
        if (user && (await user.matchPassword(password))) {
            // 3. Respond with user data and a new token
            res.status(200).json({ // 200 OK
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401); // Unauthorized
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};