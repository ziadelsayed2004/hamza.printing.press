# 057 — Legacy Feature Parity Merge Audit

## Objective
Make sure the modern app did not lose important behavior from the original legacy repo, especially finance, notifications, stock, invoices, backups, exports, and distribution views.

## Required reads
- `agent_pack/docs/LEGACY_BALANCE_NOTIFICATIONS_TARGET.md`
- all current modules/pages
- if a legacy repo folder exists in the working copy, inspect it; otherwise rely on the legacy summary docs in this agent pack

## Tasks
1. Create a parity checklist in `agent_pack/docs/LEGACY_PARITY_CHECKLIST.md`.
2. Compare legacy concepts with current modern modules:
   - balance total/pending/history/manual adjustment
   - book stock notifications
   - store/outlet credit limit notifications
   - invoice create/edit/delete financial effects
   - stock update effects
   - PDF invoices
   - backup/restore/export if present
   - book distribution/details if present
3. Implement small missing critical fixes only if they are safe and scoped.
4. If large missing gaps remain, add new open steps after 060 rather than doing too much in one run.

## Verification
- Parity checklist created and clear.
- No unrelated rewrites.
- Any implemented fix is tested.

## Report
Write `agent_pack/reports/057_legacy_feature_parity_merge_audit_REPORT.md`.
