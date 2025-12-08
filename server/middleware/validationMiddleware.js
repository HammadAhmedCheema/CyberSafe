const { body, validationResult } = require('express-validator');

// A reusable function to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation rules for user registration
exports.validateUserRegistration = [
    body('name', 'Name is required').not().isEmpty().trim().escape(),
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    handleValidationErrors
];

// Validation rules for creating an incident
exports.validateIncidentCreation = [
    body('incidentType', 'Incident type is required').not().isEmpty().trim().escape(),
    body('description', 'Description is required').not().isEmpty().trim().escape(),
    handleValidationErrors
];