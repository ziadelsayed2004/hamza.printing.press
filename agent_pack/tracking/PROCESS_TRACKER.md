# Process Tracker — مطبعة حمزة

## Current state

- Agent Pack is locked after Step 150.
- No active/pending/open steps.
- All current work has been understood and recorded.
- Future requests must be added as new steps after 150.

## Latest repo understanding

- Backend modules: auth, users, roles, audit, authors, products, prices, outlet types, outlets, invoices, payments, inventory, shipments, returns, finance, notifications, reports, exports, admin.
- Frontend pages: Dashboard, Users, Profile, Authors, Products, Outlets, OutletTypes, Invoices, Payments, Finance, Inventory, Shipments, Reports, Exports, Notifications, AuditLogs.
- Business rules: no installments, no import, EGP, Africa/Cairo, inventory receipts stock-only, payment supply finance-only, returns and partial shipping are item-quantity based.
- Current known issues are documented in `agent_pack/docs/LATEST_REPO_LOCKED_SNAPSHOT.md` and are not active tasks.

## Verification notes

- SQL migrations dry-run passed using SQLite memory.
- `node scripts/style_quality_gate.js` currently fails with 2 issues only.
- Full npm build/test was not executed here because dependencies were not installed inside this sandbox.
