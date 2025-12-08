# CyberSafe Platform - Testing Guide

## Overview

This project includes comprehensive unit tests for both backend and frontend.

## Backend Tests (Jest + Supertest)

### Test Files:

- `server/tests/auth.test.js` - Authentication API tests
- `server/tests/incident.test.js` - Incident management API tests
- `server/tests/models.test.js` - Database model tests

### Running Backend Tests:

```bash
cd server

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage:

- ✅ User registration and validation
- ✅ User login and authentication
- ✅ JWT token generation
- ✅ Incident creation and validation
- ✅ Incident retrieval (user-specific and public)
- ✅ Incident status updates (admin only)
- ✅ Incident deletion (owner and admin)
- ✅ Password hashing and comparison
- ✅ Model validation

## Frontend Tests (Vitest + React Testing Library)

### Test Files:

- `client/src/tests/Hero.test.jsx` - Hero component tests
- `client/src/tests/ThemeToggle.test.jsx` - Theme toggle tests

### Running Frontend Tests:

```bash
cd client

# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Coverage:

- ✅ Component rendering
- ✅ Props handling
- ✅ User interactions
- ✅ Theme toggle functionality
- ✅ LocalStorage integration

## Test Configuration

### Backend (Jest):

Configuration file: `server/jest.config.js`

- Test environment: Node.js
- Test pattern: `**/tests/**/*.test.js`
- Timeout: 10 seconds

### Frontend (Vitest):

Configuration file: `client/vite.config.js`

- Test environment: jsdom (browser simulation)
- Setup file: `client/src/tests/setup.js`

## Writing New Tests

### Backend Test Example:

```javascript
describe("Feature Tests", () => {
  it("should do something", async () => {
    const response = await request(app)
      .post("/api/endpoint")
      .send({ data: "value" })
      .expect(200);

    expect(response.body).toHaveProperty("field");
  });
});
```

### Frontend Test Example:

```javascript
import { render, screen } from "@testing-library/react";

describe("Component Tests", () => {
  it("renders correctly", () => {
    render(<Component prop="value" />);
    expect(screen.getByText("value")).toBeInTheDocument();
  });
});
```

## CI/CD Integration

Tests can be integrated into your deployment pipeline:

```yaml
# Example GitHub Actions workflow
- name: Run Backend Tests
  run: |
    cd server
    npm install
    npm test

- name: Run Frontend Tests
  run: |
    cd client
    npm install
    npm test
```

## Test Database

Backend tests use the same MongoDB connection as development.
For production, set up a separate test database:

```env
MONGO_URI_TEST=mongodb+srv://...test-database...
```

## Troubleshooting

### Backend Tests Failing:

- Ensure MongoDB is accessible
- Check environment variables are set
- Verify all dependencies are installed

### Frontend Tests Failing:

- Clear node_modules and reinstall
- Check for missing peer dependencies
- Verify jsdom is installed

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Always clean up test data
3. **Mocking**: Mock external services
4. **Coverage**: Aim for >80% code coverage
5. **Speed**: Keep tests fast (<10s total)

## Next Steps

- Add integration tests
- Add E2E tests with Playwright/Cypress
- Set up continuous integration
- Add performance tests
- Implement test coverage badges
