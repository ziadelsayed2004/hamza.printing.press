# 072 — Balance Finance Ledger Full Reconciliation

## Goal
Make balance/finance system complete, auditable, and tied to invoices/payments.

## Scope
- Validate finance ledger entries for:
  - invoice created
  - invoice cancelled
  - payment recorded
  - payment reversed
  - manual adjustment
  - shipping update
- Add outlet statement endpoint.
- Add current balance calculation.
- Add overdue amount.
- Add pending installments.
- Add credit limit usage.
- Add finance UI improvements.

## Acceptance
- No direct balance mutation without ledger entry.
- Statements reconcile with invoices/payments.
- EGP formatting everywhere.
