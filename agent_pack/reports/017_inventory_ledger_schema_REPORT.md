# Step Completion Report

## Selected step

- ID: 017
- Title: Inventory Ledger Schema
- Status: done

## Summary

Designed, implemented, and verified the Inventory Ledger Schema module. This covers:
- Migration `002_inventory_adjustments.sql` to register adjustments tables in SQLite.
- Core service layer (`inventoryService.js`) for calculating real-time stock levels, generating summaries, writing transaction log records, and handling bulk positive/negative stock adjustments.
- Express endpoints (`/api/inventory`) with RBAC check rules for transaction views, adjustments creation, and initial opening stock setups.
- Integration tests in `inventoryRoutes.test.js` validating stock calculations, permissions, and validation bounds.

## Files changed

- `[NEW] server/src/db/migrations/002_inventory_adjustments.sql` — Migration schema for adjustments tables.
- `[NEW] server/src/modules/inventory/inventoryService.js` — Service containing database helpers.
- `[NEW] server/src/modules/inventory/inventoryRoutes.js` — Express routes with authorization rules.
- `[NEW] server/src/modules/inventory/inventoryRoutes.test.js` — Integration test suite.
- `[MODIFY] server/src/routes.js` — Mounted the inventory router.

## Database changes

- Tables: `inventory_adjustments`, `inventory_adjustment_items` (New tables created)
- Migrations: `002_inventory_adjustments.sql` executed.
- Seeds: None
- Notes: SQLite foreign key constraints are active and cascading is enabled for parent deletions.

## API changes

- Endpoint: `/api/inventory/stock-summary`
  - Method: `GET` (Fetch real-time stock levels for active products. Requires `inventory.view` permission.)
- Endpoint: `/api/inventory/transactions`
  - Method: `GET` (Fetch ledger transaction history log. Requires `inventory.view` permission.)
- Endpoint: `/api/inventory/adjustments`
  - Method: `POST` (Bulk record stock adjustments. Requires `inventory.adjustments.create` permission. Audited as `create_inventory_adjustment`.)
- Endpoint: `/api/inventory/opening-balance`
  - Method: `POST` (Record initial stock opening balance. Requires `inventory.adjustments.create` permission. Audited as `create_opening_balance`.)

## UI changes

- Page/component: None (Backend step)
- Notes: UI modernization is scheduled for later steps.

## Commands run

| Command | Exit code | Notes |
|---|---:|---|
| `cmd.exe /c npm run db:migrate` | 0 | Executed `002_inventory_adjustments.sql` migration successfully. |
| `cmd.exe /c npm test` | 0 | All 13 Jest suites (64 tests) passed successfully. |
| `cmd.exe /c node scripts/smoke_test.js` | 0 | Verified local `/api/health` status is healthy. |

## Verification result

- Build: N/A
- Tests: 13 suites, 64 tests passed cleanly.
- Lint: N/A
- DB: Verified ledger calculations, transactions, and adjustments in the database.
- Smoke: Passed with healthy response.

## Deployment impact

No extra environment variables required. Rebuilt SQLite schema using migrate commands.

## Risks / blocked items

- None

## Next step

- Next step ID/title: 018 / Inventory Receipts Logic

## Stop confirmation

Only one step was executed in this run.
