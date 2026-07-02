# Step 154 — Shipping Partial Items + Shipped/Delivered Workflow

## Goal
Make the shipping workflow complete, practical, and linked to invoices.

## Business rules
- Shipping is by invoice item quantities.
- User can ship part of an invoice by selecting item rows and quantities.
- User can mark shipping lifecycle states such as created/ready/shipped/delivered as supported by current schema.
- Shipping does not change finance.
- Shipping cannot exceed remaining non-shipped, non-returned quantities.

## Required backend inspection
- `server/modules/shipments/shipmentsRoutes.js`
- `server/modules/shipments/shipmentsService.js`
- `server/modules/invoices/invoicesService.js`
- `server/modules/returns/returnsService.js`
- `server/db/migrations/001_initial_schema.sql`

## Required frontend inspection
- `client/src/pages/Shipments.jsx`
- `client/src/pages/Invoices.jsx`
- `client/src/pages/Shipments.css`
- `client/src/components/EntityDrawer.*`
- `client/src/components/forms/*`

## Implementation requirements
1. Shipments page must accept `?invoiceId=<id>&action=create` and load invoice items automatically.
2. Create shipment drawer must show:
   - invoice number
   - outlet/customer
   - address/governorate/phone when available
   - item title
   - sold quantity
   - already shipped quantity
   - returned quantity if available
   - remaining shippable quantity
   - quantity to ship
3. Validate client-side and backend-side that quantity does not exceed remaining shippable.
4. Add/update lifecycle actions:
   - mark as shipped
   - mark as delivered
   - optional notes/tracking/carrier
5. Invoice list/details must display shipping status clearly.
6. Add Arabic messages and responsive MUI layout.

## Tests
- Create partial shipment.
- Create second shipment for remaining quantity.
- Prevent over-shipping.
- Mark shipped/delivered and verify invoice shipping status summary.

## Verification
- `npm run style:gate`
- `npm run build`
- `npm test`
- `npm run test:e2e` where possible

## Acceptance
- User can ship selected quantities from an invoice.
- User can track delivery/shipped status.
- UI is clean, RTL, and responsive.
