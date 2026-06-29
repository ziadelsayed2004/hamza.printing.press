# Final Flow: Payments, Partial Shipping, Returns

## Payment

- User can create payment from invoice list/details or payments screen.
- Payment screen must allow choosing outlet first then invoice.
- Every payment can have an uploaded receipt.
- Payment can be full or partial.
- No installment schedule exists.
- Payment state is calculated from approved payment totals only.

## Partial shipping

- Shipping can cover part of an invoice.
- User chooses specific invoice items and quantities to ship.
- Quantity cannot exceed sold quantity minus shipped quantity minus returned/cancelled quantity.
- Shipment has status/history and audit trail.
- Shipping does not create payment automatically.

## Returns

- Return is created from invoice item quantities.
- Return can be partial or full.
- Return should increase stock if goods physically return to inventory.
- Return creates outlet return balance/credit and affects limit/statement according to business rules.
- Return must be visible in invoice details, outlet statement, dashboard, and exports.

## Invoice list actions

Each invoice row/details page should expose permission-based actions:

- `تسجيل دفع`
- `رفع/مراجعة إيصال`
- `شحن`
- `استرجاع`
- `طباعة/تصدير`
- `معاينة التفاصيل`

## Business separation

- Inventory receipts/books incoming are stock-only.
- Payment receipts/proofs are financial evidence.
- Returns can affect both stock and outlet financial return balance.
- Shipping affects fulfillment, not payment by itself.
