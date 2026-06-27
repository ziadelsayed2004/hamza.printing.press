# 055 — Notifications Engine Legacy Plus

## Objective
Restore and upgrade the old notifications system into a unified professional notification engine.

## Required reads
- `agent_pack/docs/LEGACY_BALANCE_NOTIFICATIONS_TARGET.md`
- `server/modules/products/`
- `server/modules/inventory/`
- `server/modules/outlets/`
- `server/modules/invoices/`
- `server/modules/payments/`

## Tasks
1. Add notifications schema/module:
   - `notifications` table
   - category/severity/status/source/dedupe/action_url fields
2. Implement notification service:
   - createOrUpdate by dedupe key
   - mark read
   - resolve
   - auto resolve
   - list/filter/count
3. Add rules:
   - negative stock
   - low stock threshold
   - outlet credit limit exceeded
   - invoice overdue
   - pending balance and unsupplied collection warnings
   - payment received optional info notification
   - shipment partial/delayed optional warning
4. Trigger checks after relevant actions:
   - inventory receipt/adjustment/invoice stock movement
   - invoice create/update/payment/reversal
   - outlet credit limit update
5. Add APIs:
   - `GET /api/notifications`
   - `GET /api/notifications/counts`
   - `PATCH /api/notifications/:id/read`
   - `PATCH /api/notifications/:id/resolve`

## Verification
- Negative stock creates notification once, not duplicates.
- Stock recovery resolves stock alert.
- Outlet receivable exceeding credit limit creates alert.
- Receivable returning under limit resolves alert.
- Tests added/updated.

## Report
Write `agent_pack/reports/055_notifications_engine_legacy_plus_REPORT.md`.
