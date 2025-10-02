# API Routes

## Overview
Routes define the endpoints of your API and connect HTTP requests to controller functions. Express routes handle different HTTP methods (GET, POST, PUT, DELETE) and can include middleware for authentication, validation, and error handling.

## Basic Route Structure

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

// GET /api/users - Get all users
router.get('/', authenticateToken, userController.getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', authenticateToken, userController.getUserById);

// POST /api/users - Create new user
router.post('/', userController.createUser);

// PUT /api/users/:id - Update user
router.put('/:id', authenticateToken, userController.updateUser);

// DELETE /api/users/:id - Delete user
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
```

## Route Organization

### Modular Routes
Organize routes by feature or resource:

```
routes/
├── auth.js          // Authentication routes
├── users.js         // User management
├── posts.js         // Blog posts
├── comments.js      // Comments
└── index.js         // Main router
```

### Main Router Setup

```javascript
// routes/index.js
const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const userRoutes = require('./users');
const postRoutes = require('./posts');
const commentRoutes = require('./comments');

// Mount routes with prefixes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
```

## Route Parameters

### Path Parameters
```javascript
// GET /api/users/:id/posts/:postId
router.get('/users/:id/posts/:postId', (req, res) => {
  const { id, postId } = req.params;
  // Handle request
});
```

### Query Parameters
```javascript
// GET /api/posts?page=1&limit=10&sort=createdAt
router.get('/posts', (req, res) => {
  const { page = 1, limit = 10, sort = 'createdAt' } = req.query;
  // Handle pagination and sorting
});
```

## Request Body Handling

### JSON Body
```javascript
// POST /api/users
router.post('/users', express.json(), (req, res) => {
  const userData = req.body;
  // Validate and save user
});
```

### Form Data
```javascript
// POST /api/upload
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  // Handle file upload
});
```

## Route Middleware

### Authentication Middleware
```javascript
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
```

### Validation Middleware
```javascript
const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password too short' });
  }
  
  next();
};
```

## Error Handling

### Async Route Handlers
```javascript
// Wrap async routes to catch errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/users', asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.json(users);
}));
```

### Global Error Handler
```javascript
// In main app.js
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

## Best Practices

1. **Use HTTP status codes correctly**
   - 200: Success
   - 201: Created
   - 400: Bad Request
   - 401: Unauthorized
   - 403: Forbidden
   - 404: Not Found
   - 500: Internal Server Error

2. **Consistent response format**
   ```javascript
   // Success response
   res.json({
     success: true,
     data: result,
     message: 'Operation successful'
   });

   // Error response
   res.status(400).json({
     success: false,
     error: 'Validation failed',
     details: errors
   });
   ```

3. **Input validation**
   - Validate all inputs
   - Sanitize data
   - Use libraries like Joi or express-validator

4. **Rate limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

5. **CORS handling**
   ```javascript
   const cors = require('cors');
   app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true
   }));
   ```