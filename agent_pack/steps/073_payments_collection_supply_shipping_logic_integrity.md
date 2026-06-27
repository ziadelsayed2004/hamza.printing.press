# 073 — Payments Collection Supply Shipping Logic Integrity

## Goal
Verify and complete no-installment payment collection, supply/remittance, and partial shipping logic.

## Scope
- Read:
  - `agent_pack/docs/FINANCE_COLLECTION_SUPPLY_RULES.md`
  - `agent_pack/docs/INVOICE_CREATION_PARTIAL_SHIPPING_RULES.md`
- Ensure allowed invoice payment states only:
  - unpaid.
  - partially_paid.
  - paid.
  - cancelled.
- Ensure allowed payment/collection shapes only:
  - no collection.
  - partial collection.
  - full collection.
- Ensure collected payment records support:
  - supplied.
  - not_supplied.
  - supplied_at.
  - supplied_by.
- Remove/deactivate installment plans, schedules, due dates, and overdue installment logic.
- Ensure partial shipping works by selecting invoice items and quantities.
- Ensure shipping does not alter collection/supply math.
- Ensure reversals work through ledger entries.

## Acceptance
- Unit/integration tests for payment collection and supply calculations.
- No negative remaining except approved reversal/overpayment behavior if explicitly supported.
- Partial shipping quantities cannot exceed unshipped invoice item quantities.
- No active code path references installment schedules or payment plans.
