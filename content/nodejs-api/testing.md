# Testing

## Overview
Testing ensures your API works correctly and prevents regressions. This guide covers unit tests, integration tests, and testing best practices for Node.js/Express/Sequelize applications.

## Testing Setup

### Installation
```bash
npm install --save-dev jest supertest sequelize-test-helpers factory-girl faker cross-env
```

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'controllers/**/*.js',
    'models/**/*.js',
    'services/**/*.js',
    'middleware/**/*.js',
    'utils/**/*.js',
    '!**/node_modules/**'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage',
  verbose: true
};
```

### Test Setup
```javascript
// tests/setup.js
const { sequelize } = require('../models');

beforeAll(async () => {
  // Create test database tables
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Close database connection
  await sequelize.close();
});

beforeEach(async () => {
  // Clean up data before each test
  const models = Object.values(sequelize.models);
  for (const model of models) {
    await model.destroy({ where: {} });
  }
});
```

### Test Database Configuration
```javascript
// config/test.js
module.exports = {
  database: process.env.TEST_DB_NAME || 'test_db',
  username: process.env.TEST_DB_USER || 'root',
  password: process.env.TEST_DB_PASS || '',
  host: process.env.TEST_DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
```

## Unit Testing

### Model Tests
```javascript
// tests/models/user.test.js
const { User } = require('../../models');
const bcrypt = require('bcryptjs');

describe('User Model', () => {
  describe('Validations', () => {
    it('should validate email format', async () => {
      await expect(User.create({
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123'
      })).rejects.toThrow();
    });

    it('should require password', async () => {
      await expect(User.create({
        name: 'Test User',
        email: 'test@example.com'
      })).rejects.toThrow();
    });

    it('should enforce password length', async () => {
      await expect(User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: '123'
      })).rejects.toThrow();
    });
  });

  describe('Hooks', () => {
    it('should hash password before create', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      expect(user.password).not.toBe('password123');
      expect(await bcrypt.compare('password123', user.password)).toBe(true);
    });
  });

  describe('Instance Methods', () => {
    let user;

    beforeEach(async () => {
      user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('should check password correctly', async () => {
      expect(await user.checkPassword('password123')).toBe(true);
      expect(await user.checkPassword('wrongpassword')).toBe(false);
    });

    it('should generate JWT token', () => {
      const token = user.generateToken();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });
  });
});
```

### Service Tests
```javascript
// tests/services/userService.test.js
const userService = require('../../services/userService');
const { User } = require('../../models');

describe('UserService', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const user = await userService.createUser(userData);

      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password);
    });

    it('should throw error for duplicate email', async () => {
      await User.create({
        name: 'Existing User',
        email: 'john@example.com',
        password: 'password123'
      });

      await expect(userService.createUser({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      })).rejects.toThrow('User with this email already exists');
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const createdUser = await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });

      const user = await userService.getUserById(createdUser.id);

      expect(user.id).toBe(createdUser.id);
      expect(user.email).toBe(createdUser.email);
    });

    it('should throw error for non-existent user', async () => {
      await expect(userService.getUserById(999)).rejects.toThrow('User not found');
    });
  });
});
```

## Integration Testing

### API Integration Tests
```javascript
// tests/integration/auth.test.js
const request = require('supertest');
const app = require('../../app');
const { User } = require('../../models');

describe('Authentication API', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123'
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe('john@example.com');
      expect(response.body.data.token).toBeDefined();

      // Verify user was created in database
      const user = await User.findOne({ where: { email: 'john@example.com' } });
      expect(user).toBeTruthy();
      expect(user.name).toBe('John Doe');
    });

    it('should return validation errors for invalid data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: '',
          email: 'invalid-email',
          password: '123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.details).toBeDefined();
      expect(response.body.details.length).toBeGreaterThan(0);
    });

    it('should prevent duplicate email registration', async () => {
      // Create first user
      await User.create({
        name: 'Existing User',
        email: 'john@example.com',
        password: 'password123'
      });

      // Try to register with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password456'
        })
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
    });

    it('should login with correct credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe('john@example.com');
      expect(response.body.data.token).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid credentials');
    });
  });
});
```

### Protected Route Tests
```javascript
// tests/integration/users.test.js
const request = require('supertest');
const app = require('../../app');
const { User } = require('../../models');

describe('Users API', () => {
  let authToken;
  let testUser;

  beforeEach(async () => {
    await User.destroy({ where: {} });

    // Create and login test user
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    authToken = loginResponse.body.data.token;
  });

  describe('GET /api/users', () => {
    it('should return users list for authenticated user', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should require authentication', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Access token required');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user by id', async () => {
      const response = await request(app)
        .get(`/api/users/${testUser.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(testUser.id);
      expect(response.body.data.email).toBe(testUser.email);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('User not found');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update user', async () => {
      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com'
      };

      const response = await request(app)
        .put(`/api/users/${testUser.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.email).toBe(updateData.email);
    });

    it('should not allow updating other users', async () => {
      const otherUser = await User.create({
        name: 'Other User',
        email: 'other@example.com',
        password: 'password123'
      });

      const response = await request(app)
        .put(`/api/users/${otherUser.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Hacked Name' })
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Not authorized to update this user');
    });
  });
});
```

## Test Utilities

### Factory Pattern for Test Data
```javascript
// tests/factories/userFactory.js
const { factory } = require('factory-girl');
const { User } = require('../../models');

factory.define('User', User, {
  name: () => `User ${Math.random()}`,
  email: () => `user${Math.random()}@example.com`,
  password: 'password123',
  role: 'user',
  isActive: true
});

factory.define('Admin', User, {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'password123',
  role: 'admin',
  isActive: true
});

module.exports = factory;
```

### Test Helpers
```javascript
// tests/helpers/index.js
const factory = require('../factories/userFactory');
const { User } = require('../../models');

const createAuthenticatedUser = async (overrides = {}) => {
  const user = await factory.create('User', overrides);
  const loginResponse = await request(app)
    .post('/api/auth/login')
    .send({
      email: user.email,
      password: 'password123'
    });

  return {
    user,
    token: loginResponse.body.data.token
  };
};

const createAuthenticatedAdmin = async (overrides = {}) => {
  const user = await factory.create('Admin', overrides);
  const loginResponse = await request(app)
    .post('/api/auth/login')
    .send({
      email: user.email,
      password: 'password123'
    });

  return {
    user,
    token: loginResponse.body.data.token
  };
};

module.exports = {
  factory,
  createAuthenticatedUser,
  createAuthenticatedAdmin
};
```

## Database Testing

### Sequelize Test Helpers
```javascript
// tests/helpers/database.js
const { sequelize } = require('../../models');

const resetDatabase = async () => {
  // Drop all tables and recreate them
  await sequelize.drop();
  await sequelize.sync({ force: true });
};

const seedDatabase = async () => {
  const { factory } = require('./index');

  // Create test data
  await factory.createMany('User', 5);
  await factory.create('Admin');
};

const cleanupDatabase = async () => {
  const models = Object.values(sequelize.models);
  for (const model of models) {
    await model.destroy({ where: {} });
  }
};

module.exports = {
  resetDatabase,
  seedDatabase,
  cleanupDatabase
};
```

## Mocking

### Mocking External Services
```javascript
// tests/mocks/emailService.js
const mockSendEmail = jest.fn();

jest.mock('../../services/emailService', () => ({
  sendEmail: mockSendEmail
}));

module.exports = {
  mockSendEmail
};
```

### Mocking Database
```javascript
// tests/models/user.test.js
const { User } = require('../../models');

jest.mock('../../models', () => ({
  User: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

describe('User Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create user', async () => {
    const mockUser = { id: 1, name: 'Test', email: 'test@example.com' };
    User.create.mockResolvedValue(mockUser);

    const result = await User.create({
      name: 'Test',
      email: 'test@example.com',
      password: 'password123'
    });

    expect(User.create).toHaveBeenCalledWith({
      name: 'Test',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(result).toEqual(mockUser);
  });
});
```

## Test Scripts

### Package.json Scripts
```json
{
  "scripts": {
    "test": "cross-env NODE_ENV=test jest",
    "test:watch": "cross-env NODE_ENV=test jest --watch",
    "test:coverage": "cross-env NODE_ENV=test jest --coverage",
    "test:integration": "cross-env NODE_ENV=test jest --testPathPattern=integration",
    "test:unit": "cross-env NODE_ENV=test jest --testPathPattern=unit"
  }
}
```

## Continuous Integration

### GitHub Actions Test Workflow
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: test_db
        ports:
          - 3306:3306
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:coverage
        env:
          TEST_DB_HOST: 127.0.0.1
          TEST_DB_USER: root
          TEST_DB_PASS: root
          TEST_DB_NAME: test_db
          JWT_SECRET: test_jwt_secret
```

## Best Practices

1. **Test Structure**
   - Use descriptive test names
   - Follow AAA pattern (Arrange, Act, Assert)
   - Group related tests in describe blocks

2. **Test Data Management**
   - Clean up data between tests
   - Use factories for consistent test data
   - Avoid hard-coded IDs

3. **Mocking Strategy**
   - Mock external dependencies
   - Use real database for integration tests
   - Mock time-sensitive operations

4. **Coverage Goals**
   - Aim for >80% code coverage
   - Cover happy path and error cases
   - Test edge cases and boundary conditions

5. **Test Performance**
   - Keep unit tests fast
   - Use beforeAll/beforeEach appropriately
   - Parallelize independent tests

6. **CI/CD Integration**
   - Run tests on every push/PR
   - Use separate test database
   - Generate coverage reports

## Summary

A comprehensive testing strategy includes:
- Unit tests for models, services, and utilities
- Integration tests for API endpoints
- Authentication and authorization testing
- Database testing with proper cleanup
- Mocking for external dependencies
- Factory pattern for test data generation
- CI/CD pipeline with automated testing

Remember to:
- Write tests before or alongside code (TDD/BDD)
- Test both positive and negative scenarios
- Keep tests maintainable and readable
- Run tests frequently during development