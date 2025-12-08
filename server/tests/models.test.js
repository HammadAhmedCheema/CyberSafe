const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

describe('User Model Tests', () => {
    describe('Password Hashing', () => {
        it('should hash password before saving', async () => {
            const user = new User({
                name: 'Test User',
                email: 'modeltest@test.com',
                password: 'plainPassword123'
            });

            await user.save();

            expect(user.password).not.toBe('plainPassword123');
            expect(user.password.length).toBeGreaterThan(20);
        });

        it('should correctly compare passwords', async () => {
            const user = new User({
                name: 'Test User',
                email: 'comparetest@test.com',
                password: 'password123'
            });

            await user.save();

            const isMatch = await user.matchPassword('password123');
            expect(isMatch).toBe(true);

            const isNotMatch = await user.matchPassword('wrongpassword');
            expect(isNotMatch).toBe(false);
        });
    });

    describe('User Validation', () => {
        it('should require name field', async () => {
            const user = new User({
                email: 'test@test.com',
                password: 'password123'
            });

            let error;
            try {
                await user.save();
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.errors.name).toBeDefined();
        });

        it('should require email field', async () => {
            const user = new User({
                name: 'Test User',
                password: 'password123'
            });

            let error;
            try {
                await user.save();
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.errors.email).toBeDefined();
        });

        it('should default role to user', async () => {
            const user = new User({
                name: 'Test User',
                email: 'roletest@test.com',
                password: 'password123'
            });

            await user.save();
            expect(user.role).toBe('user');
        });
    });
});
