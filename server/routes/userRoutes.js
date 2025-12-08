const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { validateUserRegistration } = require('../middleware/validationMiddleware'); // Import

// Add the validation middleware to the register route
router.post('/register', registerUser);
router.post('/login', loginUser); // Login doesn't need as much validation, as we check credentials anyway

module.exports = router;