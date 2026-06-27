# 053 — Finance Balance Engine EGP

## Objective
Rebuild the old balance feature as a professional finance ledger connected to invoices, payments, credit limits, and manual adjustments.

## Required reads
- `agent_pack/docs/LEGACY_BALANCE_NOTIFICATIONS_TARGET.md`
- `agent_pack/docs/DB_SCHEMA_TARGET.md`
- `server/modules/invoices/`
- `server/modules/payments/`
- `server/modules/reports/`
- legacy summary in `LEGACY_BALANCE_NOTIFICATIONS_TARGET.md`

## Tasks
1. Add/extend DB schema for finance ledger if missing:
   - finance_accounts or finance_summary if needed
   - finance_ledger_entries
   - manual_adjustments
2. Implement server module `server/modules/finance`:
   - summary
   - history
   - manual deposit/withdrawal/adjustment
   - balances by outlet/governorate/outlet type
3. Connect invoice/payment lifecycle:
   - creating unpaid/partial/full collection invoice affects receivables
   - confirmed payment increases collected/cash balance and reduces receivables
   - payment reversal updates balances
   - invoice cancel/delete/reversal updates balances correctly
4. Enforce audit logging and permissions:
   - `finance.view`
   - `finance.adjust`
   - `finance.export`
5. Use EGP only.

## Verification
- Create invoice unpaid -> receivables increase.
- Add payment -> collected increases and receivables decrease.
- Full payment -> remaining zero.
- Manual adjustment requires note and appears in history.
- Tests added/updated.

## Report
Write `agent_pack/reports/053_finance_balance_engine_egp_REPORT.md`.
