# Step Report: 154 — Shipping Partial Items + Shipped/Delivered Workflow
**مطبعة حمزة — Unified Bookstore Manager**

## Selected Step
- **ID:** 154
- **Slug:** `shipping_partial_items_delivery_workflow`
- **Title:** Shipping Partial Items + Shipped/Delivered Workflow

## Source Files Inspected
- `client/src/pages/Shipments.jsx`
- `server/modules/shipments/shipmentsService.js`
- `server/modules/invoices/invoicesService.js`

## Files Changed
- `client/src/pages/Shipments.jsx` (Redesigned Create Shipment items selection panel to be a clean, tabular selector showing detailed quantity metrics. Auto-fills quantities and resolves address/governorate details)
- `server/modules/shipments/shipmentsService.js` (Added `returned_quantity` returned in the remaining shippable items query)
- `server/modules/invoices/invoicesService.js` (Updated `getInvoiceById` SELECT query to join and fetch outlet `governorate`, `address_details`, and `phone`)
- `agent_pack/status.json` (Updated step statuses, metadata, and timestamps)
- `agent_pack/tracking/steps.json` (Synchronized step statuses)
- `agent_pack/TASK_BOARD.md` (Updated active step status and table)

## Backend Changes
- **invoicesService.js:**
  - Modified the invoice details query to return customer details (`o.governorate, o.address_details, o.phone`) so that shipping users can easily preview the target delivery address.
- **shipmentsService.js:**
  - Modified the query in `getRemainingShippableItems(invoiceId)` to explicitly attach `returned_quantity` to the returned list.
  - Retained and verified the strict server-side validation preventing shipping quantities from exceeding `ordered_quantity - shipped_quantity - returned_quantity`.

## Frontend Changes
- **Shipments.jsx:**
  - Prefilled `csItems` array automatically with all invoice items that have a remaining shippable balance > 0 (defaulting to ship all remaining quantities).
  - Redesigned the Create Shipment drawer:
    * Displays the customer/outlet name, phone, governorate, and address details.
    * Replaced the manual item dropdown addition workflow with a clean table showing: **اسم الكتاب** (Book Title), **المطلوب** (Ordered Qty), **المشحون** (Shipped Qty), **المرتجع** (Returned Qty), **المتبقي للشحن** (Remaining Shippable Qty), and a simple **الكمية للشحن** (Quantity to Ship) text field input for each item.
  - Updated `handleSubmitCreate` to filter out items with `quantity <= 0` and enforce validation that at least one item must have a positive shipping quantity before submission.

## Database/Migration Changes
- None (none required).

## Permission/RBAC Changes
- Confirmed that `shipments.create` and `shipments.view` permissions are required for creating shipments and loading remaining shippable quantities.

## UI/RTL/Responsive Notes
- Grid formatting, chips, and RTL layouts behave correctly.

## Commands Run & Exit Codes
1. `npm.cmd run build` -> Exit Code: 0 (Built successfully)
2. `node scripts/test_runner.js` -> Exit Code: 0 (All 178 backend tests passed)

## Tests/Build/Style Gate Result
- Jest tests: 28 test suites, 178 tests passed.
- Vite build: Client compiled cleanly into `public/`.

## Risks/Known Gaps
- None.

## Next Step
- **ID:** 155
- **Slug:** `invoice_free_items_returns_recalculation_engine`
- **Title:** Invoice Free Items + Full/Partial Returns Recalculation Engine
