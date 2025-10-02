# Tutorial Membuat Prompt yang Efektif untuk AI Coding Assistants

## 📋 Daftar Isi
- [Prinsip Dasar Prompt Engineering](#prinsip-dasar-prompt-engineering)
- [Struktur Prompt yang Efektif](#struktur-prompt-yang-efektif)
- [Contoh Prompt untuk Berbagai Skenario](#contoh-prompt-untuk-berbagai-skenario)
- [Tips dan Best Practices](#tips-dan-best-practices)
- [Troubleshooting](#troubleshooting)

## 🧠 Prinsip Dasar Prompt Engineering

### 1. Memahami Cara Kerja AI

AI coding assistants seperti GitHub Copilot, Codex, atau Aksing bekerja dengan:
- **Pattern Recognition**: Mengenali pola dari jutaan kode
- **Context Understanding**: Memahami konteks kode sekitarnya
- **Natural Language Processing**: Memproses instruksi bahasa natural
- **Code Generation**: Menghasilkan kode berdasarkan pola yang dipelajari

### 2. Kualitas Input = Kualitas Output

Prompt yang baik harus:
- **Spesifik**: Jelas dan detail
- **Kontekstual**: Berikan background yang cukup
- **Struktur**: Terorganisir dengan baik
- **Actionable**: Memberikan instruksi yang bisa ditindaklanjuti

## 📝 Struktur Prompt yang Efektif

### Template Dasar Prompt

```
[TASK TYPE] [WHAT] [FOR] [CONTEXT]

Deskripsi detail:
- Requirement 1
- Requirement 2
- Technical constraints

Contoh input/output:
Input: [example input]
Expected: [expected output]

Additional context:
- Tech stack: [technologies]
- Code style: [conventions]
- Edge cases: [special considerations]
```

### 1. Task Type Classification

#### Code Generation
```
"Buat function untuk [tujuan] yang [deskripsi fungsi]"
"Implementasi class [nama] dengan method [methods]"
"Generate API endpoint untuk [resource]"
```

#### Code Modification
```
"Refactor function ini untuk [improvement]"
"Optimize kode berikut untuk [goal]"
"Convert [from tech] ke [to tech]"
```

#### Debugging
```
"Debug error ini: [error message]"
"Fix bug di [function/file]: [description]"
"Resolve issue dengan [problem]"
```

#### Documentation
```
"Buat dokumentasi untuk [code/feature]"
"Generate README untuk [project]"
"Tulis komentar untuk [function]"
```

### 2. Context Building

#### Tech Stack Context
```javascript
// React + TypeScript + Redux
// Node.js + Express + MongoDB
// Vue.js + Composition API + Pinia
```

#### Code Style Context
```javascript
// ESLint + Prettier
// Airbnb style guide
// Custom conventions: camelCase, PascalCase, kebab-case
```

#### Project Structure Context
```
src/
  components/
  hooks/
  utils/
  types/
```

## 💡 Contoh Prompt untuk Berbagai Skenario

### 1. Function Implementation

#### Prompt yang Buruk ❌
```
Buat function login
```

#### Prompt yang Baik ✅
```
Buat function authentication untuk React app dengan TypeScript yang:

1. Menerima parameter: email (string), password (string)
2. Validasi input: email format valid, password min 8 karakter
3. Return: Promise<{success: boolean, user?: User, error?: string}>
4. Handle error untuk: invalid credentials, network error, server error
5. Gunakan async/await pattern
6. Include proper TypeScript types

Context:
- Tech stack: React 18, TypeScript 4.9
- State management: Redux Toolkit
- API: RESTful dengan JWT authentication
```

### 2. Component Creation

#### Prompt yang Buruk ❌
```
Buat component button
```

#### Prompt yang Baik ✅
```
Implementasi reusable Button component untuk design system dengan:

Requirements:
- Variants: primary, secondary, danger, ghost
- Sizes: small, medium, large
- States: default, hover, active, disabled, loading
- Icon support: left/right icon dengan Lucide icons
- Accessibility: proper ARIA labels, keyboard navigation

Technical specs:
- Framework: React 18 dengan TypeScript
- Styling: Tailwind CSS dengan custom design tokens
- Props interface: extensible dengan generic types
- Event handling: onClick, onFocus, onBlur

Example usage:
<Button variant="primary" size="medium" leftIcon="Plus">
  Add Item
</Button>
```

### 3. API Integration

#### Prompt yang Buruk ❌
```
Buat API call untuk get users
```

#### Prompt yang Baik ✅
```
Implementasi custom hook useUsers untuk fetching user data dengan:

Features:
- GET /api/users dengan pagination
- POST /api/users untuk create user
- PUT /api/users/:id untuk update
- DELETE /api/users/:id untuk delete
- Real-time updates dengan React Query
- Optimistic updates untuk better UX
- Error handling dengan toast notifications

Technical requirements:
- TypeScript dengan proper type definitions
- React Query v4 untuk state management
- Axios untuk HTTP requests
- JWT authentication headers
- Request/response interceptors
- Retry logic untuk failed requests

Data structure:
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  createdAt: Date;
  updatedAt: Date;
}
```

### 4. Error Handling

#### Prompt yang Buruk ❌
```
Handle error
```

#### Prompt yang Baik ✅
```
Implementasi comprehensive error boundary untuk React application yang:

Handles:
- JavaScript runtime errors
- Network errors (API failures)
- Authentication errors (token expiry)
- Validation errors (form submissions)
- Unexpected state errors

Features:
- Fallback UI dengan error details
- Error logging ke external service
- Recovery options (retry, reset, redirect)
- User-friendly error messages
- Development vs production modes

Technical implementation:
- React Error Boundary class component
- Integration dengan error tracking (Sentry)
- Context API untuk global error state
- Custom hooks untuk error handling
- TypeScript types untuk error objects

Error reporting should include:
- Error message and stack trace
- User context (ID, session)
- Browser info and URL
- Timestamp and severity level
```

### 5. Testing Implementation

#### Prompt yang Buruk ❌
```
Buat test
```

#### Prompt yang Baik ✅
```
Tulis comprehensive test suite untuk UserService class menggunakan Jest dan React Testing Library:

Test coverage:
- Unit tests untuk semua public methods
- Integration tests untuk API calls
- Error handling scenarios
- Edge cases dan boundary conditions
- Mock external dependencies

Test structure:
- Describe blocks untuk logical grouping
- AAA pattern (Arrange, Act, Assert)
- Meaningful test names dan descriptions
- Proper setup/teardown

Mock requirements:
- API calls dengan MSW (Mock Service Worker)
- Database operations
- External services (email, notifications)

Test data:
- Valid user objects
- Invalid inputs
- Edge cases (empty strings, null values)
- Large datasets untuk performance testing

Coverage goals:
- Statement coverage: >90%
- Branch coverage: >85%
- Function coverage: >95%
```

### 6. Database Schema

#### Prompt yang Buruk ❌
```
Buat database schema
```

#### Prompt yang Baik ✅
```
Design database schema untuk e-commerce platform dengan PostgreSQL yang mendukung:

Entities & Relationships:
- Users (customers, admins, sellers)
- Products (variants, categories, inventory)
- Orders (line items, payments, shipping)
- Reviews & ratings
- Shopping cart persistence

Requirements:
- Normalized schema (3NF)
- Proper indexing untuk performance
- Foreign key constraints
- Audit trails (created_at, updated_at, created_by)
- Soft deletes untuk data integrity
- JSON fields untuk flexible attributes

Performance considerations:
- Query optimization untuk product search
- Efficient order history retrieval
- Real-time inventory updates
- Analytics queries untuk reporting

Security:
- Row Level Security (RLS)
- Sensitive data encryption
- Audit logging untuk critical operations

Migration strategy:
- Incremental migrations
- Backward compatibility
- Rollback procedures
- Data seeding scripts
```

## 🎯 Tips dan Best Practices

### 1. Specificity is Key

#### ❌ Too Vague
```
Buat dashboard
```

#### ✅ Specific
```
Buat admin dashboard untuk e-commerce dengan:
- Revenue charts (monthly/yearly)
- Order statistics (pending, completed, cancelled)
- Top products by sales
- Customer demographics
- Real-time notifications
Tech: React + Chart.js + WebSocket
```

### 2. Provide Context

#### Include Tech Stack
```
Framework: Next.js 13 with App Router
Styling: Tailwind CSS
State: Zustand
Database: Prisma + PostgreSQL
```

#### Code Style Preferences
```
- Functional components with hooks
- Custom hooks for reusable logic
- TypeScript strict mode
- ESLint + Prettier configuration
```

### 3. Break Down Complex Tasks

#### ❌ Monolithic Prompt
```
Buat full-stack app
```

#### ✅ Modular Approach
```
Phase 1: Database schema dan API endpoints
Phase 2: Authentication system
Phase 3: Core features (CRUD operations)
Phase 4: UI components dan styling
Phase 5: Testing dan deployment
```

### 4. Use Examples

#### Input/Output Examples
```
Input: {name: "John", age: 25}
Expected output: {id: 1, name: "John", age: 25, createdAt: "2024-01-01"}

Input: {name: "", age: -5}
Expected output: {errors: ["Name is required", "Age must be positive"]}
```

### 5. Specify Constraints

#### Performance Requirements
```
- Response time < 200ms
- Memory usage < 100MB
- Bundle size < 500KB
```

#### Compatibility Requirements
```
- Browser support: Chrome 90+, Firefox 88+, Safari 14+
- Node.js version: 18+
- Mobile responsive
```

### 6. Error Handling Instructions

#### Specify Error Behavior
```
Throw custom errors dengan descriptive messages:
- ValidationError untuk input validation
- AuthenticationError untuk auth failures
- DatabaseError untuk DB operations
- NetworkError untuk API calls
```

### 7. Documentation Requirements

#### Code Comments
```
- JSDoc untuk public APIs
- Inline comments untuk complex logic
- README dengan setup instructions
- API documentation dengan examples
```

## 🔧 Troubleshooting Prompt Issues

### 1. AI Gives Wrong Output

#### Problem: Too vague
```
❌ "Buat function"
✅ "Buat pure function yang menerima array numbers dan return average"
```

#### Problem: Missing context
```
❌ "Buat API"
✅ "Buat REST API dengan Express.js untuk user management"
```

#### Problem: Conflicting requirements
```
❌ "Buat fast and cheap solution"
✅ "Buat solution dengan budget $5000 dan deadline 2 minggu"
```

### 2. AI Generates Incomplete Code

#### Add implementation details
```
Include:
- Function signatures
- Return types
- Error handling
- Edge cases
- Dependencies needed
```

#### Specify file structure
```
Create files:
- src/utils/validation.js
- src/components/Form.jsx
- tests/validation.test.js
```

### 3. AI Doesn't Understand Domain

#### Provide domain context
```
"This is for healthcare app - HIPAA compliant"
"This is financial app - PCI DSS compliant"
"This is gaming app - real-time multiplayer"
```

#### Use domain-specific terms
```
- "CRUD operations" instead of "database stuff"
- "Middleware" instead of "middle functions"
- "State management" instead of "data handling"
```

### 4. AI Generates Outdated Code

#### Specify versions
```
- React 18 (not 17)
- Node.js 18 LTS
- TypeScript 5.0
```

#### Mention current best practices
```
- Modern React with hooks
- ES2022 features
- Functional programming patterns
```

### 5. AI Ignores Constraints

#### Be explicit about priorities
```
"MUST use TypeScript - no JavaScript"
"REQUIRED: Responsive design"
"CRITICAL: Security best practices"
```

#### Use strong language
```
"Absolutely cannot use deprecated APIs"
"Must follow RESTful conventions exactly"
"Security is top priority over performance"
```

## 🚀 Advanced Prompt Techniques

### 1. Chain of Thought Prompting

```
Analisis requirement ini step by step:

1. User needs to authenticate
2. Authentication requires email/password
3. Need to validate inputs
4. Need to call API
5. Need to handle success/error states
6. Need to store auth token

Sekarang implementasi:
- Buat validation function
- Buat API service
- Buat React component
- Buat custom hook
- Handle loading states
```

### 2. Few-Shot Learning

```
Contoh 1:
Input: "Create user profile"
Output: Buat interface UserProfile dengan fields: name, email, avatar

Contoh 2:
Input: "Create product catalog"
Output: Buat interface Product dengan fields: id, name, price, category

Sekarang: Create shopping cart
```

### 3. Role-Based Prompting

```
Anda adalah senior full-stack developer dengan 10 tahun experience.
Code yang Anda buat harus:
- Production-ready
- Well-documented
- Following best practices
- Scalable dan maintainable

Task: Implement authentication system untuk SaaS app
```

### 4. Constraint-Based Prompting

```
Buat solution dengan constraints berikut:
- Budget: $2000
- Timeline: 1 minggu
- Tech stack: MERN (MongoDB, Express, React, Node)
- Must have: User auth, payment integration, admin dashboard
- Cannot use: External APIs, cloud services (except hosting)
```

### 5. Iterative Refinement

```
Initial prompt: "Buat login form"

Refinement 1: "Buat login form dengan validation"

Refinement 2: "Buat login form React dengan email/password validation dan error handling"

Refinement 3: "Buat login form React TypeScript dengan:
- Email validation (format + required)
- Password validation (min 8 chars, 1 uppercase, 1 number)
- Loading states
- Error messages
- Remember me option
- Forgot password link"
```

## 📊 Measuring Prompt Success

### 1. Quality Metrics

#### Code Quality
- ✅ Compiles without errors
- ✅ Passes linting rules
- ✅ Includes proper types
- ✅ Has documentation
- ✅ Follows conventions

#### Functionality
- ✅ Meets all requirements
- ✅ Handles edge cases
- ✅ Proper error handling
- ✅ Good performance
- ✅ User-friendly

#### Maintainability
- ✅ Readable code
- ✅ Modular structure
- ✅ Test coverage
- ✅ Documentation
- ✅ Follows patterns

### 2. Efficiency Metrics

#### Development Speed
- Time to generate initial code
- Number of iterations needed
- Time to fix issues

#### Accuracy
- Requirements fulfilled (%)
- Bugs found post-generation
- Refactoring needed

### 3. Success Rate by Prompt Type

#### High Success Rate (90%+)
- CRUD operations
- Simple components
- Utility functions
- Basic API endpoints

#### Medium Success Rate (70-89%)
- Complex business logic
- Multi-step workflows
- Integration patterns
- Advanced UI components

#### Low Success Rate (<70%)
- Novel architectures
- Cutting-edge technologies
- Complex domain logic
- Highly specific requirements

## 🎯 Quick Reference

### Prompt Formula
```
[Role] + [Task] + [Context] + [Constraints] + [Examples] + [Quality Criteria]
```

### Common Pitfalls to Avoid
- ❌ Vague descriptions
- ❌ Missing technical context
- ❌ No examples provided
- ❌ Conflicting requirements
- ❌ No success criteria

### Success Indicators
- ✅ AI asks clarifying questions
- ✅ Code compiles first try
- ✅ All requirements addressed
- ✅ Code follows best practices
- ✅ Minimal post-generation fixes needed

---

**Prompt engineering adalah skill yang bisa dipelajari dan akan membuat Anda jauh lebih efektif bekerja dengan AI coding assistants! 🤖✨**