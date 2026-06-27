# Process Tracker

Use this file for human-readable progress.

## Current state

- A new post- client correction request was added after all  steps were completed.
- The user reported:
  - After login, sidebar/menu options require manual refresh.
  - Sidebar position/layout is wrong.
  - Dashboard visual quality is not acceptable.
  - Legacy balance/finance behavior must return in a modern connected way.
  - Legacy notifications must return with professional Material UI styling.
  - Currency must be Egyptian Pound.
  - Displayed times must follow Egypt time.
  - The whole system must be connected: outlet types, outlets, product prices, stock, invoices, payments, finance balances, notifications, and reports.
- Current selected step: `070_author_accounts_invoice_scope` (done).
- **Step 070 is done. Enforced author account data scoping rules across invoices and reports endpoints.**
- Reports folder: `agent_pack/reports/`.

## New change request summary

- Fix login/session hydration without refresh.
- Fix RTL layout/sidebar/topbar distribution.
- Rebuild shell/dashboard to professional Material UI standard.
- Add EGP + Egypt timezone helpers.
- Restore and upgrade legacy balance system as a finance ledger.
- Restore and upgrade legacy notifications as a unified notification center.
- Run end-to-end business flow integrity tests.
- Final visual quality + deploy gate verification.

## Per-run checklist

- [x] Read status
- [x] Select one step
- [x] Mark in_progress
- [x] Implement
- [x] Verify
- [x] Write report
- [x] Update status
- [x] Stop

## Completion metrics

- Total steps: 80
- Completed steps: 69 done + 1 blocked (040 superseded) = 70 total
- Next open step: 071_outlet_accounts_invoice_scope

## Unified Design + Logic Correction

تم فتح خطوات 061 إلى 080 كتصحيح شامل للتصميم، RTL، الستايل، الواجهات، الحقول، الحسابات، الأرصدة، الإشعارات، وربط البيزنس فلو بالكامل.

Current next step: 071_outlet_accounts_invoice_scope
