# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Organium Elements** is a component catalog for the Organium experimental instrument system (Intelligent Instruments Lab). It catalogs 72+ physical/electronic components (sensors, actuators, materials, microcontrollers) with rich markdown descriptions, metadata, and images.

## Running the Project

### Full development environment (both servers)
```bash
./admin.command
```
This starts:
- **Port 5001** — Flask admin panel (`python3 admin.py`)
- **Port 8080** — Static HTTP server (via `npx serve`)

### Individual servers
```bash
npm run admin     # Flask admin only (port 5001)
npm run dev       # Static server with live reload (port 8080)
npm run start     # Static server without live reload (port 8080)
```

### First-time setup
```bash
./setup.command   # installs Python deps, optionally initialises Git
# or:
npm run setup     # pip3 install -r requirements.txt
```

### Rebuild the index
```bash
python3 convert.py
```
This regenerates `assets/elements.js` from the markdown database. Run this after adding/editing component files manually. The admin panel's "Rebuild" button does the same thing.

### Stopping the servers

Double-click `kill.command` to stop both servers (ports 5001 and 8080). Then re-run `admin.command` to restart.

### Viewing changes on the public site

After saving a component, `convert.py` runs automatically and updates `assets/elements.js` plus bumps the cache-busting version in `index.html`. If the change doesn't appear on the public site, do a **hard refresh** (Cmd+Shift+R) — the browser may have cached the old `index.html`.

### Save vs Rebuild

- **Save** (admin editor) — writes the `.md` file and automatically runs `convert.py` to regenerate `elements.js`. Use this for all normal edits.
- **Rebuild** (admin list page) — only needed if you edited `.md` files directly outside the admin (e.g. in a text editor). Manually triggers `convert.py` without saving any form data.

## Architecture

This is a **two-server, file-based CMS** with no JavaScript framework and no build bundler.

### Data flow
```
database/Organium_Elements/*.md   ← source of truth (YAML frontmatter + Markdown body)
         ↓  convert.py / admin "Rebuild"
assets/elements.js                ← generated JSON array, loaded by index.html
         ↓  assets/app.js
index.html                        ← searchable card grid (client-side filter)
         ↓  user clicks card
element.html?file=<slug>.md       ← fetches raw .md, renders via marked.js
```

### Key files

| File | Role |
|------|------|
| `convert.py` | Build script — parses all `.md` files, writes `assets/elements.js` |
| `admin.py` | Flask CMS — CRUD routes for components and image uploads |
| `assets/app.js` | Index page — renders cards, real-time search |
| `assets/element.js` | Detail page — fetches markdown, renders property table + body |
| `admin/edit.html` | Admin editor template (uses EasyMDE) |

### Component markdown format

Each file in `database/Organium_Elements/` has a YAML frontmatter block followed by a markdown body:

```markdown
---
Type: Sensor
Status: Done
Voltage: 3.3V
Connection: I2C
Senses: Acceleration, Gyroscope, Magnetometer
---

## Overview
...
```

`convert.py` → `parse_md()` extracts these fields. `element.js` re-parses the same format client-side.

### Servers

- **Flask (port 5001)**: Admin CMS with routes `/`, `/component/<filename>`, `/rebuild`, `/publish`, `/upload`. Git integration for pushing to GitHub Pages.
- **Static server (port 8080)**: Serves the public catalog. No server-side logic — everything is client-side JS + pre-generated `elements.js`.

### Publishing

The admin panel's "Publish" button runs `git add . && git commit && git push` to deploy to GitHub Pages.

## Dependencies

**Python:** `flask>=3.0`, `markdown>=3.6`
**Node:** Only `npx` (no local packages installed) — `live-server` or `serve` pulled on demand
**Frontend:** All libraries are vendored in `assets/` (`marked.min.js`, `easymde.min.js`)
