# Fresh Reset + UI Redesign Scope

## Client decision
The project is now treated as a clean rebuild/fresh start. Existing SQLite records do not need to be preserved.

## Database reset rule
The reset command must delete/recreate the database and seed only the minimum platform foundation:

- Permission catalog.
- One `super_admin` role with full access.
- One active super admin user.

Do not seed:

- Books/products.
- Authors.
- Outlet types.
- Outlets.
- Invoices.
- Payments.
- Shipments.
- Inventory receipts.
- Staff/admin/demo/visitor accounts.

All business records and all non-super-admin users must be created from inside the platform UI.

## Outlet types rule
Outlet types are admin-defined. The admin creates outlet types first, then creates outlets and assigns each outlet to a type. Book/product prices are then configured per outlet type.

## UI reset rule
The current UI screenshot is rejected. The new UI must not look like the old system. It must be clean, professional, Material UI based, responsive, RTL-first, with light/dark mode and elegant empty states.

## Deployment rule
Keep production simple: one Node.js app on DirectAdmin. React builds into `public/`; Express serves APIs under `/api` and the built dashboard for all other routes.
