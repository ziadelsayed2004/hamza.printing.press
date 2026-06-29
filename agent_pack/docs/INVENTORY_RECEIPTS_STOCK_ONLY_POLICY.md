# Inventory Receipts Stock-Only Policy — سياسة واردات الكتب

## Final correction

`واردات الكتب`, `استلام كتب`, `توريد كتب`, and inventory receipt screens mean **stock movement only**.

They are not financial collection, not payment, not remittance, not cash supply, and not outlet balance settlement.

## Correct meaning

When books are received into the system:

- Product stock increases.
- An inventory transaction/ledger row is created.
- A receipt record can store supplier/source, date, note, products, quantities, user, and audit trail.
- Inventory reports and stock notifications are updated.

## Forbidden effects

Inventory receipts must not:

- Increase paid amount.
- Decrease pending receivable.
- Mark invoices as paid.
- Mark payments as supplied/remitted/reviewed.
- Affect outlet limit directly.
- Create payment records.
- Create financial ledger records except optional operational audit notes, if already separated from finance.

## Naming standard

Use these Arabic labels:

- `واردات الكتب`
- `استلام مخزون`
- `حركة مخزون`
- `كمية واردة`
- `مصدر/ملاحظة الاستلام`

Avoid using `توريد` alone in inventory screens if it conflicts with financial remittance. Prefer `استلام مخزون` or `واردات الكتب`.

## Stock ledger rule

Stock = opening balance + received quantities - sold quantities + returned quantities +/- manual adjustments.

Financial balances are calculated separately from invoices, payments, reviewed receipts, returns, and outlet statements.
