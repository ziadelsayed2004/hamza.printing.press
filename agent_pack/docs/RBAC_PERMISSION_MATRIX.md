# Advanced RBAC Permission Matrix

## Built-in roles

- super_admin
- admin
- accountant
- inventory_manager
- sales_staff
- shipping_user
- readonly_viewer
- author

## Permission naming convention

`module.action`

Examples:

- users.view
- users.create
- users.update
- users.disable
- users.archive
- roles.manage
- permissions.manage
- authors.view
- authors.create
- authors.update
- products.view
- products.create
- products.update
- products.delete
- product_prices.view
- product_prices.update
- outlet_types.view
- outlet_types.manage
- outlets.view
- outlets.create
- outlets.update
- outlets.disable
- invoices.view
- invoices.create
- invoices.update
- invoices.cancel
- invoices.export
- payments.view
- payments.create
- payments.reverse
- inventory.view
- inventory.receipts.create
- inventory.adjustments.create
- shipments.view
- shipments.create
- shipments.update
- reports.view
- reports.export
- imports.run
- exports.run
- audit.view
- settings.update
- backup.create
- backup.restore

## Advanced behavior

- super_admin bypasses all permission checks.
- A disabled user cannot login.
- Archived users cannot be re-used without explicit admin action.
- Author users only see linked author data unless granted broader permissions.
- Menu visibility must be permission-aware.
- API must still enforce permissions even if menu item is hidden.

## Active permission correction: no imports, collection/supply permissions

Remove import permissions from UI and API.

Required permissions:

- `payments.collect`
- `payments.reverse`
- `payments.mark_supplied`
- `payments.supply_batch`
- `finance.view`
- `finance.statement.view`
- `finance.export`
- `shipments.create_partial`
- `shipments.update_status`
- `exports.run`
- `exports.finance`
- `exports.inventory`
