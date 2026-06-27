# 045 — Dashboard Redesign Executive Experience

## Status
open/pending until executed by the runner.

## Purpose
Replace the current weak dashboard with a professional executive dashboard: KPIs, quick actions, charts/insights, recent activity, alerts, and responsive layout.

## Change-request context
The client approved a full fresh-start direction. Legacy database preservation is no longer required. The current UI screenshot was rejected because it still feels close to the old identity and lacks the required premium Material UI polish. The platform must be cleaner, lighter, more elegant, and simpler to deploy.

## Hard rules
- Execute this step only; do not execute later steps.
- Keep production as one Node.js app for DirectAdmin.
- Keep React build output inside `public/`.
- Do not put database, uploads, exports, backups, or secrets inside `public/`.
- No demo users except the single seeded super admin.
- No seeded books/outlets/invoices/payments/receipts/demo business data.
- Outlet types must be created by admin from inside the platform, not hardcoded as business records.
- Keep RBAC advanced and permission based.
- Use clear Arabic RTL UI copy and professional Material UI components.

## Required reads before implementation
- `agent_pack/prompts/ONE_PROMPT_RUNNER.md`
- `agent_pack/status.json`
- `agent_pack/docs/FRESH_RESET_AND_UI_REDESIGN_SCOPE.md`
- `agent_pack/docs/SERVER_FLAT_STRUCTURE_TARGET.md`
- `agent_pack/docs/DASHBOARD_VISUAL_STANDARD.md`
- `agent_pack/docs/RBAC_PERMISSION_MATRIX.md`
- `agent_pack/checklists/VERIFY_GATE.md`

## Implementation requirements
- Redesign the dashboard page from scratch with a premium executive structure.
- Add KPI cards for books/products, outlets, invoices today, paid/remaining, stock alerts, and pending shipments where APIs exist.
- Add quick action cards: create invoice, add product, receive stock, add outlet, add user, export report.
- Add recent activity/audit panel, upcoming installments/overdue panel, low stock panel, and sales/collections summary.
- Ensure empty database state is elegant and helpful, not visually empty or broken.
- Make mobile/tablet/desktop layouts responsive and balanced.

## Verification requirements
- Run relevant tests/build/lint commands available in the repo.
- Run database reset/migrate commands when this step touches database or paths.
- Verify `/api/health` and login path when practical.
- Verify the app still follows one Node.js deployment.
- Document commands and exit codes in the report.

## Done criteria
- Dashboard is rebuilt and looks premium with empty DB.
- KPI, quick actions, activity, and alerts sections are responsive.

## Report
Write `agent_pack/reports/045_dashboard_redesign_executive_experience_REPORT.md` using `agent_pack/templates/STEP_COMPLETION_REPORT.md`.
