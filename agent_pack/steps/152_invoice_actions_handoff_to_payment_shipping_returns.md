# Step 152 — Invoice Actions Handoff to Payments, Shipping, and Returns

## Goal
Make invoice list/details actions complete and consistent:

- Payment action sends the user to Payments with outlet and invoice preselected.
- Shipping action sends the user to Shipments with invoice preselected.
- Return action sends the user to a returns workflow with invoice preselected.
- Invoice page does not create payment records directly.

## Business rules
- Payment details and receipt upload live in Payments, not in Invoices.
- Invoice actions must respect permissions.
- Actions must work from both invoice table and invoice detail view.
- If multiple invoices are selected, bulk actions must either be explicitly supported safely or blocked with a clear Arabic message.

## Required backend inspection
- `server/modules/invoices/invoicesRoutes.js`
- `server/modules/invoices/invoicesService.js`
- `server/modules/payments/paymentsRoutes.js`
- `server/modules/shipments/shipmentsRoutes.js`
- `server/modules/returns/returnsRoutes.js`
- `server/middleware/rbac.js`

## Required frontend inspection
- `client/src/pages/Invoices.jsx`
- `client/src/pages/Payments.jsx`
- `client/src/pages/Shipments.jsx`
- Any returns UI or invoice return drawer currently present.
- `client/src/app/AuthContext.jsx`
- `client/src/layouts/MainLayout.jsx`

## Implementation requirements
1. Replace invoice-side payment capture drawers/actions with navigation handoff:
   - `/payments?outletId=<id>&invoiceId=<id>&action=create`
   - optionally include `amount=<remaining>` and `mode=full|partial` only as UI hints.
2. Ensure Payments page reads those query params and opens the create payment drawer with:
   - selected outlet
   - invoice list filtered by outlet
   - selected invoice
   - remaining amount visible
   - default amount set safely but editable.
3. Ensure shipping handoff uses:
   - `/shipments?invoiceId=<id>&action=create`
4. Ensure return handoff uses either:
   - `/returns?invoiceId=<id>&action=create` if a Returns page exists/gets created later, or
   - a unified invoice return drawer if that is the current product path.
5. Add Arabic user messages for invalid actions:
   - no permission
   - invoice already fully paid
   - invoice has no shippable items
   - invoice has no returnable items
6. Keep invoice list/detail refreshed after coming back from payments/shipping/returns.

## Tests
- Add/update route/query tests where practical.
- Add frontend logic tests if the project has a pattern; otherwise document manual verification.

## Verification
- `npm run style:gate`
- `npm run build`
- `npm test` where possible

## Acceptance
- Payment action from invoices opens Payments payment form, not invoice local payment UI.
- Receipt upload is not shown on invoice payment action; it is shown in Payments.
- Shipping and return actions are preselected by invoice.
- UI is RTL and responsive.
