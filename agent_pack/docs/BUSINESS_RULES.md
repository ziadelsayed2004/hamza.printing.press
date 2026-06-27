# Business Rules

## Fresh start
The owner confirmed the database can be deleted/rebuilt. Build the new data model cleanly without legacy migration complexity unless later requested.

## Outlet types

- Admin can create outlet types dynamically.
- Each outlet must have one outlet type.
- Outlet type controls which product price is used.

## Outlets

Outlets require:

- Name
- Outlet type
- Governorate
- Detailed address
- Phone
- Credit limit/status when applicable
- Notes

## Products/books

- A book/product is created once.
- Product data is separate from pricing.
- Product can be linked to one or more authors.
- Product has a price per outlet type.

## Product pricing

- A product can have one active price per outlet type.
- Invoice creation resolves price from selected outlet -> outlet type -> product price.
- Invoice item stores unit price snapshot.
- Future price changes do not alter historical invoices.

## Invoices

- Invoice has outlet, items, totals, payment type/status, shipping status, notes.
- Total = subtotal + shipping cost - discount.
- Paid amount = confirmed payments total.
- Remaining = total - paid.
- Payment status updates automatically.

## Payments

Supported types:

- Cash
- Deferred
- Installments
- Mixed

Rules:

- Every payment is recorded separately.
- Installment plan can generate due schedule.
- Remaining is calculated automatically.
- Reversals/corrections require audit log.

## Inventory

- Stock must be changed through ledger transactions.
- Receipts increase stock.
- Invoice sales decrease stock.
- Returns/cancellations/adjustments create new transactions.
- Do not silently overwrite stock.

## Shipping

- Partial shipment can exist operationally.
- Payment calculations remain invoice-level.
- Shipping fees remain invoice-level unless a later explicit business rule changes that.

## Reports and filters

Must support filtering invoices by:

- Book
- Author
- Outlet
- Outlet type
- Governorate
- Payment status
- Shipping status
- Date range
- Remaining amount

## Deployment

Keep deployment simple on DirectAdmin: one Node app, one start command.

## Active correction: no installments, no imports, supply-aware finance

These rules are mandatory and override any previous note:

- Remove installments/payment plans entirely.
- Payment shapes are only: unpaid, partial collection, full collection.
- Collection/supply are separate: money can be collected from outlet but not yet supplied to treasury/admin.
- Finance must show pending balance, collected balance, supplied balance, and unsupplied collected balance.
- Partial invoice shipping is allowed by selecting exact invoice products and quantities.
- No Excel/CSV import features are allowed.
- Export features remain and must be professional.
- Legacy functionality must be enhanced, not reduced.
