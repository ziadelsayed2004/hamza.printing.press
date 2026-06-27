# Finance Collection & Supply Rules — مطبعة حمزة

This document is now the active finance contract. It supersedes any older mention of installments, installment schedules, or import pipelines.

## Core business meaning
النظام المالي في مطبعة حمزة مبني على 3 مفاهيم واضحة:

1. **الرصيد المعلق / المستحق من المنافذ**  
   قيمة الفواتير أو أجزاء الفواتير التي لم يتم تحصيلها من المنفذ بعد.

2. **الرصيد الفعلي / المحصل من المنافذ**  
   قيمة الأموال التي تم تحصيلها بالفعل من المنافذ.

3. **توريد المحصل**  
   المحصل فعليًا ينقسم إلى:
   - **محصل ومورد**: تم تحصيله وتم توريده للخزنة/الإدارة.
   - **محصل ولم يورد**: تم تحصيله من المنفذ لكنه لم يتم توريده بعد.

## Payment shapes
No installment system is allowed.

Allowed collection shapes only:

- **دفع كلي / Full collection**: invoice total is fully collected from outlet.
- **دفع جزئي / Partial collection**: part of invoice total is collected; remaining stays pending.
- **غير محصل / Uncollected**: no money collected yet; full amount is pending.

## Supply/remittance states
Every collected payment must have a supply/remittance state:

- `supplied`: the collected money was delivered/remitted to the treasury/admin.
- `not_supplied`: the collected money was not delivered/remitted yet.

A payment may be created as collected but not supplied. Later, the admin/accountant can mark it as supplied through a controlled supply operation.

## Required calculated balances
The system must calculate and display these in EGP:

- `invoice_total`: total amount of invoices.
- `collected_total`: all collected payments.
- `pending_balance`: invoice total minus collected total for active invoices.
- `actual_balance`: collected total.
- `supplied_balance`: collected payments marked supplied.
- `unsupplied_balance`: collected payments marked not supplied.
- `outlet_pending_balance`: pending balance per outlet.
- `outlet_collected_unsupplied`: collected from the outlet but not supplied.

## Ledger rules
No direct balance mutation is allowed.

Every finance change must create a ledger entry:

- invoice created: increases pending balance.
- invoice cancelled/reversed: decreases pending balance and reverses related ledger entries.
- payment collected: decreases pending balance and increases actual collected balance.
- payment supplied: moves amount from collected-not-supplied to collected-supplied.
- payment reversal/correction: creates reversing ledger entry; never silently edits history.
- manual adjustment: allowed only with permission, reason, audit log, and ledger entry.

## Invoice payment status
Allowed invoice collection statuses:

- `unpaid`: no payment collected.
- `partially_paid`: some money collected, remaining > 0.
- `paid`: remaining = 0.
- `cancelled`: invoice cancelled and excluded from active balances.

Forbidden statuses/logic:

- `installment`
- `installments`
- installment schedules
- installment due/overdue notifications
- payment plans

## Supply status
Allowed supply status values:

- `not_applicable`: no collected money yet.
- `not_supplied`: there is collected money not supplied yet.
- `partially_supplied`: part of collected money is supplied.
- `supplied`: all collected money is supplied.

## Permissions
Required permissions:

- `payments.collect`
- `payments.reverse`
- `payments.mark_supplied`
- `payments.supply_batch`
- `finance.view`
- `finance.statement.view`
- `finance.adjust`
- `finance.export`

## UI requirements
Finance UI must show:

- Cards for pending, collected, supplied, unsupplied.
- Per-outlet statement.
- Invoice payment status and supply status.
- Payment history with supplied/not supplied badge.
- Supply action only for authorized users.
- EGP format only.
- Egypt timezone only.

## Test scenarios
The agent must test:

1. Create invoice for 1000 EGP, no payment: pending=1000, collected=0.
2. Collect 400 not supplied: pending=600, collected=400, unsupplied=400, supplied=0.
3. Mark 400 supplied: pending=600, collected=400, unsupplied=0, supplied=400.
4. Collect remaining 600 supplied: pending=0, collected=1000, supplied=1000, invoice=paid.
5. Reverse payment: all affected balances update through ledger reversal only.
