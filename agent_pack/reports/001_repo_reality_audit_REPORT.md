# Step Completion Report

## Selected step

- ID: 001
- Title: Repo Reality Audit
- Status: done

## Summary

Performed a comprehensive audit of the existing repository. The legacy codebase lives entirely inside `hamza_printing_press/` and consists of a Node.js/Express server with static HTML/Vanilla JS dashboards, SweetAlert-heavy client-side code, and an SQLite database. No React, Vite, or MUI code exists yet. No `.env`, `.gitignore`, tests, linting, build scripts, or migration system exist. Authentication uses hardcoded credentials with a simple role check middleware.

---

## Repo Structure Audit

```
Book-Store-Public/
├── agent_pack/              # Modernization pack (40 steps, docs, templates)
└── hamza_printing_press/    # ← Entire legacy application
    ├── app.js               # Main Express entry point (143 lines)
    ├── package.json         # Dependencies and single "start" script
    ├── package-lock.json
    ├── config/
    │   └── dbConfig.js      # SQLite connection singleton
    ├── controllers/
    │   ├── adminController.js   (35,754 bytes)
    │   ├── staffController.js   (30,396 bytes)
    │   └── visitorController.js (9,818 bytes)
    ├── models/
    │   ├── bookModel.js     # books, notifications tables
    │   ├── storeModel.js    # stores, storesNotifications tables
    │   ├── invoiceModel.js  # invoices, invoice_books tables
    │   └── balanceModel.js  # balances, total/pending_balance_history tables
    ├── routes/
    │   ├── adminRoutes.js   # /admin/* routes
    │   ├── staffRoutes.js   # /staff/* routes
    │   └── visitorRoutes.js # /visitor/* routes
    ├── views/
    │   ├── admin-dashboard.html
    │   ├── staff-dashboard.html
    │   └── visitor-dashboard.html
    ├── public/
    │   ├── index.html       # Login page (Arabic RTL)
    │   ├── css/style.css    # Single stylesheet (17,982 bytes)
    │   └── js/
    │       ├── main.js      # Logout + menu z-index handler
    │       ├── admin.js     # Admin dashboard logic (151 KB!)
    │       ├── staff.js     # Staff dashboard logic (128 KB!)
    │       └── visitor.js   # Visitor dashboard logic (50 KB!)
    ├── db/
    │   ├── bookstore_manager.db  # Live SQLite database (139 KB)
    │   └── backup/
    │       └── backup.db         # Manual backup copy (135 KB)
    ├── fonts/
    │   ├── Amiri-Bold.ttf
    │   ├── Amiri-Regular.ttf
    │   ├── Cairo-Bold.ttf
    │   └── Cairo-Regular.ttf
    ├── invoices/             # Empty directory (likely for generated PDFs)
    └── node_modules/
```

---

## Framework Detection

| Component | Current | Target |
|---|---|---|
| Runtime | Node.js v22.18.0 | Node.js (same) |
| Package manager | npm 11.6.4 | npm (same) |
| Backend framework | Express 4.x | Express (keep) |
| View engine | None (static HTML served via sendFile) | React/Vite/MUI |
| Database | SQLite3 (file-based, `db/bookstore_manager.db`) | SQLite (fresh schema) |
| Frontend | Vanilla JS + SweetAlert (CDN, inline in HTML) | React + Material UI |
| CSS | Single `style.css` | MUI theme (RTL) |
| Auth | Hardcoded credentials in `app.js` | RBAC with bcrypt/JWT |
| Session | express-session (in-memory, insecure secret) | Secure session store |
| PDF | Multiple libs: html-pdf-node, pdfkit, pdfmake, jspdf, puppeteer | Consolidate |

---

## Database Schema (Legacy)

Tables created programmatically via model files (no migration system):

| Table | Source | Columns |
|---|---|---|
| `books` | bookModel.js | id, title, author, price, stock, category |
| `notifications` | bookModel.js | id, book_id, message, created_at |
| `stores` | storeModel.js | id, name, location, store_limit |
| `storesNotifications` | storeModel.js | id, store_id, book_id, message, created_at |
| `invoices` | invoiceModel.js | id, store_id, total_price, payment_status, shipping_status, shipping_cost, created_at, payment_date, shipping_date |
| `invoice_books` | invoiceModel.js | id, invoice_id, book_id, quantity, price |
| `balances` | balanceModel.js | id, total_balance, pending_balance, last_updated |
| `total_balance_history` | balanceModel.js | id, type, amount, previous_balance, new_balance, note, createdAt |
| `pending_balance_history` | balanceModel.js | id, type, amount, previous_balance, new_balance, note, createdAt |

**Key observations:**
- No `users`, `roles`, or `permissions` tables—auth is hardcoded
- No `authors` table—author is a TEXT column on `books`
- No `outlet_types` table—stores have no type system
- No product pricing per outlet type—single price per book
- No inventory ledger/receipts—stock is directly modified on `books.stock`
- No shipment tracking tables
- No audit log table
- Balance is a single global row, not per-outlet

---

## Route Map

### Login/Auth (app.js)
| Method | Path | Handler |
|---|---|---|
| POST | `/login` | Hardcoded credentials check |
| GET | `/login` | Serve `public/index.html` |
| GET | `/logout` | Session destroy |

### Admin Routes (`/admin/*`)
| Method | Path | Action |
|---|---|---|
| GET | `/admin` | Serve admin-dashboard.html |
| POST | `/admin/backup` | Copy DB file |
| POST | `/admin/restore` | Restore DB from backup |
| POST | `/admin/addBook` | Add book |
| PUT | `/admin/updateBook/:id` | Update book |
| DELETE | `/admin/deleteBook/:id` | Delete book |
| GET | `/admin/getBooks` | List books |
| POST | `/admin/addStore` | Add store |
| PUT | `/admin/updateStore/:id` | Update store |
| DELETE | `/admin/deleteStore/:id` | Delete store |
| GET | `/admin/getAllStores` | List stores |
| POST | `/admin/createInvoice` | Create invoice |
| GET | `/admin/getStoreById/:id` | Get store |
| GET | `/admin/getUnpaidInvoicesTotal/:id` | Unpaid total |
| POST | `/admin/checkUpdateInvoiceLimit/:id` | Update with limit check |
| GET | `/admin/getInvoices` | List invoices |
| GET | `/admin/getInvoiceById/:id` | Get invoice |
| PUT | `/admin/updateInvoice/:id` | Update invoice |
| DELETE | `/admin/deleteInvoices` | Batch delete |
| POST | `/admin/exportInvoicesToPDF` | Export PDF |
| POST | `/admin/manualBalanceUpdate` | Manual balance change |
| GET | `/admin/GetTotalBalanceHistory` | Balance history |
| GET | `/admin/GetPendingBalanceHistory` | Pending history |
| GET | `/admin/GetTotalBalance` | Current total |
| GET | `/admin/GetPendingBalance` | Current pending |
| GET | `/admin/notifications` | Book notifications |
| GET | `/admin/storeNotifications` | Store notifications |
| GET | `/admin/bookPaymentsDetails/:bookId` | Book distribution |

### Staff Routes (`/staff/*`)
Subset of admin: books (read), stores (CRUD), invoices (CRUD), PDF export, notifications. No balance management.

### Visitor Routes (`/visitor/*`)
Read-only: books, stores, invoices, PDF export, book details.

**Key issue:** Routes are NOT under `/api/*` as required by the target architecture. They are under role-prefixed paths (`/admin/`, `/staff/`, `/visitor/`).

---

## Security Risks

| Risk | Severity | Detail |
|---|---|---|
| **Hardcoded credentials** | 🔴 Critical | `admin`/`912Isk912`, `staff`/`omar.mariam`, `visitor`/`visit2025` in `app.js` line 100-111 |
| **Hardcoded session secret** | 🔴 Critical | `'your_secret_key'` in `app.js` line 38 |
| **No .env file** | 🟠 High | All configuration is inline |
| **No .gitignore** | 🟠 High | `node_modules/`, `db/*.db`, secrets all committable |
| **Database in repo** | 🟠 High | SQLite file with real data inside repository |
| **Backup DB in repo** | 🟠 High | `db/backup/backup.db` also committed |
| **No password hashing** | 🔴 Critical | Credentials are plaintext strings |
| **No RBAC** | 🟠 High | Role check is just session.user.role string match |
| **No CSRF protection** | 🟡 Medium | No CSRF tokens used |
| **Date.prototype.toISOString overridden** | 🟡 Medium | Global prototype pollution in both server and client |
| **In-memory sessions** | 🟡 Medium | Sessions lost on restart |
| **MySQL dependency unused** | 🟡 Low | `mysql` in package.json but SQLite is used |
| **Redundant body parsing** | 🟡 Low | Both `body-parser` and `express.json()` registered |

---

## Static Assets

| Asset | Size | Notes |
|---|---|---|
| `public/css/style.css` | 18 KB | Single CSS file, Arabic RTL styles |
| `public/js/admin.js` | 151 KB | Massive single file with all admin logic + SweetAlert |
| `public/js/staff.js` | 128 KB | Similar, duplicated logic |
| `public/js/visitor.js` | 51 KB | Read-only version |
| `public/js/main.js` | 1 KB | Logout handler + menu utility |
| `fonts/` | 1.25 MB | Amiri + Cairo Arabic fonts for PDF |

**Observation:** JS files are extremely large monoliths (151KB admin.js) with heavy SweetAlert usage and extensive DOM manipulation. These will be replaced entirely by React components.

---

## Package Dependencies

### Currently used
- `express` — Web framework
- `express-session` — Session management
- `sqlite3` — Database driver
- `bcrypt` — Listed but NOT actually used in code (credentials are hardcoded)
- `luxon` — Timezone handling (Africa/Cairo)
- `body-parser` — Request parsing (redundant with express.json)

### PDF-related (5 different libraries!)
- `html-pdf-node` — HTML to PDF
- `pdfkit` — PDF generation
- `pdfmake` — PDF generation
- `jspdf` + `jspdf-autotable` — Client-side PDF
- `puppeteer` — Headless Chrome for PDF/screenshots

### Other
- `axios` — HTTP client (unclear usage)
- `cheerio` — HTML parsing
- `css-select` — CSS selector engine
- `html2canvas` — Screenshots
- `jsdom` — DOM emulation
- `jsonwebtoken` — Listed but NOT used (no JWT auth)
- `lodash.pick` — Object utility
- `node-fetch` — HTTP fetch
- `ws` — WebSocket (unclear usage)

### Missing (needed for target)
- No React / Vite / Material UI
- No eslint / prettier
- No test framework (jest/vitest)
- No migration runner (knex/umzug)
- No concurrently for dev mode

---

## Package Scripts

```json
{
  "start": "node app.js"
}
```

Only one script. No `dev`, `build`, `test`, `lint`, `db:migrate`, or `db:reset`.

---

## Deployment Assumptions

| Aspect | Current | Target |
|---|---|---|
| Entry point | `hamza_printing_press/app.js` | Root `app.js` |
| Port | 3000 (hardcoded fallback) | From `.env` |
| Static files | `public/` (login + CSS/JS) | `public/` (React build) |
| Views | `views/*.html` via `sendFile` | React SPA |
| Database location | `db/bookstore_manager.db` | `storage/database.sqlite` |
| Deployment | Unknown (likely manual upload) | DirectAdmin Node.js app |

**Critical gap:** The entire app is nested inside `hamza_printing_press/` rather than at repo root. The target architecture expects `app.js` at root level.

---

## Files changed

- `agent_pack/status.json` — Updated step 001 to `done`, step 002 to `open`
- `agent_pack/reports/001_repo_reality_audit_REPORT.md` — This report (new file)

## Database changes

- Tables: None (audit only)
- Migrations: None
- Seeds: None
- Notes: No database modifications were made during this audit step

## API changes

- Endpoint: None
- Method: None
- Permission: None
- Notes: No API modifications were made during this audit step

## UI changes

- Page/component: None
- Notes: No UI modifications were made during this audit step

## Commands run

| Command | Exit code | Notes |
|---|---:|---|
| `node -v` | 0 | v22.18.0 |
| `npm -v` | 0 | 11.6.4 (via `cmd /c npm -v` due to PS execution policy) |

**Note:** `npm run build`, `npm test`, `npm run lint`, `npm run db:migrate` are all unavailable — only `npm start` exists.

## Verification result

- Build: N/A — no build script exists
- Tests: N/A — no test framework or tests exist
- Lint: N/A — no linter configured
- DB: N/A — no migration system; tables created programmatically on startup
- Smoke: Not run — this is an audit step with no code changes

## Deployment impact

No deployment changes made. This step is audit-only.

## Risks / blocked items

1. **Repo structure:** All code is nested in `hamza_printing_press/` — needs to be reorganized to root level per target architecture
2. **Hardcoded credentials:** Must be replaced with proper auth before any production deployment
3. **No .gitignore:** Database files, node_modules, and secrets are likely in version control
4. **Five PDF libraries:** Need consolidation to reduce bundle size and maintenance burden
5. **Massive JS files:** admin.js (151KB), staff.js (128KB) are monolithic and will need full replacement
6. **Global Date.prototype pollution:** `toISOString` is overridden globally — may cause subtle bugs
7. **PowerShell execution policy:** npm commands must be run via `cmd /c` on this system
8. **No .env or config management:** All config is hardcoded inline

## Next step

- Next step ID/title: 002 — Target Architecture Plan

## Stop confirmation

Only one step was executed in this run.
