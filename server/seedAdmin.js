const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const createAdminUser = async () => {
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@cybersafe.com' });
        
        if (adminExists) {
            console.log('Admin user already exists!');
            console.log('Email: admin@cybersafe.com');
            console.log('You can use this account to login.');
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@cybersafe.com',
            password: 'admin123', // This will be hashed automatically
            role: 'admin'
        });

        console.log('Admin user created successfully!');
        console.log('Email: admin@cybersafe.com');
        console.log('Password: admin123');
        console.log('Please change the password after first login.');
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdminUser();
