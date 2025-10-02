# Git Best Practices & Workflow

## 📋 Daftar Isi
- [Commit Message Conventions](#commit-message-conventions)
- [Branching Strategy](#branching-strategy)
- [Code Review Process](#code-review-process)
- [Release Management](#release-management)
- [Security Practices](#security-practices)

## 📝 Commit Message Conventions

### Format Standar
```
type(scope): description

[optional body]

[optional footer]
```

### Types yang Valid
```bash
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation
style:    # Code style changes
refactor: # Code refactoring
test:     # Testing
chore:    # Maintenance
perf:     # Performance improvement
ci:       # CI/CD changes
build:    # Build system changes
```

### Contoh Commit Messages
```bash
# ✅ Good examples
git commit -m "feat(auth): add JWT token validation"
git commit -m "fix(api): resolve memory leak in user service

Close memory leak when processing large user datasets.
Performance improved by 40% for bulk operations."

git commit -m "docs(readme): update installation guide

- Add Windows setup instructions
- Include troubleshooting section
- Update Node.js version requirements"

# ❌ Bad examples
git commit -m "fix bug"
git commit -m "update"
git commit -m "changes"
```

### Breaking Changes
```bash
git commit -m "feat(api)!: remove deprecated endpoints

BREAKING CHANGE: Remove /api/v1/users endpoint
Use /api/v2/users instead"
```

## 🌿 Branching Strategy

### Git Flow (Traditional)
```
main (production)
├── release/v1.0.0
└── develop
    ├── feature/user-auth
    ├── feature/payment
    └── hotfix/security-patch
```

### GitHub Flow (Simplified)
```
main
├── feature/user-profile
├── bugfix/login-error
└── hotfix/critical-bug
```

### Trunk-Based Development
```
main
├── short-lived feature branches
└── direct commits (small teams)
```

### Implementasi Git Flow
```bash
# Setup repository
git checkout -b develop
git push -u origin develop

# Feature development
git checkout -b feature/new-feature develop
# Work on feature
git checkout develop
git pull origin develop
git checkout feature/new-feature
git rebase develop
git checkout develop
git merge feature/new-feature
git push origin develop
git branch -d feature/new-feature

# Release preparation
git checkout -b release/v1.0.0 develop
# Testing and bug fixes
git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git checkout develop
git merge release/v1.0.0
git branch -d release/v1.0.0
```

## 🔍 Code Review Process

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes
```

### Review Guidelines
```bash
# Reviewer checklist:
✅ Code quality and style
✅ Logic correctness
✅ Test coverage
✅ Documentation
✅ Security considerations
✅ Performance impact
✅ Breaking changes identified
```

### Code Review Commands
```bash
# Compare branches
git diff main..feature-branch

# See commits in PR
git log --oneline main..feature-branch

# Check file changes
git diff --name-only main..feature-branch

# Blame for context
git blame file.js
```

## 📦 Release Management

### Versioning (Semantic Versioning)
```
MAJOR.MINOR.PATCH

1.2.3
│ │ └─ Patch: Bug fixes
│ └─── Minor: New features (backward compatible)
└───── Major: Breaking changes
```

### Release Process
```bash
# Create release branch
git checkout -b release/v1.2.0 develop

# Update version
echo "1.2.0" > VERSION
git add VERSION
git commit -m "chore: bump version to 1.2.0"

# Tag release
git tag -a v1.2.0 -m "Release version 1.2.0"

# Merge to main
git checkout main
git merge release/v1.2.0
git push origin main --tags

# Merge back to develop
git checkout develop
git merge release/v1.2.0
git push origin develop

# Clean up
git branch -d release/v1.2.0
```

### Changelog Generation
```bash
# Generate changelog
git log --pretty=format:"%h %s" --since="2023-01-01" > changelog.txt

# Atau gunakan conventional commits
npm install -g conventional-changelog-cli
conventional-changelog -p angular -i CHANGELOG.md -s
```

## 🔒 Security Practices

### Protecting Sensitive Data
```bash
# Never commit secrets
git secrets --install
git secrets --register-aws  # AWS keys
git secrets --register-azure  # Azure keys

# Pre-commit hooks
#!/bin/sh
git secrets --pre_commit_hook -- "$@"
```

### Repository Security
```bash
# Enable branch protection
# Require pull requests
# Require code reviews
# Require status checks
# Include administrators

# Signed commits
git config --global commit.gpgsign true
git config --global user.signingkey YOUR_KEY_ID
```

### Handling Security Issues
```bash
# Remove sensitive data from history
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch secrets.txt' \
  --prune-empty --tag-name-filter cat -- --all

# Force push (dengan hati-hati)
git push origin --force --all
```

## 🚀 Advanced Workflows

### Interactive Rebase
```bash
# Squash multiple commits
git rebase -i HEAD~3

# Commands:
# pick = use commit
# reword = edit message
# edit = amend commit
# squash = merge with previous
# fixup = merge without message
# drop = remove commit
```

### Cherry Picking
```bash
# Apply specific commit to another branch
git cherry-pick abc123
git cherry-pick --no-commit abc123  # Don't create commit
```

### Bisect (Debug regression)
```bash
# Find which commit introduced a bug
git bisect start
git bisect bad HEAD
git bisect good v1.0.0

# Git will checkout commits, test each one
git bisect good  # This commit is good
git bisect bad   # This commit has the bug
git bisect reset # Return to original state
```

## 📊 Metrics & Monitoring

### Repository Health
```bash
# Commit frequency
git log --oneline --since="1 month ago" | wc -l

# Contributors
git shortlog -sn --since="1 month ago"

# File changes
git log --pretty=format: --name-only | sort | uniq -c | sort -rg | head -10
```

### Code Quality Hooks
```bash
# Pre-commit hook
#!/bin/sh
npm run lint
npm run test
# Exit with 1 if tests fail
```

## 🤝 Team Collaboration

### Code Ownership
```bash
# CODEOWNERS file
# Global owners
* @team-lead

# Specific files
*.js @frontend-team
*.py @backend-team
docs/ @docs-team
```

### Communication Standards
```bash
# Issue templates
# Pull request templates
# Contributing guidelines
# Code of conduct
```

### Conflict Prevention
```bash
# Regular sync with main
git checkout feature-branch
git fetch origin
git rebase origin/main

# Small, focused commits
# Clear commit messages
# Regular pull requests
```

## 📈 Performance Optimization

### Repository Maintenance
```bash
# Clean up
git gc --aggressive
git prune

# Repack objects
git repack -a -d --depth=250 --window=250

# Check repository size
git count-objects -vH
```

### Large File Handling
```bash
# Git LFS for large files
git lfs install
git lfs track "*.psd"
git lfs track "*.mov"

# Remove large files from history
git filter-branch --tree-filter 'rm -f large-file.zip' HEAD
```

## 🎯 Quick Reference

### Daily Workflow
```bash
# Morning
git checkout main
git pull origin main
git checkout -b feature/new-task

# During work
git add .
git commit -m "feat: implement new feature"
git push origin feature/new-task

# End of day
# Create pull request via GitHub/GitLab
```

### Emergency Fixes
```bash
# Hotfix workflow
git checkout -b hotfix/critical-bug main
# Fix the bug
git add .
git commit -m "fix: critical bug in production"
git push origin hotfix/critical-bug
# Create PR and merge to main
# Then merge to develop
```

---

**Best practices membuat development lebih efisien dan aman! 🛡️**