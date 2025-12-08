// This is our custom function to recursively clean objects.
const sanitizeObject = (obj) => {
    // If the input is not an object, there's nothing to do.
    if (obj === null || typeof obj !== 'object') {
        return;
    }

    // Iterate over every key in the object.
    for (const key in obj) {
        // A safety check to make sure the key belongs to the object itself.
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            
            // THE CORE LOGIC: Check if the key starts with '$' or contains '.'
            // These are the characters used in NoSQL injection attacks.
            if (key.startsWith('$') || key.includes('.')) {
                // If a malicious key is found, delete it from the object.
                delete obj[key];
            } else {
                // If the key is safe, check its value.
                // If the value is another object, we must clean that object too (recursion).
                sanitizeObject(obj[key]);
            }
        }
    }
};

// This is the middleware function that Express will use.
const customMongoSanitize = (req, res, next) => {
    // Sanitize the three main places where user input can appear.
    if (req.body) {
        sanitizeObject(req.body);
    }
    if (req.query) {
        sanitizeObject(req.query);
    }
    if (req.params) {
        sanitizeObject(req.params);
    }
    // After cleaning the request, pass control to the next middleware.
    next();
};

module.exports = customMongoSanitize;