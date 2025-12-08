const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/userModel');
const Incident = require('../models/incidentModel');

describe('Incident API Tests', () => {
    let authToken;
    let userId;
    let adminToken;

    beforeAll(async () => {
        // Connect to test database
        const testDbUri = process.env.MONGO_URI_TEST || process.env.MONGO_URI;
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(testDbUri);
        }

        // Create a test user and get token
        const testUser = {
            name: 'Incident Test User',
            email: `incidenttest${Date.now()}@test.com`,
            password: 'password123'
        };

        const response = await request(app)
            .post('/api/users/register')
            .send(testUser);

        authToken = response.body.token;
        userId = response.body._id;

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin User',
            email: `admin${Date.now()}@test.com`,
            password: 'password123',
            role: 'admin'
        });

        const jwt = require('jsonwebtoken');
        adminToken = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    });

    afterAll(async () => {
        // Clean up
        await Incident.deleteMany({});
        await User.deleteMany({ email: /.*test\.com/ });
        await mongoose.connection.close();
    });

    describe('POST /api/incidents', () => {
        it('should create a new incident report', async () => {
            const newIncident = {
                incidentType: 'phishing',
                description: 'Received suspicious email asking for credentials'
            };

            const response = await request(app)
                .post('/api/incidents')
                .set('Authorization', `Bearer ${authToken}`)
                .send(newIncident)
                .expect(201);

            expect(response.body).toHaveProperty('_id');
            expect(response.body.incidentType).toBe(newIncident.incidentType);
            expect(response.body.description).toBe(newIncident.description);
            expect(response.body.status).toBe('open');
        });

        it('should fail to create incident without authentication', async () => {
            const newIncident = {
                incidentType: 'malware',
                description: 'Detected malware on system'
            };

            await request(app)
                .post('/api/incidents')
                .send(newIncident)
                .expect(401);
        });

        it('should fail to create incident without required fields', async () => {
            const response = await request(app)
                .post('/api/incidents')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ incidentType: 'phishing' })
                .expect(400);

            expect(response.body).toHaveProperty('errors');
        });
    });

    describe('GET /api/incidents', () => {
        beforeAll(async () => {
            // Create some test incidents
            await Incident.create({
                user: userId,
                incidentType: 'phishing',
                description: 'Test incident 1'
            });
            await Incident.create({
                user: userId,
                incidentType: 'malware',
                description: 'Test incident 2'
            });
        });

        it('should get user\'s own incidents', async () => {
            const response = await request(app)
                .get('/api/incidents')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should fail to get incidents without authentication', async () => {
            await request(app)
                .get('/api/incidents')
                .expect(401);
        });
    });

    describe('GET /api/incidents/public', () => {
        it('should get all public incidents without authentication', async () => {
            const response = await request(app)
                .get('/api/incidents/public')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('PUT /api/incidents/:id/status', () => {
        let incidentId;

        beforeAll(async () => {
            const incident = await Incident.create({
                user: userId,
                incidentType: 'data-breach',
                description: 'Test incident for status update'
            });
            incidentId = incident._id;
        });

        it('should allow admin to update incident status', async () => {
            const response = await request(app)
                .put(`/api/incidents/${incidentId}/status`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ status: 'in-progress' })
                .expect(200);

            expect(response.body.status).toBe('in-progress');
        });

        it('should fail for non-admin users', async () => {
            await request(app)
                .put(`/api/incidents/${incidentId}/status`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ status: 'resolved' })
                .expect(403);
        });
    });

    describe('DELETE /api/incidents/:id', () => {
        let incidentId;

        beforeEach(async () => {
            const incident = await Incident.create({
                user: userId,
                incidentType: 'other',
                description: 'Test incident for deletion'
            });
            incidentId = incident._id;
        });

        it('should allow user to delete their own incident', async () => {
            await request(app)
                .delete(`/api/incidents/${incidentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const deletedIncident = await Incident.findById(incidentId);
            expect(deletedIncident).toBeNull();
        });

        it('should allow admin to delete any incident', async () => {
            await request(app)
                .delete(`/api/incidents/${incidentId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);
        });
    });
});
