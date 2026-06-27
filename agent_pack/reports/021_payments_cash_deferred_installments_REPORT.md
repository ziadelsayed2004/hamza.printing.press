# Step Completion Report

## Selected step

- ID: 021
- Title: Payments Cash Deferred Installments
- Status: done

## Summary

In this step, we implemented and integration-tested the payment management flow. This covers recording individual payments (for cash, deferred, installment, or mixed invoices), sequentially allocating payments to payment installments, auto-calculating total paid and remaining balances to update invoice headers, and reversing recorded payments under appropriate roles.

## Files changed

- `[NEW] server/src/modules/payments/paymentsService.js` — Service implementing business calculations, sequential installment allocations, payment recording, and reversals.
- `[NEW] server/src/modules/payments/paymentsRoutes.js` — API routes (`POST /api/payments`, `POST /api/payments/:id/reverse`, `GET /api/payments`) under secure permissions.
- `[NEW] server/src/modules/payments/paymentsRoutes.test.js` — Integration test suite verifying rounding distributions, validation errors, and metrics calculations.
- `[MODIFY] server/src/modules/invoices/invoicesRoutes.js` — Mounted nested endpoints (`GET /api/invoices/:id/payments` and `POST /api/invoices/:id/installment-schedule`).
- `[MODIFY] server/src/routes.js` — Mounted the `/api/payments` sub-router.
- `[MODIFY] agent_pack/status.json` — Updated step status tracking.
- `[MODIFY] agent_pack/TASK_BOARD.md` — Updated task board table.

## Database changes

- Tables: Updates to `invoice_payments`, `payment_installments`, `invoices`, and `invoice_status_history`
- Migrations: None.
- Seeds: None.
- Notes: Correctly propagates cascade triggers.

## API changes

- Endpoint: `/api/payments`
  - Method: `POST`
  - Permission: `payments.create`
  - Notes: Record payment, updates invoice status, distributes to installments sequentially. Audited.
- Endpoint: `/api/payments/:id/reverse`
  - Method: `POST`
  - Permission: `payments.reverse`
  - Notes: Reverse/cancel payment, recalculating invoice/installment statuses. Audited.
- Endpoint: `/api/payments`
  - Method: `GET`
  - Permission: `payments.view`
  - Notes: Retrieve payments log list.
- Endpoint: `/api/invoices/:id/payments`
  - Method: `GET`
  - Permission: `invoices.view`
  - Notes: Get payments log for a single invoice.
- Endpoint: `/api/invoices/:id/installment-schedule`
  - Method: `POST`
  - Permission: `invoices.update`
  - Notes: Generate or regenerate installment schedule, handles rounding error absorption. Audited.

## UI changes

- Page/component: N/A
- Notes: N/A

## Commands run

| Command | Exit code | Notes |
|---|---:|---|
| `npm.cmd test` | 0 | Runs Jest integration tests sequentially |
| `node scripts/smoke_test.js` | 0 | Verifies Express app health check |

## Verification result

- Build: N/A
- Tests: 16 test suites, 83 tests passed cleanly (100% success).
- Lint: N/A
- DB: Verified database updates, status history logs, and sequence matching.
- Smoke: Passed with healthy status.

## Deployment impact

- None. Continues to run as a single-node Express monolith with SQLite.

## Risks / blocked items

- None.

## Next step

- Next step ID/title: 022 - Payment Status Engine

## Stop confirmation

Only one step was executed in this run.
