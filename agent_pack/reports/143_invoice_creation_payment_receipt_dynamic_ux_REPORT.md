# Step Report: 143_invoice_creation_payment_receipt_dynamic_ux

## 1. Selected Step & Status
- **Step ID**: 143
- **Slug**: `invoice_creation_payment_receipt_dynamic_ux`
- **Title**: `Invoice Creation + Payment Receipt Dynamic UX`
- **Status**: Completed (`done`)

## 2. Files Changed

### Backend
- **`server/modules/invoices/invoicesService.js`**:
  - Added `fs` and `path` imports for receipt file handling.
  - Extended `createInvoice` signature with `paymentReceiptName` and `paymentReceiptData` parameters.
  - Added pre-transaction receipt file validation (MIME type, extension, 5MB size limit) and file writing, mirroring the same constraints as `paymentsService.recordPayment`.
  - Extended the payment `INSERT` inside the transaction to store receipt metadata (`receipt_original_name`, `receipt_stored_path`, `receipt_mime_type`, `receipt_size`, `receipt_status`).
  - Importantly: file writing happens **before** the transaction opens to avoid nested transaction issues with SQLite.
- **`server/modules/invoices/invoicesRoutes.js`**:
  - Added `paymentReceiptName` and `paymentReceiptData` to the POST `/invoices` route body extraction and passed them to `createInvoice`.

### Frontend
- **`client/src/pages/Invoices.jsx`**:
  - Added `Receipt as ReceiptIcon` to MUI icon imports (was missing, used but not imported).
  - Added `formCollectionReceiptName` and `formCollectionReceiptData` React state for at-creation payment receipt upload.
  - Reset receipt state in `handleOpenCreateModal`.
  - Added receipt proof upload UI (file picker with PNG/JPEG/GIF/PDF accept filter) inside the at-creation collection section.
  - Forwarded `paymentReceiptName` and `paymentReceiptData` in the invoice creation API payload when provided.
  - Fixed pay drawer `handleSubmitPayDrawer` to include `receiptName` in the API call (was previously missing, only `receiptData` was sent).
  - Added input validation: if receipt data is present but name is missing, show an error toast before submitting.

## 3. Database / Schema Changes
- None. The existing `invoice_payments` table already has `receipt_original_name`, `receipt_stored_path`, `receipt_mime_type`, `receipt_size`, `receipt_status` columns from migration `012_payment_receipts.sql`.

## 4. API Changes
- `POST /api/invoices` now accepts optional `paymentReceiptName` and `paymentReceiptData` fields in the request body.
- When provided with a valid collection amount, the receipt file is stored to `storage/receipts/` and the payment row is saved with `receipt_status = 'pending_review'` (entering the review queue).

## 5. Frontend / UI Changes
- Invoice creation form: when payment type is `partial` or `full`, a receipt upload section appears under the collection details with a file input accepting only `image/png`, `image/jpeg`, `image/gif`, `application/pdf` files.
- Pay drawer: receipt name is now correctly forwarded in the API payload alongside receipt data.

## 6. Business-Rule Verification
- Every payment operation (including at-creation collection) can now have a receipt/proof attachment.
- Receipts are subject to review (`pending_review` status) before being approved.
- File type constraints (PNG, JPEG, GIF, PDF only) and 5MB size limit are enforced at invoice creation as well as from the standalone payment drawer.
- No installments, no Excel imports, Arabic-only UI, EGP amounts, Egypt timezone.

## 7. Verification Executed
- `npm run test`: **178 tests, 28 suites — all passed, exit code 0.**
- `npm run build`: **✅ Built successfully.**
- `npm run style:gate`: **✅ Passed.**
- `npm run smoke`: **✅ Health endpoint healthy.**

## 8. Risks / Blockers
- None.

## 9. Next Step
- Step 144: `legacy_parity_final_after_new_corrections`
