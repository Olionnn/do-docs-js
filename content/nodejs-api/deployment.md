# Deployment & Production

## Overview
Deploying a Node.js/Express/Sequelize application requires careful configuration for security, performance, and reliability. This guide covers production deployment strategies and best practices.

## Environment Configuration

### Environment Variables
```javascript
// config/production.js
module.exports = {
  database: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 20,
      min: 5,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET
  },
  server: {
    port: process.env.PORT || 3000,
    env: 'production'
  },
  cors: {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [],
    credentials: true
  },
  email: {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};
```

### Production Environment File
```bash
# .env.production
NODE_ENV=production
PORT=3000

# Database
DB_HOST=your-db-host
DB_PORT=3306
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_secure_password

# JWT
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-token-secret

# CORS
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASS=your-email-password

# Redis (optional)
REDIS_URL=redis://your-redis-url

# Monitoring
SENTRY_DSN=your-sentry-dsn
```

## Process Management

### PM2 Configuration
```json
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'api-server',
    script: 'app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    restart_delay: 4000,
    autorestart: true,
    watch: false
  }]
};
```

### PM2 Commands
```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start ecosystem.config.js --env production

# Check status
pm2 status

# View logs
pm2 logs api-server

# Restart application
pm2 restart api-server

# Stop application
pm2 stop api-server

# Save PM2 configuration
pm2 save

# Generate startup script
pm2 startup
```

## Docker Deployment

### Dockerfile
```dockerfile
# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_PORT=3306
      - DB_NAME=api_db
      - DB_USER=api_user
      - DB_PASSWORD=secure_password
    depends_on:
      - db
    networks:
      - app-network
    restart: unless-stopped

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root_password
      - MYSQL_DATABASE=api_db
      - MYSQL_USER=api_user
      - MYSQL_PASSWORD=secure_password
    volumes:
      - db_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - app-network
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    networks:
      - app-network
    restart: unless-stopped

volumes:
  db_data:

networks:
  app-network:
    driver: bridge
```

### Multi-stage Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/seeders ./seeders

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
```

## Database Migration

### Production Database Setup
```javascript
// scripts/setup-production-db.js
const { sequelize } = require('../models');
const fs = require('fs');
const path = require('path');

async function setupProductionDatabase() {
  try {
    console.log('Setting up production database...');

    // Test connection
    await sequelize.authenticate();
    console.log('Database connection established.');

    // Run migrations
    console.log('Running migrations...');
    await sequelize.sync({ alter: true });
    console.log('Migrations completed.');

    // Run seeders if needed
    if (process.env.RUN_SEEDERS === 'true') {
      console.log('Running seeders...');
      // Add seeder logic here
      console.log('Seeders completed.');
    }

    console.log('Production database setup completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up production database:', error);
    process.exit(1);
  }
}

setupProductionDatabase();
```

### Migration Scripts
```javascript
// scripts/migrate.js
const { sequelize } = require('../models');
const Umzug = require('umzug');

const umzug = new Umzug({
  migrations: {
    path: path.join(__dirname, '../migrations'),
    params: [sequelize.getQueryInterface(), sequelize.constructor]
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize
  }
});

async function migrate() {
  try {
    await umzug.up();
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  migrate();
}

module.exports = { migrate, umzug };
```

## Security Hardening

### Security Middleware
```javascript
// middleware/security.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const securityMiddleware = (app) => {
  // Set security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api/', limiter);

  // Stricter rate limiting for auth routes
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many authentication attempts, please try again later.',
  });
  app.use('/api/auth/', authLimiter);

  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());

  // Data sanitization against XSS
  app.use(xss());

  // Prevent parameter pollution
  app.use(hpp({
    whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
  }));
};

module.exports = securityMiddleware;
```

### Input Validation
```javascript
// middleware/validation.js
const { body, param, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

const sanitizeInput = [
  body('*').trim().escape(),
  param('*').trim().escape(),
  query('*').trim().escape()
];

module.exports = {
  handleValidationErrors,
  sanitizeInput
};
```

## Monitoring & Logging

### Winston Logger
```javascript
// utils/logger.js
const winston = require('winston');
const path = require('path');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error'
    }),
    // Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/combined.log')
    })
  ]
});

// If we're not in production then log to the console with a simple format
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

module.exports = logger;
```

### Error Monitoring with Sentry
```javascript
// utils/sentry.js
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const initSentry = (app) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app })
    ],
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
};

const captureException = (error, context = {}) => {
  Sentry.withScope((scope) => {
    scope.setContext('additional_info', context);
    Sentry.captureException(error);
  });
};

module.exports = {
  initSentry,
  captureException
};
```

### Health Check Endpoint
```javascript
// routes/health.js
const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');

router.get('/health', async (req, res) => {
  try {
    // Check database connection
    await sequelize.authenticate();

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Database connection failed'
    });
  }
});

router.get('/ready', async (req, res) => {
  // Readiness check - verify all dependencies are ready
  try {
    await sequelize.authenticate();
    // Add other dependency checks here (Redis, external APIs, etc.)

    res.status(200).json({
      status: 'ready',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'not ready',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

module.exports = router;
```

## Performance Optimization

### Compression
```javascript
// middleware/compression.js
const compression = require('compression');

const compressionMiddleware = compression({
  level: 6, // compression level
  threshold: 1024, // only compress responses > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
});

module.exports = compressionMiddleware;
```

### Caching with Redis
```javascript
// utils/cache.js
const redis = require('redis');

class Cache {
  constructor() {
    this.client = redis.createClient({
      url: process.env.REDIS_URL
    });

    this.client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    this.client.connect();
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key, value, expireInSeconds = 3600) {
    try {
      await this.client.setEx(key, expireInSeconds, JSON.stringify(value));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Cache del error:', error);
    }
  }

  async clear(pattern = '*') {
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
}

module.exports = new Cache();
```

### Database Optimization
```javascript
// models/index.js - Add connection pooling and optimization
const sequelize = new Sequelize({
  // ... other config
  pool: {
    max: 20,
    min: 5,
    acquire: 30000,
    idle: 10000
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    paranoid: true, // soft deletes
    underscored: true, // snake_case column names
    freezeTableName: true // prevent sequelize from pluralizing table names
  },
  dialectOptions: {
    charset: 'utf8mb4',
    supportBigNumbers: true,
    bigNumberStrings: true
  }
});
```

## Deployment Platforms

### Heroku Deployment
```javascript
// Procfile
web: npm start

// package.json scripts
"scripts": {
  "start": "node app.js",
  "heroku-postbuild": "npm run build"
}
```

### AWS EC2 with Nginx
```nginx
# /etc/nginx/sites-available/api.yourdomain.com
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

### SSL with Let's Encrypt
```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d api.yourdomain.com

# Auto-renewal (add to crontab)
0 12 * * * /usr/bin/certbot renew --quiet
```

## Backup & Recovery

### Database Backup Script
```javascript
// scripts/backup.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const backupDatabase = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `backup-${timestamp}.sql`;
  const filepath = path.join(__dirname, '../backups', filename);

  const command = `mysqldump -h ${process.env.DB_HOST} -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} > ${filepath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Backup failed:', error);
      return;
    }

    console.log(`Database backup created: ${filename}`);

    // Upload to cloud storage (AWS S3, Google Cloud, etc.)
    // Add your cloud upload logic here
  });
};

// Schedule daily backups
const scheduleBackup = () => {
  const cron = require('node-cron');
  cron.schedule('0 2 * * *', () => {
    console.log('Running scheduled database backup...');
    backupDatabase();
  });
};

module.exports = { backupDatabase, scheduleBackup };
```

## CI/CD Pipeline

### GitHub Actions Deployment
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_KEY }}
          script: |
            cd /path/to/your/app
            git pull origin main
            npm ci
            npm run build
            pm2 restart ecosystem.config.js
```

## Summary

Production deployment involves:
- Environment-specific configuration
- Process management with PM2
- Containerization with Docker
- Security hardening and monitoring
- Performance optimization
- Backup and recovery strategies
- CI/CD automation

Key considerations:
- Use environment variables for sensitive data
- Implement proper logging and monitoring
- Set up automated backups
- Use HTTPS in production
- Monitor performance and errors
- Plan for scalability
- Implement proper security measures
- Test deployment process thoroughly