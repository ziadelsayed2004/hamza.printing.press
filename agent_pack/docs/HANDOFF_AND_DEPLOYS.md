# Bookstore Manager Modernization — Final Handoff & Deployment Manual

This document serves as the final documentation for deploying and maintaining the modernized Bookstore Manager system. The application has been fully transformed from a legacy Vanilla JS/HTML framework into a secure, modular Node.js/Express monolith with a professional Material UI dashboard.

---

## 1. System Overview

### Tech Stack
*   **Backend:** Node.js, Express, SQLite3 (`sqlite3` driver), `express-session` for session security.
*   **Frontend:** React (v19), Vite (v8), Material UI (MUI v9), `@mui/icons-material`.
*   **Database:** SQLite (`storage/database.sqlite`), initialized via knex-style native script runners.
*   **Build Toolchain:** Vite compiler outputting directly into the Express `public/` static serve directory.
*   **Linter/Quality Gates:** ESLint v9 (flat config) for backend server modules; Oxlint for frontend client pages.

### Folder Structure
```txt
Book-Store-Public/
├── app.js               # Express application entrypoint
├── eslint.config.js     # ESLint v9 linter configuration
├── package.json         # Unified dependency and script manager
├── agent_pack/          # Modernization guidelines, step reports, and tracking
├── client/              # React frontend source code
│   ├── src/
│   │   ├── app/         # AuthContext provider
│   │   ├── components/  # Reusable UI widgets (empty, loading states)
│   │   ├── layouts/     # Main layout drawer
│   │   └── pages/       # Dashboard, Invoices, Shipments, Inventory, Reports, Exports, Users
├── server/              # Express backend source code
│   └── src/
│       ├── config/      # Environment variables parser
│       ├── db/          # SQLite connection and migration/seeding engines
│       ├── middleware/  # RBAC, request parsers
│       └── modules/     # Modular server controllers, service layers, and tests
├── storage/             # Data directory containing database, backups, exports, uploads
└── scripts/             # Build, copy, and smoke test runner engines
```

---

## 2. DirectAdmin Monolith Deployment Guide

DirectAdmin Node.js deployment uses the **Phusion Passenger** application server wrapper. Follow these setup steps to deploy the application:

### Step A: Prepare Directory Payload
1.  On your local environment, compile the frontend build bundle:
    ```bash
    npm run build
    ```
    This generates static client assets into the root `public/` directory and copies them for public serving.
2.  Compress the repository root folder (excluding `node_modules`, `client/node_modules`, and `.git`) into a `.zip` file.

### Step B: Upload and Setup in DirectAdmin
1.  Log in to your **DirectAdmin control panel**.
2.  Open **File Manager** and upload your compressed zip payload to your domain folder (typically `public_html` or a dedicated app subdirectory like `/private/bookstore`). Extract all files.
3.  Go to the **Setup Node.js App** section in DirectAdmin.
4.  Click **Create Application** and specify the parameters:
    *   **Node.js Version:** Select Node v20.x or v22.x.
    *   **Application Mode:** Set to `production` (maps `NODE_ENV=production`).
    *   **Application Root:** Path where you extracted the project (e.g., `/home/username/bookstore`).
    *   **Application URL:** The domain/subdomain path mapping (e.g., `bookstore.mydomain.com` or `mydomain.com/manager`).
    *   **Application Startup File:** Set to `app.js` (this is our server entrypoint).
5.  Click **Create**. Passenger will initialize the environment and create a configuration virtual host.

### Step C: Dependencies & Database Initialization
1.  In the Node.js application management page, click the **Run npm install** button to download and link server production dependencies.
2.  Define the environment variables under the **Environment Variables** manager block:
    *   `PORT` = `3000` (Passenger overrides the listener port dynamically, but keep 3000 as backup).
    *   `SESSION_SECRET` = `[Generate a long random secure string]`
    *   `DATABASE_PATH` = `./storage/database.sqlite`
    *   `BACKUP_DIR` = `./storage/backups`
    *   `EXPORTS_DIR` = `./storage/exports`
    *   `UPLOADS_DIR` = `./storage/uploads`
3.  Execute the migration and seed scripts to bootstrap the fresh database:
    *   Under the **Execute Command** dialog box, run:
        ```bash
        node server/db/migrate.js
        ```
    *   Followed by:
        ```bash
        node server/db/reset.js
        ```
        *(This populates initial admin profiles and default settings).*

### Step D: Rewrite Redirect Rules for React Router SPA (if applicable)
If you encounter a `404 Not Found` when refreshing internal React Router paths (e.g., `/dashboard` or `/invoices`), verify that the Passenger server configuration delegates non-API routing to the catch-all Express router `app.get('*')`. Ensure your `.htaccess` rules redirect queries to `app.js`.

---

## 3. Smoke Test Validation Checklist

Once deployed, execute these sanity checks to verify the monolith status:

1.  **Health Check Smoke Test:**
    *   Navigate to: `https://[your-domain]/api/health`
    *   *Verification:* Expect a `200 OK` JSON response with status `"healthy"`, environment `"production"`, and all storage adapters mapped to `"initialized"` or `"accessible"`.
2.  **Dashboard Login:**
    *   Open `https://[your-domain]/login` (expect standard Arabic login panel).
    *   Log in using the default seeded administrator account.
3.  **Authentication Guard Session:**
    *   Hit: `https://[your-domain]/api/auth/me`
    *   *Verification:* Expect returned profile JSON listing credentials and assigned roles/permissions matrix.
4.  **UI Component Validation:**
    *   Inspect dashboard metrics (expect live totals).
    *   Navigate to `/inventory`, `/shipments`, and `/reports` tabs. Click filter actions and trigger CSV exports to confirm file downloads execute cleanly.

---

## 4. Troubleshooting & Maintenance

*   **Logs Location:** Node.js logs are usually piped to `/home/[username]/logs/` or downloadable via the DirectAdmin Passenger management portal.
*   **Database Backups:** Scheduled database backups can be taken by executing `npm run backup` which creates SQL/file clones in `storage/backups/`.
