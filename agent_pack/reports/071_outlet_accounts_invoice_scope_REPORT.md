# Step Completion Report

## Selected step

- ID: 071
- Title: Outlet Accounts Invoice Scope
- Status: done

## Summary

Implemented scoped access control and user account association for Outlets in the Hamza Printing Press Bookstore Manager system. Outlet users now have their access scoped dynamically to the outlets they are linked to. Scoped users can only view their own invoices, payments, shipments, and ledger balances. A super admin or staff user can associate user accounts with outlets via a new dropdown field in the Outlet Creation and Update forms.

## Files changed

- `server/db/migrations/005_outlet_users.sql` [NEW] — Defines the `outlet_users` table structure to map user accounts to outlets.
- `server/modules/outlets/outletsService.js` [MODIFY] — Modified to support mapping users to outlets, filtering list results by user, and returning associated user details. Added `getLinkedOutletsForUser`.
- `server/modules/outlets/outletsRoutes.js` [MODIFY] — Added `usersService` import. Added scoping checks for `GET /` and `GET /:id` to restrict non-elevated user access to linked outlets.
- `server/modules/invoices/invoicesService.js` [MODIFY] — Added `outletIds` parameter to `getInvoices` to support array filtering.
- `server/modules/invoices/invoicesRoutes.js` [MODIFY] — Restricted `GET /` and `GET /:id` to query only the user's linked outlets when they are non-elevated.
- `server/modules/payments/paymentsService.js` [MODIFY] — Added `outletIds` filtering to `getPayments`.
- `server/modules/payments/paymentsRoutes.js` [MODIFY] — Scoped list payments endpoint `GET /` to user's linked outlets.
- `server/modules/shipments/shipmentsService.js` [MODIFY] — Added `outletIds` filtering to `getShipments`.
- `server/modules/shipments/shipmentsRoutes.js` [MODIFY] — Scoped shipment list and detailed view endpoints.
- `server/modules/finance/financeService.js` [MODIFY] — Scoped `getFinanceSummary`, `getLedgerHistory`, and `getBalancesByOutlet` to only summarize data of the user's linked outlets.
- `server/modules/finance/financeRoutes.js` [MODIFY] — Scoped finance summaries, ledger history, and outlet balance lists.
- `server/modules/outlets/outletsRoutes.test.js` [MODIFY] — Appended integration test case to verify scoped access control.
- `client/src/pages/Outlets.jsx` [MODIFY] — Added React UI state and logic for selecting linked user accounts in the editor drawer, added linked user display column to the table list, and updated submit payload.

## Database changes

- Tables: `outlet_users` (new table mapping many-to-many relationship between `outlets` and `users`).
- Migrations: `005_outlet_users.sql`
- Seeds: N/A
- Notes: Standard SQLite foreign key constraints and cascade deletes are enabled.

## API changes

- Endpoint: `/api/outlets`
  - Method: GET, POST, PUT
  - Permission: `outlets.view`, `outlets.create`, `outlets.update`
  - Notes: Scoped to user's linked outlets if user does not hold an elevated role. Accepts `userId` in POST/PUT payload.
- Endpoint: `/api/invoices`
  - Method: GET
  - Permission: `invoices.view`
  - Notes: Non-elevated users are restricted to viewing invoices of their own outlets.
- Endpoint: `/api/payments`
  - Method: GET
  - Permission: `payments.view`
  - Notes: Restricts payments list to payments made on invoices belonging to the user's linked outlets.
- Endpoint: `/api/shipments`
  - Method: GET
  - Permission: `shipments.view`
  - Notes: Filters shipments to shipments made for invoices belonging to the user's linked outlets.
- Endpoint: `/api/finance`
  - Method: GET
  - Permission: `finance.view`
  - Notes: Restricts summary, ledger history, and outlet balance details to the user's linked outlets.

## UI changes

- Page/component: `client/src/pages/Outlets.jsx`
- Notes:
  - Added user account selector select field dropdown in creation & edit modal drawer.
  - Added "الحساب المرتبط" (Linked Account) column displaying the user's name/username.
  - Localization defaults set to Egypt (Cairo governorate by default).

## Commands run

| Command | Exit code | Notes |
|---|---:|---|
| `node -v; npm -v` | 0 | Checked node (v22.18.0) and npm (11.6.4) versions |
| `node server/db/migrate.js` | 0 | Ran database migrations successfully |
| `npm run build` | 0 | Built frontend bundle with Vite |
| `npm test` | 0 | Ran Jest test suite, all 145 unit and integration tests passed |
| `npm run smoke` | 0 | Ran health check smoke test successfully |
| `npm run lint` | 0 | Verified code style and logic cleanliness |

## Verification result

- Build: Successful client compilation to `public/` directory.
- Tests: 24 test suites passed (145 tests total).
- Lint: 26 warnings (0 errors).
- DB: Migrated database schema successfully.
- Smoke: Health check verification passed (Response code: 200, status: healthy).

## Deployment impact

- None. Table `outlet_users` will be automatically generated upon running `npm run db:migrate` in production.

## Risks / blocked items

- None.

## Next step

- Next step ID/title: 072 — Balance Finance Ledger Full Reconciliation

## Stop confirmation

Only one step was executed in this run.
