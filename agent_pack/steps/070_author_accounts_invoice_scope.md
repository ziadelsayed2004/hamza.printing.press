# 070 — Author Accounts Invoice Scope

## Goal
Complete author account logic.

## Scope
- Ensure author can be linked to one or more products.
- Ensure product can be linked to one or more authors.
- Ensure a user can be linked to author profile.
- Add API scope: author user sees only:
  - own products
  - invoice items containing own products
  - reports based on own products
- Add frontend visibility for author role.

## Acceptance
- Super admin sees all.
- Author account sees only related data.
- Tests cover invoice scope.
