# 054 — Finance Balance UI + Dashboard History

## Objective
Expose the finance balance engine in a polished Material UI experience and restore the practical value of the old total/pending balance cards.

## Required reads
- `agent_pack/docs/LEGACY_BALANCE_NOTIFICATIONS_TARGET.md`
- `agent_pack/docs/PROFESSIONAL_MATERIAL_DASHBOARD_STANDARD.md`
- `client/src/pages/Dashboard.jsx`
- `client/src/pages/Payments.jsx`
- `client/src/pages/Reports.jsx`

## Tasks
1. Add/extend Finance UI page or section:
   - summary cards
   - cash/collected balance
   - receivables/pending balance
   - overdue balance
   - manual adjustment form/drawer
   - balance history table with filters
2. Add dashboard finance cards using real `/api/finance/summary`.
3. Link finance values with reports; avoid conflicting duplicated calculations.
4. Add permission-aware visibility.
5. Use EGP and Egypt time helpers.

## Verification
- Dashboard finance cards update after invoice/payment actions.
- Finance history shows manual and automatic ledger entries.
- UI handles empty database gracefully.
- Build passes.

## Report
Write `agent_pack/reports/054_finance_balance_ui_dashboard_history_REPORT.md`.
