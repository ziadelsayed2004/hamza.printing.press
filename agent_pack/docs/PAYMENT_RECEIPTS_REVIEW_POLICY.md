# Payment Receipts Review Policy — إيصالات الدفع والمراجعة

## Final payment model

There are no installments. The only invoice payment states are:

1. `مؤجل كلياً` — no approved payment yet.
2. `مدفوع جزئياً` — approved payments are greater than zero but less than invoice total.
3. `مدفوع كلياً` — approved payments cover the invoice total.

Partial payments are allowed, but they are not installment plans. They are independent payment operations.

## Payment creation flow

The payment screen/drawer must work like this:

1. Select outlet/customer first.
2. Load invoices for this outlet only.
3. Select invoice.
4. Show invoice total, paid, remaining, returns/credit, and outlet balance before saving.
5. Enter amount.
6. Select method/date/reference/note.
7. Upload receipt/proof attachment for this payment operation.
8. Save payment as pending review or approved according to the user's permission.

## Receipt attachment

Every payment operation can have a receipt/proof file, including partial payments.

Receipt metadata should include:

- payment id
- invoice id
- outlet id
- uploaded by
- uploaded at Africa/Cairo time
- original filename
- safe stored filename/path
- mime type
- size
- status: pending_review / approved / rejected
- reviewer id
- reviewed at
- review note

## Review queue

Admins/accountants with permission can:

- preview receipt
- download/export receipt metadata
- approve receipt/payment
- reject receipt/payment with reason
- filter by outlet, invoice, uploader, date, amount, status

## Balance effect

Only approved payment amounts should affect collected/actual balance unless the selected implementation explicitly separates pending-payment-upload from approved collection.

The system must clearly display:

- pending receivable
- collected/actual paid
- unreviewed receipt amount
- rejected receipt amount
- return balance/credit

## Storage/security

Receipt files must be stored outside `public/`, under a safe storage path. Access must be authenticated and permission-checked.
