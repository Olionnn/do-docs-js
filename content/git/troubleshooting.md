# Git Troubleshooting Guide

## 📋 Daftar Isi
- [Common Error Messages](#common-error-messages)
- [Repository Issues](#repository-issues)
- [Branch & Merge Problems](#branch--merge-problems)
- [Remote Repository Issues](#remote-repository-issues)
- [File System Issues](#file-system-issues)
- [Performance Issues](#performance-issues)

## 🚨 Common Error Messages

### "fatal: not a git repository"
```bash
# Error: fatal: not a git repository (or any of the parent directories): .git

# Solutions:
# 1. Check if you're in the right directory
pwd
ls -la

# 2. Initialize repository if missing
git init

# 3. Clone repository if working with remote
git clone <repository-url>
```

### "error: failed to push some refs"
```bash
# Error: ! [rejected] main -> main (fetch first)
# error: failed to push some refs to 'https://github.com/user/repo.git'

# Solutions:
# 1. Fetch and merge changes first
git fetch origin
git merge origin/main

# 2. Or pull with rebase
git pull --rebase origin main

# 3. Force push (ONLY if you know what you're doing)
git push -f origin main
```

### "Merge conflict in [file]"
```bash
# Solutions in conflict-resolution.md
git status
# Edit conflicted files
git add <resolved-file>
git commit -m "Resolve merge conflict"
```

### "Your branch is ahead by X commits"
```bash
# Push your local commits
git push origin <branch-name>

# Or reset if you want to discard local commits
git reset --hard origin/<branch-name>
```

### "fatal: remote origin already exists"
```bash
# Remove existing remote and add new one
git remote remove origin
git remote add origin <new-url>

# Or rename existing remote
git remote rename origin upstream
git remote add origin <new-url>
```

## 🏗️ Repository Issues

### Repository Corruption
```bash
# Symptoms: weird errors, missing objects

# 1. Check repository health
git fsck

# 2. Try to recover
git reflog
git reset --hard HEAD@{1}  # Go back 1 step

# 3. If corrupted, clone fresh
git clone <remote-url> ../fresh-repo
cp -r ../fresh-repo/.git .git
git reset --hard HEAD
```

### Lost Commits
```bash
# Find lost commits
git reflog

# Recover specific commit
git checkout <commit-hash>
git checkout -b recovery-branch

# Or reset to specific commit
git reset --hard <commit-hash>
```

### Repository Too Large
```bash
# Check repository size
du -sh .git

# Remove large files from history
git filter-branch --tree-filter 'rm -f large-file.zip' HEAD

# Use Git LFS for large files
git lfs install
git lfs track "*.zip"
git lfs migrate import --include="*.zip"
```

### Permission Issues
```bash
# Fix permission on .git folder
sudo chown -R $(whoami) .git

# For Windows, run Git Bash as administrator
# For macOS/Linux, check file permissions
ls -la .git
```

## 🌿 Branch & Merge Problems

### Stuck in Detached HEAD
```bash
# Symptoms: HEAD detached at <commit-hash>

# Solutions:
# 1. Create new branch from current state
git checkout -b new-branch-name

# 2. Or return to main branch
git checkout main

# 3. If you want to keep changes
git branch temp-branch
git checkout main
git merge temp-branch
```

### Branch Not Showing Remote
```bash
# Fetch all branches
git fetch --all

# List all branches
git branch -a

# Checkout remote branch
git checkout -b local-branch origin/remote-branch
```

### Cannot Delete Branch
```bash
# Error: error: Cannot delete branch 'branch-name' checked out at '/path'

# Switch to different branch first
git checkout main
git branch -d branch-name

# Force delete if necessary
git branch -D branch-name
```

### Merge Without Fast-Forward
```bash
# Force merge commit
git merge --no-ff branch-name

# Or configure default behavior
git config --global merge.ff false
```

## 🔗 Remote Repository Issues

### Authentication Failed
```bash
# For HTTPS
git config --global credential.helper store

# For SSH
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
# Add public key to GitHub/GitLab

# Test connection
ssh -T git@github.com
```

### Connection Timeout
```bash
# Increase timeout
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999

# Use SSH instead of HTTPS
git remote set-url origin git@github.com:user/repo.git
```

### Remote Repository Not Found
```bash
# Check remote URL
git remote -v

# Update remote URL
git remote set-url origin <correct-url>

# Verify repository exists
curl -I <repository-url>
```

### Push Rejected (Protected Branch)
```bash
# Create pull request instead
git checkout -b feature-branch
git push origin feature-branch
# Create PR via web interface

# Or if you have permission, disable protection temporarily
# (Not recommended for production)
```

## 📁 File System Issues

### Case Sensitivity Issues
```bash
# macOS/Windows are case-insensitive
# Linux is case-sensitive

# Check if file exists with different case
ls -la | grep -i filename

# Fix case sensitivity
git mv oldName newName
git commit -m "Fix case sensitivity"
```

### Line Ending Issues
```bash
# Configure line endings
# Windows
git config --global core.autocrlf true

# macOS/Linux
git config --global core.autocrlf input

# Fix existing files
git rm --cached -r .
git reset --hard
```

### File Mode Changes
```bash
# Ignore file permission changes
git config core.fileMode false

# Or track permission changes
git config core.fileMode true
```

### Untracked Files Not Showing
```bash
# Check .gitignore
cat .gitignore

# Force show ignored files
git status --ignored

# Check if file is ignored
git check-ignore -v filename
```

## ⚡ Performance Issues

### Slow Git Operations
```bash
# Enable parallel processing
git config --global pack.threads 0

# Increase cache size
git config --global http.postBuffer 524288000

# Disable compression for local repos
git config --global core.compression 0
```

### Large Repository
```bash
# Shallow clone
git clone --depth 1 <repository-url>

# Clean up
git gc --aggressive
git prune

# Use sparse checkout
git sparse-checkout init --cone
git sparse-checkout set <folder>
```

### Slow Push/Pull
```bash
# Use SSH instead of HTTPS
git remote set-url origin git@github.com:user/repo.git

# Compress repository
git gc
git repack -a -d --depth=250 --window=250
```

## 🔧 Advanced Recovery

### Recover Deleted Branch
```bash
# Find branch in reflog
git reflog

# Recover branch
git checkout -b recovered-branch <commit-hash>
```

### Recover Stashed Changes
```bash
# List all stashes
git stash list

# Apply specific stash
git stash apply stash@{2}

# Or create branch from stash
git stash branch new-branch stash@{2}
```

### Undo Rebase
```bash
# Find original HEAD
git reflog

# Reset to before rebase
git reset --hard HEAD@{5}  # Adjust number as needed
```

### Fix Amend After Push
```bash
# If you amended a pushed commit
git push -f origin <branch>  # Only if you're sure!

# Better: create new commit
git revert HEAD
git push origin <branch>
```

## 🐛 Debugging Git

### Debug Commands
```bash
# Verbose output
git <command> -v

# Debug git commands
GIT_TRACE=1 git <command>

# Debug SSH
GIT_SSH_COMMAND="ssh -v" git push
```

### Git Configuration Issues
```bash
# Check all config
git config --list --show-origin

# Check specific config
git config --global --list

# Reset config
git config --global --unset <key>
```

### Network Issues
```bash
# Test connection
ping github.com

# Check proxy settings
git config --global http.proxy
git config --global https.proxy

# Disable SSL verification (temporary)
git config --global http.sslVerify false
```

## 🚑 Emergency Recovery

### Complete Repository Reset
```bash
# WARNING: This will lose all local changes!

# Backup current state
cp -r .git .git-backup

# Reset to remote
git fetch origin
git reset --hard origin/main
git clean -fd  # Remove untracked files
```

### Recover from Failed Merge
```bash
# Abort merge
git merge --abort

# Or abort rebase
git rebase --abort

# Check status
git status
```

### Fix Broken .git Folder
```bash
# Remove and re-initialize
rm -rf .git
git init
git remote add origin <url>
git fetch
git reset --hard origin/main
```

## 📞 Getting Help

### Git Help Commands
```bash
git help <command>
git <command> --help
man git-<command>
```

### Online Resources
- [Stack Overflow](https://stackoverflow.com/questions/tagged/git)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Help](https://help.github.com)
- [Atlassian Git Tutorials](https://www.atlassian.com/git)

### Community Support
- Git mailing list
- Local developer communities
- Company internal Git experts

---

**Remember: When in doubt, `git status` and `git log` are your friends! 👥**