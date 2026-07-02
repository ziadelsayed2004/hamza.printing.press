# Step 158 — Custom Roles + Advanced Permissions RBAC

## Goal
Allow admins to create and manage custom roles, not just choose predefined roles, and wire permissions for every sensitive operation.

## Business rules
- Super Admin remains protected and cannot be deleted accidentally.
- System roles can be locked from destructive edits if needed.
- Custom roles can be created, named, described, edited, enabled/disabled, and assigned permissions.
- Users can be assigned one or more roles.
- Permissions must cover payments, receipts, shipping, returns, exports, inventory, invoices, products, outlets, authors, and admin actions.

## Required backend inspection
- `server/modules/roles/rolesService.js`
- `server/modules/users/userRoutes.js`
- `server/modules/users/usersService.js`
- `server/middleware/rbac.js`
- `server/db/migrations/*`
- `server/db/seeds/dev_seed.js`
- All route files using `checkPermission(...)`

## Required frontend inspection
- `client/src/pages/Users.jsx`
- `client/src/pages/Users.css`
- `client/src/app/AuthContext.jsx`
- `client/src/layouts/MainLayout.jsx`
- `client/src/locales/ar.json`

## Implementation requirements
1. Backend role CRUD:
   - create role
   - update role name/description/status if schema supports it
   - delete/archive role safely
   - list role permissions
   - update role permissions
2. Add missing permissions if needed:
   - `invoices.pay`
   - `invoices.ship`
   - `invoices.return`
   - `payments.receipt.view`
   - `payments.receipt.upload`
   - `shipments.deliver`
   - `returns.create`
   - export-specific permissions where useful
3. Update route guards to use granular permissions where practical.
4. Frontend role designer:
   - create role drawer
   - edit role drawer
   - permissions grouped by module
   - search permissions
   - protect super_admin/system roles
5. Users UI:
   - assign roles to user
   - show role chips in Arabic
   - prevent bad empty role state when permissions require at least one role.
6. Tests:
   - custom role creation
   - permission assignment
   - user with custom role can/cannot access protected operations.

## Verification
- `npm run style:gate`
- `npm run build`
- `npm test`

## Acceptance
- Admin can create a new role from UI.
- Admin can select permissions for that role.
- User assigned that role gets exactly those permissions.
- Sensitive invoice/payment/shipping/return/export operations are protected.
