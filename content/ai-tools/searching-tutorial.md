# Tutorial Searching untuk Developer

## 📋 Daftar Isi
- [Searching dalam Kode](#searching-dalam-kode)
- [Searching di Internet](#searching-di-internet)
- [Tools dan Teknik Canggih](#tools-dan-teknik-canggih)
- [Best Practices](#best-practices)

## 🔍 Searching dalam Kode

### 1. Basic Text Search dengan grep

```bash
# Cari semua file yang mengandung kata tertentu
grep -r "function login" src/

# Cari dengan case-insensitive
grep -ri "user authentication" .

# Cari dengan line numbers
grep -rn "TODO" src/

# Cari dengan context (baris sebelum dan sesudah)
grep -r -C 3 "password" src/

# Cari dengan file extensions tertentu
grep -r --include="*.js" "import React" src/
```

### 2. Advanced Search dengan ripgrep (rg)

```bash
# Install ripgrep
# macOS: brew install ripgrep
# Ubuntu: sudo apt install ripgrep

# Cari dengan regex
rg "useState|useEffect" --type js

# Cari dengan case-insensitive dan word boundaries
rg -i "\buser\b" src/

# Cari di file tertentu saja
rg "console.log" --glob "*.js" --glob "!*.test.js"

# Cari dengan context
rg -C 2 "error" src/
```

### 3. Find Files dengan find

```bash
# Cari file berdasarkan nama
find . -name "*.test.js"

# Cari file yang dimodifikasi dalam 7 hari terakhir
find . -name "*.js" -mtime -7

# Cari file berdasarkan ukuran
find . -name "*.log" -size +100k

# Cari dan execute command pada hasil
find . -name "*.js" -exec grep -l "deprecated" {} \;
```

### 4. Search dalam IDE/Editor

#### VS Code Search
```
Ctrl+Shift+F (Cmd+Shift+F di Mac)

# Regex search
\bclass\s+\w+

# Search dengan file filter
*.ts,*.tsx !node_modules

# Replace dengan regex
Find: console\.log\((.*)\)
Replace: // console.log($1)
```

#### Vim Search
```vim
# Basic search
/pattern

# Search dengan regex
/\bfunction\s+\w+\s*\(

# Search case-insensitive
/\cpattern

# Search whole word
/*word

# Replace
:%s/old/new/g
```

## 🌐 Searching di Internet

### 1. Teknik Search yang Efektif

#### Google Search Operators
```
# Exact phrase
"react hooks useEffect"

# Exclude words
react hooks -vue -angular

# Site specific
site:stackoverflow.com react context api

# File type
react tutorial filetype:pdf

# Date range
react 18 after:2023-01-01

# Related sites
related:reactjs.org

# In title
intitle:"react best practices"
```

#### Developer-Specific Search
```
# Stack Overflow
[react] state management site:stackoverflow.com

# GitHub
react component library language:JavaScript stars:>1000

# MDN
javascript array methods site:developer.mozilla.org

# NPM
react date picker npm package
```

### 2. Search Engines Khusus Developer

#### 1. Stack Overflow Search
```
# Advanced search
[react][javascript] error score:10 answers:5
[vue] lifecycle hooks is:question hasaccepted:no
```

#### 2. GitHub Search
```
# Repository search
react dashboard stars:>1000 language:TypeScript

# Code search
filename:package.json "react-scripts"

# Issues and PRs
is:issue is:open label:bug language:JavaScript
```

#### 3. NPM Search
```
# Package search
react date picker --save
express middleware authentication
```

#### 4. MDN Web Docs
```
# JavaScript reference
Array.prototype.map mdn
async await javascript
```

### 3. Browser Extensions untuk Developer

#### 1. OctoLinker (GitHub)
- Auto-link dependencies ke GitHub
- Link npm packages ke NPM registry
- Link file paths ke repository

#### 2. Stack Overflow Search Extension
- Quick search dari browser
- Filter by tags dan score

#### 3. DevDocs
- Offline documentation browser
- Quick search across multiple docs

## 🛠️ Tools dan Teknik Canggih

### 1. Code Search Tools

#### 1. The Silver Searcher (ag)
```bash
# Faster than grep
brew install the_silver_searcher

# Usage
ag "function.*test" --js
ag "TODO|FIXME" --ignore-dir node_modules
```

#### 2. fzf - Fuzzy Finder
```bash
# Install
brew install fzf

# Fuzzy search files
find . -type f | fzf

# Interactive git log search
git log --oneline | fzf
```

#### 3. ack - Better than grep
```bash
# Install
brew install ack

# Search with smart filtering
ack "pattern" --type=js
ack "error" --ignore-dir=dist
```

### 2. IDE Search Features

#### VS Code Advanced Search
```json
// settings.json untuk search
{
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/*.log": true
  },
  "search.useIgnoreFiles": true
}
```

#### IntelliJ/WebStorm Search
```
# Structural search
Find: class $Class$ { }
Replace: export class $Class$ { }

# Search templates
Search for: interface $Name$ { $Content$ }
```

### 3. Database Search untuk Code

#### 1. Sourcegraph
- Code search across multiple repositories
- Cross-repository references
- Code intelligence

#### 2. Hound
- Fast code search
- Regex support
- Multiple language support

### 4. AI-Powered Search

#### 1. GitHub Copilot
- Semantic code search
- Natural language queries
- Context-aware suggestions

#### 2. Tabnine
- AI-powered code completion
- Smart search suggestions

## 📚 Best Practices

### 1. Search Strategy

#### Step-by-Step Approach
```bash
# 1. Broad search first
grep -r "auth" src/

# 2. Narrow down
grep -r "auth" src/ --include="*.js"

# 3. Specific pattern
grep -rn "auth.*function" src/

# 4. Context search
grep -r -C 5 "auth" src/
```

#### Error-First Search
```bash
# When debugging errors
grep -r "TypeError" logs/
grep -r "undefined" src/ --include="*.js"
grep -r "Cannot read property" .
```

### 2. Efficient Search Habits

#### Keyboard Shortcuts
```bash
# VS Code
Ctrl+Shift+F    # Global search
Ctrl+P          # Quick open
Ctrl+Shift+O    # Go to symbol

# Terminal
Ctrl+R          # Reverse search history
history | grep git
```

#### Search Templates
```bash
# Function definitions
grep -rn "^function\|^const.*=\s*(.*)\s*=>" src/

# Class definitions
grep -rn "^class\|^export class" src/

# Import statements
grep -rn "^import\|^require" src/
```

### 3. Search for Learning

#### Documentation Search
```
# MDN: "javascript promises"
# React: "react hooks guide"
# Node.js: "express middleware"
```

#### Community Search
```
# Reddit
site:reddit.com/r/javascript "best practices"

# Dev.to
site:dev.to "react performance"

# Medium
site:medium.com "javascript interview questions"
```

### 4. Search Automation

#### Shell Scripts
```bash
#!/bin/bash
# search-project.sh

echo "🔍 Searching for: $1"
echo "📁 In directory: $(pwd)"
echo

# Search in code
echo "📄 Code files:"
grep -rn "$1" src/ --include="*.js" --include="*.ts" | head -10

# Search in tests
echo -e "\n🧪 Test files:"
grep -rn "$1" tests/ | head -5

# Search in docs
echo -e "\n📚 Documentation:"
grep -rn "$1" docs/ | head -5
```

#### VS Code Tasks
```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Search TODOs",
      "type": "shell",
      "command": "grep",
      "args": ["-rn", "TODO|FIXME", "src/"],
      "group": "build"
    }
  ]
}
```

## 🎯 Pro Tips

### 1. Search Patterns untuk JavaScript/React
```bash
# React components
grep -rn "function.*Component\|class.*Component" src/

# Hooks usage
grep -rn "useState\|useEffect\|useContext" src/

# API calls
grep -rn "fetch\|axios" src/

# Error boundaries
grep -rn "componentDidCatch\|getDerivedStateFromError" src/
```

### 2. Search untuk Debugging
```bash
# Console logs (should be removed)
grep -rn "console\." src/ --exclude-dir=node_modules

# Hardcoded values
grep -rn "localhost\|127\.0\.0\.1" src/

# Deprecated methods
grep -rn "componentWillMount\|componentWillReceiveProps" src/
```

### 3. Search untuk Code Quality
```bash
# Long functions
grep -rn "^function" src/ | awk -F: '{print $1}' | xargs wc -l | sort -nr | head -10

# Large files
find src/ -name "*.js" -exec wc -l {} \; | sort -nr | head -10

# Unused imports (basic check)
grep -rn "^import" src/ | sort | uniq -c | sort -nr
```

### 4. Advanced Regex Patterns
```bash
# Email validation
grep -rP '\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b' src/

# URL patterns
grep -rP 'https?://[^\s<>"{}|\\^`[\]]+' src/

# Phone numbers
grep -rP '\b\d{3}[-.]?\d{3}[-.]?\d{4}\b' src/
```

---

**Master searching skills akan membuat Anda 10x lebih produktif sebagai developer! 🚀**