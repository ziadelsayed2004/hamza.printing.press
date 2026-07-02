# Step 159 — Invoice Creation Receipt Upload + Item Card Responsive Layout

## Goal
Improve the user interface for adding invoice items and cash collection upon invoice creation by optimizing layout widths, ratios, and receipt upload integrations.

## Business rules & requirements
1. **Invoice Item Card Redesign:**
   - In the book adding card: place book select and price-per-unit text fields side-by-side, sharing a single line with a width division ratio of 75% and 25%.
   - Place quantity, free quantity, and row total / remove actions below the book select line.
   - Set a distinct border indicators or highlight styling on cards.
2. **Invoice Totals Summary Redesign:**
   - Extend the invoice summary block (subtotal, shipping, discount, net total) to occupy 100% of the container width.
   - Beautify the summary metrics with responsive grids and clear RTL highlights.
3. **Cash Collection Receipt Upload:**
   - Embed a payment receipt document/image upload button directly in the " تفاصيل تحصيل النقدية عند الإنشاء" section.
   - Show file name preview and a delete/clear option.
   - Pass receipt original name and base64 data structure to `/api/invoices` on form submit.

## Verification
- `npm run style:gate`
- `npm run build`
- `npm test`
- `npm run test:e2e`
