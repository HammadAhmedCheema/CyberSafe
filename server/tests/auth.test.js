const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/userModel');

describe('Auth API Tests', () => {
    beforeAll(async () => {
        // Connect to test database
        const testDbUri = process.env.MONGO_URI_TEST || process.env.MONGO_URI;
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(testDbUri);
        }
    });

    afterAll(async () => {
        // Clean up and close connection
        await User.deleteMany({ email: /test.*@test\.com/ });
        await mongoose.connection.close();
    });

    describe('POST /api/users/register', () => {
        it('should register a new user successfully', async () => {
            const newUser = {
                name: 'Test User',
                email: `test${Date.now()}@test.com`,
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/users/register')
                .send(newUser)
                .expect(201);

            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('_id');
            expect(response.body.email).toBe(newUser.email);
            expect(response.body.name).toBe(newUser.name);
            expect(response.body.role).toBe('user');
        });

        it('should fail to register with existing email', async () => {
            const existingUser = {
                name: 'Existing User',
                email: `existing${Date.now()}@test.com`,
                password: 'password123'
            };

            // Register first time
            await request(app)
                .post('/api/users/register')
                .send(existingUser);

            // Try to register again with same email
            const response = await request(app)
                .post('/api/users/register')
                .send(existingUser)
                .expect(400);

            expect(response.body).toHaveProperty('message');
        });

        it('should fail to register without required fields', async () => {
            const response = await request(app)
                .post('/api/users/register')
                .send({ email: 'test@test.com' })
                .expect(400);

            expect(response.body).toHaveProperty('errors');
        });
    });

    describe('POST /api/users/login', () => {
        const testUser = {
            name: 'Login Test User',
            email: `logintest${Date.now()}@test.com`,
            password: 'password123'
        };

        beforeAll(async () => {
            // Create a user for login tests
            await request(app)
                .post('/api/users/register')
                .send(testUser);
        });

        it('should login successfully with correct credentials', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                })
                .expect(200);

            expect(response.body).toHaveProperty('token');
            expect(response.body.email).toBe(testUser.email);
        });

        it('should fail to login with incorrect password', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({
                    email: testUser.email,
                    password: 'wrongpassword'
                })
                .expect(401);

            expect(response.body).toHaveProperty('message');
        });

        it('should fail to login with non-existent email', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({
                    email: 'nonexistent@test.com',
                    password: 'password123'
                })
                .expect(401);

            expect(response.body).toHaveProperty('message');
        });
    });
});
