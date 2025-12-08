const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 1. Define the schema (the blueprint for our user data)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true, // No two users can have the same email
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // The role must be either 'user' or 'admin'
        default: 'user', // New users are assigned the 'user' role by default
    }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

// 2. Mongoose Middleware to hash the password before saving
// The 'next' parameter is removed from here.
userSchema.pre('save', async function () {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        // We just return; we DO NOT call next().
        return;
    }

    // Generate a "salt" to make the hash more secure
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    // We DO NOT call next() here either. The async function completing is enough.
});

// 3. Mongoose method to compare passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// 4. Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;