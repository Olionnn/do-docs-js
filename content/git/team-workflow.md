# Git Workflow untuk Tim Development

## 📋 Daftar Isi
- [Daily Workflow](#daily-workflow)
- [Feature Development](#feature-development)
- [Code Review Process](#code-review-process)
- [Release Process](#release-process)
- [Emergency Fixes](#emergency-fixes)

## 🌅 Daily Workflow

### Pagi Hari - Setup
```bash
# 1. Update local repository
git checkout main
git pull origin main
git fetch --all --prune

# 2. Cek status repository
git status
git log --oneline -5

# 3. Buat branch untuk task hari ini
git checkout -b feature/user-login-form
```

### Selama Development
```bash
# 1. Kerja di feature branch
git status                    # Cek perubahan
git add src/components/LoginForm.jsx
git commit -m "feat: add login form component"

# 2. Push secara berkala
git push origin feature/user-login-form

# 3. Jika ada perubahan dari tim lain
git fetch origin
git rebase origin/main
```

### Akhir Hari - Cleanup
```bash
# 1. Pastikan semua perubahan di-commit
git status
git add .
git commit -m "feat: implement user login validation"

# 2. Push final changes
git push origin feature/user-login-form

# 3. Create Pull Request (via GitHub/GitLab UI)
# - Tulis deskripsi yang jelas
# - Tag reviewer yang tepat
# - Pastikan CI/CD passes
```

## 🚀 Feature Development

### 1. Planning Phase
```bash
# Buat branch dari main (bukan develop)
git checkout main
git pull origin main
git checkout -b feature/add-payment-system

# Atau dari develop jika menggunakan Git Flow
git checkout develop
git pull origin develop
git checkout -b feature/add-payment-system
```

### 2. Development Phase
```bash
# Implementasi bertahap dengan commit kecil
git add src/services/paymentService.js
git commit -m "feat: add payment service skeleton"

git add src/components/PaymentForm.jsx
git commit -m "feat: add payment form component"

git add src/utils/paymentValidation.js
git commit -m "feat: add payment validation utilities"

# Test implementation
npm test
git add tests/paymentService.test.js
git commit -m "test: add payment service tests"
```

### 3. Integration Phase
```bash
# Sync dengan main branch
git fetch origin
git rebase origin/main

# Resolve konflik jika ada
# Test lagi setelah rebase
npm test
npm run build

# Final commit jika diperlukan
git add .
git commit -m "feat: integrate payment system with main app"
```

### 4. Code Review Phase
```bash
# Push ke remote
git push origin feature/add-payment-system

# Create Pull Request dengan:
# - Title: "feat: Add payment system"
# - Description: Detail implementasi dan testing
# - Checklist: Unit tests, integration tests, documentation
# - Screenshots jika UI changes
```

## 🔍 Code Review Process

### Untuk Reviewer
```bash
# 1. Checkout PR branch
git checkout feature/add-payment-system

# 2. Review code changes
git diff main..feature/add-payment-system
git log --oneline main..feature/add-payment-system

# 3. Test locally
npm install
npm test
npm run build

# 4. Check specific files
git show HEAD:src/services/paymentService.js
```

### Checklist Code Review
```markdown
## Code Quality
- [ ] Code follows style guidelines
- [ ] No console.log in production code
- [ ] Proper error handling
- [ ] Comments for complex logic

## Functionality
- [ ] Requirements implemented correctly
- [ ] Edge cases handled
- [ ] No breaking changes
- [ ] Backward compatibility maintained

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Performance not degraded

## Documentation
- [ ] Code documented
- [ ] README updated if needed
- [ ] API documentation updated
- [ ] Migration guide if breaking changes
```

### Merge Strategies
```bash
# Squash merge (recommended untuk feature branches)
# - Combines all commits into one
# - Cleaner history
# - Easier to revert

# Merge commit
# - Preserves all commit history
# - Shows development process
# - More detailed but cluttered

# Rebase and merge
# - Linear history
# - Clean but loses context
```

## 📦 Release Process

### Minor Release (New Features)
```bash
# 1. Create release branch
git checkout main
git pull origin main
git checkout -b release/v2.1.0

# 2. Update version
echo "2.1.0" > VERSION
npm version patch  # atau minor/major
git add package.json VERSION
git commit -m "chore: bump version to 2.1.0"

# 3. Final testing
npm test
npm run build

# 4. Tag release
git tag -a v2.1.0 -m "Release version 2.1.0
- Add payment system
- Improve user authentication
- Fix login validation bug"

# 5. Push release
git push origin release/v2.1.0
git push origin --tags

# 6. Merge to main
git checkout main
git merge release/v2.1.0
git push origin main

# 7. Create GitHub release
# - Go to Releases tab
# - Create new release from tag
# - Add release notes
```

### Hotfix Release (Critical Bug)
```bash
# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix

# 2. Fix the bug
# Edit files...
git add .
git commit -m "fix: critical security vulnerability in auth"

# 3. Test fix
npm test

# 4. Merge to main immediately
git checkout main
git merge hotfix/critical-security-fix
git push origin main

# 5. Also merge to develop/release branches
git checkout develop
git merge main
git push origin develop

# 6. Tag hotfix release
git tag -a v2.0.1 -m "Hotfix: Security vulnerability fix"
git push origin --tags
```

## 🚨 Emergency Fixes

### Production Down - Immediate Action
```bash
# 1. Assess situation
# - What's broken?
# - How critical?
# - Can we rollback?

# 2. Create emergency branch
git checkout main
git checkout -b emergency/fix-production-down

# 3. Quick fix (minimal changes)
# Only fix the immediate issue
git add fix.js
git commit -m "fix: emergency fix for production downtime"

# 4. Test minimally
npm test -- --testPathPattern=emergency-fix

# 5. Deploy immediately
git push origin emergency/fix-production-down
# Trigger deployment pipeline

# 6. Merge to main after verification
git checkout main
git merge emergency/fix-production-down
git push origin main
```

### Rollback Strategy
```bash
# Option 1: Revert specific commit
git revert abc123 --no-edit
git push origin main

# Option 2: Reset to previous release
git checkout main
git reset --hard v1.5.0
git push origin main --force

# Option 3: Deploy previous build
# Use CI/CD to deploy previous successful build
```

## 👥 Team Collaboration

### Branch Naming Convention
```bash
# Features
feature/add-user-profile
feature/implement-payment-gateway
feature/refactor-authentication

# Bugs
bugfix/fix-login-validation
bugfix/resolve-memory-leak

# Hotfixes
hotfix/critical-security-patch
hotfix/database-connection-fix

# Releases
release/v2.1.0
hotfix/v2.0.1
```

### Commit Message Convention
```bash
# Format: type(scope): description
feat(auth): add JWT token refresh
fix(api): resolve memory leak in user service
docs(readme): update installation guide
style(components): format button styles
refactor(utils): simplify date formatting logic
test(auth): add token validation tests
chore(deps): update lodash to v4.17.21
```

### Communication Standards
```bash
# Daily standup
- What did you work on yesterday?
- What will you work on today?
- Any blockers?

# Pull Request comments
- Be specific about issues
- Suggest solutions, don't just point problems
- Use screenshots for UI changes
- Reference issue numbers
```

## 📊 Monitoring & Metrics

### Repository Health
```bash
# Check active branches
git branch -r | wc -l

# Find stale branches
git for-each-ref --sort=-committerdate refs/remotes/origin/feature/* | head -10

# Commit frequency
git log --oneline --since="1 week ago" | wc -l

# Contributors
git shortlog -sn --since="1 month ago"
```

### Code Review Metrics
```bash
# Average PR merge time
# PR size distribution
# Review coverage
# Bug detection rate
```

## 🎯 Best Practices Summary

### For Individual Developers
```bash
✅ Commit early, commit often
✅ Write clear commit messages
✅ Keep branches short-lived
✅ Test before pushing
✅ Review your own code first
✅ Update from main daily
```

### For Teams
```bash
✅ Use consistent branching strategy
✅ Require code reviews
✅ Automate testing and deployment
✅ Document processes
✅ Regular retrospectives
✅ Continuous learning
```

### For Organizations
```bash
✅ Establish coding standards
✅ Implement security practices
✅ Monitor repository health
✅ Provide training
✅ Encourage knowledge sharing
✅ Celebrate successes
```

---

**Workflow yang baik membuat tim lebih produktif dan kode lebih aman! 🏆**