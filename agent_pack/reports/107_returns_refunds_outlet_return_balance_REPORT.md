# Step Completion Report

## Selected step

- ID: 107
- Title: Returns/Refunds + Outlet Return Balance
- Status: done

## Summary

Implemented a fully integrated returns and refunds system to allow products to be returned from non-cancelled invoices. The returns system links return records to the invoice, outlet, products, and quantities. Return values are calculated dynamically using the original invoice's item pricing snapshots. Upon approval (which is set by default upon recording), the return increases inventory for books with a `track` stock policy, adds a `return_created` entry in the outlet's financial statement ledger (with negative receivable_amount), and updates the outlet statement and credit limit net exposure dynamically. In the frontend, the placeholder return drawer in the Invoices page has been completely implemented, allowing users to enter returned quantities, validate them against the remaining returnable quantity, and submit them to the server.

## Files changed

- `server/db/migrations/011_returns_schema.sql` — Added schema tables `returns` and `return_items`.
- `server/modules/invoices/invoicesService.js` — Updated `getInvoiceById` to compute `returned_quantity` and `remaining_returnable_quantity` per item.
- `server/modules/finance/financeService.js` — Updated `getFinanceSummary` to query the total return balance and mapped it to the `returns` and `return_balance` response fields.
- `server/modules/returns/returnsService.js` — [NEW] Created the returns backend service module to handle return validations, DB transactions, stock additions, and ledger registrations.
- `server/modules/returns/returnsRoutes.js` — [NEW] Created endpoints for listing and creating returns.
- `server/routes.js` — Mounted `/returns` routes.
- `server/modules/returns/returnsRoutes.test.js` — [NEW] Appended integration test cases for return validation, stock, and ledger modifications.
- `client/src/pages/Invoices.jsx` — Replaced the placeholder return drawer with interactive input logic, RTL styling, remaining quantity constraints, and API submission.
- `client/src/pages/Finance.jsx` — Added Arabic translation mapping for `return_created` entry type in the financial ledger view.

## Database changes

- Tables: `returns`, `return_items`
- Migrations: `server/db/migrations/011_returns_schema.sql` (Executed)
- Seeds: None
- Notes: Adds new tables and updates queries on existing ones. Fully backwards-compatible.

## API changes

- Endpoint: `/api/returns`
- Method: `POST` (create), `GET` (list and show details)
- Permission: `invoices.update` (creating returns), `invoices.view` (viewing returns)
- Notes: Evaluates user roles; restricted to elevated users or users linked to the invoice's outlet.

## UI changes

- Page/component: `client/src/pages/Invoices.jsx` (Return drawer)
- Notes: Allows selecting quantity to return for each item in the invoice, dynamically showing original quantity, previously returned quantity, and remaining returnable quantity. Features RTL layout, Material styling, and input validation.

## Commands run

| Command | Exit code | Notes |
|---|---:|---|
| `cmd /c "npm run db:migrate"` | 0 | Ran migration `011_returns_schema.sql` |
| `cmd /c "npm test"` | 0 | 163/163 passed |
| `cmd /c "npm run style:gate"` | 0 | Verification passed |
| `cmd /c "npm run lint"` | 0 | Checked, no errors |
| `cmd /c "npm run build"` | 0 | React production compilation successful |
| `cmd /c "npm run smoke"` | 0 | Development environment smoke checks passed |

## Verification result

- Build: Passed
- Tests: Passed
- Lint: Passed with 23 warnings (0 errors)
- DB: Stable (Migration applied)
- Smoke: Passed

## Deployment impact

None. Backwards-compatible with the DirectAdmin monolith deployment architecture.

## Risks / blocked items

- None

## Next step

- Next step ID/title: 108 - Outlet Balance + Limit Engine With Returns

## Stop confirmation

Only one step was executed in this run.
