# Invoice Creation & Partial Shipping Rules — مطبعة حمزة

## Goal
The invoice creation flow must be professional, owned, complete, dynamic, and connected to outlet type pricing, inventory, finance, and shipping.

## Invoice creation flow
The invoice builder must not feel like a generic table. It must be an operational business screen.

Required flow:

1. Select outlet.
2. System resolves outlet type.
3. Show outlet metadata: governorate, address, phone, credit limit, pending balance.
4. Add books/products using search/autocomplete.
5. For every product, auto-resolve price from outlet type.
6. Allow quantity edit with stock validation.
7. Show line totals, subtotal, shipping cost, discount if supported, and invoice total.
8. Choose collection state at creation:
   - no payment
   - partial payment
   - full payment
9. If payment is entered, choose supplied/not supplied.
10. Save invoice with immutable snapshots.
11. Create inventory transactions.
12. Create finance ledger entries.
13. Create notifications when needed.

## Partial payment, not installments
Partial payment is allowed. Installments are forbidden.

There is no schedule, no due dates, and no payment plan UI.

## Partial shipping
The system must allow shipping part of an invoice by choosing exact invoice items and quantities.

Rules:

- Invoice contains items and quantities.
- Shipment can include a subset of invoice items.
- Shipment item quantity cannot exceed remaining unshipped quantity.
- Invoice shipping status is calculated:
  - `not_shipped`: no shipped quantity.
  - `partially_shipped`: some quantity shipped, not all.
  - `shipped`: all quantities shipped.
  - `partially_returned`: some shipped quantities returned.
  - `returned`: all shipped quantities returned.
- Partial shipping must not change payment math.
- Payment and supply are invoice-level finance concepts.
- Shipment has its own status/history.

## Stock behavior
- Creating invoice reserves or decrements stock according to current implemented policy.
- Creating shipment must not double-deduct stock if stock was already deducted on invoice creation.
- If the code uses reservation-first logic, shipment consumes reserved stock.
- The agent must choose one policy and document it; no hidden double deduction.

## UI requirements
Invoice builder must include:

- full RTL layout.
- Stepper or structured sections.
- Sticky totals summary.
- Clear product rows.
- natural form field widths.
- no cramped labels.
- drawer or full page flow, not random modal stack.
- confirmation screen before save.

Partial shipping UI must include:

- invoice item list with ordered/shipped/remaining quantities.
- quantity selector for shipment.
- shipment notes and shipping status.
- status timeline.

## Reports/export impact
Exports must include:

- invoice payment status.
- invoice supply status.
- shipped/remaining quantities.
- pending balance.
- supplied/unsupplied collected amounts.
