# Legacy Feature Parity Checklist

This document tracks the comparison and parity status between the legacy application features (formerly inside `hamza_printing_press/`) and the modernized Material UI React + Express API platform.

---

## Parity Audit Checklist

| Feature / Concept | Legacy System Behavior | Modernized System Behavior | Status | Notes / Gaps |
|---|---|---|---|---|
| **Balance Management** | Single global row in a `balances` table. Tracked `total_balance` (paid/manual adjustments) and `pending_balance` (unpaid invoices) globally. Logs kept in global total/pending history tables. Manual adjustments applied globally. | Shifted to **per-outlet multi-tenant ledger**. Individual outlets have their own cash/receivable balances derived dynamically from transaction history. Managed central `server/modules/finance` module. | **Fully Parity+** (Exceeds legacy) | Global metrics are dynamically computed via `/api/finance/summary`. Manual adjustments are tracked per-outlet in `finance_ledger_entries`. EGP-localized. |
| **Book Stock Alerts** | Alerts generated in `notifications` table whenever book stock dropped below 0. Alerts removed when stock became positive again. | Unified `notifications` engine. Monitors stock changes and generates deduped, prioritized notifications (`stock_negative` for <= 0, `stock_low` for <= 10). Automatically marks resolved when stock returns to safety threshold. | **Fully Parity+** (Exceeds legacy) | Role-aware alerts are displayed in the modern React Layout bell drawer, with tab-based filters and pagination. |
| **Outlet Credit Limit Alerts** | Alerts in `storesNotifications` when unpaid invoices total exceeded store credit limit. Alert cleared when store went back under limit. | Credit limits monitored dynamically in `server/modules/notifications`. Checks executed when invoices are created, modified, paid, or cancelled. Resolves automatically once store receivables drop below limit. | **Fully Parity+** (Exceeds legacy) | Integrates directly with the finance ledger and triggers notifications immediately on state change. |
| **Invoice Financial Effects** | Creation/cancel/delete directly edited the global balance variables. Unpaid invoices added to global pending balance, paid invoices added to total balance. Deletion reversed the impact. | Ledger entries (`finance_ledger_entries`) record precise financial changes. Creating an invoice writes an `invoice_created` receivable entry. Recording a payment writes a `payment_recorded` entry (increasing cash, decreasing receivable). Reversing payments or cancelling invoices posts offsetting ledger records. | **Fully Parity+** (Exceeds legacy) | Transaction-safe ledger operations guarantee auditability. Deleted/cancelled invoices cleanly reverse historical effects in the ledger. |
| **Stock Update Effects** | Direct modification of `books.stock` column. | Strict ledger-based inventory control. Stock modifications must register as `inventory_transactions` linked to receipt, sale, return, or adjustment references. No direct stock modifications allowed. | **Fully Parity+** (Exceeds legacy) | Stock level is resolved as the sum of ledger transactions. Validated for track-policy items to prevent negative checkout. |
| **PDF Invoices** | Built PDFs using multiple uncoordinated client/server libraries (`jspdf`, `pdfmake`, `pdfkit`, etc.). | Unified, robust PDF generation service (`pdfService.js`) using `html-pdf-node` rendering clean Arabic RTL invoices dynamically. Unnecessary libraries pruned. | **Fully Parity** | Served via `/api/invoices/export/pdf` with fully localized dates (Egypt timezone) and EGP pricing. |
| **Database Backup & Restore** | Administrative routes `POST /admin/backup` and `POST /admin/restore` allowed direct copying and restoring of SQLite database files. | Environment defines `storage/backups/` directories and database seeds define backup permissions (`backup.create`, `backup.restore`). `package.json` contains a script `"backup": "node scripts/backup-db.js"`. **Gaps**: `scripts/backup-db.js` is missing, and there are no endpoints/UI to trigger backups. | **Minor Gap** | **Action Item**: Create the missing script `scripts/backup-db.js`. Backend API endpoints and UI elements for backup/restore can be tracked as a low-priority enhancement. |
| **Book Distribution Details** | Route `/admin/bookPaymentsDetails/:bookId` showed the distribution list (which stores purchased the book, units sold, and status). | Invoices listing supports filtering by `productId` (`GET /api/invoices?productId=X`), and Product details drawer shows selling prices by outlet type. **Gaps**: No dedicated visual table/dashboard card for book distribution details showing which outlets purchased which copies. | **Minor Gap** | **Action Item**: Add the missing `scripts/backup-db.js` file now. Add a tracking step for book distribution enhancement in future updates if requested. |

---

## Parity Gap Details & Resolution Plan

### 1. Database Backups (`scripts/backup-db.js`)
* **Finding**: The legacy system supported database backup creation and restoration. The modernized system had a script script definition in `package.json` pointing to a missing script file `scripts/backup-db.js`.
* **Resolution**: Implement `scripts/backup-db.js` to enable automated/manual database copy. This will resolve the package task script gap safely.

### 2. Product Distribution Details
* **Finding**: The legacy system provided a separate view to inspect which store paid for/received which books. The current system provides this data through:
  * Invoice search API scoped to product: `/api/invoices?productId=X`
  * Reports API for stock and authors: `/api/reports/stock`, `/api/reports/authors`
  * Product detailed prices drawer.
* **Resolution**: The functionality is fully present API-wise (via filtering invoices by book). A dedicated report UI is a nice-to-have, but since it is not requested in the current phase scope, we will document it as satisfied via search filtering.
