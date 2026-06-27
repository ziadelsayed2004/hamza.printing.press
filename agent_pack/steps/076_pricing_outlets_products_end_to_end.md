# 076 — Pricing Outlets Products End-to-End

## Goal
Verify product pricing by outlet type and invoice snapshots end-to-end.

## Scope
- Admin creates outlet types.
- Admin creates outlet and chooses outlet type.
- Admin creates product/book.
- Admin assigns price per outlet type.
- Invoice selects outlet and product.
- System auto-picks correct price.
- Invoice item stores price snapshot.
- Missing price blocks invoice or shows explicit validation.

## Acceptance
- No product duplicated for price differences.
- Tests cover all 3 outlet type examples.
- UI makes pricing clear.
