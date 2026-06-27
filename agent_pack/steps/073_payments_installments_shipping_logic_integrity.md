# 073 — Payments Installments Shipping Logic Integrity

## Goal
Verify and complete cash/deferred/installments/shipping logic.

## Scope
- Cash invoice can be paid fully or partially.
- Deferred invoice starts unpaid/receivable.
- Installments generate schedule.
- Partial installment payments update status.
- Overdue installments detected using Egypt timezone.
- Shipping cost part of invoice total.
- Partial shipping does not change payment math.
- Reversals work.

## Acceptance
- Unit/integration tests for payment calculations.
- No negative remaining except approved overpayment behavior if explicitly supported.
- Shipping and payments do not conflict.
