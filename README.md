# Docs Site (generated)

This repository contains a mini static documentation site that reads Markdown files from `content/` and renders them using `index.html` + `app.js`.

Quick start

1. Generate manifest locally:

```bash
npm install
npm run generate
```

2. Push to GitHub and enable Pages (branch `main`, folder `/ (root)`).

3. (Optional) Enable the provided GitHub Action `.github/workflows/generate.yml` to auto-generate `manifest.json` on every push to `main`.

Important: `manifest.json` must exist in the repo for the frontend to know which files to load.
