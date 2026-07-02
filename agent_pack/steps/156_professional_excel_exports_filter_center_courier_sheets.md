# Step 156 — Professional Excel Export Center + Courier Sheets

## Goal
Upgrade exports from basic CSV into a professional filtered export center with Excel-ready outputs and courier/delivery sheets.

## Business rules
- No Import.
- Export only.
- User filters before export.
- Export output must include complete useful data, not minimal IDs.
- Courier sheet must be operationally useful for shipping/delivery.

## Required backend inspection
- `server/modules/exports/exportsRoutes.js`
- `server/modules/exports/exportsService.js`
- `server/modules/reports/reportsService.js`
- `server/modules/shipments/shipmentsService.js`
- `server/modules/invoices/invoicesService.js`
- `package.json` dependency policy

## Required frontend inspection
- `client/src/pages/Exports.jsx`
- `client/src/pages/Exports.css`
- `client/src/pages/Shipments.jsx`
- `client/src/pages/Invoices.jsx`
- `client/src/utils/formatters.js`

## Implementation requirements
1. Add professional export types:
   - invoices detailed
   - invoice items detailed
   - payments with receipts
   - shipments/courier delivery sheet
   - returns
   - inventory movements
   - outlet statements
   - product prices by outlet type
2. Add filters per export type:
   - date range
   - outlet
   - outlet type
   - governorate
   - payment status
   - shipping status
   - product
   - author
   - supply status
   - return status if applicable
3. Implement Excel workbook output when feasible:
   - Prefer `.xlsx` with styled headers, merged title rows, filters metadata, totals rows, RTL worksheet view.
   - If dependency is unavailable in the execution environment, keep BOM CSV fallback but document it clearly and keep API extensible.
4. Courier sheet fields must include:
   - invoice number
   - outlet/customer name
   - phone
   - governorate
   - detailed address
   - shipment number/status
   - item title/quantity
   - notes
   - payment/shipping remarks needed by delivery team
5. UI export cards must be Material UI professional and responsive.
6. Export filenames must be Arabic/English safe and timestamped.

## Tests
- Export with no filters.
- Export with outlet/governorate/date filters.
- Courier sheet contains addresses and item quantities.
- Permissions are enforced.

## Verification
- `npm run style:gate`
- `npm run build`
- `npm test`

## Acceptance
- User can filter before extracting files.
- Files are professional and contain full required data.
- Courier/delivery sheet exists and is usable.
