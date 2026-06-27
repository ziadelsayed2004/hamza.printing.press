# Target Database Schema Overview

This is a fresh-start schema direction. Exact fields may be refined during implementation.

## Identity and permissions

- users
- roles
- permissions
- role_permissions
- user_roles
- user_permission_overrides (optional advanced layer)
- sessions or session store if needed
- audit_logs

## Authors/products/pricing

- authors
- author_users
- products
- product_authors
- outlet_types
- product_prices

## Outlets

- outlets

Fields: id, name, outlet_type_id, governorate, address_details, phone, credit_limit, status, notes, timestamps.

## Inventory

- inventory_receipts
- inventory_receipt_items
- inventory_transactions
- stock_summary or calculated stock view/cache

## Invoices/payments

- invoices
- invoice_items
- invoice_status_history
- invoice_payments
- payment_plans
- payment_installments

## Shipments

- shipments
- shipment_items
- shipment_status_history

## Exports/imports

- import_jobs
- import_job_rows
- export_jobs (optional)

## Key technical rules

- Use foreign keys where possible.
- Use created_at/updated_at consistently.
- Use status fields instead of destructive deletion for business records.
- Keep invoice item snapshots.
- Keep audit logs for sensitive changes.