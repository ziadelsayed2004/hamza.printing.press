# 093 — Full Code Logic Dead Feature Audit

## Goal
Audit source code for dead/conflicting features after removing imports and installments.

## Scope
- Search backend/frontend/tests/docs for:
  - installments/payment plans.
  - imports/upload templates.
  - old style identity.
  - direct balance mutation.
  - direct stock mutation outside ledger.
  - inline styles and important hacks.
- Remove dead code when safe.
- Otherwise document why it remains.

## Acceptance
- Report includes exact grep/search summaries.
- No active forbidden feature remains.
- Tests/build pass or blockers are documented.
