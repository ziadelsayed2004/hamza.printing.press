# 071 — Outlet Accounts Invoice Scope

## Goal
Add outlet accounts.

## Scope
- Add `outlet_users` table if missing.
- Link user to outlet(s).
- Outlet user sees:
  - own invoices
  - own payments
  - own finance statement
  - own shipments
- Outlet user cannot view other outlet data.
- Add RBAC/scoped middleware.

## Acceptance
- Super admin sees all.
- Outlet account sees only its outlet data.
- Tests cover access control.
