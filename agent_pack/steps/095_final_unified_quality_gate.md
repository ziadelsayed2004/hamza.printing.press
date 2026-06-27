# 095 — Final Unified Quality Gate

## Goal
Run final verification after all corrected finance/design/business changes.

## Scope
- Run available commands:
  - node -v
  - npm -v
  - npm install/npm ci if needed
  - npm test
  - npm run build
  - npm run lint if available
  - db reset/migrate if available
- Smoke test:
  - login.
  - permissions/sidebar no refresh.
  - outlet type/outlet/product/price.
  - stock receipt.
  - invoice creation.
  - partial/full collection.
  - supplied/not supplied.
  - partial shipping.
  - finance dashboard.
  - notifications.
  - export.
- Confirm DirectAdmin one Node app deployment remains simple.

## Acceptance
- Final report is written.
- No import or installment features remain active.
- Business chain and visual design pass.
- If any issue remains, mark `needs_review` with exact file and reason.
