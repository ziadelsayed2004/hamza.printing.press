# Step 153 — Payments + Receipt Upload/List Polish Without Review Flow

## Goal
Make Payments the single official place for recording payments and uploading receipts, while removing/ignoring receipt review UX.

## Business rules
- Payment can be full or partial, but not installment.
- Every payment may have one optional receipt attachment.
- Receipts are uploaded and displayed/downloaded only.
- No review queue UI. No approve/reject UX.
- `receipt_status` may remain `approved` internally for compatibility, but it should not be presented as a review workflow.
- Payment supply status remains `supplied` / `not_supplied`.

## Required backend inspection
- `server/modules/payments/paymentsRoutes.js`
- `server/modules/payments/paymentsService.js`
- `server/modules/invoices/invoicesService.js` for initial payment-on-create behavior.
- `server/config/index.js` for storage path.
- `server/db/migrations/012_payment_receipts.sql`

## Required frontend inspection
- `client/src/pages/Payments.jsx`
- `client/src/pages/Payments.css`
- `client/src/pages/Invoices.jsx` query handoff from Step 152.
- `client/src/components/EntityDrawer.*`

## Implementation requirements
1. Payments create drawer must support:
   - outlet selector
   - invoice selector filtered by outlet
   - remaining amount preview
   - full/partial payment amount
   - payment method
   - payment date
   - reference number
   - supply status
   - notes
   - receipt upload
2. Deep link from invoice page must preselect outlet and invoice and open create drawer.
3. Payment list must show clear receipt indicators:
   - no receipt
   - receipt uploaded
   - view/download receipt button
4. Remove any visible review queue tab/table/buttons from Payments UI.
5. Backend receipt download must use safe configured storage path, not hardcoded local Windows paths.
6. Keep old review endpoints only if tests depend on them, but do not expose them in the UI; if removing them, update tests/docs.
7. Add Arabic labels and error messages.

## Tests
- Payment creation with no receipt.
- Payment creation with receipt metadata/upload.
- Partial payment updates invoice payment status.
- Full payment updates invoice payment status.
- Receipt view/download permission guard.
- No review queue UI in Payments page.

## Verification
- `npm run style:gate`
- `npm run build`
- `npm test`

## Acceptance
- Payment from invoice appears in Payments with selected invoice.
- User can upload a receipt for every payment.
- Payment list has professional receipt display.
- No receipt review workflow is visible.
