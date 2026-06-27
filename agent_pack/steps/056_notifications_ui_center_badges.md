# 056 — Notifications UI Center + Badges

## Objective
Add a polished notifications experience using Material UI, connected to the backend notification engine.

## Required reads
- `agent_pack/docs/LEGACY_BALANCE_NOTIFICATIONS_TARGET.md`
- `agent_pack/docs/PROFESSIONAL_MATERIAL_DASHBOARD_STANDARD.md`
- `client/src/layouts/MainLayout.jsx`
- `client/src/pages/Dashboard.jsx`

## Tasks
1. Add topbar notification bell with unread badge.
2. Add notification drawer/popover:
   - severity icons/chips
   - unread/read state
   - resolve action
   - action link to source page
3. Add dashboard alerts section for critical/warning active alerts.
4. Add optional `/notifications` page if needed.
5. Ensure role-aware visibility and empty states.
6. Use Egypt time formatting.

## Verification
- New alerts appear without full refresh after action or on page load.
- Unread count works.
- Mark read/resolve works.
- Action links navigate correctly.
- Light/dark styles are polished.

## Report
Write `agent_pack/reports/056_notifications_ui_center_badges_REPORT.md`.
