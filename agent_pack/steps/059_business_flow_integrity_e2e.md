# 059 — Business Flow Integrity E2E

## Objective
Validate that all major modules are connected as one advanced system, not separate screens.

## Required reads
- `agent_pack/docs/BUSINESS_RULES.md`
- `agent_pack/docs/FINANCE_NOTIFICATIONS_TIMEZONE_UI_FIX_SCOPE.md`
- `agent_pack/checklists/TEST_PLAN.md`

## Tasks
Run and fix the full business flow:
1. Create outlet type.
2. Create outlet with governorate, address, phone, credit limit, outlet type.
3. Create author.
4. Create book/product.
5. Add price for the product per outlet type.
6. Add inventory receipt.
7. Create invoice for outlet; verify price snapshot and stock movement.
8. Add payment; verify paid/remaining/finance balance.
9. Create partial collection and unsupplied collection scenario; verify pending, collected, supplied, and unsupplied balances.
10. Trigger negative/low stock notification.
11. Trigger credit-limit notification.
12. Verify reports/dashboard/export values align.

## Verification
- Add or update automated tests where practical.
- Run build/tests.
- Write exact smoke results.

## Report
Write `agent_pack/reports/059_business_flow_integrity_e2e_REPORT.md`.
