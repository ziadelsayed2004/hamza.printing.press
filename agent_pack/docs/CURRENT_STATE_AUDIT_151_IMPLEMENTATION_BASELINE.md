# Baseline Repository Audit & Status Verification (Step 151)
**مطبعة حمزة — Unified Bookstore Manager**

This document serves as the implementation baseline and contract for the newly opened phase (Steps 152–158). It outlines the exact delta between the current repository state and target product features.

---

## 1. Feature-by-Feature Repository Analysis

### A. Invoice Action Handoff to Payments, Shipping, and Returns
*   **What Already Exists:**
    *   `client/src/pages/Invoices.jsx` supports navigation to shipping creation via `navigate('/shipments?invoiceId=${row.id}&action=create')`.
    *   `client/src/pages/Payments.jsx` parses query parameters `invoiceId` and `action=create` to pre-open the payment drawer via `handleOpenAddPayment(invId)`.
    *   Backend routes `/api/payments` support basic metrics and invoice details fetching.
*   **What is Missing:**
    *   Inline payment drawers/forms in `Invoices.jsx` (`openPayDrawer`, `handleSubmitPayDrawer`) must be removed to avoid duplicate logic and ensure the invoice page does not silently create payment records.
    *   The "pay" button on the Invoices page must hand off to `/payments?invoiceId=<id>&action=create`.
    *   Local return creation inside the Invoices return drawer (`openReturnDrawer`) exists but must be integrated cleaner, or redirected to returns deep links if returns are unified. Since no standalone `/returns` page exists, the returns creation logic must remain in `Invoices.jsx` but be fully integrated with ledger/recalculations (or a return page created if requested).

### B. Payment Receipt Upload, Display, and Download
*   **What Already Exists:**
    *   `paymentsService.js` supports receipt file upload in `recordPayment` by parsing Base64 `receiptData` and writing to disk.
    *   Receipt files are downloadable via `GET /api/payments/:id/receipt`.
    *   `Payments.jsx` has a file selector that reads files as Base64 data URLs.
*   **What is Missing:**
    *   The file upload storage directory is hardcoded in `paymentsService.js` to `D:/Projects/BookStore Manager/storage/receipts`, which will crash on production or non-Windows filesystems. This must be changed to dynamic configuration or workspace-relative storage.

### C. Receipt Review UI Removal
*   **What Already Exists:**
    *   Receipt status defaults to `'approved'` directly on creation.
    *   The frontend contains leftover elements like `receipt_status === 'pending_review'`, `Chip` labels for `معتمد` / `مرفوض`, and calls to `fetchReviewQueue`.
*   **What is Missing:**
    *   Total removal of review queue UI sections, approval buttons, and references to `fetchReviewQueue` in the UI to keep it simplified as upload/download-only.

### D. Partial Shipping Lifecycle
*   **What Already Exists:**
    *   `shipmentsService.js` validates remaining shippable quantities per invoice item.
    *   `Shipments.jsx` supports deep link prefilling and partial quantities selector.
*   **What is Missing:**
    *   The UI lacks direct ways to transition shipment statuses (e.g. `shipped` / `delivered`) in a polished workflow.

### E. Full/Partial Returns Recalculation
*   **What Already Exists:**
    *   `returnsService.js` creates return logs, increases product stock, and logs a negative transaction inside `finance_ledger`.
*   **What is Missing:**
    *   We need stronger financial constraints: returns must not credit more than the billable amount remaining on an invoice item.
    *   Proper alignment with free/complimentary quantities (so returning free items only replenishes stock without issuing financial credit).

### F. Free/Complimentary Invoice Quantities
*   **What Already Exists:**
    *   Nothing in the active codebase. References are only in steps and docs.
*   **What is Missing:**
    *   A database migration to add `free_quantity` to the `invoice_items` table.
    *   Backend logic updates in `invoicesService.js` to decrement inventory by the physical total (`quantity + free_quantity`), but charge the outlet based only on the billable amount (`quantity * price`).
    *   Frontend updates in `Invoices.jsx` wizard and details modal to expose free books fields and calculations.
    *   PDF and CSV export adjustments.

### G. Filter-First Exports & Courier Sheets
*   **What Already Exists:**
    *   `exportsService.js` generates raw Arabic CSV sheets with basic filters.
*   **What is Missing:**
    *   Exporting professional Excel books rather than CSVs (incorporating headers, grid formatting, and totals).
    *   A specific "Courier Delivery Sheet" containing shipping addresses, governorates, phone numbers, quantities, and notes.

### H. Custom Roles Management (RBAC)
*   **What Already Exists:**
    *   Roles (`super_admin`, `admin`, `accountant`, etc.) exist in seed files and database.
    *   `rolesService.js` contains functions to assign role permissions and list roles/permissions.
*   **What is Missing:**
    *   The API and UI lack a way to create, edit, or archive custom roles. Right now, only pre-seeded roles can be assigned to users.
    *   Permissions must be mapped to all sensitive invoice/payment/shipping/return actions.

### I. Material UI Responsive Polish
*   **What Already Exists:**
    *   MUI drawers, tables, and dialogs are layout-configured, but styled with some hardcoded CSS or heavy inline `sx` objects.
*   **What is Missing:**
    *   Review of responsiveness across tablet/mobile devices.
    *   Resolving the quality gate violations (heavy `sx` in `Exports.jsx` and `!important` tags in `MainLayout.css`).

---

## 2. Directory & Path Verification

*   **Database Migrations:** `server/db/migrations/` contains SQL files from `001_initial_schema.sql` to `013_new_roles_and_permissions.sql`.
*   **Backend Modules:** Located directly in `server/modules/*` (no `server/src/` nested paths exist).
*   **Vite Frontend Pages:** Located in `client/src/pages/*`.
*   **CSS Styles:** Located in `client/src/styles/*` and page-specific CSS files in `client/src/pages/*.css`.
*   **Uploads Dir Target:** Should be resolved dynamically relative to workspace or via config.

---

## 3. Verification Command Status

*   `node scripts/style_quality_gate.js` -> Fails with 2 violations (Heavy `sx` in `Exports.jsx` and `!important` in `MainLayout.css`).
*   `npm run build` -> Succeeds.
*   `node scripts/test_runner.js` -> 28 test suites, 178 tests passed.
