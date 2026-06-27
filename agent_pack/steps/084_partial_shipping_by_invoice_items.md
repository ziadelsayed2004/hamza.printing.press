# 084 — Partial Shipping By Invoice Items

## Goal
Implement or verify partial shipment by selecting specific invoice products and quantities.

## Scope
- Shipment create flow starts from invoice.
- Show invoice items: ordered, shipped, remaining.
- Select quantities to ship.
- Prevent shipping more than remaining.
- Update shipment status and invoice shipping status.
- Keep finance/payment/supply math unchanged.
- Add shipment history and audit.

## Acceptance
- Partial shipment works for one or more products.
- Full shipment computed after all quantities are shipped.
- No double stock deduction.
- UI clearly shows remaining quantities.
