# DirectAdmin Deployment & Handoff Guide

This guide describes the deployment architecture, configuration parameters, database management instructions, and quality checklists for hosting the Bookstore Manager Modernized application on a DirectAdmin single Node.js monolith environment.

---

## 1. Single Node.js Monolith Architecture

To keep hosting simple, the application is deployed as a single Express.js Node application. There are no separate client and server processes in production.
- **Express Backend:** Serves the `/api/*` endpoints (e.g., authentication, catalog, finance, shipments, inventory, exports, and reports).
- **Vite React Frontend:** Built into the root `public/` directory. Express automatically serves all static assets from `public/` and falls back to `public/index.html` for client-side React Routing (RTL, Cairo visual system, light/dark mode).
- **Storage Safety:** SQLite database and backup folders are kept completely outside `public/` to prevent HTTP accessibility.

```
┌────────────────────────────────────────────────────────┐
│               DirectAdmin Node.js Server               │
│                                                        │
│   ┌────────────────────────────────────────────────┐   │
│   │                 Express.js                     │   │
│   │                                                │   │
│   │   ┌───────────────┐        ┌───────────────┐   │   │
│   │   │ /api/* Routes │        │ Static Assets │   │   │
│   │   └───────────────┘        └───────┬───────┘   │   │
│   └───────────┬────────────────────────┼───────────┘   │
│               │                        │               │
│      ┌────────▼────────┐      ┌────────▼────────┐      │
│      │ SQLite Database │      │  public/ Assets │      │
│      │ (storage/db)    │      │  (React Bundle) │      │
│      └─────────────────┘      └─────────────────┘      │
└────────────────────────────────────────────────────────┘
```

---

## 2. Directory Structure

```txt
├── app.js                          # Node server entry point
├── package.json                    # Backend dependencies & script tasks
├── package-lock.json
├── .env                            # Server environment parameters
├── server/                         # Backend Application Code
│   ├── config/                     # Configuration loader
│   ├── db/                         # SQLite connection, migration runner, seeds
│   │   ├── migrations/             # SQL migration files (001_initial, etc.)
│   │   └── seeds/                  # Seeding logic (fresh admin seed only)
│   └── modules/                    # Grouped functional API components (auth, products, etc.)
├── client/                         # Frontend Application Code (React + Vite + MUI)
│   ├── src/                        # Component assets, page routers, layout drawers
│   ├── vite.config.js              # Vite packaging config
│   └── package.json                # Frontend dependencies
├── public/                         # Vite output directory (express serves static from here)
│   ├── assets/                     # Minified client CSS and JS chunks
│   └── index.html                  # React SPA HTML entry point
└── storage/                        # Persistent Storage Folder (MUST be outside public/)
    ├── database.sqlite             # Primary SQLite database file
    ├── backups/                    # Excel/DB backup archive
    ├── uploads/                    # Physical file uploads/attachments
    └── exports/                    # Generated excel sheets and reports
```

---

## 3. Storage Safety & Security Rules

> [!CAUTION]
> **Data Exposure Risk:** Never configure or move the `storage/` folder inside `public/`. If backups or SQLite databases reside inside `public/`, remote clients could directly download private database states via simple browser URLs (e.g. `http://domain.com/database.sqlite`). Keep it at the root folder level.

- Ensure directory permissions for `storage/` are set to `755` or `700` so that only the local Node process owns write/read capabilities.

---

## 4. Environment Variables (`.env`)

Configure the following environment parameters inside the `.env` file at the root folder:

```env
# Application Host Configuration
NODE_ENV=production
PORT=5000

# Security Credentials
SESSION_SECRET=a_very_secure_random_hash_for_sessions_2026_modernized

# SQLite Storage Configurations (Use absolute paths on production)
DATABASE_PATH=/home/username/nodeapp/storage/database.sqlite

# Super Admin Default Seeding Credentials (Used during db:reset)
SUPER_ADMIN_USERNAME=admin
SUPER_ADMIN_PASSWORD=912Isk912
```

---

## 5. DirectAdmin Setup Walkthrough

1. **Log in** to your DirectAdmin Control Panel.
2. Search and click on **Setup Node.js App** (powered by Phusion Passenger).
3. Click **Create Application** and fill out the parameters:
   - **Node.js Version:** Select `20.x` or `22.x` (LTS).
   - **Application Mode:** Select `Production`.
   - **Application Root:** Set the absolute path to your upload directory (e.g. `nodeapp`).
   - **Application URL:** The domain/subdomain pointing to your application.
   - **Application Startup File:** Set this exactly to `app.js`.
4. Click **Create** to bootstrap the application.
5. In the **Environment variables** section, add keys for `NODE_ENV`, `SESSION_SECRET`, and `DATABASE_PATH` as defined above.

---

## 6. Fresh Start Setup Commands

To deploy the application cleanly from absolute zero data:

1. **Upload Files:** Upload the repository folder (exclude `node_modules` and `client/node_modules`).
2. **Enter SSH Console:** Log in via SSH and navigate to the Application Root:
   ```bash
   cd /home/username/nodeapp
   ```
3. **Install Dependencies:**
   ```bash
   # Install backend dependencies
   npm install --production=false
   
   # Install client dependencies
   npm install --prefix client
   ```
4. **Reset & Seed Database:** Run this command to wipe old files, run migrations, and seed only the permission matrix and a single Super Admin account:
   ```bash
   npm run db:reset
   ```
5. **Compile Client Frontend:** Build the React + Vite bundle and output it directly to `public/`:
   ```bash
   npm run build
   ```
6. **Restart Application:** Click the **Restart** button in the DirectAdmin Node.js App panel, or touch the passenger indicator file:
   ```bash
   mkdir -p tmp && touch tmp/restart.txt
   ```

---

## 7. Update & Redeployment Sequence

To push incremental upgrades to an existing deployment safely:

1. **Backup SQLite Database:** Create a point-in-time snapshot of the database:
   ```bash
   npm run backup
   ```
2. **Pull Updates:** Pull down changes from the git branch or upload replacement files.
3. **Re-install Dependencies:**
   ```bash
   npm install
   npm install --prefix client
   ```
4. **Execute Database Migrations:** Run pending database adjustments:
   ```bash
   npm run db:migrate
   ```
5. **Re-build Client Frontend:**
   ```bash
   npm run build
   ```
6. **Restart Passenger Process:**
   ```bash
   touch tmp/restart.txt
   ```

---

## 8. Final Handoff Checklist & Verification

Follow these verification checks to sign off on a successful deployment:

- [ ] **API Health Check:** Access `http://domain.com/api/health`. Validate that status is `"healthy"` and storage states read `"initialized"` or `"accessible"`.
- [ ] **Client Login:** Access `http://domain.com/login`. Sign in using the seeded super admin credentials.
- [ ] **Credentials Change:** Navigate to the user profile dashboard and change the super admin password from the default seed value to a strong credentials hash.
- [ ] **Create Catalog Metadata:** Navigate to **Outlet Types** and create the first commercial price categories (e.g. wholesale, retail, retail-expo).
- [ ] **Mount Outlets:** Create a sample outlet and link it to the newly defined outlet type.
- [ ] **Mount Catalog Products:** Add a catalog book product and assign prices for the defined outlet types.
- [ ] **Invoice Verification:** Create a test sales invoice for the outlet and verify the resolved snapshot pricing is applied, stock numbers decrement, and payments calculations calculate the remaining balance correctly.