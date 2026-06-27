# 081 — Finance Supply Model Purge Installments

## Goal
Purge installment/payment-plan behavior from code and replace it with supply-aware finance rules.

## Scope
- Search backend/frontend/tests/docs for installment/payment-plan code paths.
- Remove or disable installment APIs, UI tabs, menus, labels, notifications, reports, and tests.
- Add migrations or fresh schema corrections for collection/supply fields if missing.
- Ensure existing payments module models: partial/full collection and supplied/not_supplied.
- Update Arabic translations in `client/src/locales/ar.json`.

## Acceptance
- No user-facing installment UI.
- No active installment API route.
- Tests cover unpaid, partial collection, full collection, supplied, not supplied.
- Verification report includes grep results for installment/payment plan remnants and explains any intentional internal compatibility leftovers.
