# 072 — Balance Finance Ledger Full Reconciliation

## Goal
Make the finance/balance system complete, auditable, EGP-only, Egypt-timezone-aware, and tied to invoices, collections, and supply/remittance.

## Critical correction
There is NO installment system.

Finance has:

- pending balance: not collected from outlets.
- actual collected balance: collected from outlets.
- supplied collected balance: collected and delivered/remitted.
- unsupplied collected balance: collected but not delivered/remitted.

## Scope
- Read `agent_pack/docs/FINANCE_COLLECTION_SUPPLY_RULES.md` fully.
- Validate finance ledger entries for:
  - invoice created.
  - invoice cancelled.
  - partial collection.
  - full collection.
  - payment reversal.
  - mark collected amount as supplied.
  - supply reversal if supported.
  - manual adjustment with reason/audit.
- Add/verify outlet statement endpoint.
- Add/verify balance calculations:
  - pending balance.
  - collected balance.
  - supplied balance.
  - unsupplied balance.
  - outlet-level pending/collected/supplied/unsupplied.
- Remove any installment-derived balance logic.
- Add/verify tests for the scenarios in the finance rules doc.

## Acceptance
- No direct balance mutation without ledger entry.
- Statements reconcile with invoices/collections/supply records.
- No installment/payment plan logic remains active.
- EGP formatting everywhere.
- Egypt timezone for all timestamps.
- Audit log records collection and supply actions.
