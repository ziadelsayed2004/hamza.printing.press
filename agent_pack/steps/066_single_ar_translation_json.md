# 066 — Single Arabic Translation JSON

## Goal
Move UI labels to one Arabic JSON dictionary.

## Scope
- Create `client/src/locales/ar.json`.
- Create `client/src/locales/t.js` helper.
- Migrate shared layout/navigation/common labels first.
- Add keys for:
  - app
  - nav
  - common
  - auth
  - dashboard
  - products
  - authors
  - outlets
  - invoices
  - payments
  - finance
  - inventory
  - notifications
  - reports
- Do not create separate translation files.

## Acceptance
- Shared layout uses `t()`.
- No duplicated nav text in JSX.
- Arabic only.
