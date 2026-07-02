# Step 155 — Invoice Free Items + Full/Partial Returns Recalculation Engine

## Goal
Support free/complimentary quantities in invoice items and make returns recalculate stock, outlet balance, and statements correctly.

## Business rules
- A product line may include free quantity.
- Physical quantity = paid/billable quantity + free quantity, or total quantity with a free_quantity field.
- Stock decreases by physical quantity.
- Invoice total charges billable quantity only.
- Returns may be full invoice or selected item quantities.
- Return credit must not exceed eligible billable value.
- Return increases stock.
- Return updates finance ledger and outlet statement.
- Return must be visible in invoice details and exports.

## Required backend inspection
- `server/modules/invoices/invoicesService.js`
- `server/modules/invoices/invoicesRoutes.js`
- `server/modules/returns/returnsService.js`
- `server/modules/returns/returnsRoutes.js`
- `server/modules/finance/financeService.js`
- `server/modules/inventory/inventoryService.js`
- `server/db/migrations/*`
- `server/modules/invoices/invoicesE2E.test.js`
- `server/modules/returns/returnsRoutes.test.js`

## Required frontend inspection
- `client/src/pages/Invoices.jsx`
- `client/src/pages/Invoices.css`
- Any return drawer/components currently embedded.
- `client/src/pages/Finance.jsx`
- `client/src/pages/Reports.jsx`

## Implementation requirements
1. Add DB migration if needed:
   - `invoice_items.free_quantity` or equivalent.
   - Keep backward compatibility for existing data.
2. Invoice create/update must accept and validate free quantity:
   - free quantity cannot be negative.
   - free quantity cannot exceed physical quantity.
   - billed quantity cannot become negative.
3. Pricing:
   - unit price snapshot still comes from product/outlet type.
   - line total = billable quantity × unit price.
   - stock movement uses physical quantity.
4. UI:
   - invoice item row has a clear “كمية مجانية” field or toggle/quantity field.
   - line summary shows paid/billable/free/total physical quantity.
5. Returns:
   - support full invoice return shortcut.
   - support partial selected items.
   - calculate return credit safely based on billable remaining quantity/value.
   - increase stock for physical returned quantity.
   - update finance ledger/outlet statement.
6. Add Arabic error messages for over-return and invalid free quantity.

## Tests
- Invoice with 10 physical quantity and 2 free: stock −10, invoice charges 8.
- Partial return of paid quantity updates credit.
- Return including free quantity increases stock but does not over-credit.
- Full return of invoice reconciles statement and stock.

## Verification
- `npm run style:gate`
- `npm run build`
- `npm test`
- `npm run test:e2e`

## Acceptance
- Free books work at invoice creation.
- Returns are correct financially and in inventory.
- Invoice details, PDFs, reports, and exports do not hide free quantity.
