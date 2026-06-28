# Step Completion Report

## Selected step

- ID: 106
- Title: Partial Shipping by Invoice Items Final Logic
- Status: done

## Summary

Completed partial shipping logic by implementing a dedicated backend endpoint that computes the exact remaining shippable quantities per invoice item (total ordered quantity minus quantities allocated to any non-cancelled shipments). The frontend `Shipments` creation page was updated to fetch this endpoint upon selecting an invoice. This ensures that the UI dynamically computes, displays, and validates maximum allowed quantities, preventing users from creating redundant or exceeding shipments.

## Files changed

- `server/modules/shipments/shipmentsService.js` — Added `getRemainingShippableItems` logic.
- `server/modules/shipments/shipmentsRoutes.js` — Added `GET /invoice/:invoiceId/remaining` route.
- `server/modules/shipments/shipmentsRoutes.test.js` — Appended integration test cases checking remaining shippable calculations.
- `client/src/pages/Shipments.jsx` — Updated React hook to query the new endpoint and merge results for UI validation.

## Database changes

- Tables: None
- Migrations: None
- Seeds: None
- Notes: Backwards-compatible.

## API changes

- Endpoint: `/api/shipments/invoice/:invoiceId/remaining`
- Method: `GET`
- Permission: `shipments.view`
- Notes: Evaluates user roles; restricted to elevated users or users linked to the invoice's outlet.

## UI changes

- Page/component: `client/src/pages/Shipments.jsx` (New shipment form)
- Notes: Dynamically checks remaining shippable quantities when an invoice is chosen/updated, setting min/max properties on number fields and validating input bounds.

## Commands run

| Command | Exit code | Notes |
|---|---:|---|
| `cmd /c "npm test"` | 0 | 156/156 passed |
| `cmd /c "npm run style:gate"` | 0 | Verification passed |
| `cmd /c "npm run lint"` | 0 | Checked, no errors |
| `cmd /c "npm run build"` | 0 | React production compilation successful |
| `cmd /c "npm run smoke"` | 0 | Development environment smoke checks passed |

## Verification result

- Build: Passed
- Tests: Passed
- Lint: Passed with 23 warnings (0 errors)
- DB: Stable
- Smoke: Passed

## Deployment impact

None. Backwards-compatible with the DirectAdmin monolith deployment architecture.

## Risks / blocked items

- None

## Next step

- Next step ID/title: 107 - Returns/Refunds + Outlet Return Balance

## Stop confirmation

Only one step was executed in this run.
