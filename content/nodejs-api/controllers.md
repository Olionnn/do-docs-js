# Controllers

## Overview
Controllers contain the business logic of your API. They handle requests from routes, interact with models, and return responses. Controllers should be thin and focused on request/response handling, while delegating complex logic to services or utilities.

## Controller Structure

### Basic Controller Pattern

```javascript
// controllers/userController.js
const User = require('../models/User');
const { validationResult } = require('express-validator');

class UserController {
  // GET /api/users
  async getAllUsers(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const { count, rows: users } = await User.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: users,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(count / limit)
        }
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch users'
      });
    }
  }

  // GET /api/users/:id
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user'
      });
    }
  }

  // POST /api/users
  async createUser(req, res) {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: 'User with this email already exists'
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword
      });

      // Remove password from response
      const userResponse = { ...user.toJSON() };
      delete userResponse.password;

      res.status(201).json({
        success: true,
        data: userResponse,
        message: 'User created successfully'
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create user'
      });
    }
  }

  // PUT /api/users/:id
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      // Check if user can update (ownership or admin check)
      if (user.id !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to update this user'
        });
      }

      await user.update({ name, email });

      res.json({
        success: true,
        data: user,
        message: 'User updated successfully'
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update user'
      });
    }
  }

  // DELETE /api/users/:id
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      // Check permissions
      if (user.id !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to delete this user'
        });
      }

      await user.destroy();

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete user'
      });
    }
  }
}

module.exports = new UserController();
```

## Controller Organization

### Class-based Controllers
```javascript
// controllers/baseController.js
class BaseController {
  handleSuccess(res, data, message = 'Success', statusCode = 200) {
    res.status(statusCode).json({
      success: true,
      data,
      message
    });
  }

  handleError(res, error, message = 'An error occurred', statusCode = 500) {
    console.error(error);
    res.status(statusCode).json({
      success: false,
      error: message
    });
  }
}

module.exports = BaseController;
```

### Function-based Controllers
```javascript
// controllers/postController.js
const Post = require('../models/Post');

// Function-based approach
const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: require('../models/User'), as: 'author' }]
    });
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch posts' });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({
      title,
      content,
      userId: req.user.id
    });
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create post' });
  }
};

module.exports = {
  getPosts,
  createPost
};
```

## Input Validation

### Using express-validator
```javascript
// middleware/validation.js
const { body } = require('express-validator');

const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const validatePostCreation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title is required and must be less than 200 characters'),
  
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required')
];

module.exports = {
  validateUserRegistration,
  validatePostCreation
};
```

## Error Handling

### Custom Error Classes
```javascript
// utils/errors.js
class ValidationError extends Error {
  constructor(message, details = []) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
    this.details = details;
  }
}

class NotFoundError extends Error {
  constructor(resource = 'Resource') {
    super(`${resource} not found`);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  UnauthorizedError
};
```

### Error Handling Middleware
```javascript
// middleware/errorHandler.js
const { ValidationError, NotFoundError, UnauthorizedError } = require('../utils/errors');

const errorHandler = (error, req, res, next) => {
  console.error(error);

  // Sequelize validation errors
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: error.errors.map(err => ({
        field: err.path,
        message: err.message
      }))
    });
  }

  // Custom errors
  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message,
      details: error.details
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message
    });
  }

  if (error instanceof UnauthorizedError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};

module.exports = errorHandler;
```

## Service Layer Pattern

### Service Classes
```javascript
// services/userService.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { ValidationError } = require('../utils/errors');

class UserService {
  async createUser(userData) {
    const { name, email, password } = userData;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ValidationError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return user;
  }

  async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError('User');
    }
    return user;
  }

  async updateUser(id, updateData) {
    const user = await this.getUserById(id);
    await user.update(updateData);
    return user;
  }

  async deleteUser(id) {
    const user = await this.getUserById(id);
    await user.destroy();
    return true;
  }
}

module.exports = new UserService();
```

### Using Services in Controllers
```javascript
// controllers/userController.js
const userService = require('../services/userService');

class UserController {
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      const userResponse = { ...user.toJSON() };
      delete userResponse.password;
      
      res.status(201).json({
        success: true,
        data: userResponse
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(error.statusCode).json({
          success: false,
          error: error.message,
          details: error.details
        });
      }
      res.status(500).json({
        success: false,
        error: 'Failed to create user'
      });
    }
  }
}
```

## Best Practices

1. **Keep controllers thin**
   - Handle HTTP concerns (req/res)
   - Delegate business logic to services
   - Return consistent response formats

2. **Use async/await**
   - Avoid callback hell
   - Proper error propagation
   - Better readability

3. **Validate inputs**
   - Server-side validation is mandatory
   - Use validation libraries
   - Return detailed error messages

4. **Handle errors gracefully**
   - Use custom error classes
   - Centralized error handling
   - Don't expose sensitive information

5. **Implement proper authentication/authorization**
   - Check user permissions
   - Use middleware for auth checks
   - Secure sensitive operations

6. **Use consistent response format**
   - Always return JSON
   - Include success/error flags
   - Provide meaningful messages

7. **Implement pagination for list endpoints**
   - Use limit/offset or cursor-based pagination
   - Include pagination metadata
   - Set reasonable default limits