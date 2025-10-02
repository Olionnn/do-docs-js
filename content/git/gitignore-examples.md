# Comprehensive .gitignore Template

# ==========================================
# OS generated files
# ==========================================

### macOS ###
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
*.swp
*.swo
*~

### Windows ###
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/
*.cab
*.msi
*.msix
*.msm
*.msp
*.lnk

### Linux ###
*~
.fuse_hidden*
.directory
.Trash-*
.nfs*

# ==========================================
# Development Environments
# ==========================================

### Node.js ###
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json
.pnpm/
.yarn/
.yarnrc.yml

### Python ###
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

### Java ###
*.class
*.log
*.ctxt
.mtj.tmp/
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar
hs_err_pid*
.gradle/
build/
!gradle-wrapper.jar
!gradle-wrapper.properties
!gradle-wrapper.jar.sha256

### C/C++ ###
*.o
*.obj
*.lib
*.a
*.la
*.lo
*.dll
*.so
*.dylib
*.exe
*.out
*.app
*.i*86
*.x86_64
*.hex

# ==========================================
# Build outputs & Artifacts
# ==========================================

### General Build Outputs ###
dist/
build/
out/
output/
target/
bin/
obj/
*.exe
*.dll
*.so
*.dylib
*.a
*.lib

### Frontend Frameworks ###
.next/
.nuxt/
.output/
.vite/
.cache/
.parcel-cache/
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

### Mobile Development ###
*.apk
*.ipa
*.aab
*.xcworkspace/
*.xcodeproj/
xcuserdata/
*.mobileprovision
*.cer
*.p12
*.key

# ==========================================
# Package Managers
# ==========================================

### npm ###
package-lock.json
yarn.lock
pnpm-lock.yaml
.pnpm/
.npm/
.eslintcache

### Composer (PHP) ###
vendor/
composer.lock

### Go ###
vendor/
*.mod.sum

### Rust ###
target/
Cargo.lock
*.rs.bk

### Ruby ###
.bundle/
vendor/bundle/
*.gem

# ==========================================
# Environment & Secrets
# ==========================================

### Environment Variables ###
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env.*.local

### Secrets & Keys ###
*.key
*.pem
*.crt
*.cer
*.p12
*.pfx
*.jks
secrets/
config/secrets.*
*.secret

### API Keys & Tokens ###
config/keys.*
*.api_key
*.access_token
*.refresh_token

# ==========================================
# IDE & Editors
# ==========================================

### VS Code ###
.vscode/
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.code-workspace

### IntelliJ IDEA ###
.idea/
*.iws
*.iml
*.ipr
out/
.idea_modules/

### Sublime Text ###
*.tmlanguage.cache
*.tmPreferences.cache
*.stTheme.cache
*.sublime-workspace
*.sublime-project

### Vim ###
*.swp
*.swo
*~
Session.vim
.netrwhist

### Emacs ###
*~
\#*\#
/.emacs.desktop
/.emacs.desktop.lock
*.elc
auto-save-list
tramp
.\#*
.org-id-locations
*_archive
lsp-session-*

# ==========================================
# Testing & Coverage
# ==========================================

### Test Results ###
test-results/
coverage/
.nyc_output/
.coverage/
coverage.xml
*.cover
*.clover

### Jest ###
jest.config.js
coverage/

### Cypress ###
cypress/videos/
cypress/screenshots/

### Playwright ###
test-results/
playwright-report/
playwright/.cache/

# ==========================================
# Logs & Temporary Files
# ==========================================

### General Logs ###
logs/
*.log
log/
tmp/
temp/
.tmp/
*.tmp
*.temp

### Application Logs ###
app.log
error.log
access.log
debug.log
server.log

### System Logs ###
system.log
kernel.log
dmesg.log

# ==========================================
# Database & Data Files
# ==========================================

### SQLite ###
*.db
*.sqlite
*.sqlite3
*.db-journal

### General Database ###
*.sql
*.dump
*.backup
data/
database/
*.db
*.sqlite*

### MongoDB ###
mongod.lock
*.mongorc.js

# ==========================================
# Documentation
# ==========================================

### Generated Docs ###
docs/build/
docs/.vuepress/dist/
docs/.docusaurus/
book/

# ==========================================
# Miscellaneous
# ==========================================

### Archives ###
*.7z
*.dmg
*.gz
*.iso
*.jar
*.rar
*.tar
*.zip

### Backups ###
*.bak
*.backup
*.old
*.orig
*.rej
*~

### Lock Files ###
*.lock
*.lck
yarn.lock.backup
package-lock.json.backup

# ==========================================
# Custom Project Rules
# ==========================================

# Add project-specific rules below
# Example:
# custom-folder/
# *.custom-extension