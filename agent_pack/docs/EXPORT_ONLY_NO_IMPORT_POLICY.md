# Export Only Policy — No Import Pipeline

## Decision
The platform must not include Excel/CSV import features.

Remove or disable:

- import pages.
- import routes.
- import permissions.
- import modules.
- import templates.
- preview/import validation flows.
- user-facing upload/import buttons.

## Keep and improve exports
Exports must be professional and valuable.

Required exports:

- Products/books.
- Authors.
- Outlet types.
- Outlets.
- Product prices by outlet type.
- Invoices.
- Invoice items.
- Payments/collections.
- Supply/remittance records.
- Finance ledger.
- Outlet statements.
- Inventory receipts.
- Inventory transactions.
- Shipments and shipment items.
- Notifications if useful.
- Reports.

## Export quality
Every export should support:

- Arabic headers.
- EGP formatting.
- Egypt timezone display.
- Applied filters written at top or in a metadata sheet.
- Summary totals where relevant.
- Reasonable column widths.
- Frozen header row if supported.
- Safe filenames using report type + date/time.
- Permission guard.
- Audit log entry.

## Forbidden
- Do not reintroduce import jobs.
- Do not add Excel upload UI.
- Do not add routes under `/api/imports`.
- Do not keep unused import module code unless marked for deletion in the same step.
