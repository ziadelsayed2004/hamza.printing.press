# 074 — Inventory Receipts Stock Ledger Integrity

## Goal
Make inventory, receipts, invoice stock deduction, and adjustments fully reliable.

## Scope
- Receipt increases stock via inventory transaction.
- Invoice decreases stock via inventory transaction.
- Invoice cancellation restores stock.
- Invoice edit creates delta transaction.
- Manual adjustment requires permission and audit.
- Negative stock notification generated.
- Low stock notification generated.

## Acceptance
- Inventory ledger reconstructs current stock.
- No direct unsafe stock edits.
- Tests cover receipt/sale/cancel/adjustment.
