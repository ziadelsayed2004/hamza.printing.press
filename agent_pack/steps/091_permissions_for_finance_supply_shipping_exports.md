# 091 — Permissions For Finance Supply Shipping Exports

## Goal
Finalize advanced RBAC for the corrected business model.

## Scope
- Add/verify permissions for:
  - collect payment.
  - reverse payment.
  - mark supplied.
  - supply batch.
  - view finance.
  - view outlet statements.
  - create partial shipment.
  - update shipment status.
  - run exports.
- Ensure author/outlet accounts remain scoped correctly.
- Ensure menu items hide/show without requiring refresh.

## Acceptance
- Unauthorized users cannot perform finance/supply/shipping/export actions.
- Authorized users see correct menus immediately after login.
- Tests cover at least one deny and one allow per critical area.
